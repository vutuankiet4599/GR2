<?php

namespace App\Repositories;

interface AuthRepositoryInterface
{
    public function login($email, $password);

    public function register($data);

    public function logout($user);

    public function user($user);
}
