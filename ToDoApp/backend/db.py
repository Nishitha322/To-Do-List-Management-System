from pymongo import MongoClient
import certifi

client = MongoClient(
    "mongodb+srv://nichithasree2006_db_user:nishitha%40223@cluster0.jaxdilz.mongodb.net/",
    tlsCAFile=certifi.where()
)

db = client["TodoDB"]
tasks_collection = db["tasks"]
