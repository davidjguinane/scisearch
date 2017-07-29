from scisearch.settings.base import *
import os

ALLOWED_HOSTS += [
	'127.0.0.1',
	'localhost'
]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'g86co0n!!8lpw020@o7a$d$#r1g(=f22ir!f*1$590bjt=8fr#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

INSTALLED_APPS += [
    'django.contrib.admin',
    'query'
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
