
# 📋 Task Manager - Full Stack Application

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-16%2B-red.svg)](https://angular.io/)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, responsive Task Manager application built with **Spring Boot** backend and **Angular** frontend. Features JWT authentication, real-time task management, and a clean user interface.

## 🚀 Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 📝 **Task Management** - Create, read, update, and delete tasks
- 👤 **Single User System** - Personal task management
- 🎨 **Modern UI** - Clean, responsive design with Angular
- 📊 **State Management** - NgRx for predictable state updates
- 📚 **API Documentation** - Interactive Swagger UI
- 🔍 **H2 Database Console** - Easy database inspection
- 🚦 **Status Tracking** - PENDING/COMPLETED task states

## 📋 Table of Contents

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST    ┌──────────────────┐
│                 │ ←──────────────→ │                  │
│  Angular SPA    │                 │  Spring Boot API │
│  (Port 3000)    │                 │  (Port 8080)     │
│                 │                 │                  │
└─────────────────┘                 └──────────────────┘
         │                                    │
    ┌─────────┐                        ┌─────────────┐
    │  NgRx   │                        │ H2 Database │
    │  Store  │                        │ (In-Memory) │
    └─────────┘                        └─────────────┘
```

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java 17+** installed
- **Node.js 18+** and npm
- **Maven** (or use included wrapper)
- **Angular CLI** (`npm install -g @angular/cli`)

## ⚡ Quick Start

Get both services running in under 2 minutes:

### 1. Clone and Start Backend

```bash
# Terminal 1
cd full_stack_developer_test_backend
export JWT_SECRET=$(openssl rand -base64 32)  # Linux/macOS
./mvnw spring-boot:run
```

**Windows PowerShell:**
```powershell
$env:JWT_SECRET = [Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))
mvnw spring-boot:run
```

### 2. Start Frontend

```bash
# Terminal 2
cd full_stack_developer_test_frontend
npm install
ng serve --port 3000 -o
```

### 3. Access the Application

- 🌐 **Frontend:** http://localhost:3000
- 📚 **API Docs:** http://localhost:8080/swagger-ui
- 🗄️ **Database:** http://localhost:8080/h2-console

---

## 🔧 Backend Setup

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17+ | Runtime |
| Spring Boot | 3.x | Framework |
| Spring Security | - | Authentication & Authorization |
| Spring Data JPA | - | Data Persistence |
| H2 Database | - | In-Memory Database |
| JJWT | - | JWT Token Handling |
| Swagger/OpenAPI | 3 | API Documentation |

### Project Structure

```
src/main/java/com/ecstassea/taskmanager/
├── 📁 config/
│   ├── SecurityConfig.java          # Security configuration
│   ├── CorsConfig.java              # CORS settings
│   └── OpenApiConfig.java           # Swagger configuration
├── 📁 security/
│   ├── JwtAuthenticationFilter.java # JWT filter
│   ├── JwtTokenProvider.java        # Token utilities
│   ├── CustomUserDetailsService.java
│   └── PasswordConfig.java
├── 📁 auth/
│   ├── AuthController.java          # Authentication endpoints
│   └── 📁 dto/, service/
├── 📁 user/
│   ├── User.java                    # User entity
│   └── UserRepository.java, UserService.java
└── 📁 task/
    ├── Task.java                    # Task entity
    ├── TaskStatus.java              # PENDING/COMPLETED enum
    ├── TaskController.java          # Task CRUD endpoints
    └── TaskService.java, TaskRepository.java
```

### API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user | ❌ |
| `POST` | `/auth/login` | User login | ❌ |
| `GET` | `/api/tasks` | Get user's tasks | ✅ |
| `POST` | `/api/tasks` | Create new task | ✅ |
| `GET` | `/api/tasks/{id}` | Get specific task | ✅ |
| `PUT` | `/api/tasks/{id}` | Update task | ✅ |
| `DELETE` | `/api/tasks/{id}` | Delete task | ✅ |

### Data Models

**User Entity:**
```json
{
  "id": "Long",
  "username": "String (unique)",
  "password": "String (BCrypt hashed)"
}
```

**Task Entity:**
```json
{
  "id": "Long",
  "title": "String",
  "description": "String (optional)",
  "status": "PENDING | COMPLETED",
  "user": "User (owner)"
}
```

---

## 🎨 Frontend Setup

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 16+ | Frontend Framework |
| NgRx | State Management |
| RxJS | Reactive Programming |
| CSS Modules | Component Styling |
| Angular Router | Navigation |

### App Architecture

**Routing Structure:**
```
/auth
  ├── /login
  └── /register
/tasks (🔒 protected by AuthGuard)
```

**State Management (NgRx):**
- `auth` slice: Authentication state
- `tasks` slice: Task management state

**Core Services:**
- `AuthService` - Token management
- `ApiAuthService` - Authentication HTTP calls
- `TasksService` - Task HTTP operations
- `JwtService` - JWT utilities

### Key Components

- `LoginComponent` - User authentication
- `RegisterComponent` - User registration  
- `DashboardComponent` - Main task interface
- `TaskListComponent` - Task display table
- `TaskFormComponent` - Task creation/editing modal

---

## 📚 API Documentation

### Swagger UI
Access the interactive API documentation at:
**http://localhost:8080/swagger-ui**

### Quick API Test

```bash
# 1. Register a new user
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"SecurePass123!"}'

# 2. Login and get token
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"SecurePass123!"}' | jq -r .token)

# 3. Create a task
curl -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Complete README","description":"Add badges and formatting","status":"PENDING"}'

# 4. Get all tasks
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/tasks
```

---

## ⚙️ Configuration

### Backend Configuration

**Application Properties** (`application.yml`):

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:taskdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driverClassName: org.h2.Driver
    username: sa
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate.format_sql: true
  h2.console:
    enabled: true
    path: /h2-console

server:
  error:
    include-message: always
    include-binding-errors: always

jwt:
  expiration: 3600000  # 1 hour

logging.level:
  root: INFO
  org.springframework.security: INFO
```

### Frontend Configuration

**Environment Settings** (`src/environments/environment.ts`):

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080',
};
```

---

## 🧪 Testing

### Manual Testing Flow

1. **Start both services** (backend on 8080, frontend on 3000)
2. **Register** a new user at `/auth/register`
3. **Login** at `/auth/login`
4. **Create tasks** in the dashboard
5. **Update task status** (PENDING ↔ COMPLETED)
6. **Delete tasks** when no longer needed

### H2 Database Console

Access the database console at **http://localhost:8080/h2-console**

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: *(leave empty)*

---

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Blank/unstyled UI** | Verify component CSS files are in `styleUrls` |
| **401 errors on /api/** | Check JWT token in localStorage under key `jwt` |
| **CORS errors** | Enable CORS in backend for `http://localhost:3000` |
| **Port conflicts** | Ensure ports 3000 and 8080 are available |
| **JWT_SECRET missing** | Set environment variable before starting backend |

### Debug Commands

```bash
# Check if backend is running
curl http://localhost:8080/actuator/health

# Check JWT token in browser console
localStorage.getItem('jwt')

# View backend logs
./mvnw spring-boot:run --debug

# Check Angular build
ng build --configuration development
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **Spring Boot** best practices for backend
- Use **Angular** style guide for frontend  
- Write **meaningful commit messages**
- Add **tests** for new features
- Update **documentation** as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [API Documentation](#api-documentation)  
3. Open an issue on GitHub
4. Contact the development team

---

**Made with ❤️ using Spring Boot & Angular**
