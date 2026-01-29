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

            $task = empty($data['id'])
                ? $this->repo->create($data)
                : $this->repo->update($data['id'], $data);

            $aiData = $this->aiService->generateSummary($task);

            return $this->repo->update($task->id, $aiData);
        });
    }

    public function status()
    {
        return $this->repo->all();
    }

    public function generateAiSummary(int $id)
    {
        $task = $this->repo->find($id);
        $aiData = $this->aiService->generateSummary($task);
        return $this->repo->update($id, $aiData);
    }
}
