
``` python
# 1. Install django-allauth
pip install django-allauth
pip install django-allauth[socialaccount]

# 1. start project
django-admin startproject <project-name>

# 2. run server
python manage.py runserver

# configure django-allauth settings (headless)
https://docs.allauth.org/en/dev/installation/quickstart.html

# a)
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

# b)
INSTALLED_APPS = [
    ...
    # The following apps are required:
    'allauth',
    'allauth.account',
    "django.contrib.sites",
    'allauth.headless',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    ]

# c) 
MIDDLEWARE = (
    ...
    "allauth.account.middleware.AccountMiddleware",
)

# d) 
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
    }
}

# e) In urls.py
urlpatterns = [
    ...
    path('accounts/', include('allauth.urls')),
    path("_allauth/", include("allauth.headless.urls")),
    ...
]

# f)
HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": "/account/verify-email/{key}",
    "account_reset_password": "/account/password/reset",
    "account_reset_password_from_key": "/account/password/reset/key/{key}",
    "account_signup": "/account/signup",
}

# g) 
SESSION_COOKIE_NAME = "sessionid"  # Default, but ensure it's not changed
SESSION_ENGINE = "django.contrib.sessions.backends.db"  # Default, uses the database
SITE_ID = 2 # MUST SET TO ID OF SITE IN DB
SOCIALACCOUNT_QUERY_EMAIL = True
ACCOUNT_LOGOUT_ON_GET = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_REQUIRED = True

# migrate
python manage.py migrate 
python manage.py createsuperuser

# Add google social login
# 1. Add 127..0.0.1:8000 to sites
# 2. Get ID from site and verify it on the settings SITE_ID = 2
# 3. Add social login provider secret token and key


## Continue with the frontend

# 3. start api app
python manage.py startapp api

# 4. Include api app and 'ninja' to installed apps in project settings.py
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    ...
    "ninja",

    # my apps
    "<app>.apps.PoemConfig",
]

# 5.1 create api.py inside app folder
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/hello")
def hello(request):
    return "hello world"


# 5.2 Create urls.py
from django.urls import path
from .api import api


urlpatterns = [path("", api.urls)]

# 6. Import app.api inside project.urls using 
from django.urls import path, include
urlpatterns = [path("admin/", admin.site.urls), path("api/", include("<app>.urls"))]

# 7. Install psycopg
pip install psycopg
pip install --upgrade pip
pip install "psycopg[binary,pool]"

# 7. Update DATABASES dictionary with connection string
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "radowski_dev",
        "USER": "alvarohc777",
        "PASSWORD": "rada-app#1",
        "HOST": "radowski.postgres.database.azure.com",
        "PORT": "5432",
    }
}

# Scaffold postgres DB
python manage.py inspectdb > models_test.py
python manage.py makemigrations
python manage.py migrate --fake-initial

# Add related name to foreign keys
class BookContent(models.Model):
    ...
    content = models.ForeignKey(
        "Content", models.DO_NOTHING, related_name="book_content"
    )

# create super user
python manage.py createsuperuser


# Register models in admin page
from .models import Poem, Book, Content

@admin.register(Poem)
class PoemAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "title",
    )
    search_fields = ("title",)
    list_filter = ("title",)

# Create Schemas
from poem.models import Poem
from ninja import Schema
from ninja.orm import create_schema

PoemBase = create_schema(Poem, fields=["id", "name", "title"])


# Create Endpoint

from ninja import NinjaAPI

from poem.models import Poem
from poem.schema import PoemBase
from typing import List, Optional

api = NinjaAPI()

@api.get("", response=List[PoemBase], tags=["Poem"])
def poem(request, nombre: Optional[str] = None):
    if nombre:
        return Poem.objects.filter(nombre__icontains=nombre)
    return Poem.objects.all()


# CORS HEADER
pip install django-cors-headers 


INSTALLED_APPS = [
    # ...
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    # ...
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:9000",
    # Add other allowed origins as needed
]

CORS_ORIGIN_ALLOW_ALL = True

```


