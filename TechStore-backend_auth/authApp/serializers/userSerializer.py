from rest_framework import serializers
from authApp.models.user import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'created_at', 'last_login')

    def to_representation(self, obj):
        user = User.objects.get(id=obj.id)
        return {
            'id' : user.id,
            'username' : user.username,
            'name' : user.name,
            'surname' : user.surname,
            'email' : user.email,
        }
