<?php
/**
 * Plugin Name: Data Visualizer
 * Plugin URI: https://github.com/subhransusekhar/data-visualizer
 * Description: A plugin for Data Visualization
 * Version: 1.1
 * Author: Subhransu Sekhar
 * Author URI: http://subhransusekhar.com
 */
/**
 * enqueue scripts and styles
 */
function datavisualizer_load_scripts() {
	wp_enqueue_script( 'visualizer-d3chart', plugins_url("plugins/d3js/d3.v3.min.js", __FILE__ ), array( 'jquery' ));
}
add_action( 'wp_enqueue_scripts', 'datavisualizer_load_scripts' );

function datavisualizer_shortcode($attr) {
	$chart_id = "chart" . rand(0,10000);
	$type = $attr['type'];
	if(!empty($attr['chart_lib'])) {
		$chart_lib = $attr['chart_lib'];
	}
	else {
		$chart_lib = 'c3js';
	}
	if(!empty($attr['width'])) {
	  $width = $attr['width'];
	}
	else {
	  $width = '1000';
	}
	if(!empty($attr['height'])) {
	  $height = $attr['height'];
	}
	else {
	  $height = '600';
	}
	switch($type) {
		case 'grid':
			wp_enqueue_script( 'visualizer-jquerycsv', plugins_url("js/jquery.csv.js", __FILE__ ),array( 'jquery' ));
			wp_enqueue_style( 'visualizer-gridcss', plugins_url("plugins/handsontable/jquery.handsontable.full.css", __FILE__ ));
			wp_enqueue_script( 'visualizer-grid', plugins_url("plugins/handsontable/jquery.handsontable.full.js", __FILE__ ), array( 'jquery' ));
			wp_enqueue_script( 'visualizer-gridscript', plugins_url("js/grid.js", __FILE__ ), array( 'jquery' ));
			$chat_ele = '<div id="visualizer" style="width: 100%; height: ' . $height . 'px; margin: 0 auto;"></div>';
			break;
		case 'map':
				wp_enqueue_style( 'visualizer-styles1', plugins_url( 'plugins/jvectormap/lib/jquery-jvectormap.css', __FILE__ ) );
				wp_enqueue_script( 'visualizer-script1', plugins_url("plugins/jvectormap/lib/jquery-jvectormap.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script2', plugins_url("plugins/jvectormap/lib/jquery-mousewheel.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script3', plugins_url("plugins/jvectormap/lib/jvectormap.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script4', plugins_url("plugins/jvectormap/lib/abstract-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script5', plugins_url("plugins/jvectormap/lib/abstract-canvas-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script6', plugins_url("plugins/jvectormap/lib/abstract-shape-element.js", __FILE__ ));
				
				wp_enqueue_script( 'visualizer-script7', plugins_url("plugins/jvectormap/lib/svg-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script8', plugins_url("plugins/jvectormap/lib/svg-group-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script9', plugins_url("plugins/jvectormap/lib/svg-canvas-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script10', plugins_url("plugins/jvectormap/lib/svg-shape-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script11', plugins_url("plugins/jvectormap/lib/svg-path-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script12', plugins_url("plugins/jvectormap/lib/svg-circle-element.js", __FILE__ ));
				
				wp_enqueue_script( 'visualizer-script13', plugins_url("plugins/jvectormap/lib/vml-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script14', plugins_url("plugins/jvectormap/lib/vml-group-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script15', plugins_url("plugins/jvectormap/lib/vml-canvas-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script16', plugins_url("plugins/jvectormap/lib/vml-shape-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script17', plugins_url("plugins/jvectormap/lib/vml-path-element.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script18', plugins_url("plugins/jvectormap/lib/vml-circle-element.js", __FILE__ ));
				
				wp_enqueue_script( 'visualizer-script19', plugins_url("plugins/jvectormap/lib/vector-canvas.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script20', plugins_url("plugins/jvectormap/lib/simple-scale.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script21', plugins_url("plugins/jvectormap/lib/numeric-scale.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script22', plugins_url("plugins/jvectormap/lib/ordinal-scale.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script23', plugins_url("plugins/jvectormap/lib/color-scale.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script24', plugins_url("plugins/jvectormap/lib/data-series.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script25', plugins_url("plugins/jvectormap/lib/proj.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script26', plugins_url("plugins/jvectormap/lib/world-map.js", __FILE__ ));
				
				wp_enqueue_script( 'visualizer-script27', plugins_url("plugins/jvectormap/assets/jquery-jvectormap-in-dl-ass-en.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script28', plugins_url("plugins/jvectormap/assets/jquery-jvectormap-in-mill-en.js", __FILE__ ));
				wp_enqueue_script( 'visualizer-script29', plugins_url("plugins/jvectormap/assets/jquery-jvectormap-world-mill-en.js", __FILE__ ));
				wp_enqueue_style( 'visualizer-sliderstyles', plugins_url( 'plugins/noUiSlider/jquery.nouislider.min.css', __FILE__ ) );
				wp_enqueue_style( 'visualizer-style', plugins_url( 'css/visualizer-style.css', __FILE__ ) );
				wp_enqueue_script( 'visualizer-slider', plugins_url("plugins/noUiSlider/jquery.nouislider.min.js", __FILE__ ), array( 'jquery' ));
				wp_enqueue_script( 'visualizer-map', plugins_url("js/map.js", __FILE__ ));
				$chat_ele = '<div id="visualizer" style="width: 100%; height: ' . $height . 'px; margin: 0 auto;"></div>';
			break;
	default:
		wp_enqueue_script( 'visualizer-chart', plugins_url("plugins/c3js/c3.min.js", __FILE__ ), array( 'jquery' ));
		wp_enqueue_style( 'visualizer-chartcss', plugins_url("plugins/c3js/c3.css", __FILE__ ));
		wp_enqueue_script( 'visualizer-chartdisplay', plugins_url("js/chart.js", __FILE__ ));
		$chat_ele = '<div id="' . $chart_id . '" height="' . $height . '" width="' . $width . '"></div>';
		break;
	}
	if(!empty($attr['file'])) {
		$file = $attr['file'];
		if(!empty($attr['theme'])) {
			$theme = $attr['theme'];
		}
		else {
			$theme = 'blue';
		}
		if(!empty($attr['mask_name'])) {
			$mask_name = 0;
		}
		else {
			$mask_name = 1;
		}
		if(!empty($attr['title'])) {
			$title = $attr['title'];
		}
		else {
			$title = '';
		}
		if(!empty($attr['map'])) {
			$map_name = $attr['map'];
		}
		else {
			$map_name = 'india_mill_en';
		}
		$chart_type = str_replace('chart', '', $type);
		$output = "<script>
					if(typeof chartobj == 'undefined' || !chartobj.length) {
						var chartobj = [];
					}
					chartobj.push({csv_file:'$file', mask_name:'$mask_name', theme_name:'$theme', title:'$title', chart_title:'$title', chart_type:'$chart_type', map_name:'$map_name', width:$width, chart_id:'$chart_id', height:$height});
					
					</script>";
		if($type == 'map') {
			$output .= '<h1></h1>
					<div id="mapdata-slider" class="noUiSlider"></div>
					' . $chat_ele . '
					<div id="grid"></div>
					<div class="control">
					  <div class="control-buttons">
						  <span class="play black"><a href="#">Play</a></span>
					    <span class="pause black"><a href="#">Pause</a></span>
					    <span class="reset black"><a href="#">Reset</a></span>
					  </div>
					  <div class="scale-container">
						  <div class="min">Min</div>
						  <div class="scale"></div>
						  <div class="max">Max</div>
					  </div>
					</div>';
		}
		else {
			$output .= '<h1></h1>' . $chat_ele;
		}
	}
	else {
		$output = '';
	}
	return $output;	 
}
add_shortcode('visualize', 'datavisualizer_shortcode');
add_filter('widget_text', 'do_shortcode');

function register_button( $buttons ) {
  array_push( $buttons, "|", "datavisualizer" );
  return $buttons;
}
function add_plugin( $plugin_array ) {
  $plugin_array['datavisualizer'] = plugins_url('data-visualizer/admin/shortcode/shortcode.js');
  return $plugin_array;
}

function datavisualizer_button() {

  if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
    return;
  }

  if ( get_user_option('rich_editing') == 'true' ) {
    add_filter( 'mce_external_plugins', 'add_plugin' );
    add_filter( 'mce_buttons', 'register_button' );
  }
}
add_action('init', 'datavisualizer_button');