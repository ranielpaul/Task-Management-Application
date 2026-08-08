"""
Task Management API entry point.

FastAPI server exposed by the task router. Kept small on purpose: the shared
database setup, ORM models, validation schemas, and the seeder live in the
`core` package, while the task routes live in routers/tasks.py.

Run locally:
    cd Backend
    .\\venv\\Scripts\\activate
    uvicorn main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.database import Base, engine
from routers.tasks import router as tasks_router

# Create tables on startup if they do not exist yet.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API", version="0.1.0")

# Allow the Vite dev server to call the API.
# Vite may use 5173, 5174, or other ports when multiple dev servers run.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register feature routers.
app.include_router(tasks_router)


@app.get("/")
def health_check():
    """Simple health check."""
    return {"status": "ok", "service": "Task Management API"}

