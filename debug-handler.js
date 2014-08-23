

Session.setDefault('debug_template', null );

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

});