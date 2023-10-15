<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * When call api, laravel need header Accept: application/json
 */

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum'])->name('logout');
Route::get('/user', [AuthController::class, 'user'])->middleware(['auth:sanctum'])->name('user');

Route::get('/test', [TestController::class, 'index'])->middleware(['auth:sanctum']);
