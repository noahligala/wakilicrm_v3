from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import os
from django.core.files.storage import FileSystemStorage
from django.conf import settings


from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import os
from django.core.files.storage import FileSystemStorage
from django.conf import settings


### Case Management
def case_document_path(instance, filename):
    # Upload documents to a directory with the client's name
    client_name = instance.client.name
    current_year = timezone.now().year
    return f'case_documents/{client_name}/{current_year}/{filename}'


class CaseVersion(models.Model):
    case = models.ForeignKey('Case', on_delete=models.CASCADE, related_name='versions')
    title = models.CharField(max_length=200)
    description = models.TextField()
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    opponent_client = models.CharField(max_length=100)
    opposing_counsel = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50)
    documents = models.FileField(upload_to='case_documents/', blank=True, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_case_versions')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updated_case_versions', blank=True, null=True)
    court = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Set the updated_by field to the current logged-in user
        request = kwargs.pop('request', None)
        if request:
            self.updated_by = request.user

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Version ID: {self.id}, Case: {self.case}, Updated by: {self.updated_by}, Updated at: {self.updated_at}"

    class Meta:
        ordering = ['-updated_at']

class Case(models.Model):
    class Meta:
        unique_together = ['client', 'title']  # Add other fields as needed
        
    STATUS_CHOICES = [
        ('Filing', 'Filing'),
        ('Answer Complaint', 'Answer Complaint'),
        ('Discovery', 'Discovery'),
        ('Response to Discovery', 'Response to Discovery'),
        ('Judgement', 'Judgement'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    opponent_client = models.CharField(max_length=100)
    opposing_counsel = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Filing')
    documents = models.FileField(upload_to='case_documents/', blank=True, null=True)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_cases')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updated_cases', blank=True, null=True)
    court = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False) 
    file = models.ForeignKey('File', on_delete=models.CASCADE, related_name='related_cases')
    landed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='landed_cases')

    def save(self, *args, **kwargs):
        if not self.pk:  # Only set created_at if the instance is being created
            self.created_at = timezone.now()

            # If client file management exists, save documents within its directory
            try:
                client_file_management = ClientFileManagement.objects.get(client=self.client)
                self.documents.storage = client_file_management.main_file.storage
            except ClientFileManagement.DoesNotExist:
                pass

        # Set the updated_by field to the current logged-in user
        request = kwargs.pop('request', None)
        if request:
            self.updated_by = request.user

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title



### Personnel Managment
class Client(models.Model):
    name = models.CharField(max_length=100)
    contact_information = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Lawyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact_information = models.CharField(max_length=200)
    specialization = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
    
class Clerk(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pending_approval = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
    
class Accountant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    billing_rate = models.DecimalField(max_digits=10, decimal_places=2)
    billable_hours = models.DecimalField(max_digits=10, decimal_places=2)
    commission_rate = models.DecimalField(max_digits=10, decimal_places=2)
    payroll_preparation = models.BooleanField(default=False)
    statutory_deductions_handling = models.BooleanField(default=False)
    kra_submission = models.BooleanField(default=False)
    nssf_submission = models.BooleanField(default=False)
    nhif_submission = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
    
class StaffReport(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



### File Management
class CustomFileSystemStorage(FileSystemStorage):
    def __init__(self, *args, **kwargs):
        kwargs['location'] = '../Assets/CFM/'
        super().__init__(*args, **kwargs)
    
    
    def get_available_name(self, name, max_length=None):
        """
        Overrides parent method to prevent overwriting existing files.
        """
        if self.exists(name):
            # Split the filename and extension
            root, ext = os.path.splitext(name)
            counter = 1
            # Append suffix until the filename is unique
            while self.exists(f"{root}_{counter}{ext}"):
                counter += 1
            name = f"{root}_{counter}{ext}"
        return name
    

    def save(self, name, content, max_length=None):
        """
        Overrides parent method to create directories if they don't exist.
        """
        directory = os.path.dirname(name)
        # Create the directory if it doesn't exist
        if not os.path.exists(os.path.join(settings.MEDIA_ROOT, directory)):
            os.makedirs(os.path.join(settings.MEDIA_ROOT, directory))
        return super().save(name, content, max_length)
     
# Create an instance of your custom storage
custom_storage = CustomFileSystemStorage()
class File(models.Model):
    name = models.CharField(max_length=255, unique=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='files')
    cases = models.ManyToManyField(Case, related_name='related_files')
    documents = models.FileField(upload_to='case_documents/', storage=custom_storage, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            # This is a new file, so we need to generate a name
            client_name = self.client.name
            current_year = timezone.now().year

            # Get the count of files for this client and year
            file_count = File.objects.filter(name__startswith=f"{client_name}/{current_year}/").count() + 1

            # Format the filename
            self.name = f"{client_name}/{current_year}/{file_count:03d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ClientFileManagement(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, related_name='client_file')
    main_file = models.OneToOneField(File, on_delete=models.CASCADE, related_name='main_client_file')

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create()
        return obj

    @property
    def files(self):
        return self.main_file.cases.all()

    def __str__(self):
        return f"{self.client.name}'s Client File"



### Event Models
class EventType(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Event(models.Model):
    CATEGORY_CHOICES = [
        ('Appointment', 'Appointment'),
        ('Court Date', 'Court Date'),
        ('Hearing', 'Hearing'),
        ('Mention', 'Mention'),
        ('Ruling', 'Ruling'),
        ('Judgement', 'Judgement'),
        ('CRM Bring Up', 'CRM Bring Up'),
        ('Event', 'Event'),
        ('To-Do', 'To-Do'),
    ]

    start = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=200)
    appointment_id = models.IntegerField()
    appointment_status = models.CharField(max_length=2)
    location = models.CharField(max_length=100)
    resource = models.CharField(max_length=100)
    address = models.TextField()
    is_draggable = models.BooleanField(default=True)
    is_task = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False) 
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='events', blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='events', blank=True, null=True)

    def __str__(self):
        return f"Event ID: {self.id}, Title: {self.title}, Start: {self.start}, End: {self.end}"

