<?php
// Disable the file editor
define('DISALLOW_FILE_EDIT', true);

// Disable XMLRPC
add_filter('xmlrpc_enabled', '__return_false');

define('PUBLIC_FOLDER', get_template_directory_uri() . '/public');

if (!function_exists('theme_setup')) {
    function theme_setup()
    {
        add_theme_support('automatic-feed-links');
        add_theme_support('post-thumbnails');
        add_theme_support('html5', [
            'search-form',
            'gallery',
            'caption',
        ]);

        register_nav_menus();
    }
}
add_action('after_setup_theme', 'theme_setup');

function theme_scripts()
{
    $template_uri = PUBLIC_FOLDER;

    wp_enqueue_script('jquery');
    wp_register_script('scripts', $template_uri . '/js/scripts.js', ['jquery'], '', true);
    wp_enqueue_script('scripts');
    wp_register_style('theme-style', get_stylesheet_uri());
    wp_enqueue_style('theme-style');
}

add_action('wp_enqueue_scripts', 'theme_scripts');

function async_script_load($tag, $handle)
{
    if (is_admin()) return $tag;

    $excluded_scripts = [];

    if (!is_admin()) {
        if (in_array($handle, $excluded_scripts)) {
            return $tag;
        } else {
            return str_replace(' src', ' defer src', $tag);
        }
    }
}

add_filter('script_loader_tag', 'async_script_load', 10, 2);

function include_additional_files()
{
    $template_url = get_template_directory();

    require_once $template_url . '/includes/acf-options.php';
    require_once $template_url . '/includes/contact-form.php';
    require_once $template_url . '/includes/wordpress.php';
    require_once $template_url . '/includes/yoast-seo.php';
    require_once $template_url . '/includes/tinymce/editor-customisation.php';
}

add_action('init', 'include_additional_files', 1);
