from django.shortcuts import render
from django.views import View
from query.models import Sector, Center, Equipment
import requests
import json 
from django.http import HttpResponse

# Create your views here.

class Home(View):

	def get(self, request, *args, **kwargs):
		template_name = 'query/home.html'
		queryset = Sector.objects.all()
		equipment = Equipment.objects.all()
		context = { 
			'queryset' : queryset,
			'equipment' : equipment 
		}
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

def detail_view(request, pk):

	if request.method == 'GET':
		template_name = 'query/detail.html'
		response = requests.get("https://data.qld.gov.au/api/action/datastore_search?resource_id=8b9178e0-2995-42ad-8e55-37c15b4435a3&limit=5000000000")
		response = response.json()
		data = response['result']['records']
		i = int(pk) -1
		centrename = data[i]['Centre name']
		abbreviation = data[i]['Abbreviation']
		overview = data[i]['Overview']
		address = data[i]['Address']
		facilities = data[i]['Facilities and major equipment']
		weblink = data[i]['Weblink']
		context = { 
			'centrename' : centrename,
			'abbreviation' : abbreviation,
			'overview' : overview,
			'address' : address,
			'facilities' : facilities,
			'weblink' : weblink,
			}
		return render(request, template_name, context)
