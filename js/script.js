// Milestone 2
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5,
// così da permetterci di stampare a schermo un numero di stelle piene
// che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene
// (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera
// della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera
// della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//
// Allarghiamo poi la ricerca anche alle serie tv.
// Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query,
// sia le serie tv, stando attenti ad avere alla fine dei valori simili
// (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)


$(document).ready(function(){
  //chiave API
//2669fd071d162f6f2bafb9c16dee98ad
  $('.search-ico').click(function(){
   var movieSearch = $('#search').val();

  searchMovies(movieSearch);
  // console.log(movieSearch);


});

//Stampa i film a schermo
 function searchMovies(valInput){
   reset();
   $.ajax(
     {
       url: 'https://api.themoviedb.org/3/search/movie',
       method: 'GET',
       data: {
         api_key:'2669fd071d162f6f2bafb9c16dee98ad',
         query: valInput,
         language:'it-IT'
       },
       success: function(resData){
         var movie = resData.results;

         printMovies(movie)

       },
       error: function(){
         alert('Errore');
       }


     }
   );

 }
 function printMovies(movie){
   for (var i = 0; i < movie.length; i++) {
     var titleMovie = movie[i].title;
     var voteMovie = movie[i].vote_average;
     var languageMovie = movie[i].original_language;
     var originalTitleMovie = movie[i].original_title;

     var source = $("#movies-template").html();
     var template = Handlebars.compile(source);
     var context = {
        title: titleMovie,
        original_title: originalTitleMovie,
        language: flags(languageMovie),
        vote: stars(voteMovie)
      };
     var html = template(context);
     $('.movies-list').append(html);
     }


 }
 function reset(){
   $('.movie').remove();
 }
 // Trasforma il voto da 1 a 10 decimale in un numero intero da 1 a 5,
 // così da permetterci di stampare a schermo un numero di stelle piene
 // che vanno da 1 a 5, lasciando le restanti vuote
 //return le stelle
 function stars(rating) {
    var vote = Math.floor(rating / 2);
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= vote) {
          stars += '<i class="fas fa-star"></i>';
        }else {
          stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
  }
  function flags(country){
  var flags = '';

    switch (country) {
      case  'it':
      flags = 'img/italy-flag-xs.png';
        break;

      case  'en':
      flags = 'img/united-kingdom-flag-xs.png';
        break;

      case  'fr':
      flags = 'img/france-flag-xs.png';
        break;

      case  'ja':
      flags = 'img/japan-flag-xs.png';
        break;

      case  'es':
      flags = 'img/spain-flag-xs.png';
        break;

      default: flags = country;

    }
    return flags;
  }

});
