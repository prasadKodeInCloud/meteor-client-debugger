
Template.clientDebuggerPopup.rendered = function(){
	console.log('>>>>>>>>>>>>>> rendered client-debugger');
	$('.client-db-popup').hide();
}

Template.clientDebuggerPopup.events({
	'click .client-db-btn-view': function(){
		var data = [
		    {
		        label: 'node1', id: 1,
		        children: [
		            { label: 'child1', id: 2 },
		            { label: 'child2', id: 3 }
		        ]
		    },
		    {
		        label: 'node2', id: 4,
		        children: [
		            { label: 'child3', id: 5 }
		        ]
		    }
		];

		$('.client-db-tmp-tree').tree({
		    data: data
		});

		$('.client-db-popup').toggle();
	}
});