from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

marks = []


class MarksCreate(BaseModel):

    student_name: str

    subject: str

    marks: int


@router.post("/add-marks")
def add_marks(data: MarksCreate):

    mark_id = len(marks) + 1

    marks.append({

        "id": mark_id,

        "student_name": data.student_name,

        "subject": data.subject,

        "marks": data.marks

    })

    return {

        "message": "Marks added"

    }


@router.get("/marks")
def get_marks():

    return marks


@router.delete("/marks/{mark_id}")
def delete_marks(mark_id: int):

    global marks

    marks = [

        m

        for m in marks

        if m["id"] != mark_id

    ]

    return {

        "message": "Marks deleted"

    }