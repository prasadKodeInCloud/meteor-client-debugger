
Package.describe({

    name: 'prasad19sara:client-debugger',
    summary: 'Facilitates to debug client side codes of meteor apps. ',
    homepage: 'https://github.com/prasadKodeInCloud/meteor-client-debugger',
    author: 'Prasad Hewage(https://twitter.com/Prasad19sara)',
    version: '0.1.13',
    git: 'https://github.com/prasadKodeInCloud/meteor-client-debugger.git',
    packages: {},
});

Package.on_use(function(api) {
    api.versionsFrom('METEOR@0.9.0');
    api.use('templating', 'client');
    api.use('deps', 'client');
    api.use('session', 'client');
    api.use('underscore', 'client');
    api.add_files([
        'template-debugger.js', 
        'utils.js', 
        'debug-handler.js',
        'client/views/client-debugger-popup.tpl.html',
        'client/views/client-debugger-popup.vw.js',
        'client/views/css/client-debugger.css',
        'client/lib/tree.jquery.js' 
    ], 'client');
    api.export(['ClientDebugger']);
});
