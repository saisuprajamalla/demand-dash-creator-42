import React, { useState, useEffect } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForecast } from '@/context/ForecastContext';

interface FileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileUploadDialog: React.FC<FileUploadDialogProps> = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const { 
    setUploadedFile,
    selectedGoals,
    uploadStatus, 
    setUploadStatus,
    setUploadError,
    uploadedFile 
  } = useForecast();

  useEffect(() => {
    console.log("FileUploadDialog - Component mounted");
    console.log("FileUploadDialog - selectedGoals:", selectedGoals);
    console.log("FileUploadDialog - localStorage value:", localStorage.getItem('forecastGoals'));
    console.log("FileUploadDialog - window.selectedGoals:", window.selectedGoals);
  }, []);

  useEffect(() => {
    console.log("FileUploadDialog - selectedGoals updated:", selectedGoals);
  }, [selectedGoals]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type !== 'text/csv') {
      toast.error('Please upload a CSV file');
      return;
    }
    
    setUploadStatus('uploading');
    setUploadedFile(file);

    // Simulate API upload
    uploadFileToAPI(file)
      .then(() => {
        setUploadStatus('success');
        toast.success('File uploaded successfully');
      })
      .catch((error) => {
        setUploadStatus('error');
        setUploadError(error.message);
        toast.error(`Upload failed: ${error.message}`);
      });
  };

  // Get the selected forecast type with safer implementation
  const getSelectedForecastType = () => {
    // First check context
    if (selectedGoals && selectedGoals.length > 0) {
      return selectedGoals[0];
    }
    
    // If not in context, check localStorage directly as fallback
    try {
      const savedGoals = localStorage.getItem('forecastGoals');
      if (savedGoals) {
        const parsed = JSON.parse(savedGoals);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0];
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage forecast goals:", error);
    }
    
    // Check window object
    if (window.selectedGoals && window.selectedGoals.length > 0) {
      return window.selectedGoals[0];
    }
    
    // Last fallback to debug value if available
    const debugValue = localStorage.getItem('debug_selectedGoal');
    if (debugValue) {
      return debugValue;
    }
    
    // Final fallback
    return 'Default';
  };

  // Mock API call function that includes the selected forecast type
  const uploadFileToAPI = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Get the current forecast type from context or localStorage
        const forecastType = getSelectedForecastType();
        
        console.log('Uploading file to API:', {
          fileName: file.name,
          fileSize: file.size,
          forecastType, // This will be sent in the request body
        });
        
        // This is where you would construct a FormData object in a real implementation
        const formData = new FormData();
        formData.append('file', file);
        formData.append('forecastType', forecastType);
        
        // Example of how you might call a real API
        // const response = await fetch('https://your-fastapi-url.com/upload', {
        //   method: 'POST',
        //   body: formData,
        // });
        
        // Simulate API call success (95% of the time)
        if (Math.random() > 0.05) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 1500); // Simulate network delay
    });
  };

  // Reset the file input when dialog is opened
  const handleDialogOpen = (open: boolean) => {
    // If the dialog is being closed and we're not in the middle of uploading
    if (!open && uploadStatus !== 'uploading') {
      onClose();
    }
  };

  const handleRetry = () => {
    setUploadStatus('idle');
    setUploadedFile(null);
    setUploadError(null);
  };

  // Debug div
  const debugDiv = (
    <div className="mt-4 p-2 bg-gray-100 rounded-md text-xs">
      <p><strong>Selected Goals:</strong> {JSON.stringify(selectedGoals)}</p>
      <p><strong>localStorage:</strong> {localStorage.getItem('forecastGoals')}</p>
      <p><strong>getSelectedForecastType():</strong> {getSelectedForecastType()}</p>
      <p><strong>window.selectedGoals:</strong> {JSON.stringify(window.selectedGoals)}</p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload CSV File</DialogTitle>
          <DialogDescription>
            Upload your sales data as a CSV file to generate accurate forecasts.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {uploadStatus === 'uploading' ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-3"></div>
                <p className="text-sm font-medium">Uploading file...</p>
              </div>
            ) : uploadStatus === 'success' ? (
              <div className="flex flex-col items-center py-4">
                <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                <p className="font-medium mb-2">Upload Complete!</p>
                <div className="flex items-center p-2 bg-gray-50 rounded-md">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm truncate max-w-[200px]">
                    {uploadedFile?.name}
                  </span>
                </div>
                <p className="text-sm mt-2 font-medium">
                  Forecast Type: <span className="text-primary">{getSelectedForecastType()}</span>
                </p>
                <Button 
                  onClick={handleRetry} 
                  variant="outline" 
                  className="mt-4"
                >
                  Upload Another File
                </Button>
              </div>
            ) : uploadStatus === 'error' ? (
              <div className="flex flex-col items-center py-4">
                <AlertCircle className="h-12 w-12 text-red-500 mb-3" />
                <p className="font-medium mb-2">Upload Failed</p>
                <Button onClick={handleRetry} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mb-4">CSV files only (max 10MB)</p>
                
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Select CSV File</span>
                  </Button>
                </label>
              </>
            )}
          </div>

          {/* Debug data */}
          {debugDiv}

          <div className="text-xs text-gray-500">
            <p>Your file should include:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Product ID or SKU</li>
              <li>Date (daily or weekly)</li>
              <li>Sales quantity</li>
              <li>Optional: price, cost, lead time</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={uploadStatus === 'uploading'}
          >
            Cancel
          </Button>
          
          <Button 
            variant="default"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
