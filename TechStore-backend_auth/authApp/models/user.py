#from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):

    def create_user(self, username, password=None):
        """
        Creates and saves a user with the given username and password.
        """
        if not username:
            raise ValueError(_('Users must have an username'))

        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        """
        Creates and saves a superuser with the given username and password.
        """
        user = self.create_user(username=username, password=password)

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    id = models.BigAutoField(primary_key=True)
    username = models.CharField(verbose_name=_('Username'), max_length = 15, unique=True, field='username')
    password = models.CharField(verbose_name=_('Password'), max_length = 256, field='password')
    name = models.CharField(verbose_name=_('Name'), max_length = 30, field='name')
    surname = models.CharField(verbose_name=_('Surname'), blank = True, null = True, max_length=50, field='surname')
    email = models.EmailField(verbose_name=_('Email'), max_length = 100, field='email')
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DecimalField(auto_now=True, blank=True)

    objects = UserManager()
    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = 'username'

    def save(self, **kwargs):
        some_salt = 'mMUj0DrIK6vgtdIYepkIxN'
        self.password = make_password(self.password, some_salt)
        super().save(**kwargs)

    def __str__(self):
        return f'{self.name} {self.surname}'
