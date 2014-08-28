
Meteor.startup( function() {
    Session.setDefault('debug_template', null );
    Session.setDefault('debug_template_events', false );    
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