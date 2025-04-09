
import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  FileBarChart, 
  Search,
  Settings,
  MessageSquare,
  Pill,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Files,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Trial {
  id: string;
  name: string;
  phase: string;
  sponsor: string;
  patients: number;
  status: 'active' | 'upcoming' | 'completed';
  lastUpdate: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  enrollmentDate: string;
  nextVisit: string;
  status: 'active' | 'pending' | 'completed';
}

interface Message {
  id: string;
  sender: string;
  role: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  trialId: string;
}

const TrialCard: React.FC<{
  trial: Trial;
  selected: boolean;
  onClick: () => void;
}> = ({ trial, selected, onClick }) => {
  const getStatusBadge = () => {
    switch (trial.status) {
      case 'active':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Active</span>;
      case 'upcoming':
        return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Upcoming</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Completed</span>;
    }
  };
  
  return (
    <div 
      className={`
        border rounded-xl p-4 cursor-pointer transition-all
        ${selected 
          ? 'border-trialos-blue bg-trialos-blue/5' 
          : 'border-gray-200 bg-white hover:border-trialos-blue/30 hover:shadow-sm'
        }
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{trial.name}</h3>
          <p className="text-xs text-gray-500">ID: {trial.id}</p>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-500">Phase:</span>
          <p className="font-medium text-gray-700">{trial.phase}</p>
        </div>
        <div>
          <span className="text-gray-500">Patients:</span>
          <p className="font-medium text-gray-700">{trial.patients}</p>
        </div>
        <div>
          <span className="text-gray-500">Sponsor:</span>
          <p className="font-medium text-gray-700">{trial.sponsor}</p>
        </div>
        <div>
          <span className="text-gray-500">Last Update:</span>
          <p className="font-medium text-gray-700">{trial.lastUpdate}</p>
        </div>
      </div>
    </div>
  );
};

const PatientRow: React.FC<{
  patient: Patient;
  onClick: () => void;
}> = ({ patient, onClick }) => {
  const getStatusBadge = () => {
    switch (patient.status) {
      case 'active':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Active</span>;
      case 'pending':
        return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">Pending</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Completed</span>;
    }
  };
  
  return (
    <tr 
      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-trialos-blue/10 flex items-center justify-center text-trialos-blue mr-2">
            <User size={16} />
          </div>
          <div>
            <div className="font-medium text-gray-800">{patient.name}</div>
            <div className="text-xs text-gray-500">ID: {patient.id}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-600">
        {patient.age}, {patient.gender}
      </td>
      <td className="px-4 py-3">
        <span className="font-medium text-gray-800">{patient.diagnosis}</span>
      </td>
      <td className="px-4 py-3 text-gray-600">{patient.nextVisit}</td>
      <td className="px-4 py-3">{getStatusBadge()}</td>
      <td className="px-4 py-3 text-right">
        <button className="text-gray-500 hover:text-trialos-blue">
          <ChevronRight size={16} />
        </button>
      </td>
    </tr>
  );
};

const TaskItem: React.FC<{
  task: Task;
  onToggle: () => void;
}> = ({ task, onToggle }) => {
  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'high':
        return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">High</span>;
      case 'medium':
        return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">Medium</span>;
      case 'low':
        return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">Low</span>;
    }
  };
  
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={onToggle}
          className="mr-3 mt-1"
        />
        <div>
          <p className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            {task.title}
          </p>
          <div className="flex items-center mt-1 space-x-2">
            {getPriorityBadge()}
            <span className="text-xs text-gray-500">
              <Clock size={12} className="inline mr-1" />
              Due: {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageItem: React.FC<{
  message: Message;
  onClick: () => void;
}> = ({ message, onClick }) => {
  return (
    <div 
      className={`
        p-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50
        ${!message.read ? 'bg-trialos-blue/5' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-800">{message.sender}</span>
        <span className="text-xs text-gray-500">{message.timestamp}</span>
      </div>
      <p className="text-xs text-gray-500">{message.role}</p>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message.message}</p>
      {!message.read && (
        <div className="mt-2 flex justify-end">
          <span className="inline-block w-2 h-2 bg-trialos-blue rounded-full"></span>
        </div>
      )}
    </div>
  );
};

const TrialCommunication: React.FC<{
  messages: Message[];
}> = ({ messages }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-medium text-gray-800">Trial Communications</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {messages.map(message => (
            <MessageItem 
              key={message.id} 
              message={message} 
              onClick={() => console.log('Message clicked', message.id)} 
            />
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <Textarea
          placeholder="Type your message here..."
          className="resize-none mb-2"
          rows={2}
        />
        <div className="flex justify-end">
          <Button>
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

const ManageTrials: React.FC = () => {
  const [selectedTrialId, setSelectedTrialId] = useState<string | null>('TR-1001');
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'documents' | 'tasks'>('overview');
  
  // Sample data
  const trials: Trial[] = [
    {
      id: 'TR-1001',
      name: 'Phase 3 HER2+ Breast Cancer Trial',
      phase: 'Phase 3',
      sponsor: 'Tata Memorial Hospital',
      patients: 8,
      status: 'active',
      lastUpdate: 'Apr 6, 2023'
    },
    {
      id: 'TR-1002',
      name: 'Phase 2 NSCLC Immunotherapy Trial',
      phase: 'Phase 2',
      sponsor: 'Apollo Research Center',
      patients: 12,
      status: 'active',
      lastUpdate: 'Apr 2, 2023'
    },
    {
      id: 'TR-1003',
      name: 'Diabetes Type 2 Treatment Study',
      phase: 'Phase 3',
      sponsor: 'AIIMS Research Network',
      patients: 6,
      status: 'upcoming',
      lastUpdate: 'Mar 29, 2023'
    },
    {
      id: 'TR-1004',
      name: 'Hypertension Novel Drug Trial',
      phase: 'Phase 2',
      sponsor: 'Max Healthcare Institute',
      patients: 0,
      status: 'upcoming',
      lastUpdate: 'Mar 25, 2023'
    }
  ];
  
  const patients: Patient[] = [
    {
      id: 'PT-4501',
      name: 'Anita Sharma',
      age: 48,
      gender: 'Female',
      diagnosis: 'Breast Cancer (HER2+)',
      enrollmentDate: 'Feb 15, 2023',
      nextVisit: 'Apr 12, 2023',
      status: 'active'
    },
    {
      id: 'PT-4502',
      name: 'Vikram Singh',
      age: 56,
      gender: 'Male',
      diagnosis: 'Breast Cancer (HER2+)',
      enrollmentDate: 'Feb 18, 2023',
      nextVisit: 'Apr 14, 2023',
      status: 'active'
    },
    {
      id: 'PT-4503',
      name: 'Priya Patel',
      age: 42,
      gender: 'Female',
      diagnosis: 'Breast Cancer (HER2+)',
      enrollmentDate: 'Mar 3, 2023',
      nextVisit: 'Apr 17, 2023',
      status: 'active'
    }
  ];
  
  const tasks: Task[] = [
    {
      id: 'TSK-001',
      title: 'Submit monthly progress report',
      dueDate: 'Apr 15, 2023',
      priority: 'high',
      completed: false,
      trialId: 'TR-1001'
    },
    {
      id: 'TSK-002',
      title: 'Schedule patient follow-up visits',
      dueDate: 'Apr 10, 2023',
      priority: 'medium',
      completed: true,
      trialId: 'TR-1001'
    },
    {
      id: 'TSK-003',
      title: 'Review protocol amendment',
      dueDate: 'Apr 18, 2023',
      priority: 'high',
      completed: false,
      trialId: 'TR-1001'
    },
    {
      id: 'TSK-004',
      title: 'Prepare for monitoring visit',
      dueDate: 'Apr 22, 2023',
      priority: 'medium',
      completed: false,
      trialId: 'TR-1001'
    },
    {
      id: 'TSK-005',
      title: 'Upload patient case report forms',
      dueDate: 'Apr 13, 2023',
      priority: 'low',
      completed: false,
      trialId: 'TR-1001'
    }
  ];
  
  const messages: Message[] = [
    {
      id: 'MSG-001',
      sender: 'Dr. Agarwal',
      role: 'Principal Investigator',
      message: 'Please review the updated inclusion criteria for the HER2+ Breast Cancer Trial and confirm your understanding of the changes.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 'MSG-002',
      sender: 'Sunita Desai',
      role: 'CRA, Tata Memorial Hospital',
      message: 'The monitoring visit is scheduled for April 22nd. Please ensure all documentation is up to date and patient files are ready for review.',
      timestamp: 'Yesterday',
      read: true
    },
    {
      id: 'MSG-003',
      sender: 'Dr. Mehta',
      role: 'Medical Monitor',
      message: 'We have received reports of a new adverse event. Please review the safety update distributed yesterday and acknowledge receipt.',
      timestamp: '3 days ago',
      read: true
    }
  ];
  
  const selectedTrial = trials.find(t => t.id === selectedTrialId) || null;
  
  const renderTrialContent = () => {
    if (!selectedTrial) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a trial to view details</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {/* Trial Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{selectedTrial.name}</h2>
            <p className="text-sm text-gray-500">ID: {selectedTrial.id} • {selectedTrial.phase} • Sponsor: {selectedTrial.sponsor}</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn-outline rounded-lg px-3 py-1.5 text-sm">
              <Settings size={16} className="mr-1" />
              Settings
            </button>
            <button className="btn-primary rounded-lg px-3 py-1.5 text-sm">
              <MessageSquare size={16} className="mr-1" />
              Contact Sponsor
            </button>
          </div>
        </div>
        
        {/* Trial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Enrolled Patients</p>
                <h3 className="text-2xl font-bold text-trialos-blue">{selectedTrial.patients}</h3>
              </div>
              <div className="p-2 rounded-lg bg-trialos-blue/10 text-trialos-blue">
                <Users size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Trial Duration</p>
                <h3 className="text-2xl font-bold text-trialos-teal">8 months</h3>
              </div>
              <div className="p-2 rounded-lg bg-trialos-teal/10 text-trialos-teal">
                <Calendar size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion</p>
                <h3 className="text-2xl font-bold text-purple-600">42%</h3>
              </div>
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Activity size={20} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Visit</p>
                <h3 className="text-2xl font-bold text-green-600">Apr 12</h3>
              </div>
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <Clock size={20} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-6">
            <button 
              className={`pb-3 px-1 text-sm font-medium ${activeTab === 'overview' ? 'text-trialos-blue border-b-2 border-trialos-blue' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`pb-3 px-1 text-sm font-medium ${activeTab === 'patients' ? 'text-trialos-blue border-b-2 border-trialos-blue' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('patients')}
            >
              Patients
            </button>
            <button 
              className={`pb-3 px-1 text-sm font-medium ${activeTab === 'documents' ? 'text-trialos-blue border-b-2 border-trialos-blue' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
            <button 
              className={`pb-3 px-1 text-sm font-medium ${activeTab === 'tasks' ? 'text-trialos-blue border-b-2 border-trialos-blue' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trial Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-800 mb-4">Trial Summary</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Description</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      A randomized, double-blind, placebo-controlled Phase 3 study to evaluate the efficacy and safety of Drug X in combination with standard of care for patients with HER2-positive breast cancer.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500">Primary Endpoint</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Progression-free survival (PFS)
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Secondary Endpoints</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Overall survival (OS), Objective response rate (ORR)
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500">Enrollment Target</h4>
                      <p className="text-sm text-gray-700 mt-1">15 patients</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Study Duration</h4>
                      <p className="text-sm text-gray-700 mt-1">18 months</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-800 mb-4">Key Milestones</h3>
                <div className="relative pl-6 border-l-2 border-trialos-blue/20 space-y-6">
                  {[
                    {
                      title: "Site Activation",
                      date: "Jan 15, 2023",
                      description: "Site activated and ready for patient enrollment",
                      completed: true
                    },
                    {
                      title: "First Patient Enrolled",
                      date: "Feb 15, 2023",
                      description: "First patient successfully enrolled in the trial",
                      completed: true
                    },
                    {
                      title: "25% Enrollment",
                      date: "Mar 30, 2023",
                      description: "Reached 25% of enrollment target",
                      completed: true
                    },
                    {
                      title: "50% Enrollment",
                      date: "May 15, 2023 (Estimated)",
                      description: "Halfway to enrollment target",
                      completed: false
                    },
                    {
                      title: "Last Patient Enrolled",
                      date: "Aug 30, 2023 (Estimated)",
                      description: "Enrollment completion",
                      completed: false
                    }
                  ].map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute -left-10 w-4 h-4 rounded-full ${milestone.completed ? 'bg-trialos-blue' : 'bg-gray-300'} border-4 border-white`}></div>
                      <div className="bg-white">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">{milestone.title}</h4>
                          <div className="flex items-center">
                            {milestone.completed ? 
                              <CheckCircle2 size={14} className="text-green-500 mr-1" /> : 
                              <Clock size={14} className="text-gray-400 mr-1" />
                            }
                            <span className={`text-xs ${milestone.completed ? 'text-green-500' : 'text-gray-400'}`}>
                              {milestone.date}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Communication and Tasks */}
            <div className="space-y-6">
              <TrialCommunication messages={messages} />
              
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">Upcoming Tasks</h3>
                  <button className="text-xs text-trialos-blue hover:underline">View All</button>
                </div>
                <div className="divide-y divide-gray-100">
                  {tasks.filter(t => !t.completed).slice(0, 3).map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      onToggle={() => console.log('Toggle task', task.id)} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-800 mb-3">Trial Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Principal Investigator</p>
                    <p className="text-sm font-medium text-gray-800">Dr. Rajat Agarwal</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Study Coordinator</p>
                    <p className="text-sm font-medium text-gray-800">Sunita Desai</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CRO</p>
                    <p className="text-sm font-medium text-gray-800">Indian Clinical Research</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sponsor Contact</p>
                    <p className="text-sm font-medium text-gray-800">Dr. Amita Patel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Enrolled Patients ({patients.length})</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search patients..." 
                    className="pl-8 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue w-48"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button className="btn-primary rounded-lg px-3 py-1.5 text-sm">
                  + Add Patient
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Demographics</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Next Visit</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <PatientRow 
                      key={patient.id} 
                      patient={patient}
                      onClick={() => console.log('Patient clicked', patient.id)} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Trial Documents</h3>
              <button className="btn-primary rounded-lg px-3 py-1.5 text-sm">
                + Upload Document
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {[
                {
                  name: "Protocol Document",
                  type: "PDF",
                  size: "2.4 MB",
                  updated: "Apr 1, 2023",
                  version: "2.0"
                },
                {
                  name: "Informed Consent Form",
                  type: "DOCX",
                  size: "1.8 MB",
                  updated: "Mar 28, 2023",
                  version: "1.2"
                },
                {
                  name: "Case Report Form Template",
                  type: "PDF",
                  size: "3.1 MB",
                  updated: "Mar 15, 2023",
                  version: "1.0"
                },
                {
                  name: "Investigator Brochure",
                  type: "PDF",
                  size: "5.6 MB",
                  updated: "Feb 10, 2023",
                  version: "1.1"
                },
                {
                  name: "Regulatory Approval Letter",
                  type: "PDF",
                  size: "1.2 MB",
                  updated: "Jan 25, 2023",
                  version: "1.0"
                }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-trialos-blue/10 text-trialos-blue mr-3">
                      <Files size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{doc.name}</h4>
                      <p className="text-xs text-gray-500">
                        {doc.type} • {doc.size} • Version {doc.version}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Updated: {doc.updated}</span>
                    <button className="p-1 text-gray-400 hover:text-trialos-blue">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Tasks ({tasks.filter(t => !t.completed).length})</h3>
                <button className="btn-primary rounded-lg px-3 py-1.5 text-sm">
                  + Add Task
                </button>
              </div>
              
              <div className="divide-y divide-gray-100">
                {tasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={() => console.log('Toggle task', task.id)} 
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Calendar</h3>
              </div>
              
              <div className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">April 2023</p>
                  <div className="grid grid-cols-7 gap-1 my-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-xs text-gray-500">{day}</div>
                    ))}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="h-8 text-xs text-gray-300 flex items-center justify-center"></div>
                    ))}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const day = i + 1;
                      const isToday = day === 9; // Assuming today is April 9
                      const hasEvent = [10, 12, 15, 22].includes(day);
                      
                      return (
                        <div 
                          key={i} 
                          className={`
                            h-8 text-xs flex items-center justify-center rounded-full
                            ${isToday ? 'bg-trialos-blue text-white' : 'hover:bg-gray-100 cursor-pointer'}
                            ${hasEvent && !isToday ? 'border-2 border-trialos-blue/30' : ''}
                          `}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-800">Upcoming Events</p>
                  
                  {[
                    {
                      title: "Patient Visit - Anita Sharma",
                      date: "Apr 12, 2023",
                      time: "10:30 AM"
                    },
                    {
                      title: "Protocol Review Meeting",
                      date: "Apr 15, 2023",
                      time: "2:00 PM"
                    },
                    {
                      title: "Monitoring Visit",
                      date: "Apr 22, 2023",
                      time: "9:00 AM - 5:00 PM"
                    }
                  ].map((event, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-800">{event.title}</h4>
                        <div className="flex items-center">
                          <Clock size={12} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{event.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Trial Management
        </div>
        <h1 className="text-3xl font-bold text-trialos-blue">Manage Trials</h1>
        <p className="text-gray-600 mt-2">
          Efficiently manage your clinical trials and monitor patient progress
        </p>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Trial Sidebar */}
        <div className="md:w-72 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-gray-800">Your Trials</h2>
              <button className="text-trialos-blue hover:text-trialos-blue/80 text-sm">
                + Add
              </button>
            </div>
            
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search trials..." 
                className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between text-sm mb-3">
              <button className="text-gray-500 hover:text-gray-700">
                All
              </button>
              <button className="text-trialos-blue">
                Active
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                Upcoming
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                Completed
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {trials.map(trial => (
              <TrialCard 
                key={trial.id} 
                trial={trial} 
                selected={selectedTrialId === trial.id}
                onClick={() => setSelectedTrialId(trial.id)} 
              />
            ))}
          </div>
        </div>
        
        {/* Trial Content */}
        <div className="flex-grow">
          {renderTrialContent()}
        </div>
      </div>
    </div>
  );
};

export default ManageTrials;
