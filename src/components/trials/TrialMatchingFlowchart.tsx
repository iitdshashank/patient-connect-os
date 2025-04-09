
import React from 'react';
import { UserPlus, Users, FileSearch, Brain, ListChecks, Heart } from 'lucide-react';

const TrialMatchingFlowchart: React.FC = () => {
  const steps = [
    { 
      id: 1, 
      title: "Add Patient", 
      icon: <UserPlus size={24} className="text-white" />,
      description: "Add a patient and get their consent"
    },
    { 
      id: 2, 
      title: "Select Patient", 
      icon: <Users size={24} className="text-white" />,
      description: "Choose a consented patient from your list"
    },
    { 
      id: 3, 
      title: "Review Data", 
      icon: <FileSearch size={24} className="text-white" />,
      description: "Select which clinical data to include"
    },
    { 
      id: 4, 
      title: "AI Processing", 
      icon: <Brain size={24} className="text-white" />,
      description: "Our TrialLM™ analyzes patient data"
    },
    { 
      id: 5, 
      title: "View Matches", 
      icon: <ListChecks size={24} className="text-white" />,
      description: "Review ranked trial matches with scores"
    },
    { 
      id: 6, 
      title: "Connect", 
      icon: <Heart size={24} className="text-white" />,
      description: "Request trial enrollment for your patient"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-trialos-blue/20">
      <h3 className="text-lg font-semibold text-trialos-blue mb-4 flex items-center">
        <Users size={20} className="mr-2" />
        Trial Matchmaking Process
      </h3>
      
      <div className="relative">
        {/* Horizontal layout with connecting lines */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 relative overflow-x-auto pb-4">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-[52px] right-[52px] top-[36px] h-0.5 bg-gradient-to-r from-trialos-blue via-trialos-teal to-green-400 z-0"></div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 min-w-[140px] flex flex-col items-center relative z-10">
              <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 mb-3">
                <div className="w-14 h-14 rounded-full bg-trialos-blue text-white flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              
              <div className="text-center max-w-[140px] mx-auto">
                <h4 className="font-medium text-gray-800 flex flex-wrap items-center justify-center mb-1">
                  <span className="text-xs bg-trialos-blue/10 text-trialos-blue px-2 py-0.5 rounded-full mr-1 mb-1 md:mb-0">Step {step.id}</span>
                  <span>{step.title}</span>
                </h4>
                <p className="text-gray-600 text-xs">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 bg-trialos-blue/5 p-3 rounded-lg">
        The entire process takes only a few minutes and leverages our proprietary AI technology to provide the most accurate trial matches for your patients.
      </div>
    </div>
  );
};

export default TrialMatchingFlowchart;
