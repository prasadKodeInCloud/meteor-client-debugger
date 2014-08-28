

//Override Jquery 'on' function to track events getting triggered. 

var OriginaljQueryOn = jQuery.fn.on ;
var eventsToTrack = ['click', 'focus','blur', 'keydown', 'keyup'];

jQuery.fn.on = function ( types, selector, data, fn, /*INTERNAL*/ one ) { 
    var currentSelector = null;
    if( this.context && this.context.className )
        currentSelector = this.context.className ;
    else if( this.className )
        currentSelector = this.className ;

    if( currentSelector && _.contains( eventsToTrack, types ) && typeof( selector ) === 'function' ){
        var originalFn = selector;

        selector = function(/* ...*/){
            console.log( 'Trgiggered jQuery event : ', types , ' of ' , currentSelector  );
            originalFn.apply( this, arguments );
        }
    }

    var result = OriginaljQueryOn.apply( this, arguments );

    return result;

}
//Extend the Template events prototype to include console.log
//For Meteor 0.8.1.3
if(Template.prototype && Template.prototype.events ){
    var originalEventsPrototype  = Template.prototype.events;

    Template.prototype.events = function ( eventMap ) {
        for (var k in eventMap) {
            eventMap[k] = new Extender().extendedEvent(this.__templateName, k, eventMap[k]);
        }

        originalEventsPrototype.apply( this, arguments ); 
    };
}

function extendedHelper( tmpName, helper, func ){
    console.log('%c    extend '+ tmpName +  ' template helper : ' + helper + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );
    
    var color = getRandomColor();
    
    return function(){

        console.log('%c Called helper : "' + helper + '" of "' + tmpName + '" ' , 'font-size:12px; background:#CADFF5; color:' + color);
        var args = Array.prototype.slice.call( arguments );
        var result = func.apply( this, args );
        if( result != undefined )
           console.log('    Result: ', result );
           
        return result;
    }
}

templateDebugger = function(){
    return{

        render:function(){
            console.log('%c called debug render ', 'font-size:14px;background:#8AC007; color: #000000"');

            for( var k in Template ){
                if( isProjectTemplate( k ) ){
                    new Extender().extendRendered(k);
                }
            }
        },

        helpers:function(){
            console.log('%c called debug helpers ', 'font-size:14px;background:#8AC007; color: #000000"');

            for( var j in Template ){
                if( isProjectTemplate( j ) ){
                     _.each(Template[j], function ( hookFn, name ) {
                        if( isHelper( j, name ) )
                            Template[j][name] = extendedHelper( j, name, hookFn );
                    });
                }
                
            }
        },

        events:function(){
            console.log('%c called debug events ', 'font-size:14px;background:#8AC007; color: #000000"');
            for( var j in Template ){
                //For Meteor 0.8.1.3
                if( Template[j]._events  && _.isArray(Template[j]._events) ){
                    for( var i = 0 ; i < Template[j]._events.length ; i++ ){
                        new Extender().extendEventByEventsArray( j, i );
                    }
                }

                //Onwards Meteor 0.8.1.3
                if( Template[j].__eventMaps && _.isArray(Template[j].__eventMaps ) ){
                    Session.set('debug_template_events', true );
                }
            }    
        }

    }
}

/**
 * Check whether this template is defined in the project scope
 * Need to validate with better conditions
 * @param  {[type]}  tmpName Template Name
 * @return {Boolean}         
 */
function isProjectTemplate( tmpName ){
    if(UI._globalHelpers && UI._globalHelpers[tmpName])
        return false;

    if( tmpName === "prototype")
        return false;

    if( tmpName.slice(0, 1) === '_')
        return false;

    return true;
}

function isHelper( tmpName, helper ){
    if( !Template[tmpName].hasOwnProperty(helper))
        return false;

    if( helper.slice(0, 1) === '_')
        return false;

    if( _.contains(['render', 'rendered', 'instantiate', 'destroyed'], helper ) )
        return false;

    if( typeof( Template[tmpName][helper] ) === 'function' )
        return true;

    return false;
}

function Extender(){
    return {

         extendedHelper: function( tmpName, helper, func ){
            var color = getRandomColor();
            return function(/* ...*/){
                if(Session.get('debug_template_helpers') === true ){
                    console.log('%c Called helper : "' + helper + '" of "' + tmpName + '" ', 'font-size:12px; background:#CADFF5; color:' + color);
                }

                func.apply( this, arguments );
            }

        },

        extendHelper:function( tmpName, helper ){
            console.log('%c    extend '+ tmpName +  ' template helper : ' + helper + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );

            var color = getRandomColor();
            var helperFunc = Template[ tmpName ][ helper ];
            
            Template[ tmpName ][ helper ] = function(/* ...*/){
                if(console)
                    console.log('%c Called helper "' + helper + '" of "' + tmpName + '" template ', 'font-size:12px; background:#CADFF5; color:' + color);
                
                var result = helperFunc.apply( Template[ tmpName ], arguments ); 

                return result;

            }  

        },

        extendRendered:function( tmpName ){
            console.log('%c    extend rendered for : ' + tmpName + ' template ','font-size:12px;background:#F3BAD3; color: #000000"');
            
            var color = getRandomColor();
            
            if(Template[tmpName].rendered && typeof( Template[tmpName].rendered ) === 'function'){
                var renderedFunc = Template[tmpName].rendered;
                
                Template[tmpName].rendered = function(/* ...*/){
                    if(console)
                        console.log('%c Rendered Template : ' + tmpName + ' ' , 'font-size:12px; background:#CADFF5; color:' + color);
                       
                    renderedFunc.apply( this, arguments ); 

                } 

            }else{
                Template[tmpName].rendered = function(){
                    if(console)
                        console.log('%c Rendered Template : ' + tmpName + ' ' , 'font-size:12px; background:#CADFF5; color:' + color);
                }
            }
            
        },

        extendedEvent: function( tmpName, evt, func ){
            var color = getRandomColor();
            return function(/* ...*/){
                if(Session.get('debug_template_events') === true ){
                    console.log('%c Triggered "' + evt + '" event of "' + tmpName + '" template ', 'font-size:12px; background:#CADFF5; color:' + color);
                }

                func.apply( this, arguments );
            }
        },

         extendEventByEventsArray:function( tmpName, i ){
            var evt = Template[tmpName]._events[i].events + ' ' + Template[tmpName]._events[i].selector;

            console.log('%c    extend '+ tmpName +  ' event : ' + evt + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );
            var color = getRandomColor();
            var eventFun =  Template[tmpName]._events[i].handler;
            
            Template[tmpName]._events[i].handler = function(/* ...*/){
                if(console)
                     console.log('%c Triggered "' + evt + '" event of "' + tmpName + '" template ', 'font-size:12px; font-weight:bold; background:#D5BDE6; color:' + color);
                eventFun.apply( this, arguments ); 

            } 
        }
    }
}

