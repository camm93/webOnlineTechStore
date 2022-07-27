from rest_framework import generics

from authApp.models.user import User
from authApp.serializers.userSerializer import UserSerializer


class BaseUserView:
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(BaseUserView, generics.RetrieveAPIView):
    pass


class UserUpdateView(BaseUserView, generics.UpdateAPIView):
    pass


class UserDeleteView(BaseUserView, generics.DestroyAPIView):
    pass
