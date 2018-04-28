$(document).on('click', '#button_query_1', function(){
    score_radio=document.getElementById("score_radio_id");
    if (score_radio.checked) {
      var valore;
      if (document.getElementById("magg_ug").checked){
        valore=">=";
      }else if(document.getElementById("ug").checked){
        valore="=";
      }else if(document.getElementById("min_ug").checked){
        valore="<=";
      }else valore='';
      var score_value = document.getElementById("score_value").value;
      var cy = $('#cy').cytoscape('get');

      var query="edge[score "+valore+" "+score_value+"]";

      var collection = cy.filter(query);
      collection.forEach(function(element) {
        element.select();
       
      }); 
    
    }
  });

//query manuale
  $(document).on('click', '#button_query_2', function(){
      var cy = $('#cy').cytoscape('get');
      var query_2=document.getElementById("query_string").value;
      var collection= cy.filter(query_2);
      collection.forEach(function(element) {
        element.select();
              

      });
    });

