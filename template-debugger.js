

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


// var originalHelpersPrototype = Template.prototype.helpers;
// Template.prototype.helpers = function ( dict ) {
//     console.log('>>>>>>>>>>>>>>>>> Dict: ', dict );
//     for (var k in dict){
//         dict[k] = new Extender().extendedHelper(this.__templateName, k, dict[k]);
//     }
    
//     originalHelpersPrototype.apply( this, arguments );
// };

function extendedHelper( tmpName, helper, func ){
    console.log('%c    extend '+ tmpName +  ' template helper : ' + helper + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );
    
    var color = getRandomColor();
    
    return function(){
        var args = Array.prototype.slice.call( arguments );
        console.log('%c Called helper : "' + helper + '" of "' + tmpName + '" ', 'font-size:12px; background:#E9F0B6; color:' + color);
        var result = func.apply( this, args );
        
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
                    // _.each(Template[j], function ( hookFn, name ) {
                    //     if( isHelper( j, name ) )
                    //         Template[j][name] = extendedHelper( j, name, hookFn );
                    // });
                   for( var k in Template[j] ){
                        if( isHelper( j, k ) ){
                            new Extender().extendHelper( j, k );
                        }
                    } 
                }
                
            }
        },

        events:function(){
            console.log('%c called debug events ', 'font-size:14px;background:#8AC007; color: #000000"');
            for( var j in Template ){
                //For Meteor 0.8.1.3
                // if( Template[j].events ){
                //     for(var m in Template[j].events ){
                //         new Extender().extendEventByKey( j, m );
                //     }
                // }

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
                
                // if( Template[j].__eventMaps ){
                //     for( var i = 0 ; i < Template[j].__eventMaps.length ; i++ ){
                //         for( var key in Template[j].__eventMaps[i] ){
                //             new Extender().extendEvent( j, i, key );
                //         } 
                //     }
                // }
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

//Must use closures to extend the events
function Extender(){
    return {

         extendedHelper: function( tmpName, helper, func ){
            var color = getRandomColor();
            return function(/* ...*/){
                if(Session.get('debug_template_helpers') === true ){
                    console.log('%c Called helper : "' + helper + '" of "' + tmpName + '" ', 'font-size:12px; background:#E9F0B6; color:' + color);
                }

                func.apply( this, arguments );
            }

            // var color = getRandomColor();
            // var logMsg = "console.log('%c " + tmpName + " - called helper : " + helper + " ' , 'font-size:12px; background:#E9F0B6; color: " + color + "');";
            // var funcString = func.toString();
            // funcString = funcString.replace('{', '{@#$%^&*');
            // var strArr = funcString.split('@#$%^&*');
            // strArr[0] = strArr[0]  + logMsg;

            // var newFuncString = '';
            // for(var i = 0 ; i < strArr.length ; i++){
            //     newFuncString += strArr[i];
            // }

            // eval('var ' + tmpName + '_' + helper + ' = ' + newFuncString );
            // return eval( tmpName + '_' + helper );
        },

        extendHelper:function( tmpName, helper ){
            console.log('%c    extend '+ tmpName +  ' template helper : ' + helper + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );

            var color = getRandomColor();
            var helperFunc = Template[ tmpName ][ helper ];
            
            Template[ tmpName ][ helper ] = function(/* ...*/){
                if(console)
                    console.log('%c Called helper : "' + helper + '" of "' + tmpName + '" ', 'font-size:12px; background:#E9F0B6; color:' + color);
                
                var result = helperFunc.apply( Template[ tmpName ], arguments ); 

                return result;

            }  
            
            //NOTE: Need to replace this if found a better solution. 
            //This version still cannot access the objects defined in global scope.
            
            // var color = getRandomColor();
            // var logMsg = "console.log('%c Called " + helper + " helper of template " + tmpName + " ' , 'font-size:12px; background:#E9F0B6; color: " + color + "');";
            // var funcString = Template[ tmpName ][ helper ].toString();
            // funcString = funcString.replace('{', '{@#$%^&*');
            // var strArr = funcString.split('@#$%^&*');
            // strArr[0] = strArr[0]  + logMsg;

            // var newFuncString = '';
            // for(var i = 0 ; i < strArr.length ; i++){
            //     newFuncString += strArr[i];
            // }

            // eval('var ' + tmpName + '_' + helper + ' = ' + newFuncString );
            // Template[ tmpName ][ helper ] = eval( tmpName + '_' + helper );
        },

        extendRendered:function( tmpName ){
            console.log('%c    extend rendered for : ' + tmpName + ' template ','font-size:12px;background:#F3BAD3; color: #000000"');
            
            var color = getRandomColor();
            
            if(Template[tmpName].rendered && typeof( Template[tmpName].rendered ) === 'function'){
                var renderedFunc = Template[tmpName].rendered;
                
                Template[tmpName].rendered = function(/* ...*/){
                    if(console)
                        console.log('%c Rendered Template : ' + tmpName + ' ' , 'font-size:12px; background:#E9F0B6; color:' + color);
                       
                    renderedFunc.apply( this, arguments ); 

                } 

            }else{
                Template[tmpName].rendered = function(){
                    if(console)
                        console.log('%c Rendered Template : ' + tmpName + ' ' , 'font-size:12px; background:#E9F0B6; color:' + color);
                }
            }
            
        },

        extendedEvent: function( tmpName, evt, func ){
            var color = getRandomColor();
            return function(/* ...*/){
                if(Session.get('debug_template_events') === true ){
                    console.log('%c Triggered "' + evt + '" event of "' + tmpName + '" template ', 'font-size:12px; background:#E9F0B6; color:' + color);
                }

                func.apply( this, arguments );
            }
        },

        extendEvent:function( tmpName, i, evt ){
            console.log('%c    extend '+ tmpName +  ' event : ' + evt + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );
            var color = getRandomColor();
            var eventFun = Template[tmpName].__eventMaps[i][evt];
            
            Template[tmpName].__eventMaps[i][evt] = function(/* ...*/){
                if(console)
                     console.log('%c Triggered "' + evt + '" event of "' + tmpName + '" template ', 'font-size:12px; background:#E9F0B6; color:' + color);
                var result = eventFun.apply( this, arguments ); 

                return result;

            } 
        },

         extendEventByEventsArray:function( tmpName, i ){
            var evt = Template[tmpName]._events[i].events + ' ' + Template[tmpName]._events[i].selector;

            console.log('%c    extend '+ tmpName +  ' event : ' + evt + ' ' , 'font-size:12px;background:#84D9E0; color: #000000"' );
            var color = getRandomColor();
            var eventFun =  Template[tmpName]._events[i].handler;
            
            Template[tmpName]._events[i].handler = function(/* ...*/){
                if(console)
                     console.log('%c Triggered "' + evt + '" event of "' + tmpName + '" template ', 'font-size:12px; background:#E9F0B6; color:' + color);
                eventFun.apply( this, arguments ); 

            } 
        }


    }
}

