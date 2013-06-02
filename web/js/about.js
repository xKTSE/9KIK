App.populator('about', function (page) {

     $(page).find('.app-button').on('click', function(){
          App.load('home', 'fade');
     });
     
});