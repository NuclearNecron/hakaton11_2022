from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Bookmarks(models.Model):
    link = models.TextField(blank=True, null=True)
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bookmarks'


class Events(models.Model):
    event_date = models.DateField(blank=True, null=True)
    event_description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'events'


class Notes(models.Model):
    note = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'notes'


class Status(models.Model):
    status_name = models.CharField(max_length=25)

    class Meta:
        managed = False
        db_table = 'status'


class Tasklist(models.Model):
    status = models.ForeignKey(Status, models.DO_NOTHING, db_column='status')
    task = models.CharField(max_length=50)
    creation_date = models.DateField(blank=True, null=True)
    completion_date = models.DateField(blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    desc = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tasklist'


class Userboormarks(models.Model):
    bookmarks = models.ForeignKey(Bookmarks, models.DO_NOTHING, db_column='bookmarks')
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='user')

    class Meta:
        managed = False
        db_table = 'userboormarks'


class Userevents(models.Model):
    event = models.ForeignKey(Events, models.DO_NOTHING, db_column='event')
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='user')

    class Meta:
        managed = False
        db_table = 'userevents'


class Usernotes(models.Model):
    note = models.ForeignKey(Notes, models.DO_NOTHING, db_column='note')
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='user')

    class Meta:
        managed = False
        db_table = 'usernotes'


class Users(models.Model):
    login = models.CharField(unique=True, max_length=50)
    pass_field = models.CharField(db_column='pass', max_length=50)  # Field renamed because it was a Python reserved word.
    nickname = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'users'


class Usertasks(models.Model):
    task = models.ForeignKey(Tasklist, models.DO_NOTHING, db_column='task')
    user = models.ForeignKey(Users, models.DO_NOTHING, db_column='user')

    class Meta:
        managed = False
        db_table = 'usertasks'
