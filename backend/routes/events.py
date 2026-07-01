from fastapi import APIRouter

from pydantic import BaseModel


router = APIRouter()


events = []


class EventCreate(BaseModel):

    title: str

    date: str


@router.post("/add-event")

def add_event(data: EventCreate):

    event_id = len(events)+1


    events.append({

        "id": event_id,

        "title": data.title,

        "date": data.date

    })


    return {

        "message":"Event added"

    }


@router.get("/events")

def get_events():

    return events


@router.delete("/events/{event_id}")

def delete_event(event_id:int):


    global events


    events = [

        e

        for e in events

        if e["id"] != event_id

    ]


    return {

        "message":"Event deleted"

    }