Client-Debugger Smart Package
=============================

This package is tested on meteor 0.8.1.3 version. This facilitates developers to debug client side codes of meteor apps for identified useful senarios. Other wise developers have to put break points in developer console or add console.logs manualy inside code to detect function executions. This version of package faclilitates to,

	1. log templates getting rendered at client events.
	2. log template events getting triggered. 

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
example result : 

	called debug render
    	* extend rendered for : hello template
    	* extend rendered for : subTmp1 template
    	* extend rendered for : personalInfo template 

example log displays at template render: 

	* Rendered Template : personalInfo  

####Template Events

To log the template events getting triggered, type this in browser console.

```js
Session.set('debug_template_events', true );

```
example log displays at an event trigger:

	* Triggered "click .test-btn" event of "hello" template 
