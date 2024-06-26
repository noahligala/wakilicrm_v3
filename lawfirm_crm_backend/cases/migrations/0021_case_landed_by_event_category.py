# Generated by Django 5.0.2 on 2024-03-23 09:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0020_blacklistedtoken'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='landed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='landed_cases', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='category',
            field=models.CharField(choices=[('Appointment', 'Appointment'), ('Court Date', 'Court Date'), ('Hearing', 'Hearing'), ('Mention', 'Mention'), ('Ruling', 'Ruling'), ('Judgement', 'Judgement'), ('CRM Bring Up', 'CRM Bring Up'), ('Event', 'Event'), ('To-Do', 'To-Do')], default='Hearing', max_length=20),
            preserve_default=False,
        ),
    ]
