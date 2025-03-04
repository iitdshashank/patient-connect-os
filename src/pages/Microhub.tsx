
import React from 'react';
import { Building2, CheckCircle2, ClipboardList, Calendar, Users, Award } from 'lucide-react';

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
  patients: number;
  status: 'active' | 'recruiting' | 'completed';
  onClick: () => void;
}> = ({ name, phase, sponsor, patients, status, onClick }) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Active</span>;
      case 'recruiting':
        return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Recruiting</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Completed</span>;
    }
  };
  
  return (
    <div 
      className="glass-panel rounded-xl p-5 cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{phase} • {sponsor}</p>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <Users size={18} className="text-trialos-blue mr-2" />
          <span><strong>{patients}</strong> patients</span>
        </div>
        <div className="flex items-center">
          <Calendar size={18} className="text-trialos-blue mr-2" />
          <span>Next visit: <strong>Jun 12</strong></span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-between">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-trialos-blue/10 flex items-center justify-center text-xs text-trialos-blue">
              {i + 1}
            </div>
          ))}
        </div>
        <button className="text-sm text-trialos-blue font-medium">View Trial</button>
      </div>
    </div>
  );
};

const Microhub: React.FC = () => {
  // Mock data
  const isMicrohub = false; // Toggle between registration and microhub dashboard
  
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
      description: "Upload required regulatory and compliance documents",
      completed: false
    },
    {
      title: "Final Review",
      description: "Review and submit your microhub application",
      completed: false
    }
  ];
  
  const activeTrials = [
    {
      name: "Phase 2 HER2+ Breast Cancer Trial",
      phase: "Phase 2",
      sponsor: "Memorial Cancer Institute",
      patients: 8,
      status: 'active' as const
    },
    {
      name: "Phase 3 NSCLC Immunotherapy Trial",
      phase: "Phase 3",
      sponsor: "BioGen Pharmaceuticals",
      patients: 12,
      status: 'recruiting' as const
    },
    {
      name: "Phase 1 Multiple Myeloma Trial",
      phase: "Phase 1",
      sponsor: "National Research Center",
      patients: 4,
      status: 'completed' as const
    }
  ];
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Microhub
        </div>
        <h1 className="text-3xl font-bold text-trialos-blue">
          {isMicrohub ? "Microhub Dashboard" : "Become a Microhub"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isMicrohub 
            ? "Manage your clinical trial operations and enrolled patients" 
            : "Transform your facility into a decentralized clinical trial microhub"}
        </p>
      </div>
      
      {!isMicrohub ? (
        <>
          {/* Registration steps */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-start mb-8">
              <div className="p-3 rounded-lg bg-trialos-blue/10 text-trialos-blue mr-4">
                <Building2 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Registration Process</h2>
                <p className="text-gray-600 mt-1">
                  Complete the following steps to register your facility as a clinical trial microhub
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
                  <h3 className="font-semibold text-gray-800">Benefits of Becoming a Microhub</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    By becoming a microhub, your facility will gain access to:
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
          
          {/* Success stories */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "St. Mary's Hospital",
                  location: "Boston, MA",
                  trials: 18,
                  quote: "Becoming a microhub transformed our ability to offer cutting-edge treatments."
                },
                {
                  name: "Westlake Medical Center",
                  location: "Chicago, IL",
                  trials: 12,
                  quote: "The TrialOS platform streamlined our operations and increased our trial capacity."
                },
                {
                  name: "Pacific Heights Clinic",
                  location: "San Francisco, CA",
                  trials: 24,
                  quote: "Our patient satisfaction increased dramatically with access to innovative trials."
                }
              ].map((story, index) => (
                <div key={index} className="glass-panel rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-trialos-blue to-trialos-teal flex items-center justify-center text-white font-bold text-xl">
                      {story.name.charAt(0)}
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
        </>
      ) : (
        <>
          {/* Microhub Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Active Trials",
                value: "3",
                icon: <ClipboardList size={20} className="text-trialos-blue" />,
                bgColor: "bg-trialos-blue/10"
              },
              {
                title: "Enrolled Patients",
                value: "24",
                icon: <Users size={20} className="text-trialos-teal" />,
                bgColor: "bg-trialos-teal/10"
              },
              {
                title: "Upcoming Visits",
                value: "8",
                icon: <Calendar size={20} className="text-purple-600" />,
                bgColor: "bg-purple-100"
              }
            ].map((stat, index) => (
              <div key={index} className="glass-panel rounded-xl p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Active trials */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Trials</h2>
              <div className="flex space-x-3">
                <select className="bg-white border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Recruiting</option>
                  <option>Completed</option>
                </select>
                <button className="btn-primary rounded-lg px-4 py-2 text-sm">
                  Calendar View
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTrials.map((trial, index) => (
                <TrialCard
                  key={index}
                  {...trial}
                  onClick={() => console.log(`Clicked on trial: ${trial.name}`)}
                />
              ))}
            </div>
          </div>
          
          {/* Patient timeline */}
          <div className="glass-panel rounded-xl p-6 border-t-4 border-trialos-teal">
            <div className="flex items-start mb-6">
              <div className="p-3 rounded-lg bg-trialos-teal/10 text-trialos-teal mr-4">
                <Users size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Patient Timeline</h2>
                <p className="text-gray-600 mt-1">
                  Track patient progress and upcoming activities
                </p>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-lg p-5 border border-border">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-trialos-blue">Recent Activities</h3>
                <button className="text-sm text-trialos-blue font-medium">View All</button>
              </div>
              
              <div className="relative pl-6 border-l-2 border-trialos-blue/20 space-y-8">
                {[
                  {
                    type: "Drug Administration",
                    patient: "Robert Lee",
                    trial: "NSCLC Immunotherapy Trial",
                    date: "May 22, 2023",
                    time: "10:30 AM",
                    details: "Administered dose #4 of trial medication",
                    completed: true
                  },
                  {
                    type: "Lab Results",
                    patient: "Sarah Johnson",
                    trial: "HER2+ Breast Cancer Trial",
                    date: "May 20, 2023",
                    time: "2:15 PM",
                    details: "Routine blood work completed, results uploaded",
                    completed: true
                  },
                  {
                    type: "Patient Visit",
                    patient: "Michael Chen",
                    trial: "Multiple Myeloma Trial",
                    date: "May 18, 2023",
                    time: "9:00 AM",
                    details: "Regular check-up and symptom assessment",
                    completed: true
                  }
                ].map((activity, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-10 w-4 h-4 rounded-full bg-trialos-blue border-4 border-white"></div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-border">
                      <div className="flex justify-between">
                        <span className="text-xs px-2 py-1 rounded-full bg-trialos-blue/10 text-trialos-blue">
                          {activity.type}
                        </span>
                        <div className="flex items-center">
                          <CheckCircle2 size={14} className="text-green-500 mr-1" />
                          <span className="text-xs text-green-500">Completed</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-800 mt-2">{activity.patient}</h4>
                      <p className="text-xs text-gray-500">{activity.trial}</p>
                      <p className="text-sm text-gray-600 mt-2">{activity.details}</p>
                      <div className="mt-3 text-xs text-gray-400 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>{activity.date} at {activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Microhub;
