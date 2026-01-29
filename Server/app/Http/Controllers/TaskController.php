<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Repositories\Services\TaskService;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $service
    ) {}

    public function index()
    {
        return response()->json(
            app(TaskRepositoryInterface::class)->all()
        );
    }

    public function store(StoreTaskRequest $request)
    {
        return response()->json(
            $this->service->store($request->validated()),
            201
        );
    }

    public function status()
    {
        $status = $this->service->status();
        return response()->json(['status' => 'ok']);
    }
}
