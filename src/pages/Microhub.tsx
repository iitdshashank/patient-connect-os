
import React from 'react';
import { Building2, CheckCircle2, ClipboardList, Calendar, Users, Award, Search, FileText, BadgeCheck, FileCheck } from 'lucide-react';

const RegistrationStep: React.FC<{
  title: string;
  description: string;
  completed: boolean;
  number: number;
}> = ({ title, description, completed, number }) => {
  return (
    <div className={`
      p-5 rounded-xl border transition-all duration-300
      ${completed ? 'border-green-500 bg-green-50/50' : 'border-border bg-white/60'}
    `}>
      <div className="flex items-start">
        <div className={`
          w-8 h-8 rounded-full mr-4 flex items-center justify-center flex-shrink-0
          ${completed ? 'bg-green-100 text-green-600' : 'bg-trialos-blue/10 text-trialos-blue'}
        `}>
          {completed ? <CheckCircle2 size={18} /> : <span className="text-sm font-medium">{number}</span>}
        </div>
        <div>
          <h3 className={`font-semibold ${completed ? 'text-green-600' : 'text-gray-800'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          {completed ? (
            <span className="text-xs text-green-600 font-medium mt-3 inline-block">Completed</span>
          ) : (
            <button className="mt-3 text-sm btn-outline rounded-lg px-4 py-1.5">
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TrialCard: React.FC<{
  name: string;
  phase: string;
  sponsor: string;
  location: string;
  status: 'recruiting' | 'active' | 'completed';
  onClick: () => void;
}> = ({ name, phase, sponsor, location, status, onClick }) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Active</span>;
      case 'recruiting':
        return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Recruiting Sites</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Completed</span>;
    }
  };
  
  return (
    <div 
      className="glass-panel rounded-xl p-5 cursor-pointer hover:shadow-md transition-all hover:border-trialos-blue/30"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{phase} • {sponsor}</p>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="mt-4 text-sm">
        <div className="flex items-center text-gray-600">
          <FileText size={16} className="text-trialos-blue mr-2" />
          <span>Located in <strong>{location}</strong></span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-between">
        <div className="text-sm text-gray-500">
          Site application: <span className="text-green-600 font-medium">Open</span>
        </div>
        <button className="text-sm text-trialos-blue font-medium hover:underline">Apply Now</button>
      </div>
    </div>
  );
};

const PatientMatchCard: React.FC<{
  patientName: string;
  patientId: string;
  diagnosis: string;
  trials: { name: string; match: number }[];
  onClick: () => void;
}> = ({ patientName, patientId, diagnosis, trials, onClick }) => {
  return (
    <div 
      className="glass-panel rounded-xl p-5 cursor-pointer hover:shadow-md transition-all hover:border-trialos-blue/30"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{patientName}</h3>
          <p className="text-xs text-gray-500">ID: {patientId}</p>
          <p className="text-sm text-gray-600 mt-1">Diagnosis: {diagnosis}</p>
        </div>
        <div className="px-2 py-1 rounded-full bg-trialos-blue/10 text-trialos-blue text-xs font-medium">
          Matched Patient
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-gray-700">Top Trial Matches:</p>
        {trials.map((trial, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-100">
            <span className="text-sm">{trial.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              {trial.match}% Match
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-end">
        <button className="text-sm btn-primary rounded-lg px-4 py-1.5">
          Apply as Trial Site
        </button>
      </div>
    </div>
  );
};

const Microhub: React.FC = () => {
  // Mock data
  const isMicrohub = false; // Toggle between registration and microhub dashboard
  const [view, setView] = React.useState<'main' | 'search' | 'matched' | 'registration'>('main');
  
  const registrationSteps = [
    {
      title: "Facility Information",
      description: "Basic details about your hospital or clinic",
      completed: true
    },
    {
      title: "Staff Qualifications",
      description: "Information about your clinical staff and their training",
      completed: false
    },
    {
      title: "Equipment & Resources",
      description: "Details about available equipment and resources",
      completed: false
    },
    {
      title: "Compliance Documents",
      description: "Upload required CDSCO and FDA regulatory documents",
      completed: false
    },
    {
      title: "Final Review",
      description: "Review and submit your trial site application",
      completed: false
    }
  ];
  
  const publicTrials = [
    {
      name: "Phase 2 HER2+ Breast Cancer Trial",
      phase: "Phase 2",
      sponsor: "Tata Memorial Hospital",
      location: "Mumbai, Maharashtra",
      status: 'recruiting' as const
    },
    {
      name: "Phase 3 NSCLC Immunotherapy Trial",
      phase: "Phase 3",
      sponsor: "Apollo Hospitals",
      location: "Hyderabad, Telangana",
      status: 'recruiting' as const
    },
    {
      name: "Phase 2 Diabetes Type 2 Study",
      phase: "Phase 2",
      sponsor: "AIIMS Research Center",
      location: "New Delhi, Delhi",
      status: 'recruiting' as const
    }
  ];
  
  const matchedPatients = [
    {
      name: "Priya Sharma",
      id: "PT-12845",
      diagnosis: "Breast Cancer (HER2+)",
      trials: [
        { name: "Phase 2 HER2+ Breast Cancer Trial", match: 92 },
        { name: "Triple Positive Breast Cancer Study", match: 84 },
        { name: "Advanced Stage Breast Cancer Trial", match: 76 }
      ]
    },
    {
      name: "Rajesh Kumar",
      id: "PT-10592",
      diagnosis: "NSCLC",
      trials: [
        { name: "Phase 3 NSCLC Immunotherapy Trial", match: 89 },
        { name: "Advanced Lung Cancer Study", match: 82 },
        { name: "EGFR+ Lung Cancer Trial", match: 77 }
      ]
    },
    {
      name: "Meera Patel",
      id: "PT-13501",
      diagnosis: "Ovarian Cancer",
      trials: [
        { name: "Advanced Ovarian Cancer Trial", match: 94 },
        { name: "Platinum-Resistant Ovarian Cancer Study", match: 86 },
        { name: "Recurrent Ovarian Cancer Trial", match: 80 }
      ]
    }
  ];
  
  const renderContent = () => {
    switch (view) {
      case 'search':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Public Trials Seeking Sites</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search trials..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue">
                  <option>All Phases</option>
                  <option>Phase 1</option>
                  <option>Phase 2</option>
                  <option>Phase 3</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicTrials.map((trial, index) => (
                <TrialCard
                  key={index}
                  {...trial}
                  onClick={() => setView('registration')}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setView('main')}
              className="text-trialos-blue hover:underline flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Options
            </button>
          </div>
        );
        
      case 'matched':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Matched Patients</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search patients..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue"
                  />
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue">
                  <option>All Diagnoses</option>
                  <option>Breast Cancer</option>
                  <option>Lung Cancer</option>
                  <option>Ovarian Cancer</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedPatients.map((patient, index) => (
                <PatientMatchCard
                  key={index}
                  patientName={patient.name}
                  patientId={patient.id}
                  diagnosis={patient.diagnosis}
                  trials={patient.trials}
                  onClick={() => setView('registration')}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setView('main')}
              className="text-trialos-blue hover:underline flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Options
            </button>
          </div>
        );
        
      case 'registration':
        return (
          <div className="space-y-6">
            <button 
              onClick={() => setView('main')}
              className="text-trialos-blue hover:underline flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Options
            </button>
            
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-start mb-8">
                <div className="p-3 rounded-lg bg-trialos-blue/10 text-trialos-blue mr-4">
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Trial Site Registration Process</h2>
                  <p className="text-gray-600 mt-1">
                    Complete the following steps to register your facility as a decentralized clinical trial site
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {registrationSteps.map((step, index) => (
                  <RegistrationStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    completed={step.completed}
                    number={index + 1}
                  />
                ))}
              </div>
              
              <div className="mt-8 bg-trialos-blue/5 rounded-lg p-5 border border-trialos-blue/20">
                <div className="flex items-start">
                  <Award size={24} className="text-trialos-blue mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Benefits of Becoming a Trial Site</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      By becoming a decentralized trial site, your facility will gain access to:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Direct access to innovative clinical trials",
                        "Additional revenue streams through trial operations",
                        "Enhanced reputation as a research center",
                        "Expanded treatment options for your patients",
                        "Support from TrialOS platform and sponsors"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 size={16} className="text-trialos-blue mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-800">Choose Your Path</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="glass-panel rounded-xl p-6 cursor-pointer hover:shadow-md transition-all hover:border-trialos-blue/30"
                onClick={() => setView('search')}
              >
                <div className="p-3 rounded-lg bg-trialos-blue/10 text-trialos-blue mb-4 w-fit">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Find Public Trials</h3>
                <p className="text-gray-600 mb-4">
                  Browse through active clinical trials looking for decentralized trial sites across India
                </p>
                <button className="btn-primary rounded-lg px-4 py-2 flex items-center">
                  <span>Browse Trials</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div 
                className="glass-panel rounded-xl p-6 cursor-pointer hover:shadow-md transition-all hover:border-trialos-blue/30"
                onClick={() => setView('matched')}
              >
                <div className="p-3 rounded-lg bg-trialos-teal/10 text-trialos-teal mb-4 w-fit">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Matched Patients</h3>
                <p className="text-gray-600 mb-4">
                  Apply to become a trial site for your patients who matched with clinical trials
                </p>
                <button className="btn-primary rounded-lg px-4 py-2 flex items-center">
                  <span>View Matched Patients</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="glass-panel rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
                  <BadgeCheck size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">CDSCO Compliance</h3>
                <p className="text-gray-600 text-sm">
                  We ensure all trial sites meet Central Drugs Standard Control Organisation requirements for clinical research.
                </p>
              </div>
              
              <div className="glass-panel rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
                  <FileCheck size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Documentation Support</h3>
                <p className="text-gray-600 text-sm">
                  Guidance with all necessary regulatory documentation and compliance paperwork for Indian trial sites.
                </p>
              </div>
              
              <div className="glass-panel rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
                  <Award size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Recognized Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Gain recognition as a center of excellence for clinical research in the Indian healthcare ecosystem.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Trial Site
        </div>
        <h1 className="text-3xl font-bold text-trialos-blue">
          {isMicrohub ? "Trial Site Dashboard" : "Become a Trial Site"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isMicrohub 
            ? "Manage your clinical trial operations and enrolled patients" 
            : "Transform your facility into a decentralized clinical trial site and expand patient access to innovative treatments"}
        </p>
      </div>
      
      {/* Main content */}
      <div className="glass-panel rounded-xl p-6 border-t-4 border-trialos-blue shadow-glass">
        {renderContent()}
      </div>
      
      {/* Success stories */}
      {view === 'main' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "AIIMS Delhi",
                location: "New Delhi, India",
                trials: 18,
                quote: "Becoming a trial site transformed our ability to offer cutting-edge treatments."
              },
              {
                name: "Apollo Hospitals",
                location: "Chennai, India",
                trials: 12,
                quote: "The TrialOS platform streamlined our operations and increased our trial capacity."
              },
              {
                name: "Medanta Hospital",
                location: "Gurugram, India",
                trials: 24,
                quote: "Our patient satisfaction increased dramatically with access to innovative trials."
              }
            ].map((story, index) => (
              <div key={index} className="glass-panel rounded-xl p-5">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-trialos-blue to-trialos-teal flex items-center justify-center text-white font-bold text-xl">
                    {story.name.split(' ')[0].charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">{story.name}</h3>
                    <p className="text-xs text-gray-500">{story.location}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{story.quote}"</p>
                <div className="text-sm text-trialos-blue font-medium">
                  {story.trials} trials conducted
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Microhub;
