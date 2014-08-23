Session.set('debug_template', null );

 sayHi = function(){
    console.log('hi');
}

templateDebugger = function(){
    return{

        render:function(){
            console.log('called debug render ');

            for( var k in Template ){
                if(Template[k].rendered ){
                    new Extender().extendRendered(k);
                }
            }
        },

        helpers:function(){
            console.log('called debug helpers');

            for( var j in Template ){
                for( var k in Template[j] ){
                    if( isHelper( j, k ) ){
                      new Extender().extendHelper( j, k );
                    }
                }
            }
        },

        events:function(){
            console.log('called debug events');
            for( var j in Template ){
                if( Template[j]._events ){
                    for( var i = 0 ; i < Template[j]._events ; i++ ){
                        new Extender().extendEventByEvents( j, i );
                    }
                }

                if( Template[j].__eventMaps ){
                    for( var i = 0 ; i < Template[j].__eventMaps.length ; i++ ){
                        for( var key in Template[j].__eventMaps[i] ){
                            new Extender().extendEvent( j, i, key );
                        } 
                    }
                }
            }    
        }

    }
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

        extendHelper:function( tmpName, helper ){
            console.log('extend helper for : ', tmpName, helper );

            var helperFunc = Template[ tmpName ][ helper ];
            
            Template[ tmpName ][ helper ] = function(/* ...*/){
                if(console)
                    console.log( tmpName, '- called helper : ', helper );
                helperFunc.apply( this, arguments ); 

            }  
        },

        extendRendered:function( tmpName ){
            console.log('extend rendered for : ', tmpName );

            var renderedFunc = Template[tmpName].rendered;
            var color = getRandomColor();

            Template[tmpName].rendered = function(/* ...*/){
                if(console)
                    console.log('%c Rendered Template : ' + tmpName + ' ' , 'background:##F3F6E3; color:' + color);
                   
                renderedFunc.apply( this, arguments ); 

            }  
        },

        extendEvent: function ( tmpName, i, evt ){
            var eventHandler = Template[tmpName].__eventMaps[i][evt];
            var color = getRandomColor();

            Template[tmpName].__eventMaps[i][evt] = function(event/*, ...*/){
                if(console)
                    console.log('%c Triggered event : ' + tmpName + ' - ' + evt + ' ' , 'background:##F3F6E3; color:' + color);
                
                eventHandler.apply( this, arguments);
            }
        },

        extendEventByEvents: function ( tmpName, i ){
            var eventHandler = Template[tmpName]._event[i].handler;
            var color = getRandomColor();

            Template[tmpName]._event[i].handler = function(event/*, ...*/){
                if(console)
                    console.log('%c Triggered event : ' + tmpName + ' - ' + evt + ' ' , 'background:##F3F6E3; color:' + color);
                
                eventHandler.apply( this, arguments);
            }
        }
    }
}

