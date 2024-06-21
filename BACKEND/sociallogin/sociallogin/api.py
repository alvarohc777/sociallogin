from ninja import NinjaAPI
from api.api import router as api_router

api = NinjaAPI()

api.add_router("login/", api_router, tags=["login"])
