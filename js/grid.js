function getCSVData(csv_file, title) {
	jQuery.get(csv_file, function(data) {
        result = jQuery.csv.toArrays(data);
        var header = result[0];
        var data = result.splice(1,result.length);
        jQuery("h1").text(title);
        jQuery("#visualizer").handsontable({
            data: data,
            rowHeaders: true,
            colHeaders: header,
            colWidths: [55, 80, 80, 80, 80, 80, 80],
            manualColumnResize: true,
            minSpareRows: 1,
            persistentState: true
        });
    });
}
jQuery(document).ready(function() {
	jQuery.each( chartobj, function( key, value ) {
		if(value.csv_file) {
			getCSVData(value.csv_file, value.title);
		}
	});
});