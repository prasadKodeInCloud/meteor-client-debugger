
Template.clientDebuggerPopup.rendered = function(){
	startedTracking = false;
	$('.client-db-popup').hide();
}

var startedTracking = false;

var getTreeData = function( tplData ){
	var arr = [];
	var obj;

	for( var k in tplData ){
		obj = {
			label:k,
			children:[]
		};
		for( var item in tplData[k] ){
			obj.children.push({ label:item + ' : count = ' + tplData[ k ][ item ].count });
		}

		arr.push( obj );
	}

	return arr;
}

Template.clientDebuggerPopup.events({
	'click .client-db-tracker': function(){
		var text = '';
		if( !startedTracking ){
			text = 'View Result';
			$('.client-db-tmp-tree ul').remove();
			ClientDebugger.start();
		}
		else{
			text = 'Start Tracking';

			var data = getTreeData( ClientDebugger.helpersByTemplate());
			console.log('data: ', data );
			$('.client-db-tmp-tree').tree({
			    data: data
			});
		}

		$('.client-db-tracker').text( text );

		startedTracking = !startedTracking;
		
	},
	'click .client-db-btn-view': function(){
		ClientDebugger.trackTemplates();
		
		$('.client-db-popup').toggle();
	},
	'click .client-db-btn-close': function(){
		$('.client-db-popup').hide();
	}
});