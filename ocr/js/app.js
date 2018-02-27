 'use strict';


 var _app = _app || {};

 _app.Module = function() {

     var uploadCrop;
     var resultType = 'canvas';
     var ocrType = 'online';
     var serach_mode = null;

     var init = function() {
         onLoad();
         setupCropper();
         onFileChange();
         onSearch();
         onCameraInput();
         onCanvasRender();
         toggleOCRType();
         onBack();
         onResultClick();
         tabs();
         onTabChange();

     };

     //initial ui stuff
     var onLoad = function() {
         $('.ajax').hide();
         $('.tc-holder').hide();
         $('#default_menu .nav-tabs a[href="#searchpanel"]').tab('show');
         setTimeout(function() {
             $('.loading-holder').hide();
             $('.tc-holder').show();
         }, 2000);
     };

     //reads uploaded file and update croppie
     var readFile = function(input) {
         if (input.files && input.files[0]) {
             var reader = new FileReader();

             reader.onload = function(e) {
                 $('.canvas').addClass('ready');
                 serach_mode = 'ocr';
                 uploadCrop.croppie('bind', {
                     url: e.target.result
                 }).then(function() {
                     console.log('jQuery bind complete');
                 });

             }

             reader.readAsDataURL(input.files[0]);
         } else {
             alert("Sorry - you're browser doesn't support the FileReader API");
         }
     };

     //sets up the croppie plugin
     var setupCropper = function() {
         uploadCrop = $('.canvas').croppie({
             enforceBoundary: true,
             enableExif: true,
             viewport: {
                 width: 300,
                 height: 300,
                 type: 'square'
             },
             boundary: {
                 width: '100%',
                 height: '50vh'
             }
         });
     };

     //on file change event
     var onFileChange = function() {
         $('#cameraInput').on('change', function() {
             $('.images-holder').hide();
             $('.canvas').show();
             $('.go').show();
             $('.backgo').show();
             $('.searcharea').hide();
             $('.hold').show();

             readFile(this);
         });
     };

     //event for the serach tag
     var onSearch = function() {
         $("#search_tag").focus(function() {
             serach_mode = 'type';
             $('.imagearea').hide();
             $('.backgo').show();
             $('.go').show();
         });
     };

     var onCameraInput = function() {
         $('#cameraInput').on('click', function(event) {
             event.target.value = null;
         });
     };

     //go button event handler
     //added white list characters
     var onCanvasRender = function() {
         $('.go').on('click', function(ev) {

             if (serach_mode === 'ocr') {
                 $('#status').text('');
                 uploadCrop.croppie('result', {
                     type: resultType,
                     size: 'viewport'
                 }).then(function(resp) {
                     console.log(resp);
                     $('.ocr_result').show();
                     if (ocrType === 'online') {
                         $('#status').text('Processing Text...');
                         submitOnlineOcr(resp);

                     } else {
                         $('#status').text('Processing Text 0%');
                         Tesseract.recognize(resp, {
                                 lang: 'eng',
                                 tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'
                             })
                             .progress(function(p) {
                                 $('#status').text('Processing Text ' + Math.ceil(p.progress * 100) + '%');
                             })
                             .then(function(result) {
                                 $('#status').text('Tap on an object to search');
                                 clearResult();
                                 parseTag(result.text);

                             })
                     }

                 });
             } else if (serach_mode === 'type') {

                 $('#commonmenu_mobile .nav-tabs a[href="#properties"]').tab('show');
                 prev = $('#commonmenu_mobile .nav-tabs a[href="#properties"]').find("img");
                 $('#tag').text($('#search_tag').val());
                 showCommonUI();
             }

         });
     };


     //online ocr handler
     var submitOnlineOcr = function(res) {

         var formData = new FormData();
         formData.append("base64Image", res);
         //formData.append("url", file);
         formData.append("language", "eng");
         formData.append("apikey", "ab2fb0841788957");
         formData.append("isOverlayRequired", true);
         //Send OCR Parsing request asynchronously
         jQuery.ajax({
             url: "https://api.ocr.space/parse/image",
             data: formData,
             dataType: 'json',
             cache: false,
             contentType: false,
             processData: false,
             type: 'POST',
             success: function(ocrParsedResult) {
                 $('#status').text('Tap on an object to search');
                 clearResult();
                 //Get the parsed results, exit code and error message and details
                 var parsedResults = ocrParsedResult["ParsedResults"];
                 var ocrExitCode = ocrParsedResult["OCRExitCode"];
                 var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
                 var errorMessage = ocrParsedResult["ErrorMessage"];
                 var errorDetails = ocrParsedResult["ErrorDetails"];
                 var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
                 //If we have got parsed results, then loop over the results to do something
                 if (parsedResults != null) {
                     //Loop through the parsed results
                     $.each(parsedResults, function(index, value) {
                         var exitCode = value["FileParseExitCode"];
                         var parsedText = value["ParsedText"];
                         var errorMessage = value["ParsedTextFileName"];
                         var errorDetails = value["ErrorDetails"];

                         var textOverlay = value["TextOverlay"];
                         var pageText = '';
                         switch (+exitCode) {
                             case 1:
                                 pageText = parsedText;

                                 break;
                             case 0:
                             case -10:
                             case -20:
                             case -30:
                             case -99:
                             default:
                                 pageText += "Error: " + errorMessage;
                                 break;
                         }
                         parseTag(pageText);

                     });
                 }
             },
             error: function() {
                 $('.ajax').hide();
                 alert('Sorry, something went wrong. Please refresh the page');
             }
         });
     };

     var cleanText = function(v) {
         return v.trim();
     };

     //added 4 types of regex parsing
     var parseTag = function(tag) {
         //for main quipment
         var regx = new RegExp("^[0-9]{2}[a-zA-Z]{2}[0-9]{3}[a-zA-Z0-9]?$");
         //P&ID line number
         var regx2 = new RegExp("^[0-9]{4}[-]{1}[a-zA-Z]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}[-]{1}[a-zA-Z]{2}[0-9]{2}([-]{1}[0-9]{2}[a-zA-Z]{1})?$");
         //line number and valves
         var regx3 = new RegExp("^[0-9]{2}[a-zA-Z]{1}[0-9]{4}$");
         //electrical items related to main tagged items
         var regx4 = new RegExp("^[0-9]{2}[a-zA-Z]{2}[0-9]{3}([a-zA-Z]{1})?[-]{1}[a-zA-Z]{1}[0-9]{2}([-]{1}[a-zA-Z]{1}[0-9]{2}[a-zA-Z]{1})?$");

         var cleantext = cleanText(tag).replace(/[\n\r]+/g, ' ').split(" ");

         for (var i = 0; i < cleantext.length; i++) {

             console.log(cleantext[i].trim());
             if (regx.test(cleantext[i].trim())) {
                 writeResult(cleantext[i].trim());
             } else if (regx2.test(cleantext[i].trim())) {
                 writeResult(cleantext[i].trim());
             } else if (regx3.test(cleantext[i].trim())) {
                 writeResult(cleantext[i].trim());
             } else if (regx4.test(cleantext[i].trim())) {
                 writeResult(cleantext[i].trim());
             }
         }


     };


     //ocr type toggle
     var toggleOCRType = function() {

         $('input[type=radio][name=ocr]').change(function() {
             if (this.value == 'offline') {
                 ocrType = 'offline';
                 resultType = 'blob';
             } else if (this.value == 'online') {
                 ocrType = 'online';
                 resultType = 'canvas';
             }
         });
     };

     //back button event handler
     var onBack = function() {
         $('.backgo').on('click', function(ev) {
             resetCroppie();
             $('.images-holder').show();
             $('.canvas').hide();
             $('.go').hide();
             $('.backgo').hide();
             $('#result').text('');
             $('#status').text('');
             $('.searcharea').show();
             $('.imagearea').show();
             $('.ocr_result').hide();
             $('.hold').hide();

         });
     };

     //resets cropping plugin when going back
     var resetCroppie = function() {
         $('.canvas').removeClass('ready');
         $('.canvas').html("");
         uploadCrop = null;
         setupCropper();
     };

     //write the result to page
     var writeResult = function(text) {
         $('#result').append('<span>' + text.trim() + '</span>');
     };

     //clear result
     var clearResult = function(text) {
         $('#result').empty();
     };

     //on result click
     var onResultClick = function() {
         $('#result').on('click', 'span', function() {
             $('#commonmenu_mobile .nav-tabs a[href="#properties"]').tab('show');
             prev = $('#commonmenu_mobile .nav-tabs a[href="#properties"]').find("img");
             var text = $(this).text();
             $('#tag').text(text);
             //make some api calls
             showCommonUI();
         });


     };

     //tab change shit
     var prev = null;
     var onTabChange = function() {
         $('#commonmenu_mobile .nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {

             if (prev !== null) {
                 prev.attr('src', prev.attr('default'));
             }

             prev = $(e.target).find("img");
             $(e.target).find("img").attr('src', prev.attr('clicked'));
             console.log($("#commonmenu_mobile .tab-content").find(".active").attr('id'));

             if ($("#commonmenu_mobile .tab-content").find(".active").attr('id') === 'search') {
                 $('#default_menu').show();
                 $('#commonmenu_mobile').hide();
                 $('#default_menu .nav-tabs a[href="#searchpanel"]').tab('show');
             }

         });

     };

     var tabs = function() {
         $("#commonmenu_mobile").swipe({
             swipeLeft: function(event, direction, distance, duration, fingerCount) {
                 $(".nav-tabs li.active").next('li').find('a').tab('show');
             },
             swipeRight: function(event, direction, distance, duration, fingerCount) {
                 $(".nav-tabs li.active").prev('li').find('a').tab('show');
             },
         });
     };

     var showCommonUI = function() {
         $('#default_menu').hide();
         $('#commonmenu_mobile').show();
     };

     //public functions
     var oPublic = {
         init: init
     };

     return oPublic;


 }();

 _app.Module.init();