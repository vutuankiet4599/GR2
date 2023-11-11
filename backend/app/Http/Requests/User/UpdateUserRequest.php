<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
        $id = $this->route('id');

        return [
            "name" => "string|min:3|max:50",
            "email" => ["string", "email", "max:100", Rule::unique('users', 'email')->ignore($id)],
            "phone" => "string|min:10|max:12",
            "role_id" => "integer|exists:roles,id",
        ];
    }
}
