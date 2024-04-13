from requests import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Case, Client, Lawyer, Event
from .serializers import CaseSerializer, ClientSerializer, LawyerSerializer, StaffReportSerializer, StaffReport, UserSerializer, EventSerializer, UserSerializer
from rest_framework import permissions
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import UntypedToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.parsers import FileUploadParser
import csv, io, json
from django.contrib.auth import logout as django_logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST, require_GET
from django.http import JsonResponse
from django.db import models
from django.views.decorators.csrf import csrf_exempt


class BulkImportView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        if 'file' not in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        file = request.data['file']
        if file.name.endswith('.csv'):
            data_set = file.read().decode('UTF-8')
            io_string = io.StringIO(data_set)
            reader = csv.reader(io_string, delimiter=',', quotechar="|")
            next(reader)  # Skip the header

            for row in reader:
                # Assuming a CSV structure: Case, Client, Lawyer
                Case.objects.update_or_create(name=row[0])
                Client.objects.update_or_create(name=row[1])
                Lawyer.objects.update_or_create(name=row[2])

        elif file.name.endswith('.json'):
            data = json.load(file)

            for item in data:
                # Assuming a JSON structure: {"Case": "", "Client": "", "Lawyer": ""}
                Case.objects.update_or_create(name=item['Case'])
                Client.objects.update_or_create(name=item['Client'])
                Lawyer.objects.update_or_create(name=item['Lawyer'])

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)

class CaseListCreateAPIView(generics.ListCreateAPIView):
    #permission_classes = (IsAuthenticated,)

    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class CaseRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated,)

    queryset = Case.objects.all()
    serializer_class = CaseSerializer

class ClientListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class LawyerListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Lawyer.objects.all()
    serializer_class = LawyerSerializer

class LawyerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = Lawyer.objects.all()
    serializer_class = LawyerSerializer


 #user object   
class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        print(Response)
        return Response(serializer.data)

#Login Logout
    
def login_view(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})  
    

@require_POST
@login_required
@csrf_exempt
def logout_view(self, request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class StaffReportList(APIView):
      permission_classes = (IsAuthenticated,)

      def get(self, request):
         staff_reports = StaffReport.objects.all()
         serializer = StaffReportSerializer(staff_reports, many=True)
         return Response(serializer.data)
 
class StaffReportRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        staff_reports = StaffReport.objects.all()  # Fetch the StaffReport objects
        serializer = StaffReportSerializer(staff_reports, many=True)
        return Response(serializer.data)  # Return the serialized data


class UserUpdateView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'


 # Events Models

class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    
class EventCreateView(APIView):
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class EventUpdateView(APIView):
    def get(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            serializer = EventSerializer(event)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            serializer = EventSerializer(event, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        
# Token Views
    
class BlacklistedToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token

@require_GET
@login_required
def health_check(request):
    # Implement any health check logic here
    # For simplicity, we'll just return a success response
    return Response({'status': 'ok'})

class TokenVerifyView(APIView):
    def post(self, request):
        token = request.data.get('token')

        if token is None:
            return Response({'isValidToken': False, 'message': 'No token provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            UntypedToken(token)  # This will raise an exception if the token is invalid
            return Response({'isValidToken': True})
        except (InvalidToken, TokenError) as e:
            return Response({'isValidToken': False, 'message': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class Token():
    def get_tokens_for_user(user):
        refresh = RefreshToken.for_user(user)

        return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
