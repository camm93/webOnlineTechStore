from datetime import timedelta
from pathlib import Path

from environ import Env


env = Env()
Env.read_env()

BASE_DIR = Path(__file__).resolve().parent.parent

IS_LOCAL = env.bool(var='IS_LOCAL', default=False)

SECRET_KEY = env('SECRET_KEY')

DEBUG = IS_LOCAL
TESTING = False

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "debug_toolbar",
    'rest_framework',
    'authApp',
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes = 30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days = 1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

REST_FRAMEWORK = {
	 'DEFAULT_PERMISSION_CLASSES': (
	 'rest_framework.permissions.AllowAny',
	 ),
	 'DEFAULT_AUTHENTICATION_CLASSES': (
	 'rest_framework_simplejwt.authentication.JWTAuthentication',
	 ),
     'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}

AUTH_USER_MODEL = 'authApp.User'
ROOT_URLCONF = 'authProject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'authProject.wsgi.application'

DATABASES = {
    'default': env.db("PRIMARY_DATABASE_URL")
}
DATABASES['default']['CONN_MAX_AGE'] = 600
DATABASES['default']['TEST'] = {'MIRROR': 'default',}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

import django_heroku
django_heroku.settings(locals())

INTERNAL_IPS = ["127.0.0.1"]
