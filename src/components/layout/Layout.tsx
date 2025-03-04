
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
  Settings 
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
          ? 'bg-trialos-blue text-white' 
          : 'text-trialos-blue hover:bg-trialos-light'
      } rounded-lg p-3 mb-2 cursor-pointer transition-all duration-300`}
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
    { path: '/', text: 'Dashboard', icon: <Home size={20} /> },
    { path: '/find-trial', text: 'Find a Trial', icon: <Search size={20} /> },
    { path: '/referrals', text: 'Manage Referrals', icon: <ClipboardList size={20} /> },
    { path: '/microhub', text: 'Become a Microhub', icon: <Building2 size={20} /> },
    { path: '/settings', text: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`bg-white border-r border-border shadow-soft transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        } flex flex-col justify-between`}
      >
        {/* Logo and toggle */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-trialos-blue flex items-center justify-center text-white font-bold">
                  T
                </div>
                <h1 className="ml-2 text-xl font-bold text-trialos-blue">TrialOS</h1>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-full hover:bg-trialos-light text-trialos-blue transition-colors"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
        
        {/* Navigation items */}
        <div className="flex-grow py-8 px-2 overflow-y-auto">
          <nav>
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                text={item.text}
                isActive={location.pathname === item.path}
                isCollapsed={isCollapsed}
                onClick={() => navigate(item.path)}
              />
            ))}
          </nav>
        </div>
        
        {/* User profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-trialos-blue/10 flex items-center justify-center">
              <User size={18} className="text-trialos-blue" />
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">Demo User</p>
                <p className="text-xs text-muted-foreground">St. Mary's Hospital</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-border shadow-sm flex items-center justify-between px-6">
          <h2 className="text-lg font-medium">
            {sidebarItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-trialos-light text-trialos-blue transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-trialos-teal rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-trialos-blue to-trialos-teal flex items-center justify-center text-white cursor-pointer">
              D
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-trialos-neutral/30 p-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
