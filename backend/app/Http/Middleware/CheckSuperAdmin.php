<?php

namespace App\Http\Middleware;

use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;

class CheckSuperAdmin
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

        if ($user->role->name != "SUPER_ADMIN") {
            return $this->failure([], 'You are not super admin', 403);
        }
        
        return $next($request);
    }
}
