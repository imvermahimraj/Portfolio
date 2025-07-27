from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")
        return field_schema

# Portfolio Data Models
class HeroData(BaseModel):
    name: str
    title: str
    subtitle: str
    location: str
    phone: str
    email: EmailStr

class AboutData(BaseModel):
    summary: str
    personalStory: str
    philosophy: str
    strengths: List[str]

class SkillCategory(BaseModel):
    title: str
    skills: List[str]

class SkillsData(BaseModel):
    categories: List[SkillCategory]

class ExperienceItem(BaseModel):
    title: str
    company: str
    location: str
    duration: str
    responsibilities: List[str]

class ProjectItem(BaseModel):
    title: str
    description: str
    technologies: List[str]
    achievements: List[str]

class EducationData(BaseModel):
    certifications: List[str]

class InterestItem(BaseModel):
    title: str
    description: str
    icon: str

class InterestsData(BaseModel):
    title: str
    description: str
    items: List[InterestItem]

class HobbyItem(BaseModel):
    title: str
    description: str
    icon: str
    highlight: Optional[str] = None

class HobbiesData(BaseModel):
    title: str
    description: str
    items: List[HobbyItem]

class ContactData(BaseModel):
    email: EmailStr
    phone: str
    location: str
    linkedin: str
    github: str

class Portfolio(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    hero: HeroData
    about: AboutData
    skills: SkillsData
    experience: List[ExperienceItem]
    projects: List[ProjectItem]
    education: EducationData
    interests: InterestsData
    hobbies: HobbiesData
    contact: ContactData
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Contact Form Models
class ContactMessage(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    subject: str
    message: str
    status: str = "new"  # 'new', 'read', 'replied'
    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Resume File Models
class ResumeFile(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    filename: str
    originalName: str
    mimeType: str
    size: int
    filePath: str
    isActive: bool = True
    uploadedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}