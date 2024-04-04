from django.urls import path
from .views import CaseListCreateAPIView, CaseRetrieveUpdateDestroyAPIView, ClientListCreateAPIView, ClientRetrieveUpdateDestroyAPIView, LawyerListCreateAPIView, LawyerRetrieveUpdateDestroyAPIView, UserUpdateView, TokenVerifyView, BulkImportView, EventListView, EventCreateView, EventUpdateView

urlpatterns = [
    path('cases/', CaseListCreateAPIView.as_view(), name='case-list-create'),
    path('events/', EventListView.as_view(), name='events-list'),
    path('events/create/', EventCreateView.as_view(), name='events-create'),
    path('cases/<int:pk>/', CaseRetrieveUpdateDestroyAPIView.as_view(), name='case-detail'),
    path('clients/', ClientListCreateAPIView.as_view(), name='client-list-create'),
    path('clients/<int:pk>/', ClientRetrieveUpdateDestroyAPIView.as_view(), name='client-detail'),
    path('lawyers/', LawyerListCreateAPIView.as_view(), name='lawyer-list-create'),
    path('lawyers/<int:pk>/', LawyerRetrieveUpdateDestroyAPIView.as_view(), name='lawyer-detail'),
    path('user/<int:pk>/', UserUpdateView.as_view(), name='user-update'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('bulk_import/', BulkImportView.as_view(), name='bulk_import'),
    path('events/<int:event_id>/', EventUpdateView.as_view(), name='events_update' ),   
]
