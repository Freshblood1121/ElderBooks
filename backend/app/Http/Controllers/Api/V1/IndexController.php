<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index()
    {
        return BookResource(Book::query()->orderByDesc('updated_at')->first());
    }

    public function all()
    {
        return Book::all();
    }
}
