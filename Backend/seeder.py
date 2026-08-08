"""Seed the tasks table with sample data.

Run from the Backend folder:

    python seeder.py          # insert sample tasks (skips if data exists)
    python seeder.py --reset  # delete all tasks, then insert fresh sample data

Uses the same DATABASE_URL configuration as database.py.
"""

import argparse
import sys

from database import SessionLocal
from models import Task

SAMPLE_TASKS = [
    {
        "title": "Design the dashboard layout",
        "description": "Create wireframes and a color palette for the task dashboard.",
        "status": "Active",
    },
    {
        "title": "Set up the backend API",
        "description": "Build FastAPI routes, request validation, and a PostgreSQL connection.",
        "status": "Active",
    },
    {
        "title": "Write API client functions",
        "description": "Implement create, read, update, delete, search, and filter in TaskAPI.",
        "status": "Inactive",
    },
    {
        "title": "Add task search and filter",
        "description": "Combine name search with status filtering in the home header.",
        "status": "Completed",
    },
    {
        "title": "Write documentation",
        "description": "Document how to run the frontend and backend locally.",
        "status": "Completed",
    },
    {
        "title": "Review pull requests",
        "description": "Review and merge pending feature branches for the team.",
        "status": "Inactive",
    },
    {
        "title": "Set up CI pipeline",
        "description": "Add linting and automated tests to the repository.",
        "status": "Active",
    },
    {
        "title": "Polish the dashboard",
        "description": "Refine spacing, colors, and empty states for a cleaner UI.",
        "status": "Inactive",
    },
]


def seed(reset: bool = False) -> int:
    """Insert sample tasks. Returns the number of tasks inserted."""
    db = SessionLocal()
    try:
        if reset:
            deleted = db.query(Task).delete()
            db.commit()
            print(f"Reset: deleted {deleted} existing task(s).")

        existing_count = db.query(Task).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} task(s). Nothing to seed.")
            return 0

        for sample in SAMPLE_TASKS:
            db.add(Task(**sample))
        db.commit()
        print(f"Seeded {len(SAMPLE_TASKS)} sample task(s).")
        return len(SAMPLE_TASKS)
    finally:
        db.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="Seed the tasks table with sample data.")
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Delete all existing tasks before inserting sample data.",
    )
    args = parser.parse_args()

    try:
        seed(reset=args.reset)
    except Exception as exc:  # pragma: no cover - top-level error reporting
        print(f"Seeding failed: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
