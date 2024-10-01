from pymongo import MongoClient
from bson.objectid import ObjectId

import certifi

client=MongoClient("mongodb+srv://myAtlasDBUser:Sai123@myatlasclusteredu.qifwasp.mongodb.net/gramampayadmin?retryWrites=true&w=majority",tlsCAfile=certifi.where())

db=client.graampayadmin
admin_db = db.users

def get_admin():
    return admin_db