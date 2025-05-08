<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * NOTE: This migration has been disabled because it tries to create a foreign key
     * to the events table before that table is created. See the newer migration:
     * 2025_05_08_124626_create_event_user_table_fixed.php
     */
    public function up(): void
    {
        // Migration disabled - using 2025_05_08_124626_create_event_user_table_fixed.php instead
        // Schema::create('event_user', function (Blueprint $table) {
        //     $table->id();
        //     $table->foreignId('event_id')->constrained()->onDelete('cascade');
        //     $table->foreignId('user_id')->constrained()->onDelete('cascade');
        //     $table->timestamps();
        //     
        //     $table->unique(['event_id', 'user_id']);
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Migration disabled
        // Schema::dropIfExists('event_user');
    }
};
