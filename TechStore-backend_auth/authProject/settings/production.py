"""Production settings
"""

from settings.local import *


DEBUG = False

DATABASES = {
        'default': env.db("PRIMARY_DATABASE_URL")
}
DATABASES['default']['CONN_MAX_AGE'] = 600
DATABASES['default']['TEST'] = {'MIRROR': 'default',}
