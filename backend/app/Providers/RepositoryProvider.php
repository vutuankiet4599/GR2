<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            \App\Repositories\Model\Product\ProductRepositoryInterface::class,
            \App\Repositories\Model\Product\ProductRepository::class
        );

        $this->app->singleton(
            \App\Repositories\Model\User\UserRepositoryInterface::class,
            \App\Repositories\Model\User\UserRepository::class
        );

        $this->app->singleton(
            \App\Repositories\Auth\Sanctum\SanctumAuthRepositoryInterface::class,
            \App\Repositories\Auth\Sanctum\SanctumAuthRepository::class
        );

        $this->app->singleton(
            \App\Repositories\Model\Category\CategoryRepositoryInterface::class,
            \App\Repositories\Model\Category\CategoryRepository::class
        );
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
