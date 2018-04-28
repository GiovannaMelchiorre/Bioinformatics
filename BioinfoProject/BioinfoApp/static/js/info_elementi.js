$(document).ready(function(){

  var cy = $('#cy').cytoscape('get');
  cy.on('taphold', 'node', function(evt) {
    var node = evt.cyTarget;
    document.getElementById('id_label_nodo').innerHTML = node.id();
    document.getElementById('name_label_nodo').innerHTML = node.data().name;
    document.getElementById('label_label_nodo').innerHTML = node.data().labels;
    document.getElementById('specie_label_nodo').innerHTML = node.data().species;

    if(node.data().labels=='microRNA'){
      document.getElementById('accession_label_nodo').innerHTML = node.data().accession;
      document.getElementById('m_base_label_nodo').innerHTML = node.data().mirbase_link;
      $("#propr_nodo_1").show();
    }else{
      document.getElementById('id_label_nodo_2').innerHTML = node.id();
      document.getElementById('name_label_nodo_2').innerHTML = node.data().name;
      document.getElementById('label_label_nodo_2').innerHTML = node.data().labels;
      document.getElementById('specie_label_nodo_2').innerHTML = node.data().species;
      document.getElementById('ncbi_label_nodo_2').innerHTML = node.data().ncbi_link;
      document.getElementById('ens_label_nodo_2').innerHTML = node.data().ens_code;
      document.getElementById('gene_label_nodo_2').innerHTML = node.data().geneid;
      $("#propr_nodo_2").show();
    }
    
  });

  cy.on('taphold', 'edge', function(evt) {
    var edge = evt.cyTarget;
    document.getElementById('id_label_rel').innerHTML = edge.id();
    document.getElementById('name_label_rel').innerHTML = edge.data().name;
    document.getElementById('score_label_rel').innerHTML = edge.data().score;
    document.getElementById('s_target_label_rel').innerHTML = edge.data().source_target;
    document.getElementById('s_micro_label_rel').innerHTML = edge.data().source_microrna;
    document.getElementById('type_label_rel').innerHTML = edge.data().type;
    $("#propr_rel").show();
  });
$(document).on('click', '.chiudi_insert', function(){
      $('#propr_rel').hide();
      $('#propr_nodo_1').hide();
      $('#propr_nodo_2').hide();
    });
});
