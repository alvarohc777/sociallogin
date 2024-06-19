from ninja import Router
from ninja.security import django_auth
from django.shortcuts import redirect
from django.conf import settings

router = Router(auth=django_auth)
FRONTEND_URL_BASE = settings.FRONTEND_URL


@router.get("redirect/", auth=None)
def login_redirect(request, error=None):
    print(request)
    if error == "permission_denied":
        return redirect(f"{FRONTEND_URL_BASE}/login?error=email_exists")
    if request.user.is_authenticated:
        print(f"{FRONTEND_URL_BASE}/user")
        return redirect(f"{FRONTEND_URL_BASE}/user")
    return redirect(f"{FRONTEND_URL_BASE}/login")
