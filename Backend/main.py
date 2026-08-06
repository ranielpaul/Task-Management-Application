"""
Task Management API entry point.

FastAPI server exposing task CRUD, plus name search and status filtering.
Connected to PostgreSQL through SQLAlchemy (see database.py and models.py).

Run locally:
    cd Backend
    .\\venv\\Scripts\\activate
    uvicorn main:app --reload
"""

from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Task
from schemas import TaskCreate, TaskRead, TaskUpdate

# Create tables on startup if they do not exist yet.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API", version="0.1.0")

# Allow the Vite dev server to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----- Task routes -------------------------------------------------------
@app.get("/api/tasks", response_model=List[TaskRead])
def list_tasks(
    search: Optional[str] = Query(default=None, description="Filter by task title"),
    status: Optional[str] = Query(default=None, description="Status to filter by"),
    db: Session = Depends(get_db),
):
    """Return all tasks, optionally filtered by name search and/or status."""
    query = db.query(Task)

    if status and status != "All":
        query = query.filter(Task.status == status)

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(Task.title.ilike(term))

    return query.order_by(Task.created_at.desc()).all()


@app.get("/api/tasks/status-filter", response_model=List[TaskRead])
def filter_by_status(
    status: str = Query(..., description="Status: Active, Inactive, or Completed"),
    db: Session = Depends(get_db),
):
    """Return tasks matching a specific status."""
    if status == "All":
        return db.query(Task).order_by(Task.created_at.desc()).all()
    return db.query(Task).filter(Task.status == status).order_by(Task.created_at.desc()).all()


@app.post("/api/tasks", response_model=TaskRead, status_code=201)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task."""
    task = Task(
        title=payload.title.strip(),
        description=payload.description.strip(),
        status=payload.status,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@app.get("/api/tasks/{task_id}", response_model=TaskRead)
def get_task(task_id: str, db: Session = Depends(get_db)):
    """Return a single task by id."""
    task = db.query(Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.put("/api/tasks/{task_id}", response_model=TaskRead)
def update_task(task_id: str, payload: TaskUpdate, db: Session = Depends(get_db)):
    """Update a task's title, description, and/or status."""
    task = db.query(Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if payload.title is not None:
        task.title = payload.title.strip()
    if payload.description is not None:
        task.description = payload.description.strip()
    if payload.status is not None:
        task.status = payload.status

    db.commit()
    db.refresh(task)
    return task


@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_task(task_id: str, db: Session = Depends(get_db)):
    """Delete a task by id."""
    task = db.query(Task).get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return None


@app.get("/")
def health_check():
    """Simple health check."""
    return {"status": "ok", "service": "Task Management API"}
