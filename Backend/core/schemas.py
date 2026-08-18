from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

TaskStatus = Literal["Completed", "Incomplete"]


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field("", max_length=1000)


class TaskCreate(TaskBase):
    status: Optional[TaskStatus] = "Incomplete"


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[TaskStatus] = None


class TaskRead(TaskBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    status: TaskStatus

