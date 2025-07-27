from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from starlette.middleware.cors import CORSMiddleware
from models import Portfolio, ContactMessageCreate, ContactMessage
from database import (
    get_portfolio_data, create_or_update_portfolio, 
    save_contact_message, get_contact_messages,
    save_resume_file, get_active_resume
)
import os
import logging
from pathlib import Path
import uuid
from datetime import datetime
import shutil

ROOT_DIR = Path(__file__).parent
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Create the main app without a prefix
app = FastAPI(title="Himraj's Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Portfolio endpoints
@api_router.get("/", summary="Health Check")
async def root():
    return {"message": "Portfolio API is running!", "status": "healthy"}

@api_router.get("/portfolio", response_model=Portfolio, summary="Get Portfolio Data")
async def get_portfolio():
    """Get complete portfolio data"""
    try:
        portfolio = await get_portfolio_data()
        if not portfolio:
            # If no portfolio data exists, seed it first
            from seed_data import seed_portfolio
            success = await seed_portfolio()
            if success:
                portfolio = await get_portfolio_data()
            else:
                raise HTTPException(status_code=500, detail="Failed to initialize portfolio data")
        
        return portfolio
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/portfolio", response_model=Portfolio, summary="Update Portfolio Data")
async def update_portfolio(portfolio_data: Portfolio):
    """Update portfolio data (admin only - for future use)"""
    try:
        updated_portfolio = await create_or_update_portfolio(portfolio_data.dict(exclude={"id"}))
        if not updated_portfolio:
            raise HTTPException(status_code=500, detail="Failed to update portfolio")
        
        return updated_portfolio
    except Exception as e:
        logger.error(f"Error updating portfolio: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Contact form endpoints
@api_router.post("/contact", response_model=ContactMessage, summary="Submit Contact Form")
async def submit_contact_form(contact_data: ContactMessageCreate):
    """Submit contact form message"""
    try:
        # Basic validation
        if len(contact_data.message.strip()) < 10:
            raise HTTPException(status_code=400, detail="Message must be at least 10 characters long")
        
        # Save to database
        saved_message = await save_contact_message(contact_data.dict())
        if not saved_message:
            raise HTTPException(status_code=500, detail="Failed to save contact message")
        
        logger.info(f"New contact message from {contact_data.email}: {contact_data.subject}")
        return saved_message
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact", response_model=list[ContactMessage], summary="Get Contact Messages")
async def get_contact_messages_endpoint():
    """Get all contact messages (admin only - for future use)"""
    try:
        messages = await get_contact_messages()
        return messages
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Resume endpoints
@api_router.post("/resume/upload", summary="Upload Resume File")
async def upload_resume(file: UploadFile = File(...)):
    """Upload resume file (admin only - for future use)"""
    try:
        # Validate file type
        allowed_types = ["application/pdf", "application/msword", 
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Only PDF and Word documents are allowed")
        
        # Validate file size (10MB limit)
        file_size = 0
        content = await file.read()
        file_size = len(content)
        
        if file_size > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(status_code=400, detail="File size too large (max 10MB)")
        
        # Generate unique filename
        file_extension = Path(file.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(content)
        
        # Save to database
        file_data = {
            "filename": unique_filename,
            "originalName": file.filename,
            "mimeType": file.content_type,
            "size": file_size,
            "filePath": str(file_path)
        }
        
        saved_file = await save_resume_file(file_data)
        if not saved_file:
            # Clean up file if database save failed
            if file_path.exists():
                file_path.unlink()
            raise HTTPException(status_code=500, detail="Failed to save file info")
        
        logger.info(f"Resume uploaded: {file.filename}")
        return {"message": "Resume uploaded successfully", "filename": unique_filename}
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/resume/download", summary="Download Resume")
async def download_resume():
    """Download the active resume file"""
    try:
        resume_file = await get_active_resume()
        if not resume_file:
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        file_path = Path(resume_file.filePath)
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Resume file not found on disk")
        
        logger.info(f"Resume downloaded: {resume_file.originalName}")
        return FileResponse(
            path=file_path,
            filename=resume_file.originalName,
            media_type=resume_file.mimeType
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Initialize application on startup"""
    logger.info("Portfolio API starting up...")
    
    # Seed portfolio data if not exists
    try:
        portfolio = await get_portfolio_data()
        if not portfolio:
            from seed_data import seed_portfolio
            await seed_portfolio()
            logger.info("Portfolio data initialized")
    except Exception as e:
        logger.error(f"Error initializing portfolio data: {str(e)}")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    logger.info("Portfolio API shutting down...")
    # Database client will be closed automatically by motor