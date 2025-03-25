
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart3, LineChart, ShoppingCart, ArrowRight } from 'lucide-react';
import GlassMorphCard from '@/components/ui/GlassMorphCard';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [businessType, setBusinessType] = useState('');
  const [productLifecycle, setProductLifecycle] = useState('');
  const [salesChannels, setSalesChannels] = useState({ online: '', offline: '' });
  const [forecastingGoals, setForecastingGoals] = useState({
    replenishment: false,
    newProduct: false,
    promotions: false,
    seasonality: false
  });

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleContinue = () => {
    navigate('/data-source');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="container max-w-5xl mx-auto py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2">Google Sheets Demand Forecasting Add-On</h1>
          <p className="text-lg text-gray-600">Welcome to your intelligent demand forecasting assistant</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div variants={staggerItem}>
            <GlassMorphCard 
              className="h-full"
              onClick={() => handleCardClick('/data-insights')}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-xl font-medium mb-3">Data Insights</h3>
                <p className="text-gray-600">
                  Explore your sales and inventory data to identify trends and patterns.
                </p>
              </div>
            </GlassMorphCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassMorphCard 
              className="h-full"
              onClick={() => handleCardClick('/data-source')}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <LineChart size={28} />
                </div>
                <h3 className="text-xl font-medium mb-3">Demand Forecasting</h3>
                <p className="text-gray-600">
                  Generate forecasts for your upcoming periods based on historical data.
                </p>
              </div>
            </GlassMorphCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <GlassMorphCard 
              className="h-full"
              onClick={() => handleCardClick('/constraints')}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart size={28} />
                </div>
                <h3 className="text-xl font-medium mb-3">Decision Making</h3>
                <p className="text-gray-600">
                  Optimize reorder quantities based on forecasts and business constraints.
                </p>
              </div>
            </GlassMorphCard>
          </motion.div>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-6">Business Context</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="apparel">Apparel</option>
                  <option value="beauty">Beauty</option>
                  <option value="electronics">Electronics</option>
                  <option value="homeGoods">Home Goods</option>
                  <option value="food">Food & Beverage</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Lifecycle</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Seasonal', 'Evergreen', 'Short'].map((type) => (
                    <label 
                      key={type}
                      className={`flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                        productLifecycle === type.toLowerCase() 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name="productLifecycle"
                        value={type.toLowerCase()}
                        checked={productLifecycle === type.toLowerCase()}
                        onChange={(e) => setProductLifecycle(e.target.value)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sales Channel Split (%)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Online</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 60"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={salesChannels.online}
                    onChange={(e) => setSalesChannels({...salesChannels, online: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Offline</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 40"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={salesChannels.offline}
                    onChange={(e) => setSalesChannels({...salesChannels, offline: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Forecasting Goals</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'replenishment', label: 'Replenishment' },
                  { id: 'newProduct', label: 'New Product Launch' },
                  { id: 'promotions', label: 'Promotions' },
                  { id: 'seasonality', label: 'Seasonality' }
                ].map((goal) => (
                  <label 
                    key={goal.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                      forecastingGoals[goal.id as keyof typeof forecastingGoals] 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={forecastingGoals[goal.id as keyof typeof forecastingGoals]}
                      onChange={(e) => setForecastingGoals({...forecastingGoals, [goal.id]: e.target.checked})}
                    />
                    <span className="text-sm">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleContinue}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
