from motor.motor_asyncio import AsyncIOMotorClient
from models import Portfolio, ContactMessage, ResumeFile
import os
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database setup
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
portfolio_collection = db.portfolio
contacts_collection = db.contacts
resume_collection = db.resumes

async def get_portfolio_data():
    """Get the portfolio data from database"""
    portfolio = await portfolio_collection.find_one({})
    if portfolio:
        return Portfolio(**portfolio)
    return None

async def create_or_update_portfolio(portfolio_data: dict):
    """Create or update portfolio data"""
    existing = await portfolio_collection.find_one({})
    
    portfolio_data['updatedAt'] = datetime.utcnow()
    
    if existing:
        # Update existing portfolio
        result = await portfolio_collection.replace_one(
            {"_id": existing["_id"]}, 
            portfolio_data
        )
        if result.modified_count:
            return await get_portfolio_data()
    else:
        # Create new portfolio
        portfolio_data['createdAt'] = datetime.utcnow()
        result = await portfolio_collection.insert_one(portfolio_data)
        if result.inserted_id:
            return await get_portfolio_data()
    
    return None

async def save_contact_message(contact_data: dict):
    """Save contact message to database"""
    contact_data['createdAt'] = datetime.utcnow()
    result = await contacts_collection.insert_one(contact_data)
    
    if result.inserted_id:
        saved_message = await contacts_collection.find_one({"_id": result.inserted_id})
        return ContactMessage(**saved_message)
    return None

async def get_contact_messages():
    """Get all contact messages"""
    messages = await contacts_collection.find({}).sort("createdAt", -1).to_list(1000)
    return [ContactMessage(**msg) for msg in messages]

async def save_resume_file(file_data: dict):
    """Save resume file info to database"""
    # Mark all other files as inactive
    await resume_collection.update_many(
        {"isActive": True}, 
        {"$set": {"isActive": False}}
    )
    
    # Save new file as active
    file_data['uploadedAt'] = datetime.utcnow()
    result = await resume_collection.insert_one(file_data)
    
    if result.inserted_id:
        saved_file = await resume_collection.find_one({"_id": result.inserted_id})
        return ResumeFile(**saved_file)
    return None

async def get_active_resume():
    """Get the active resume file"""
    resume = await resume_collection.find_one({"isActive": True})
    if resume:
        return ResumeFile(**resume)
    return None