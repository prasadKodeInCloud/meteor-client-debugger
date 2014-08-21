Client-Debugger Smart Package
=============================

This package facilitates developers to debug client side codes of meteor apps. In this version this faclilitates to log all the templates getting rendered at client events and log helpers getting triggered. 

Installation
------------

```
mrt add client-debugger
```

Debug templates
---------------

To log the templates getting rendered at client side events, type this in browser console.

```js
Session.set('debug_template', 'render' );

```

To log the template helpers getting called at client side events, type this in browser console.

```js
Session.set('debug_template', 'helpers' );

```
