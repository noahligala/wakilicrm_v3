# Generated by Django 5.0.4 on 2024-04-05 00:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0025_case_is_done_case_is_task'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientfilemanagement',
            name='client_name',
        ),
        migrations.RemoveField(
            model_name='clientfilemanagement',
            name='files',
        ),
        migrations.RemoveField(
            model_name='file',
            name='created_at',
        ),
        migrations.AddField(
            model_name='clientfilemanagement',
            name='client',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='client_file', to='cases.client'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='clientfilemanagement',
            name='main_file',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='main_client_file', to='cases.file'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='file',
            name='cases',
            field=models.ManyToManyField(related_name='related_files', to='cases.case'),
        ),
        migrations.AddField(
            model_name='file',
            name='client',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='files', to='cases.client'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='case',
            name='file',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='related_cases', to='cases.file'),
        ),
    ]
