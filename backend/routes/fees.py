from fastapi import APIRouter
from pydantic import BaseModel
from fastapi import HTTPException
router = APIRouter()

fees = []


class FeeCreate(BaseModel):

    student_name: str

    amount: int

    status: str


@router.post("/add-fee")
def add_fee(data: FeeCreate):

    fee_id = len(fees) + 1

    fees.append({

        "id": fee_id,

        "student_name": data.student_name,

        "amount": data.amount,

        "status": data.status

    })

    return {

        "message": "Fee added"

    }


@router.get("/fees")
def get_fees():

    return fees


@router.put("/fees/{fee_id}")
def update_fee(fee_id: int):

    for fee in fees:

        if fee["id"] == fee_id:

            fee["status"] = "Paid"

            return {

                "message": "Fee updated"

            }

    raise HTTPException(

    status_code=404,

    detail="Fee not found"

)
    