from django.shortcuts import render
from django.shortcuts import render_to_response

from django.http import HttpResponse 
from django.utils.safestring import mark_safe

import json
import json as simplejson

from django.views.generic import TemplateView

from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import get_template
from django.template import Context,RequestContext

from models import Percorso

import base64
import os

def give_path(file):
	if(file=="json"):
		print os.path.dirname(__file__)
		path_file = os.path.dirname(os.path.abspath(__file__)) +"/data/dati.json"
		return path_file
	elif(file=="supporto"):
		path_file = os.path.dirname(os.path.abspath(__file__)) + "/data/dati_supporto.txt"
		return path_file
	elif(file=="supporto_json"):
		path_file= os.path.dirname(os.path.abspath(__file__)) +"/data/dati_supporto.json"
		return path_file
	elif(file=="image"):
		path_file=os.path.dirname(os.path.abspath(__file__)) +"/data/img/"
		return path_file
#index
def foo(request): 
	path_file = give_path("json")
	return show_graph(path_file)
	
#mostra quello che e' scritto in dati.json (path_file)
def show_graph(path_file):	
	nuovo_path=give_path("supporto_json")		#si ottiene un file vuoto di supporto
	rete = openFileJson(path_file)    #apre il json originale
	chiavi=format2Json(rete,nuovo_path)		
	rete_format = openFileJson(nuovo_path)
	return render_to_response("show_graph.html", {'graph_elements': mark_safe(json.dumps(rete_format)), 'type_relation':chiavi})


def format2Json(rete,nuovo_path):
						#apre il file txt di supporto alla conversione
	output_node=[]	
	output_rel=[]	
	type_relation_1=[]
	type_relation_2=[]
	with open(nuovo_path, "wb") as file_out:
		for element in rete['data']:			#per ogni elemento all'interno di data nel file originale...
			for item in element['graph']['nodes']:
				label_node=item['labels'][0]
				id_node=item['id']
				properties_node=item['properties']
				
				if(label_node=="microRNA"):
					specie=item['properties']['species']
					name=item['properties']['name']
					accession=item['properties']['accession']
					mirbase=item['properties']['mirbase_link']
					content_node={'data':{'labels':label_node , 'id': id_node, 'species':specie, 'name':name,'accession':accession,'mirbase_link':mirbase}}
					output_node.append(content_node)
				else:
					ncbilink=item['properties']['ncbi_link']
					geneid=item['properties']['geneid']
					species=item['properties']['species']
					ens=item['properties']['ens_code']
					name=item['properties']['name']
					content_node={'data':{'labels':label_node , 'id': id_node, 'ncbi_link':ncbilink, 'geneid':geneid,'species':species,'ens_code':ens,'name':name}}
					output_node.append(content_node)
				
		for element in rete['data']:			#per ogni elemento all'interno di data nel file originale...
			for item in element['graph']['relationships']:
				id_rel=item['id']
				type_rel=item['type']
				start_rel=str(item['startNode'])
				end_rel=str(item['endNode'])
				score=item['properties']['score']
				s_micro=item['properties']['source_microrna']
				s_target=item['properties']['source_target']
				name=item['properties']['name']
				content_rel={'data':{'id': id_rel, 'type':type_rel, 'source':start_rel, 'target':end_rel, 'score': score, 'source_microrna':s_micro ,'source_target': s_target, 'name': name}}
				output_rel.append(content_rel)
		
		json.dump({'nodes':output_node,'edges':output_rel}, file_out, indent=1)
		for element in rete['data']:			
			for item in element['graph']['relationships']:
				type_relation_1.append(str(item['type']))

			type_relation_2=Elimina(type_relation_1)	#elimina i doppioni

	return type_relation_2


def Elimina(lista):
	for i in lista:
		if lista.count(i) > 1:
			lista.remove(i)
	return lista


# supporto --> apertura del file json e ritorno del contenuto
def openFileJson(path_file):
	return json.load(open(path_file))



@csrf_exempt
def save_image(request):
	if request.is_ajax() and request.method=="POST":
		format_type = request.POST.get('format')
		image = request.POST.get('image')
		name = request.POST.get('name')
		stringa = image.split(',')
		while len(stringa[1])%4!=0:
			stringa[1] = stringa[1]+'='
		data=stringa[1].decode('base64')
		if format_type == 'png':
			path=give_path("image")
			filename = path+name+"."+format_type  # I assume you have a way of picking unique filenames
		else: 
			path=give_path("image")
			filename = path+name+"."+format_type  # I assume you have a way of picking unique filenames
		with open(filename, 'wb') as f:
			f.write(data)

		return HttpResponse('OK') 
	else:
	    return HttpResponse('Error')
			


# codice per l'aggiunta di un nodo nel file JSON

#salvataggio del contenuto del POST nel json , passando per il txt
"""
@csrf_exempt
def save_json(request):
	if request.is_ajax() and request.method == "POST":
		grafo = request.POST.get('grafo')
		path_file_txt = save_support_txt(grafo)
		convert2json(path_file_txt)
		return HttpResponse('OK') 
	else:
	    return HttpResponse('Error')
"""

"""
#salvataggio del grafo derivante dal post in un file di testo di supporto
def save_support_txt(oggetto):
	path_file_support = give_path("supporto")
	out_file = open(path_file_support,"w")
	out_file.write(oggetto)
	out_file.close()
	return path_file_support


#conversione del file di supporto in un file json con la struttura del grafo riutilizzabile
def convert2json(path_file):
	with open(path_file, "rb") as file_in:
		content = json.load(file_in)
	path_file_json = give_path("json")
	with open(path_file_json, "wb") as file_out:
		new_content = { 'nodes':content['elements']['nodes'], 'edges':content['elements']['edges'] }
		json.dump(new_content, file_out, indent=1)
		return path_file_json



#aggiornamento file json dopo l'aggiunta di un nodo
@csrf_exempt
def add_nodo(request):
	if request.is_ajax() and request.method == "POST":
		grafo = request.POST.get('grafo_2')
		path_file_support = save_support_txt(grafo)
		path_file_json = convert2json(path_file_support)
		show_graph(path_file_json)
		return HttpResponse('OK')
	else:
		return HttpResponse('Error')
	
"""


