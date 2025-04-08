
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const ForecastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedGoals, setSelectedGoals] = useState<ForecastType[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);

  return (
    <ForecastContext.Provider value={{
      selectedGoals,
      setSelectedGoals,
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
