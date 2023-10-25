<?php

namespace App\Http\Controllers;

use App\Http\Requests\Util\InsertImageRequest;
use App\Traits\ImageTrait;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class UtilController extends Controller
{
    use ImageTrait;
    use ResponseTrait;

    public function insertImage(InsertImageRequest $request)
    {
        $validated = $request->validated();
        $url = $this->uploadImageToStorage(
            $request->file('image'),
            $validated['folder']
        )['link'];
        return $this->success(["link" => $url]);
    }
}
