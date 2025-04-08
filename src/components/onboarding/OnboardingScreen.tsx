
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChartBar, Database, Brain } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import GlassMorphCard from '../ui/GlassMorphCard';
import { staggerContainer, staggerItem } from '@/utils/transitions';
import { useForecast, ForecastType } from '@/context/ForecastContext';
import { toast } from 'sonner';

const tasks = [
  {
    id: 'data-insights',
    title: 'Data Insights',
    description: 'Explore your sales and inventory data.',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    id: 'demand-forecasting',
    title: 'Demand Forecasting',
    description: 'Generate forecast for your upcoming periods.',
    icon: <ChartBar className="w-6 h-6" />,
    color: 'bg-purple-50 text-purple-500',
  },
  {
    id: 'decision-making',
    title: 'Decision Making',
    description: 'Optimize reorder quantities based on forecast.',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-green-50 text-green-500',
  },
];

const businessTypes = ['Apparel', 'Beauty', 'Electronics', 'Food & Beverage', 'Home Goods', 'Other'];
const productLifecycles = ['Seasonal', 'Evergreen', 'Short Lifecycle'];
const forecastingGoals = ['Replenishment', 'New Product Launch', 'Promotions', 'Inventory Optimization'];

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedGoals, setSelectedGoals } = useForecast();
  
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState('');
  const [productLifecycle, setProductLifecycle] = useState('');
  const [shopifyPercent, setShopifyPercent] = useState('');
  const [wholesalePercent, setWholesalePercent] = useState('');

  useEffect(() => {
    console.log("OnboardingScreen - selectedGoals after setting:", selectedGoals);
  }, [selectedGoals]);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const handleGoalToggle = (goal: string) => {
    const goalAsForecastType = goal as ForecastType;
    // Set the selectedGoals to a single-element array
    setSelectedGoals([goalAsForecastType]);
    console.log("Selected goal:", goalAsForecastType);
  };


  const handleContinue = () => {
    if (isFormValid()) {
      // Log the selected goals before navigation
      console.log("Selected goals before navigation:", selectedGoals);
      toast.success('Forecast settings saved successfully!');
      navigate('/data-source');
    } else {
      toast.error('Please fill out all required fields');
    }
  };

  const isFormValid = () => {
    return (
      selectedTask && 
      businessType && 
      productLifecycle && 
      selectedGoals.length > 0
    );
  };

  return (
    <div className="container max-w-5xl px-4 py-12 mx-auto">
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Your Demand Forecasting Add-On</h1>
        <p className="text-lg text-gray-600">Get started by selecting your primary activity and telling us about your business.</p>
      </motion.div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">What would you like to do today?</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {tasks.map((task, index) => (
            <motion.div key={task.id} variants={staggerItem}>
              <AnimatedCard
                className={`h-full ${selectedTask === task.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleTaskSelect(task.id)}
                delay={index * 0.1}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 ${task.color} rounded-full flex items-center justify-center mb-4`}>
                    {task.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{task.title}</h3>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <GlassMorphCard className="mb-12" hover={false}>
        <h2 className="text-xl font-semibold mb-6">Tell us about your business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
              <option value="">Select business type</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Lifecycle</label>
            <div className="flex flex-wrap gap-2">
              {productLifecycles.map(cycle => (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setProductLifecycle(cycle)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    productLifecycle === cycle 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sales Channel Split (%)</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Shopify</label>
                <input
                  type="number"
                  value={shopifyPercent}
                  onChange={(e) => setShopifyPercent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="e.g. 60"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Wholesale</label>
                <input
                  type="number"
                  value={wholesalePercent}
                  onChange={(e) => setWholesalePercent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="e.g. 40"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Forecasting Goals</label>
            <div className="flex flex-wrap gap-2">
              {forecastingGoals.map(goal => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalToggle(goal)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedGoals.includes(goal as ForecastType) 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassMorphCard>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`btn-primary ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormValid()}
          onClick={handleContinue}
        >
          Continue to Data Source
        </motion.button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
