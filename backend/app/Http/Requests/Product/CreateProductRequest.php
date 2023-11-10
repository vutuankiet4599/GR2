<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
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
            'name' => 'required|string|min:1|max:255',
            'address' => 'required|string|min:1|max:255',
            'quantity' => 'required|integer|min:1|max:9999',
            'description' => 'required|string|min:1',
            'categories' => 'required|array',
            'categories.*' => 'required|integer|min:1',
            'media' => 'array',
            'media.*' => 'image',
        ];
    }
}
