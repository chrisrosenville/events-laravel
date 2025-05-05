<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('provider')->nullable()->after('email');
            $table->string('provider_id')->nullable()->after('provider');
            $table->string('provider_token')->nullable()->after('provider_id');
            $table->string('provider_refresh_token')->nullable()->after('provider_token');
            $table->timestamp('provider_expires_at')->nullable()->after('provider_refresh_token');
            $table->string('avatar')->nullable()->after('profile_photo_path');
            $table->string('avatar_original')->nullable()->after('avatar');
            $table->string('avatar_url')->nullable()->after('avatar_original');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('provider');
            $table->dropColumn('provider_id');
            $table->dropColumn('provider_token');
            $table->dropColumn('provider_refresh_token');
            $table->dropColumn('provider_expires_at');
            $table->dropColumn('avatar');
            $table->dropColumn('avatar_original');
            $table->dropColumn('avatar_url');
        });
    }
};
