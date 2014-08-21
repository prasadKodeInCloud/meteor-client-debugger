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
        console.log('called debug helpers ');

        for( var j in Template ){
            for( var k in Template[j] ){
                if( isHelper( j, k ) ){
                    new Extender().extendHelpers( j, k );
                }
            }
        }
    }

});

function isHelper( tmpName, helper ){
    if( helper.slice(0, 1) === '_')
        return false;

    if( _.contains(['render', 'rendered', 'instantiate'], helper ) )
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
            Template[ tmpName ][ helper ] = function(){
                if(console)
                    console.log( tmpName, '- called helper : ', helper );
                helperFunc.apply( this, arguments ); 

            }  
        },

        extendRendered:function( tmpName ){
            console.log('extend rendered for : ', tmpName );

            var renderedFunc = Template[tmpName].rendered;
            Template[tmpName].rendered = function(){
                if(console)
                    console.log('Rendered Template : ', tmpName );
                renderedFunc.apply( this, arguments ); 

            }  
        }
    }
}

