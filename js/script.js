$(document).ready(function(){
  //chiave API
//2669fd071d162f6f2bafb9c16dee98ad

var urlImg = 'https://image.tmdb.org/t/p/';
var posterSize = 'w342';

  $('.search-ico').click(function(){
    reset();

   var movieSearch = $('#search').val();

    $('.sfondo').addClass('active');
    $('.logo').addClass('visible');
   // searchSeries(movieSearch);
  searchData(movieSearch, 'movies');
  searchData(movieSearch, 'tv');
  $('#search').val('');
  });
  $('#search').keypress(function (event){

    var movieSearch = $('#search').val();
    if (movieSearch.length !==0) {
      if ( event.which === 13 || event.keyCode === 13 ) {
        $('.sfondo').addClass('active');
        $('.logo').addClass('visible');
       // searchSeries(movieSearch);
      searchData(movieSearch, 'movies');
      searchData(movieSearch, 'tv');
      $('#search').val('');
      }
    }

  });


// Attraverso la chiamata ajax cerca nel database il film corrispondente al valore
// immesso nella Input e al tipo di ricerca da effettuare se 'movies' o 'tv'
// argomento: valInput, type
// return: non ritorna niente
 function searchData(valInput, type){
   var api_key = '2669fd071d162f6f2bafb9c16dee98ad';
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
         api_key: api_key,
         query: valInput,
         language:'it-IT'
       },
       success: function(resData){

         var movie = resData.results;

         if (movie.length > 0) {
           print(movie, type);

           // printGenres(valInput, resData.results, type);

         }else {
           if (type === 'movies') {
             var errorMsg = 'La tua ricerca non ha prodotto risultati tra i film'

           }else {
             var errorMsg = 'La tua ricerca non ha prodotto risultati tra le serie TV';

           }
           errorPrintMsg (errorMsg);
         }


       },
       error: function(){
         var errorMsg = 'Errore! Forse non hai inserito alcuna parola chiave nella ricerca'
         errorPrintMsg (errorMsg);
       }


     }
   );

 }
 function errorPrintMsg (message){
   //$('.error-message').remove();
   var source = $("#error-template").html();
   var template = Handlebars.compile(source);

   var context = {
     message : message
   };
   var html = template(context);
   $('.error-message').append(html);

 }

 // Stampa a schermo attraverso Handlebars i film e le serie tv
 // in base al dato ritonato dalla chiamata ajax e dal tipo di ricerca da effettuare se in 'movies' o in 'tv'
 // argomento: argomento: valInput, type
 // return: non ritorna nulla
 function print(movie, type){

   for (var i = 0; i < movie.length; i++) {
     var singoloFilm = movie[i];

     var voteMovie = singoloFilm.vote_average;
     var languageMovie = singoloFilm.original_language;
     var posterMovie = singoloFilm.poster_path;
     var overview = singoloFilm.overview;
     var id = singoloFilm.id;
     // var type = type;

     var originalTitle;
     var title;

     var source = $("#movies-template").html();
     var template = Handlebars.compile(source);

     if (type === 'movies') {
       title = singoloFilm.title;
       originalTitle = singoloFilm.original_title;

     }else {
       title = singoloFilm.name;
       originalTitle = singoloFilm.original_name;
     }
     var context = {
       poster_path: posterize(posterMovie),
        title: title,
        original_title: originalTitle,
        language: flags(languageMovie),
        vote: stars(voteMovie),
        overview: overview,
        type: type,
        // genre: printGenres( movieSearch, movie, type)
      };

     var html = template(context);
     $('.movies-list').append(html);


   }
   var api_key = '2669fd071d162f6f2bafb9c16dee98ad';
   // var genres_name;
   var type;
   if (type === 'movies') {
     var url = 'https://api.themoviedb.org/3/movie/' + id;

   }else {
     var url = 'https://api.themoviedb.org/3/tv/' + id;
   }
 }
 //  // Inizio funzione per recuperare e stampare i Genres

 // function printGenres( valInput, movie, type){
 //   for (var i = 0; i < movie.length; i++) {
 //     var singoloFilm = movie[i];
 //     var id = singoloFilm.id;
 //     console.log(singoloFilm);
 //   var api_key = '2669fd071d162f6f2bafb9c16dee98ad';
 //   // var genres_name;
 //   var type;
 //   if (type === 'movies') {
 //     var url = 'https://api.themoviedb.org/3/movie/' + id;
 //
 //   }else {
 //     var url = 'https://api.themoviedb.org/3/tv/' + id;
 //   }
 //   $.ajax(
 //     {
 //       url: url,
 //       method: 'GET',
 //       data: {
 //         api_key: api_key,
 //         query: valInput,
 //       },
 //       success: function(resdata){
 //         var gender = resdata.genres;
 //         console.log(gender);
 //
 //         var listaGen = '';
 //         for (var i = 0; i < gender.length; i++) {
 //
 //           var filmGenres = gender[i].name;
 //
 //           listaGen += filmGenres;
 //
 //           if (i !== gender.length -1) {
 //             listaGen += ', ';
 //           }
 //         }
 //         var source = $("#genre-template").html();
 //         var template = Handlebars.compile(source);
 //         var context = {
 //           genre: listaGen
 //          };
 //         var html = template(context);
 //         $('.list').append(html);
 //
 //       },
 //       error: function(){
 //         alert( 'error');
 //       }
 //     }
 //   );
 //  }
 // }
 //Fine Genres


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
   $('.messageError').remove();
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
  // Ho assegnato alle img delle bandiere dello stesso nome del codice language ritornate dalla chiamata ajax
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
