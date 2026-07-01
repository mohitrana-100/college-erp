from fastapi import APIRouter

from fastapi import UploadFile

from fastapi import File as FastAPIFile

from fastapi import Depends

from fastapi import HTTPException

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from database import SessionLocal

from models import FileManager

from datetime import datetime

import shutil

import os


router = APIRouter()


UPLOAD_DIR = "uploads"

os.makedirs(

    UPLOAD_DIR,

    exist_ok=True

)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()



@router.post("/files/upload")

def upload_file(

    category: str,

    uploaded_by: str,

    file: UploadFile = FastAPIFile(...),

    db: Session = Depends(get_db)

):


    filepath = os.path.join(

        UPLOAD_DIR,

        file.filename

    )


    with open(

        filepath,

        "wb"

    ) as buffer:

        shutil.copyfileobj(

            file.file,

            buffer

        )


    new_file = FileManager(

        title = file.filename,

        filename = file.filename,

        category = category,

        uploaded_by = uploaded_by,

        created_at = str(

            datetime.now()

        )

    )


    db.add(

        new_file

    )


    db.commit()


    db.refresh(

        new_file

    )


    return {

        "message":

        "File uploaded successfully"

    }



@router.get("/files")

def get_files(

    category: str,

    db: Session = Depends(get_db)

):


    return db.query(

        FileManager

    ).filter(

        FileManager.category == category

    ).all()



@router.get("/files/download/{file_id}")

def download_file(

    file_id: int,

    db: Session = Depends(get_db)

):


    file = db.query(

        FileManager

    ).filter(

        FileManager.id == file_id

    ).first()


    if not file:

        raise HTTPException(

            status_code = 404,

            detail = "File not found"

        )


    path = os.path.join(

        UPLOAD_DIR,

        file.filename

    )


    return FileResponse(

        path,

        filename = file.filename

    )



@router.delete("/files/{file_id}")

def delete_file(

    file_id: int,

    db: Session = Depends(get_db)

):


    file = db.query(

        FileManager

    ).filter(

        FileManager.id == file_id

    ).first()


    if not file:

        raise HTTPException(

            status_code = 404,

            detail = "File not found"

        )


    path = os.path.join(

        UPLOAD_DIR,

        file.filename

    )


    if os.path.exists(

        path

    ):

        os.remove(

            path

        )


    db.delete(

        file

    )


    db.commit()


    return {

        "message":

        "File deleted"

    }