<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Slurp API is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Profile routes (TODO: Add Supabase JWT authentication middleware)
Route::prefix('profiles')->group(function () {
    Route::post('/', [ProfileController::class, 'store']);
    Route::get('/{userId}', [ProfileController::class, 'show']);
    Route::put('/{userId}', [ProfileController::class, 'update']);
});
