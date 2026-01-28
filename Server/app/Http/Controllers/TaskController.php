<?php

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $service
    ) {}

    public function index()
    {
        return TaskResource::collection(
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
}
