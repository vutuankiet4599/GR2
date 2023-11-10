<?php

namespace App\Http\Middleware;

use App\Models\Product;
use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;

class CheckUserIsOwnerOfProduct
{
    use ResponseTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user == null) {
            return $this->failure([], 'You need login to access this page', 401);
        }

        $product = Product::find($request->route('id'));

        if ($product == null) {
            return $this->failure([], 'Product is not exist', 404);
        }

        if ($user->id != $product->user->id) {
            return $this->failure([], 'You are not the owner of this product', 403);
        }

        return $next($request);
    }
}
