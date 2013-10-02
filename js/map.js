var stateCode = {
		"Andaman and Nicobar" : "IN-AN",
		"Bihar" : "IN-BR",
		"Mizoram" : "IN-MZ",
		"Daman and Diu" : "IN-DD",
		"Dadra and Nagar Haveli" : "IN-DN",
		"Delhi" : "IN-DL",
		"Nagaland" : "IN-NL",
		"West Bengal" : "IN-WB",
		"Haryana" : "IN-HR",
		"Himachal Pradesh" : "IN-HP",
		"Assam" : "IN-AS",
		"Uttarakhand" : "IN-UK",
		"Jharkhand" : "IN-JH",
		"Jammu and Kashmir" : "IN-JK",
		"Madhya Pradesh" : "IN-MP",
		"Uttar Pradesh" : "IN-UP",
		"Sikkim" : "IN-SK",
		"Chhattisgarh" : "IN-CG",
		"Chandigarh" : "IN-CH",
		"Goa" : "IN-GA",
		"Gujarat" : "IN-GJ",
		"Rajasthan" : "IN-RJ",
		"Maharashtra" : "IN-MH",
		"Tamil Nadu" : "IN-TN",
		"Puducherry" : "IN-PY",
		"Andhra Pradesh" : "IN-AP",
		"Tripura" : "IN-TR",
		"Arunachal Pradesh" : "IN-AR",
		"Karnataka" : "IN-KA",
		"Punjab" : "IN-PB",
		"Meghalaya" : "IN-ML",
		"Manipur" : "IN-MN",
		"Odisha" : "IN-OD",
		"Orissa" : "IN-OD",
		"Kerala" : "IN-KL"		
};
var theme_color = {};
theme_color['red'] = ['#F78B8B', '#EB6D6D','#DF4B4B','#D03636', '#BA1F1F', '#A80F0F','#8E0101'];
theme_color['blue'] = ['#D2EFFC', '#ACDDF3','#79C0E0','#58A7CB', '#2F8FBA', '#1075A2','#005E89'];
theme_color['green'] = ['#D8FBD1', '#B5EDAA','#90D682','#6BBD5B', '#3D972B', '#267417','#0E4F02'];
theme_color['yellow'] = ['#FEFDF2', '#FFFCD6','#FFF9B1','#FFF479', '#FFEE34', '#FFEA00','#FFEA00'];
theme_color['dark'] = ['#DADADA', '#B6B6B6','#949494','#676767', '#484848', '#0D0D0D','#000000'];
var stateData = {};
var latlng = [];
var result = [];
var count = 2;
var theme = theme_color[theme_name];
function setFocus(code) {
	 jQuery('#visualizer').vectorMap('set', 'focus', code);
}
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
function plotData(position) {
	var state_code = null;
	if(!position) position = 1;
	jQuery('#visualizer').html('');
		var label ='';
		var column = '';
        jQuery.each( result, function( key, value ) {
			if(key == 0) {
				label = value[position];
				column = value[position];
				jQuery("span.sliderdata").text(column);
				jQuery("h1").text(title + " (" + column + ")");
			}
			else{
				if(mask_name == 0) {
					state_code = value[0];
				}
				else {
					state_code = stateCode[value[0]];
				}
				if(!isNaN(value[position])) {
					stateData[state_code] = parseInt(value[position]);
				}
			}
        });
        var arr = sortObject(stateData);
		var min = arr[0]['value'];
		var max = arr[arr.length - 1]['value'];
		jQuery(".min").text(min);
		jQuery(".max").text(max);
        jQuery('#visualizer').vectorMap({
			map : map_name,
			normalizeFunction: 'polynomial',
			backgroundColor: '#FFF',
			regionStyle: {
			      initial: {
			      fill: 'grey',
			      "fill-opacity": 1,
			      stroke: 'none',
			      "stroke-width": 0,
			      "stroke-opacity": 1
			      }
				}, 
	        series: {
	            regions: [{
	              values: stateData,
	              scale: theme,
	              normalizeFunction: 'polynomial'
	            }]
	          },
            onRegionLabelShow: function(e, el, code){
              el.html(el.html()+'(' + label + ':' + stateData[code]+')');
            },
            onRegionClick: function(e, code){
                setFocus(code);
            },
		});
}

function getLatlngData() {
	jQuery.get(latlng_file, function(data) {
		latlng = jQuery.csv.toArrays(data);
    });
}

function getCSVData() {
	jQuery.get(csv_file, function(data) {
        result = jQuery.csv.toArrays(data);
        plotData(1);
        drawSeries(theme);
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
var sliderPlayTime = null; 
var counterPlay = 1;

function drawSeries(theme) {
	jQuery.each( theme, function( key, value ) {
		jQuery(".scale").append("<span class='scale-band' style='background: " + value + "'></span>");
	});
}
jQuery(document).ready(function() {
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

function slidePlay() {
	if(counterPlay < count && sliderPlayTime) {
		plotData(counterPlay);
		jQuery(".noUiSlider").val(counterPlay);
		counterPlay ++;
		sliderPlayTime = setTimeout(function () {slidePlay();} , 2000);
	}
}
