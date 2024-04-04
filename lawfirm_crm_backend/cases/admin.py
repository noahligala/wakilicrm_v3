from django.contrib import admin
from .models import Case, Client, Lawyer

admin.site.register(Case)
admin.site.register(Client)
admin.site.register(Lawyer)