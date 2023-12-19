<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UtilController;
use Illuminate\Http\Request;
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

 /**
  * API for login, logout, register
  */
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum'])->name('logout');
Route::get('/user', [AuthController::class, 'user'])->middleware(['auth:sanctum'])->name('user');

/**
 * API for every one
 */
Route::get('/categories', [CategoryController::class, 'all']);
Route::get('/home', [ProductController::class, 'home']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/{id}', [ProductController::class, 'find']);
Route::get('/reviews/products/{id}', [ReviewController::class, 'product']);

/**
 * API for super admin
 */
Route::middleware(['auth:sanctum', 'role.super_admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'insert']);
    Route::put('/users/status/{id}', [UserController::class, 'updateStatus']);
    Route::put('/users/{id}', [UserController::class, 'update']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'insert']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'delete']);

    Route::get('/roles', [RoleController::class, 'index']);
});

/**
 * API for owner
 */
Route::middleware(['auth:sanctum', 'role.owner'])->prefix('owner')->group(function () {
    Route::get('/products/user', [ProductController::class, 'userProducts']);
    Route::get('/products/user/{id}', [ProductController::class, 'userProduct']);
    Route::post('/products', [ProductController::class, 'insert']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'delete']);

    Route::post('/utils/images', [UtilController::class, 'insertFile']);

    Route::get('/orders', [OrderController::class, 'currentOwnerOrders']);
    Route::get('/orders/{id}', [OrderController::class, 'find']);
    Route::put('/orders/status/{id}', [OrderController::class, 'updateStatus']);
}); 

/**
 * API for logged user
 */
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/images', [UtilController::class, 'insertImage']);

    Route::get('/orders', [OrderController::class, 'currentUserOrders']);
    Route::get('/orders/{id}', [OrderController::class, 'find']);
    Route::post('/orders', [OrderController::class, 'insert']);
    Route::put('/orders/status/{id}', [OrderController::class, 'updateStatus']);
    Route::delete('/orders/{id}', [OrderController::class, 'delete']);

    Route::post('/chat', [MessageController::class, 'chat']);
    Route::get('/chat/users/{id}', [MessageController::class, 'getAllUsersToChat']);
    Route::get('/chat/users', [MessageController::class, 'getAllUsersChatted']);
    Route::get('/chat/owners', [MessageController::class, 'getAllOwner']);
    Route::get('/chat/{firstUser}/{secondUser}', [MessageController::class, 'getAllMessagesOfTwoUsers']);

    Route::post('/reviews', [ReviewController::class, 'insert']);
});


/**
 * API for testing
 */
Route::get('/test', [TestController::class, 'index'])->middleware(['auth:sanctum']);
