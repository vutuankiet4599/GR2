<?php

namespace App\Http\Requests\Auth\Sanctum;

use Illuminate\Foundation\Http\FormRequest;

class SanctumRegisterRequest extends FormRequest
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
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:6|max:255',
            'name' => 'required|string|min:6|max:255',
            'avatar' => 'file|image|mimes:jpg,png,jpeg|nullable',
            'phone' => 'string|max:12|min:10|nullable'
        ];
    }
}
