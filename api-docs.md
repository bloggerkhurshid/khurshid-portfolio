# API Documentation

This document outlines the REST API endpoints available in the backend (`api/` directory) for the Khurshid Alom Portfolio project.

All API endpoints are prefixed with `/api/`.

## Authentication

All `POST`, `PUT`, and `DELETE` requests (except login) require a valid JWT token sent in the `Authorization` header.

**Header Format:**
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## 1. Auth API (`/api/auth.php`)

### Login (Generate Token)
- **Method:** `POST`
- **Endpoint:** `/api/auth.php`
- **Content-Type:** `application/json`
- **Payload:**
  ```json
  {
    "username": "admin",
    "password": "yourpassword"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "message": "Login successful",
    "token": "eyJ0eXAi...",
    "user": {
      "id": 1,
      "username": "admin"
    }
  }
  ```

---

## 2. Projects API (`/api/projects.php`)

### Get All Projects
- **Method:** `GET`
- **Endpoint:** `/api/projects.php`
- **Description:** Returns an array of all projects ordered by creation date descending.

### Create a Project (Auth Required)
- **Method:** `POST`
- **Endpoint:** `/api/projects.php`
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `title` (string)
  - `description` (string)
  - `tech_stacks` (string, comma-separated)
  - `live_url` (string, optional)
  - `github_url` (string, optional)
  - `slug` (string, optional, auto-generated if empty)
  - `image` (file, optional)
- **Success Response (200 OK):**
  ```json
  {
    "message": "Project created successfully",
    "id": "2"
  }
  ```

### Update a Project (Auth Required)
- **Method:** `PUT`
- **Endpoint:** `/api/projects.php?id=<project_id>`
- **Content-Type:** `application/json`
- **Payload:** Any subset of the project fields (e.g., `title`, `description`, `tech_stacks`, `live_url`, `github_url`, `slug`). *Note: Image updates via PUT are not currently supported in this endpoint.*

### Delete a Project (Auth Required)
- **Method:** `DELETE`
- **Endpoint:** `/api/projects.php?id=<project_id>`
- **Success Response (200 OK):**
  ```json
  {
    "message": "Project deleted successfully"
  }
  ```

---

## 3. Blogs API (`/api/blogs.php`)

### Get All Blogs
- **Method:** `GET`
- **Endpoint:** `/api/blogs.php`
- **Description:** Returns an array of all blogs ordered by creation date descending.

### Create a Blog (Auth Required)
- **Method:** `POST`
- **Endpoint:** `/api/blogs.php`
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `title` (string)
  - `author` (string, defaults to "Khurshid Alom")
  - `content` (string)
  - `slug` (string, optional, auto-generated if empty)
  - `image` (file, optional)

### Update a Blog (Auth Required)
- **Method:** `PUT`
- **Endpoint:** `/api/blogs.php?id=<blog_id>`
- **Content-Type:** `application/json`
- **Payload:** Any subset of the blog fields (e.g., `title`, `author`, `content`, `slug`).

### Delete a Blog (Auth Required)
- **Method:** `DELETE`
- **Endpoint:** `/api/blogs.php?id=<blog_id>`
- **Success Response (200 OK):**
  ```json
  {
    "message": "Blog deleted successfully"
  }
  ```
