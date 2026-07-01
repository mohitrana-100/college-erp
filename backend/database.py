from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from urllib.parse import quote_plus

password = quote_plus("MOHITrana@900")

DATABASE_URL = f"mysql+pymysql://root:{password}@localhost:3306/college_erp"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()