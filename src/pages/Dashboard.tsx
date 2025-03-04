
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ClipboardList, 
  Building2,
  ArrowRight,
  Users,
  Activity,
  Microscope
} from 'lucide-react';

const DashboardCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  isPrimary?: boolean;
  onClick: () => void;
}> = ({ title, description, icon, isPrimary = false, onClick }) => {
  return (
    <div 
      className={`
        rounded-xl p-6 cursor-pointer flex flex-col h-full card-hover
        ${isPrimary ? 'bg-trialos-blue text-white shadow-lg' : 'glass-panel'}
      `}
      onClick={onClick}
    >
      <div className={`p-3 rounded-lg mb-4 w-fit ${isPrimary ? 'bg-white/20' : 'bg-trialos-blue/10'}`}>
        {icon}
      </div>
      
      <h3 className={`text-xl font-semibold mb-2 ${isPrimary ? 'text-white' : 'text-trialos-blue'}`}>
        {title}
      </h3>
      
      <p className={`text-sm mb-6 ${isPrimary ? 'text-white/80' : 'text-gray-600'} flex-grow`}>
        {description}
      </p>
      
      <div className="flex justify-end mt-auto">
        <div className={`
          flex items-center text-sm font-medium
          ${isPrimary ? 'text-white' : 'text-trialos-blue'}
        `}>
          <span>Get Started</span>
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="rounded-xl p-5 glass-panel">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h4 className="text-2xl font-bold mt-1 text-trialos-blue">{value}</h4>
        </div>
        <div className="p-2 rounded-lg bg-trialos-blue/10 text-trialos-blue">
          {icon}
        </div>
      </div>
      
      <div className={`mt-4 text-sm ${isPositive ? 'text-green-600' : 'text-red-500'} flex items-center`}>
        <span>{change}</span>
        <div className={`w-16 h-5 ml-2 flex ${isPositive ? 'justify-end' : 'justify-start'}`}>
          <div className={`h-1 w-full rounded-full ${isPositive ? 'bg-green-200' : 'bg-red-200'} relative overflow-hidden`}>
            <div 
              className={`absolute top-0 h-full rounded-full ${isPositive ? 'bg-green-600 right-0' : 'bg-red-500 left-0'}`} 
              style={{ width: '60%' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-trialos-blue">Welcome to TrialOS</h1>
          <p className="text-gray-600 mt-2">
            Your clinical trial management platform for seamless trial matchmaking and operations
          </p>
        </div>
        <div className="glass-panel py-2 px-4 rounded-full text-sm font-medium text-trialos-blue flex items-center">
          <span>St. Mary's Hospital</span>
          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Active Patients" 
          value="124" 
          change="+12% from last month" 
          isPositive={true}
          icon={<Users size={20} />}
        />
        <StatCard 
          title="Trial Referrals" 
          value="38" 
          change="+8% from last month" 
          isPositive={true}
          icon={<ClipboardList size={20} />}
        />
        <StatCard 
          title="Success Rate" 
          value="76%" 
          change="-3% from last month" 
          isPositive={false}
          icon={<Activity size={20} />}
        />
      </div>
      
      {/* Journeys section */}
      <div>
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Choose Your Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Find a Trial */}
          <div className="md:col-span-3 lg:col-span-1">
            <DashboardCard
              title="Find a Trial"
              description="Match your patients with suitable clinical trials using our advanced TrialLM matching algorithm."
              icon={<Search size={24} className="text-trialos-blue" />}
              isPrimary={true}
              onClick={() => navigate('/find-trial')}
            />
          </div>
          
          {/* Manage Referrals */}
          <div>
            <DashboardCard
              title="Manage Referrals"
              description="Track and manage your patient referrals to clinical trials in one place."
              icon={<ClipboardList size={24} className="text-trialos-blue" />}
              onClick={() => navigate('/referrals')}
            />
          </div>
          
          {/* Become a Microhub */}
          <div>
            <DashboardCard
              title="Become a Microhub"
              description="Transform your facility into a decentralized clinical trial microhub."
              icon={<Building2 size={24} className="text-trialos-blue" />}
              onClick={() => navigate('/microhub')}
            />
          </div>
        </div>
      </div>
      
      {/* Recent activity section */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <button className="text-sm text-trialos-blue font-medium hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          {[
            {
              icon: <Search size={16} className="text-white" />,
              title: "New patient match found",
              description: "Patient #12845 matched with Phase 2 Breast Cancer Trial",
              time: "2 hours ago",
              iconBg: "bg-trialos-teal"
            },
            {
              icon: <ClipboardList size={16} className="text-white" />,
              title: "Referral status update",
              description: "Patient #10592 accepted for screening in Lung Cancer Trial",
              time: "Yesterday",
              iconBg: "bg-trialos-blue"
            },
            {
              icon: <Microscope size={16} className="text-white" />,
              title: "Trial documentation updated",
              description: "New protocol version uploaded for Diabetes Type 2 Trial",
              time: "2 days ago",
              iconBg: "bg-purple-500"
            }
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <div className={`p-2 rounded-lg ${item.iconBg} mr-4 mt-1`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
