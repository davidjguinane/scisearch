from django.conf.urls import url, include
from django.contrib import admin
from query.views import (
		Home,
		ResearchView,
		get_data,
		detailView,
		ResourceView,
	)
from . import views

app_name = 'query'
urlpatterns = [
    url(r'^$', Home.as_view(), name='home'),
    url(r'^data/$', views.get_data, name='data'),
    url(r'^(?P<pk>\d+)/$', views.detailView, name='detail'),
    url(r'^research/$', ResearchView.as_view(), name='research'),
    url(r'^resource/$', ResourceView.as_view(), name='resource'),
]