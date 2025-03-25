
import React, { ReactNode, useState } from 'react';
import { Bot, X, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface GoogleSheetsLayoutProps {
  children: ReactNode;
}

const GoogleSheetsLayout: React.FC<GoogleSheetsLayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Extension header */}
      <div className="bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-500 rounded-full mr-2 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-medium">FeatureBox AI</span>
          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Extension</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <button className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            Connected to Sheet
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content area with plugin UI */}
        <div className="flex-1 h-full overflow-auto flex">
          {showSidebar ? (
            <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white shadow-sm flex flex-col h-full">
              <div className="p-3 bg-indigo-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-indigo-500 rounded mr-2 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">FeatureBox AI</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                    onClick={handleToggleSidebar}
                  >
                    <ChevronsLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </div>
          ) : (
            <div className="w-10 border-r border-gray-200 bg-white flex flex-col items-center py-4">
              <button
                className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center hover:bg-indigo-200 transition-colors"
                onClick={handleToggleSidebar}
                title="Open FeatureBox AI"
              >
                <ChevronsRight className="w-5 h-5 text-indigo-600" />
              </button>
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="h-16 border-l border-gray-200"></div>
                <span className="text-xs text-gray-500 rotate-90 origin-center transform whitespace-nowrap">FeatureBox AI</span>
                <div className="h-16 border-l border-gray-200"></div>
              </div>
            </div>
          )}

          {/* This would be where the actual spreadsheet appears */}
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500 max-w-md p-6">
              <Bot className="w-12 h-12 mx-auto mb-4 text-indigo-400 opacity-50" />
              <h3 className="text-xl font-medium mb-2">Connected to Spreadsheet</h3>
              <p className="text-sm">
                FeatureBox AI is analyzing your spreadsheet data. Use the panel on the left to
                configure forecasting settings and view insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSheetsLayout;
