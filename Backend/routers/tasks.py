from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from core.database import get_db
from core.models import Task
from core.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("", response_model=List[TaskRead])
def list_tasks(
    search: Optional[str] = Query(default=None, description="Filter by task title"),
    is_complete: Optional[bool] = Query(default=None, description="Filter by completion status"),
    db: Session = Depends(get_db),
):
    """Return all tasks, optionally filtered by name search and/or completion status."""
    query = db.query(Task)

    if is_complete is not None:
        query = query.filter(Task.is_complete == is_complete)

    if search:
        term = f"%{search.strip()}%"
        query = query.filter(Task.title.ilike(term))

    return query.order_by(Task.created_at.desc()).all()


@router.post("", response_model=TaskRead, status_code=201)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task."""
    task = Task(
        title=payload.title.strip(),
        description=payload.description.strip(),
        is_complete=payload.is_complete,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: UUID, db: Session = Depends(get_db)):
    """Return a single task by id."""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: UUID, payload: TaskUpdate, db: Session = Depends(get_db)):
    """Update a task's title, description, and/or completion status."""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if payload.title is not None:
        task.title = payload.title.strip()
    if payload.description is not None:
        task.description = payload.description.strip()
    if payload.is_complete is not None:
        task.is_complete = payload.is_complete

    db.commit()
    db.refresh(task)
    return task


@router.patch("/{task_id}/toggle", response_model=TaskRead)
def toggle_task_complete(task_id: UUID, db: Session = Depends(get_db)):
    """Toggle a task's completion status."""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.is_complete = not task.is_complete
    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: UUID, db: Session = Depends(get_db)):
    """Delete a task by id."""
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return None
