import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const portfolioAPI = {
  // Get portfolio data
  getPortfolio: async () => {
    try {
      const response = await api.get('/portfolio');
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.detail || 'Failed to fetch portfolio data'
      };
    }
  },

  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.detail || 'Failed to submit contact form'
      };
    }
  },

  // Download resume
  downloadResume: async () => {
    try {
      const response = await api.get('/resume/download', {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'Himraj_Verma_Resume.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return {
        success: true,
        data: { message: 'Resume downloaded successfully' },
        error: null
      };
    } catch (error) {
      console.error('Error downloading resume:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.detail || 'Failed to download resume'
      };
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/');
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'API is not available'
      };
    }
  }
};

export default portfolioAPI;