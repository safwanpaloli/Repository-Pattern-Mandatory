<?php

namespace App\Repositories\Services;
use App\Models\Task;

class AIService
{
    public function generateSummary(Task $task): array
    {
        return [
            'ai_summary' => "This task '{$task->title}' is high impact and urgent.",
            'ai_priority' => 'high'
        ];
    }
}

