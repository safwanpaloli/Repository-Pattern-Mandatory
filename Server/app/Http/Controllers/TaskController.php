<?php

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $service
    ) {}

    public function store(StoreTaskRequest $request)
    {
        $this->service->store($request->validated());

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Task created successfully');
    }
}
