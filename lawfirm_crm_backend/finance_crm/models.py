# finance/models.py
from django.db import models
from cases.models import Case
from cases.models import Lawyer

class Billing(models.Model):
    case = models.ForeignKey(Case, related_name='billings', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()

class Expense(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()

class LegalFee(models.Model):
    lawyer = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()

class Salary(models.Model):
    lawyer = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()

class Bonus(models.Model):
    lawyer = models.ForeignKey(Lawyer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()
