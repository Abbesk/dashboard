from rest_framework import serializers
from .models import *
from .utils import *

class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'