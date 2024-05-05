from fastapi import FastAPI
from app.config import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_router import auth_router;
from app.routes.user_router import user_router;
from app.routes.unit_router import unit_router;

Base.metadata.create_all(bind=engine)

def include_router(app):
    app.include_router(auth_router)
    app.include_router(user_router)
    app.include_router(unit_router)
    # app.include_router(user_roll_router)
    # app.include_router(user_access_router)
    # app.include_router(customer_router)
    # app.include_router(unit_router)

origins = [
        "http://localhost:5173",
]


def start_application():
    app = FastAPI()
    include_router(app)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app

app = start_application()
