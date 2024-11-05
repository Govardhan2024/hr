from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
import certifi


client = AsyncIOMotorClient("mongodb+srv://myAtlasDBUser:Sai123@myatlasclusteredu.qifwasp.mongodb.net/ViyonHr?retryWrites=true&w=majority", tlsCAfile=certifi.where())


db = client['ViyonHr']  

# Specify the collection
users_collection = db['users']  
employees_collection = db['employees']
holidays_collection=db['holidays']
leaves_collection=db['leaves']