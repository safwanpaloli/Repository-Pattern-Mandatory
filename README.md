# AI-Assisted Task Management System (Machine Test)

A production-ready **Task Management System** built with **Laravel** and **Nuxt 3**, following **Clean Architecture**, **Repository Pattern**, and **Service Layer** principles.  
The project demonstrates proper backend design, secure APIs, and a modern frontend workflow.

---

## 🔧 Tech Stack

### Backend
- Laravel (Latest)
- MySQL
- Repository Pattern
- Service Layer
- Laravel Sanctum (API Authentication)
- Policies (Authorization)

### Frontend
- Nuxt 3
- Axios
- Tailwind CSS
- Element Plus (Notifications)
- Chart.js (Dashboard stats)

---

## 🎯 Objective

- Build a task management system with **create & edit support**
- Maintain **clean separation of concerns**
- Avoid direct model usage in controllers
- Support **admin/user roles**
- Prepare system for **AI summary integration**
- Implement **dashboard statistics**

---

## 🏗️ Architecture Overview

```
app/
 ├── Http/
 │   ├── Controllers/
 │   ├── Requests/
 │   └── Resources/
 ├── Models/
 ├── Repositories/
 │   ├── Contracts/
 │   └── Eloquent/
 ├── Services/
 ├── Policies/
 └── Providers/
```

### Key Rules Followed
- ❌ No Eloquent queries in controllers
- ✅ Controllers → Services → Repositories
- ✅ Business logic in Service layer
- ✅ Authorization via Policies
- ✅ API-first backend

---

## 📦 Repository Pattern

### Interface
```php
interface TaskRepositoryInterface {
    public function all();
    public function find(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
}
```

### Binding
```php
$this->app->bind(
    TaskRepositoryInterface::class,
    TaskRepository::class
);
```

---

## 🧠 Service Layer (Core Logic)

```php
public function store(array $data)
{
    return DB::transaction(function () use ($data) {
        $task = empty($data['id'])
            ? $this->repo->create($data)
            : $this->repo->update($data['id'], $data);

        return $task;
    });
}
```

✔ Correct create vs update handling  
✔ Prevents duplicate task creation  
✔ Safe transactional logic  

---

## 👤 Authentication & Roles

Roles:
- **Admin** → full access
- **User** → assigned tasks only

Authorization enforced using **TaskPolicy**.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/{id}` | Update task |
| GET | `/api/tasks/{id}` | Task detail |

---

## 🎨 Frontend (Nuxt 3)

### Features
- Task list, create, edit, detail pages
- Shared composable (`useTask`)
- Axios plugin with credentials
- Element Plus notifications
- Dashboard with computed stats & charts

### Edit Mode Logic
- Dynamic routing (`[id].vue`)
- Form state separated from derived data
- Date normalization for inputs

---

## 📊 Dashboard Statistics

Computed from task list:
- Total tasks
- Completed tasks
- Pending tasks
- High priority tasks

Charts update automatically when data changes.

---

## 🔐 Security

- Sanctum authentication
- CORS configured for SPA
- Policies prevent unauthorized access
- Validation via Form Requests

---

## ⚙️ Installation

```bash
git clone <repository-url>
cd project
composer install
bun install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Frontend:
```bash
bun run dev
```

---

## 🧪 Dummy Data

- Admin and User accounts seeded
- Tasks assigned to users
- Role-based access tested

---

## 📌 Commit Standards

Project uses **Conventional Commits**:
- `feat` → new feature
- `fix` → bug fix
- `chore` → config/setup
- `refactor` → logic improvement

---

## 🧠 Design Decisions

- Repository Pattern for testability
- Service layer for business rules
- Frontend form state isolated from list state
- API-first backend for scalability

---

## ✅ Submission Checklist

- [x] Clean architecture
- [x] Repository pattern
- [x] Service layer
- [x] Policies & auth
- [x] Frontend integration
- [x] Dashboard stats
- [x] README documentation

---

## 👨‍💻 Author

Developed as part of a **Laravel + Nuxt Machine Test**, focusing on **real-world architecture and best practices**.


---

## 🧪 User Seeding (Dummy Data)

Dummy users are seeded for development and testing, including **admin** and **user** roles.

### Seeded Accounts

| Role  | Email              | Password |
|-------|--------------------|----------|
| Admin | admin@example.com  | password |
| User  | john@example.com   | password |
| User  | jane@example.com   | password |

### Seeder File
`database/seeders/UserSeeder.php`

```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role' => 'user',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'role' => 'user',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
    }
}
```

### Run Seeder

```bash
php artisan db:seed --class=UserSeeder
```

Or during initial setup:

```bash
php artisan migrate --seed
```

### Why This Exists

- Validate **role-based authorization**
- Assign tasks to users
- Speed up local development
- Ensure consistent test data

