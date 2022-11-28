"""hakaton URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from organizer import views as webViews
from django.urls import include, path
from rest_framework import routers
from rest_framework_nested import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users',webViews.User_ViewSet, basename='users')
router.register(r'status', webViews.Status_ViewSet, basename='status')
router.register(r'POSTtasks', webViews.POSTTasklist_ViewSet, basename='POST tasks')
router.register(r'POSTevents', webViews.POSTEvents_ViewSet, basename='POST events')
router.register(r'POSTbookmarks', webViews.POSTBookmarks_ViewSet, basename='POST marks')
router.register(r'POSTnotes', webViews.POSTNotes_ViewSet, basename='POST notes')
router.register(r'POSTusertasks', webViews.POSTUserTasks_ViewSet, basename='POST usertasks')
router.register(r'POSTuserevents', webViews.POSTUserEvents_ViewSet, basename='POST userevents')
router.register(r'POSTbookmarks', webViews.POSTUserBookmarks_ViewSet, basename='POST userbookmarks')
router.register(r'POSTusernotes', webViews.POSTUserNotes_ViewSet, basename='POST usernotes')


user_router = routers.NestedSimpleRouter(router, r'users', lookup='user')
user_router.register(r'usernotes', webViews.UserNotes_ViewSet, basename='usernotes')
user_router.register(r'usertasks', webViews.UserTasks_ViewSet, basename='usertasks')
user_router.register(r'userevents', webViews.UserEvents_ViewSet, basename='userevents')
user_router.register(r'userbookmarks', webViews.UserBookmarks_ViewSet, basename='userbookmarks')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('',include(user_router.urls)),
    path('add_user', webViews.setUser, name='setUser'),
    path('api/user', webViews.user, name='user'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
