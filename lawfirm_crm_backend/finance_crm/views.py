# finance/views.py
from rest_framework import generics
from .models import Billing, Expense, LegalFee, Salary, Bonus
from .serializers import BillingSerializer, ExpenseSerializer, LegalFeeSerializer, SalarySerializer, BonusSerializer

class BillingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

class BillingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

# Similarly, create views for other finance-related models
