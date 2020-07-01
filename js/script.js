// Milestone 1:
// Creare un layout base con una searchbar (una input e un button)
// in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo
// i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto

$(document).ready(function(){
  //chiave API
//2669fd071d162f6f2bafb9c16dee98ad
  $('.search-ico').click(function(){
   var movieSearch = $('#search').val();

  printMovie(movieSearch);
  // console.log(movieSearch);


});
//Stampa i film s schermo
 function printMovie(movieSearch){
   $('.movie').remove();
   $.ajax(
     {
       url: 'https://api.themoviedb.org/3/search/movie',
       method: 'GET',
       data: {
         api_key:'2669fd071d162f6f2bafb9c16dee98ad',
         query: movieSearch,
         language:'it-IT'
       },
       success: function(resData){
         var movie = resData.results;
         console.log(movie);

         for (var i = 0; i < movie.length; i++) {
           var titleMovie = movie[i].title;
           var voteMovie = movie[i].vote_average;
           var languageMovie = movie[i].original_language;
           var originalTitleMovie = movie[i].original_title;
           console.log(titleMovie)
           console.log(voteMovie)
           console.log(originalTitleMovie)

           var source = $("#movies-template").html();
           var template = Handlebars.compile(source);
           var context = {
              title: titleMovie,
              original_title: originalTitleMovie,
              language: languageMovie,
              vote: voteMovie
            };
           var html = template(context);
           $('.movies-list').append(html);

         }



       },
       error: function(){
         alert('Errore');
       }



     }
   );

 }

});
