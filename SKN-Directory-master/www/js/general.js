/*function onDeviceReady() {
        navigator.splashscreen.show();
    }*/

function TakePic(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function getQueryVariable(parameter){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == parameter){return pair[1];}
	}
	return(false);
}


var loading = function() {
	// add the overlay with loading image to the page
	var over = '<div id="overlay">' +
	'<img id="loading" src="img/loading.gif">' +
	'</div>';
	$(over).appendTo('body');

	//click on the overlay to remove it
	$('#overlay').click(function() {
	   $(this).remove();
	});

};

var EventTitle = getQueryVariable('Title'),
	EventTitle = decodeURI(EventTitle);

//Menu Items
$(document).on("pageshow",function(){
	//alert('page show');
	var ActivePageN = $.mobile.activePage.attr('id');

	//alert(Menuto);
	if($( "#"+ActivePageN+" .PanelItems" ).has( "li" ).length == 0){
		//alert('no item');
		var MenuItems = null;

		
		MenuItems ='<li><a href="#HomePage" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Home Page</a></li>';
		//MenuItems = MenuItems + '<li><a href="notices.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Notices</a></li>';
		//MenuItems = MenuItems + '<li><a href="cabinetbriefings.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Post Cabinet Briefing</a></li>';
		MenuItems = MenuItems + '<li><a href="ministries.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Ministries</a></li>';
		MenuItems = MenuItems + '<li><a href="departments.html" data-transition="flip" class="ui-btn ui-btn-icon-right ui-icon-carat-r">Departments</a></li>';
		
		
		//MenuItems = MenuItems + '<li class="socialIcons socialIconsSmall" style="margin-left: 10px;width: 17%;"><a href="https://www.youtube.com/user/thesknis"><img src="img/youtube.png" width="100%" height="auto"></a></li>';
		//MenuItems = MenuItems + '<li class="socialIcons"><a href="https://twitter.com/skngov?ref_src=twsrc%5Etfw"><img src="img/twitter.png" width="100%" height="auto"></a></li>';
		//MenuItems = MenuItems + '<li class="socialIcons"><a href="https://www.facebook.com/SKNIS-St-Kitts-and-Nevis-Information-Service-473920689327764/"><img src="img/fblogo.jpg" width="100%" height="auto"></a></li>';
		//MenuItems = MenuItems + '<li class="socialIcons"><a href="https://www.flickr.com/photos/skngov/"><img src="img/flickrlogo.png" width="100%" height="auto"></a></li>';
    	//MenuItems = MenuItems + '<li class="socialIcons socialIconsSmall "><a href="https://soundcloud.com/sknis"><img src="img/soundcloudlogo.png" width="100%" height="auto"></a></li>';
		$( "#"+ActivePageN+" .PanelItems" ).append(MenuItems);
	}
	else{
		//alert($( ".PanelItems" ).html());
	}


	$( "#"+ActivePageN+" .MyFooter h1" ).html("Copyright gov.kn 2016 &copy;");

});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#HomePage')){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           navigator.app.backHistory()
       }
    }, false);
}


 
//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady() {
   // console.log(navigator.notification);
	  //  function onConfirm(buttonIndex) {
		//    alert('You selected button ' + buttonIndex);
		//}

	//	navigator.notification.confirm(
		//    'You are the winner!', // message
		//     onConfirm,            // callback to invoke with index of button pressed
	//	    'Game Over',           // title
	//	    ['Restart','Exit']     // buttonLabels
		//);
//}
//Home Page
$(document).on("pageshow","#HomePage",function(){

	if($( "#HomePage .listitems" ).has( "li" ).length == 0){
		//alert("hi");
		
		
		//$('.listitems').empty();

		$.ajax({
	        url: "https://www.gov.kn/rest/wsc_getgovdirectory/?contenttype=json",
	        	  //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getgovdirectory/?contenttype=json

	        //https://www.gov.kn/rest/wsc_getevents/?contenttype=json
	        //data: {q : 'Van Gogh'},
	        xhrFields: {
	            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
	            // This can be used to set the 'withCredentials' property.
	            // Set the value to 'true' if you'd like to pass cookies to the server.
	            // If this is enabled, your server must respond with the header
	            // 'Access-Control-Allow-Credentials: true'.
	            withCredentials: true
	        },
	    }).then(function(data) {
		      
		    
	        var totalrec = 20; //data.newsObjects.length;
	        /*if(totalrec > 10){
	            var totalrec = 10;
	        }*/
	        var finishid = totalrec - 1;
	        for (var i = 0; i < totalrec; i++) {
	           var entity = data.govDirectoryObjects[i].entity;
	                           
	                	                
	            // if(i <= 4){
	            // 	$('.featlist').append('<li class="featlistitems"><a id="'+i+'" href="details.html?Title='+ title +'" data-transition="slide"><img src="'+imgthumb+'" width="100" height="100"><h3 style="margin-top:5px;">'+title+'</h3><p>'+ DateDisplay +'</p</a></li>');
	            // };
	            
	            $('.listitems').append('<li><a id="'+i+'" href="details.html?Title='+ entity +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ entity +'</h3></a></li>');
	          };
	        $('#overlay').remove();
	    });
	}
});

//////////////////////////////////////
$(document).on("pageshow","#HomePage",function(){
	$('#overlay').remove();
	//alert("pageshow event fired - detailspage is now shown");
$( "#autocompleteall" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ol = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "",
            origlist = $('.listitems');
        $ol.html( "" );
        if ( value && value.length > 2 ) {
            $(document).ready(loading);
            $ol.listview( "refresh" );
            $.ajax({
                url: "https://www.gov.kn/rest/wsc_getgovdirectory/?contenttype=json",
	        	  //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getgovdirectory/?contenttype=json
                dataType: "json",
                crossDomain: true,
                data: {
                    entity: $input.val()
                }
            })
            .then( function ( data ) {
            	PerPage= data.govDirectoryObjects.length;

                // $.each( response, function ( i, val ) {
                //     html += "<li>" + val + "</li>";
                // });
                for (var i = 0; i < PerPage; i++) {
                	//alert(PerPage);
					var entity = data.govDirectoryObjects[i].entity,
						contactPerson = data.govDirectoryObjects[i].contactPerson;
					

					
			        html += '<li><a href="details.html?Title='+ entity +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ entity +'</h3><h3>'+ contactPerson +'</h3></a></li>';
				};
				
				origlist.hide();
				$('#overlay').remove();
                $ol.html( html );
                $('.op-home-list').show;
                $('.Listing').show;
                $('.home_links_div').hide;
                $ol.listview( "refresh" );
                $ol.trigger( "updatelayout");
            });
        }
        else{
        	$('.op-home-list').hide;
        	$('.home_links_div').show;
        	$('.Listing').hide;
        }
    });
 });
/////////////////////////////////////
$(document).on("pageshow","#HomePage",function(){
	//alert("pageshow event fired - detailspage is now shown");
$( "#autocompleteall2" ).on( "filterablebeforefilter", function ( e, data ) {
        var $ol = $( this ),
            $input = $( data.input ),
            value = $input.val(),
            html = "",
            origlist = $('.listitems');
        $ol.html( "" );
        if ( value && value.length > 2 ) {
            $('#overlay').remove();
            $(document).ready(loading);
            $ol.listview( "refresh" );
            $.ajax({
                url: "https://www.gov.kn/rest/wsc_getgovdirectory/?contenttype=json",
	        	  //https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getgovdirectory/?contenttype=json
                dataType: "json",
                crossDomain: true,
                data: {
                    entity: $input.val()
                }
            })
            .then( function ( data ) {
            	PerPage= data.govDirectoryObjects.length;

                // $.each( response, function ( i, val ) {
                //     html += "<li>" + val + "</li>";
                // });
                for (var i = 0; i < PerPage; i++) {
                	//alert(PerPage);
					var contactPerson = data.govDirectoryObjects[i].contactPerson;
					var entity = data.govDirectoryObjects[i].entity;
					

					
			        html += '<li><a href="details.html?Title='+ entity +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ contactPerson +'</h3></a></li>';
				};
				origlist.hide();
				$('#overlay').remove();
                $ol.html( html );
                $ol.listview( "refresh" );
                $ol.trigger( "updatelayout");
            });
        }
        else{
        	origlist.show();
        }
    });
 });

/////////////////////////////////////


//Details Page
$(document).on("pageshow","#detailspage",function(){
	$('#overlay').remove();
	//alert("pageshow event fired - detailspage is now shown");


	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title'),
		NewsTitle = decodeURI(NewsTitle);

	//alert('3');
	$.ajax({
		url: "https://www.gov.kn/rest/wsc_getgovdirectory/?contenttype=json",
		//https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getgovdirectory/?contenttype=json
		data: {entity : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		

		var totalrec = data.govDirectoryObjects.length ;
		//alert(totalrec);
if(totalrec == 0){
			$('.entity').append('No Contact info');
			$('#overlay').remove();

		}else{
		for (var i = 0; i < totalrec; i++) {
		
			var entity = data.govDirectoryObjects[i].entity,

				contactPerson = data.govDirectoryObjects[i].contactPerson,
				contactPersonPosition = data.govDirectoryObjects[i].contactPersonPosition,
				telephone = data.govDirectoryObjects[i].telephone,
				telephoneExtention = data.govDirectoryObjects[i].telephoneExtention,
				primaryEmail = data.govDirectoryObjects[i].primaryEmail,
				fax = data.govDirectoryObjects[i].fax,
				physicalAddress1 = data.govDirectoryObjects[i].physicalAddress1,
				physicalAddress2 = data.govDirectoryObjects[i].physicalAddress2,
				youtube = data.govDirectoryObjects[i].youtube
				facebook = data.govDirectoryObjects[i].facebook,
				twitter = data.govDirectoryObjects[i].twitter,
				physicalAddressCity = data.govDirectoryObjects[i].physicalAddressCity,
				physicalAddressCountry = data.govDirectoryObjects[i].physicalAddressCountry;
				
				$('.contactinfoz').append('<li style="list-style: none;"><h2>'+ contactPerson +'</h2><h3>'+ contactPersonPosition +'</h3><h3><a href="tel:'+ telephone +'">'+ telephone +'</a></h3><h3><a href="mailto:'+ primaryEmail +'">'+ primaryEmail +'</a></h3><h3>'+ fax +'</h3><h3>'+ physicalAddress1 +'</h3><h3>'+ physicalAddress2 +'</h3><h3>'+ youtube +'</h3><h3>'+ facebook +'</h3><h3>'+ twitter +'</h3><h3>'+ physicalAddressCity +'</h3><h3>'+ physicalAddressCountry +'</h3> <input type="button" value="Add to Phone Contacts" id="btnSave'+i+'"><h3 style="border: 1px solid black;"></h3></li>');
				
					  

 				
			
			//$('.contactPerson').append(contactPerson);			
			//$('.contactPersonPosition').append(contactPersonPosition);
			//$('.telephone').append(telephone +'-'+ 'Ext'+ '-'+telephoneExtention);			
			//$('.telephoneExtention').append(telephoneExtention);
			//$('.primaryEmail').append(primaryEmail);
			//$('.fax').append('fax'+fax);
			//$('.physicalAddress1').append(physicalAddress1);
			//$('.physicalAddress2').append(physicalAddress2);
			//$('.youtube').append(youtube);
			//$('.facebook').append(facebook);
			//$('.twitter').append(twitter);
			//$('.physicalAddressCity').append(physicalAddressCity);
			//$('.physicalAddressCountry').append(physicalAddressCountry);

			//// For the form to add contacts to the phone
			$('#note').attr('value' , contactPersonPosition);
			$('#contactPerson').attr('value' , contactPerson);
			//$('#primaryEmail').attr('value' , primaryEmail);
			
			
			//$('.newsImages').attr('src', NewsImg);
			///////////////////////////////////////////////////////////////////
				 
			//////////////////////////////////////////////////////////////////

		};
function onSuccess(contact) {
    alert('Contact has been saved !');
			
};

function onError(contactError) {
    alert("Error = " + contactError.code);
    
};
$('#btnSave0').bind( 'click', function(event, ui) {
                console.log(navigator.notification);
				  	navigator.notification.confirm(
					    'Are You Sure You Want To Add This Contact?', // message
					     onConfirm,            // callback to invoke with index of button pressed
					    'Add Contact',           // title
					    ['No','Yes']     // buttonLabels
					);  

					function onConfirm(buttonIndex) {
				    	if (buttonIndex == 2 ) {
				    		
				    		//alert('You selected button yes ');
				    		
 
                                // create a new contact object
                                var contact = navigator.contacts.create();
                                contact.displayName = data.govDirectoryObjects[0].contactPerson;
                                contact.nickname = "";            // specify both to support all devices
 
                                // populate some fields
                                var name = new ContactName();
                                name.givenName = data.govDirectoryObjects[0].contactPerson;
                                name.familyName = "";
                                contact.name = name;

 								// populate phone number feilds
 								var phoneNumbers = [];
								    phoneNumbers[0] = new ContactField('work', data.govDirectoryObjects[0].telephone, false);
								    phoneNumbers[1] = new ContactField('mobile', data.govDirectoryObjects[0].telephone, true); // preferred number
								    phoneNumbers[2] = new ContactField('home', data.govDirectoryObjects[0].telephone, false);
								    contact.phoneNumbers = phoneNumbers;

                                // save to device
                                contact.save(onSuccess,onError);

				    	}else{
				    		//alert('You selected no or pressed back ');
				    		
				    	};
					    
					}

		                               
});	  


$('#btnSave1').bind( 'click', function(event, ui) {
            
         console.log(navigator.notification);
			  	navigator.notification.confirm(
				    'Are You Sure You Want To Add This Contact?', // message
				     onConfirm,            // callback to invoke with index of button pressed
				    'Add Contact',           // title
				    ['No','Yes']     // buttonLabels
				);  

				function onConfirm(buttonIndex) {
			    	if (buttonIndex == 2 ) {
			    		
			    		//alert('You selected button yes ');
			    		
            // create a new contact object
            var contact = navigator.contacts.create();
            contact.displayName = data.govDirectoryObjects[1].contactPerson;
            contact.nickname = "";            // specify both to support all devices

            // populate some fields
            var name = new ContactName();
            name.givenName = data.govDirectoryObjects[1].contactPerson;
            name.familyName = "";
            contact.name = name;

				// populate phone number feilds
				var phoneNumbers = [];
			    phoneNumbers[0] = new ContactField('work', data.govDirectoryObjects[1].telephone, false);
			    phoneNumbers[1] = new ContactField('mobile', data.govDirectoryObjects[1].telephone, true); // preferred number
			    phoneNumbers[2] = new ContactField('home', data.govDirectoryObjects[1].telephone, false);
			    contact.phoneNumbers = phoneNumbers;

            // save to device
            contact.save(onSuccess,onError);

	    	}else{
	    		//alert('You selected no or pressed back ');
	    		
			    	};
				    
				}

		                               
});	  
$('#btnSave2').bind( 'click', function(event, ui) {
              console.log(navigator.notification);
				  	navigator.notification.confirm(
					    'Are You Sure You Want To Add This Contact?', // message
					     onConfirm,            // callback to invoke with index of button pressed
					    'Add Contact',           // title
					    ['No','Yes']     // buttonLabels
					);  

					function onConfirm(buttonIndex) {
				    	if (buttonIndex == 2 ) {
				    		
				    		//alert('You selected button yes ');
				    		

                // create a new contact object
                var contact = navigator.contacts.create();
                contact.displayName = data.govDirectoryObjects[2].contactPerson;
                contact.nickname = "";            // specify both to support all devices

                // populate some fields
                var name = new ContactName();
                name.givenName = data.govDirectoryObjects[2].contactPerson;
                name.familyName = "";
                contact.name = name;

					// populate phone number feilds
					var phoneNumbers = [];
				    phoneNumbers[0] = new ContactField('work', data.govDirectoryObjects[2].telephone, false);
				    phoneNumbers[1] = new ContactField('mobile', data.govDirectoryObjects[2].telephone, true); // preferred number
				    phoneNumbers[2] = new ContactField('home', data.govDirectoryObjects[2].telephone, false);
				    contact.phoneNumbers = phoneNumbers;

                // save to device
                contact.save(onSuccess,onError);

		    	}else{
		    		//alert('You selected no or pressed back ');
		    		
				    	};
					    
					}

		                               
});	  

$('#btnSave3').bind( 'click', function(event, ui) {
             console.log(navigator.notification);
				  	navigator.notification.confirm(
					    'Are You Sure You Want To Add This Contact?', // message
					     onConfirm,            // callback to invoke with index of button pressed
					    'Add Contact',           // title
					    ['No','Yes']     // buttonLabels
					);  

					function onConfirm(buttonIndex) {
				    	if (buttonIndex == 2 ) {
				    		
				    		//alert('You selected button yes ');
				    		

                // create a new contact object
                var contact = navigator.contacts.create();
                contact.displayName = data.govDirectoryObjects[3].contactPerson;
                contact.nickname = "";            // specify both to support all devices

                // populate some fields
                var name = new ContactName();
                name.givenName = data.govDirectoryObjects[3].contactPerson;
                name.familyName = "";
                contact.name = name;

					// populate phone number feilds
					var phoneNumbers = [];
				    phoneNumbers[0] = new ContactField('work', data.govDirectoryObjects[3].telephone, false);
				    phoneNumbers[1] = new ContactField('mobile', data.govDirectoryObjects[3].telephone, true); // preferred number
				    phoneNumbers[2] = new ContactField('home', data.govDirectoryObjects[3].telephone, false);
				    contact.phoneNumbers = phoneNumbers;

                // save to device
                contact.save(onSuccess,onError);

		    	}else{
		    		//alert('You selected no or pressed back ');
		    	
				    	};
					    
					}

		                               
});	  

$('#btnSave4').bind( 'click', function(event, ui) {
              
					console.log(navigator.notification);
				  	navigator.notification.confirm(
					    'Are You Sure You Want To Add This Contact?', // message
					     onConfirm,            // callback to invoke with index of button pressed
					    'Add Contact',           // title
					    ['No','Yes']     // buttonLabels
					);  

					function onConfirm(buttonIndex) {
				    	if (buttonIndex == 2 ) {
				    		
				    		//alert('You selected button yes ');
				    		
                // create a new contact object
                var contact = navigator.contacts.create();
                contact.displayName = data.govDirectoryObjects[4].contactPerson;
                contact.nickname = "";            // specify both to support all devices

                // populate some fields
                var name = new ContactName();
                name.givenName = data.govDirectoryObjects[4].contactPerson;
                name.familyName = "";
                contact.name = name;

					// populate phone number feilds
					var phoneNumbers = [];
				    phoneNumbers[0] = new ContactField('work', data.govDirectoryObjects[4].telephone, false);
				    phoneNumbers[1] = new ContactField('mobile', data.govDirectoryObjects[4].telephone, true); // preferred number
				    phoneNumbers[2] = new ContactField('home', data.govDirectoryObjects[4].telephone, false);
				    contact.phoneNumbers = phoneNumbers;

                // save to device
                contact.save(onSuccess,onError);

		    	}else{
		    		//alert('You selected no or pressed back ');
		    		
		    	
				    	};
					    
					}

		                               
});	  

$('#btnSave5').bind( 'click', function(event, ui) {
              
					console.log(navigator.notification);
				  	navigator.notification.confirm(
					    'Are You Sure You Want To Add This Contact?', // message
					     onConfirm,            // callback to invoke with index of button pressed
					    'Add Contact',           // title
					    ['No','Yes']     // buttonLabels
					);  

					function onConfirm(buttonIndex) {
				    	if (buttonIndex == 2 ) {
				    		
				    		////alert('You selected button yes ');
				    		
                // create a new contact object
                var contact = navigator.contacts.create();
                contact.displayName = data.govDirectoryObjects[5].contactPerson;
                contact.nickname = "";            // specify both to support all devices

                // populate some fields
                var name = new ContactName();
                name.givenName = data.govDirectoryObjects[5].contactPerson;
                name.familyName = "";
                contact.name = name;

					// populate phone number feilds
					var phoneNumbers = [];
				    phoneNumbers[0] = new ContactField('work', data.govDirectoryObjects[5].telephone, false);
				    phoneNumbers[1] = new ContactField('mobile', data.govDirectoryObjects[5].telephone, true); // preferred number
				    phoneNumbers[2] = new ContactField('home', data.govDirectoryObjects[5].telephone, false);
				    contact.phoneNumbers = phoneNumbers;

                // save to device
                contact.save(onSuccess,onError);

		    	}else{
		    		////alert('You selected no or pressed back ');
		    		
		    	
				    	};
					    
					}

		                               
});	  

		$('.entity').append(data.govDirectoryObjects[0].entity);
	}
		$('#overlay').remove();
	});

	// function AddToCal(){
	// 	// prep some variables
	// 	var startDate = new Date(2016,6,30,18,30,0,0,0); // beware: month 0 = january, 11 = december
	// 	var endDate = new Date(2016,6,15,30,30,0,0,0);
	// 	var title = "My nice event";
	// 	var location = "Home";
	// 	var notes = "Some notes about this event.";
	// 	var success = function(message) { alert("Success: " + JSON.stringify(message)); };
	// 	var error = function(message) { alert("Error: " + message); };

	// 	// create an event silently (on Android < 4 an interactive dialog is shown)
	// 	window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
	// }
});

//All news Page
$(document).on("pageshow","#AllEvents",function(){
	$('#overlay').remove();
	//alert("pageshow event fired - detailspage is now shown");

	$(document).ready(loading);

	var EventTitle = getQueryVariable('Title'),
		EventTitle = decodeURI(EventTitle);

	$.ajax({
		url: "https://www.gov.kn/rest/wsc_getgovdirectory/?contenttype=json",
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.govDirectoryObjects.length,
			PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
					//alert(totalrec);
					var entity = data.govDirectoryObjects[amount].entity;
					
					
					$('.Eventlistitems').append('<li><a href="details.html?Title='+ entity +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ entity +'</h3></a></li>');

					

					var amount = amount + 1;
				};

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'AllEvents'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".Eventlistitems li" ).length,
						Start = Start + 1;

					$(document).ready(Showmore(Start));
				}
			});
		}
		
	});

	
});



//Departments Page
$(document).on("pageshow","#Departments",function(){
$('#overlay').remove();
	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://www.gov.kn/rest/wsc_getdepartmentswithdirectory/?contenttype=json",
        //https://www.gov.kn/rest/wsc_getdepartments/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.departments.length,
        	PerPage = totalrec,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
		            var title = data.departments[amount].name,
		                Descr = data.departments[amount].summary;
		                
		            
		            $('.DepartmentListing').append('<li><a href="details.html?Title='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

		            var amount = amount + 1;
		        };

				$('#overlay').remove();
			}

			
		}

	
    });
});

//Ministries Page
$(document).on("pageshow","#Ministries",function(){
$('#overlay').remove();
	$(document).ready(loading);
	//$('.listitems').empty();

	$.ajax({
        url: "https://www.gov.kn/rest/wsc_getministrieswithdirectory/?contenttype=json",
        //https://www.gov.kn/rest/wsc_getministries/?contenttype=json
        //data: {q : 'Van Gogh'},
        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: true
        },
    }).then(function(data) {
        var totalrec = data.ministries.length,
        	PerPage = 20,
			finishid = PerPage - 1,
			Start = 0;

		$(document).ready(Showmore(Start));

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
		            var title = data.ministries[amount].name,
		                Descr = data.ministries[amount].summary;
		                
		            
		            $('.MinistryListingPH').append('<li><a href="details.html?Title='+title+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+title+'</a></li>');

		            

		            var amount = amount + 1;
		        };

		        $('#overlay').remove();
				
			}

			
		}

    });
});


//Group Event Listing Page
$(document).on("pageshow","#GroupEvents",function(){
	$('#overlay').remove();
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var CatType = getQueryVariable('CatType'),
		CatType = decodeURI(CatType);

	if(CatType == 'Ministries'){
		var SearchParam = getQueryVariable('Min'),
			SearchParamz = decodeURI(SearchParam),

			ServiceUrl = 'https://www.gov.kn/rest/wsc_getministrieswithdirectory/?contenttype=json&entity='+SearchParam+'';
	}
	else if(CatType == 'Departments'){
		var SearchParam = getQueryVariable('Dep'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://www.gov.kn/rest/wsc_getdepartmentswithdirectory/?contenttype=json&entity='+SearchParam+'';
	}
	else if(CatType == 'Categories'){
		var SearchParam = getQueryVariable('Cats'),
			SearchParamz = decodeURI(SearchParam),
			ServiceUrl = 'https://www.gov.kn/rest/wsc_geteventsforcategory/?contenttype=json&category='+SearchParam+'';
	}

	//alert('3');
	$.ajax({
		url: ServiceUrl,
		//data: {q : EventTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.govDirectoryObjects.length;

		var finishid = totalrec - 1;

		$('.EventHeader').append('Contact info for '+SearchParamz);
		
		if(totalrec < 15){$('.SearchEventsInput').css('display', 'none');}
		if(totalrec == 0){
			$('.GroupEventlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No Contact info</h3></a></li>');
			$('#overlay').remove();

		}
		else{
			for (var i = 0; i < totalrec; i++) {
				var entity = data.govDirectoryObjects[i].entity;
				

				$('.GroupEventlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ entity +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ entity +'</h3></a></li>');

				
			};

			$('#overlay').remove();
		}
	});
});


//Group Event Listing Page
$(document).on("pageshow","#SearchEvents",function(){
	$('#overlay').remove();
	//alert("pageshow event fired - detailspage is now shown");
	
	$(document).ready(loading);

	var NewsTitle = getQueryVariable('Title');
		NewsTitle = decodeURI(NewsTitle);
		ServiceUrl = 'https://stkittsnevisegovernmentplatform-test.mendixcloud.com/rest/wsc_getgovdirectory/?contenttype=json';
		//https://www.gov.kn/rest/wsc_getgovdirectory/?contenttype=json

	//alert('3');
	$.ajax({
		url: ServiceUrl,
		data: {entity : NewsTitle},
		xhrFields: {
		// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
		// This can be used to set the 'withCredentials' property.
		// Set the value to 'true' if you'd like to pass cookies to the server.
		// If this is enabled, your server must respond with the header
		// 'Access-Control-Allow-Credentials: true'.
		withCredentials: true
	},
	}).then(function(data) {
		var totalrec = data.govDirectoryObjects.length;
		if(PerPage > totalrec){
			var PerPage = totalrec;
		}
		else{
			var PerPage = 20;
		}
		var	finishid = PerPage - 1,
			Start = 0;

		$('.ResultHeader').append('Showing results for "'+NewsTitle+'"');


		if(totalrec == 0){
			$('.resultlistitems').append('<li><a href="" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>No entity</h3></a></li>');
			$('#overlay').remove();
		}
		else{
			$(document).ready(Showmore(Start));
		}

		function Showmore(amount){
			var run = 'true';
			var EndTo = amount + PerPage;

			if(EndTo > totalrec){
				var sub = EndTo - totalrec;
					PerPage = PerPage  - sub;
			}

			if(amount > totalrec){run = 'false';}
			if(run == 'true'){
				//alert('run');
				for (var i = 0; i < PerPage; i++) {
					var entity = data.govDirectoryObjects[amount].entity;
					
					//alert(EventMins);
					//alert(EventDeps);
					
					$('.resultlistitems').append('<li><a id="'+i+'" href="details.html?Title='+ entity +'" data-transition="slide" class="EventListItem ui-btn ui-btn-icon-right ui-icon-carat-r"><h3>'+ entity +'</h3></a></li>');

					var amount = amount + 1;
				};

				$('#overlay').remove();
			}

			
		}

		var ActivePageN = $.mobile.activePage.attr('id');

		if(ActivePageN == 'SearchEvents'){
			$(document).bind("scrollstop", function() {
				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					//alert("end of page");

					var Start = $( ".resultlistitems li" ).length,
						Start = Start + 1;

					$(document).ready(Showmore(Start));
				}
			});
		}
	});
});

$(document).on("pageshow","#CategoriesListing",function(){
	alert('Listing');
});