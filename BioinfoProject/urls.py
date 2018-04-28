from django.conf.urls import patterns, include, url

from django.contrib import admin

from BioinfoApp.views import foo
from BioinfoApp.views import show_graph
#from BioinfoApp.views import save_json
#from BioinfoApp.views import add_nodo
#from BioinfoApp.views import save_png
#from BioinfoApp.views import save_jpg
from BioinfoApp.views import save_image

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'BioinfoProject.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'BioinfoApp/$', foo),
    url(r'BioinfoApp/show_graph$', show_graph),
    #url(r'BioinfoApp/save_json$',save_json),
    #url(r'BioinfoApp/add_nodo$',add_nodo),
   # url(r'BioinfoApp/save_png$',save_png),
	#url(r'BioinfoApp/save_jpg$',save_jpg),
	url(r'BioinfoApp/save_image$',save_image),
)