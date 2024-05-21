from app.config import engine, Base, SessionLocal
from sqlalchemy import Column,String,Integer,Boolean,Float,Double,DateTime
from datetime import datetime, time
from sqlalchemy.orm import relationship
from pydantic import BaseModel


class Hscode(Base):
    __tablename__="hs_code"
    id=Column(Integer,primary_key=True,index=True)
    heading = Column(String(255),unique=False,index=True)
    hs_code = Column(String(255),unique=False,index=True)
    description = Column(String(255),unique=False,index=True)
    cd = Column(Float,unique=False,index=True)
    sd = Column(Float,unique=False,index=True)
    vat = Column(Float,unique=False,index=True)
    ait = Column(Float,unique=False,index=True)
    rd = Column(Float,unique=False,index=True)
    at = Column(Float,unique=False,index=True)
    tti = Column(Float,unique=False,index=True)
    service_schedule = Column(String(255),unique=False,index=True)
    schedule = Column(String(255),unique=False,index=True)
    vat_type = Column(Integer,unique=False,index=True)
    type = Column(Integer,unique=False,index=True)
    year_start = Column(DateTime,unique=False,index=True)
    year_end = Column(DateTime,unique=False,index=True)
    calculate_year = Column(DateTime,unique=False,index=True)
    keycode = Column(String(255),unique=False,index=True)
    created_at = Column(DateTime,index=True, default=datetime.utcnow())


    

Base.metadata.create_all(bind=engine)

class HscodeCreateSchema(BaseModel):
    heading:str
    hs_code:str
    description:str
    cd:float
    sd:float
    vat:float
    ait:float
    rd:float
    at:float
    tti:float
    service_schedule:str
    schedule:str
    vat_type:int
    type:int
    year_start:datetime
    year_end:datetime
    calculate_year:datetime
    keycode:str
    
  
    
    class Config:
        from_attributes = True

class HscodeSchema(BaseModel):
    id:int
    heading:str
    hs_code:str
    description:str
    cd:float
    sd:float
    vat:float
    ait:float
    rd:float
    at:float
    tti:float
    service_schedule:str
    schedule:str
    vat_type:int
    type:int
    year_start:datetime
    year_end:datetime
    calculate_year:datetime
    keycode:str
    created_at:datetime

    class Config:
        from_attributes = True