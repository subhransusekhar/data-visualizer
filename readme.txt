
=== Data Visualizer ===
Contributors: Subhransu Sekhar, Binaya Kumar
Tags: visualization, maps, chart, data visualization
Requires at least: 3.0
Tested up to: 3.6
Stable tag: 2.5.9
License: GPLv2 or later

Data Visualizer helps to plot data in Maps and Charts

== Description ==

Want to visualize data in seconds, Please use this plugin. You can visualize data through a simple shortcode e.x [visualize type='map' file='http://localhost/wp-content/uploads/2013/09/datafile1.csv' theme='blue' title='My chart Title'].

Other Supported Types are 
1. barchart
2. piechart
3. linechart
4. radarchart
5. doughnutchart
6. polarareachart

=== How can I visualize my data? ===

To visualize your data you need to have the dataset ready in csv format. Upload the csv file using Media option of your wordpress site or blog. You need to use shortcode [visualize] in your post or page which makes your chart ready at the page view.
What are the attributes of the shortcode?

The short code takes the following arguments to generate the visualization

    type => Allowed values: map, barchart, linechart, piechart, radarchart, doughnutchart, polarareachart | required
    file => Allowed values: Fully Qualified URL of the csv file which need to be visualized | required
    theme => Allowed values: blue, red, yellow, dark, green | default value is "blue" used for the color scheme | Optional
    title => Allowed Values: Title of the Visualization you need to show | Optional

Example use of Shortcode: [visualize type='barchart' file='put the url of the csv file here' theme='blue' title='My chart Title']
What will be the stracture of the csv file?

=== The csv file need to follow the following guidelines ===

    First Row of the csv should contain the Label of each column
    First Column should contain the data for x-axis in case of Charts and State/Country name for Map

=== Which external libraries are used? ===

This plugin uses the following external libraries

    jvectormap https://github.com/bjornd/jvectormap
    chartjs https://github.com/nnnick/Chart.js

=== Where can I see the Live Demo of the plugin? ===

You can see the plugin working at http://subhransusekhar.com

=== What are the contact details for support? ===

You can mail me at subhransu[at]pietaslabs[dot]com or subhransu.sm[at]gmail[dot]com. 