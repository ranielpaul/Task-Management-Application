"""
Database setup for the Task Management application.

Uses SQLAlchemy to connect to PostgreSQL. The connection string is read from
the DATABASE_URL environment variable, with a sensible local default.

Example DATABASE_URL for a local PostgreSQL install:
    postgresql+psycopg2://postgres:yourpassword@localhost:5432/tasksdb

Override it with an env var or a Backend/.env file:
    DATABASE_URL=postgresql+psycopg2://postgres:secret@localhost:5432/tasksdb
"""

import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load variables from a .env file in the same folder, if present.
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:postgres@localhost:5432/tasksdb",
)

engine = create_engine(DATABASE_URL, echo=False, future=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
