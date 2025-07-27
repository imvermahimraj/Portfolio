import { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';
import { mockData } from '../data/mockData';

export const usePortfolio = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await portfolioAPI.getPortfolio();
      
      if (result.success) {
        setPortfolioData(result.data);
      } else {
        // Fallback to mock data if API fails
        console.warn('API failed, using mock data:', result.error);
        setPortfolioData(mockData);
        setError('Using offline data - some features may be limited');
      }
    } catch (err) {
      // Fallback to mock data on any error
      console.error('Error in fetchPortfolio:', err);
      setPortfolioData(mockData);
      setError('Using offline data - some features may be limited');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return {
    portfolioData,
    loading,
    error,
    refetch: fetchPortfolio
  };
};