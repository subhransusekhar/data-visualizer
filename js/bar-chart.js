var stateData = {};
var latlng = [];
var result = [];
var count = 2;
var legend = {};
var sliderPlayTime = null; 
var counterPlay = 1;
var theme_color = {};
theme_color['red'] = ['#A80F0F','#8E0101'];
theme_color['blue'] = ['#1075A2','#005E89'];
theme_color['green'] = ['#267417','#0E4F02'];
theme_color['yellow'] = ['#FFEA00','#FFEA00'];
theme_color['dark'] = ['#0D0D0D','#000000'];
var _fillColor = theme_color[theme_name][0];
var _strokeColor = theme_color[theme_name][1];
function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    return arr; // returns array
}
function getCSVData() {
	jQuery.get(csv_file, function(data) {
        result = jQuery.csv.toArrays(data);
        plotData(1);
        count = result[0].length;
        jQuery(".noUiSlider").noUiSlider({
            range: [1, count-1]
           ,start: 1
           ,handles: 1
           ,step: 1
           ,connect: "lower"
           ,orientation: "vertical"
    	   ,slide: function(){
    		var value = jQuery(this).val();
    		plotData(parseInt(value));
    		}
        }); 
    });
}
function plotData(position) {
	var data_columns = [];
	var label = [];
	if(!position) position = 1;
	jQuery('#visualizer').html('');
		var column = '';
        jQuery.each( result, function( key, value ) {
			if(key == 0) {
				column = value[position];
				jQuery("h1").text(title + " (" + column + ")");
			} else {
				label.push(value[0]);
				if(!isNaN(value[position])) {
					legend[value[0]] = parseInt(value[position]);
					data_columns.push(parseInt(value[position]));
				} else {
					legend[value[0]] = parseInt(0);
					data_columns.push(0);
				}
			}
        });
		var arr = sortObject(data_columns);
		var min = arr[0]['value'];
		var max = arr[arr.length - 1]['value'];
		var ctx = document.getElementById("canvas").getContext("2d");
		
        var barChartData = {
			labels 	 : label,
			datasets : [{
				fillColor : _fillColor,
				strokeColor : _strokeColor,
				data: data_columns}]
		}
		var steps = 3;
    	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Bar(barChartData, {
			scaleOverride: true,
			scaleSteps: steps,
			scaleStepWidth: Math.ceil(max / steps),
			scaleStartValue: 0
		});
}
function slidePlay() {
	if(counterPlay < count && sliderPlayTime) {
		plotData(counterPlay);
		jQuery(".noUiSlider").val(counterPlay);
		counterPlay ++;
		sliderPlayTime = setTimeout(function () {slidePlay();} , 2000);
	}
}
function drawSeries() {
	jQuery(".scale-container").hide();
	jQuery(".chart-legend").text('');
	jQuery.each( legend, function( key, value ) {
		jQuery(".chart-legend").append("<div>" + key + " : " + value + "</div>");
	});
}
jQuery(document).ready(function() {
	jQuery('.scale-container').hide();
	if(csv_file) {
		getCSVData();
		jQuery('span.play a').click(function(){
			sliderPlayTime = setTimeout(function () {slidePlay();} , 2000);
			return false;
		});
		
		jQuery('span.pause a').click(function(){
			clearTimeout(sliderPlayTime);
			return false;
		});
		
		jQuery('span.reset a').click(function(){
			counterPlay = 1;
			plotData(1);
			jQuery(".noUiSlider").val(1);
			clearTimeout(sliderPlayTime);
			return false;
		});
	}
});