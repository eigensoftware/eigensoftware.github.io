 'use strict';


 var _app = _app || {};

 _app.Module = function() {

 	var uploadCrop;
 	var resultType = 'canvas';
 	var ocrType = 'online';
 	var serach_mode = null;
 	var temp_data = null;
 	var properties_data = {
 		'Code':'21PA001A',
 		'Description':'CRUDE OIL BOOSTER PUMP (21PA001A)',
 		'System':'System 21 - Crude handling and metering',
 		'Area':'Area C32 - Process Mezzanine Deck',
 		'Fire area':'-',
 		'P&IDs':'P&ID LOCAL SEAL PANEL 21PA001A/B PROCESS P&ID CRUDE OIL BOOSTER PUMPS',
 		'ACE links':'None',
 		'Created':'15th Nov 2017 01:01:26 CET',
 		'Last updated':'15th Nov 2017 03:14:00 CET',
 		'Barrier of':'None',
 		'Active':'',
 		'Areaname':'PROCESS MEZZANINE DECK',
 		'Bitmapcriticality':20,
 		'Categoryaveva':'Equipment',
 		'Categorycode':'P',
 		'Categoryname':'PUMPS (NORSOK)',
 		'Component':'PUMP, CENTRIFUGAL',
 		'Contentweight':'34 kg',
 		'Contractor':'AET',
 		'Contractorcode':'AET',
 		'Contractorname':'AKER ENGINEERING',
 		'Costcode':'PL338-6220-221-0-',
 		'Createddate':'2014-10-27 19:30:45.0',
 		'Criticality':'H',
 		'Discipline':'R',
 		'Dryweight':'5630 kg',
 		'Equiphistoryrequired':'YES',
 		'Equipmentwm':'PUMP,CENTRIFUGAL, EXC,M PUMPS,CN-MV-12X10X20',
 		'Exequipmentisrequired':'NO',
 		'Exitem':'N',
 		'Exrequiredequipment':'N',
 		'Functioncode':'PA',
 		'Functioncodedesc':'CENTRIFUGAL PUMPS',
 		'Globalidentifier':1000000000192324,
 		'Hasactiveprograms':2,
 		'Hasbarriers':0,
 		'Hasexplosionprotect':'NO',
 		'Hassetpoints':'NO',
 		'Hassetpointsoftypecpsr':'NO',
 		'Hasworkorders':'',
 		'Height':'1400 mm',
 		'Highestcriticality':'HIGH',
 		'Installationdate':'2015.11.28',
 		'Iscategorysetpointenabled':'NO',
 		'Isfunctionblock':'Y',
 		'Isownedbyproject':'NO',
 		'Length':'2000 mm',
 		'Location':0,
 		'Maintagnumber':'21PA001A',
 		'Manufacturer':'M PUMPS',
 		'Manufacturerpartnumber':'CN-MV-12X10X20',
 		'Model':'CN-MV-12X10X20',
 		'Name':'21PA001A',
 		'Norwegiandescription':'Trykkøknings Pumpe for Råolje',
 		'Originalpo':'ER300',
 		'Partnumber':'CN-MV-12X10X20',
 		'Ponumber':'ER300',
 		'Prevailcomponentname':'CENTRIFUGAL',
 		'Producer':'M PUMPS',
 		'Projectreference':'C000227',
 		'Safetycriticalelement':'N',
 		'Serialnumber':'001/13-29B',
 		'Site':'KST',
 		'Statusaveva':'Active',
 		'Statusdesc':'Active',
 		'Statusisactive':'YES',
 		'Statuslastchanged':'2016-05-13 12:22:28.0',
 		'Statusval':200,
 		'Subsystem':'2101-01',
 		'Supplier':'DELTA-P',
 		'Systemname':'CRUDE HANDLING AND METERING',
 		'Tis_io':'ER300',
 		'Tislocationcode':'EG',
 		'Tislocationname':'Edvard Grieg',
 		'Tispotitle':'PROCESS & UTILITY PUMPS',
 		'Typeaveva':'CENTRIFUGAL',
 		'Typeoftag':'STANDARD',
 		'Updatedbyuserlogon':'MBROCKERMANN',
 		'Updatedbyusername':'Morten Brockermann',
 		'Updateddate':'2016-05-13 12:22:28.0',
 		'Width':'1400 mm',
 		'Workmateresource':30003348
 	};

 	var sensor_data = [
 	'EG_21PA001A_OUT_EX_HEAD',
 	'EG_21PA001A_OUT_EX_EFF',
 	'EG_21PA001A_OUT_LOADNo data',
 	'EG_21PA001A.UNSUCC_STARTS',
 	'EG_21PA001A_OUT_EX_POWER',
 	'EG_21PA001A.BCL',
 	'EG_21PA001A.ATTEMPT_STARTS',
 	'EG_21PA001A_OUT_NPSHR',
 	'EG_21PA001A.S1ALM',
 	'EG_21PA001A.BO',
 	'EG_21PA001A.SUCCESS_STOPS',
 	'EG_21PA001A_MPOW',
 	'EG_21PA001A.ABNORMAL_STOPS',
 	'EG_21PA001A.Y',
 	'EG_21PA001A_OUT_NPSHA',
 	'EG_21PA001A.RUNNING_HOURS',
 	'EG_21PA001A.SUCCESS_STARTS',
 	'EG_21PA001A_OUT_NPSHD',
 	'EG_21PA001A.BA'

 	];

 	var maintenance_data = {
 		'PWO-1004852': 'OLJESKIFT TRYKKØKNINGSPUMPE A FOR RÅOLJE (5000 [hour])',
 		'CWO-1003340': 'SCN3850 OLJE BOOSTER PUMPE DUTY/STANDBY SART',
 		'CWO-1000716': 'VIBRASJON I CRUDE OIL BOOSTER PUMP 21PA001A',
 		'PWO-1003339': 'TRYKKØKNINGSPUMPE A FOR RÅOLJE (12 [month])',
 		'PWO-1007561': 'TRYKKØKNINGSPUMPE A FOR RÅOLJE (12 [month])'
 	};

 	var document_data = {
 		'Analysis, test and calculation':'CURVES AND TABLES',
 		'Certificates':'CERTIFICATE OF CONFORMITY (COC), M PUMPS\nLIFTING EQUIPMENT CERTIFICATES - ER300 PROCESS, UTILITY & MISC. PUMPS\nPRESSURE TEST CERTIFICATES, M PUMPS',
 		'Data Sheet':'CHEMICAL INVENTORY AND SAFETY DATA SHEETS\nMAIN EQUIPMENT DATASHEETS, 21PA001A/B\nNOISE DATA SHEETS, M PUMPS\nPROCESS DATASHEET - ER300 PROCESS & UTILITY PUMPS',
 		'Detail cross sectional drawings':'DETAIL/CROSS-SECTION DRAWING W/PARTS LISTS, 21PA001A/B',
 		'Final documentation Index, Table of content and standard documentation':'FINAL DOCUMENTATION LIST OF CONTENT - PROCESS, UTILITY & MISC PUMPS',
 		'General Arrangement & capacity plan':'GENERAL ARRANGEMENT DRAWING 21PA001A/B CRUDE OIL BOOSTER PUMPS\nGENERAL ARRANGEMENT DRAWINGS WALL MOUNTED SEAL PANEL',
 		'ISO metric drawing, incl. Fabr. heat tracing, stress and pressure testing':'HEAT TRACE ISOMETRIC SYSTEM 21 CRUDE HANDLING AND METERING\nHEAT TRACE ISOMETRIC SYSTEM 21 CRUDE HANDLING AND METERING\nHEAT TRACE ISOMETRIC SYSTEM 21 CRUDE HANDLING AND METERING\nHEAT TRACE ISOMETRIC SYSTEM 21 CRUDE HANDLING AND METERING',


 		'List, registers and indexes':'ATEX SCHEDULE, M PUMPS\nCONSUMPTION DATA (UTILITIES, ELECTRICAL & HVAC)\nLUBRICATION CHART AND INDEX\nSUPPLIER/SUB-SUPPLIERS CONTACTS LIST',
 		'Location drawings (plot plans)':'PLOT PLAN MEZZANINE DECK',

 		'Logic diagram':'SYSTEM CONTROL DIAGRAM CRUDE OIL BOOSTER PUMPS',

 		'Operation and Maintenance Manual':'MATERIAL HANDLING, M PUMPS\nOPERATION AND MAINTENANCE MANUAL, M PUMPS',

 		'Piping and instrumentation diagram (P&ID)':'P&ID LOCAL SEAL PANEL 21PA001A/B\nPROCESS P&ID CRUDE OIL BOOSTER PUMPS',

 		'Report':'MATERIAL HANDLING REPORT',

 		'Spare parts list':'SPARE PARTS LIST & INTERCHANGEABILITY RECORD (SPLIR) - PROCESS, UTILITY AND MISCELLANEOUS PUMPS',

 		'Statutory Certificates (NMD, Class etc.)':'EX CERTIFICATES, M PUMPS',

 		'System topology and block diagrams':'INSTRUMENT BLOCK DIAGRAM 21PA001 A/B\nINSTRUMENT BLOCK DIAGRAM 21PA001A ACCELEROMETER',

 		'Technical Procedures (Incl. Comm. manual and procedures)':'COMMISSIONING AND START-UP PROCEDURES, M PUMPS\nINSTALLATION PROCEDURE, M PUMPS\nINSTALLATION PROCEDURE, NOISE HOOD\nSURFACE PREPARATION AND COATING PROCEDURE, SL?TTLAND\nSURFACE PREPARATION AND COATING PROCEDURES, M PUMPS\nTECHNICAL AND FUNCTIONAL DESCRIPTION, M PUMPS',

 		'Wiring/Tremination diagrams':'INSTRUMENT DIAGRAM ACCELEROMETER 21PA001 A/B\nINSTRUMENT TERMINATION DIAGRAM ACCELEROMETER 21PA001AB'

 	};

 	var init = function() {	onLoad();	setupCropper();	onFileChange();	onSearch();	onCameraInput();//croppieRotationControls();
 		onCanvasRender();toggleOCRType();onBack();onResultClick();tabs();onTabChange();fillPropertiesData();fillSensorData();
 		fillMaintenanceData();fillDocumentData();
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


     var fillPropertiesData = function(){
     	$('#properties_data').empty();
     	for (var key in properties_data) {
     		$('#properties_data').append('<tr><td>'+key+'</td><td>'+properties_data[key]+'</td></tr>');

     	}
     	
     };

     var fillSensorData = function(){
     	$('#sensor_data').empty();
     	for (var key in sensor_data) {
     		$('#sensor_data').append('<tr><td>'+sensor_data[key]+'</td></tr>');

     	}
     	
     };

     var fillMaintenanceData = function(){
     	$('#maintenance_data').empty();
     	for (var key in maintenance_data) {
     		$('#maintenance_data').append('<tr><td>'+key+'</td><td>'+maintenance_data[key]+'</td></tr>');

     	}
     	
     };

     var fillDocumentData = function(){
     	$('#document_data').empty();
     	for (var key in document_data) {
     		$('#document_data').append('<tr><td>'+key+'</td><td>'+document_data[key]+'</td></tr>');

     	}
     	
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
     					//submitOnlineOcr(resp);
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