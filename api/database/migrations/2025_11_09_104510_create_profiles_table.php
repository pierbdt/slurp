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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id')->unique();
            $table->enum('gender', ['male', 'female']);
            $table->enum('looking_for', ['male', 'female']);
            $table->date('date_of_birth');
            $table->string('snapchat_username')->nullable();
            $table->text('bio')->nullable();
            $table->boolean('is_complete')->default(false);
            $table->timestamps();

            // Index for faster lookups
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
