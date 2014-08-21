
Package.describe({
  name: "client-debugger",
  summary: "Facilitates to debug client side codes of meteor apps. Targeted for development environment issues tracking."
});

Package.on_use(function(api) {
  api.use(['templating']);
  api.add_files(['templates-debugger.js'], 'client');
});