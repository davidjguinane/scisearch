from django.conf.urls import url, include
from django.contrib import admin
from query.views import (
		Home,
		get_sector,
		detail_view,
	)
from . import views

app_name = 'query'
urlpatterns = [
    url(r'^$', Home.as_view(), name='home'),
    url(r'^select_sector/$', views.get_sector, name='select_sector'),
    url(r'^(?P<pk>\d+)/$', views.detail_view, name='detail_view'),
]