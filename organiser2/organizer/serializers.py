from collections import Counter

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import *
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer
from drf_writable_nested.serializers import WritableNestedModelSerializer


class Bookmarks_ser(serializers.ModelSerializer):
    class Meta:
        model = Bookmarks
        fields = '__all__'

class Events_ser (serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'

class Notes_ser(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'
class Status_ser(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ["id", "status_name"]

class Tasklist_ser(serializers.ModelSerializer):
    status =Status_ser(read_only=True)
    class Meta:
        model = Tasklist
        fields = ["id", "status", "task", "creation_date", "completion_date", "deadline", "desc"]

class POSTTasklist_ser(serializers.ModelSerializer):
    class Meta:
        model = Tasklist
        fields = ["id", "status", "task", "creation_date", "completion_date", "deadline", "desc"]
class UserNotes_ser(WritableNestedModelSerializer):
    note = Notes_ser()
    class Meta:
        model = Usernotes
        fields = '__all__'

class UserTasks_ser(serializers.ModelSerializer):
    task = Tasklist_ser()
    class Meta:
        model = Usertasks
        fields = '__all__'
class UserEvents_ser(WritableNestedModelSerializer):
    event = Events_ser()
    class Meta:
        model = Userevents
        fields = '__all__'
class UserBookmarks_ser(WritableNestedModelSerializer):
    bookmarks = Bookmarks_ser()
    class Meta:
        model = Userboormarks
        fields = '__all__'

class Users_ser(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "nickname"]

class POSTUsers_ser(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "nickname", "login", "pass_field"]

class notSUBTasklist_ser(serializers.ModelSerializer):
    class Meta:
        model = Tasklist
        fields = '__all__'

# class POSTUserNotes_ser(serializers.ModelSerializer):
#     class Meta:
#         model = Usernotes
#         fields = '__all__'

class POSTUserTasks_ser(serializers.ModelSerializer):
    class Meta:
        model = Usertasks
        fields = '__all__'
class POSTUserMarks_ser(serializers.ModelSerializer):
    class Meta:
        model = Userboormarks
        fields = '__all__'
class POSTUserEvents_ser(serializers.ModelSerializer):
    class Meta:
        model = Userevents
        fields = '__all__'
class POSTUserNotes_ser(serializers.ModelSerializer):
    class Meta:
        model = Usernotes
        fields = '__all__'
#
#  class POSTUserEvents_ser(serializers.ModelSerializer):
#      class Meta:
#          model = Userevents
#          fields = '__all__'

 # class POSTUserBookmarks_ser(serializers.ModelSerializer):
 #     class Meta:
 #         model = Userboormarks
 #         fields = '__all__'


class AUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]


class LoginRequestSerializer(serializers.ModelSerializer):
    model = User
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


