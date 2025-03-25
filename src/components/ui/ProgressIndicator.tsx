
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStep, 
  className 
}) => {
  return (
    <div className={cn('flex items-center justify-between w-full my-8', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <motion.div 
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                index < currentStep ? 'bg-primary text-white' : 
                index === currentStep ? 'bg-white border-2 border-primary text-primary' : 
                'bg-white border border-gray-200 text-gray-400'
              )}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index === currentStep ? 1.1 : 1,
                transition: { duration: 0.3 }
              }}
            >
              {index + 1}
            </motion.div>
            <span className={cn(
              'text-xs mt-2 text-center',
              index <= currentStep ? 'text-primary font-medium' : 'text-gray-400'
            )}>
              {step}
            </span>
          </div>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="flex-1 mx-2">
              <div className="h-[2px] bg-gray-200 relative">
                <motion.div 
                  className="absolute inset-0 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: index < currentStep ? 1 : 0,
                    transition: { duration: 0.5, delay: 0.2 }
                  }}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
