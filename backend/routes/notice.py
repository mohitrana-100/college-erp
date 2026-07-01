from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

notices = []


class NoticeCreate(BaseModel):

    message: str


# -----------------------------
# Add Notice
# -----------------------------

@router.post("/add-notice")
def add_notice(

    notice: NoticeCreate

):

    notice_id = len(notices) + 1

    notices.append({

        "id": notice_id,

        "message": notice.message

    })

    return {

        "message": "Notice added"

    }


# -----------------------------
# View Notice
# -----------------------------

@router.get("/notices")
def get_notices():

    return notices


# -----------------------------
# Delete Notice
# -----------------------------

@router.delete("/notices/{notice_id}")
def delete_notice(

    notice_id: int

):

    global notices

    notices = [

        n

        for n in notices

        if n["id"] != notice_id

    ]

    return {

        "message": "Notice deleted"

    }