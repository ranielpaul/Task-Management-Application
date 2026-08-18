import os
import uuid
from datetime import datetime

from dotenv import load_dotenv
from sqlalchemy import Column, DateTime, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.dialects.postgresql import UUID

from .database import Base

load_dotenv()

TABLE_NAME = os.getenv("DATABASE_TABLE_NAME", "tasks")

VALID_STATUSES = ["Completed", "Incomplete"]


class Task(Base):
    """A single task row backed by the PostgreSQL database."""

    __tablename__ = TABLE_NAME

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
        default="Incomplete",
    )
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)