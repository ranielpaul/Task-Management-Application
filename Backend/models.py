"""SQLAlchemy ORM models for the Task Management application."""

import uuid
from datetime import datetime

from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Enum as SqlEnum

from database import Base

# Keep status values in sync with the frontend filter options.
VALID_STATUSES = ["Active", "Inactive", "Completed"]


class Task(Base):
    """A single task row backed by the PostgreSQL database."""

    __tablename__ = "tasks"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=False, default="")
    status = Column(
        SqlEnum(*VALID_STATUSES, name="task_status"),
        nullable=False,
        default="Active",
    )
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
