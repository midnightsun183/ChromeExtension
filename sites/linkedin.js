
app.config.backupSettings.priorityOnly['linkedin'] = false;

app.config.backupSettings.depthOptions.priorityOnly['linkedin'] = true;

app.config.backupSettings.sortBy['linkedin'] = [];

app.config.backupSettings.depthOptions.binding['linkedin'] = {
    name: 'friends_all',
    collect: 'friends',
};

app.config.backupSettings.depthOptions.priority['linkedin'] = [
    'profile',
];

app.config.backupSettings.priority['linkedin'] = [
];

//update bind settings
app.config.bindSettings['linkedin'] = {
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
            regex: 'linkedin.com/{user_name}',
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

app.config.requireSettings['linkedin'] = {
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
        name: 'linkedin',
        icon: 'linkedin',
        domain: 'www.linkedin.com',
        url: 'https://www.linkedin.com',
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
app.config.autoStart['linkedin'] = function() {

    var storage = 'local'; //local, session
    var didClick = false;
    var nextPage = false;
    var clickModal = false;
    var isLoading = false;
    var isWaiting = false;
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
    // set windows event queue
    window.eventQueue = {};

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
    var saveAppliedTo = function(){
        // set applied
        var applied = getStorage('applied') || [];
        var date = new Date().toLocaleDateString();
        var item = getActiveItem()||false;
        if(!item) {
            var title = item[0].querySelector('.job-card-list__title').innerText;
            var company = item[0].querySelector('.artdeco-entity-lockup__subtitle').innerText;
            var location = item[0].querySelector('.job-card-container__metadata-item').innerText;
            var image = item[0].querySelector('.job-card-container__link img').src;
            // set job object
            var job = {
                date: date,
                image: image,
                title: title,
                company: company,
                location: location
            };

            // add to applid
            applied.push( job );
            // set applied
            setStorage('applied', applied);
        }
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
        return app.query('.artdeco-pagination__indicator--number button');
    };
    // get active Page
    var getActivePage = function(){
        return app.query('.artdeco-pagination__indicator--number.active');
    };
    //get list item
    var getListItems = function(){
        if( app.debug ) debugger;
        return app.query('li div.job-card-container');
    };
    // get active item
    var getActiveItem = function( items ){
        return app.find('.job-card-search--is-active,.jobs-search-results-list__list-item--active,.jobs-search-two-pane__job-card-container--active');
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
        if( type === 'input' || type === 'select' ) {
            // set value
            obj.value = value;
            // simulate click
            app.click( obj, document, 'change' );
        }
        if( type === 'checkbox' ) {
            app.click( obj );
            app.click( obj, document, 'change' );
        }
        // return ( obj.value !== '' ) ? 1 : 0
        return true;
    };
    //check for overlay
    var hasOverlay = function() {
        return ( app.query('.artdeco-modal-overlay').length > 0 )
    };
    //check input fields
    var hasEmptyFields = function(){
        let empty = 0;
        let groups = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');
        // loop in labels
        if( groups.length > 0 ) {
            // look in groups
            for( var l=0; l < groups.length;l++ ) {
                let group = groups[l];
                let input = group.querySelectorAll('.fb-single-line-text__input' );
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
    //remember user input
    var rememberUserInput = function( label, fields ) {
        if( app.debug ) debugger;
        // load event queue
        loadObject( 'eventQueue', false);
        // variables
        let added = 0;
        let target = false;
        let deferred = app.deferred();
        let options = {label: label, added: 0};
        let queue = window.eventQueue;
        // find the fild type
        for(var f in fields) {
            // check for field
            if( fields[f] && fields[f].length > 0 ) {
                options.type = f;
                target = fields[f];
            }
        }
        // check for target
        if( target ) {
            // check if not options label
            if(!options.label) {
                options.label = target[0].parentNode.parentNode.parentNode.innerText.split(/\n/)[0];
            }
            // add to app listener
            let targetId = app.md5(options.type+'-'+options.label);
            // add to app message queue
            if( !queue.hasOwnProperty( targetId ) ) {
                // add to target id
                window.eventQueue[ targetId ] = options;
                // set event queue
                // save event queue
                saveObject('eventQueue');
                // update event for target
                for(let t=0; t < target.length;t++) {
                    // add event listenener
                    target[t].addEventListener('change', (event) => {
                        // record the event
                        options.value = event.currentTarget.value;
                        // update queue
                        window.eventQueue[ targetId ].value = options.value;
                        // save event queue
                        saveObject('eventQueue');
                        // set added
                        added++;
                        // set added
                        deferred.resolve( added );
                    });
                    // check for existing value
                    if( ( options.type !== 'radio' && target[t].value !== '') || 
                        ( options.type === 'radio' && target[t].checked ) 
                    ) {
                        simulateClick( target[t], target[t].value, options.type );
                    }
                }
            } else {
                // set options from queue
                options = window.eventQueue[ targetId ];
                // check for value
                if( options.hasOwnProperty('value') ) {
                    // set lower 
                    let lower = false;
                    // loop in target
                    for(let t=0; t < target.length;t++) {
                        // get value as lower
                        lower = (target[t].value+'').toLowerCase();
                        // check if radio button
                        if( options.type === 'radio' ) {
                            // set target
                            if( target[t].value === options.value || lower === options.value ) {
                                app.click( target[t] );
                                app.click( target[t], document, 'change' );
                                added++;
                            }
                        }
                        // check for input
                        else if( target[t].value === '') {
                            added += simulateClick( target[t], options.value, options.type );
                        }
                    }
                    // set added to options
                    options.added += added;
                    // set in window event queue
                    window.eventQueue[ targetId ] = options;
                    // save event queue
                    saveObject('eventQueue');
                }
            }
        }
        return deferred;
    };
    // set prefill section
    var prefillSections = function(){
        if( app.debug ) debugger;
    	// check for form section element
    	let groups = document.querySelectorAll('.jobs-easy-apply-form-section__grouping');
    	// check question type
    	let questions = app.questions;
    	let answers = app.answers;
    	// set counts
    	let added = 0;
    	let total = 0;
        let group = false;
        let label = false;
        let input = false;
        let radio = false;
        let select = false;
        let found = false;
        let find = false;
        let search = false;
        let after = false;
        let answer = false;
        let checkbox = false;
        let lkey = false;
        let lfnd = false;
        let valu = false;
        var rad0 = false;
        var rad1 = false;
        var rad2 = false;
        var key = false;
    	// loop in labels
    	if( groups.length > 0 ) {
    		// set total
    		total = groups.length;
    		// look in groups
	    	for( var l=0; l < groups.length;l++ ) {
	    		// set section labels
	    		group = groups[ l ];
	    		label = group.querySelectorAll('.fb-form-element-label' );
	    		input = group.querySelectorAll('.fb-single-line-text__input' );
	    		radio = group.querySelectorAll('.fb-radio-buttons input' );
	    		select = group.querySelectorAll('.fb-select' );
                checkbox = group.querySelectorAll('.ember-checkbox' );
                found = false;
                // check for input 
                if( input && input.length > 0 ) {
                    // set focus keys

                    // set focus event listener
                    input[0].addEventListener('focus', (event) => isWaiting = true );
                    input[0].addEventListener('mouseover', (event) => isWaiting = true );
                    input[0].addEventListener('blur', (event) => isWaiting = false );
                    input[0].addEventListener('mouseout', (event) => isWaiting = false );
                }
	    		// check for label
	    		if( label && label.length > 0 ) {
		    		// check if label has experience years
		    		for( var type in questions ) {
		    			// check if found
		    			search = questions[ type ]['search'];
		    			after = questions[ type ]['after'];
		    			answer = answers[ type ];
	    				// check questions
	    				if( label[0].innerText.indexOf( search ) !== -1 ) {
	    					// set find
	    					find = label[0].innerText;
	    					// check answers
	    					for(key in answer) {
	    						// set low
	    						lkey = (key+'').toLowerCase();
	    						lfnd = (find+'').toLowerCase();
	    						valu = answer[ key ];
	    						// check if found
	    						if( lfnd.indexOf( lkey ) !== -1 ) {
	    							// check for radio
	    							if( radio.length > 1 ) {
                                        // set lower radio
                                        rad0 = (radio[0].value+'').toLowerCase();
                                        rad1 = (radio[1].value+'').toLowerCase();
                                        rad2 = (radio[2])?(radio[1].value+'').toLowerCase():false;
	    								// check value
	    								if( radio[0].value === valu || rad0 === valu ) {
	    									// radio[0].checked = 'checked';
	    									app.click( radio[0] );
	    									added++;
                                            found = true;
	    								}
	    								else if( radio[1].value === valu || rad1 === valu ) {
	    									// radio[1].checked = 'checked';
	    									app.click( radio[1] );
	    									added++;
                                            found = true;
	    								}
    									else if( radio[2] && ( radio[2].value === valu || rad2 === valu ) ) {
	    									// radio[1].checked = 'checked';
	    									app.click( radio[1] );
	    									added++;
                                            found = true;
	    								}
	    							}
	    							// check for input
	    							else if( input.length > 0 && input[0].value === '') {
	    								added += simulateClick( input[0], valu, 'input' );
                                        found = true;
	    							}
	    							// check for select
	    							else if( select.length > 0 && select[0].value === '') {
	    								added += simulateClick( select[0], valu, 'select' );
                                        found = true;
	    							}
                                    // check for checkbox
                                    else if( checkbox.length > 0 && !checkbox[0].checked ) {
                                        app.click( checkbox[0] );
                                        added++;
                                        found = true;
                                    }
                                }
	    					}
	    				}
		    		}
                    // check if not found
                    if( !found ) {
                        // remember user input
                        added += rememberUserInput(find,{
                            input: input,
                            radio: radio,
                            select: select,
                            checkbox: checkbox
                        });
                    }
		    	}
	    	}
	    }
	    return ( total === added );
    };
    // set my network contacts
    var myNetworkContacts = function(){
        if( app.debug ) debugger;
        // check if did click
        if( !isContactPage ) {
            // set is loading
            isContactPage = true;
            // set speed
            let speed = 2000;
            // set options
            let options = {

            };
            // set scope
            let scope = document;
            // wait for a second
            app.loadIframes(['https://www.linkedin.com/mynetwork/contacts/'], ( frame ) => {
                if( app.debug ) debugger;
                // show or hide iframe if debugging
                // frame.iframe.style.display = ( app.debug ) ? 'block' : 'none';
                // set get wrapper
                app.whenFound( '.mn-contacts__wrapper', frame.document, ( wrapper ) => {
                    if( app.debug ) debugger;
                    // check for wrapper
                    if( wrapper.length > 0 ) {
                        // set repeat
                        let repeat = 99999;
                        let speed = 500;
                        let lastItem = app.query( '.mn-contact-item:last-child', frame.document, wrapper );
                        // scroll contacts box
                        app.scrollToTheEnd( lastItem, repeat, speed, ( scrolled ) => {
                            if( app.debug ) debugger;
                            console.log( scrolled );
                        } );
                    }
                } );
            }, options, scope );
        }
    };
    // check if job apply
    var isJobApplyPage = function(){
        let isJobApply = (top.location.href.indexOf('/job-apply/') !== -1);
        if( isJobApply ) {
            // set find more 
            let findMore = app.query('a.success-cta');
            // check if the find more button text match
            if( findMore.length > 0 && 
                (findMore[0].innerText+'').indexOf('Find more') !== -1 
            ) {
                // set click on find more button
                app.click( findMore[0] );
            } else {
                window.close();   
            }
            return true;
        } 
        return false;
    }
    // click quick apply
    var clickEasyApply = function(){
        if( app.debug ) debugger;
        // check if did click
        if( !didClick && !isLoading && !isWaiting ) {
            // set is loading
            isLoading = true;
            // set speed
            let speed = 2000;
            // wait for a second
            window.setTimeout( () => {
                if( app.debug ) debugger;
                // set next page
                nextPage = false;
                // set quick apply
                let easyApply = app.query('.jobs-apply-button.artdeco-button--primary,.continue-btn');
                // check if button exists
                if( easyApply.length > 0 ) {
                    // check is submit button
                    let isSubmit =  ((easyApply[0].innerText+'').indexOf('Submit') !== -1);
                    // check for easy apply
                    if( (easyApply[0].innerText+'').indexOf('Easy') !== -1 || isSubmit ) {
                        // set click on quick apply
                        app.click( easyApply[0] );
                        // set did click
                        didClick = true;
                    }
                }
                // wait for a second
                window.setTimeout( () => {
                    if( app.debug ) debugger;
                    // check if did click
                    if( !isJobApplyPage() && didClick ) {
                        // set apply to job
                        applyToJob();
                    } else {
                        clickNextItem();
                    }
                    // set is loading
                    isLoading = false;
                }, (speed/2) );
            }, speed )
        }
    };
    // click modal button
    var clickModalButton = function(){
        if( app.debug ) debugger;
        // set click
        var clicked = false;
        // set section elements
        let primaryButton = app.query('footer .artdeco-button--primary');
        let secondaryButton = app.query('footer.artdeco-button--secondary');
        let dismissButton = app.query('#artdeco-modal-outlet .artdeco-modal__dismiss');
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
                    clicked = app.click( primaryButton[0] );
                }
                clickModal.done( () => {
                    if( app.debug ) debugger;
                    // set click on modla
                    clicked = app.click( primaryButton[0] );
                    // check for elements
                    window.setTimeout( () => {
                        if( app.debug ) debugger;
                        // set to false
                        clickModal = false;
                        // check for elements
                        let sectionElements = app.query('.jobs-easy-apply-form-section__element');
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
            // click the button
            clicked = app.click( secondaryButton[0] );
            modalClicks = 0;
        }
        else if( dismissButton.length > 0 ) {
            clicked = app.click( dismissButton[0] );
            window.setTimeout( () => {
                let confirmButton = app.query('.artdeco-modal__confirm-dialog-btn,.artdeco-modal-outlet > div > button');
                if( confirmButton && confirmButton.length > 0 ) {
                    clicked = app.click( confirmButton[0] );
                }
            },1000);
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
    			if( listItems[i].className.indexOf('-active') !== -1 && !nextPage ) {
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
	    					let span = item.querySelector('span');
	    					// click next page
	    					nextPage = clickNextPage( span.innerText );
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
	    			// get item
	    			let span = item.querySelector('span');
	    			// set text
	    			let text = span.innerText;
	    			// check for active item
	    			if( text === next || text === '…' ) {
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
    // apply to job process
    var applyToJob = function(){
        if( app.debug ) debugger;
        // check for buttons
        let speed = 1000;
        let check = app.deferred(speed);
        // look at progress
        check.progress( () => {
            // check if has overlay
            if( hasOverlay() ) {
                // check for button
                clickModalButton();
            } else {
                // check if done
                check.resolve();
            }
        });
        check.done( () => {
            // save applied to
            saveAppliedTo();
            // set did click
            didClick = false;
        });
        return check;
    };
    // set debug flat
    app.debug = false;
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
    var eaPage = 'EasyApplyPage';
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
            clickEasyApply();
        }
        if( !isContactsSaved ) {
            // myNetworkContacts();
        }
    });

};