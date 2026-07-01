from fastapi import APIRouter

from pydantic import BaseModel


router = APIRouter()


leaves = []


class LeaveCreate(BaseModel):

    name:str

    reason:str


@router.post("/add-leave")

def add_leave(data: LeaveCreate):


    leave_id = len(leaves)+1


    leaves.append({

        "id": leave_id,

        "name": data.name,

        "reason": data.reason

    })


    return {

        "message":"Leave submitted"

    }


@router.get("/leave")

def get_leave():

    return leaves


@router.delete("/leave/{leave_id}")

def delete_leave(leave_id:int):


    global leaves


    leaves = [

        l

        for l in leaves

        if l["id"] != leave_id

    ]


    return {

        "message":"Leave deleted"

    }