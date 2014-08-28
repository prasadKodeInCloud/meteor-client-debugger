Client-Debugger Smart Package
=============================

This package is tested onwards meteor 0.8.1.3 version. This facilitates developers to debug client side codes of meteor apps for identified useful senarios. Other wise developers have to put break points in developer console or add console.logs manualy inside code to detect function executions :tired_face:. This version of package faclilitates to,

	1. Log templates getting rendered at client events.
	2. Log template helpers getting called.
	3. Log template events getting triggered. 

Logs will be displayed in different color :green_heart:

Installation
------------

```
mrt add client-debugger
```

Debug templates
---------------

####Template Render

To log the templates getting rendered at client side events, type this in browser console.

```js
Session.set('debug_template', 'render' );
```

example log : 

	* Rendered Template : personalInfo  

####Template Helpers

To log template helpers getting called, type this in browser console.

```js
Session.set('debug_template', 'helpers' );
```

example log : 

	* Called helper "name" of "personalInfo" template


####Template Events

To log the template events getting triggered, type this in browser console.

```js
Session.set('debug_template', 'events' );
```

example log :

	* Triggered "click .test-btn" event of "hello" template 

####Debug All

To log using all the debugging options,

```js
Session.set('debug_template', '*' );
```

Remove Debug Mode
-----------------

To get rid of debug mode just refresh the browser.
