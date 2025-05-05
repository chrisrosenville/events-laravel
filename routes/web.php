<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

// Home page - accessible by anyone
Route::get('/', [HomeController::class, 'index'])->name('home');

// Route::get('login/{provider', [Socialite::class, 'redirect'])->name('login.social');
// Route::get('login/{provider}/callback', [Socialite::class, 'handleProviderCallback'])->name('login.social.callback');

// Public event routes - accessible by anyone
Route::get('/events', [EventController::class, 'index'])->name('events.index');

// Authenticated event routes - require login
Route::middleware(['auth'])->group(function () {
    // Event management - specific routes before dynamic parameter routes
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    
    // Event attendance
    Route::post('/events/{event}/attend', [EventController::class, 'attend'])->name('events.attend');
    Route::delete('/events/{event}/attend', [EventController::class, 'unattend'])->name('events.unattend');
    
    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// This route needs to come after /events/create to prevent conflicts
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
