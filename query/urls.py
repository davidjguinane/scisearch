from django.conf.urls import url, include
from django.contrib import admin
from query.views import (
		Home,
	)

app_name = 'query'
urlpatterns = [
    url(r'^$', Home.as_view(), name='home'),
]