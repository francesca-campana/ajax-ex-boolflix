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
var api_url = 'https://api.themoviedb.org/3/search/multi';
var urlMovies = 'search/movie';
var urlTvShow = 'search/tv';
var urlImg = 'https://image.tmdb.org/t/p/';
var posterSize = 'w154';
  $('.search-ico').click(function(){
   var movieSearch = $('#search').val();
   // searchSeries(movieSearch);
  searchMovies(movieSearch);
  // console.log(movieSearch);


});

// Attraverso la chiamata ajax cerca nel database il film corrispondente al valore
// immesso nella Input
// return: non ritorna niente
 function searchMovies(valInput){
   reset();
   $.ajax(
     {
       url: api_url,
       method: 'GET',
       data: {
         api_key:'2669fd071d162f6f2bafb9c16dee98ad',
         query: valInput,
         language:'it-IT'
       },
       success: function(resData){

         var movie = resData.results;

         console.log(movie)
         printMovies(movie)


       },
       error: function(){
         alert('Errore');
       }


     }
   );

 }

 // Stampa a schermo attraverso Handlebars i film a schermo
 function printMovies(movie){

   for (var i = 0; i < movie.length; i++) {
     var singoloFilm = movie[i];
     console.log(singoloFilm.name)
     var titleTvShow = singoloFilm.name;
     console.log(titleTvShow);
     var titleMovie = singoloFilm.title;
     console.log(titleMovie);
     var voteMovie = singoloFilm.vote_average;
     var languageMovie = singoloFilm.original_language;
     var originalTitleMovie = singoloFilm.original_title;
     var originalTitleTvShow = singoloFilm.original_name;
     var posterMovie = movie[i].poster_path;
     console.log(posterMovie)
     var tipo = singoloFilm.media_type;
     console.log(tipo)


     var source = $("#movies-template").html();
     var template = Handlebars.compile(source);

     if (singoloFilm.media_type !== 'person') {
       // movies
       var context = {
         poster_path: posterize(posterMovie),
          title: titleMovie,
          original_title: originalTitleMovie ,
          language: flags(languageMovie),
          vote: stars(voteMovie),
       // tv series
          name:titleTvShow,
          original_title_name: originalTitleTvShow,
          media_type: singoloFilm.media_type
        };

     }
     var html = template(context);
     $('.movies-list').append(html);
   }

 }
 //Funzione di inserimento path img
// Come argomento accetta la chiave relativa al poster_path
// se è vuota restituisce l'immagine relativa al film o serie tv
// se è vuota andremo noi a suggerirle un img di 'not-found'
// return: poster
 function posterize(path){
   var poster = '';
   if (path == null) {
     poster = 'img/no_image_found.png';
   }else {
     poster = urlImg + posterSize + path;
   }
   return poster;
 }
 function reset(){
   $('.movie').remove();
 }
 // Trasforma il voto da 1 a 10 decimale in un numero intero da 1 a 5,
 // così da permetterci di stampare a schermo un numero di stelle piene
 // che vanno da 1 a 5, lasciando le restanti vuote
 // return: stars
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
  // Assegna img di bandierina a seconda dell'original language del film selezionato
  // raffronta country con la stringa  ritornata dalla chiamata ajax di
  // original_language e ne assegna la bandierina corrispondente
  // return: flag
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
      case  'de':
      flags = 'img/germany-flag-xs.png';
        break;

      default: flags = '';

    }
    return flags;
  }

});
