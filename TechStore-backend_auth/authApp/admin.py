from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'password', 'name', 'surname', 'email', 'created_at', 'last_login', 'is_staff']
    list_filter = ['created_at', 'last_login', 'is_staff']


admin.site.register(User, UserAdmin)
