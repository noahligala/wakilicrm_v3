from .models import BlacklistedToken

class TokenBlacklistMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, *view_args, **view_kwargs):
        if request.user.is_authenticated:
            # Add logic to blacklist token upon logout
            if request.path == '/api/logout/':
                refresh_token = request.data.get('refresh_token')
                if refresh_token:
                    BlacklistedToken.objects.create(token=refresh_token)
        return None