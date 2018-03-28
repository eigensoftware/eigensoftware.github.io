 'use strict';


 var _app = _app || {};

 _app.Module = function() {

    var elastic_search_url = "https://lnopt.nor.root.lundin.lan/ei-applet/search?cmd=DODIRECTSEARCH&clientname=elasticsearch-prod&index=assetmodel&search=";
    var common_menu_api_url = "https://lnopt.nor.root.lundin.lan/ei-applet/commonmenu?cmd=GETMENU&assetpath=";
    var trend_api_url = "https://lnopt.nor.root.lundin.lan/historian-servlet/trend2";

 	var uploadCrop;
 	var resultType = 'canvas';
 	var ocrType = 'online';
 	var serach_mode = null;
 	var temp_data = null;


 	var init = function() {	onLoad();	setupCropper();	onFileChange();	onSearch();	onCameraInput();//croppieRotationControls();
openQRScan();onQRChange();qrSetup();settings_menu_setup();reload_app();
 		onCanvasRender();toggleOCRType();onBack();onResultClick();tabs();onTabChange();
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


     var fillPropertiesData = function(properties){
     	$('#properties_data').empty();
        if(properties != undefined && properties.length != 0){
         	for (var key in properties) {
                if(!(properties[key] instanceof Array)){
                    $('#properties_data').append('<tr><td>'+key+'</td><td>'+properties[key]+'</td></tr>');
                }


         	}
         }else{
            $('#properties_data').html('<tr><td style="text-align:center">No properties data available for this tag</td></tr>');
         }

     };

     var fillSensorData = function(sensors){
     	$('#sensor_data').empty();
        if(sensors != undefined && sensors.length != 0){
            for (var key in sensors) {
                $('#sensor_data').append('<tr><td>'+sensors[key].datatag[0].split('/')[1]+'</td></tr>');
            }
        }else{
            $('#sensor_data').html('<tr><td style="text-align:center">No sensor data available for this tag</td></tr>');
        }


     };

     var fillMaintenanceData = function(maintenance){
     	$('#maintenance_data').empty();
        if(maintenance != undefined && maintenance.length != 0){
         	for (var key in maintenance) {
         		$('#maintenance_data').append('<tr><td>'+maintenance[key].workOrderNumber+': </td><td>'+maintenance[key].description+'</td></tr>');

         	}
        }else{
            $('#maintenance_data').html('<tr><td style="text-align:center">No maintenance data available for this tag</td></tr>');
        }

     };

     var fillDocumentData = function(documents){
     	$('#document_data').empty();
        if(documents != undefined && documents.length != 0){
         	for (var key in documents) {
         		$('#document_data').append('<tr><td>'+documents[key].typelabel+'</td><td>'+documents[key].description+'</td></tr>');

         	}
        }else{
            $('#document_data').html('<tr><td style="text-align:center">No document data available for this tag</td></tr>');
        }

     };

     var clearTabs = function(){
        $('#document_data').html('<tr><td style="text-align:center">No document data available for this tag</td></tr>');
        $('#sensor_data').html('<tr><td style="text-align:center">No sensor data available for this tag</td></tr>');
        $('#maintenance_data').html('<tr><td style="text-align:center">No maintenance data available for this tag</td></tr>');
        $('#properties_data').html('<tr><td style="text-align:center">No properties data available for this tag</td></tr>');

     };

     var loadingData = function(){
        $('#document_data').html('<tr><td style="text-align:center">Loading document data...</td></tr>');
        $('#sensor_data').html('<tr><td style="text-align:center">Loading sensor data...</td></tr>');
        $('#maintenance_data').html('<tr><td style="text-align:center">Loading maintenance data...</td></tr>');
        $('#properties_data').html('<tr><td style="text-align:center">Loading properties data...</td></tr>');

     };

     //reads uploaded file and update croppie
     var readFile = function(input) {
     	if (input.files && input.files[0]) {
     		var reader = new FileReader();

     		reader.onload = function(e) {
     			$('.canvas').addClass('ready');
     			serach_mode = 'ocr';
     			temp_data = e.target.result;
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

     		viewport: {
     			width: '80%',
     			height: '45vh',
     			type: 'square'
     		},
     		boundary: {
     			width: '100%',
     			height: '50vh'
     		},
     		enableExif: true,
     		enforceBoundary: true

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


     var openQRScan = function(){
        $('.triggerQR').on('click', function(event) {
            $('#qrInput').trigger('click');
        });

     };

     var onQRChange = function(){
        $('#qrInput').on('change', function() {
            $('.settings').hide();
            $('.scan_ongoing').show();
            readQRFile(this);
        });

     };

     var readQRFile = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                //temp_data = e.target.result;
                scanQRCode(e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        } else {
            alert("Sorry - you're browser doesn't support the FileReader API");
        }
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

        $('#qrInput').on('click', function(event) {
            event.target.value = null;
        });
     };

     //go button event handler
     //added white list characters
     var onCanvasRender = function() {
     	$('.go').on('click', function(ev) {
            tagCount = 0;
     		if (serach_mode === 'ocr') {
     			$('#status').text('');
     			uploadCrop.croppie('result', {
     				type: resultType,
     				size: 'viewport'
     			}).then(function(resp) {
     				console.log(resp);

                    loadingData();
     				$('.ocr_result').show();
     				if (ocrType === 'online') {
     					$('#status').text('Processing Text...');
     					//submitOnlineOcr(resp);
                        //scanQRCode(resp);
     					submitGoogleCouldVisionAPI(resp);
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
                            c = 0;
     						$('#status').text('Tap on an object to search');
     						clearResult();
     						parseTag(result.text);

     					})
     				}

     			});
     		} else if (serach_mode === 'type') {
                clearResult();
                loadingData();
     			var tag = $('#search_tag').val();
                parseTag(tag);
                $('.ocr_result').show();
     			//$('#tag').text($('#search_tag').val());
     			//showCommonUI();
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


     var submitGoogleCouldVisionAPI = function(res){
     	clearResult();
     	var json = '{' +
     	' "requests": [' +
     	'	{ ' +
     	'	  "image": {' +
     	'	    "content":"' + res.replace("data:image/png;base64,", "") + '"' +
     	'	  },' +
     	'	  "features": [' +
     	'	      {' +
     	'	      	"type": "DOCUMENT_TEXT_DETECTION",' +
     	'			"maxResults": 200' +
     	'	      }' +
     	'	  ]' +
     	'	}' +
     	']' +
     	'}';

     	$.ajax({
     		type: 'POST',
     		url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAxl51CyQapewf1VjWdzc_1xrjsakHyQqM",
     		dataType: 'json',
     		data: json,
		    //Include headers, otherwise you get an odd 400 error.
		    headers: {
		    	"Content-Type": "application/json",
		    },

		    success: function(data, textStatus, jqXHR) {
		    	if(data.responses[0].fullTextAnnotation){
                    $('#status').text('Tap on an object to search');
		    		parseTag(data.responses[0].fullTextAnnotation.text);
		    	}
		    	//console.log(data.responses[0].fullTextAnnotation.text);
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		    	console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
		    }
		});
     };

     var cleanText = function(v) {
     	return v.trim();
     };

     var tagCount = 0;
     var temp_result = null;
     //added 4 types of regex parsing
     var parseTag = function(tag) {
         //for main quipment
         var regx = new RegExp("^[0-9]{2}[a-zA-Z]{2}[0-9]{3}[a-zA-Z0-9]?$");
         //P&ID line number
         var regx2 = new RegExp("^[0-9]{4}[-]{1}[a-zA-Z]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}[-]{1}[a-zA-Z]{2}[0-9]{2}([-]{1})?([0-9]{2})?([a-zA-Z]{1})?$");
         //line number and valves
         var regx3 = new RegExp("^[0-9]{2}[a-zA-Z]{1}[0-9]{4}$");
         //electrical items related to main tagged items
         var regx4 = new RegExp("^[0-9]{2}[a-zA-Z]{2}[0-9]{3}([a-zA-Z]{1})?[-]{1}[a-zA-Z]{1}[0-9]{2}([-]{1}[a-zA-Z]{1}[0-9]{2}[a-zA-Z]{1})?$");

         var cleantext = cleanText(tag).replace(/[\n\r]+/g, ' ').split(" ");

         for (var i = 0; i < cleantext.length; i++) {

         	console.log(cleantext[i].trim());
         	if (regx.test(cleantext[i].trim())) {
                tagCount++;
                temp_result = cleantext[i].trim();
         		writeResult(cleantext[i].trim());
         	} else if (regx2.test(cleantext[i].trim())) {
                tagCount++;
                temp_result = cleantext[i].trim();
         		writeResult(cleantext[i].trim());
         	} else if (regx3.test(cleantext[i].trim())) {
                tagCount++;
                temp_result = cleantext[i].trim();
         		writeResult(cleantext[i].trim());
         	} else if (regx4.test(cleantext[i].trim())) {
                tagCount++;
                temp_result = cleantext[i].trim();
         		writeResult(cleantext[i].trim());
         	}
         }

         if(tagCount == 1){
            showCommonUI();
            getDataForTag(temp_result);
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
     			resultType = 'base64';
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

     var croppieRotationControls = function(){
     	$('.rotleft').click(function(){
     		uploadCrop.croppie('rotate', -90);


     	});

     	$('.rotright').click(function(){
     		uploadCrop.croppie('rotate',90);

     	});
     };

     //resets cropping plugin when going back
     var resetCroppie = function() {
     	//$('.canvas').removeClass('ready');
     	//$('.canvas').html("");
     	//uploadCrop = null;
     	//setupCropper();
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

     		var text = $(this).text();
     		$('#tag').text(text);
            getDataForTag(text);
             //make some api calls
            showCommonUI();
         });


     };

     var reload_app = function(){
        $('.reload').on('click', function(event) {
             $('a[href="#searchpanel"]').tab('show');
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

     var settings_menu_setup = function(){

        $('.server_setup').on('click', function(event) {
            $('a[href="#settings"]').tab('show');
            $('.settings').show();
            $('.about').hide();
            $('.logs').hide();
        });

         $('.about_link').on('click', function(event) {
           $('a[href="#settings"]').tab('show');
            $('.settings').hide();
            $('.about').show();
            $('.logs').hide();
        });

         $('.logs_link').on('click', function(event) {
            $('a[href="#settings"]').tab('show');
            $('.settings').hide();
            $('.about').hide();
            $('.logs').show();
        });


     }

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
        $('#commonmenu_mobile .nav-tabs a[href="#properties"]').tab('show');
        prev = $('#commonmenu_mobile .nav-tabs a[href="#properties"]').find("img");
     	$('#default_menu').hide();
     	$('#commonmenu_mobile').show();
     };

     var qrSetup = function(){
        $('.scn_complete').on('click', function(event) {
            $('.scan_ok').hide();
            $('.settings').show();
        });

        $('.try_again').on('click', function(event) {
            $('.scan_failed').hide();
            $('.settings').show();
        });

        $('.cancel').on('click', function(event) {
            $('.scan_failed').hide();
            $('.settings').show();
        });

        $('.save_url_data').on('click', function(event) {
            setElasticURL($( "input[name='elastic_url']" ).val());
            setCommonMenuURL($( "input[name='common_menu_url']" ).val());
            setTrendURL($( "input[name='trend_url']" ).val());

        });

     };

     var setElasticURL = function(val){
        elastic_search_url = val;

     };

     var setCommonMenuURL = function(val){
        common_menu_api_url = val;

     };

     var setTrendURL = function(val){
        trend_api_url = val;

     };


     var getDataForTag = function(tag){

        var json_query = {"query":{"term":{"asset.assettag.raw":tag}}};
        $.ajax({
            // type: 'POST',
            // url: 'elastic_search.php',
            type: 'GET',
            url: 'https://lunappd.dev.lundin.eigen.co/ei-applet/search?cmd=DODIRECTSEARCH&clientname=elasticsearch-prod&index=assetmodel&search=' + encodeURIComponent(JSON.stringify(json_query)),
            dataType: 'json',
            data: {tag:tag},
            success: function (data) {
                if(data.results.length > 0){
                    var data_set = data.results[0]._source.asset;
                    fillPropertiesData(data_set);
                    //getDataForCommonMenu(data_set.path);
                    fillSensorData(data_set.history);
                    fillMaintenanceData(data_set.hasworkorders);
                    fillDocumentData(data_set.documents);
                    console.log(data_set);
                }else{
                    clearTabs();
                }
            }
        });
     };



     var getDataForCommonMenu = function(path){

        // var json_query = {"query":{"term":{"asset.assettag.raw":tag}}};
        $.ajax({
            // type: 'POST',
            // url: 'common_menu_api.php',
            type: 'GET',
            url: 'https://lunappd.dev.lundin.eigen.co/ei-applet/commonmenu?cmd=GETMENU&assetpath=' + path,
            dataType: 'json',
            data: {path:path},
            success: function (data) {

                console.log(data);
                //if(data.results.length > 0){
                    //var data_set = data.results[0]._source.asset;
                    //fillPropertiesData(data_set);
                    //console.log(data_set);

                //}
            }
        });
     };


     var scanQRCode = function(img){

          function decodeImageFromBase64(data, callback){
                // set callback
                qrcode.callback = callback;
                // Start decoding
                qrcode.decode(data)
            }

        decodeImageFromBase64(img,function(decodedInformation){
            $('.scan_ongoing').hide();
            if(decodedInformation != ''){
                console.log(decodedInformation);
                var obj;
                try {
                    obj = JSON.parse(decodedInformation);
                } catch(e) {
                    $('.scan_failed').show();
                }


                if(obj != undefined && obj.elastic_api != undefined && obj.common_menu_api != undefined && obj.trend_api!= undefined ){
                    $( "input[name='elastic_url']" ).val(obj.elastic_api);
                    $( "input[name='common_menu_url']" ).val(obj.common_menu_api);
                    $( "input[name='trend_url']" ).val(obj.trend_api);
                    $('.scan_ok').show();
                }else{
                    $('.scan_failed').show();
                }

            }
               //alert(decodedInformation);
         });

     };


     //public functions
     var oPublic = {
     	init: init
     };

     return oPublic;


 }();

 _app.Module.init();
