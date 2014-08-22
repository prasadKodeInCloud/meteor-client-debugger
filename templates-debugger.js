Session.set('debug_template', null );

Deps.autorun(function () {
    if( Session.get('debug_template') === 'render'){
        console.log('called debug render ');

        for( var k in Template ){
            if(Template[k].rendered ){
                new Extender().extendRendered(k);
            }
        }
    }

    if( Session.get('debug_template') === 'helpers'){
        console.log('called debug helpers');

        for( var j in Template ){
            for( var k in Template[j] ){
                if( isHelper( j, k ) ){
                    Extender().extendHelpers( j, k );
                }
            }
        }
    }

});

function getRandomRolor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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

        extendHelpers:function( tmpName, helper ){
            console.log('extend helper for : ', tmpName, helper );

            var helperFunc = Template[ tmpName ][ helper ];
            if(helperFunc.length > 0 ){
                console.log(tmpName, ' - ' , helper, 'contains more parameters : ', helperFunc.length );
                return;
            }

            Template[ tmpName ][ helper ] = function(){
                if(console)
                    console.log( tmpName, '- called helper : ', helper );
                helperFunc.apply( this, arguments ); 

            }  
        },

        extendRendered:function( tmpName ){
            console.log('extend rendered for : ', tmpName );

            var renderedFunc = Template[tmpName].rendered;
            var color = getRandomRolor();

            Template[tmpName].rendered = function(){
                if(console)
                    console.log('%c Rendered Template : ' + tmpName + ' ' , 'background:##F3F6E3; color:' + color);
                   
                renderedFunc.apply( this, arguments ); 

            }  
        }
    }
}

