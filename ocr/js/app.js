
$('.ajax').hide();
$('.tc-holder').hide();

setTimeout(function(){
	$('.loading-holder').hide();
	$('.tc-holder').show();
},2000);


demoUpload();
function demoUpload() {
	var $uploadCrop;

	function readFile(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('.canvas').addClass('ready');
				$uploadCrop.croppie('bind', {
					url: e.target.result
				}).then(function(){
					console.log('jQuery bind complete');
				});

			}

			reader.readAsDataURL(input.files[0]);
		}
		else {
			swal("Sorry - you're browser doesn't support the FileReader API");
		}
	}

	$uploadCrop = $('.canvas').croppie({
		enforceBoundary:true,
		enableExif:true,
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

	$('#cameraInput').on('change', function () { 
		$('.images-holder').hide();
		$('.canvas').show();
		$('.go').show();
		$('.backgo').show();
		readFile(this); 
	});

	$('#cameraInput').on('click', function (event) { 
		event.target.value = null;
	});

	var resultType = 'canvas';
	$('.go').on('click', function (ev) {
		$('#status').text('');
		$uploadCrop.croppie('result', {
			type: resultType,
			size: 'viewport'
		}).then(function (resp) {
			if(ocrType === 'online'){
				$('#status').text('Processing Text...');
				submitOnlineOcr(resp);

			}else{
				$('#status').text('Processing Text 0%');
				//window.Tesseract = Tesseract.create({ langPath: "js/lang/", workerPath: "http://localhost/android/js/worker.js",corePath: "http://localhost/android/js/index.js"});
				Tesseract.recognize(resp)
				.progress(function  (p) { $('#status').text('Processing Text '+Math.ceil(p.progress * 100) + '%');    })
				.then(function (result) { 

					$('#result').text(result.text);
				})
			}

		});
	});


	function submitOnlineOcr(res){

		var formData = new FormData();
		formData.append("base64Image", res);
		        //formData.append("url", file);
		        formData.append("language"   , "eng");
		        formData.append("apikey"  , "ab2fb0841788957");
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
		        	success: function (ocrParsedResult) {
		        		$('#status').text('Processing Text Complete');
		                //Get the parsed results, exit code and error message and details
		                var parsedResults = ocrParsedResult["ParsedResults"];
		                var ocrExitCode = ocrParsedResult["OCRExitCode"];
		                var isErroredOnProcessing = ocrParsedResult["IsErroredOnProcessing"];
		                var errorMessage = ocrParsedResult["ErrorMessage"];
		                var errorDetails = ocrParsedResult["ErrorDetails"];
		                var processingTimeInMilliseconds = ocrParsedResult["ProcessingTimeInMilliseconds"];
		                //If we have got parsed results, then loop over the results to do something
		                if (parsedResults!= null) {
		                    //Loop through the parsed results
		                    $.each(parsedResults, function (index, value) {
		                    	var exitCode = value["FileParseExitCode"];
		                    	var parsedText = value["ParsedText"];
		                    	console.log(parsedText);
		                    	var errorMessage = value["ParsedTextFileName"];
		                    	var errorDetails = value["ErrorDetails"];

		                    	var textOverlay = value["TextOverlay"];
		                    	var pageText = '';
		                    	switch (+exitCode) {
		                    		case 1:
		                    		pageText = parsedText;
		                    		console.log(pageText);
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

		                    	$('#result').text(pageText);
		                    	/*if(pageText.toLowerCase().indexOf('<?php echo $token; ?>') !== -1){

		                    		$('#success').modal('show');

		                    	}else{
		                    		$('#fail').modal('show');

		                    	}*/



		                    });
		                }
		            },
		            error:function(){
		            	$('.ajax').hide();
		            	alert('Sorry, something went wrong. Please refresh the page');
		            }
		        });
		    }
		}

		$('.backgo').on('click', function (ev) {
			$('.images-holder').show();
			$('.canvas').hide();
			$('.go').hide();
			$('.backgo').hide();
			$('#result').text('');
			$('#status').text('');
			
		});

		var ocrType = 'online';
		$('input[type=radio][name=ocr]').change(function() {
			if (this.value == 'offline') {
				ocrType = 'offline';
				resultType = 'blob';
			}
			else if (this.value == 'online') {
				ocrType = 'online';
				resultType = 'canvas';
			}
		});