from .models import Log
import json
from rest_framework import viewsets

class LoggedModelViewSet(viewsets.ModelViewSet):
    def log_action(self, action, instance, before=None):
        username = "xx"

        if action == 'Modification':
            description = f"Avant : {json.dumps(before, indent=2, default=str)}\nAprès : {json.dumps(self.serializer_class(instance).data, indent=2, default=str)}"
        else:
            description = json.dumps(self.serializer_class(instance).data, indent=2, default=str)

        Log.objects.create(
            username=username,
            action=action,
            description=description
        )

    def perform_create(self, serializer):
        instance = serializer.save()
        self.log_action("Création", instance)

    def perform_update(self, serializer):
        instance = self.get_object()
        before = self.serializer_class(instance).data
        instance = serializer.save()
        self.log_action("Modification", instance, before=before)

    def perform_destroy(self, instance):
        self.log_action("Suppression", instance)
        instance.delete()
