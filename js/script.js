$(document).ready(function(){
  //chiave API
//2669fd071d162f6f2bafb9c16dee98ad
var urlImg = 'https://image.tmdb.org/t/p/';
var posterSize = 'w342';

  $('.search-ico').click(function(){
   var movieSearch = $('#search').val();

    $('.sfondo').addClass('active');
    $('.logo').addClass('visible');
   // searchSeries(movieSearch);
  searchData(movieSearch, 'movies');
  searchData(movieSearch, 'tv');
  // console.log(movieSearch);

  });


// Attraverso la chiamata ajax cerca nel database il film corrispondente al valore
// immesso nella Input e al tipo di ricerca da effettuare se 'movies' o 'tv'
// argomento: valInput, type
// return: non ritorna niente
 function searchData(valInput, type){
   reset();
   if (type === 'movies') {
     var api_url = 'https://api.themoviedb.org/3/search/movie'
   }else {
     var api_url = 'https://api.themoviedb.org/3/search/tv'
   }
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
         print(movie, type);

       },
       error: function(){
         alert('Errore');
       }


     }
   );

 }

 // Stampa a schermo attraverso Handlebars i film e le serie tv
 // in base al dato ritonato dalla chiamata ajax e dal tipo di ricerca da effettuare se in 'movies' o in 'tv'
 // argomento: argomento: valInput, type
 // return: non ritorna nulla
 function print(movie, type){

   for (var i = 0; i < movie.length; i++) {
     var singoloFilm = movie[i];
     console.log(singoloFilm);

     var voteMovie = singoloFilm.vote_average;
     var languageMovie = singoloFilm.original_language;
     var posterMovie = singoloFilm.poster_path;
     var overview = singoloFilm.overview;
     // var type = type;



     var source = $("#movies-template").html();
     var template = Handlebars.compile(source);

     if (type === 'movies') {
       var title = singoloFilm.title;
       var originalTitle = singoloFilm.original_title;

     }else {
       var title = singoloFilm.name;
       var originalTitle = singoloFilm.original_name;
     }
     var context = {
       poster_path: posterize(posterMovie),
        title: title,
        original_title: originalTitle,
        language: flags(languageMovie),
        vote: stars(voteMovie),
        overview: overview,
        type: type
      };
     var html = template(context);
     $('.movies-list').append(html);
     console.log(html)
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
    var vote = Math.ceil(rating / 2);
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
  // Ho assegnato alle img delle bandiere lo stesso nome del codice language ritornata dalla chiamata ajax
  // faccio un controllo se all'interno della lista  delle bandiere è contenuto il codice language
  // se c'è corrispondenza ritorna l'img della bandierina
  // altrimenti ritorna il codice lingua come testo
  // return: flags
  function flags(country){
  var flagsArray = ['it', 'en', 'fr', 'ja', 'es', 'de'];
  var flags;
  if (flagsArray.includes(country)) {
    flags = '<img src= "img/' + country + '.png">';
  }else {
    flags = country;
  }
    return flags;
  }

});
