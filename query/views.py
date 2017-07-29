from django.shortcuts import render
from django.views import View
from query.models import Sector
import requests
import json 
from django.http import HttpResponse

# Create your views here.

class Home(View):

	def get(self, request, *args, **kwargs):
		template_name = 'query/home.html'
		queryset = Sector.objects.all()
		context = { 'queryset' : queryset }
		return render(request, template_name, context)

def get_sector(request):

	if request.method == 'POST':
		if request.is_ajax():
			response_dict= { 'success': True }
			sector = request.POST.get('sector','')
			response = requests.get("https://data.qld.gov.au/api/action/datastore_search?resource_id=8b9178e0-2995-42ad-8e55-37c15b4435a3&limit=5000000000")
			response = response.json()
			#print(response)
			return HttpResponse(json.dumps(response))