var stateData = {};
var latlng = [];
var result = [];
var colors = {};
var count = 2;
var sliderPlayTime = null; 
var counterPlay = 1;
var theme_color = {};
theme_color['red'] = ['#F78B8B', '#EB6D6D','#DF4B4B','#D03636', '#BA1F1F', '#A80F0F','#8E0101'];
theme_color['blue'] = ['#D2EFFC', '#ACDDF3','#79C0E0','#58A7CB', '#2F8FBA', '#1075A2','#005E89'];
theme_color['green'] = ['#D8FBD1', '#B5EDAA','#90D682','#6BBD5B', '#3D972B', '#267417','#0E4F02'];
theme_color['yellow'] = ['#FEFDF2', '#FFFCD6','#FFF9B1','#FFF479', '#FFEE34', '#FFEA00','#FFEA00'];
theme_color['dark'] = ['#DADADA', '#B6B6B6','#949494','#676767', '#484848', '#0D0D0D','#000000'];
var theme = theme_color[theme_name];
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
	jQuery('#' + chart_div).html('');
		var column = '';
        jQuery.each( result, function( key, value ) {
			if(key == 0) {
				column = value[position];
				jQuery("h1").text(title + " (" + column + ")");
			} else {
				label.push(value[0]);
				if(!isNaN(value[position])) {
					var color_code = get_random_color();
					colors[value[0]] = color_code;
					data_columns.push({value: parseInt(value[position]), color: color_code});
				} else {
					data_columns.push({value: 0});
				}
			}
        });
        var pieData = data_columns;
        var myPie = new Chart(document.getElementById(chart_div).getContext("2d")).Pie(pieData,{scaleShowLabels : true, pointLabelFontSize : 10});
        drawSeries();
}
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
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
	jQuery.each( colors, function( key, value ) {
		jQuery(".chart-legend").append("<div><span class='scale-band' style='background: " + value + "'></span>" + key + "</div>");
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