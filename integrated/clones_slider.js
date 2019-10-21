var randomColour = (function(){
	var golden_ratio_conjugate = 0.618033988749895;
	var h = Math.random();
	var hslToRgb = function (h, s, l){
		var r, g, b
	
		if(s == 0){
			r = g = b = l; // achromatic
			}
		else{
			function hue2rgb(p, q, t){
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}
		return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
	};
	return function(){
		h += golden_ratio_conjugate;
		h %= 1;
		return hslToRgb(h, 0.5, 0.60);
		};
	})();

function call_CloneSlider(max_Clones) {
	// Creates the Slider with the Max value of the clones 
	//
	var delta = parseInt(Math.min(max_Clones/10,20));
	console.log("new INITAIL range is " + delta);
	var slider = createD3RangeSlider(0, max_Clones, "#area1", true, delta);

	slider.onChange(function(newRange){
		sel_ids=[];
		var rnd_cols=[];
		d3.select("#range-label").html(newRange.begin + " &mdash; " + newRange.end);
		console.log(newRange.begin);

		// Display the clones to be shown at the top
		d3.select('.status')
			.text('Showing clones from ' + newRange.begin + ' - ' + newRange.end); 
		// Call the function to paint the clones
		for(var ii =newRange.begin ; ii<newRange.end; ii++){
			var rc = randomColour();
			console.log("Clone " + ii);
			// Get the IDs of ALL the cells of a given clone
			var clone_cells = root.children[ii].descendants();
		//	sel_ids=[];
			clone_cells.forEach(function(d) {
			//	console.log("     Cells " + d.data.did);
				// PAINT ALL CELLS
				sel_ids.push(d.data.did);
				rnd_cols.push(rc);
				});
			};
		var pts = getPoints(sel_ids);
		setRndColours(pts, rnd_cols);
		console.log("new range is " + delta);
		});
	slider.range(0,delta);
	}
