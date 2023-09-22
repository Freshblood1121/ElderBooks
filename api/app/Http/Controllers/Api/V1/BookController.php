<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookCreateRequest;
use App\Http\Requests\BookDeleteRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Resources\BookHasCategoryResource;
use App\Models\Book;
use App\Models\BookHasCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BookController extends Controller
{

    public function index(): AnonymousResourceCollection
    {
//        $book = Book::with('categories')
//            ->latest()
//            ->paginate(10);
//        return BookHasCategoryResource::collection($book);
        return BookHasCategoryResource::collection(Book::with('categories')->get());
    }

    /**
     * @param $id
     * @return BookHasCategoryResource
     */
    public function show($id): BookHasCategoryResource
    {
        return new BookHasCategoryResource(Book::with('categories')->findOrFail($id));
    }

    public function create(BookCreateRequest $request): JsonResponse
    {

        // Загрузка изображения
        $image = $request->file('image');
        $destinationPath = 'uploads/img/books/';
        $nameImage = rand() . '.' . $image->getClientOriginalExtension();
        $profileImage = $destinationPath . $nameImage;
        $image->storeAs('storage/images/books', $nameImage);
        $image->move($destinationPath, $nameImage);

        $request->validated();
        $book = Book::create([
            'id' => $request->id,
            'title' => $request->title,
            'author' => $request->author,
            'company' => $request->company,
            'description' => $request->description,
            'age' => $request->age,
            'image' => $profileImage,
            'price' => $request->price,
        ]);

        BookHasCategory::create([
            'category_id' => $request->categories,
            'book_id' => $book->id
        ]);

        return response()->json([
            'status' => true,
            'info' => $book,
            'message' => 'Book create!',
        ], 200);
    }


    public function update(BookUpdateRequest $request): JsonResponse
    {
        Book::find($request->id)
            ->update($request->validated());

        return response()->json([
            'status' => true,
            'message' => 'Book updated.',
        ], 200);
    }

    public function delete(BookDeleteRequest $request)
    {
        Book::find($request->id)->forceDelete();

        return response()->json([
            'status' => true,
            'message' => 'Book deleted.',
        ], 200);
    }

    public function hasCategory($bookId)
    {
        $book = Book::find($bookId);
        return $book->categories;
    }

}
