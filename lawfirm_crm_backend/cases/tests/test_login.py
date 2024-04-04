from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

class LoginAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.login_url = reverse('/api/login')  # replace 'login' with the name of your login view
        self.test_user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login_success(self):
        response = self.client.post(self.login_url, {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)

    def test_login_failure(self):
        response = self.client.post(self.login_url, {'username': 'wronguser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, 401)  # or whatever status code you return on login failure