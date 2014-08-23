
Package.describe({
  name: "client-debugger",
  summary: "Facilitates to debug client side codes of meteor apps. Targeted for development environment issues tracking."
});

Package.on_use(function(api) {
  api.use(["session", "templating", "deps", "underscore"]);
  api.add_files(["template-debugger.js", "utils.js", "debug-handler.js" ], 'client');
});
