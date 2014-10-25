
Template.clientDebuggerPopup.rendered = function(){
	console.log('>>>>>>>>>>>>>> rendered client-debugger');
	$('.client-db-popup').hide();
}

Template.clientDebuggerPopup.events({
	'click .client-db-btn-view': function(){
		$('.client-db-popup').toggle();
	}
});