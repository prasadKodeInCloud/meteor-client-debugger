Client-Debugger Smart Package
=============================

This package facilitates developers to debug client side codes of meteor apps. In this version this faclilitates to,

	1. log templates getting rendered at client events.
	2. log events getting triggered.
	3. log helpers getting called. 

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
To log the eents getting triggered.

```js
Session.set('debug_template_events', true );

```
To log the template helpers getting called at client side events, type this in browser console.

```js
Session.set('debug_template', 'helpers' );

```
