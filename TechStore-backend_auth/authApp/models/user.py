#from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):

    def create_user(self, username, password, **extra_fields):
        """
        Creates and saves a user with the given username and password.
        """
        if not username:
            raise ValueError(_('Users must have an username'))

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, **extra_fields):
        """
        Creates and saves a superuser with the given username and password.
        """
        extra_fields.setdefault("is_staff", True) # Grants access to admin site
        extra_fields.setdefault("is_superuser", True) # Provides all superuser permissions
        extra_fields.setdefault("is_active", True) # use is_active = False instead of deleting accounts

        if not extra_fields.get('is_staff'):
            raise ValueError(_("Superusers must have is_staff = True"))

        if not extra_fields.get('is_superuser'):
            raise ValueError(_("Superusers must have is_superuser = True"))

        if not extra_fields.get('is_active'):
            raise ValueError(_("Superusers must have is_active = True"))

        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    id = models.BigAutoField(primary_key=True)
    username = models.CharField(verbose_name=_('Username'), max_length = 15, unique=True)
    password = models.CharField(verbose_name=_('Password'), max_length = 256)
    name = models.CharField(verbose_name=_('Name'), max_length = 30)
    surname = models.CharField(verbose_name=_('Surname'), blank = True, null = True, max_length=50)
    email = models.EmailField(verbose_name=_('Email'), max_length = 100)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()
    USERNAME_FIELD = 'username'

    def save(self, **kwargs):
        if not self.is_staff:
            self.password = make_password(self.password)
        super().save(**kwargs)

    def __str__(self):
        return f'{self.name} {self.surname}'
