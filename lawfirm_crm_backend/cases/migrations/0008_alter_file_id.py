# Generated by Django 5.0.2 on 2024-03-12 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0007_remove_case_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]