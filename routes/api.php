<?php

use Illuminate\Support\Facades\Route;

Route::get('/events', [\App\Controllers\Events\EventController::class, 'index']);