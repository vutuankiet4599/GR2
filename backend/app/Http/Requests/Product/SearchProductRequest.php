<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class SearchProductRequest extends FormRequest
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
            'search' => 'nullable|string|min:1|max:50',
            'owner' => 'nullable|string|min:1|max:50',
            'address' => 'nullable|string|min:1|max:50',
            'date' => 'nullable|boolean',
            'orders' => 'nullable|boolean'
        ];
    }
}
