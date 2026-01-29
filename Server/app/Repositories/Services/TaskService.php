<?php

namespace App\Repositories\Services;

use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Support\Facades\DB;

class TaskService
{
    public function __construct(
        protected TaskRepositoryInterface $repo,
        protected AIService $aiService
    ) {}

    public function store(array $data)
    {
        return DB::transaction(function () use ($data) {
            $task = $this->repo->create($data);

            $aiData = $this->aiService->generateSummary($task);

            return $this->repo->update($task->id, $aiData);
        });
    }

    public function status()
    {
        return $this->repo->all();
    }
}
