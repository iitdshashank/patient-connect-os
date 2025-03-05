
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  FileText, 
  ScanSearch, 
  Database, 
  CheckCircle2,
  ScrollText
} from 'lucide-react';

const ProcessingAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  
  useEffect(() => {
    // Progress through the steps
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < totalSteps) {
          return prevStep + 1;
        }
        return prevStep;
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);
  
  const steps = [
    {
      icon: FileText,
      title: "Retrieving EHR Data",
      description: "Accessing patient records and clinical notes from the secure database."
    },
    {
      icon: ScanSearch,
      title: "Breaking Down Data into Chunks",
      description: "Using advanced NLP to segment patient data for optimal processing."
    },
    {
      icon: Database,
      title: "Searching Clinical Trial Database",
      description: "Examining thousands of trials across global databases for potential matches."
    },
    {
      icon: ScrollText,
      title: "Compiling Trial Results",
      description: "Ranking trials based on eligibility match score and relevance."
    }
  ];
  
  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <div className="w-20 h-20 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mx-auto mb-6 pulse-glow">
        <Sparkles size={32} />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">TrialLM™ in Action</h2>
      <p className="text-gray-600 mb-12 max-w-md mx-auto">
        Our proprietary AI is analyzing patient data and matching against clinical trials in real-time.
      </p>
      
      <div className="space-y-12 max-w-lg mx-auto">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep >= index;
          const isComplete = currentStep > index;
          const isProcessing = currentStep === index;
          
          return (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute h-12 w-0.5 bg-gray-200 left-1/2 transform -translate-x-1/2 top-full`}
                >
                  <div 
                    className={`w-full bg-trialos-blue transition-all duration-1000 ease-out origin-top`}
                    style={{ 
                      height: isComplete ? '100%' : '0%'
                    }}
                  ></div>
                </div>
              )}
              
              <div 
                className={`flex items-center transition-all duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="flex-shrink-0 relative">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-trialos-blue text-white' 
                        : 'bg-gray-100 text-gray-400'
                    } ${isProcessing ? 'animate-pulse' : ''}`}
                  >
                    {isComplete ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <StepIcon size={24} />
                    )}
                  </div>
                  {isProcessing && (
                    <div className="absolute -inset-1 rounded-full border-2 border-trialos-blue animate-ping opacity-20"></div>
                  )}
                </div>
                
                <div className="ml-4 text-left">
                  <h3 className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={`mt-12 transition-opacity duration-1000 ${currentStep === totalSteps ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center space-y-4">
          <CheckCircle2 size={36} className="mx-auto text-green-500" />
          <h3 className="text-xl font-semibold text-gray-800">Processing Complete!</h3>
          <p className="text-gray-600">Trial matching results are ready to view.</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
