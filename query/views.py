from django.shortcuts import render
from django.views import View
from query.models import Sector

# Create your views here.

class Home(View):

	def get(self, request, *args, **kwargs):
		template_name = 'query/home.html'
		queryset = Sector.objects.all()
		context = { 'queryset' : queryset }
		return render(request, template_name, context)

