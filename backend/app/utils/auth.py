# from fastapi import HTTPException, Depends
# from fastapi.security import HTTPBasic, HTTPBasicCredentials

# security = HTTPBasic()

# def authenticate_user(credentials: HTTPBasicCredentials = Depends(security)):
#     correct_username = "admin"
#     correct_password = "secret"

#     if credentials.username != correct_username or credentials.password != correct_password:
#         raise HTTPException(
#             status_code=401,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Basic"},
#         )

#     return credentials.username
