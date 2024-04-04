# finance/serializers.py
from rest_framework import serializers

#from lawfirm_crm.cases import models
from .models import Billing, Expense, LegalFee, Salary, Bonus

class BillingSerializer(serializers.ModelSerializer):
    case_title = serializers.ReadOnlyField(source='case.title')

    class Meta:
        model = Billing
        fields = ['id', 'case', 'case_title', 'amount', 'date', 'description']

    def create(self, validated_data):
        case = validated_data['case']
        amount = validated_data['amount']
        existing_amount = case.billings.aggregate(total_amount=models.Sum('amount'))['total_amount'] or 0
        validated_data['amount'] = existing_amount + amount
        return Billing.objects.create(**validated_data)
    
class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'

class LegalFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalFee
        fields = '__all__'

class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'

class BonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bonus
        fields = '__all__'
