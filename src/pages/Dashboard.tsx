
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ClipboardList, 
  Building2,
  ArrowRight,
  Users,
  Activity,
  Microscope,
  Sparkles,
  Calendar,
  FileBarChart,
  Briefcase,
  Map,
  AlertCircle,
  Clock
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
        rounded-xl p-6 cursor-pointer flex flex-col h-full transition-all duration-300 
        hover:shadow-lg transform hover:-translate-y-1 hover:border-trialos-blue
        ${isPrimary ? 'bg-gradient-to-br from-trialos-blue to-trialos-teal text-white shadow-lg' : 'glass-panel border border-border'}
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
          flex items-center text-sm font-medium group
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
    <div className="rounded-xl p-5 glass-panel border border-border hover:border-trialos-blue/40 transition-all duration-300">
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

const UpcomingEvent: React.FC<{
  title: string;
  time: string;
  type: string;
  patient?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, time, type, patient, icon, color }) => {
  return (
    <div className="flex items-start p-3 hover:bg-trialos-blue/5 rounded-lg transition-colors cursor-pointer">
      <div className={`p-2 rounded-lg ${color} text-white mr-3 flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        {patient && <p className="text-xs text-gray-500">Patient: {patient}</p>}
        <div className="flex items-center mt-1">
          <Clock size={12} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-400">{time}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 ml-2">{type}</span>
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
      <div className="bg-gradient-to-r from-trialos-blue/10 via-trialos-blue/5 to-transparent p-6 rounded-xl border-l-4 border-trialos-blue">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-trialos-blue">Welcome to TrialOS</h1>
            <p className="text-gray-600 mt-2">
              Your clinical trial management platform for seamless trial matchmaking and operations
            </p>
          </div>
          <div className="glass-panel py-2 px-4 rounded-full text-sm font-medium text-trialos-blue flex items-center">
            <span>AIIMS Delhi</span>
            <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
          </div>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button 
            onClick={() => navigate('/find-trial')}
            className="bg-trialos-blue hover:bg-trialos-blue/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
          >
            <Search size={16} className="mr-2" />
            Find a Trial
          </button>
          <button 
            onClick={() => navigate('/referrals')}
            className="bg-white hover:bg-gray-50 text-trialos-blue px-4 py-2 rounded-lg text-sm font-medium flex items-center border border-trialos-blue/30"
          >
            <Users size={16} className="mr-2" />
            Patient Referrals
          </button>
          <button 
            className="bg-white hover:bg-gray-50 text-trialos-blue px-4 py-2 rounded-lg text-sm font-medium flex items-center border border-trialos-blue/30"
            onClick={() => navigate('/manage-trials')}
          >
            <Briefcase size={16} className="mr-2" />
            Manage Trials
          </button>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Eligible Patients" 
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
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Journeys */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Choose Your Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Find a Trial */}
            <DashboardCard
              title="Find a Trial"
              description="Match your patients with suitable clinical trials using our advanced TrialLM matching algorithm."
              icon={<Search size={24} className="text-white" />}
              isPrimary={true}
              onClick={() => navigate('/find-trial')}
            />
            
            {/* Manage Referrals */}
            <DashboardCard
              title="Manage Referrals"
              description="Track and manage your patient referrals to clinical trials in one place."
              icon={<ClipboardList size={24} className="text-trialos-blue" />}
              onClick={() => navigate('/referrals')}
            />
            
            {/* Become a Trial Site */}
            <DashboardCard
              title="Become a Trial Site"
              description="Transform your facility into a decentralized clinical trial site and expand access to innovative treatments."
              icon={<Building2 size={24} className="text-trialos-blue" />}
              onClick={() => navigate('/microhub')}
            />
            
            {/* Manage Trials */}
            <DashboardCard
              title="Manage Trials"
              description="Efficiently manage clinical trials running at your facility with our comprehensive trial management tools."
              icon={<Briefcase size={24} className="text-trialos-blue" />}
              onClick={() => navigate('/manage-trials')}
            />
          </div>
          
          {/* Trial Metrics */}
          <div className="glass-panel rounded-xl p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FileBarChart size={20} className="text-trialos-blue mr-2" />
                Trial Metrics
              </h2>
              <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Trials", value: "12", color: "text-trialos-blue" },
                { label: "Trial Sites", value: "4", color: "text-trialos-teal" },
                { label: "Potential Sites", value: "23", color: "text-purple-600" },
                { label: "Matched Patients", value: "46", color: "text-green-600" },
              ].map((metric, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">{metric.label}</p>
                  <p className={`text-xl font-bold mt-1 ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Trial Performance</span>
                <span>Enrollment Rate: 82%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-trialos-blue to-trialos-teal rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Recent Activity & Upcoming */}
        <div className="space-y-6">
          {/* Recent activity section */}
          <div className="glass-panel rounded-xl p-6 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Activity size={20} className="text-trialos-blue mr-2" />
                Recent Activity
              </h2>
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
                <div key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
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
          
          {/* Upcoming Events */}
          <div className="glass-panel rounded-xl p-6 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar size={20} className="text-trialos-blue mr-2" />
                Upcoming Events
              </h2>
              <button className="text-sm text-trialos-blue font-medium hover:underline">
                View Calendar
              </button>
            </div>
            
            <div className="space-y-2">
              <UpcomingEvent
                title="Weekly Trial Review Meeting"
                time="Today, 2:00 PM"
                type="Meeting"
                icon={<Calendar size={16} />}
                color="bg-trialos-blue"
              />
              
              <UpcomingEvent
                title="Patient Screening"
                time="Tomorrow, 10:30 AM"
                type="Appointment"
                patient="Vikram Singh"
                icon={<Users size={16} />}
                color="bg-trialos-teal"
              />
              
              <UpcomingEvent
                title="Protocol Amendment Review"
                time="Apr 12, 11:00 AM"
                type="Task"
                icon={<FileBarChart size={16} />}
                color="bg-purple-600"
              />
              
              <UpcomingEvent
                title="Site Initiation Visit"
                time="Apr 15, 9:00 AM"
                type="Visit"
                icon={<Map size={16} />}
                color="bg-green-600"
              />
            </div>
            
            <button className="w-full mt-4 text-center text-sm text-trialos-blue py-2 border border-trialos-blue/30 rounded-lg hover:bg-trialos-blue/5">
              + Add New Event
            </button>
          </div>
          
          {/* Important Notifications */}
          <div className="glass-panel rounded-xl p-6 border border-border">
            <div className="flex items-center mb-4">
              <AlertCircle size={20} className="text-amber-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Important Notifications</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Protocol amendment for Diabetes Type 2 Trial requires your review by Apr 15
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  3 new eligible patients identified for Breast Cancer Trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
