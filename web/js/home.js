App.populator('home', function (page) {
     var p = $(page);


     if(App.platform === "ios" && App.platformVersion <= 5){
     
          p.find('.app-topbar .app-title').css('font-family', 'helvetica');
          p.find('.app-topbar .title-bar-container').css('font-family', 'helvetica');
     
     }

     /* Button Functionalities
          1. page transition
          2. page refresh
      */
     p.find('.app-button.semiright.about').on('click', function(){

          _gaq.push(['_trackEvent', 'PageOpen', 'About']);
          App.load('about', 'fade');
     
     });

     p.find('.app-title').on('click', function(){
     
          _gaq.push(['_trackEvent', 'PageOpen', 'Refresh']);
          App.load('home', 'fade');
     
     });







     /* For loader purposes */
     var loaderElem = p.find(".app-section.loader").clone();



     cards.ready(function(){
          /* Fetch data from zerver then use it 
          [this type of design must be used due to the asynchronous callbacks from zerver] */

          zAPI.getData( function(meta, posts){
               if(posts){
                    PageBuilder(posts);
               }else{
                    return;
               }
          });

     });

     function PageBuilder(data){



          /* Unreal SlideViewer
          - some maths to make slideViewer function incoherent with app-topbar & title-bar-text;
          */
          var wrapper = page.querySelector('.wrapper');

          var height = (p.height() - (p.find(".title-bar-text").height() + p.find(".app-topbar").height()));
          wrapper.innerHTML = '';
          wrapper.style.height = height + "px";
          

          var slideViewer = new SlideViewer(wrapper, source,{startAt: 0, length: 30});

          p.find(".app-button.right.kik").click(function(){

               k = slideViewer.page();

               cards.kik.send({
                    title: decodeSpecialChars(data[k].title),
                    text: 'So funny it\'s UNREAL',
                    pic: extract(data[k].description, 'img', 'src'),
                    linkData: JSON.stringify(data[k])
               });

               _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);

          });


          slideViewer.on('flip', function(i){
               if (i >= 0){
                    _gaq.push(['_trackEvent', 'ContentSliding', 'slide']);

                    p.find('.title-bar-text').html(data[i].title);
               }else {
                    return;
               }                 
          });


          /*
          - Force dat SlideViewer to set the title of the first post
          */
          p.find('.title-bar-text')
               .html(data[0].title)
               .clickable().on('click', function(){

                    _gaq.push(['_trackEvent', 'BrowserOpen', 'OpenedTitle']);
                    cards.browser.open(data[0].link);

               });



          function source(i){

               /* to bypass undefined-ness; since Slideviewer loads 3 images at a time */
               if ( i < 0 ) {
                    return;
               }


               /* For Future References if uri & publish dat is needed:
                    var postLink = data[i].link;
                    var postDate = data[i].pubDate.substr(0, data[i].pubDate.length - 14);
               */

               var postImage = extract(data[i].description,'img','src');

               p.find('.title-bar-text').clickable().on('click', function(){
                         _gaq.push(['_trackEvent', 'BrowserOpen', 'OpenedTitle']);
                         cards.browser.open(data[slideViewer.page()].link);

               });


               /* the main slideViewer content */
               var slideContent = $('<div />')
                    .addClass("listwrapper");

               /* Enable iScroll for certain devices */
               if ((App.platform === 'android' && App.platformVersion >= 4) || (App.platform ==='ios' && (App.platformVersion>=5 && App.platformVersion <6))) {
                    slideContent.scrollable(true);
               } else {
                    slideContent.scrollable();
               }

                    var postSection = $('<div />')
                         .addClass('app-section')
                         .css('text-align', 'center')
                         .append(loaderElem.clone());

                    var imageSection = $('<div />')
                         .addClass('image-section')
                         .css('text-align', 'center');

                    var img = $('<img />')
                         .addClass('main-image');

                         /* Show the loader until images are ready to be rendered & displayed */
                         img[0].onload = function() {
                              postSection.find(".loader").remove();
                              imageSection.append(img);
                              postSection.append(imageSection);
                         };


                         img.attr('src', postImage);

                         img.clickable().on('click', function(){

                              _gaq.push(['_trackEvent', 'PageOpen', 'ImagePreview']);
                              App.load('preview', { data : data[slideViewer.page()] }, 'scale-in');
                         });



               slideContent.scrollableNode().append(postSection);
               return slideContent[0];
          }
     }
});
/* Thanks Ben for helping with the kinks of SlideViewer! */