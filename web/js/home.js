App.populator('home', function (page, src_data) {
     var  p              = $(page),
          loaderElem     = p.find(".app-section.loader").clone();




     // Remove button borders on older OS'
     if(  (App.platform === 'android' && App.platformVersion < 3) || 
          (App.platform === 'ios' && App.platformVersion < 5)    ) {
          p.find('.app-topbar .app-button.back')
               .css('border-right', '1px solid black');
     }



     // Customize the title text color to give user's a sense of navigation
     p.find('.app-button.back')
          .css('color', src_data.color);



     p.find('#refresh').on('click', function(){
          _gaq.push(['_trackEvent', 'PageOpen', 'Refresh']);
          App.load('home', src_data);
          App.removeFromStack(-1);
     });



     cards.ready(function(){
          /* Async callbacks */
          zAPI.getData(src_data.src, function(meta, posts){
               if (typeof posts !== 'undefined' && posts.length > 0) {

                    PageBuilder(posts);
               
               } else {
                    App.back();

                    App.dialog({   title: "Cannot Load Content",
                                   text: "Please try again."
                              });

                    _gaq.push(['_trackEvent', 'Error', 'Content Loading Error']);
                    return;
               }
          }).error(function(){
               App.dialog({   title: "Network Connection Error",
                              text: "Please make sure you have a network connection then try again."
                         });
               
               _gaq.push(['_trackEvent', 'Error', 'Network Error']);

          });

     });




     function PageBuilder(posts)
     {     
          /* TO DO :
               MOVE THIS DATA PARSER INTO ZERVER
          */
          var data = [];

          for (var j = 0; j < posts.length; j++) {

               var item = {
                    title : posts[j].title,
                    video: extract(posts[j].description, 'iframe', 'src'),
                    imgsrc: extract(posts[j].description, 'img', 'src')
               };

               data.push(item);
          }
          /* ================== */




          // Some math to make silverViewer function coherent with the size of app-topbar & title-bar-text
          var  wrapper   = page.querySelector('.wrapper'),
               height    = (p.height() - (p.find(".title-bar-text").height() + p.find(".app-topbar").height()));
          
          wrapper.innerHTML = '';
          wrapper.style.height = height + "px";
          

          // Initalizing the slideViewer
          var slideViewer = new SlideViewer(wrapper, source, {   startAt: 0,    length: data.length });



          p.find("#kik").click(function(){
               var  k = slideViewer.page(),
                    kikpic;

               if (typeof data[k].video !== 'undefined') {

                    kikpic = '../img/play_preview.png';
               
               } else if (data[k].imgsrc.indexOf('.gif') > -1) {
               
                    kikpic = '../img/kikpic_gif.png';
               
               } else {
               
                    kikpic = data[k].imgsrc;
               
               }


               cards.kik.send({
                    title: decodeSpecialChars(data[k].title),
                    text: 'Check this out!',
                    pic: kikpic,
                    linkData: JSON.stringify(data[k])
               });

               _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);
          });


          /*
               We set the title of the page outside of source(),
               simply because if we didn't,
               there would be instances which the displayed title != display content
          */
          slideViewer.on('flip', function(i){
               if (slideViewer.page() >= 0) {
                    _gaq.push(['_trackEvent', 'ContentSliding', 'slide']);
                    
                    p.find('.title-bar-text')
                         .html(data[slideViewer.page()].title);
               } else {
                    return;
               }                 
          });



          /*
               During a slide transition,
               content from the slideViewer is shown due to the slide,
               we simply make it hidden during slides
          */
          p.on("appForward appBack", function(){

               slideViewer.eachMaster(function (elm, page) {
                    if (page !== slideViewer.page()) {
                         elm.style.visibility = 'hidden';
                    }
               });
          });


          // We need to force the title of the first item to show otherwise it won't
          p.find('.title-bar-text').html(data[0].title);



          function source(i){

               // Bypassing undefined content (note: sliderViewer loads 3 images at a time)
               if ( i < 0 ) {
                    return;
               }

               var  postImage,
                    isVideo = typeof data[i].video !== 'undefined' ? true : false;


               if (isVideo === true) {
                    postImage = '../img/play_preview.png'
               } else {
                    postImage = data[i].imgsrc;
               }

               // Main slideViewer content div
               var slideContent = $('<div />')
                    .addClass("listwrapper");


               // Enable iScroll for certain devices
               if ( (App.platform === 'android' && App.platformVersion >= 4) || 
                    (App.platform ==='ios' && (App.platformVersion>=5 && App.platformVersion <6)))  {

                    slideContent.scrollable(true);

               } else {
                    slideContent.scrollable();
               }





                    var postSection = $('<div />')
                         .addClass('app-section')
                         .append(loaderElem.clone());

                    var imageSection = $('<div />')
                         .addClass('image-section')
                         .css('text-align', 'center');

                    var img = $('<img />');

                         if (isVideo === true) {
                    
                              img.addClass('main-image video');
                              imageSection.css('background','black');
                    
                         } else {
                              img.addClass('main-image');
                         }

                         img[0].onload = function() {
                              postSection.find(".loader").remove();
                              imageSection.append(img);
                              postSection.append(imageSection);
                         };

                         img[0].onerror = function(){
                              App.dialog({   title: "Image Loading Time Out",
                                             text: "Please refresh and try again."
                              });

                              _gaq.push(['_trackEvent', 'Error', 'Image Loading Time Out']);
                         }


                         img.attr('src', postImage);

                         img.clickable().on('click', function(){

                              if (isVideo === true) {
                              
                                   _gaq.push(['_trackEvent', 'PageOpen', 'VideoPreview']);
                                   cards.browser.open(data[i].video);
                              } else {
                                   
                                   _gaq.push(['_trackEvent', 'PageOpen', 'ImagePreview']);
                                   App.load('preview', { data : data[slideViewer.page()] });
                              }

                         });

               slideContent.scrollableNode().append(postSection);
               return slideContent[0];
          }
     }
});
/* Thanks Ben for helping with the kinks of SlideViewer! */