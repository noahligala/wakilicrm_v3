from rest_framework import serializers
from .models import Case, Client, Lawyer, StaffReport, File, ClientFileManagement, Event
from django.contrib.auth.models import User
from django.utils import timezone

class ClientSerializer(serializers.ModelSerializer):
    file = serializers.CharField(read_only=True, required=False) 
    class Meta:
        model = Client
        fields = '__all__'


class CaseSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(write_only=True)

    class Meta:
        model = Case
        fields = '__all__'

    def create(self, validated_data):
        client_name = validated_data.pop('client_name')
        client = Client.objects.get_or_create(name=client_name)

        # Get or create the ClientFileManagement instance
        client_file_management = ClientFileManagement.load()

        # Get the latest file associated with the client
        latest_file = client_file_management.main_file

        if latest_file is None:
            # If no file exists, create a new one
            current_year = timezone.now().year
            file_count = File.objects.filter(name__startswith=f"{client_name}/{current_year}/").count() + 1
            file_name = f"{client_name}/{current_year}/{file_count:03d}"
            latest_file = File.objects.create(name=file_name)

            # Associate the latest file with the client
            latest_file.client = client
            latest_file.save()

            # Associate the latest file with the ClientFileManagement instance
            client_file_management.main_file = latest_file
            client_file_management.save()

        # Assign the latest file to the validated data
        validated_data['file'] = latest_file

        # # Remove client_name from validated_data
        # validated_data.pop('client_name')

        # Create the case instance without passing client argument
        case = Case.objects.create(**validated_data)
        return case




class LawyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawyer
        fields = '__all__'
class StaffReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffReport
        fields = '__all__'
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'end', 'appointment_id', 'appointment_status', 'location', 'resource', 'address', 'is_draggable', 'category']