//il nodo viene rimosso solo nella visualizzazione del grafo (il JSON non viene modificato)


 $(document).on('click', '#button_remove_node', function(){
    var cy = $('#cy').cytoscape('get');
    cy.remove( 'node:selected' );
    cy.remove( 'edge:selected' );
  });