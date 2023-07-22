<?php
/*
Plugin Name: Quick Guide My Plugin
Plugin URI: https://helloworld.com
Description: My description
Version: 0.0.0
Author: me
Author URI: https://none.com
*/

add_action('wp_enqueue_scripts', 'my_enqueue_scripts');
function my_enqueue_scripts() {
    ?>
    <script src="https://d3js.org/d3.v4.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/webcam-easy/dist/webcam-easy.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <?php
    wp_enqueue_script(
        'name does not matter',
        plugin_dir_url(__FILE__).'quick-guide.js');
    wp_enqueue_script(
        'name matters for identification',
        plugin_dir_url(__FILE__).'plotter.js');
    wp_enqueue_style(
        'name matters for identification',
        plugin_dir_url(__FILE__).'plotter.css');
    
    wp_enqueue_script(
        'paris try',
        plugin_dir_url(__FILE__).'camera.js');
}