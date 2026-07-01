from sqlalchemy import Column, Integer, String

from database import Base


# -----------------------------------
# User Table
# -----------------------------------

class User(Base):

    __tablename__ = "users"
    
    


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    name = Column(

        String(100)

    )


    email = Column(

        String(100),

        unique=True

    )


    password = Column(

        String(255)

    )


    role = Column(

        String(20)

    )


    phone = Column(

        String(20),

        nullable=True

    )


    address = Column(

        String(300),

        nullable=True

    )


    dob = Column(

        String(30),

        nullable=True

    )


    bio = Column(

        String(500),

        nullable=True

    )


    image = Column(

        String(300),

        nullable=True

    )

# -----------------------------------
# Student Table
# -----------------------------------

class Student(Base):

    __tablename__ = "students"
    profile_image = Column(String, nullable=True)

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    roll_no = Column(
        String(50),
        unique=True
    )

    name = Column(
        String(100)
    )
    

    email = Column(
        String(100),
        unique=True
    )

    course = Column(
        String(100)
    )

    semester = Column(
        String(30)
    )

    section = Column(
        String(30)
    )

    batch = Column(
        String(30)
    )

    father_name = Column(
        String(100)
    )

    mother_name = Column(
        String(100)
    )

    phone = Column(
        String(20)
    )

    address = Column(
        String(300)
    )
    department = Column(
    String(100)
)

year = Column(
    Integer
)



gender = Column(
    String(20)
)

dob = Column(
    String(30)
)

blood_group = Column(
    String(10)
)

image = Column(
        String(300),
        nullable=True
    )
# -----------------------------------
# Teacher Table
# -----------------------------------

class Teacher(Base):

    __tablename__ = "teachers"


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    name = Column(

        String(100)

    )


    subject = Column(

        String(100)

    )


    department = Column(

        String(100)

    )


# -----------------------------------
# Attendance Table
# -----------------------------------

class Attendance(Base):

    __tablename__ = "attendance"


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    student_name = Column(

        String(100)

    )


    subject = Column(

        String(100)

    )


    status = Column(

        String(20)

    )


# -----------------------------------
# Notification Table
# -----------------------------------

class Notification(Base):

    __tablename__ = "notifications"


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    message = Column(

        String(500)

    )


    receiver = Column(

        String(100)

    )


    created_at = Column(

        String(100)

    )
class File(Base):

    __tablename__ = "files"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(
        String(300)
    )

    uploader = Column(
        String(100)
    )

    uploaded_at = Column(
        String(100)
    )
class FileManager(Base):

    __tablename__="file_manager"

    id=Column(

        Integer,

        primary_key=True,

        index=True

    )

    title=Column(

        String(200)

    )

    filename=Column(

        String(300)

    )

    category=Column(

        String(50)

    )

    uploaded_by=Column(

        String(100)

    )

    created_at=Column(

        String(100)

    )