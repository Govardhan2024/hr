from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
import certifi

# Replace your MongoDB connection string with the correct one
client = AsyncIOMotorClient("mongodb+srv://myAtlasDBUser:Sai123@myatlasclusteredu.qifwasp.mongodb.net/ViyonHr?retryWrites=true&w=majority", tlsCAfile=certifi.where())

# Specify the database
db = client['ViyonHr']  # This is the database name

# Specify the collection
users_collection = db['users']  # This is the collection name
