<?php 

namespace App\Http\Controllers;

use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Display the about page.
     */
    public function index()
    {
        return Inertia::render('about/index', [
            'title' => 'About Us',
            'description' => 'Learn more about our organization and mission.',
        ]);
    }
}