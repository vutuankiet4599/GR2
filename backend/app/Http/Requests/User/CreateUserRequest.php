<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => "required|string|min:3|max:50",
            "email" => "required|string|email|max:100|unique:users,email",
            "phone" => "required|string|min:10|max:12",
            "role_id" => "required|integer|exists:roles,id",
        ];
    }
}
