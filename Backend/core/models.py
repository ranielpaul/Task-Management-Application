"""SQLAlchemy ORM models for the Task Management application."""

import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID

from .database import Base

# Keep these in sync with schemas.py and the frontend filter options.
VALID_STATES = ["Active", "Inactive"]
VALID_STATUSES = ["Completed", "Incomplete"]


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
    state = Column(
        SqlEnum(*VALID_STATES, name="task_state"),
        nullable=False,
        default="Active",
    )
    status = Column(
        SqlEnum(*VALID_STATUSES, name="task_status"),
        nullable=False,
        default="Incomplete",
    )
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

