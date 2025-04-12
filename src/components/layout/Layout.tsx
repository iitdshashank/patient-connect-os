
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Search, 
  ClipboardList, 
  Building2, 
  Bell, 
  User, 
  Settings,
  Briefcase,
  FileText,
  Layers,
  MessageSquare
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  isActive, 
  isCollapsed, 
  onClick 
}) => {
  return (
    <div
      className={`flex items-center ${
        isCollapsed ? 'justify-center' : 'justify-start'
      } ${
        isActive 
          ? 'sidebar-item-active' 
          : 'sidebar-item'
      } mb-1 cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!isCollapsed && (
        <span className={`ml-3 font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          {text}
        </span>
      )}
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarItems = [
    { path: '/', text: 'Dashboard', icon: <Home size={18} /> },
    { path: '/find-trial', text: 'Find a Trial', icon: <Search size={18} /> },
    { path: '/referrals', text: 'Manage Referrals', icon: <ClipboardList size={18} /> },
    { path: '/microhub', text: 'Become a Trial Site', icon: <Building2 size={18} /> },
    { path: '/manage-trials', text: 'Manage Trials', icon: <Briefcase size={18} /> },
    { divider: true },
    { path: '/documents', text: 'Documents', icon: <FileText size={18} /> },
    { path: '/messages', text: 'Messages', icon: <MessageSquare size={18} /> },
    { path: '/settings', text: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-recule-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`bg-white border-r border-recule-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-60'
        } flex flex-col justify-between`}
      >
        {/* Logo and toggle */}
        <div className="p-4 border-b border-recule-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-recule-black flex items-center justify-center text-white font-bold">
                  T
                </div>
                <h1 className="ml-2 text-xl font-bold text-recule-black">TrialOS</h1>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-full hover:bg-recule-gray-100 text-recule-gray-500 transition-colors"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        </div>
        
        {/* Navigation items */}
        <div className="flex-grow py-4 px-3 overflow-y-auto">
          <nav>
            {sidebarItems.map((item, index) => (
              item.divider ? (
                <div key={`divider-${index}`} className="my-3 border-t border-recule-gray-200"></div>
              ) : (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  text={item.text}
                  isActive={location.pathname === item.path}
                  isCollapsed={isCollapsed}
                  onClick={() => navigate(item.path)}
                />
              )
            ))}
          </nav>
        </div>
        
        {/* User profile */}
        <div className="p-4 border-t border-recule-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-recule-gray-200 flex items-center justify-center">
              <User size={16} className="text-recule-gray-700" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-recule-black">Dr. Ananya Sharma</p>
                <p className="text-xs text-recule-gray-600">AIIMS Delhi</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-recule-gray-200 shadow-sm flex items-center justify-between px-4">
          <h2 className="text-base font-medium text-recule-black">
            {sidebarItems.find(item => 'path' in item && item.path === location.pathname)?.text || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="py-1.5 px-3 text-sm border border-recule-gray-300 rounded-md w-48 focus:outline-none focus:ring-1 focus:ring-recule-gray-400"
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-recule-gray-500" />
            </div>
            <button className="p-1.5 rounded-full hover:bg-recule-gray-100 text-recule-gray-700 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-recule-black rounded-full"></span>
            </button>
            <div className="flex items-center border-l border-recule-gray-200 ml-2 pl-4">
              <div className="w-8 h-8 rounded-full bg-recule-gray-800 flex items-center justify-center text-white text-sm cursor-pointer">
                AS
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-recule-gray-100 p-4 md:p-6">
          <div className="animate-fade-in max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
