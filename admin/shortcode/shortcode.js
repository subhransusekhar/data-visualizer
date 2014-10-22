(function() {
   tinymce.create('tinymce.plugins.datavisualizer', {
      init : function(ed, url) {
         ed.addButton('datavisualizer', {
            title : 'Data Visualizer',
            image : url+'/visualize_image.png',
            onclick : function() {
            	// triggers the thickbox
				var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
				W = W - 80;
				H = H - 84;
				tb_show( 'Data Visualizer', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=datavisualizer-form' );
            }
         });
      },
      createControl : function(n, cm) {
         return null;
      },
      getInfo : function() {
         return {
            longname : "Data Visualizer",
            author : 'Subhransu Sekhar',
            authorurl : 'http://subhransusekhar.com',
            infourl : 'https://github.com/subhransusekhar/data-visualizer',
            version : "1.0"
         };
      }
   });
   tinymce.PluginManager.add('datavisualizer', tinymce.plugins.datavisualizer);
   
// executes this when the DOM is ready
	jQuery(function(){
		// creates a form to be displayed everytime the button is clicked
		var form = jQuery('<div id="datavisualizer-form"><table id="datavisualizer-table" class="form-table">\
			<tr>\
				<th><label for="datavisualizer-type">Type</label></th>\
				<td><select id="datavisualizer-type" name="type"><option>grid</option><option>barchart</option><option>linechart</option><option>line with view finder</option><option>donut</option><option>piechart</option><option>area</option><option>area-spline</option><option>spline</option><option>scatter</option><option>map</option></select><br />\
				<small>specify the visualization type.</small></td>\
			</tr>\
			<tr>\
				<th><label for="datavisualizer-file">File</label></th>\
				<td><div class="uploader"><input type="text" name="file" id="datavisualizer-file" value="" /> <input class="button" name="file_button" id="datavisualizer-file_button" value="Upload" /></div><br />\
				<small>specify the fully qualified URL of the CSV file</small>\
			</tr>\
			<tr>\
				<th><label for="datavisualizer-title">Title</label></th>\
				<td><input type="text" id="datavisualizer-title" name="title" value="" size="80"/><br />\
					<small>Title of the Visualization</small>\
				</td>\
			</tr>\
			<tr>\
				<th><label for="datavisualizer-theme">Theme</label></th>\
				<td><select id="datavisualizer-theme" name="theme"><option>blue</option><option>red</option><option>green</option><option>yellow</option><option>dark</option></select><br />\
				<small>specify the color theme.</small></td>\
			</tr>\
			<tr>\
				<th><label for="datavisualizer-width">Width</label></th>\
				<td><input type="text" id="datavisualizer-width" name="width" value="990" size="80"/><br />\
				<small>specify the width.</small></td>\
			</tr>\
			<tr>\
				<th><label for="datavisualizer-height">Height</label></th>\
				<td><input type="text" id="datavisualizer-height" name="height" value="600" size="80"/><br />\
				<small>specify the height.</small></td>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="datavisualizer-submit" class="button-primary" value="Insert Visualization" name="submit" />\
		</p>\
		</div>');
		
		var table = form.find('table');
		form.appendTo('body').hide();
		
		jQuery('.uploader .button').click(function(e) {
			var send_attachment_bkp = wp.media.editor.send.attachment;
	        var button = jQuery(this);

	        wp.media.editor.send.attachment = function(props, attachment) {

	            jQuery(button).prev().val(attachment.url);

	            wp.media.editor.send.attachment = send_attachment_bkp;
	            tb_show( 'Data Visualizer', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=datavisualizer-form' );
	        }

	        wp.media.editor.open(button);

	        return false;   
		});
	
		 jQuery('.add_media').on('click', function(){
			 _custom_media = false;
		 });
		// handles the click event of the submit button
		form.find('#datavisualizer-submit').click(function(){
			// defines the options and their default values
			// again, this is not the most elegant way to do this
			// but well, this gets the job done nonetheless
			var options = { 
				'type'    : '',
				'file'         : '',
				'title'       : '',
				'theme'       : '',
				'width'       : '',
				'height'       : '',
				};
			var shortcode = '[visualize';
			
			for( var index in options) {
				var value = table.find('#datavisualizer-' + index).val();
				
				// attaches the attribute to the shortcode only if it's different from the default value
				if ( value !== options[index] )
					shortcode += ' ' + index + '="' + value + '"';
			}
			
			shortcode += ']';
			
			// inserts the shortcode into the active editor
			tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
			
			// closes Thickbox
			tb_remove();
		});
	});
	
})();