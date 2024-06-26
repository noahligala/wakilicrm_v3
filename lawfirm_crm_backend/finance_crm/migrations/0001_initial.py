# Generated by Django 4.2.6 on 2024-02-22 21:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cases', '0002_alter_case_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Salary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField()),
                ('description', models.TextField()),
                ('lawyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cases.lawyer')),
            ],
        ),
        migrations.CreateModel(
            name='LegalFee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField()),
                ('description', models.TextField()),
                ('lawyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cases.lawyer')),
            ],
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField()),
                ('description', models.TextField()),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cases.case')),
            ],
        ),
        migrations.CreateModel(
            name='Bonus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField()),
                ('description', models.TextField()),
                ('lawyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cases.lawyer')),
            ],
        ),
        migrations.CreateModel(
            name='Billing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField()),
                ('description', models.TextField()),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cases.case')),
            ],
        ),
    ]
