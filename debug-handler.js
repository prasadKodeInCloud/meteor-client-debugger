
Session.setDefault('debug_template', null );
Session.setDefault('debug_template_events', false ); 

Meteor.startup( function() {
    if( ClientDebugger.debugMode ){
        $('body').prepend('<div class="client-debugger-container"> </div>');  
        Blaze.render( Template['clientDebuggerPopup'] , $('.client-debugger-container')[0] );
    }
});


Deps.autorun(function () {
    if( Session.get('debug_template') === 'render'){
        console.log('session is render');
        templateDebugger().render();
    }

    if( Session.get('debug_template') === 'helpers'){
        templateDebugger().helpers();
    }

    if( Session.get('debug_template') === 'events'){
        templateDebugger().events();
    }

    if( Session.get('debug_template') === '*'){
        templateDebugger().render();
        templateDebugger().helpers();
        templateDebugger().events();
    }

});