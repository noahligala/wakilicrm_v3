# Generated by Django 5.0.2 on 2024-02-25 06:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0003_staffreport'),
        ('finance_crm', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billing',
            name='case',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='billings', to='cases.case'),
        ),
    ]
