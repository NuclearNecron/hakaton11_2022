from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.views import LoginView, PasswordChangeView
from django.contrib.messages.views import SuccessMessageMixin
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.contrib import messages
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request


class Status_ViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = Status_ser


class POSTTasklist_ViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        queryset= Tasklist.objects.all()
        if self.request.method == 'GET':
            params = self.request.query_params.dict()
            try:
                queryset = queryset.filter(task__icontains=params['name'].replace('%20', ' '))
            except:
                pass
        return queryset
    serializer_class = POSTTasklist_ser

class POSTNotes_ViewSet(viewsets.ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = Notes_ser

class POSTEvents_ViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = Events_ser

class POSTBookmarks_ViewSet(viewsets.ModelViewSet):
    queryset = Bookmarks.objects.all()
    serializer_class = Bookmarks_ser

class UserNotes_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Usernotes.objects.filter(user = self.kwargs["user_pk"])
        return queryset
    serializer_class = UserNotes_ser

class UserTasks_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Usertasks.objects.filter(user = self.kwargs["user_pk"]).order_by("task__deadline")

        return queryset
    serializer_class = UserTasks_ser
class UserEvents_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Userevents.objects.filter(user=self.kwargs["user_pk"])
        return queryset
    serializer_class = UserEvents_ser

class UserBookmarks_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Userboormarks.objects.filter(user=self.kwargs["user_pk"])
        return queryset
    serializer_class = UserBookmarks_ser

class User_ViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = Users_ser

class POSTUser_ViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = POSTUsers_ser

class POSTUserTasks_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Usertasks.objects.all()
        return queryset
    serializer_class = POSTUserTasks_ser
class POSTUserNotes_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Usernotes.objects.all()
        return queryset
    serializer_class = POSTUserNotes_ser
class POSTUserEvents_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Userevents.objects.all()
        return queryset
    serializer_class = POSTUserEvents_ser
class POSTUserBookmarks_ViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Userboormarks.objects.all()
        return queryset
    serializer_class = POSTUserMarks_ser


@api_view(['GET', 'POST'])
def setUser(request):
        if request.method == 'POST':
            user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
            # myuser=Users.objects.create(login=request.data['username'],pass_field=request.data['password'], nickname=request.data['username'])
            # myuser.save
            user.save()
            print(request.data)
            return HttpResponse("{'status': 'ok'}")
        else:
            return HttpResponse("{'status': 'denied'}")


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request: Request):
    print(1,request.data)
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return HttpResponse(status=200)
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    print(AUserSerializer(request.user).data)
    return Response({
        'data': AUserSerializer(request.user).data
    })
