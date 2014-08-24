
//Define some dark color for console.log font
var color = [
			'#FF0066', '#A10BF5', '#720BF5', '#0B0BF5', '#0B4DF5', '#0BB3F5', 
			'#0F801D', '#395206', '#493F0C', '#74520B', '#CF5510', '#CF5510',
			'#F84747', '#7A532E', '#32445F', '#682479', '#940862', '#5F2222',
			'#FD4343', '#157E36', '#D67C08', '#728072', '#6046EA', '#727E1A'
			];

getRandomColor = function() {
    // var letters = '0123456789ABCDEF'.split('');
    // var color = '#';
    // for (var i = 0; i < 6; i++ ) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    return color[ Math.floor(Math.random() * (color.length + 1 ))];
} 