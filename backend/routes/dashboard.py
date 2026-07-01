from fastapi import APIRouter
from sqlalchemy import func

from database import SessionLocal

from models import Student
from models import Teacher
from models import Attendance
from models import FileManager

router = APIRouter()

@router.get("/dashboard")

def dashboard():

    db=SessionLocal()

    try:

        students=db.query(Student).count()

        teachers=db.query(Teacher).count()

        attendance=db.query(Attendance).count()

        files=db.query(FileManager).count()

        return{

            "students":students,

            "teachers":teachers,

            "attendance":attendance,

            "files":files

        }

    finally:

        db.close()