from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

assignments = []


class AssignmentCreate(BaseModel):

    title: str

    subject: str


@router.post("/add-assignment")
def add_assignment(data: AssignmentCreate):

    assignment_id = len(assignments) + 1

    assignments.append({

        "id": assignment_id,

        "title": data.title,

        "subject": data.subject

    })

    return {

        "message": "Assignment added"

    }


@router.get("/assignments")
def get_assignments():

    return assignments


@router.delete("/assignments/{assignment_id}")
def delete_assignment(assignment_id: int):

    global assignments

    assignments = [

        a

        for a in assignments

        if a["id"] != assignment_id

    ]

    return {

        "message": "Assignment deleted"

    }