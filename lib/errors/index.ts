import { NextResponse } from "next/server";

// Base custom error with status code
export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// 400 - Client sent invalid data
export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

// 401 - Not authenticated
export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

// 403 - Authenticated but not allowed
export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

// 404 - Resource not found
export class NotFoundError extends AppError {
  constructor(message: string = "Not found") {
    super(message, 404);
  }
}

// 409 - Conflict (duplicate resource, etc.)
export class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}

// 422 - Validation failed
export class ValidationError extends AppError {
  readonly errors?: Record<string, string[]>;

  constructor(
    message: string = "Validation failed",
    errors?: Record<string, string[]>
  ) {
    super(message, 422);
    this.errors = errors;
  }
}

// 429 - Too many requests
export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, 429);
  }
}

// 500 - Server error
export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

// 503 - Service unavailable (external API down, etc.)
export class ServiceUnavailableError extends AppError {
  constructor(message: string = "Service unavailable") {
    super(message, 503);
  }
}

// Centralized error handler for API routes
export function handleError(error: unknown): NextResponse {
  // Log unexpected errors
  if (!(error instanceof AppError) || !error.isOperational) {
    console.error("Unexpected error:", error);
  }

  // Handle validation errors with field-level details
  if (error instanceof ValidationError && error.errors) {
    return NextResponse.json(
      { error: error.message, errors: error.errors },
      { status: error.statusCode }
    );
  }

  // Handle known operational errors
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // Handle unknown errors
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
