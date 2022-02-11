from rest_framework import generics
from authApp.models.user import User
from authApp.serializers.userSerializer import UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()   # obtiene el modelo.   SELECT * FROM USERS
    serializer_class = UserSerializer # serializa la info recibida

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer