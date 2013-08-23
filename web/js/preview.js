App.populator('preview', function(page, params){


     var  p                   = $(page),
          data                = params.data,
          previewImage,
          previewTitle,
          isVideo             = typeof data.video !== 'undefined' ? true : false;
     


     p.find('.app-content').css('background','black');
     p.css('background','black');



     // TO DO :  SEE IF THIS CAN BE REMOVED FROM CODE
     // if(App.platform === 'ios' && App.platformVersion < 5){

     //           p.find('.app-topbar .app-button.back')
     //                .css('border-shadow','none');
     // }


     // Remove button border on older OS'
     if(  (App.platform === 'android' && App.platformVersion < 3) ||
          (App.platform === 'ios' && App.platformVersion < 5)    ) {
          
          p.find('.app-topbar .app-button.back')
               .css('border-right', '1px solid black');
     }




     if (params.fromKik) {

          p.find('.app-button.back').on('click', function(){
               _gaq.push(['_trackEvent', 'PageOpen', 'Home']);

               if ( cards.picker && cards.picker.cancel ) {
                    cards.picker.cancel();
               }

               App.load('selector', App.getReverseTransition());
               App.removeFromStack(-1);
          });

          /*
               It is not possible to from HOME to PREVIEW with videos. 
               So, the only entry point left is from a Kik Content.
               We simply use a placeholder that launches YouTube.
          */

          if (isVideo === true) {
               previewImage = '../img/play_preview.png';
          } else {
               previewImage = data.imgsrc;
          }

     }




     /* Main Page Builder */
     previewTitle = data.title;


     p.find("#kik").click(function(){

          if (isVideo === true) {

               kikpic = '../img/play_preview.png';

          } else if(data.imgsrc.indexOf('.gif') > -1) {

               kikpic = '../img/kikpic_gif.png';

          } else {

               kikpic = data.imgsrc;
          }

          cards.kik.send({
               title: decodeSpecialChars(data.title),
               text: 'Check this out!',
               pic: kikpic,
               linkData: JSON.stringify(data)
          });

          _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);
     });


     p.find('.preview-title').html(previewTitle);

     if (isVideo === true) {
          /* 
               If we are dealing with a video, 
               we simply use an image placeholder that once pressed,
               will launch YouTube in the browser
          */


          var video = $('<img />')
               .addClass('preview-video')
               .attr('src', '../img/play_preview.png');

          p.find('.app-content')
               .append(video)
               .css('text-align','center');

          p.find('.preview-video').on('click', function(){
               cards.browser.open(data.video);
          });

     } else if (data.imgsrc.indexOf('.gif') > -1) {

          /*
               It should be noted that photoviewer does not support gifs
          */


          var gif = $('<img />')
               .addClass('preview-gif')
               .attr('src', data.imgsrc);

          p.find('.app-content')
               .append(gif)
               .css('text-align', 'center');

     } else {

          previewImage = data.imgsrc;

          var photoViewer = new PhotoViewer(page, [previewImage], {
               automaticTitles: false
          });
     }
});