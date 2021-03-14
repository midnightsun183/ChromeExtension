
app.config.backupSettings.priorityOnly['indeed'] = false;
app.config.backupSettings.priorityOnly['indeed-apply'] = false;

app.config.backupSettings.depthOptions.priorityOnly['indeed'] = true;
app.config.backupSettings.depthOptions.priorityOnly['indeed-apply'] = true;

app.config.backupSettings.sortBy['indeed'] = [];
app.config.backupSettings.sortBy['indeed-apply'] = [];

app.config.backupSettings.depthOptions.binding['indeed'] = {
    name: 'friends_all',
    collect: 'friends',
};
app.config.backupSettings.depthOptions.binding['indeed-apply'] = {
    name: 'friends_all',
    collect: 'friends',
};


app.config.backupSettings.depthOptions.priority['indeed'] = [
    'profile',
];
app.config.backupSettings.depthOptions.priority['indeed-apply'] = [
    'profile',
];


app.config.backupSettings.priority['indeed'] = [
];
app.config.backupSettings.priority['indeed-apply'] = [
];

//update bind settings
app.config.bindSettings['indeed'] = {
    //bind collection with
    bindWith: 'userId',
    bindValue: '',
    bindDefault: 'me',
    bindings: {
        userId: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a',
            using: 'data-hovercard',
            regex: 'user.php?id={user_id}&',
            binds: '{user_id}',
            avoid: '',
            format: 'integer'
        },
        userName: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a',
            using: 'href',
            regex: 'indeed.com/{user_name}',
            binds: '{user_name}',
            avoid: '',
            format: ''
        },
        fullName: {
            value: '',
            query: '#userNav .sideNavItem > a > div[dir="ltr"].linkWrap',
            using: 'innerText',
            regex: '',
            binds: '{full_name}',
            avoid: '',
            format: ''
        },
        firstName: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a span span',
            using: 'innerText',
            regex: '',
            binds: '{first_name}',
            avoid: '',
            format: ''
        },
        profileImage: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a img',
            using: 'src',
            regex: '',
            binds: '{profile_image}',
            avoid: '',
            format: ''
        }
    }
};
//update bind settings
app.config.bindSettings['indeed-apply'] = {
    //bind collection with
    bindWith: 'userId',
    bindValue: '',
    bindDefault: 'me',
    bindings: {
        userId: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a',
            using: 'data-hovercard',
            regex: 'user.php?id={user_id}&',
            binds: '{user_id}',
            avoid: '',
            format: 'integer'
        },
        userName: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a',
            using: 'href',
            regex: 'indeed-apply.com/{user_name}',
            binds: '{user_name}',
            avoid: '',
            format: ''
        },
        fullName: {
            value: '',
            query: '#userNav .sideNavItem > a > div[dir="ltr"].linkWrap',
            using: 'innerText',
            regex: '',
            binds: '{full_name}',
            avoid: '',
            format: ''
        },
        firstName: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a span span',
            using: 'innerText',
            regex: '',
            binds: '{first_name}',
            avoid: '',
            format: ''
        },
        profileImage: {
            value: '',
            query: '#bluebarRoot div[role="banner"] div[role="navigation"] div[data-click="profile_icon"] a img',
            using: 'src',
            regex: '',
            binds: '{profile_image}',
            avoid: '',
            format: ''
        }
    }
};


app.config.requireSettings['indeed'] = {
    //require settings
    bindSettings: {
        userId: true,
        userName: true,
        firstName: true,
    },
    //require settings
    searchCollections: {
        key: true,
        value: true,
        userId: true,
        userName: true,
        firstName: true,
        profileImage: true,
        videoId: true,
    },
};

app.config.requireSettings['indeed-apply'] = {
    //require settings
    bindSettings: {
        userId: true,
        userName: true,
        firstName: true,
    },
    //require settings
    searchCollections: {
        key: true,
        value: true,
        userId: true,
        userName: true,
        firstName: true,
        profileImage: true,
        videoId: true,
    },
};
//single - append to existing object
app.config.searchCollections = app.add([
], app.config.searchCollections );


app.config.searchServices = app.add([
    {
        text: '',
        active: true,
        enable: true,
        name: 'indeed',
        icon: 'indeed',
        domain: 'www.indeed.com',
        url: 'https://www.indeed.com',
        clickButton: false,
        searchButton: '#sfdiv button[type="submit"]',
        searchForm: '#tsf',
        searchText: '#lst-ib,.gLFyf.gsfi',
        resultLink: '#rso div.srg div.g div.rc h3 a',
        resultDesc: '#rso div.srg div.g div.rc div.s div .st',
        pagifyLink: '#nav a.fl',
        otherTerms: '#brs div.card-section div.brs_col p a',
        repeatLink: '#ofr a',
        pageNumber: '&num=',
        pageStart: '&start=',
        spawnCount: 25,
        resultSize: 100,
        resultAdd: 0
    },
    {
        text: '',
        active: true,
        enable: true,
        name: 'indeed-apply',
        icon: 'indeed',
        domain: 'apply.indeed.com',
        url: 'https://apply.indeed.com',
        clickButton: false,
        searchButton: '#sfdiv button[type="submit"]',
        searchForm: '#tsf',
        searchText: '#lst-ib,.gLFyf.gsfi',
        resultLink: '#rso div.srg div.g div.rc h3 a',
        resultDesc: '#rso div.srg div.g div.rc div.s div .st',
        pagifyLink: '#nav a.fl',
        otherTerms: '#brs div.card-section div.brs_col p a',
        repeatLink: '#ofr a',
        pageNumber: '&num=',
        pageStart: '&start=',
        spawnCount: 25,
        resultSize: 100,
        resultAdd: 0
    }
], app.config.searchServices );

// set autostart services
app.config.autoStart['indeed-apply'] = function() {
	// set app debug
    var clickModal = false;
    var isLoading = false;
    var modalClicks = 0;
    var isEmptyPage = 0;
    var startEvents = 'mouseover,mouseenter,mousemove,focus,focusin,mousemove,mouseup,click'.split(',');
    var pressEvents = 'keydown,keypress,input,keyup'.split(',');
    var finalEvents = 'mousemove,mouseout,mouseleave,change,blur,focusout'.split(',');
    var eventsList = 'abort,afterprint,animationend,animationiteration,animationstart,beforeprint,beforeunload,blur,canplay,canplaythrough,change,click,contextmenu,copy,cut,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,ended,error,focus,focusin,focusout,fullscreenchange,fullscreenerror,hashchange,input,invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,loadstart,message,mousedown,mouseenter,mouseleave,mousemove,mouseover,mouseout,mouseup,mousewheel,offline,online,open,pagehide,pageshow,paste,pause,play,playing,popstate,progress,ratechange,resize,reset,scroll,search,seeked,seeking,select,show,stalled,storage,submit,suspend,timeupdate,toggle,touchcancel,touchend,touchmove,touchstart,transitionend,unload,volumechange,waiting,wheel'.split(',');
    //set pause default
    //set simulate click
    var simulateClick = function( obj, value, type ) {
    	// set value
    	// obj.value = value;
    	// set text size
    	let text = (value+'');
    	let size = text.length;
    	// set events list
    	for(let x=0; x < eventsList.length; x++) {
	    	obj.addEventListener(eventsList[x], function(){
	    		console.log(eventsList[x]);
	    	});
	    }
	    // set start events
	    for(var i=0; i < startEvents.length; i++) {
	    	app.click( obj, document, startEvents[i]);
		}
		// set click events
	    for(var s=0; s < size; s++) {
	    	for(var r=0; r < pressEvents.length; r++) {
	    		app.click( obj, document, pressEvents[r]);
	    	}
		}
		// set value
		obj.value = value;
		// set ending events
	    for(var o=0; o < finalEvents.length; o++) {
	    	app.click( obj, document, finalEvents[o]);
		}
		return true;
    };
    //check input fields
    var hasEmptyFields = function(){
    	let empty = 0;
    	let groups = document.querySelectorAll('.ia-ScreenerQuestions > div,.ia-UserFields');
    	// loop in labels
    	if( groups.length > 0 ) {
    		// look in groups
	    	for( var l=0; l < groups.length;l++ ) {
	    		let group = groups[l];
		    	let input = group.querySelectorAll('.icl-TextInput-wrapper input,.icl-Textarea-control' );
		    	if( input.length > 0 ) {
		    		for(var i=0; i < input.length; i++) {
		    			if( input[i].value === '' ) {
		    				empty++;
		    			}
		    		}
		    	}
		    }
		}
    	return ( empty > 0 )
    };
    // set prefill section
    var prefillSections = function(){
		if( app.debug ) debugger;
    	// check for form section element
    	let groups = document.querySelectorAll('.ia-ScreenerQuestions > div,.ia-UserFields');
    	// check question type
    	let questions = app.questions;
    	let answers = app.answers;
    	// set counts
    	let added = 0;
    	let total = 0;
    	// loop in labels
    	if( groups.length > 0 ) {
    		// set total
    		total = groups.length;
    		// look in groups
	    	for( var l=0; l < groups.length;l++ ) {
	    		// if( app.debug ) debugger;
	    		// set section labels
	    		let group = groups[ l ];
	    		let label = group.querySelectorAll('label,legend,.icl-TextInput-labelWrapper,.icl-Textarea-label' );
	    		let input = group.querySelectorAll('.icl-TextInput-wrapper input,.icl-Textarea-control' );
	    		let radio = group.querySelectorAll('.icl-Radio-label input' );
	    		let select = group.querySelectorAll('select' );
	    		// check for label
	    		if( label && label.length > 0 ) {
		    		// check if label has experience years
		    		for( var type in questions ) {
		    			// check if found
		    			let search = questions[ type ]['search'];
		    			let after = questions[ type ]['after'];
		    			let answer = answers[ type ];
	    				// check questions
	    				if( label[0].innerText.indexOf( search ) !== -1 ) {
	    					// set find
	    					let find = label[0].innerText;
	    					// check answers
	    					for(var key in answer) {
	    						// set low
	    						let lkey = (key+'').toLowerCase();
	    						let lfnd = (find+'').toLowerCase();
	    						let valu = (answer[ key ]+'').toLowerCase();
	    						// check if found
	    						if( lfnd.indexOf( lkey ) !== -1 ) {
	    							// check for radio
	    							if( radio.length > 1 ) {
                                        // get lower case versions
                                        let rd01 = (radio[0].value+'').toLowerCase();
                                        let rd02 = (radio[1].value+'').toLowerCase();
                                        let rd03 = (radio[2])?(radio[2].value+'').toLowerCase():false;
	    								// check value
	    								if( rd01.indexOf( valu ) !== -1 ) {
	    									// radio[0].checked = 'checked';
	    									app.click( radio[0] );
	    									added++;
	    								}
                                        else if( rd02.indexOf( valu ) !== -1 ) {
	    									// radio[1].checked = 'checked';
	    									app.click( radio[1] );
	    									added++;
	    								}
    									else if( rd03 && rd03.indexOf( valu ) !== -1 ) {
	    									// radio[1].checked = 'checked';
	    									app.click( radio[2] );
	    									added++;
	    								}
	    							}
	    							// check for input
	    							else if( input.length > 0 && input[0].value === '') {
	    								added += simulateClick( input[0], valu, 'input' );
	    							}
	    							// check for select
	    							else if( select.length > 0 && select[0].value === '') {
	    								added += simulateClick( select[0], valu, 'select' );
	    							}

	    						}
	    					}
	    				}
		    		}
		    	}
	    	}
	    }
	    return ( total === added );
    };
    // click modal button
    var indeedApplied = function( doc, check ){
    	if( isLoading ) return false;
    	// set loading
    	isLoading = true;
    	// set click
    	var clicked = false;
    	// set section elements
    	let pageText = doc.body.innerText;
    	let primaryButton = app.query('.icl-Button--primary', doc);
    	let secondaryButton = app.query('.ia-FormActionButtons-submit,.ia-ConfirmationScreen-closeLink a', doc);
    	let dismissButton = app.query('.ia-FlexContainer .ia-FormActionButtons #form-action-cancel,#close-popup', doc);
    	// check if already applied
    	if( pageText.indexOf('You have applied to') !== -1 ) {
    		isEmptyPage = 10;
    		clicked = true;
    		isLoading = false;
    	}
    	//check for button
    	else if( primaryButton.length > 0 && modalClicks < 50 ) {
    		// check if no modal
    		if( !clickModal ) { 
	    		// set deferred
	    		clickModal = app.deferred(500);
	    		// check for empty fields
	    		if( hasEmptyFields() ) {
	    			// wait before clicking next
	    			window.setTimeout( () => {
	    				// click next primary button
	    				clickModal.resolve();
	    				modalClicks++;
	    			},1000)
	    		} else {
	    			clickModal.resolve();
	    			app.click( primaryButton[0], doc );
	    			check.resolve();
	    		}
	    		// when done clicking modal
	    		clickModal.done( () => {
	    			// set click on modla
	    			app.click( primaryButton[0], doc );
			    	// check for elements
			    	window.setTimeout( () => {
			    		// set to false
			    		clickModal = false;
			    		// check for elements
			    		let sectionElements = app.query('.ia-ApplyFormScreen-userFields .icl-TextInput-wrapper', doc);
			    		// check size
				    	if( sectionElements.length > 0 ) {
				    		//set prefill
				    		prefillSections();
				    	}
				    	// set lnot loading
				    	isLoading = false;
			    	},1000);
			    } );
			}
    	}
    	else if( secondaryButton.length > 0 ) {
    		app.click( secondaryButton[0], doc );
    		modalClicks = 0;
    		isLoading = false;
    		check.resolve();
    	}
    	else if( dismissButton.length > 0 ) {
    		app.click( dismissButton[0], doc );
    		/*
    		window.setTimeout( () => {
    			let confirmButton = app.query('.ia-ConfirmationScreen-closeLink a', doc);
    			if( confirmButton && confirmButton.length > 0 ) {
    				clicked = app.click( confirmButton[0], doc );
    			}
    		},1000);
    		*/
    		modalClicks = 0;
    		isLoading = false;
    		check.resolve();
    	} else {
    		isEmptyPage++;
    		isLoading = false;
    	}
    };
     // apply to job process
    var applyToJob = function( doc ){
    	if( app.debug ) debugger;
    	// check for buttons
    	let speed = 1000;
    	let check = app.deferred(speed);
    	// look at progress
    	check.progress( () => {
    		// check if has overlay
    		if( isEmptyPage > 3 ) {
    			
    		} else {
    			indeedApplied( doc, check );
    		}
    	});
    	check.done( () => {
			// set app debug
			if( app.debug ) debugger;
    		// save applied to
    		window.top.postMessage({eventType: 'dismiss'}, '*');
    		// set did click
    		window.close();
    	});
    	return check;
    };
    // begin apply
    applyToJob( document );
	// set message
	window.addEventListener("message", (event) => {
		// set app debug
		if( app.debug ) debugger;
		// check for indeed apply 
	 	if( event.origin === "https://www.indeed.com" ) {
			// set console log
			console.log( event );
			// check for dismiss
			if( event.eventType === 'close' ) {
				// set post message
				window.close();
			}
		}
	}, false);
};

// set autostart services
app.config.autoStart['indeed'] = function() {

    var storage = 'local'; //local, session
    var didClick = false;
    var nextPage = false;
    var clickModal = false;
    var isLoading = false;
    var modalClicks = 0;
    var inputEvents = 'mouseover,mouseenter,mousemove,transitionend,focus,focusin,select,keyup,transitionend,blur,focusout,transitionend,mouesout,mouseleave,transitionend';
    var eventsList = 'abort,afterprint,animationend,animationiteration,animationstart,beforeprint,beforeunload,blur,canplay,canplaythrough,change,click,contextmenu,copy,cut,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,ended,error,focus,focusin,focusout,fullscreenchange,fullscreenerror,hashchange,input,invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,loadstart,message,mousedown,mouseenter,mouseleave,mousemove,mouseover,mouseout,mouseup,mousewheel,offline,online,open,pagehide,pageshow,paste,pause,play,playing,popstate,progress,ratechange,resize,reset,scroll,search,seeked,seeking,select,show,stalled,storage,submit,suspend,timeupdate,toggle,touchcancel,touchend,touchmove,touchstart,transitionend,unload,volumechange,waiting,wheel'.split(',');
    //set pause default
    window.isPause = false;
    //set disable text
    window.disableText = true;
    //set profile url
    window.profileURL = '';
    //set profile name
    window.profileName = '';
    //set profile email
    window.profileEmail = '';
    // get data by search result
    var pageKey = app.md5(top.location.href);
    // get session at key
    var pageSession = app.storage.get('pageSession')||{};
    // check for session
    var listIndex = ( pageSession[ pageKey ] ) ? pageSession[ pageKey ]['index'] : 0; 
    // set session key at index
    if( !pageSession.hasOwnProperty( pageKey ) ) {
	    pageSession[ pageKey ] = {
	    	index: listIndex,
	    	date: new Date().toLocaleDateString()
	    };
	    app.storage.set('pageSession', pageSession);
	}
	// set job map
	let jobMap = window.jobmap||false;
    //get session storage
    var getStorage = function( name ){
        return app.storage.get( name, storage );
    };
    //set session storage
    var setStorage = function( name, value){
        return app.storage.set( name, value, storage );
    };
    //set dummy function
    var reportStatus = function( text ){
        console.log( text );
    };
    //save jobs applied to
    var saveAppliedTo = function( details ){
        // set applied
        var applied = getStorage('applied') || [];
        var date = new Date().toLocaleDateString();
    	var item = getActiveItem()||false;
    	var job = details;
    	// set job date
    	job.date = date;
    	// set job image
    	job.image = '';
    	// check item
        if(item) {
	    	let title = details.titile||item[0].querySelector('h2.title').innerText;
	    	let company = details.company||item[0].querySelector('span.company').innerText;
	    	let location = details.location||item[0].querySelector('span.location').innerText;
	    	let image = '';
        	// set job object
        	job = {
                date: date,
        		image: image,
        		title: title,
        		company: company,
        		location: location
        	};
        }
        // add to applid
        applied.push( job );
        // set applied
        setStorage('applied', applied);
        // return applied
        return applied;
    };
    //get update
    var loadObject = function( name, hasIndex) {
        //attempt to get from local storage
        var temp = getStorage( name ) || ( hasIndex ? [] : {} ); 
        //check for string
        window[ name ] = ( typeof temp !== 'object' ) ? JSON.parse( temp ) : temp;
    };
    //set object
    var saveObject = function( name, obj ) {
        setStorage( name, JSON.stringify(  ( obj ? obj : window[ name ] ) ) );
    };
    // get page item
    var getPageItems = function(){
    	if( app.debug ) debugger;
    	return app.query('.pagination-list li > a');
    };
    // get active Page
    var getActivePage = function(){
    	return app.query('.pagination-list li > b');
    };
    //get list item
    var getListItems = function(){
    	if( app.debug ) debugger;
    	return app.query('div.jobsearch-SerpJobCard.unifiedRow.clickcard');
    };
    // get active item
    var getActiveItem = function( items ){
    	return app.find('div.jobsearch-SerpJobCard.unifiedRow.clickcard.vjs-highlight');
    };
    //set simulate click
    var simulateClick = function( obj, value, type ) {
    	// set value
    	// obj.value = value;
    	/*
    	// set events list
    	for(let x=0; x < eventsList.length; x++) {
	    	obj.addEventListener(eventsList[x], function(){
	    		console.log(eventsList[x]);
	    	});
	    }
	    // set input events
	    for(var i=0; i < inputEvents.length; i++) {
	    	// click on object
	    	app.click( obj, document, inputEvents[i]);
		}
		*/
		if( type === 'select' ) {
			obj.value = value
		}
		// return ( obj.value !== '' ) ? 1 : 0
		return true;
    };
    //check for overlay
    var hasOverlay = function() {
    	return ( app.query('.indeed-apply-popup-bg').length > 0 )
    };
    // click quick apply
    var clickEasyApply = function(pageKey,jobMap){
    	// if( app.debug ) debugger;
    	// check if did click
    	if( !didClick && !isLoading ) {
    		// set is loading
    		isLoading = true;
    		// set speed
    		let speed = 2000;
    		// wait for a second
    		window.setTimeout( () => {
    			// set next page
    			nextPage = false;
	    		// set on message
	    		window.setInterval( () => {
	    			// check for data if any
	    			if( window.frames && 
	    				window.frames.ApplyNowPage && 
	    				window.frames.ApplyNowPage.hasOwnProperty('data') 
	    			) {
	    				debugger;
	    				console.log( window.frames.ApplyNowPage );
	    			}
	    		},1);
    			// get iframe document
    			let ifrDoc = app.getid('vjs-container-iframe').contentDocument;
    			// check for iframe document
    			if( ifrDoc ) {
		    		// set quick apply
			    	let easyApply = app.query('.jobsearch-IndeedApplyButton', ifrDoc );
			    	// check if button exists
			    	if( easyApply.length > 0 ) {
			    		// check for easy apply
			    		if( (easyApply[0].innerText+'').indexOf('Apply') !== -1 ) {
				    		// set click on quick apply
				    		app.click( easyApply[0] );
				    		// set did click
				    		didClick = true;
				    	}
			    		// wait for a second
			    		window.setTimeout( () => {
			    			if( app.debug ) debugger;
			    			// set xpc object
			    			var xpcObject = false;
			    			// check for iframe
			    			let applyDoc = app.query('.indeed-apply-bd iframe');
			    			// set job map
			    			jobMap = (jobMap)?jobMap:(window.jobmap||false);
			    			// check for job map
			    			if( jobMap ) {
			    				pageSession[ pageKey ]['jobs'] = jobMap;
			    				app.storage.set('pageSession',pageSession);
			    			}
			    			if( applyDoc[0] ) {
								var len = 0;
								var xpc = decodeURIComponent(applyDoc[0].src.split('#')[1]);
								xpc = xpc.split('{').join('').split('}').join('');
								xpc = xpc.split('":').join(',').split('"').join('').split(',');
								len = xpc.length;
								xpcObject = {};
								for(var o=0; o<len;o++){
									let v = xpc.pop();
									let k = xpc.pop();
									if(k) xpcObject[k]=v;
								}
							}
							// set field values
			    			let pageLocation = top.location.href;
			    			let iframes = app.query('iframe');
			    			let vjtkScr = app.query('script[src*="vjtk="]');
			    			var apiElement = app.query('span[data-indeed-apply-apitoken]')[0]||false;
			    			let pingbackUrl = (apiElement)?apiElement.dataset["indeedApplyPingbackurl"]:false;
			    			let pageApply = (vjtkScr&&vjtkScr[0])?vjtkScr[0].src:false;
			    			let pageQuery = pageLocation.split('?q=')[1].split('&')[0];
			    			var theJob = (jobMap)?jobMap[ listIndex ]:false;
			    			var jobCountry = (theJob)?theJob['country']:'US';
			    			let jobKey = (apiElement)?apiElement.dataset["indeedApplyJk"]:(theJob?theJob['jk']:ifrDoc.URL.split('&jk=')[1].split('&')[0]);
			    			var jobCompany = (apiElement)?apiElement.dataset["indeedApplyJobcompanyname"]:(theJob?theJob['cmp']:'');
			    			let jobUrl = (apiElement)?apiElement.dataset["indeedApplyJoburl"]:"https://www.indeed.com/viewjob?jk="+jobKey;
			    			let jobId = (apiElement)?apiElement.dataset["indeedApplyJobid"]:(pageApply?pageApply.split('jobId=')[1]:'');
			    			var jobLocate = (apiElement)?apiElement.dataset["indeedApplyJoblocation"]:(theJob?theJob['loc']:'');
			    			var jobTitle = (apiElement)?apiElement.dataset["indeedApplyJobtitle"]:(theJob?theJob['title']:'');
			    			let jobToken = (pingbackUrl||pageApply)?(pingbackUrl||pageApply).split('vjtk=')[1].split('&')[0]:'';
			    			let apiToken = (apiElement)?apiElement.dataset["indeedApplyApitoken"]:'';
			    			let avmNumber = (apiElement)?apiElement.dataset["indeedApplyAdvnum"]:'';
			    			let accountKey = (pingbackUrl)?pingbackUrl.split('acct_key=')[1].split('&')[0]:'';
			    			let astseString = (pingbackUrl)?pingbackUrl.split('astse=')[1].split('&')[0]:'';
			    			let assaString = (pingbackUrl)?pingbackUrl.split('assa=')[1]:'';
			    			let applyQuestion = (apiElement)?apiElement.dataset["indeedApplyQuestions"]:"iq://"+jobId+"?v=1";
			    			let searchQuery = (apiElement)?apiElement.dataset["indeedApplyRecentsearchquery"]:'"{"what":"'+pageQuery+'","where":""}"';
			    			let setupToken = xpcObject?xpcObject['iaUid']:ifrDoc.URL.split('&tk=')[1].split('&')[0];
			    			let setupMilis = xpcObject?xpcObject['setupms']:Date.now();
			    			// set pingback url
			    			if( !pingbackUrl ) {
			    				pingbackUrl = [
			    					"https://gdc.indeed.com/conv/orgIndApp?co="+jobCountry,
			    					"vjtk="+jobToken,
			    					"jk="+jobKey,
			    					"acct_key="+accountKey,
			    					"tk="+setupToken,
			    					"trk.origin=jobsearch",
			    					"vjfrom=tp-semfirstjob",
			    					"astse="+astseString,
			    					"assa="+assaString
			    				].join('&');
			    			}
			    			// set frame url
			    			let iframeUrl = "https://apply.indeed.com/indeedapply/resumeapply?" + [
			    				"jobUrl=https%3A%2F%2Fwww.indeed.com%2Fviewjob%3Fjk%3D"+jobKey,
			    				"postUrl=https%3A%2F%2Fdradisindeedapply.sandbox.indeed.net%2Fprocess-indeedapply",
			    				"questions="+encodeURIComponent(applyQuestion),
			    				"phone=optional",
			    				"coverletter=OPTIONAL",
			    				"jobId="+jobId,
			    				"jk="+jobKey,
			    				"jobTitle="+encodeURIComponent(jobTitle),
			    				"jobCompany="+encodeURIComponent(jobCompany),
			    				"jobLocation="+encodeURIComponent(jobLocate),
			    				"apiToken="+apiToken,
			    				"advNum="+avmNumber,
			    				"pingbackUrl="+encodeURIComponent(pingbackUrl),
			    				"onapplied=_updateIndeedApplyStatus",
			    				"onclose=indeedApplyHandleModalClose",
			    				"onclick=indeedApplyHandleButtonClick",
			    				"onContinueClick=indeedApplyHandleModalClose",
			    				"onready=indeedApplyHandleReady",
			    				"clickHandler=window.top.postMessage(%7BeventType%3A%20'click'%7D%2C%20'*')",
			    				"dismissHandler=window.top.postMessage(%7BeventType%3A%20'dismiss'%7D%2C%20'*')",
			    				"inpageApplyHandler=window.top.postMessage(%7BeventType%3A%20'inpageapply'%7D%2C%20'*')",
			    				"resume=required",
			    				"noButtonUI=true",
			    				"onappliedstatus=_updateIndeedApplyStatus",
			    				"recentsearchquery="+encodeURIComponent(searchQuery),
			    				"iaUid="+setupToken,
			    				"hl=en_US",
			    				"co=US",
			    				"mob=0",
			    				"preload=0",
			    				"spn=0",
			    				"iip=1",
			    				"autoString=none",
			    				"formParent=1",
			    				"twoPaneGroup=-1",
			    				"twoPaneVjGroup=-1",
			    				"twoPaneAllocId=",
			    				"twoPaneVjAllocId=",
			    				"m3AllocGrp=-1",
			    				"jobApplies=-1",
			    				"ms="+setupMilis,
			    				"referer=https%3A%2F%2Fwww.indeed.com%2F",
			    				"href="+pageLocation,
			    				"isITA=0",
			    				"indeedApplyableJobApiURI",
			    				"isCreateIAJobApiSuccess=false"
			    			].join('&');
			    			// check if did click
			    			if( didClick && applyDoc.length > 0 ) {
			    				// set wait
					    		let wait = app.deferred(speed);
					    		let load = false;
					    		let fwin = false;
					    		// set wait progress
					    		wait.progress( () => {
						    		// open window once
						    		if( !fwin && !load ) {
						    			fwin = window.open(iframeUrl,'indeedFrame','width=500,height=500');
						    		}
					    			// check if not load
					    			if( !load && fwin) {
					    				// set load
					    				load = true;
					    				// set message
										window.top.addEventListener("message", (event) => {
											// set app debug
											if( app.debug ) debugger;
											// check for dismiss
											if( event.data.eventType === 'dismiss' ) {
												// set post message
												if( event.origin === "https://apply.indeed.com" ) {
													event.source.postMessage("close",event.origin);
												}
												// set resolve
												wait.resolve({
													time: Date.now(),
													title: jobTitle,
													company: jobCompany,
													location: jobLocate,
													image: ''
												});
											}
										}, false);
					    			}
					    			// check if window closed
					    			// if( fwin && !fwin.postMessage ) window.top.postMessage({eventType: 'dismiss'}, '*');
					    		});
					    		wait.done( ( details ) => {
					    			if( app.debug ) debugger;
					    			saveAppliedTo( details );
									// click next item
									clickNextItem();
									// set is loading
									isLoading = false;
					    		});
			    			} else {
			    				clickNextItem();
			    			}
			    			// set is loading
			    			isLoading = false;
			    		}, (speed*2) );
					} else {
						// click next item
						clickNextItem();
						// set is loading
						isLoading = false;
					}
				} else {
					console.log('Loading..');
				}
	    	}, speed )
	    }
    };
    // click modal button
    var clickModalButton = function( doc ){
    	if( app.debug ) debugger;
    	// set click
    	var clicked = false;
    	// set section elements
    	let primaryButton = app.query('.ia-FlexContainer .ia-FormActionButtons .icl-Button--primary', doc);
    	let secondaryButton = app.query('.ia-FlexContainer .ia-FormActionButtons .ia-FormActionButtons-submit,.ia-ConfirmationScreen-closeLink a', doc);
    	let dismissButton = app.query('.ia-FlexContainer .ia-FormActionButtons #form-action-cancel,#close-popup', doc);
    	//check for button
    	if( primaryButton.length > 0 && modalClicks < 50 ) {
    		// check if no modal
    		if( !clickModal ) { 
	    		// set deferred
	    		clickModal = app.deferred(500);
	    		// check for empty fields
	    		if( !hasEmptyFields() ) {
	    			// wait before clicking next
	    			window.setTimeout( () => {
	    				if( app.debug ) debugger;
	    				// click next primary button
	    				clickModal.resolve();
	    				modalClicks++;
	    			},1000)
	    		} else {
	    			clickModal.resolve();
	    			clicked = app.click( primaryButton[0], doc );
	    		}
	    		clickModal.done( () => {
	    			if( app.debug ) debugger;
	    			// set click on modla
	    			clicked = app.click( primaryButton[0], doc );
			    	// check for elements
			    	window.setTimeout( () => {
			    		if( app.debug ) debugger;
			    		// set to false
			    		clickModal = false;
			    		// check for elements
			    		let sectionElements = app.query('.ia-ApplyFormScreen-userFields .icl-TextInput-wrapper', doc);
			    		// check size
				    	if( sectionElements.length > 0 ) {
				    		//set prefill
				    		prefillSections();
				    	}
			    	},1000);
			    } );
			}
    	}
    	else if( secondaryButton.length > 0 ) {
    		clicked = app.click( secondaryButton[0], doc );
    		modalClicks = 0;
    	}
    	else if( dismissButton.length > 0 ) {
    		clicked = app.click( dismissButton[0], doc );
    		/*
    		window.setTimeout( () => {
    			let confirmButton = app.query('.ia-ConfirmationScreen-closeLink a', doc);
    			if( confirmButton && confirmButton.length > 0 ) {
    				clicked = app.click( confirmButton[0], doc );
    			}
    		},1000);
    		*/
    		modalClicks = 0;
    	}
    	return clicked;
    };
    //click next item
    var clickNextItem = function(){
    	if( app.debug ) debugger;
    	// do nothing if next page
    	if( nextPage ) return false;
    	// get list item
    	let nextItem = false;
    	let listItems = getListItems();
    	let listPages = getPageItems();
    	let activeItem = getActiveItem();
    	let activePage = getActivePage();
    	// check for active item
    	if( activeItem && activeItem.length > 0 ) {
    		// look in list items
    		for(var i=0; i < listItems.length;i++ ) {
    			// check for active item
    			if( listItems[i].className.indexOf('-highlight') !== -1 && !nextPage ) {
    				// check if next item exists
    				if( listItems[ (i+1) ] && listItems[ (i+1) ].title !== 'next' ) {
    					nextItem = listItems[ (i+1) ];
    					nextItem.title = 'next';
    					app.click( nextItem );
    					nextItem.scrollIntoView(true);
    					break;
    				} else {
    					// set item
    					let item = activePage[0];
    					// check item
    					if( item ) {
	    					// click next page
	    					nextPage = clickNextPage( item.innerText );
	    				}
    				}
    			}
    		}
    	} else {
    		// check for list item
    		if( listItems[0] ) {
    			listItems[0].scrollIntoView(true);
    			app.click( listItems[0] );
    		}
    	}
    	return {
    		list: {
    			items: listItems,
    			pages: listPages,
    		},
    		next: {
    			item: nextItem,
    			page: nextPage
    		},
    		active: { 
    			item: activeItem,
    			page: activePage
    		}
    	};
    };
    // click next page
    var clickNextPage = function( pageNumber ){
    	if( app.debug ) debugger;
    	// get list item
    	let listPages = getPageItems();
    	let next = ((parseInt( pageNumber ) + 1)+'');
        let didClick = false;
    	// check for active item
    	if( listPages && listPages.length > 1 ) {
    		// loop in list pages
    		for(var i=0; i < listPages.length;i++ ) {
    			// set item
    			let item = listPages[i];
    			// check for item
    			if( item ) {
	    			// set text
	    			let text = item.innerText;
	    			// check for active item
	    			if( text === next || item.getAttribute('aria-label') === 'Next' ) {
	    				app.click( item );
	    				nextPage = item;
                        didClick = true;
	    				break;
	    			}
	    		}
    		}
            // check if clicked
            if( !didClick ) {
                app.click( listPages[0] );
            }
    	}
    	return nextPage;
    }; 
    // set debug flat
    app.debug = true;
    // bind to window
    window.app = app;
    //set global count
    var version = 1;
    var pages = 0;
    var globalCount = 0;
    var AdlistTotal = 0;
    var totalSent = 0;
    var isOpening = false;
    var isProcessing = false;
    var isCollecting = false;
    var startMessenger = false;
    var isContactPage = false;
    var isContactsSaved = false;

    //set window objects
    window.stopLooking = false;
    window.isPause = false;
    //set group id
    var href = document.location.href;
    // set object names
    var eaPage = 'ApplyNowPage';
    //get main objects
    loadObject( eaPage, false );
    //get next group index
    var EasyApplyPage = window[ eaPage ];
    // set pulse
    var pulseSpeed = 100;
    // set pulse
    var pulse = app.deferred( pulseSpeed );
    // set progress
    pulse.progress(function( count ){
    	// check if not click
    	if( !didClick ) {
    		clickEasyApply(pageKey,jobMap);
    	}
    	if( !isContactsSaved ) {
    		// myNetworkContacts();
    	}
    });

};