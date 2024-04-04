# Generated by Django 5.0.2 on 2024-03-14 20:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0013_case_approved'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='case',
            name='approved',
        ),
        migrations.RemoveField(
            model_name='case',
            name='assigned_to',
        ),
        migrations.RemoveField(
            model_name='case',
            name='client',
        ),
        migrations.RemoveField(
            model_name='case',
            name='court',
        ),
        migrations.RemoveField(
            model_name='case',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='case',
            name='description',
        ),
        migrations.RemoveField(
            model_name='case',
            name='documents',
        ),
        migrations.RemoveField(
            model_name='case',
            name='opponent_client',
        ),
        migrations.RemoveField(
            model_name='case',
            name='opposing_counsel',
        ),
        migrations.RemoveField(
            model_name='case',
            name='status',
        ),
        migrations.RemoveField(
            model_name='case',
            name='title',
        ),
        migrations.RemoveField(
            model_name='case',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='case',
            name='updated_by',
        ),
        migrations.CreateModel(
            name='ClientFileManagement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_name', models.CharField(max_length=255)),
                ('files', models.ManyToManyField(related_name='client_file_managements', to='cases.file')),
            ],
        ),
        migrations.AddField(
            model_name='case',
            name='file',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='cases', to='cases.file'),
            preserve_default=False,
        ),
    ]