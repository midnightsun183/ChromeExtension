//-------------
// App Defaults
var app = {

    

    //---------------------------------------------------------------------
    //---------------------------- SYNC FUNCTIONS -------------------------
    //---------------------------------------------------------------------
    //set auto start
    initAutoStart: function() {
        // check for sync page
        if( !app.syncPage ) {
            //set sync page if page detected
            app.syncPage = app.detectPage( app.syncUrl );
            // set service
            let service = app.syncPage.service;
            //check for service
            if( app.has( app.autoStart, service ) ) {
                // check run autostart
                return app.autoStart[ service ]( );
            }
        }
        return false;
    },

    //set console log if debug
    setConsoleLog: function( a, b, c ){
        //check for show logs
        if( app.showLogs ) {
            console.log( a||'', b||'', c||'' );
        }
    }, 

    //format value into any type 
    formatValue: function( value, format ) {
        //set value parts
        var multi = ( format.indexOf(',') !== -1 );
        var formats = ( multi ) ? format.split(',') : [ format ];
        //set format in value
        for(var f=0; f < formats.length; f++) {
            //set value
            if( value &&  value !== '' && format !== '' && format !== 'array' ) {
                //set integer value
                if( formats[f] === 'integer' || formats[f] === 'number' ) {
                    value = (value+'').split(',').join('');
                    value = value.split(' ').join('');
                    value = parseInt( value );
                    value = (value)?value:0;
                }
                //set date format
                if( formats[f] === 'date' ) {
                    value = new Date( (value+'') );
                }
                //set split by
                if( formats[f].indexOf('split=') !== -1 ) {
                    value = (value+'').split( formats[f].split('split=')[1] );
                }
                //set index of
                if( formats[f].indexOf('index=') !== -1 ) {
                    //check the length of value
                    if( value && value.length > 0 && value[0] ) {
                        //get the index of the value
                        value = value[ parseInt( formats[f].split('index=')[1] ) ] || '';
                    }
                }
                //get single line only
                if( formats[f] === 'one-line' ) {
                    value = value.split(/[\n\t\r]+/).join('');
                }
            }
        }
        return value;
    },

    //find and replace text by checking list
    findAndReplace: function( find, text, insert, list ) {
        //set variables
        var check, prop, items = [];
        //check if avoid
        if( find && text && 
            find !== '' && 
            text !== '' && 
            text !== undefined 
        ) {
            //set items from find
            items = ( find.indexOf(',') !== -1 ) ? find.split(',') : [ find ];
            //loop in each
            for(var i in items) {
                //check for simple match
                if( text === items[i] ) {
                    text = insert;
                } else if( text.indexOf( items[i] !== -1 ) ) {
                    text = text.split( items[i] ).join( insert );
                }
                //set check
                check = items[i].match(/\[[a-zA-Z]+\]/i);
                //check for [ propertyName ] match
                if( check && check !== null && 
                    check.length > 0 && 
                    typeof list === 'object' 
                ) {
                    //loop in check and replace
                    for(var c=0; c < check.length; c++) {
                        //split by bracket
                        prop = check[c].split('[')[1].split(']')[0];
                        //check if property at item has value
                        text = ( app.has( list, prop ) && list[ prop ] === text ) ? insert : text;
                    }
                }
            }
        }
        return text;
    },

    //scroll to the end
    scrollToTheEnd: function( element, repeat, speed, callback ) {
        //set total
        var loops = 0;
        //set items
        var items = 0;
        //set found
        var found = 0;
        //set offset
        var offset = 0;
        //set retries
        var retries = 0;
        //set maximum
        var maximum = 5;
        //set output
        var output = {};
        //set scroll
        var scroll = false;
        //set stopped
        var stopped = false;
        //set parent
        var parent_ = element.parentNode;
        //set defer
        var promise = app.deferred();
        //check for parent
        parent_ = ( parent_ ) ? parent_ : document.body;
        //set returned 
        var options =  {
            getInterval: function(){
                return scroll;
            },
            getStats: function(){
                return output;
            },
            //set promose
            promise: function(){
                return promise;
            },
            //set stopped
            stopped: stopped,
            //stop
            stop: function( callback ){ 
                //clear interval
                if( scroll ) {
                    clearInterval( scroll );
                }
                //set stopped in output
                output.stopped = true;
                //check for callback
                if( typeof callback === 'function' ) {
                    callback( output );
                }
            }
        };
        //set interval
        scroll = setInterval(function() {
            //check for element
            if( element && element.parentNode ) {
                //scroll into view
                element.scrollIntoView(true);
                //set speed
                app.scrollTop( (speed/2), element, false, offset);
                //check found
                element = parent_.children[ parent_.children.length-1 ];
                //set parent_
                parent_ = element.parentNode;
            }
            //set scroll to
            scrollTo(0,document.querySelector("body").scrollHeight);
            //get total siblings
            items = document.body.innerText.length;
            //check if end of items
            if( items === found ) {
                retries++;
            } else {
                retries = 0;
                found = items;
            }
            //increment total
            loops++;
            //set output
            output = {
                found: found,
                loops: loops,
                speed: speed,
                repeat: repeat,
                retries: retries,
                stopped: stopped,
                maximum: maximum
            };
            //hold value for progress
            promise.hold( output );
            //check total repeats
            if( loops === repeat || retries === maximum ) {
                //set resolve
                promise.resolve( output );
                //clear interval
                options.stop( callback );
            }
        }, speed );
        //return object
        return options;
    },

    //set item scroller 
    setItemScroller: function( element, hash, type, using ) {
        //set scroll speed
        var speed = 1500;
        //repeat scroll x times
        var repeat = 100;
        //set scroll
        var scroll = false;
        //set action
        var action = false;
        //get name
        var name = hash+'_'+type;
        //check if using
        if( using ) {
            //set action
            action = ( using.indexOf(',') !== -1 ) ? using.split(',') : [ using ];
            //set action
            action = action.filter( text => text !== 'scroll' );
        }
        //check if backup started 
        if( app.backupSettings.isStarted ) {
            //set scroll speed
            speed = app.backupSettings.scrollSpeed;
            //set scroll repeat limit
            repeat = app.backupSettings.scrollLimit;
        }
        //loop in scroller and stop other scrollers
        app.forEach( app.syncScroller, function( obj, key, idx ){
            //check if no match in hash and not false
            if( key.indexOf( hash ) === -1 && !app.syncScroller[ key ].stopped ) { 
                //stop scroller interval
                app.syncScroller[ key ].stop(function( output ){
                    //set message
                    app.setConsoleLog("Item Scroller: Stopped scrolling..", output);
                    //set scroller to false
                    app.syncScroller[ key ] = output;
                });
            }
        });
        //add scroll if not exist
        if( !app.has( app.syncScroller, name ) ) {
            //scroll to the end
            scroll = app.scrollToTheEnd( element, repeat, speed, function( stats ) {
                //set message
                app.setConsoleLog("Item Scroller: Completed scrolling..", stats);
                //set output
                scroll.output = stats;
            });
            //set scroll output
            scroll.promise().progress(function( stats ){
                //set message
                app.setConsoleLog("Item Scroller: Scrolling ("+stats.loops+"): ", stats);
                //check if using has 
                if( action && action.length > 0 ) {
                    //look in each action
                    app.forEach( action, function( val, key, idx ){
                        //check for
                        if( val.indexOf('|') !== -1 ) {
                            //set parts
                            key = val.split('|')[0];
                            val = val.split('|')[1];
                            //check for click
                            if( key === 'click' ) {
                                //set click 
                                app.click(val);
                            }
                            //check for click once
                            if( key === 'click-once' && !app.has(app.clickedOnce,hash) ) {
                                //set click 
                                app.click(val);
                                //set click once
                                app.clickedOnce[hash] = 1;
                            }
                        }
                    })
                }
            });
            //set console log
            app.setConsoleLog("Item Scroller: Initialized..", scroll);
            //set sync scroller by page hash
            app.syncScroller[ name ] = scroll;
        } else {
            scroll = app.syncScroller[ name ];
        }
        //set scroll
        return scroll;
    },

    //recurse bindings by the depth
    recurseBindings: function( options, count, defer, items ) {
        //check for depth 
        count = ( count ) ? count : 0;
        items = ( items ) ? items : {};
        defer = ( defer ) ? defer : app.deferred();
        //set console log
        app.setConsoleLog("Recurse Bindings: Initialized ("+count+")..", options, items );
        //get items
        var _service = app.syncService.name;
        var _items = ( app.size( items ) > 0 ) ? items : { 0: false };
        var _with = app.bindSettings[ _service ].bindWith;
        var _wait = app.deferred();
        var _size = 0;
        var _id = false;
        //loop in app
        app.forEach( _items, function( item, key ) {
            //check if item is an object
            if( item && typeof item === 'object' ) {
                //check for bind with
                if( app.has( item, _with ) ) {
                    _id = item[ _with ];
                }
            }
            //get item from storage
            app.getSomeItems( options.name, {output:''}, function( results ) {
                //check if found 
                if( app.has( results.output, options.collect ) ) {
                    //set collect from item queue
                    var list = results.output[  options.collect ];
                    //push to item queue
                    for(var l in list) {
                        //check if not found
                        if( app.has( list[ l ], _with ) ) {
                            //set id
                            var id = list[ l ][ _with ];
                            //check if not found
                            if( !app.has( items, id ) ) {
                                items[ id ] = list[ l ];
                            }
                        }
                    }
                }
                //check depth
                if( options.depth === 1 ) {
                    //set console log
                    app.setConsoleLog("Recurse Bindings: Done getting items", items);
                    //reject wait
                    _wait.reject();
                    //resolve defer
                    defer.resolve( items );
                } else {
                    //increment
                    _size++;
                    //check size
                    if( _size === app.size( _items ) ) {
                        _wait.resolve();
                    }
                }
            }, _id );
        }) ;
        //check wait for resolve
        _wait.done(function( ){
            //check if count increment
            if( count > 0 ) {
                defer.resolve( items );
            } else {
                //set console log
                app.setConsoleLog("Recurse Bindings: Done waiting..", items);
                //set check
                var check = false;
                //set defer
                var _defer = false;
                //add recurse bindings
                var recurse = function() {
                    //add count
                    count++;
                    //set new deferred
                    _defer = app.deferred();
                    //check recurse bindings and return deferred promise
                    check = app.recurseBindings( options, count, _defer, items );
                    //resolve recurse
                    check.done(function( _items ) {
                        //set items 
                        items = _items;
                        //check count
                        if( count === options.depth ) {
                            //resolve items
                            defer.resolve( items );
                        } else {
                            recurse();
                        }
                    } );
                };
                //see recurse
                recurse();
            }
        } );
        return defer;
    },

    //set binding identifier ie: userId
    getIdentifier: function( mainId ) {
        //set bind value
        var bind = app.bindSettings;
        var backup = app.backupSettings;
        var _with = bind.bindWith;
        var _value = bind.bindValue;
        var _default = bind.bindDefault;
        var identifier = _value;
        //set main id
        mainId = ( mainId ) ? mainId : false;
        //set default if no value
        identifier = (_value !== '' ) ? _value : _default;
        //check if backup
        if( backup.depth > 1 ) {
            //check if bind has width
            if( app.has( backup.depthItem, _with ) ) {
                identifier = backup.depthItem[ _with ] || identifier;
            }
        }
        if( mainId ) {
            identifier = ( typeof mainId !== 'boolean' ) ? mainId : 'main_';
        }
        return identifier;
    },

    //set some items
    setSomeItems: function( prefix, list, callback, identifier ) {
        //set identifier if any
        identifier = ( identifier ) ? identifier : false;
        //set hash
        var hash = prefix+JSON.stringify(list);
        hash = app.md5( hash );
        hash = "Set_"+hash;
        //set saved
        var saved = {};
        //set defer
        var defer = app.deferred();
        //set identifier
        var identifier = app.getIdentifier( identifier );
        //check if not hashed
        if( app.has( app.cachedItems, hash ) && !identifier ) {
            //set list
            saved = app.cachedItems[ hash ];
            //set cached
            saved['cached'] = true;
        } else {
            //loop in list
            app.forEach( list, function( result, name ) {
                //push to saved 
                try {
                    //attempt to save
                    app.storage.set( identifier+'__'+prefix+'-'+name, result );
                    //set saved
                    saved[ name ] = { 
                        saved: true,
                        message: ''
                    };
                } catch(e) {
                    saved[ name ] = { 
                        saved: false,
                        message: e
                    };
                }
            });
            //set cached
            saved['cached'] = false;
            //set cache as saved
            app.cachedItems[ hash ] = saved;
        }
        //get list by name
        if( typeof callback === 'function' ) {
            callback( saved );
        }
        //resolve deferred
        defer.resolve( saved );
        //return defer
        return defer;
    },

    //get some items
    getSomeItems: function( prefix, list, callback, identifier ) {
        //set identifier if any
        identifier = ( identifier ) ? identifier : false;
        //set hash
        var hash = prefix+JSON.stringify(list);
        hash = app.md5( hash );
        hash = "Get_"+hash;
        //set defer
        var list_ = {};
        //set deferred 
        var defer = app.deferred();
        //set identifier
        var identifier = app.getIdentifier( identifier );
        //set cached 
        list['cached'] = false;
        //look for hash in cache items
        if( app.has( app.cachedItems, hash ) && !identifier ) {
            //set list as cache items
            list_ = app.cachedItems[ hash ];
            //set cached
            list['cached'] = true;
        }
        //loop in list
        app.forEach( list, function( result, name ) {
            //push to saved 
            if( !app.has( list_, name ) || !list_[ name ] ) {
                list[ name ] = app.storage.get( identifier+'__'+prefix+'-'+name ) || false;
            } else {
                list[ name ] = list_[ name ];
            }
        });
        //save to cache items
        app.cachedItems[ hash ] = list;

        //get list by name
        if( typeof callback === 'function' ) {
            callback( list );
        }
        //resolve deferred
        defer.resolve( list );
        //return defer
        return defer;
    },

    //find values of an element using css selector
    getElementValue: function( query, using, binds, regex, avoid, format ) {
        //set element
        var element = false;
        //set output
        var output = [];
        //set temp
        var temps = '';
        //set results
        var remove = false;
        //set found
        var found = false;
        //set parts
        var parts = false;
        //set usings
        var attrs = [];
        //set results
        var results = [];
        //set multi
        var multi = ( format.indexOf('array') !== -1 ) ? -1 : 0;
        //check for query
        if( typeof query === 'string' ) {
            //stop here if empty
            if ( query === '' ) return '';
            //set element 
            element = app.query( query, document, multi );
        }
        //check for object
        if( typeof query === 'object' ) {
            //set element
            element = query;
        }
        //check for length
        if( element.length && element.length === 0 ) {
            element = '';
        }
        //check for element
        if( element && element !== '' ) {
            //check for elements
            element = ( element.length &&  element.length > 0 ) ? element : [ element ];
            //loop in outut
            for(var e=0; e < element.length; e++) {
                //check if using
                if( using && using !== '' ) {
                    //check for data
                    if( using.indexOf('data-') !== -1 ) {
                        //check for dataset
                        if( element[e].dataset ) {
                            //set output using dataset
                            output[e] = element[e].dataset[ using.split('data-')[1] ];
                        }
                    } else {
                        //set output as element
                        output[e] = element[e];
                        //set attribute
                        attrs = ( using.indexOf('.') !== -1 ) ? using.split('.') : [ using ];
                        //loop in attribute
                        for(var a in attrs) {
                            //check if element has property
                            if( output[e][ attrs[a] ] ) {
                                output[e] = output[e][ attrs[a] ];
                            }
                        }
                    }
                }
                //check if regex
                if( regex && regex !== '' ) {
                    //check output type
                    if( typeof output[e] === 'object' ) {
                        output[e] = JSON.stringify( output[e] );
                    } else {
                        output[e] = ( output[e] + '' );
                    }
                    //attempt to find using regex
                    found = output[e].match( regex );
                    //check if found
                    if( found && found.length > 0 ) {
                        output[e] = found[0];
                    }
                    //check if binds found in regex
                    if( binds !== '' ) {
                        //check if get value in between two characters
                        if( output[e] !== '' && binds.length === 2 ) {
                            //set parts 
                            parts = binds.split('');
                        }
                        else if( regex.indexOf( binds ) !== -1 ) {
                            //set parts from regex
                            parts = regex.split( binds );
                        }
                        //check for parts
                        if( parts && parts.length > 0 ) {
                            //check if found in output
                            if( parts[0] !== '' && output[e].indexOf( parts[0] ) !== -1 ) {
                                output[e] = output[e].split( parts[0] )[1];
                            }
                            //check if found in output
                            if( parts[1] !== '' && output[e].indexOf( parts[1] ) !== -1 ) {
                                output[e] = output[e].split( parts[1] )[0];
                            }
                        }
                    }
                }
                //check avoid
                if( avoid && avoid !== '' ) {
                    //set avoid
                    if( avoid.indexOf(',') !== -1 ) {
                        avoid = avoid.split(',');
                    } else if( typeof avoid === 'string' ){
                        avoid = [ avoid ];
                    }
                    //set remove
                    remove = false;
                    //loop in each avoid
                    for(var a in avoid){
                        //check if found in avoid
                        if( output[e] === avoid[a] ) {
                            remove = true;
                        }
                        //check if avoid has contain operator
                        if( avoid[a].indexOf('~') !== -1 ) {
                            //get not
                            parts = avoid[a].split('~')[1];
                            //check if output does not have avoid 
                            if( output[e].indexOf( parts ) !== -1 ) {
                                remove = true;
                            }
                        }
                        //check if avoid has not operator
                        if( avoid[a].indexOf('!') !== -1 ) {
                            //get not
                            parts = avoid[a].split('!')[1];
                            //check if output does not have avoid 
                            if( output[e].indexOf( parts ) === -1 ) {
                                remove = true;
                            }
                        }
                    }
                    if( !remove ) {
                        results.push( output[e] );
                    }
                }
            }
            if( avoid && avoid !== '' ) {
                output = results;
            }
        }
        return ( multi === 0  || output.length === 1) ? output[0] : output;
    },

    //get active service 
    getActiveService: function( ) {
        //get domain name
        var domain = document.domain;
        //check for search service
        if( app.searchServices.length > 0 && !app.searchService ) {
            //loop in serach services
            app.forEach( app.searchServices, function( obj, key, idx ){
                //check for active
                if( app.has( obj, 'active') ) {
                    //check if domain match
                    if( app.has( obj, 'domain') ) {
                        //check for match in domain
                        if( obj['domain'] === domain ) {
                            obj['active'] = true;
                        } else if( obj['active'] ) {
                            obj['active'] = false;
                        }
                    }
                    //check if name found
                    if( obj['active'] ) {
                        app.searchService = obj;    
                    }
                    //set active service
                    app.searchServices[ key ] = obj;
                }
            } );
        }
        //return search service
        return app.searchService; 
    },

    //get bindings
    getBindings: function( route, service, path ) {
        //set bound
        var bound = route;
        //set temp
        var temp = (path+'');
        //set default
        var binds, value, parts;
        //get backup
        var backup = app.backupSettings;
        //loop in bind settings
        app.forEach( app.bindSettings[ service ].bindings, function( obj, key, idx ){
            //check for binds
            if( app.has( obj, 'binds' ) ) {
                //set query
                binds = obj['binds'];
                //check if found in route
                if( route.indexOf( binds ) !== -1 ) {
                    //check for depth in backup
                    if( backup.depth > 1 && backup.isStarted ) {
                        //check for item queue
                        if( app.size( backup.depthItem ) > 0 ) {
                            //loop in first queue
                            app.forEach( backup.depthItem, function( value, name ) {
                                //check if value 
                                if( value && value !== '' ) {
                                    //check 
                                    if( app.bindSettings[ service ].bindWith === name ) {
                                        app.bindSettings[ service ].bindValue = value; 
                                    }
                                    //check for key match
                                    if( key === name ) {
                                        bound = route.split( binds ).join( value );
                                    }
                                }
                            });
                        }
                    } else {
                        //check for value
                        if( app.has( obj, 'value') ) {
                            //set value
                            value = obj['value'];
                            //check if empty
                            if( value !== '' ) {
                                bound = route.split( binds ).join( value );
                            }
                        }
                    }
                }
            }
        });
        //check for any in bound
        if( bound.indexOf( '{any}' ) !== -1 ) {
            //get partsdsz
            parts = bound.split('{any}');
            //check if parts found in path
            if( temp.indexOf( parts[0] ) !== -1 ) {
                temp = temp.split( parts[0] )[1];
            }
            if( temp.indexOf( parts[1] ) !== -1  ) {
                temp = temp.split( parts[1] )[0];
            }
            //set bound
            bound = parts.join( temp );
        }
        return bound;
    },

    //set bindings
    setBindings: function( callback ) {
        //set default
        var query, using, regex, binds, value, avoid, format;
        //set other
        var settings, _with, _value, _default;
        //set service 
        var service = app.searchService.name;
        //set defer
        var defer = app.deferred();
        //set count
        var count = 0;
        //set index
        var index = 0;
        //set output
        var output = {
            updated: new Date(),
            service: service,
            match: false,
            data: {},
        };
        //get bind settings
        app.getSomeItems( 'bindings', { settings: app.bindSettings }, function( saved ){
            //set bind settings from saved
            app.bindSettings = ( saved.settings) ? saved.settings : app.bindSettings;
            //loop in bind settings
            app.forEach( app.bindSettings[ service ].bindings, function( obj, key, idx ){
                //set data at key
                output['data'][ key ] = {
                    binds: '',
                    value: ''
                };
                //check for query
                if( app.has( obj, 'query' ) ) {
                    //set query
                    query = obj['query'];
                    //check for value
                    if( app.has( obj, 'value' ) ) {
                        //set value
                        value = obj['value'];
                        //check if empty
                        if( value === '' ) {
                            //check if query
                            if( query !== '' ) {
                                //set format
                                format = obj['format'] || '';
                                //get using
                                avoid = obj['avoid'] || '';
                                //get using
                                using = obj['using'] || '';
                                //get regex
                                regex = obj['regex'] || '';
                                //get binds
                                binds = obj['binds'] || '';
                                //attempt to get data using query
                                value = app.getElementValue( query, using, binds, regex, avoid, format );
                                //set output
                                output['data'][ key ] = {
                                    binds: binds,
                                    value: value
                                };
                                //check for value
                                if( value && value !== '' ) {
                                    //check for format
                                    if( format !== '' ) {
                                        //check format
                                        if( format.indexOf('array') !== -1 ) {
                                            //loop in values
                                            for(var v in value) {
                                                value[v] = app.formatValue( value[v], format );
                                            }
                                        } else {
                                            value = app.formatValue( value, format );
                                        }
                                    }
                                    //set new binding
                                    app.bindSettings[ service ].bindings[ key ]['value'] = value;
                                    //set date added
                                    app.bindSettings[ service ].bindings[ key ]['added'] = new Date();
                                    //set count
                                    count++;
                                }
                            }
                        } else {
                            count++;
                        }
                    }
                }
                //set index
                index++;
            });
            //set settings
            settings = app.bindSettings[ service ].bindings;
            //set default value
            _default = app.bindSettings[ service ].bindDefault;
            //get bind value
            _value = app.bindSettings[ service ].bindValue;
            //get bind with
            _with = app.bindSettings[ service ].bindWith;
            //check fir with
            if( ( _with && _with !== '' ) && 
                ( !_value || _value === '' ) 
            ) {
                //set value as default
                _value = _default;
                //check if settings has with
                if( app.has( settings, _with ) ) {
                    //check value
                    if( settings[ _with ].value !== '' ) {
                        //set value
                        _value = settings[ _with ].value || '';
                    }
                }
                //check if value is empty
                if( !_value || _value === '' ) {
                    _value = app.getIdentifier();
                }
                //set bind value
                if( _value && _value !== '' ) {
                    app.bindSettings[ service ].bindValue = _value;
                }
            }
            //save bind setting
            app.setSomeItems( 'bindings', { settings: app.bindSettings }, function(){
                //set match in output
                output.match = ( index === count );
                //return output
                defer.resolve( output );
                //check for callback
                if( typeof callback === 'function' ) {
                    callback( output );
                }
            }, true );
        }, true );
        //return defer
        return {
            promose: function(){ 
                return defer; 
            },
            settings: settings
        }
    },

    //detect page
    detectPage: function( href ) {
        //set console log
        app.setConsoleLog('Detect Page: Initialized..');
        //set routes
        var routes = [];
        //set route
        var route = '';
        //set match
        var match = {};
        //set found
        var found = false;
        //set hash of href
        var hash = app.md5( href );
        //set cache
        var cache = {};
        //set collect 
        var collect = 0;
        //set service 
        var service = app.searchService.name;
        //check for page hash
        if( app.has( app.pageHash, hash ) ) {
            //set console log
            app.setConsoleLog('Detect Page: Hash found..', hash );
            //set cache
            cache = app.pageHash[ hash ];
            //set found
            found = cache.found;
            //set collect
            collect = cache.collect;
            //set search collection
            app.searchCollection = app.searchCollections[ collect ];
            // check if collect
            if( app.searchCollection ) {
                //set active
                app.searchCollections[ collect ]['active'] = true;
            }
        }
        //check for sync page
        if( app.pageUrl !== href ) {
            //set console log
            app.setConsoleLog('Detect Page: Url and href not equal..');
            //set count
            var count = {};
            //set parts
            var parts = [];
            //set get-able
            var allow = false;
            //set domain
            var domain = document.domain;
            //set current collection
            var path = document.location.href.split( domain )[1];
            //loop in bind settings
            app.forEach( app.searchCollections, function( obj, key, idx ) {
                //check if not found
                if( !found ) {
                    //not search collection as inactive
                    app.searchCollections[ key ]['active'] = false;
                    //set match default
                    count[ key ] = 0;
                    //check for route
                    if( app.has( obj, 'route' ) ) {
                        //check for servive
                        if( app.has( obj, 'service' ) ) {
                            //check for match in servive
                            if( obj['service'] === service ) {
                                //set allow
                                allow = true;
                                //set routes
                                routes = obj['route'];
                                //check routes
                                if( typeof routes === 'string') {
                                    routes = [ routes ];
                                } 
                                //loop in routes
                                for(var r in routes) {
                                    //get route with bidings 
                                    route = app.getBindings( routes[r], service, path );
                                    //check for exact match
                                    if( route === path || (
                                        path.indexOf(route) !== -1 &&
                                        route.split('/').length > 2
                                    ) ) {
                                        //set found
                                        found = true;
                                        //set collect
                                        collect = key;
                                        //set search collection
                                        app.searchCollection = obj;
                                    }
                                    //check if not found
                                    if( !found ) {
                                        //check for path delimiter in route
                                        if( route !== '' && route !== '/' ) {
                                            //check for parts in route
                                            if( route.indexOf('/') !== -1 ) {
                                                //set parts
                                                parts = route.split('/');
                                                //loop in parts
                                                for( var p in parts ) {
                                                    //check if not empty
                                                    if( parts[p] !== '' ) { 
                                                        //check if part of route found in path
                                                        if( path.indexOf( parts[p] ) !== -1 ) {
                                                            count[ key ]++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //set match
                    match = [ key, count[ key ] ];
                }
            });
            //if not found
            if( !found && allow ) {
                //set console log
                app.setConsoleLog('Detect Page: Route not found using regex..');
                //look for highest match
                for(var key in count ) {
                    //chcek if match is higher
                    if( match[1] < count[ key ] ) {
                        //set new match
                        match = [ key, count[ key ] ];
                    }
                }
                //only if found
                if( match[1] > 0 ) {
                    //set console log
                    app.setConsoleLog('Detect Page: Match in route found..');
                    //set found
                    found = true;
                    //set collect
                    collect = match[0];
                    //set search collection
                    app.searchCollection = app.searchCollections[ collect ];
                    //set active
                    app.searchCollections[ collect ]['active'] = true;
                } else {
                    app.searchCollection = false;
                }
            }
            //check for found
            if( found ) {
                //set console log
                app.setConsoleLog('Detect Page: Route found ..', href );
                app.pageUrl = href;
            } else {
                //set console log
                app.setConsoleLog('Detect Page: Route not found..');
            }
            //set page hash
            app.pageHash[ hash ] = {
                collect: collect,
                service: service,
                updated: new Date(),
                match: match,
                route: route,
                found: found,
                href: href,
                hash: hash
            };
            //set console log
            app.setConsoleLog('Detect Page: Page hash object..', app.pageHash[ hash ] );
        }
        return app.pageHash[ hash ];
    },

    //detect backups
    detectBackup: function( hash, callback ) {
        //set console log
        app.setConsoleLog('Detect Backup: Initialized..');
        //set deferred
        var promise = app.deferred();
        //set report
        var report = app.backupReport;
        //get sync results
        var results = app.syncResults;
        //set backup
        var backup = app.backupSettings;
        //get service
        var service = app.syncService.name;
        //set collection
        var collection = app.searchCollections;
        //set bind with
        var bindWith = app.bindSettings[ service ].bindWith;
        //get backup types
        var savedList = {
            backup: backup,
            report: report
        };
        //set data hash
        var _with = '';
        var named = '';
        var dataHash = '';
        var pageHash = '';
        var binding = {};
        var duration = {};
        var priority = [];
        var collect = {};
        var recurse = {};
        var index = 0;
        var totalDone = 0;
        var remaining = 0;
        var queueSize = 0;
        var isFound = false;
        var isChange = false;
        var isLastItem = false;
        var isPriority = false;
        var isComplete = false;
        var cronStart = false;
        var priorityOnly = false;
        var dateNumber = 0;
        var cronNumber = 0;
        //set page url
        var pageRoute = '';
        var pagePath = '';
        var pageUrl = '';
        //set output
        var output = {
            backup: {},
            report: {},
            pageUrl: '',
            isFound: false,
            isChange: false,
            isPriority: false,
            isComplete: false,
            isLastItem: false
        };
        //check for scheduled
        if( backup.scheduled && backup.startDate.length > 1 ) {
            //set console log
            app.setConsoleLog('Detect Backup: Scheduled..');
            //set date number 
            dateNumber = new Date().getTime();
            //get start date
            cronNumber = new Date( backup.startDate ).getTime();
            //check if cron number lower than date number
            if( dateNumber >= cronNumber ) {
                //set start 
                cronStart = true;
            } else {
                backup.isStarted = false;
            }
        }
        //check if started 
        if( backup.isStarted ) {
            //set console log
            app.setConsoleLog('Detect Backup: Started..');
            //check if scheduled
            if( !backup.scheduled || cronStart ) {
                //get backup if any
                app.getSomeItems( service, savedList, function( saved ){
                    //add dept to hash
                    pageHash = ( hash+'_'+backup.depth );
                    //get backup object if found
                    backup = ( saved.backup ) ? saved.backup : backup;
                    //get report object if found
                    report = ( saved.report ) ? saved.report : report;
                    //awr peioeiry
                    priority = backup.priority[ service ];
                    //set priority only
                    priorityOnly = backup.priorityOnly[ service ];
                    //set service
                    backup.service = service;
                    //set deferred promise speed
                    promise.interval( backup.promiseSpeed );
                    //set console log
                    app.setConsoleLog('Detect Backup: Data retrieved..', backup, report);
                    //set depth change
                    if( backup.depth > 1 ) { 
                        //set console log
                        app.setConsoleLog('Detect Backup: Depth ('+backup.depth+') started..');
                        //check if items in queue
                        if( backup.itemInQueue.length > 0 ) {
                            backup.depthChanged = false;
                        } else {
                            backup.depthChanged = true;
                        }
                    }
                    //check if page hash not changed
                    if( backup.pageHash === pageHash ) {
                        //set console log
                        app.setConsoleLog('Detect Backup: Page hash match..');
                        //set in progress
                        backup.inProgress = true;
                        //set page change
                        backup.pageChanged = false;
                    } else {
                        //set console log
                        app.setConsoleLog('Detect Backup: Page hash not matched..');
                        //page change so 
                        backup.pageChanged = true;
                    }
                    //check for depth and set priority
                    if( backup.depth > 1 ) { 
                        //set priority
                        priority = backup.depthOptions.priority[ service ];
                        //set priority only flag
                        priorityOnly = backup.depthOptions.priorityOnly[ service ];
                    }
                    //check if not started on
                    if( backup.startedOn === '' ) {
                        backup.startedOn = ( new Date() + '' );
                    }
                    //set filtered collection by service name
                    collection = app.filterBy( collection, { 
                        'service': service 
                    } );
                    //set console log
                    app.setConsoleLog('Detect Backup: Set search collection..', collection);
                    //filter by priority
                    if( priorityOnly && priority.length > 0 ) {
                        //filter by priority only
                        collection = app.filter( collection, function( item ){
                            return ( priority.indexOf( item.name ) !== -1 )
                        });
                        //set console log
                        app.setConsoleLog('Detect Backup: Set priority collection..', collection);
                    }
                    //check if nothing completed
                    if( app.size( backup.completed ) === 0 && 
                        backup.collection === '' 
                    ) {
                        //set console log
                        app.setConsoleLog('Detect Backup: First time running..');
                        //get backup priority
                        if( priority.length > 0 ) {
                            //set console log
                            app.setConsoleLog('Detect Backup: Using priority list..');
                            //loop in collection
                            for(var c = 0; c < collection.length;c++) {
                                //check if found in priority
                                if( priority[0] === collection[c].name ) {
                                    //set index
                                    index = c;
                                    //set found
                                    isFound = true;
                                    //set priority
                                    isPriority = true;
                                    //stop here 
                                    break;
                                }
                            }
                        } else {
                            index = 0;
                        }
                        //set collection index
                        backup.collectionIndex = index;
                        //just started 
                        backup.collection = collection[ index ].name;
                        //set page route
                        pageRoute = collection[ index ].route;
                        //set change page
                        isChange = !backup.inProgress;
                    }
                    //check sync results status or count 
                    if( results.status === 'done' || results.count === 0 ) { 
                        //set console log
                        app.setConsoleLog('Detect Backup: Done with getting results..');
                        //set data hash
                        dataHash = JSON.stringify( results.itemSize );
                        dataHash = app.md5( dataHash );
                        //check data hash
                        if( backup.dataHash === dataHash ) {
                            backup.waitCount++;
                        } else {
                            backup.dataHash = dataHash;
                            backup.waitCount = 0;
                        }
                    }
                    //check if done waiting
                    if( backup.waitCount > backup.waitMax ) {
                        //set console log
                        app.setConsoleLog('Detect Backup: Done waiting and completed..');
                        //set data hash
                        backup.dataHash = dataHash;
                        //set not in progress
                        backup.inProgress = false;
                        //set wait count
                        backup.waitCount = 0;
                        //set completed
                        backup.completed[ backup.collection ] = new Date();
                        //check for priority
                        if( priority.length > 0 ) {
                            //check if beyond priority list
                            if( backup.priorityIndex < priority.length-1 ) {
                                //set ne wpriority index
                                backup.priorityIndex++;
                                //set new collection
                                backup.collection = priority[ backup.priorityIndex ];
                                //set change page
                                isChange = true;
                                //set found
                                isFound = true;
                            } else {
                                backup.collection = '';
                            }
                        } else {
                            backup.collection = '';
                        }
                        //loop in collection
                        for(var c = 0; c < collection.length;c++) {
                            //check if not changed
                            if( !isChange ) {
                                //check if not completed
                                if( !app.has( backup.completed, collection[c].name ) ) {
                                    //set named
                                    named = collection[c].name;
                                    //check if not priority only or if name found in priority
                                    if( !priorityOnly || priority.indexOf( named ) !== -1 ) {
                                        //set collection index 
                                        backup.collectionIndex = c;
                                        //set collection
                                        backup.collection = named;
                                        //set page route
                                        pageRoute = collection[c].route;
                                        //set change page
                                        isChange = true;
                                        //set found
                                        isFound = true;
                                        //stop here
                                        break;
                                    }
                                }
                            } else {
                                //check for match in collection name 
                                if( collection[c].name === backup.collection ) {
                                    //set collection index 
                                    backup.collectionIndex = c;    
                                    //set page url
                                    pageRoute = collection[c].route;
                                    //stop here
                                    break;
                                }
                            }
                        }
                    }
                    //check queye size
                    queueSize = backup.itemInQueue.length;
                    //total completed items
                    totalDone = app.size( backup.completed );
                    //set remaining items
                    remaining = ( collection.length - totalDone );
                    //check for last item
                    isLastItem = ( backup.collectionIndex === collection.length-1 );
                    //chcek if complete items
                    isComplete = ( totalDone >= collection.length );
                    //check if priority only
                    if( priorityOnly ) {
                        //set console log
                        app.setConsoleLog('Detect Backup: Priority only logic used..');
                        //set remaining items
                        remaining = ( priority.length - totalDone );
                        //check for last item
                        isLastItem = ( backup.collectionIndex === collection.length-1 );
                        //chcek if complete items
                        isComplete = ( totalDone >= priority.length );
                    }
                    
                    //check if increase depth
                    if( !isFound && isComplete ) {
                        //set console log
                        app.setConsoleLog('Detect Backup: Done with depth..', backup.depth );
                        //check if 
                        if( backup.depth === 1 || queueSize === 0 ) {
                            //set console log
                            app.setConsoleLog('Detect Backup: queue size..', queueSize);
                            //set backup completed hash
                            backup.doneDepth[ backup.depth ] = new Date();
                            //check for depth
                            if( backup.depth < backup.depthMax ) {
                                //set console log
                                app.setConsoleLog('Detect Backup: Clearing properties..');
                                //reset depth
                                backup.depth++;
                                //reset completed
                                backup.completed = {};
                                //set collection 
                                backup.collection = '';
                                //set wait count
                                backup.waitCount = 0;
                                //set depth index
                                backup.itemsDone = 0;
                                //reset priority index
                                backup.priorityIndex = 0;
                                //reset collection index
                                backup.collectionIndex = 0;
                                //set depth changed
                                backup.depthChanged = true;
                            } else {
                                //check if no itemSize
                                if( backup.itemInQueue.length === 0 ) {
                                    //set backup ended
                                    backup.endedOn = ( new Date() + '' );
                                    //remove schedule and is started
                                    backup.isStarted = false;
                                    //remove schedule
                                    backup.scheduled = false;
                                    //set dept cahnge to false
                                    backup.depthChanged = false;
                                    //set console log
                                    app.setConsoleLog('Detect Backup: Ended..', backup);
                                }
                            }
                        } else {
                            //check depth
                            if( queueSize > 0 && backup.depth > 1 ) {
                                //set console log
                                app.setConsoleLog('Detect Backup: Getting next item in queue..');
                                //increment dept index
                                backup.itemsDone++;
                                //set collection
                                backup.collection = '';
                                //reset completed
                                backup.completed = {};
                                //set wait count
                                backup.waitCount = 0;
                                //reset priority index
                                backup.priorityIndex = 0;
                                //reset collection index
                                backup.collectionIndex = 0;
                                //loop in items
                                for(var b=0; b < backup.itemInQueue.length; b++) {
                                    //set depth item
                                    backup.depthItem = backup.itemInQueue.shift();
                                    //set items hash 
                                    if( app.has( backup.depthItem, bindWith ) ) {
                                        //look for new items
                                        _with = backup.depthItem[ bindWith ];
                                        //check if not found
                                        if( !app.has( backup.itemsHash, _with ) ) {
                                            //set item hash
                                            backup.itemsHash[ _with ] = 1;
                                            //break;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //check if depth changed and not completed
                    if( backup.depthChanged ) { 
                        //set console log
                        app.setConsoleLog('Detect Backup: Depth changed..');
                        //reset item in queue
                        backup.itemInQueue = [];
                        //get options
                        binding = backup.depthOptions.binding[ service ];
                        //loop in collection
                        for(var c = 0; c < collection.length;c++) {
                            //check if found in priority
                            if( binding.name === collection[c].name ) {
                                //set recurse object
                                recurse = app.recurseBindings( {
                                    depth: backup.depth, 
                                    name: binding.name, 
                                    collect: binding.collect 
                                } );
                                //get item from storage
                                recurse.done(function( results  ){
                                    //get valuse 
                                    results = Object.values( results );
                                    //check if found 
                                    if( results.length > 0 ) {
                                        //set console log
                                        app.setConsoleLog('Detect Backup: Recurse bindings completed..', results);
                                        //set is complete
                                        isComplete = false;
                                        //set item in queue
                                        backup.itemInQueue = results;
                                        //set queue size
                                        queueSize = backup.itemInQueue.length;
                                        ///set depth item
                                        if( queueSize > 0 ) {
                                            //loop in items
                                            for(var b=0; b < backup.itemInQueue.length; b++) {
                                                //set depth item
                                                backup.depthItem = backup.itemInQueue.shift();
                                                //set items hash 
                                                if( app.has( backup.depthItem, bindWith ) ) {
                                                    //look for new items
                                                    _with = backup.depthItem[ bindWith ];
                                                    //check if not found
                                                    if( !app.has( backup.itemsHash, _with ) ) {
                                                        //set item hash
                                                        backup.itemsHash[ _with ] = 1;
                                                        //break;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        //resolve promise
                                        promise.resolve( true );
                                    } else {
                                        promise.resolve( false );
                                    }
                                } );
                                break;
                            }
                        }
                    } else {
                        promise.resolve( false );
                    }
                    //when promise is done
                    promise.done(function( didChange ){
                        //check if did change
                        if( didChange ) {
                            //set console log
                            app.setConsoleLog('Detect Backup: Added items in queue..', backup.itemInQueue, backup);
                        }
                        //check for report at hash
                        if( !app.has( report, pageHash ) ) {
                            //set duration
                            duration = {
                                start: new Date(),
                                end: 0,
                                time: 0
                            };
                            //set report object
                            report[ pageHash ] = {
                                'duration': duration
                            };
                        }
                        //set duration
                        duration = report[ pageHash ]['duration'];
                        //set formated start
                        duration.start = new Date( duration.start ).getTime();
                        //set end time
                        duration.end = new Date().getTime();
                        //set total time
                        duration.time = (duration.end - duration.start);
                        //set report object
                        report[ pageHash ] = {
                            duration: duration,
                            results: results,
                            backup: backup,
                            queueSize: queueSize,
                            remaining: remaining,
                            totalDone: totalDone,
                            isComplete: isComplete,
                            isLastItem: isLastItem,
                            isPriority: isPriority,
                        };
                        //set page hash
                        backup.pageHash = pageHash;
                        //set remaining items 
                        backup.remaining = remaining;
                        //set complated items
                        backup.totalDone = totalDone;
                        //set queue size
                        backup.queueSize = queueSize;
                        //set current backup
                        app.backupSettings = backup;
                        //set backup report
                        app.backupReport = report;
                        //set saveList
                        savedList = {
                            backup: backup,
                            report: report,
                        };
                        //check if backup started, changed and has page route
                        if( backup.isStarted && isChange && pageRoute !== '' && !backup.inProgress ) {
                            //set console log
                            app.setConsoleLog('Detect Backup: Page route started..');
                            //set page route
                            pageRoute = ( typeof pageRoute === 'object' ) ? pageRoute[0] : pageRoute;
                            //set page path
                            pagePath = app.getBindings( pageRoute, service, '' );
                            //set page url
                            pageUrl = document.location.origin + pagePath; 
                            //set console log
                            app.setConsoleLog('Detect Backup: Page route..', pageUrl, pageRoute );
                            //check page route
                            if( document.location.href === pageUrl ) {
                                //set console log
                                app.setConsoleLog('Detect Backup: Page route not changed..');
                                //set page url
                                pageUrl = '';
                                //set no change
                                isChange = false;
                                //set wait count
                                backup.waitCount++;
                            }
                        }
                        //save backup
                        app.setSomeItems( service, savedList, function( output ){
                            output.pageUrl = pageUrl;
                            //set saved list
                            output.backup = backup;
                            output.report = report;
                            output.isFound = isFound;
                            output.isChange = isChange;
                            output.isPriority = isPriority;
                            output.isComplete = isComplete;
                            output.isLastItem = isLastItem;
                            //set console log
                            app.setConsoleLog('Detect Backup: Saved output..', output, backup );
                            //set callback
                            if( typeof callback === 'function' ) {
                                //set change page
                                callback( output );
                            }
                        }, true);
                    });
                }, true);
            }
        }
        return savedList;
    },

    //syncronize and collect 
    syncCollect: function( options ) {
        //set console log
        app.setConsoleLog('Sync Collect: Initialized..');
        //set listed
        var listed = false;
        //set scroll
        var scroll = false;
        //set collection
        var collection = {};
        //set backup
        var backup = {};
        //set report
        var report = {};
        //set output
        var output = {};
        //set element
        var elemn = {};
        //set item
        var item = {};
        //set main
        var main = {};
        //set task
        var tasks = {};
        //set defer
        var defer = {};
        //set item
        var items = [];
        //set filled
        var filled = [];
        //set check
        var check = [];
        //set format
        var format = '';
        //set named
        var named = '';
        //set query
        var query = '';
        //set using
        var using = '';
        //set regex
        var regex = '';
        //set binds
        var binds = '';
        //set value
        var value = '';
        //set avoid
        var avoid = '';
        //set hash
        var hash = '';
        //set text
        var text = '';
        //set prop
        var prop = '';
        //set start time
        var start = 0;
        //set end time
        var end = 0;
        //set total time
        var time = 0;
        //set sized
        var sized = 0;
        //set count
        var count = 0;
        //set total
        var total = 0;
        //set block
        var block = 0;
        //set block delta
        var delta = 2;
        //set increment
        var incre = 0;
        //set multiple 
        var multi = 0;
        //set saved names
        var savedList = {
            output:{},
            report:{}
        };
        //set collected
        var collected = {
            duration: {},
            setStats: {},
            getStats: {},
            itemSize: {},
            theItems: {}
        };
        //set collect
        var collect = app.deferred();
        //set variables from options
        var itemSize = options['size']; 
        var syncNeed = options['need'];
        var pageHash = options['hash'];
        //set started method to true
        collect.started = true;
        //check for collection
        if( app.searchCollection ) {
            //set console log
            app.setConsoleLog('Sync Collect: Has collection..');
            //set start
            start = new Date();
            //set tasks defer
            tasks = app.deferred();
            //set backup
            backup = app.backupSettings;
            //set collection
            collection = app.searchCollection;
            //set collcetion name
            named = collection.name;
            //check for collect save name
            if( app.has( collection, 'save' ) ) {
                //set named from save
                named = collection['save'];
            }
            //get report and output from storage
            app.getSomeItems( named, savedList, function( saved ){
                //set console log
                app.setConsoleLog('Sync Collect: Got some items..', saved );
                //set in collected
                collected.getStats = saved;
                //set output from saved if any 
                output = ( saved.output ) ? saved.output : output;
                //set report from saved if any
                report = ( saved.report ) ? saved.report : report;
                //check for collect
                if( app.has( collection, 'collect' ) ) {
                    //set console log
                    app.setConsoleLog('Sync Collect: Can collect items..');
                    //get total size of collection
                    total = app.size( collection['collect'] );
                    //loop in bind settings
                    app.forEach( collection['collect'], function( obj, type, idx, opts ) {
                        //set options
                        opts = {};
                        //set main
                        main = {};
                        //set items
                        items = [];
                        //set query
                        query = '';
                        //set listed
                        listed = false;
                        //check if output not exist
                        if( !app.has( output, type ) ) {
                            output[ type ] = {};
                        }
                        //check if report not exist
                        if( !app.has( report, type ) ) {
                            report[ type ] = {};
                        }
                        //set defer by type
                        defer[ type ] = app.deferred();
                        //check for items
                        if( app.has( obj, 'items' ) ) {
                            //check for items query
                            if( app.has( obj['items'], 'query' )  ) {
                                //set query
                                query = obj['items']['query'];
                                //check for query value
                                if( query !== '' ) {
                                    //set items
                                    items = app.query( query );
                                }
                            }
                        }
                        //set options
                        opts =  { 
                            main: {},
                            items: items, 
                            query: query, 
                            listed: listed 
                        };
                        //check for list
                        if( items.length > 0  ) {
                            //set listed
                            listed = true;
                            //get main parent
                            main = app.last( items );
                            //set options
                            opts.main = main;
                            //set option listed
                            opts.listed = listed;
                            //resolve deferred
                            defer[ type ].resolve( opts );
                        } else {
                            //resolve deferred
                            defer[ type ].resolve( opts );
                        }
                        //when defer is done
                        defer[ type ].done(function( _opts ){
                            //set from options
                            main = _opts.main;
                            items = _opts.items;
                            query = _opts.query;
                            listed = _opts.listed;
                            //check for list type
                            if( listed ) {
                                //get new items
                                items = app.query( query );
                            }
                            //check for item size exists
                            if( !app.has( itemSize, type ) ) {
                                //set default item size
                                itemSize[ type ] = 0;
                            }
                            //set item size
                            sized = items.length;
                            //check if items size not already recorded
                            if( itemSize[ type ] !== sized ) {
                                //increment items
                                incre += sized;
                                //check for items
                                if( sized > 0 ) {
                                    //set items size
                                    itemSize[ type ] = sized;
                                    //set message
                                    app.setConsoleLog('Sync Collect: Found a total of ' + app.size( items ) + ' items in ' + type );
                                    //look in items
                                    app.forEach( items, function( elm ) {
                                        //reset item
                                        item = {};
                                        //reset block
                                        block = 0;
                                        //loop in each object
                                        app.forEach( obj, function( val_, key_ ) {
                                            //ignore items
                                            if( key_ === 'items' ) {
                                                //check if using scroll
                                                using = val_['using'];
                                                //check for backup
                                                if( backup.isStarted && using.indexOf('scroll') !== -1 ) {
                                                    //set scroll object
                                                    scroll = app.setItemScroller( main, pageHash, type, using ).getStats();
                                                }
                                            } else {
                                                //set format
                                                format = val_['format'] || '';
                                                //set binds
                                                avoid = val_['avoid'] || '';
                                                //set binds
                                                binds = val_['binds'] || '';
                                                //set query
                                                query = val_['query'];
                                                //set using
                                                using = val_['using'];
                                                //set regex
                                                regex = val_['regex'];
                                                //set multiple items
                                                multi = ( format.indexOf('array') !== -1 ) ? -1 : 0;
                                                //get element
                                                elemn = ( query === '' ) ? elm : app.query( query, document, multi, elm );
                                                //get element 
                                                value = app.getElementValue( elemn, using, binds, regex, avoid, format );
                                                //check if value is an object
                                                value = ( typeof value === 'object' && multi === 0 ) ? '' : value;
                                                //check if avoid
                                                if( avoid !== '' && value !== '' ) {
                                                    //chcek if value is object
                                                    if( typeof value === 'object' ) { 
                                                        //loop in value
                                                        for(var v in value) {
                                                            //find and replace
                                                            value[v] = app.findAndReplace( avoid, value[v], '', item );
                                                        }
                                                    } else {
                                                        //find and replace
                                                        value = app.findAndReplace( avoid, value, '', item );
                                                    }
                                                }
                                                //check for format
                                                if( format !== '' && value !== ''   ) {
                                                    //chcek if value is object
                                                    if( typeof value === 'object' ) { 
                                                        //loop in value
                                                        for(var v in value) {
                                                            //find and replace
                                                            value[v] = app.formatValue( value[v], format );
                                                        }
                                                    } else {
                                                        value = app.formatValue( value, format );
                                                    }
                                                }
                                                //set item
                                                item[ key_ ] = ( value || '' );
                                                //check if found in report
                                                if( !app.has( report[ type ], key_ ) ) {
                                                    //set default report object
                                                    report[ type ][ key_ ] = {
                                                        total: 0,
                                                        empty: 0,
                                                        added: 0
                                                    };
                                                }
                                                //check scroll
                                                report[ type ]['scroll'] = scroll;
                                                //check total added
                                                report[ type ][ key_ ]['total']++;
                                                //check if value is empty
                                                if( value === '' || 
                                                    value === '{}' || 
                                                    value === null || 
                                                    value === undefined || 
                                                    value === 'undefined'
                                                ) {
                                                    //increase
                                                    block++;
                                                    //set report
                                                    report[ type ][ key_ ]['empty']++;
                                                } else {
                                                    report[ type ][ key_ ]['added']++;
                                                    //decrease
                                                    block--;
                                                }
                                                //check if found in sync need and required 
                                                if( app.has( syncNeed, key_ ) && syncNeed[ key_ ] ) {
                                                    //check if item empty
                                                    if( item[ key_ ] === '' ) {
                                                        block = ( delta + 1 );
                                                    }
                                                }
                                            }
                                        } );
                                        //check number of blocks
                                        if( block < delta ) {
                                            //set json string
                                            text = JSON.stringify( item );
                                            //set hash
                                            hash = app.md5( text );
                                            hash = hash.split('=').join('_');
                                            //check if hash found in output
                                            if( !app.has( output[ type ], hash ) ) {
                                                //add to output
                                                output[ type ][ hash ] = item;
                                            }
                                        }
                                    } );
                                }
                            }
                            //count
                            count++;
                            //check count
                            if( count === total ) {
                                //resolve or reject tasks
                                tasks[ ( incre > 0 ) ? 'resolve' : 'reject' ](
                                    ( () => ({ 
                                            count: incre, 
                                            message: ( incre > 0 ) ? 'Items found' : 'Nothing found..' 
                                        })
                                    )()
                                );
                            }
                        } );
                    } );
                    //when teask is done
                    tasks.done(function( status ){
                        //set console log
                        app.setConsoleLog('Sync Collect: Resolved task..', status );
                        //update report
                        report[ 'update' ] = new Date();
                        //set collected results
                        collected.theItems = {
                            output: output,
                            report: report
                        };
                        //set status
                        collected.status = 'done';
                        //set message
                        collected.message = status.message;
                        //set total count
                        collected.count = status.count;
                        //save some items
                        app.setSomeItems( named, collected.theItems, function( output ){
                            //set console log
                            app.setConsoleLog('Sync Collect: Saved some items..', output );
                            //set end time
                            end = new Date();
                            //set total time
                            time = ( end - start );
                            //set list size
                            collected.itemSize = itemSize;
                            //set in collected
                            collected.setStats = output;
                            //set time
                            collected.duration = {
                                start: start,
                                time: time,
                                end: end
                            };
                            //resolve collect
                            collect.resolve( collected );
                        } );
                    } );
                    //task not complete
                    tasks.fail( function( status ){
                        //set console log
                        app.setConsoleLog('Sync Collect: Rejected task..', status );
                        //update report
                        report[ 'update' ] = new Date();
                        //set collected results
                        collected.theItems = {
                            output: output,
                            report: report
                        };
                        //set status
                        collected.status = 'fail';
                        //set message
                        collected.message = status.message;
                        //set total count
                        collected.count = status.count;
                        //set end time
                        end = new Date();
                        //set total time
                        time = ( end - start );
                        //set list size
                        collected.itemSize = itemSize;
                        //set in collected
                        collected.setStats = {};
                        //set time
                        collected.duration = {
                            start: start,
                            time: time,
                            end: end
                        };
                        //set collect
                        collect.reject( collected );
                    } );
                }
            } );
        } else {
            collect.reject('Search Collection Not Found');
        }
        return collect;
    },

    //set sync functoin
    syncFunction: function( defer, service ) {
        //set console log
        app.setConsoleLog('Sync Function: Initialized..', defer );
        //set page href
        app.syncUrl = document.location.href;
        //set bindings
        if( !app.syncBinded.match ) {
            //set console log
            app.setConsoleLog('Sync Function: Sync binding not matched..' );
            //sync binded
            app.setBindings(function( bound ){
                app.syncBinded = bound;
            });
        }
        //set service name
        service = app.syncService.name;
        //set sync page if page detected
        app.syncPage = app.detectPage( app.syncUrl );
        //get required items in collection
        app.syncNeed = app.requireSettings[ service ].searchCollections;
        //check if sync allowed
        if( app.syncPage.found && !app.syncCollector.started ) {
            //set console log
            app.setConsoleLog('Sync Function: Page found and collector not started..');
            //set detect backup
            app.detectBackup( app.syncPage.hash, function( results ){
                //set results
                app.syncBackup = results;
                //check if page change
                if( results.isChange ) {
                    //check for page path
                    if( results.pageUrl  && results.pageUrl !== '' ) {
                        //check if not exact match
                        if( document.location.href !== results.pageUrl && 
                            document.location.href+'/' !== results.pageUrl
                        ) {
                            //stop syncing 
                            app.syncCheck.stop();
                            //reload the page
                            document.location.href = results.pageUrl;
                        } else {
                            app.setConsoleLog('Sync Function: Redirect not-complete: Already on that page');
                        }
                    } else {
                        app.setConsoleLog('Sync Function: Page path is empty due to same path routing');
                    }
                }
            } );
            //start collecting data and set results
            app.syncCollector = app.syncCollect( {
                size: app.itemSize, 
                need: app.syncNeed, 
                hash: app.syncPage.hash 
            } );
            //set results if sync collector is done
            app.syncCollector.done(function( results ){
                //reset failures
                app.syncWaiting = 0;
                //set item size from results
                app.itemSize = results.itemSize;
                //set link list size
                app.syncItemSize[ app.syncPage.hash ] = app.itemSize;
                //set console log
                app.setConsoleLog('Sync Function: Done with Sync Collector', {
                    time: app.syncTime,
                    start: app.syncStart,
                    bound: app.syncBinded,
                    cycles: app.syncCycles,
                    binds: app.bindSettings,
                    collect: app.searchCollection,
                    service: app.syncService,
                    results: app.syncResults,
                    page: app.syncPage,
                    url: app.pageUrl
                } );
            });
            //if sync collector fails increment waiting
            app.syncCollector.fail(function( results ){
                //set waitinh
                app.syncWaiting++;
            });
            //when sync promise is done always do this
            app.syncCollector.always(function( results ){
                //set sync results 
                app.syncResults = results;
                //reset started
                app.syncCollector.started = false;
                //resolve defer
                defer.progress( results );
            });
            //set page url
            app.setConsoleLog('Sync Function: Waiting for changes to page: ' + app.searchCollection.value );
        } else {
            //set console log
            app.setConsoleLog('Sync Function: Page not found..' );
            //check backup
            var filter = false;
            var search, route, path;
            var backup = app.backupSettings;
            var priority = backup.priority;
            var options = backup.depthOptions;
            var service = app.syncService.name;
            var collect = app.searchCollection;
            var collects = app.searchCollections;
            //get some tiems from backup
            app.getSomeItems( service, { backup: backup }, function( saved ){
                //set console log
                app.setConsoleLog('Sync Function: Get some items from backup ..', backup );
                //look for back up
                backup = ( saved.backup ) ? saved.backup : backup;
                //set options
                options = backup.depthOptions;
                //set priority
                priority = backup.priority[ service ];
                //set backup settings
                app.backupSettings = backup;
                //check backup depth
                if( backup.depth > 1 ) {
                    priority = options.priority[ service ];
                }
                //save backup settings
                app.setSomeItems( service, { backup: backup }, function( saved ){
                    //set console log
                    app.setConsoleLog('Sync Function: Get some items in backup ..', saved );
                    //set sync page if page detected
                    app.syncPage = app.detectPage( app.syncUrl );
                    //get required items in collection
                    app.syncNeed = app.requireSettings[ service ].searchCollections;
                    //check if backup started
                    if( backup.isStarted && !app.syncPage.found ){
                        //set console log
                        app.setConsoleLog('Sync Function: Backup started and page not found ..', backup );
                        //check if priority
                        if( priority.length > 0 ) {
                            //set priority
                            filter = app.filterBy( collects, { name: priority[0] } )[0];
                        }
                        //set search collection 
                        search = ( ( collect ) ? collect : collects[0] );
                        //set route using bindings
                        route = app.getBindings( (filter ? filter : search)['route'],  service, '/' );
                        //set path from route
                        path = ( typeof route === 'object' ? route[0] : route );
                        //set url
                        url = ( document.location.origin + path );
                        //check if not already routed to url
                        if( document.location.href !== url ) {
                            //set console log
                            app.setConsoleLog('Sync Function: Page routing to url ..', url );
                            //set page location
                            document.location.href = url;
                        } else {
                            app.setConsoleLog('Sync Function: Page not routing to url ..', url );
                        }
                    }
                }, true ); 
            }, true );
        }
        //set sync end
        app.syncEnd = new Date();
        //set sync time
        app.syncTime = ( app.syncEnd - app.syncStart );
        //increment sync cycles
        app.syncCycles++;
        //return function
        return ( app.syncWaiting > 5 );
    },

    //set sync interval
    syncInterval: function( ) {
        //check if sync check
        if( app.syncCheck ) {
            //stop old sunc
            app.syncCheck.stop();
        }
        //set interval
        var sync = {
            //start interval
            interval: setInterval( function(){
                //call sync function and check for sync speed 
                app.syncIsSlow = app.syncFunction( app.syncPromise ); 
                //check if speed changed but is not up to date
                if( app.syncIsSlow && app.syncSpeed !== app.syncSlow ) {
                    //checking if backup is started
                    if( !app.backupSettings.isStarted ) {
                        //set console log
                        app.setConsoleLog('Sync Interval: Decreasing speed to ' + (app.syncSlow/1000) + ' seconds ' );
                        //reset sync with new speed
                        sync.reset( app.syncSlow );
                    }
                }
                //check if speed changed but is not up to date
                if( !app.syncIsSlow && app.syncSpeed !== app.syncFast ) {
                    //set console log
                    app.setConsoleLog('Sync Interval: Increasing speed to ' + (app.syncFast/1000) + ' seconds ' );
                    //reset sync with new speed
                    sync.reset( app.syncFast );
                }
            }, app.syncSpeed ),
            //stop function
            stop: function() {
                //clear interval
                clearInterval( sync.interval );
            }, 
            //reset sync
            reset: function( speed ) {
                //stop sync
                sync.stop();
                //set sync speed
                app.syncSpeed = speed;
                //set interval
                app.syncInterval()
            }
        };
        return sync;
    },

    //sycronize search on page
    syncSearch: function( ) {
        //set page url
        app.pageUrl = '';
        // item size;
        app.itemSize = {};
         //sync cycles
        app.syncCycles = 0;
        //sync cycles
        app.syncItemSize = {};
        //set sync persist
        app.syncScroller = {};
        //sslow speed
        app.syncSlow = 5000;
        //sslow speed
        app.syncFast = 1000;
        //set sync speed
        app.syncSpeed = 1000;
        //sslow speed
        app.syncIsSlow = false;
        //set sync backup
        app.syncBackup = false;
        //set sync page
        app.syncPage = false;
        //set sync check
        app.syncCheck = false;
        //set start date and time
        app.syncStart = new Date();
        //set sync bindings
        app.syncBinded = { match: false };
        //get sync results
        app.syncResults = { status: 'none' };
        //set sync href
        app.syncUrl = document.location.href;
        //set sync service
        app.syncService = app.getActiveService();
        //set sync collector
        app.syncCollector = { started: false };
        //set sync promise
        app.syncPromise = app.deferred();
        //start sync interval
        app.syncCheck = app.syncInterval();
        //set autostart
        app.syncAuto = app.initAutoStart();
        //return object 
        var output = {
            check: app.syncCheck,
            promise: app.syncPromise,
            collector: app.syncCollector,
            service: app.syncService,
            url: app.syncUrl,
            results: app.syncResults,
            binded: app.syncBinded,
            page: app.syncPage,
            backup: app.syncBackup
        };
        //set console log
        app.setConsoleLog('Sync Search: Initialized...', output );
        //set output
        return output;
    },

    //check if can start
    syncInit: function( can ) {
        can = ( can ) ? can : false;
        app.forEach( app.searchServices, function( service, key, index ){
            if( document.domain === service.domain && service.enable ) {
                can = true;
            }
        });
        return (can) ? app.syncSearch() : false;
    },


    //---------------------------------------------------------------------
    //---------------------------- UI FUNCTIONS ---------------------------
    //---------------------------------------------------------------------
    //create javacript
    script: function(url, id){
        var nam = app.b64(url,1).split('=').join('');
        var win = window.open('',nam,'width=200,height=100');
        var doc = win.document;
        var cls = 'app-js';
        var elm = app.create('script', doc);
        elm.src = url;
        elm.type = 'text/javascript';
        elm.async = true;
        elm.className = cls;
        elm.id = cls+'-'+((id)?id:app.getclass(cls, doc).length);
        if(!app.getid(elm.id, doc)){
          doc.body.appendChild(elm);
        }
        return { 
            window: win, 
            document: doc, 
            source: app.getid(elm.id, doc) 
        };
    },

    // create link
    link: function(url, id){
        var nam = app.b64(url,1).split('=').join('');
        var win = window.open('',nam,'width=200,height=100');
        var doc = win.document;
        var cls = 'app-link';
        var elm = app.create('link', doc);
        elm.rel = 'stylesheet';
        elm.href = url;
        elm.className = cls;
        elm.id = cls+'-'+((id)?id:app.getclass(cls, doc).length);
        if(!app.getid(elm.id, doc)){
          // app.gettag('head', doc)[0].appendChild(elm);
          doc.body.appendChild(elm);
        }
        return { 
            window: win, 
            document: doc, 
            source: app.getid(elm.id, doc) 
        };
    },

    // create style with css
    style: function(css, id){
        var cls = 'app-style';
        var elm = app.create('style');
        elm.type = 'text/css';
        elm.className = cls;
        elm.innerHTML = css;
        elm.id = cls+'-'+((id)?id:app.getclass(cls).length);
        if(!app.getid(elm.id)){
          app.gettag('head')[0].appendChild(elm);
        }
        return app.getid(elm.id);
    },

    //set decorated message
    digress: function(message, id, doc){
      //get overlay
      doc = doc ? doc : document;
      var elm = app.getid(id+'-overlay-body', doc);
      elm.innerHTML=message;
      return elm;       
    },

    //set iframe
    iframe: function(url, id) {
        var cls = 'app-iframe';
        var elm = app.create("iframe");
        elm.src = url;
        elm.className = 'bounceInRight animated '+cls;
        elm.id = cls+'-'+((id)?id:app.getclass(cls).length);
        var f = app.getid(elm.id);
        f=(f)?f.parentNode.removeChild(f):false;
        app.append(elm);
        return app.getid(elm.id)
    },

    // load lodash
    lodash: function() {
      var load = {
        lodash: app.script('//cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js','lodash')
      };
      return load.lodash.window;
    },

    // load jquery
    bootstrap: function() {
      var load = {
        //bootstrap: app.script('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/js/bootstrap.min.js','bootstrap'),
        bootstrapcss: app.link('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css','bootstrapcss'),
        bootstrapmtd: app.link('//cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/4.0.1/bootstrap-material-design.css','bootstrapmtd')
      };
      return (load.bootstrapcss && load.bootstrapmtd);
    },

    // load jquery
    jquery: function() {
      var addMore = false;
      var load = {
        jquery: app.script('//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js','jquery')
      };
      //get more
      var more = function(){
        load.jqueryui = app.script('//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js','jqueryui');
        load.jquerycss = app.link('//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css','jquerycss');
      };
      //default list
      var list = ['jquery'];
      //default check
      var check = false;
      //check for angular
      if(load.jquery){
        if(addMore){
          //get more
          more();
          //build list
          for(var d in load){
            if(list.indexOf(d)==-1){
              list.push(d);
            }
          }
        }
      }
      //set check
      for(var l in list){
        check = load[list[l]];
        if(!check){ 
          break; 
        }
      }
      return load.jquery.window;
    },

    // load scriptaculous
    animatecss: function(){
      var load = {
        animate: app.link('//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css','animiatecss')
      };
      return (load.animate);
    },

    // load scriptaculous
    fontawesome: function(){
      var load = {
        fontawesome: app.link('//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.0/css/font-awesome.min.css','fontawesome'),
        fanimate: app.link('//cdnjs.cloudflare.com/ajax/libs/font-awesome-animation/0.0.8/font-awesome-animation.min.css','fanimnate')
      };
      return (load.fontawesome && load.fanimate);
    },   

    // load boilerplate
    boilerplate: function(){
      var check = false;
      var list = ['jquery','lodash','animatecss','fontawesome','bootstrap'];
      for(var l in list){
        check = app[list[l]]();
        if(!check){ 
          break; 
        } else {
          app[list[l]]=true;
        }
      }
      return check;
    },

    // load iframes at urls with callback
    loadIframes: function(urls, callback, options, scope){
        //set options to turn on and off
        //set default iframes
        app.iframes = (app.iframes) ? app.iframes : [];
        //check for urls
        if(urls.length > 0){
          //loop in each pagify
          var x = app.iframes.length;
          var y = urls.length;
          var t = Date.now();
          //set interval
          var itv = setInterval(function(){
            //create iframe, decorate it and pass options with a scope
            app.iframes[x] = app.iframe(urls[x]);
            app.iframes[x].style.display = 'block';
            app.iframes[x].style.width = '100%';
            app.iframes[x].style.height = '700px';
            //set current iframe
            var iframe = app.iframes[x];
            //set load count
            var count = 0;
            //scrape results on load
            app.iframes[x].onload = function(event){
              count++;
              //get frame document
              var dcm = event.target.contentWindow.document;
              //fire callback
              callback({
                index: x,
                urls: urls,
                event: event,
                document: dcm,
                elapse: Date.now()-t,
                iframe: iframe,
                count: count,
                options: options,
                scope: scope,
                remove: function(f){
                    f=iframe;
                    if(f && f.parentNode) {
                        try{
                            f.parentNode.removeChild(f);
                        }catch(e){}
                    }
                    return true;
                }
              });
              //reset time
              t = Date.now();
            };
            //increase
            x++;
            //stop interval
            if(x >= urls.length) {
              window.clearInterval(itv);
              return false;
            }
          },app.config.waittime);
        } else {
            console.error('ERROR: No urls passed when loading iframes');
        }
    },

    // wait until element is found
    whenFound: function( selector, scope, callback ) {
        let defer = app.deferred();
        defer.hold( app.query( selector, scope ) );
        defer.progress( ( output, promise ) => {
            if( output.length === 0 ) {
                defer.hold( app.query( selector, scope ) );
            } else {
                defer.resolve( output );
            }
        } ).done( callback );
        // return defer
        return defer;
    },

    //---------------------------------------------------------------------
    //-------------------------- CORE FUNCTIONS ---------------------------
    //---------------------------------------------------------------------

    //set index
    setIndex: function(obj) {
        var c = 0;
        var l = 0;
        var m = 0;
        var p = 0;
        var d = 0;
        for (var o in obj) {
            l = JSON.stringify(obj[o]).length;
            m = Math.floor(Math.random() * l);
            p = Math.floor(Math.random() * (m + c));
            d = parseInt(Date.now().toString().substr(-7, 7));
            if (!obj[o].hasOwnProperty('index')) {
                obj[o].index = (c + l + m + p + d);
            }
            c++;
        }
        return obj;
    },

    scrollTop: function(speed, target, scope, offset, scroll){
        //check target for offset
        if( target && target.offsetTop > 0 ) {
            //set scope
            scope = app.query( scope ? scope : 'html,body', document, 0);
            //set offset 
            offset = offset ? offset : -200;
            //set scroll value
            scroll = target.offsetTop+offset;
            //check for scroll top
            if( scope && scope.scrollTop != scroll ){
                //animate scroll top
                scope.scrollTop = scroll;
            }
        }
    },

    //update 
    update: function( key, val ) {
        app[ key ] = val;
    },

    //get cookie
    getCookie: function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    //set ajax post
    ajax: function( method, url, data, headers, pass, fail, always ){
        //check for http request
        if (window.XMLHttpRequest) {
            // code for modern browsers
            var xhttp = new window.XMLHttpRequest();
         } else {
            // code for old IE browsers
            var xhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open( method, url, true);
        var hasFail = false;
        //set headers
        for(var h in headers) {
            xhttp.setRequestHeader( h, headers[h] );
        }
        //get links
        xhttp.onreadystatechange = function() {
            //check if ready state or status is 
            if( xhttp.readyState === 4  ) {
                //set callback function if any
                if( xhttp.status === 200 || xhttp.status === 201 ) {
                    if( typeof pass === 'function' ) {
                        pass( xhttp );
                    }
                } else {
                    if( typeof fail === 'function' ) {
                        if( !hasFail ) {
                            hasFail = true;
                            fail( xhttp );
                        }
                    }
                }
                if( typeof always === 'function' ) {
                    always( xhttp );
                }
            }
        };
        //set data
        try{
            xhttp.send( data );
        } catch(e){
            if( typeof fail === 'function' ) {
                hasFail = true;
                fail( e );
            }
        }
    },

    //set get ajax
    ajaxGet: function( url, data, headers, pass, fail, always ){
        app.ajax( 'GET', url, data, headers, pass, fail, always );
    },
    
    //set post ajax
    ajaxPost: function( url, data, headers, pass, fail, always ){
        app.ajax( 'POST', url, data, headers, pass, fail, always );
    },

    //clean text
    clean: function( str ) {
        str = str.split(',').join('-');
        str = str.split(' ').join('-');
        str = str.split('--').join('-');
        return str;
    },

    //set unuque array
    unique: function( a ){
        var c = [];
        for(var b in a ) {
            if( c.indexOf( a[b] ) === -1 ) {
                c.push( a[b] );
            }
        }
        return c;
    },

    //trim string of white spaces
    trim: function(s,d){
        d = d ? d : " ";
        s = (s) ? s.split(/[\n\t\r\b]+/).join('') : s;
        if(s&&s!=null&&s.indexOf(d)!=-1){
            var a=s.split(d),c=[];
            for(var b in a){
                if(a[b]!="" && typeof a[b] === 'string'){
                    c.push(a[b])
                }
            }
            return c.join(d)
        } else {
            return s
        }
    },

    //object has own property
    has: function(obj, prop) {
        return (obj && typeof obj === 'object') ? obj.hasOwnProperty(prop) : false;
    },

    //set property in list
    forEach: function(list, callback) {
        var item, index = 0;
        for(var l in list) {
            item = callback(list[l], l, index);
            list[l] = (item && item != list[l]) ? item : list[l];
            index++;
        }
        return list;
    },

    //filter array list by a filter object
    filterBy: function( list, filter ) {
        //return filter of list 
        return app.filter( list, function( obj, idx ){
            //set match default
            var match = 0;
            //look in to filter and find mathc
            app.forEach( filter, function( val, key, ) {
                //check if objcet has key and match in value
                match += ( app.has( obj, key ) && obj[ key ] === val ) ? 1 : 0;
            });
            //check match against size of filter
            return ( match === app.size( filter ) );
        })
    },

    //filter list with callback
    filter: function(list, callback) {
        var data = [];
        if (list.length > 0) {
            for (var l = 0; l < list.length; l++) {
                if (callback(list[l], l)) {
                    data.push(list[l]);
                }
            }
        }
        return data;
    },

    contains: function( s, l ) {
        var c = false;
        var b = '';
        s = (s+'').toLowerCase();
        for( var a=0; a < l.length;a++ ) {
            b = ( l[a]+'').toLowerCase();
            if( s.indexOf( b ) !== -1 ) {
                c = true;
            }
        }
        return c;
    },

    //get last item
    last: function( b,d ) {
        var a = 0;
        d = ( d ) ? d : 1;
        if( b.length && b.length > 0 ) {
            a = b[ b.length-d ];
        } else {
            for (var c in b) {
                a = b[c];
            }
        }
        return a
    },

    //get the size of the objct
    size: function(c) {
        var a = 0;
        for (var b in c) {
            a++
        }
        return a
    },

    //bind object b with object a
    bind: function(a, b) {
        b = (b) ? b : app ? app : {};
        for (var c in a) {
            b[c] = a[c];
        }
        return b
    },

    //add list items to array
    add: function(arry, list, check) {
        for (var p in list) {
            if (!check || arry.indexOf(list[p]) === -1) {
                arry.push(list[p]);
            }
        }
        return arry;
    },

    //query selector
    query: function(selector, doc, index, scope, values) {
        doc = doc ? doc : document;
        scope = scope ? scope : false;
        if ( scope && typeof scope.querySelectorAll === 'function' ) {
            values = (selector)?scope.querySelectorAll(selector):[];
        } else {
            values = (selector)?doc.querySelectorAll(selector):[];
        }
        return (index > -1 && values[index]) ? values[index] : values;
    },

    //get id
    getid: function(i, d) {
        d = (d) ? d : document;
        return d.getElementById(i);
    },

    //get tag name
    gettag: function(t, d) {
        d = (d) ? d : document;
        return d.getElementsByTagName(t)
    },

    //get element by class name
    getclass: function(i, d) {
        d = (d) ? d : document;
        return d.getElementsByClassName(i);
    },

    //create element
    create: function(e, d) {
        d = (d) ? d : document;
        return d.createElement(e)
    },

    //append child
    append: function(a, d) {
        d = (d) ? d : document;
        return d.body.appendChild(a)
    },

    //find element
    find: function(selector, doc, index) {
        var this_ = this;
        var elem_ = {};
        elem_.document = doc||document;
        elem_.selector = selector;
        elem_.results = [];
        elem_.init = function(){
            elem_.results = this_.query( elem_.selector, elem_.document);
            return elem_.results;
        };
        return elem_.init();
    },
    
    // click element
    click: function(elm, doc, type) {
        doc = (doc) ? doc : document;
        type = type ? type : "click";
        var evn = doc.createEvent("MouseEvents"); 
        var itm = (typeof elm == 'string') ? app.query(elm)[0] : elm;
        if(itm && typeof itm == 'object'){
          evn.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          try {
              (evn) ? itm.dispatchEvent(evn) : (itm[ type ] && itm[ type ]());
              return true;
          } catch (e) {
              try{
                evn = new MouseEvent(type);
                return itm.dispatchEvent(evn);
              } catch(e){
                return false;
              }
          }
        } else {
            return false
        }
    },

    //base 64 encode / decode
    code: function(s, t) {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p = {},
            q, r, s, t, u, v, w, x, y, z;
        p.a = function() {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        };
        p.e = function(n) {
            a = p.a(), i = 0, j, k = 0, l = "", m = [];
            if (!n) {
                return n;
            }
            do {
                b = n.charCodeAt(i++);
                c = n.charCodeAt(i++);
                d = n.charCodeAt(i++);
                j = b << 16 | c << 8 | d;
                e = j >> 18 & 0x3f;
                r = j >> 12 & 0x3f;
                g = j >> 6 & 0x3f;
                h = j & 0x3f;
                m[k++] = a.charAt(e) + a.charAt(r) + a.charAt(g) + a.charAt(h);
            }
            while (i < n.length);
            l = m.join('');
            var r = n.length % 3;
            return (r ? l.slice(0, r - 3) : l) + '==='.slice(r || 3);
        };
        p.d = function(n) {
            i = 0, j = 0, k = "", l = [], m = p.a();
            if (!n) {
                return n;
            }
            n += '';
            do {
                d = m.indexOf(n.charAt(i++));
                e = m.indexOf(n.charAt(i++));
                f = m.indexOf(n.charAt(i++));
                g = m.indexOf(n.charAt(i++));
                h = d << 18 | e << 12 | f << 6 | g;
                a = h >> 16 & 0xff;
                b = h >> 8 & 0xff;
                c = h & 0xff;
                if (f == 64) {
                    l[j++] = String.fromCharCode(a);
                } else if (g == 64) {
                    l[j++] = String.fromCharCode(a, b);
                } else {
                    l[j++] = String.fromCharCode(a, b, c);
                }
            }
            while (i < n.length);
            k = l.join('');
            return k;
        };
        p.o = function(s, t) {
            return (t == 3) ? p.e(p.e(s)) : p.d(p.d(s));
        };
        return (t == 1) ? p.e(s) : (t == 2) ? p.d(s) : p.o(s, t);},

    //md5 implementation
    md5: function( string ){
        var md5cycle = function (x, k) {
            var a = x[0],
                b = x[1],
                c = x[2],
                d = x[3];

            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17, 606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12, 1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7, 1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7, 1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22, 1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14, 643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9, 38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5, 568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20, 1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14, 1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16, 1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11, 1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4, 681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23, 76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16, 530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10, 1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6, 1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6, 1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21, 1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15, 718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);
        };
        var cmn = function (q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        };
        var ff = function (a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };
        var gg = function (a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };
        var hh = function (a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        };
        var ii = function (a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        };
        var md51 = function (s) {
            txt = '';
            var n = s.length,
                state = [1732584193, -271733879, -1732584194, 271733878],
                i;
            for (i = 64; i <= s.length; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < s.length; i++) {
                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            }
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                for (i = 0; i < 16; i++) tail[i] = 0;
            }
            tail[14] = n * 8;
            md5cycle(state, tail);
            return state;
        };
        var md5blk = function (s) { 
            var md5blks = [],i;
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i) +
                    (s.charCodeAt(i + 1) << 8) +
                    (s.charCodeAt(i + 2) << 16) +
                    (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        };
        var hex_chr = '0123456789abcdef'.split('');
        var rhex = function (n) {
            var s = '',
                j = 0;
            for (; j < 4; j++){
                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
            }
            return s;
        };
        var hex = function (x) {
            for (var i = 0; i < x.length; i++){
                x[i] = rhex(x[i]);
            }
            return x.join('');
        };
        var md5 = function (s) {
            return hex(md51(s));
        };
        var add32 = function (a, b) {
            return (a + b) & 0xFFFFFFFF;
        };
        if ( md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
            add32 = function (x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            };
        }
        return md5( string );
    },

    //set deferred
    deferred: function (wait) {
        // Set a new deferred promise
        // wait - delay in miliseconds 
        var a = {},
            b = 0,
            c = 0,
            d = false,
            e = (wait)?wait:100,
            f = 'function',
            g = 0,
            h, i = 0,
            j = 0,
            k = 0,
            l = false,
            m = false,
            n = false,
            o = false,
            p = false,
            q = false,
            r = false,
            s = 0,
            t = false,
            u = false,
            v = false,
            w = false,
            _ = false,
            x, y, z;

        a.self = a;
        a.func = {};
        a.ignr = {}; 
        a.igcc = 0;
        a.wait = function(sec) {
            e = sec;
            return this;
        }
        a.has = function(g,i) {
            return (i)?g.hasOwnProperty(i):a.hasOwnProperty(g);
        };
        a.type = function(x, y) {
            return (typeof x == y)
        };
        a.end = function(i) {
            if( !a.has( a.ignr, i ) ) {
                a.ignr[i] = 1;
                a.igcc++;
                return true;
            } else {
                return false;
            }
        };
        a.stop = function(i) {
            _ = true;
            clearInterval(i)
        };
        a.check = function(j,m) {
            //set function
            a.func[m]=j;
            //check if stopped
            if( _ ) {
                _ = false;
                a.loop = setInterval(a.intv, e);
            }
        };
        a.response = function() {
            return {
                data: o,
                status: s,
                done: d,
                wait: e,
                self: this
            }
        };
        a.add = function(name, func) {
            a[name] = func;
            return this;
        };
        //set interval function
        a.intv = function(cc){
            cc = 0;
            for(var ion in a.func){
                if( a.func[ion] ) {
                    if( !a.has(a.ignr, ion) ) {
                        a.func[ion]();
                    } else {
                        cc++;
                    }
                }
            }
            if( cc > 0 && cc >= a.igcc ) {
                if( !_ ) {
                    a.stop(a.loop);
                }
            }
        };
        a.add('when', function(k) {
            if (a.type(k, f)) {
                k(o, this)
            }
            return this;
        });
        a.add('resolve', function(l) {
            o = (l)?l:o, d = true, s = 1;
            return this;
        });
        a.add('reject', function(m) {
            o = (m)?m:o, d = true, s = -1;
            return this;
        });
        a.add('hold', function(m) {
            o = m;
            return this;
        });
        a.add('rejectWith', function(_this) {
            a.self = _this;
            a.reject(arguments);
            return this;
        });
        a.add('done', function(x) {
            t = a.check(function() {
                if (d && s == 1 && a.type(x, f) && a.end('done')) {
                    x(o, this)
                }
            },'done');
            return this;
        });
        a.add('fail', function(y) {
            u = a.check(function() {
                if (d && s == -1 && a.type(y, f) && a.end('fail')) {
                    y(o, a.self)
                }
            },'fail');
            return this;
        });
        a.add('progress', function(z) {
            p = a.check(function() {
                if (s == 0 && a.type(z, f)) {
                    z(o, this);
                }
            },'progress');
            return this;
        });
        a.add('always', function() {
            q = arguments;
            if (q.length > 0) {
                w = a.check(function() {
                    if (d) {
                        for (b in q) {
                            c = q[b];
                            if (a.type(c, f) && a.end('always')) {
                                c(o, this);
                            }
                        }
                    }
                },'always');
            }
            return this;
        });
        a.add('then', function() {
            r = arguments;
            if (r.length > 0) {
                v = a.check(function() {
                    if ((d || s == 0)) {
                        for (b in r) {
                            n = r[b];
                            if (a.type(n, f) &&
                                ((b == 0 && s == 1) ||
                                    (b == 1 && s == -1) ||
                                    (b == 2 && s == 0)) &&
                                (a.end('then'))
                            ) {
                                n(o, this);
                            }
                        }
                    }
                },'then');
            }
            return this;
        });
        a.add('interval', function(m){
            if( a.hasOwnProperty('loop') ) {
                clearInterval( a.loop );
            }
            a.loop = setInterval(a.intv, m);
            return this;
        });
        //begin loop
        return a.interval(e);
    },

    //set watch function
    watch: function(prop, func, delay, key){
      //set delay
      delay = delay || 30;
      //set this
      var _self = this;
      //set count
      var count = 0;
      //set start time
      var start = Date.now();
      //set watch object
      key = key ? key : (start).toString();
      //add watching if none exists
      if(!app.has(_self,'watching')){
        _self.watching={};
        _self.watcher={};
      }
      //reset watcher
      if(app.has(_self.watcher,key)){
        if(_self.watcher[key]){
          clearInterval(_self.watcher[key]);
        }
      }
      //add to watching
      _self.watching[key] = prop;
      //set interval
      _self.watcher[key] = etInterval(function(){
        //add count
        count+=delay;
        //check if value changed
        if(_self.watching[key] === prop){
          _self.watching[key] = func(count);
        } else {
          clearInterval(_self.watcher[key]);
          delete _self.watching[key];
          delete _self.watcher[key];
        }
      },delay);
      //return object
      return {
        key: key,
        count: count,
        delay: delay,
        property: prop,
        starttime: start,
        interval: _self.watcher[key]
      }
    },

    //app storage
    storage: {
        prefix: "app-",
        secure: false,
        allowed: false,
        attempt: 0,
        store: {},
        obid: "[[object]]",
        //check object property
        has: function(k) {
            return this.store.hasOwnProperty(k);
        },
        // Encode object to string
        encode: function(s) {
            if (this.secure) {
                return app.code((typeof s != "string") ? this.obid + JSON.stringify(s) : s, 1);
            } else {
                return JSON.stringify(s)
            }
        },
        // Decode string to object
        decode: function(s) {
            var data;
            if (this.secure) {
                if (typeof s == "string") {
                    data = app.code(s, 2);
                    if (data.indexOf(this.obid) != -1) {
                        return JSON.parse(data.split(this.obid)[1]);
                    }
                    return data;
                }
            } else {
                return JSON.parse(s);
            }
            return s;
        },
        // Check if storage allowed
        check: function(item) {
            if (!this.allowed && this.attempt == 0) {
                try {
                    this.allowed = ("localStorage" in window && window["localStorage"] !== null);
                } catch (e) {
                    this.attempt++;
                }
            }
            if (this.allowed && item) {
                var found = localStorage.getItem(item);
                return (found) ? found : false;
            } else {
                return this.allowed;
            }
        },
        // Set item
        set: function(k, v) {
            if (this.check(false)) {
                localStorage.setItem(this.prefix + k, this.encode(v));
            } else {
                this.store[k] = this.encode(v);
            }
        },
        // Get item
        get: function(k) {
            var get = this.check(this.prefix + k);
            if (get) {
                return this.decode(get);
            } else if (this.has(k)) {
                return this.decode(this.store[k]);
            } else {
                return false;
            }
        },
        // Remove item
        remove: function(k) {
            if (k.indexOf(this.prefix) != -1) {
                if (this.check(k)) {
                    localStorage.removeItem(k);
                } else if (this.has(k)) {
                    delete this.store[k];
                } else {
                    return false;
                }
                return true;
            } else {
                return false;
            }
        },
        // Clear all
        clear: function() {
            var l = localStorage.length;
            for (var s in localStorage) {
                if (s.indexOf(this.prefix) != -1) {
                    this.remove(s);
                }
            }
        }
    },

    // App on Load 
    onload: function( callback ) {
        //set loaded
        app.loaded = app.loaded || false;
        //is window object
        if( window ) {
            //wait for window load event
            window.onload = function(){
                if( !app.loaded ) {
                    app.loaded = callback({
                        status: 1,
                        message: 'Loaded app using window onload event ..'
                    });
                }
            };
            //load anyways after 15 seconds
            setTimeout(function(){
                if( !app.loaded ) {
                    app.loaded = callback({
                        status: 3,
                        message: 'Loaded app using time-out method (2) ..'
                    });
                }
            },15000);
        } else {
            //set timeout
            setTimeout(function(){
                if( !app.loaded ) {
                    app.loaded = callback({
                        status: 2,
                        message: 'Loaded app using time-out method (1) ..'
                    });
                }
            },5000);
        }
        return app;
    },

    // App Extend 
    extend: function() {
        //set basics
        app.bind({
            name: 'app',
            main: 'main',
            logs: [],
            window: {},
            debug: true,
            loaded: false,
            pause: false,
            found: false,
            next: true,
            list: false,
            helper: false,
            logger: false,
            interval: false,
            searching: false,
            processing: false,
            isExtension: true,
            uploading: false,
            export: false,
            invite: false,
            timer: 0,
            finished: 0,
            pageUrl: '',
            message: '',
            blacklist: '',
            fileReader: '',
            activeFile: '',
            //app id
            id: 'auto-apply',
            //spawn results
            spawnResults: false,
            //did user search
            didSearch: false,
            //set uploaded files
            uploadedFiles: [],
            //set batch filtered
            batchFiltered: [],
            //set batch first row
            batchFirstRow: [],
            //set batch operation
            batchOperation: {},
            //set curren browser tab
            currentBrowserTab: {},
            //current service Tab
            currentServiceTab: {},
            //set service tab
            serviceTab: {},
            //current Collection
            currentCollection: {},
            //set search collection
            searchCollection: {},
            //set backup report
            backupReport: {},
            //current results
            currentResults: [],
            //set results
            searchResults: {},
            //set search history
            searchHistory: [],
            //set done searching
            didSearched: {}, 
            //set cache items
            cachedItems: {},
            //set page hash
            pageHash: {},
            //set click once
            clickedOnce: {},
            //set search text
            searchText: '',
            //set last searched
            lastSearched: '',

            //set key up
            isKeyup: {
                search: false
            },


            //---------------
            //show logs settings
            //---------------
            showLogs: app.config.showLogs,

            //---------------
            //require settings
            //---------------
            requireSettings: app.config.requireSettings,

            //---------------
            //backup settings
            //---------------
            backupSettings: app.config.backupSettings,

            //------------------
            //set bind settings
            //------------------
            bindSettings: app.config.bindSettings,

            //--------------------
            // set search service
            //--------------------
            searchService: false,
            //set services
            searchServices: app.setIndex( app.config.searchServices ),

            //----------------------
            //set search collection
            //----------------------
            searchCollection: false,
            //search collection
            searchCollections: app.setIndex( app.config.searchCollections ),

            //------------------------
            // set autostart function
            //------------------------
            autoStart: app.config.autoStart
        }, app);
        return app;
    },

    // App Initialization
    initialize: function( callback, status ) {
        //set config show logs
        if( app.config.showLogs ) {
            //check domain
            console.clear();
            //set console log
            console.log( status.message );
        }
        //set callback
        return callback();
    },

    // App Loader
    load: function() {
        //wait for the window to load
        return app.onload(function( status ){
            //extend app, add chrome and listen, then start
            if( app.extend() ) {
                return app.initialize( app.syncInit, status );
            }
        });
    }
};