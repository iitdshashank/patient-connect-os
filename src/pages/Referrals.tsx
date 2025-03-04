
import React from 'react';
import { ClipboardList, MessageSquare, DollarSign, CheckCircle2 } from 'lucide-react';

const ReferralCard: React.FC<{
  patientId: string;
  patientName: string;
  trialName: string;
  status: 'accepted' | 'screening' | 'recruited' | 'completed';
  date: string;
  onClick: () => void;
}> = ({ patientId, patientName, trialName, status, date, onClick }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'accepted':
        return {
          label: 'Request Accepted',
          color: 'bg-blue-100 text-blue-600',
          progress: 25
        };
      case 'screening':
        return {
          label: 'Under Screening',
          color: 'bg-yellow-100 text-yellow-600',
          progress: 50
        };
      case 'recruited':
        return {
          label: 'Patient Recruited',
          color: 'bg-purple-100 text-purple-600',
          progress: 75
        };
      case 'completed':
        return {
          label: 'Commission Sent',
          color: 'bg-green-100 text-green-600',
          progress: 100
        };
    }
  };
  
  const statusInfo = getStatusInfo();
  
  return (
    <div 
      className="glass-panel rounded-xl p-5 cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-gray-500">{patientId}</span>
          <h3 className="font-semibold text-gray-800">{patientName}</h3>
          <p className="text-sm text-gray-600 mt-1">{trialName}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-trialos-blue transition-all duration-500"
            style={{ width: `${statusInfo.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Accepted</span>
          <span>Screening</span>
          <span>Recruited</span>
          <span>Completed</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
        <span className="text-xs text-gray-500">Referred on {date}</span>
        <button className="text-sm text-trialos-blue font-medium">View Details</button>
      </div>
    </div>
  );
};

const Referrals: React.FC = () => {
  const referrals = [
    {
      patientId: "PT-12845",
      patientName: "Sarah Johnson",
      trialName: "Phase 2 HER2+ Breast Cancer Trial",
      status: 'screening' as const,
      date: "May 15, 2023"
    },
    {
      patientId: "PT-10592",
      patientName: "Robert Lee",
      trialName: "Phase 3 NSCLC Immunotherapy Trial",
      status: 'recruited' as const,
      date: "Apr 22, 2023"
    },
    {
      patientId: "PT-09283",
      patientName: "Emma Davis",
      trialName: "Phase 1 Multiple Myeloma Trial",
      status: 'completed' as const,
      date: "Mar 10, 2023"
    },
    {
      patientId: "PT-13501",
      patientName: "Emma Williams",
      trialName: "Phase 2 Ovarian Cancer Trial",
      status: 'accepted' as const,
      date: "May 20, 2023"
    }
  ];
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Referral Management
        </div>
        <h1 className="text-3xl font-bold text-trialos-blue">Manage Referrals</h1>
        <p className="text-gray-600 mt-2">Track and manage your patient referrals to clinical trials in one place</p>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Active Referrals",
            value: "14",
            icon: <ClipboardList size={20} className="text-trialos-blue" />,
            bgColor: "bg-trialos-blue/10"
          },
          {
            title: "Pending Communications",
            value: "3",
            icon: <MessageSquare size={20} className="text-trialos-teal" />,
            bgColor: "bg-trialos-teal/10"
          },
          {
            title: "Total Commission",
            value: "$24,850",
            icon: <DollarSign size={20} className="text-green-600" />,
            bgColor: "bg-green-100"
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
      
      {/* Referrals section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Referrals</h2>
          <div className="flex space-x-3">
            <select className="bg-white border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue">
              <option>All Statuses</option>
              <option>Request Accepted</option>
              <option>Under Screening</option>
              <option>Patient Recruited</option>
              <option>Commission Sent</option>
            </select>
            <button className="btn-primary rounded-lg px-4 py-2 text-sm">
              New Referral
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {referrals.map((referral, index) => (
            <ReferralCard
              key={index}
              {...referral}
              onClick={() => console.log(`Clicked on referral for ${referral.patientName}`)}
            />
          ))}
        </div>
      </div>
      
      {/* Communication center */}
      <div className="glass-panel rounded-xl p-6 border-t-4 border-trialos-teal">
        <div className="flex items-start mb-6">
          <div className="p-3 rounded-lg bg-trialos-teal/10 text-trialos-teal mr-4">
            <MessageSquare size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Communication Center</h2>
            <p className="text-gray-600 mt-1">
              Securely communicate with trial sponsors and coordinators
            </p>
          </div>
        </div>
        
        <div className="bg-white/80 rounded-lg p-5 border border-border">
          <div className="flex justify-between mb-4">
            <h3 className="font-medium text-trialos-blue">Recent Messages</h3>
            <button className="text-sm text-trialos-blue font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              {
                sender: "Dr. James Wilson",
                org: "Memorial Cancer Institute",
                message: "Additional records required for patient PT-12845",
                time: "2 hours ago",
                unread: true
              },
              {
                sender: "Dr. Sophia Chen",
                org: "National Research Center",
                message: "PT-10592 screening date confirmed for June 3rd",
                time: "Yesterday",
                unread: false
              },
              {
                sender: "Amanda Torres",
                org: "BioGen Pharmaceuticals",
                message: "Commission payment processed for PT-09283",
                time: "3 days ago",
                unread: false
              }
            ].map((message, index) => (
              <div key={index} className={`p-4 rounded-lg ${message.unread ? 'bg-trialos-blue/5 border border-trialos-blue/20' : 'bg-gray-50 border border-transparent'}`}>
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{message.sender}</h4>
                    <p className="text-xs text-gray-500">{message.org}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400">{message.time}</span>
                    {message.unread && (
                      <div className="w-2 h-2 rounded-full bg-trialos-blue ml-2"></div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{message.message}</p>
                <div className="mt-3 flex justify-end">
                  <button className="text-xs text-trialos-blue font-medium">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
