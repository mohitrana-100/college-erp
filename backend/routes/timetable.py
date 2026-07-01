from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

timetable = []


class TimetableCreate(BaseModel):

    day: str

    subject: str

    time: str


@router.post("/add-timetable")
def add_timetable(data: TimetableCreate):

    timetable_id = len(timetable) + 1

    timetable.append({

        "id": timetable_id,

        "day": data.day,

        "subject": data.subject,

        "time": data.time

    })

    return {

        "message": "Timetable added"

    }


@router.get("/timetable")
def get_timetable():

    return timetable


@router.delete("/timetable/{timetable_id}")
def delete_timetable(timetable_id: int):

    global timetable

    timetable = [

        t

        for t in timetable

        if t["id"] != timetable_id

    ]

    return {

        "message": "Timetable deleted"

    }