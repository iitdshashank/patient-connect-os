
import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Upload, 
  Database, 
  ArrowRight,
  CheckCircle2,
  FilePlus2
} from 'lucide-react';

// Step component for patient onboarding process
const OnboardingStep: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
  onClick: () => void;
}> = ({ title, description, icon, active, completed, onClick }) => {
  return (
    <div 
      className={`
        p-5 rounded-xl border transition-all duration-300 cursor-pointer
        ${active ? 'border-trialos-blue shadow-soft bg-white' : 'border-border bg-white/60'} 
        ${completed ? 'border-green-500 bg-green-50/50' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`
          p-3 rounded-lg mr-4
          ${completed ? 'bg-green-100 text-green-600' : active ? 'bg-trialos-blue/10 text-trialos-blue' : 'bg-gray-100 text-gray-500'}
        `}>
          {completed ? <CheckCircle2 size={24} /> : icon}
        </div>
        <div>
          <h3 className={`font-semibold ${completed ? 'text-green-600' : active ? 'text-trialos-blue' : 'text-gray-700'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          {active && !completed && (
            <button className="mt-4 btn-primary rounded-lg px-4 py-2 flex items-center text-sm">
              <span>Continue</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          )}
          
          {completed && (
            <span className="text-sm text-green-600 font-medium mt-2 inline-block">Completed</span>
          )}
        </div>
      </div>
    </div>
  );
};

const PatientCard: React.FC<{
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  status: 'consented' | 'pending' | 'matched';
  onClick: () => void;
}> = ({ id, name, age, diagnosis, status, onClick }) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'consented':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Consented</span>;
      case 'pending':
        return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">Consent Pending</span>;
      case 'matched':
        return <span className="text-xs px-2 py-1 rounded-full bg-trialos-blue/20 text-trialos-blue">Trial Matched</span>;
    }
  };
  
  return (
    <div 
      className="glass-panel rounded-xl p-5 cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-500">Patient ID: {id}</p>
          <h3 className="font-semibold text-gray-800 mt-1">{name}</h3>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Age</p>
          <p className="font-medium">{age} years</p>
        </div>
        <div>
          <p className="text-gray-500">Diagnosis</p>
          <p className="font-medium">{diagnosis}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-end">
        <button className="text-sm text-trialos-blue font-medium flex items-center">
          <span>View Details</span>
          <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

const FindTrial: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };
  
  const onboardingSteps = [
    {
      title: "Add Patient",
      description: "Add a new patient to your system",
      icon: <UserPlus size={24} />
    },
    {
      title: "Import from EHR",
      description: "Connect to your EHR system to import patient data",
      icon: <Database size={24} />
    },
    {
      title: "Upload Documents",
      description: "Upload patient documents and reports",
      icon: <Upload size={24} />
    },
    {
      title: "Create Profile",
      description: "Complete the patient profile for matching",
      icon: <FilePlus2 size={24} />
    }
  ];
  
  const patients = [
    {
      id: "PT-12845",
      name: "Sarah Johnson",
      age: 54,
      diagnosis: "Breast Cancer (HER2+)",
      status: 'consented' as const
    },
    {
      id: "PT-10592",
      name: "Robert Lee",
      age: 67,
      diagnosis: "NSCLC",
      status: 'matched' as const
    },
    {
      id: "PT-11438",
      name: "Michael Chen",
      age: 42,
      diagnosis: "Colorectal Cancer",
      status: 'pending' as const
    },
    {
      id: "PT-13501",
      name: "Emma Williams",
      age: 36,
      diagnosis: "Ovarian Cancer",
      status: 'consented' as const
    }
  ];
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Trial Matching
        </div>
        <h1 className="text-3xl font-bold text-trialos-blue">Find a Trial</h1>
        <p className="text-gray-600 mt-2">Match your patients with suitable clinical trials using our TrialLM AI technology</p>
      </div>
      
      {/* Patient list and onboarding */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel - Patient list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Your Patients</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue"
                />
              </div>
              <button className="btn-primary rounded-lg px-4 py-2 flex items-center">
                <UserPlus size={18} className="mr-2" />
                Add Patient
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                {...patient}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
        
        {/* Right panel - Patient onboarding */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Patient Onboarding</h2>
          <p className="text-sm text-gray-600">Follow these steps to onboard a new patient for trial matching</p>
          
          <div className="space-y-3 mt-6">
            {onboardingSteps.map((step, index) => (
              <OnboardingStep
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                active={activeStep === index}
                completed={completedSteps.includes(index)}
                onClick={() => handleStepClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Trial matching section */}
      <div className="glass-panel rounded-xl p-6 border-t-4 border-trialos-blue">
        <div className="flex items-start mb-6">
          <div className="p-3 rounded-lg bg-trialos-blue/10 text-trialos-blue mr-4">
            <Search size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Advanced Trial Matching</h2>
            <p className="text-gray-600 mt-1">
              Our TrialLM algorithm analyzes patient data to find the most suitable clinical trials.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white/80 rounded-lg p-5 border border-border">
            <h3 className="font-medium text-trialos-blue mb-3">How It Works</h3>
            <ol className="space-y-3">
              {[
                "Select a patient with complete profile data and consent",
                "Our TrialLM engine analyzes the patient data against trial criteria",
                "Review matching trials ranked by suitability and eligibility"
              ].map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="bg-trialos-blue text-white rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-medium mb-3">Ready to Match?</h3>
              <p className="text-sm text-white/80 mb-4">
                Select a consented patient to start matching with appropriate clinical trials
              </p>
            </div>
            <button className="bg-white text-trialos-blue rounded-lg px-4 py-2 font-medium hover:bg-trialos-light transition-colors">
              Start Matching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTrial;
