
Package.describe({

  name: "client-debugger",
  summary: "Facilitates to debug client side codes of meteor apps. ",
  homepage: "https://github.com/prasadKodeInCloud/meteor-client-debugger",
  author: "Prasad Hewage(https://twitter.com/Prasad19sara)",
  version: "0.1.11",
  git: "https://github.com/prasadKodeInCloud/meteor-client-debugger.git",
  packages: {},
});

Package.on_use(function(api) {
  api.use(["session", "templating", "deps", "underscore"]);
  api.add_files(["template-debugger.js", "utils.js", "debug-handler.js" ], 'client');
});
