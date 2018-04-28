
//tramite una query vengono selezionati gli archi interessati e posti in un array. Per ognuno di essi viene chiamata la funzione hide() che gli attribuisce la classe hidden e li nasconde (funzione da libreria) e solo dopo viene chiamata la funzione hide_node() che nasconde gli eventuali nodi rimasti isolati.

function func_check(el) {
    var cy = $('#cy').cytoscape('get');
    var valore=el.value;  
    var archi = cy.filter('edge[type="'+valore+'"]');
    cy.startBatch();
    archi.forEach(function(entry) {
      entry.hide();
    });
    
    hide_node();    
    cy.endBatch();      
    };


//la funzione effettua una query sul grafo richiamando gli archi interessati e cerca, tramite connectedNodes(), tutti i nodi estremi di quelle relazioni, quindi mostra, con show(), sia i nodi che gli archi.
  function func_uncheck(el){
    var cy = $('#cy').cytoscape('get');
    var valore=el.value;  
    var archi = cy.filter('edge[type="'+valore+'"]');
    cy.startBatch();
    var nodi_estremi = archi.connectedNodes();
    nodi_estremi.forEach(function(el){
      el.show();
    });
    archi.forEach(function(entry) {
      entry.show();
    });
    cy.endBatch();  
  };



  //Per nascondere anche i nodi rimasti isolati, la funzione hide_node() prende dal grafo tutti i nodi dello stesso e per ognuno di essi conta il numero archi connessi ad esso; se tutti gli archi sono nascosti allora nascondi anche il nodo in questione.
  
  function hide_node() {
    var cy = $('#cy').cytoscape('get');
    var nodi= cy.nodes();
    nodi.forEach(function(nodo){
      var i=0;
      archi_connessi = nodo.connectedEdges();
      var cont = archi_connessi.length;
      archi_connessi.forEach(function(arco){
        if(arco.hidden()){
          i++;
        }
      });
      if(i==cont){    //se tutti gli archi sono nascosti
        nodo.hide();
      }
    }); 
  };