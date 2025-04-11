
import React from 'react';
import { UserPlus, Users, FileSearch, Brain, ListChecks, Heart } from 'lucide-react';

const TrialMatchingFlowchart: React.FC = () => {
  const steps = [
    { 
      id: 1, 
      title: "Add Patient", 
      icon: <UserPlus size={20} className="text-white" />,
      description: "Add a patient and get their consent"
    },
    { 
      id: 2, 
      title: "Select Patient", 
      icon: <Users size={20} className="text-white" />,
      description: "Choose a consented patient from your list"
    },
    { 
      id: 3, 
      title: "Review Data", 
      icon: <FileSearch size={20} className="text-white" />,
      description: "Select which clinical data to include"
    },
    { 
      id: 4, 
      title: "AI Processing", 
      icon: <Brain size={20} className="text-white" />,
      description: "Our TrialLM™ analyzes patient data"
    },
    { 
      id: 5, 
      title: "View Matches", 
      icon: <ListChecks size={20} className="text-white" />,
      description: "Review ranked trial matches with scores"
    },
    { 
      id: 6, 
      title: "Connect", 
      icon: <Heart size={20} className="text-white" />,
      description: "Request trial enrollment for your patient"
    }
  ];

  return (
    <div className="bg-white rounded-md p-4 md:p-5 border border-recule-gray-200 shadow-soft">
      <h3 className="text-base font-semibold text-recule-black mb-4 flex items-center">
        <Users size={18} className="mr-2 text-recule-gray-600" />
        Trial Matchmaking Process
      </h3>
      
      <div className="relative">
        {/* Horizontal layout with connecting lines */}
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-2 relative overflow-x-auto pb-4">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-[40px] right-[40px] top-[32px] h-0.5 bg-recule-gray-200 z-0"></div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 min-w-[130px] flex flex-col items-center relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-sm border border-recule-gray-200 mb-3">
                  <div className="w-12 h-12 rounded-full bg-recule-black text-white flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                
                <div className="text-center max-w-[130px] mx-auto">
                  <h4 className="text-sm font-medium text-recule-black flex flex-wrap items-center justify-center mb-1">
                    <span className="inline-block text-xs bg-recule-gray-100 text-recule-gray-700 px-1.5 py-0.5 rounded-full mr-1 mb-1 md:mb-0">
                      Step {step.id}
                    </span>
                    <span>{step.title}</span>
                  </h4>
                  <p className="text-recule-gray-600 text-xs">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-recule-gray-600 bg-recule-gray-50 p-3 rounded-md">
        The entire process takes only a few minutes and leverages our proprietary AI technology to provide the most accurate trial matches for your patients.
      </div>
    </div>
  );
};

export default TrialMatchingFlowchart;
