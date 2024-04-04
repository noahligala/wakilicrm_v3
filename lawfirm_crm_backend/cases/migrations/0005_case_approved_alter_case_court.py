# Generated by Django 5.0.2 on 2024-03-12 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0004_rename_created_by_case_assigned_to_case_court'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='case',
            name='court',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
