
import React from 'react';
import { Users, UserPlus, FileSearch, Brain, ListChecks, Heart } from 'lucide-react';

const TrialMatchingFlowchart: React.FC = () => {
  const steps = [
    { 
      id: 1, 
      title: "Add Patient", 
      icon: <UserPlus size={24} className="text-trialos-blue" />,
      description: "Add a patient and get their consent"
    },
    { 
      id: 2, 
      title: "Select Patient", 
      icon: <Users size={24} className="text-trialos-blue" />,
      description: "Choose a consented patient from your list"
    },
    { 
      id: 3, 
      title: "Review Data", 
      icon: <FileSearch size={24} className="text-trialos-blue" />,
      description: "Select which clinical data to include"
    },
    { 
      id: 4, 
      title: "AI Processing", 
      icon: <Brain size={24} className="text-trialos-blue" />,
      description: "Our TrialLM™ analyzes patient data"
    },
    { 
      id: 5, 
      title: "View Matches", 
      icon: <ListChecks size={24} className="text-trialos-blue" />,
      description: "Review ranked trial matches with scores"
    },
    { 
      id: 6, 
      title: "Connect", 
      icon: <Heart size={24} className="text-trialos-blue" />,
      description: "Request trial enrollment for your patient"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-trialos-blue/20">
      <h3 className="text-lg font-semibold text-trialos-blue mb-4 flex items-center">
        <Users size={20} className="mr-2" />
        Trial Matchmaking Process
      </h3>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[36px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-trialos-blue via-trialos-teal to-green-400 z-0"></div>
        
        {/* Steps */}
        <div className="relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start mb-6 last:mb-0">
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100">
                <div className={`w-14 h-14 rounded-full ${index === 0 ? 'bg-trialos-blue' : 'bg-gradient-to-br from-trialos-blue to-trialos-teal opacity-80'} text-white flex items-center justify-center`}>
                  {step.icon}
                </div>
              </div>
              
              <div className="ml-4 pt-3">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <span className="text-xs bg-trialos-blue/10 text-trialos-blue px-2 py-0.5 rounded-full mr-2">Step {step.id}</span>
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 bg-trialos-blue/5 p-3 rounded-lg">
        The entire process takes only a few minutes and leverages our proprietary AI technology to provide the most accurate trial matches for your patients.
      </div>
    </div>
  );
};

export default TrialMatchingFlowchart;
