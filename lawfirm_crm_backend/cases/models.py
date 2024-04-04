from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


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
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updated_cases')
    court = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved = models.BooleanField(default=False)
    file = models.ForeignKey('File', on_delete=models.CASCADE, related_name='cases')
    landed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='landed_cases')

    def save(self, *args, **kwargs):
        if not self.pk:  # Only set created_at if the instance is being created
            self.created_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


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


class File(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.id:
            # This is a new file, so we need to generate a name
            client_file_management = ClientFileManagement.load()
            client_name = client_file_management.client_name
            current_year = timezone.now().year

            # Get the count of files for this client and year
            file_count = File.objects.filter(name__startswith=f"{client_name}/{current_year}/").count() + 1

            # Format the filename
            self.name = f"{client_name}/{current_year}/{file_count:03d}"

        super().save(*args, **kwargs)


class ClientFileManagement(models.Model):
    client_name = models.CharField(max_length=255)
    files = models.ManyToManyField(File, related_name='client_file_managements')

    def save(self, *args, **kwargs):
        self.pk = 1
        super(ClientFileManagement, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


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
    title = models.CharField(max_length=200)  # Add the title field
    appointment_id = models.IntegerField()
    appointment_status = models.CharField(max_length=2)
    location = models.CharField(max_length=100)
    resource = models.CharField(max_length=100)
    address = models.TextField()
    is_draggable = models.BooleanField(default=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"Event ID: {self.id}, Title: {self.title}, Start: {self.start}, End: {self.end}"
