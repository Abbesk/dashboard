from django.db import models, transaction
from django.utils import timezone
from datetime import timedelta

class Log(models.Model):
    ACTION_CHOICES = (('Créer','Créer'),('Modifier','Modifier'),('Supprimer','Supprimer'))
    id = models.BigAutoField(primary_key=True)
    user = models.IntegerField()
    execution_date = models.DateTimeField()
    action = models.CharField(max_length=16, choices=ACTION_CHOICES)
    table = models.CharField(max_length=100)
    field_name = models.CharField(max_length=100, null=True, blank=True)
    new_value = models.JSONField(null=True, blank=True)
    old_value = models.JSONField(null=True, blank=True)
    sentence = models.TextField(null=True, blank=True)
    rpl = models.ForeignKey('RPL', null=True, blank=True, on_delete=models.SET_NULL, related_name='logs', db_column='rpl_id')
    class Meta:
        indexes = [
            models.Index(fields=['execution_date']),
            models.Index(fields=['table']),
            models.Index(fields=['action']),
            models.Index(fields=['rpl']),
        ]