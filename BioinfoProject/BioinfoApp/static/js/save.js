$(document).on('click', '#salva_button_png', function(event){
  $('#box_8').fadeIn('slow');
  $('#overlay').fadeIn('fast');

  $.ajaxSetup({ 
       beforeSend: function(xhr, settings) {
           function getCookie(name) {
               var cookieValue = null;
               if (document.cookie && document.cookie != '') {
                   var cookies = document.cookie.split(';');
                   for (var i = 0; i < cookies.length; i++) {
                       var cookie = jQuery.trim(cookies[i]);
                       // Does this cookie string begin with the name we want?
                       if (cookie.substring(0, name.length + 1) == (name + '=')) {
                           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                           break;
                       }
                   }
               }
               return cookieValue;
           }
           if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
               // Only send the token to relative URLs i.e. locally.
               xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
           }
        } 
      });

      var csrftoken = $.cookie('csrftoken');

      function csrfSafeMethod(method) {
          // these HTTP methods do not require CSRF protection
          return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
      }



  $(document).on('click', '#save_button', function(event){
      $('#box_8').fadeOut('fast');
      $('#overlay').fadeOut('fast');
      nome_immagine=document.getElementById('nome_immagine').value;
      var cy = $('#cy').cytoscape('get');
      var cy_png=JSON.stringify(cy.png());
      $.ajax({
            type: 'post',
            url: "BioinfoApp/save_image",
            data: {image: cy_png,
                  format:'png',
                  name: nome_immagine,
                  csrfmiddlewaretoken: '{{ csrf_token }}',
                  },
            success: function (response) {
                alert('Grafo salvato correttamente');
            },
            error:function (xhr, textStatus, thrownError){alert('Si è verificato un errore nel salvataggio del grafo. Riprova!');}

        });
          return false;

    });
  });


  //salvataggio grafo jpg
$(document).on('click', '#salva_button_jpg', function(event){
  $('#box_8').fadeIn('slow');
  $('#overlay').fadeIn('fast');
  $(document).on('click', '#save_button', function(event){
      $('#box_8').fadeOut('fast');
      $('#overlay').fadeOut('fast');
      nome_immagine=document.getElementById('nome_immagine').value;
      var cy = $('#cy').cytoscape('get');
      var cy_jpg=JSON.stringify(cy.jpg());
      $.ajax({
            type: 'post',
            url: "BioinfoApp/save_image",
            data: {image: cy_jpg,
                  format:'jpg',
                  name: nome_immagine,
                  csrfmiddlewaretoken: '{{ csrf_token }}',
                  },
            success: function (response) {
                alert('Grafo salvato correttamente');
            },
            error:function (xhr, textStatus, thrownError){alert('Si è verificato un errore nel salvataggio del grafo. Riprova!');}

        });
          return false;

    });
  });
