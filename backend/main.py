from fastapi import (

FastAPI,

Depends,

HTTPException,

UploadFile,

File

)
from fastapi.responses import FileResponse
from openpyxl import Workbook
from jose import jwt


import pandas as pd



from fastapi import UploadFile
from fastapi import UploadFile, File as FastAPIFile, Form
import os

from shutil import copyfileobj

from fastapi import File
from sqlalchemy import func


from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from routes.events import router as events_router

from routes.leave import router as leave_router
from routes.file_manager import router as file_manager_router
from routes.dashboard import router as dashboard_router

from jose import jwt

from reportlab.pdfgen import canvas
from fastapi.middleware.cors import CORSMiddleware

from routes.notice import router as notice_router

from routes.timetable import router as timetable_router

from routes.assignment import router as assignment_router

from routes.marks import router as marks_router

from routes.fees import router as fees_router

from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, User, Student, Teacher, Attendance, Notification, File

from pydantic import BaseModel

from passlib.context import CryptContext

from datetime import date

SECRET_KEY = "mohit_college_erp"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60
oauth2_scheme = OAuth2PasswordBearer(

    tokenUrl="login"

)
def get_current_user(

    token: str = Depends(

        oauth2_scheme

    )

):

    payload = jwt.decode(

        token,

        SECRET_KEY,

        algorithms=[ALGORITHM]

    )


    email = payload.get(

        "email"

    )


    return email

#token function
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(

        minutes=ACCESS_TOKEN_EXPIRE_MINUTES

    )

    to_encode.update({

        "exp": expire

    })

    return jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )






# -----------------------------------
# Create tables
# -----------------------------------

Base.metadata.create_all(bind=engine)


# -----------------------------------
# FastAPI app
# -----------------------------------

app = FastAPI()
from fastapi.staticfiles import StaticFiles

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
app.include_router(

file_manager_router

)
app.include_router(
dashboard_router
)

app.include_router(notice_router)
app.include_router(

events_router

)

app.include_router(

leave_router

)

app.include_router(timetable_router)

app.include_router(assignment_router)

app.include_router(marks_router)

app.include_router(fees_router)


# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# -----------------------------------
# Password hashing
# -----------------------------------

pwd_context = CryptContext(

    schemes=["pbkdf2_sha256"],

    deprecated="auto"

)


# -----------------------------------
# Temporary storage
# -----------------------------------

subjects = []

notices = []

recent_activities = []
# -----------------------------------
# Database connection
# -----------------------------------

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()
def add_activity(text):
    recent_activities.insert(
        0,
        {
            "message": text,
            "time": datetime.now().strftime("%d-%m-%Y %H:%M")
        }
    )

    if len(recent_activities) > 20:
        recent_activities.pop()

# -----------------------------------
# Pydantic models
# -----------------------------------

class UserCreate(BaseModel):

    name: str

    email: str

    password: str

    role: str

class ProfileUpdate(

BaseModel

):

    phone: str

    address: str

    dob: str

    bio: str
class LoginData(BaseModel):

    email: str

    password: str


class StudentCreate(BaseModel):

    roll_no: str

    name: str

    email: str

    course: str

    semester: str

    section: str

    batch: str

    father_name: str

    mother_name: str

    phone: str

    address: str

class StudentUpdate(BaseModel):

    roll_no: str

    name: str

    email: str

    course: str

    semester: str

    section: str

    batch: str

    father_name: str

    mother_name: str

    phone: str

    address: str
class AttendanceCreate(BaseModel):

    student_id: int

    status: str


class SubjectCreate(BaseModel):

    name: str
    
class StudentData(BaseModel):

    name: str

    course: str

    year: int


class NoticeCreate(BaseModel):

    message: str


class NotificationCreate(BaseModel):

    message: str

    receiver: str
class PasswordUpdate(BaseModel):

    email: str

    old_password: str

    new_password: str


# -----------------------------------
# Home API
# -----------------------------------
@app.get("/statistics")
def statistics(
    db: Session = Depends(get_db)
):

    student_count = (
        db.query(User)
        .filter(User.role == "student")
        .count()
    )

    teacher_count = (
        db.query(User)
        .filter(User.role == "teacher")
        .count()
    )

    notice_count = len(notices)

    return {
        "students": student_count,
        "teachers": teacher_count,
        "notices": notice_count,
        "assignments": 0,
        "fees": 0
    }
@app.get("/teacher-summary")
def teacher_summary(
    db: Session = Depends(get_db)
):

    total = (
        db.query(User)
        .filter(User.role == "teacher")
        .count()
    )

    return {
        "total": total,
        "present": total,
        "leave": 0
    }
@app.get("/recent-activities")
def get_recent_activities():

    return recent_activities
@app.get("/")
def home():

    return {

        "message": "Backend running successfully 🚀"

    }


# -----------------------------------
# Signup API
# -----------------------------------

@app.post("/signup")
def signup(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    existing_user = db.query(User).filter(

        User.email == user.email

    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"

        )

    hashed_password = pwd_context.hash(

        user.password

    )

    new_user = User(

        name=user.name,

        email=user.email,

        password=hashed_password,

        role=user.role

    )

    db.add(new_user)

    db.commit()


    db.refresh(new_user)

    return {

        "message": "User created successfully"

    }


# -----------------------------------
# Login API
# -----------------------------------

@app.post("/login")
def login(

    data: LoginData,

    db: Session = Depends(get_db)

):

    user = db.query(User).filter(

        User.email == data.email

    ).first()


    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )


    if not pwd_context.verify(

        data.password,

        user.password

    ):

        raise HTTPException(

            status_code=400,

            detail="Wrong password"

        )


    token = create_access_token({

        "email": user.email

    })


    return {

        "message": "Login successful",

        "name": user.name,

        "role": user.role.lower(),

        "token": token

    }

# -----------------------------------
# Add Student API
# -----------------------------------

@app.post("/add-student")

def add_student(

    data: StudentCreate,

    db: Session = Depends(get_db)

):

    student = Student(

        roll_no=data.roll_no,

        name=data.name,

        email=data.email,

        course=data.course,

        semester=data.semester,

        section=data.section,

        batch=data.batch,

        father_name=data.father_name,

        mother_name=data.mother_name,

        phone=data.phone,

        address=data.address

    )

    db.add(student)

    db.commit()
    add_activity(
    f"Student {student.name} added"
)

    db.refresh(student)

    return {

        "message": "Student added"

    }
@app.put("/students/{student_id}")

def update_student(

    student_id: int,

    data: StudentUpdate,

    db: Session = Depends(get_db)

):

    student = db.query(

        Student

    ).filter(

        Student.id == student_id

    ).first()


    if not student:

        raise HTTPException(

            status_code=404,

            detail="Student not found"

        )


    student.roll_no = data.roll_no

    student.name = data.name

    student.email = data.email

    student.course = data.course

    student.semester = data.semester

    student.section = data.section

    student.batch = data.batch

    student.father_name = data.father_name

    student.mother_name = data.mother_name

    student.phone = data.phone

    student.address = data.address


    db.commit()


    return {

        "message": "Student updated"

    }

# -----------------------------------
# View Students API
# -----------------------------------

@app.get("/students/{student_id}")

def get_student(

    student_id: int,

    db: Session = Depends(get_db)

):

    student = (

        db.query(Student)

        .filter(

            Student.id == student_id

        )

        .first()

    )


    if not student:

        raise HTTPException(

            status_code=404,

            detail="Student not found"

        )


    return student
# -----------------------------------
# Delete Student API
# -----------------------------------

@app.delete("/students/{student_id}")

def delete_student(

    student_id: int,

    db: Session = Depends(get_db)

):

    student = db.query(

        Student

    ).filter(

        Student.id == student_id

    ).first()

    if not student:

        raise HTTPException(

            status_code=404,

            detail="Student not found"

        )

    db.delete(student)

    db.commit()

    return {

        "message": "Student deleted"

    }
@app.post("/upload-students")

def upload_students(

    file: UploadFile = FastAPIFile(...),

    db: Session = Depends(get_db)

):

    df = pd.read_excel(

        file.file

    )


    count = 0


    for _, row in df.iterrows():


        exists = (

            db.query(Student)

            .filter(

                Student.roll_no == str(

                    row["roll_no"]

                )

            )

            .first()

        )


        if exists:

            continue


        student = Student(

            roll_no = str(

                row["roll_no"]

            ),

            name = str(

                row["name"]

            ),

            email = str(

                row["email"]

            ),

            course = str(

                row["course"]

            ),

            semester = str(

                row["semester"]

            ),

            section = str(

                row["section"]

            ),

            batch = str(

                row["batch"]

            ),

            father_name = str(

                row["father_name"]

            ),

            mother_name = str(

                row["mother_name"]

            ),

            phone = str(

                row["phone"]

            ),

            address = str(

                row["address"]

            )

        )


        db.add(

            student

        )


        count += 1


    db.commit()


    return {

        "message":

        f"{count} students uploaded"

    }
# -----------------------------------
# Add Teacher API
# -----------------------------------

@app.post("/add-teacher")
def add_teacher(

    teacher: UserCreate,

    db: Session = Depends(get_db)

):

    existing = db.query(User).filter(

        User.email == teacher.email

    ).first()

    if existing:

        raise HTTPException(

            status_code=400,

            detail="Teacher already exists"

        )

    hashed_password = pwd_context.hash(

        teacher.password

    )

    new_teacher = User(

        name=teacher.name,

        email=teacher.email,

        password=hashed_password,

        role="teacher"

    )

    db.add(new_teacher)

    db.commit()
    add_activity(
    f"Teacher {teacher.name} added"
)

    db.refresh(new_teacher)

    return {

        "message": "Teacher added"

    }


# -----------------------------------
# View Teachers API
# -----------------------------------

@app.get("/teachers")
def get_teachers(

    db: Session = Depends(get_db)

):

    teachers = db.query(User).filter(

        User.role == "teacher"

    ).all()

    return teachers


# -----------------------------------
# Delete Teacher API
# -----------------------------------

@app.delete("/teachers/{teacher_id}")
def delete_teacher(

    teacher_id: int,

    db: Session = Depends(get_db)

):

    teacher = db.query(User).filter(

        User.id == teacher_id,

        User.role == "teacher"

    ).first()

    if not teacher:

        raise HTTPException(

            status_code=404,

            detail="Teacher not found"

        )

    db.delete(teacher)

    db.commit()

    return {

        "message": "Teacher deleted"

    }
@app.put("/teachers/{teacher_id}")
def update_teacher(

    teacher_id:int,

    data:dict,

    db:Session=Depends(get_db)

):

    teacher = db.query(User).filter(

        User.id==teacher_id,

        User.role=="teacher"

    ).first()

    if not teacher:

        raise HTTPException(

            status_code=404,

            detail="Teacher not found"

        )

    teacher.name = data["name"]

    db.commit()

    db.refresh(teacher)

    return {

        "message":"Teacher updated"

    }
# -----------------------------------
# Attendance API
# -----------------------------------

@app.post("/attendance")
def mark_attendance(

    attendance: AttendanceCreate,

    db: Session = Depends(get_db)

):

    student = db.query(Student).filter(

        Student.id == attendance.student_id

    ).first()


    if not student:

        raise HTTPException(

            status_code=404,

            detail="Student not found"

        )


    new_attendance = Attendance(

        student_name = student.name,

        subject = "General",

        status = attendance.status

    )


    db.add(new_attendance)

    db.commit()

    db.refresh(new_attendance)


    return {

        "message":"Attendance marked",

        "student":student.name,

        "status":attendance.status

    }
@app.get("/attendance")
def get_attendance(

    db: Session = Depends(get_db)

):

    return db.query(Attendance).all()
@app.delete("/attendance/{attendance_id}")
def delete_attendance(

    attendance_id: int,

    db: Session = Depends(get_db)

):

    attendance = (

        db.query(Attendance)

        .filter(

            Attendance.id == attendance_id

        )

        .first()

    )

    if not attendance:

        raise HTTPException(

            status_code=404,

            detail="Attendance not found"

        )

    db.delete(attendance)

    db.commit()

    return {

        "message": "Attendance deleted"

    }


# -----------------------------------
# Add Subject API
# -----------------------------------

@app.post("/add-subject")
def add_subject(

    subject: SubjectCreate

):

    subject_id = len(subjects) + 1

    subjects.append({

        "id": subject_id,

        "name": subject.name

    })

    return {

        "message": "Subject added"

    }


# -----------------------------------
# View Subjects API
# -----------------------------------

@app.get("/subjects")
def get_subjects():

    return subjects


# -----------------------------------
# Delete Subject API
# -----------------------------------

@app.delete("/subjects/{subject_id}")
def delete_subject(

    subject_id: int

):

    global subjects

    subjects = [

        s

        for s in subjects

        if s["id"] != subject_id

    ]

    return {

        "message": "Subject deleted"

    }
    
@app.get("/students/pdf")
def export_students_pdf(

    db: Session = Depends(get_db)

):

    students = db.query(Student).all()


    filename = "students.pdf"


    pdf = canvas.Canvas(

        filename

    )


    pdf.setFont(

        "Helvetica",

        14

    )


    pdf.drawString(

        100,

        800,

        "Student Report"

    )


    y = 760


    for student in students:

        line = (

            f"{student.id}"

            " | "

            f"{student.name}"

            " | "

            f"{student.course}"

            " | "

            f"Year {student.year}"

        )


        pdf.drawString(

            100,

            y,

            line

        )


        y -= 25


    pdf.save()


    return FileResponse(

        filename,

        media_type="application/pdf",

        filename="students.pdf"

    )
@app.get("/students/excel")
def export_students_excel(

    db: Session = Depends(get_db)

):

    students = db.query(

        Student

    ).all()


    filename = "students.xlsx"


    workbook = Workbook()

    sheet = workbook.active

    sheet.title = "Students"


    sheet.append([

        "ID",

        "Name",

        "Course",

        "Year"

    ])


    for student in students:

        sheet.append([

            student.id,

            student.name,

            student.course,

            student.year

        ])


    workbook.save(

        filename

    )


    return FileResponse(

        filename,

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        filename="students.xlsx"

    )
@app.get("/protected")

def protected_route(

    email: str = Depends(

        get_current_user

    )

):

    return {

        "message":

        f"Welcome {email}"

    }
@app.get("/download-report")

def download_report(

    db: Session = Depends(get_db)

):

    filename = "college_report.pdf"



    c = canvas.Canvas(

        filename

    )



    student_count = (

        db.query(User)

        .filter(

            User.role == "student"

        )

        .count()

    )



    teacher_count = (

        db.query(User)

        .filter(

            User.role == "teacher"

        )

        .count()

    )



    c.drawString(

        100,

        800,

        "College ERP Report"

    )



    c.drawString(

        100,

        760,

        f"Students : {student_count}"

    )



    c.drawString(

        100,

        730,

        f"Teachers : {teacher_count}"

    )



    c.save()



    return FileResponse(

        filename,

        media_type=

        "application/pdf",

        filename=filename

    )
@app.get("/download-excel")

def download_excel(

    db: Session = Depends(get_db)

):

    filename = "students.xlsx"



    wb = Workbook()

    ws = wb.active



    ws.append(

        [

            "ID",

            "Name",

            "Email"

        ]

    )



    students = (

        db.query(User)

        .filter(

            User.role == "student"

        )

        .all()

    )



    for s in students:

        ws.append(

            [

                s.id,

                s.name,

                s.email

            ]

        )



    wb.save(

        filename

    )



    return FileResponse(

        filename,

        filename=filename

    )

@app.put(

"/profile/{email}"

)

def update_profile(

email: str,

data: ProfileUpdate,

db: Session = Depends(

get_db

)

):

    user = db.query(

        User

    ).filter(

        User.email == email

    ).first()


    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )


    user.phone = data.phone

    user.address = data.address

    user.dob = data.dob

    user.bio = data.bio


    db.commit()


    return {

        "message":

        "Profile updated"

    }
@app.get(

"/profile/{email}"

)

def get_profile(

email: str,

db: Session = Depends(

get_db

)

):

    user = db.query(

        User

    ).filter(

        User.email == email

    ).first()


    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )


    return {

        "name": user.name,

        "email": user.email,

        "role": user.role,

        "phone": user.phone,

        "address": user.address,

        "dob": user.dob,

        "bio": user.bio,

        "image": user.image

    }
@app.post("/upload-profile-picture")
async def upload_profile_picture(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    os.makedirs("uploads/profile", exist_ok=True)

    filename = f"{current_user.id}_{file.filename}"

    filepath = f"uploads/profile/{filename}"

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    current_user.profile_image = filepath

    db.commit()

    return {
        "message": "Profile picture uploaded",
        "path": filepath
    }
@app.post("/notifications")

def add_notification(

data: NotificationCreate,

db: Session = Depends(get_db)

):

    notification = Notification(

        message=data.message,

        receiver=data.receiver,

        created_at=str(

            datetime.now()

        )

    )


    db.add(

        notification

    )

    db.commit()


    return {

        "message":

        "Notification added"

    }

@app.put("/change-password")

def change_password(

    data: PasswordUpdate,

    db: Session = Depends(get_db)

):


    user = db.query(

        User

    ).filter(

        User.email == data.email

    ).first()


    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )


    valid = pwd_context.verify(

        data.old_password,

        user.password

    )


    if not valid:

        raise HTTPException(

            status_code=400,

            detail="Wrong old password"

        )


    user.password = pwd_context.hash(

        data.new_password

    )


    db.commit()


    return {

        "message":

        "Password updated"

    }
@app.get("/files")

def get_files(

db: Session = Depends(

get_db

)

):

    return db.query(

        File

    ).all()



@app.post("/upload-file")

def upload_file(

file: UploadFile = FastAPIFile(...),

uploader: str = Form(...),

db: Session = Depends(

get_db

)

):


    os.makedirs(

        "uploads",

        exist_ok=True

    )


    filepath = f"uploads/{file.filename}"


    with open(

        filepath,

        "wb"

    ) as buffer:


        copyfileobj(

            file.file,

            buffer

        )


    new_file = File(

        filename=file.filename,

        uploader=uploader,

        uploaded_at=str(

            datetime.now()

        )

    )


    db.add(

        new_file

    )

    db.commit()
    add_activity(
    f"{section} file uploaded"
)

    db.refresh(

        new_file

    )


    return {

        "message":

        "File uploaded"

    }



@app.delete("/files/{file_id}")

def delete_file(

file_id: int,

db: Session = Depends(

get_db

)

):


    file = db.query(

        File

    ).filter(

        File.id == file_id

    ).first()


    if not file:

        raise HTTPException(

            status_code=404,

            detail="File not found"

        )


    filepath = f"uploads/{file.filename}"


    if os.path.exists(

        filepath

    ):

        os.remove(

            filepath

        )


    db.delete(

        file

    )

    db.commit()


    return {

        "message":

        "File deleted"

    }



@app.get("/download/{file_id}")

def download_file(

file_id: int,

db: Session = Depends(

get_db

)

):


    file = db.query(

        File

    ).filter(

        File.id == file_id

    ).first()


    if not file:

        raise HTTPException(

            status_code=404,

            detail="File not found"

        )


    filepath = f"uploads/{file.filename}"


    return FileResponse(

        filepath,

        filename=file.filename

    )
@app.post("/upload-student-excel")

def upload_student_excel(

file: UploadFile = FastAPIFile(...),

db: Session = Depends(get_db)

):


    df = pd.read_excel(

        file.file

    )


    for _, row in df.iterrows():

        student = Student(

            roll_no = str(

                row["roll_no"]

            ),

            name = row["name"],

            email = row["email"],

            course = row["course"],

            semester = str(

                row["semester"]

            ),

            section = row["section"],

            batch = row["batch"],

            father_name = row["father_name"],

            mother_name = row["mother_name"],

            phone = str(

                row["phone"]

            ),

            address = row["address"]

        )


        db.add(

            student

        )


    db.commit()


    return {

        "message":

        "Excel uploaded"

    }
@app.get("/file-statistics")
def file_statistics(db: Session = Depends(get_db)):

    return {
        "students": db.query(FileManager)
                     .filter(FileManager.category=="students")
                     .count(),

        "marks": db.query(FileManager)
                   .filter(FileManager.category=="marks")
                   .count(),

        "attendance": db.query(FileManager)
                        .filter(FileManager.category=="attendance")
                        .count(),

        "timetable": db.query(FileManager)
                       .filter(FileManager.category=="timetable")
                       .count(),

        "calendar": db.query(FileManager)
                      .filter(FileManager.category=="calendar")
                      .count()
    }
@app.get("/file-statistics")
def file_statistics(db: Session = Depends(get_db)):

    return {
        "students": db.query(FileManager)
                     .filter(FileManager.category=="students")
                     .count(),

        "marks": db.query(FileManager)
                   .filter(FileManager.category=="marks")
                   .count(),

        "attendance": db.query(FileManager)
                        .filter(FileManager.category=="attendance")
                        .count(),

        "timetable": db.query(FileManager)
                       .filter(FileManager.category=="timetable")
                       .count(),

        "calendar": db.query(FileManager)
                      .filter(FileManager.category=="calendar")
                      .count()
    }
@app.get("/file-statistics")
def file_statistics(db: Session = Depends(get_db)):

    return {
        "students": db.query(FileManager)
                     .filter(FileManager.category=="students")
                     .count(),

        "marks": db.query(FileManager)
                   .filter(FileManager.category=="marks")
                   .count(),

        "attendance": db.query(FileManager)
                        .filter(FileManager.category=="attendance")
                        .count(),

        "timetable": db.query(FileManager)
                       .filter(FileManager.category=="timetable")
                       .count(),

        "calendar": db.query(FileManager)
                      .filter(FileManager.category=="calendar")
                      .count()
    }
@app.get("/recent-files")
def recent_files(db: Session = Depends(get_db)):

    return (
        db.query(FileManager)
        .order_by(FileManager.id.desc())
        .limit(5)
        .all()
    )
