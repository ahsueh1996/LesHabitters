<?php
/*
Plugin Name: Hamitudes
Plugin URI: https://helloworld.com
Description: My description
Version: 0.0.0
Author: me
Author URI: https://none.com
*/

// this filter adds ability to import modules in js
add_filter( 'script_loader_tag', 'add_type_attribute', 10, 3 );
function add_type_attribute( $tag, $handle, $src ) {
    $type = wp_scripts()->get_data( $handle, 'type' );

    if ( $type && is_string( $type ) ) {
        $tag = str_replace( ' src=', 'type="' . esc_attr( $type ) . '" src=', $tag );
    }

    return $tag;
}

add_action('wp_enqueue_scripts', 'my_enqueue_scripts', 10, 1);
function my_enqueue_scripts() {
    ?>
    <script src="https://d3js.org/d3.v4.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/webcam-easy/dist/webcam-easy.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <?php

    $inline_script = '
    console.log(\'this is an inline script added to demo.js\');
    ';
    wp_enqueue_script(
        'main',
        plugin_dir_url(__FILE__).'hamitudes/main.js', array(), false, true );
    //wp_scripts()->add_data( 'main', 'type', 'text/javascript' ); // this is not working
    wp_add_inline_script( 'main', $inline_script );
    wp_enqueue_script(
        'paris try, name matters for identification',
        plugin_dir_url(__FILE__).'camera.js');
}