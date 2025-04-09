
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Augment the Window interface to include our global property
declare global {
  interface Window {
    selectedGoals?: ForecastType[];
  }
}

export type ForecastType = 'Replenishment' | 'New Product Launch' | 'Promotions' | 'Inventory Optimization';

interface ForecastContextType {
  selectedGoals: ForecastType[];
  setSelectedGoals: React.Dispatch<React.SetStateAction<ForecastType[]>>;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  setUploadStatus: (status: 'idle' | 'uploading' | 'success' | 'error') => void;
  uploadError: string | null;
  setUploadError: (error: string | null) => void;
}

const ForecastContext = createContext<ForecastContextType | undefined>(undefined);

export const useForecast = () => {
  const context = useContext(ForecastContext);
  if (context === undefined) {
    throw new Error('useForecast must be used within a ForecastProvider');
  }
  return context;
};

// Helper function for safe localStorage access
const getStoredGoals = (): ForecastType[] => {
  try {
    const savedGoals = localStorage.getItem('forecastGoals');
    if (savedGoals) {
      const parsed = JSON.parse(savedGoals);
      // Validate that the parsed value is an array
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error parsing stored forecast goals:", error);
  }
  return []; // Return empty array as default
};

export const ForecastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage with a safer implementation
  const [selectedGoals, setSelectedGoals] = useState<ForecastType[]>(getStoredGoals);
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Log context initialization
  useEffect(() => {
    console.log("ForecastProvider initialized - selectedGoals:", selectedGoals);
    console.log("localStorage forecastGoals:", localStorage.getItem('forecastGoals'));
  }, []);

  // Persist selectedGoals to localStorage whenever it changes
  useEffect(() => {
    console.log("ForecastProvider - persisting selectedGoals to localStorage:", selectedGoals);
    if (selectedGoals && selectedGoals.length > 0) {
      localStorage.setItem('forecastGoals', JSON.stringify(selectedGoals));
      // Set a global variable for accessing across components
      window.selectedGoals = selectedGoals;
    }
  }, [selectedGoals]);

  // Create a custom setter function that ensures proper sync with localStorage
  const setSafeSelectedGoals = (goals: ForecastType[] | ((prev: ForecastType[]) => ForecastType[])) => {
    const newGoals = typeof goals === 'function' ? goals(selectedGoals) : goals;
    console.log("Setting goals:", newGoals);
    setSelectedGoals(newGoals);
    // Also set directly to localStorage for redundancy
    localStorage.setItem('forecastGoals', JSON.stringify(newGoals));
    // Update global window property
    window.selectedGoals = newGoals;
  };

  return (
    <ForecastContext.Provider value={{
      selectedGoals,
      setSelectedGoals: setSafeSelectedGoals,
      uploadedFile,
      setUploadedFile,
      uploadStatus,
      setUploadStatus,
      uploadError,
      setUploadError
    }}>
      {children}
    </ForecastContext.Provider>
  );
};
