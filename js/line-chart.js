var stateData = {};
var latlng = [];
var result = [];
var count = 2;
var sliderPlayTime = null; 
var counterPlay = 1;
var theme_color = {};
theme_color['red'] = ['#D03636', '#BA1F1F', '#A80F0F','#8E0101'];
theme_color['blue'] = ['#58A7CB', '#2F8FBA', '#1075A2','#005E89'];
theme_color['green'] = ['#6BBD5B', '#3D972B', '#267417','#0E4F02'];
theme_color['yellow'] = ['#FFF479', '#FFEE34', '#FFEA00','#FFEA00'];
theme_color['dark'] = ['#676767', '#484848', '#0D0D0D','#000000'];
var _fillColor = theme_color[theme_name][0];
var _strokeColor = theme_color[theme_name][1];
var _pointColor = theme_color[theme_name][2];
var _pointStrokeColor = theme_color[theme_name][3];
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
					data_columns.push(parseInt(value[position]));
				} else {
					data_columns.push(0);
				}
			}
        });
        var arr = sortObject(data_columns);
		var min = arr[0]['value'];
		var max = arr[arr.length - 1]['value'];
		var steps = 3;
        var lineChartData = {
			labels 	 : label,
			datasets : [{
				fillColor : _fillColor,
				strokeColor : _strokeColor,
				pointColor : _pointColor,
				pointStrokeColor : _pointStrokeColor,
				data: data_columns}]
		}
        
    	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData,{scaleOverlay : true});
}
function slidePlay() {
	if(counterPlay < count && sliderPlayTime) {
		plotData(counterPlay);
		jQuery(".noUiSlider").val(counterPlay);
		counterPlay ++;
		sliderPlayTime = setTimeout(function () {slidePlay();} , 2000);
	}
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