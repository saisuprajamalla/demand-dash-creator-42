
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, LineChart, Beaker, ArrowRight, Bot, LinkIcon } from 'lucide-react';
import GlassMorphCard from '@/components/ui/GlassMorphCard';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import { Button } from '@/components/ui/button';
import AIAnnotation from '@/components/ui/AIAnnotation';
import { getAIInsights } from '@/utils/googleSheetsHelpers';

const Index = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleContinue = () => {
    navigate('/data-source');
  };

  // Get AI insights for demo purposes
  const aiInsights = getAIInsights([]);

  return (
    <div className="overflow-y-auto h-full">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center bg-indigo-50 px-3 py-1 rounded-full mb-2">
          <Bot className="w-4 h-4 text-indigo-600 mr-1" />
          <span className="text-xs font-medium text-indigo-700">AI-Powered Extensions</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight mb-1 flex items-center justify-center">
          <Bot className="w-5 h-5 text-indigo-600 mr-2" />
          FeatureBox AI
        </h1>
        <p className="text-sm text-gray-600">Connect your data & generate accurate forecasts</p>
      </motion.div>

      <AIAnnotation title="AI Assistant">
        <div className="space-y-2">
          <p className="text-sm">Welcome to FeatureBox AI—your smart inventory planning assistant.</p>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>Connected to your spreadsheet data for smart analysis and forecasting</li>
            <li>Pick a focus (e.g., Demand Forecasting), and let us handle the rest</li>
          </ul>
          
          <div className="mt-4 border-t pt-3 border-blue-100">
            <p className="text-sm font-medium mb-2">Follow these steps:</p>
            <ol className="text-sm list-decimal pl-5 space-y-2">
              <li>
                <span className="font-medium">Define Business Context:</span>
                <p className="text-xs text-gray-600 ml-1">Tell us about your product lifecycle, sales channel split, and forecasting goals.</p>
              </li>
              <li>
                <span className="font-medium">Generate Forecast:</span>
                <p className="text-xs text-gray-600 ml-1">Let the AI model analyze patterns and predict future demand.</p>
              </li>
              <li>
                <span className="font-medium">Refine Constraints:</span>
                <p className="text-xs text-gray-600 ml-1">Adjust safety stock, lead times, promotions, and other parameters.</p>
              </li>
              <li>
                <span className="font-medium">Review & Optimize:</span>
                <p className="text-xs text-gray-600 ml-1">See recommended order quantities, stock alerts, and final insights—then export or finalize!</p>
              </li>
            </ol>
          </div>
        </div>
      </AIAnnotation>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <motion.div variants={staggerItem}>
          <GlassMorphCard 
            className="h-full"
            onClick={() => handleCardClick('/data-source')}
          >
            <div className="flex flex-col items-center text-center h-full p-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-base font-medium mb-2">Data Insights</h3>
              <p className="text-xs text-gray-600">
                Explore your sales & inventory to spot patterns.
              </p>
            </div>
          </GlassMorphCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <GlassMorphCard 
            className="h-full"
            onClick={() => handleCardClick('/data-source')}
          >
            <div className="flex flex-col items-center text-center h-full p-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                <LineChart size={20} />
              </div>
              <h3 className="text-base font-medium mb-2">Demand Forecasting</h3>
              <p className="text-xs text-gray-600">
                Generate AI forecasts from historical data.
              </p>
            </div>
          </GlassMorphCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <GlassMorphCard 
            className="h-full"
            onClick={() => handleCardClick('/constraints')}
          >
            <div className="flex flex-col items-center text-center h-full p-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                <Beaker size={20} />
              </div>
              <h3 className="text-base font-medium mb-2">Scenario Analysis</h3>
              <p className="text-xs text-gray-600">
                Test "what-if" constraints or promotions.
              </p>
            </div>
          </GlassMorphCard>
        </motion.div>
      </motion.div>

      <div className="flex justify-end">
        <Button 
          onClick={handleContinue}
          className="flex items-center gap-1 text-sm py-1.5 px-3"
          size="sm"
        >
          Next
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
