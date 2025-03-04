
import React from 'react';
import { 
  User, 
  Building2, 
  Shield, 
  Bell, 
  Users, 
  FileText, 
  Database,
  Lock,
  Mail,
  Key
} from 'lucide-react';

const SettingsCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, icon, children }) => {
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-start mb-6">
        <div className="p-3 rounded-lg bg-trialos-blue/10 text-trialos-blue mr-4">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const TextField: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, placeholder, type = "text", disabled = false, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-lg border ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue`}
      />
    </div>
  );
};

const ToggleSwitch: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-start">
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button 
        className={`w-14 h-7 rounded-full p-1 transition-colors ${checked ? 'bg-trialos-blue' : 'bg-gray-300'}`}
        onClick={onChange}
      >
        <div 
          className={`w-5 h-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-7' : 'translate-x-0'}`} 
        />
      </button>
    </div>
  );
};

const Settings: React.FC = () => {
  const [userSettings, setUserSettings] = React.useState({
    firstName: "Demo",
    lastName: "User",
    email: "demo@stmarys.org",
    phoneNumber: "(555) 123-4567",
    hospitalName: "St. Mary's Hospital",
    address: "123 Medical Center Blvd",
    city: "Boston",
    state: "MA",
    zip: "02115",
    notifications: {
      email: true,
      sms: false,
      inApp: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: true
    }
  });
  
  const toggleNotification = (type: 'email' | 'sms' | 'inApp') => {
    setUserSettings({
      ...userSettings,
      notifications: {
        ...userSettings.notifications,
        [type]: !userSettings.notifications[type]
      }
    });
  };
  
  const toggleSecurity = (type: 'twoFactor' | 'sessionTimeout') => {
    setUserSettings({
      ...userSettings,
      security: {
        ...userSettings.security,
        [type]: !userSettings.security[type]
      }
    });
  };
  
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-trialos-blue">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Profile */}
        <SettingsCard
          title="Personal Information"
          description="Manage your personal account information"
          icon={<User size={24} />}
        >
          <div className="grid grid-cols-2 gap-4">
            <TextField 
              label="First Name" 
              value={userSettings.firstName}
              onChange={(e) => setUserSettings({...userSettings, firstName: e.target.value})}
            />
            <TextField 
              label="Last Name" 
              value={userSettings.lastName}
              onChange={(e) => setUserSettings({...userSettings, lastName: e.target.value})}
            />
          </div>
          <TextField 
            label="Email" 
            value={userSettings.email}
            onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
          />
          <TextField 
            label="Phone Number" 
            value={userSettings.phoneNumber}
            onChange={(e) => setUserSettings({...userSettings, phoneNumber: e.target.value})}
          />
          <div className="flex justify-end mt-6">
            <button className="btn-primary rounded-lg px-6 py-2 text-sm">Save Changes</button>
          </div>
        </SettingsCard>
        
        {/* Hospital Information */}
        <SettingsCard
          title="Hospital Information"
          description="Manage details about your medical facility"
          icon={<Building2 size={24} />}
        >
          <TextField 
            label="Hospital Name" 
            value={userSettings.hospitalName}
            onChange={(e) => setUserSettings({...userSettings, hospitalName: e.target.value})}
          />
          <TextField 
            label="Address" 
            value={userSettings.address}
            onChange={(e) => setUserSettings({...userSettings, address: e.target.value})}
          />
          <div className="grid grid-cols-3 gap-4">
            <TextField 
              label="City" 
              value={userSettings.city}
              onChange={(e) => setUserSettings({...userSettings, city: e.target.value})}
            />
            <TextField 
              label="State" 
              value={userSettings.state}
              onChange={(e) => setUserSettings({...userSettings, state: e.target.value})}
            />
            <TextField 
              label="ZIP Code" 
              value={userSettings.zip}
              onChange={(e) => setUserSettings({...userSettings, zip: e.target.value})}
            />
          </div>
          <div className="flex justify-end mt-6">
            <button className="btn-primary rounded-lg px-6 py-2 text-sm">Save Changes</button>
          </div>
        </SettingsCard>
        
        {/* Security Settings */}
        <SettingsCard
          title="Security"
          description="Manage your account security settings"
          icon={<Shield size={24} />}
        >
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-border bg-white/80">
              <div className="flex items-center mb-4">
                <Lock size={18} className="text-trialos-blue mr-2" />
                <h4 className="font-medium text-gray-800">Account Access</h4>
              </div>
              <div className="space-y-4">
                <ToggleSwitch
                  label="Two-Factor Authentication"
                  description="Require a verification code when signing in"
                  checked={userSettings.security.twoFactor}
                  onChange={() => toggleSecurity('twoFactor')}
                />
                <ToggleSwitch
                  label="Automatic Session Timeout"
                  description="Automatically sign out after 30 minutes of inactivity"
                  checked={userSettings.security.sessionTimeout}
                  onChange={() => toggleSecurity('sessionTimeout')}
                />
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-white/80">
              <div className="flex items-center mb-4">
                <Key size={18} className="text-trialos-blue mr-2" />
                <h4 className="font-medium text-gray-800">Password</h4>
              </div>
              <TextField 
                label="Current Password" 
                value=""
                type="password"
                placeholder="Enter your current password"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <TextField 
                  label="New Password" 
                  value=""
                  type="password"
                  placeholder="Enter new password"
                />
                <TextField 
                  label="Confirm Password" 
                  value=""
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button className="btn-outline rounded-lg px-4 py-2 text-sm">Update Password</button>
              </div>
            </div>
          </div>
        </SettingsCard>
        
        {/* Notification Settings */}
        <SettingsCard
          title="Notifications"
          description="Manage how you receive notifications"
          icon={<Bell size={24} />}
        >
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-border bg-white/80">
              <div className="flex items-center mb-4">
                <Mail size={18} className="text-trialos-blue mr-2" />
                <h4 className="font-medium text-gray-800">Notification Channels</h4>
              </div>
              <div className="space-y-4">
                <ToggleSwitch
                  label="Email Notifications"
                  description="Receive notifications via email"
                  checked={userSettings.notifications.email}
                  onChange={() => toggleNotification('email')}
                />
                <ToggleSwitch
                  label="SMS Notifications"
                  description="Receive notifications via text message"
                  checked={userSettings.notifications.sms}
                  onChange={() => toggleNotification('sms')}
                />
                <ToggleSwitch
                  label="In-App Notifications"
                  description="Receive notifications within the TrialOS platform"
                  checked={userSettings.notifications.inApp}
                  onChange={() => toggleNotification('inApp')}
                />
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-dashed border-trialos-blue/30 bg-trialos-blue/5">
              <h4 className="font-medium text-gray-800 mb-2">Notification Categories</h4>
              <p className="text-sm text-gray-600">Configure which types of events you want to be notified about</p>
              <button className="mt-3 text-sm text-trialos-blue font-medium flex items-center">
                <span>Configure Categories</span>
                <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </SettingsCard>
      </div>
      
      {/* Additional settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-center mb-4">
            <Users size={20} className="text-trialos-blue mr-3" />
            <h3 className="font-medium text-gray-800">Team Management</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage users and permissions for your hospital team
          </p>
          <button className="w-full btn-outline rounded-lg py-2 text-sm">Manage Team</button>
        </div>
        
        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-center mb-4">
            <FileText size={20} className="text-trialos-blue mr-3" />
            <h3 className="font-medium text-gray-800">Legal Documents</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Access and manage compliance documents and agreements
          </p>
          <button className="w-full btn-outline rounded-lg py-2 text-sm">View Documents</button>
        </div>
        
        <div className="glass-panel rounded-xl p-5">
          <div className="flex items-center mb-4">
            <Database size={20} className="text-trialos-blue mr-3" />
            <h3 className="font-medium text-gray-800">Data & Privacy</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Manage your data preferences and privacy settings
          </p>
          <button className="w-full btn-outline rounded-lg py-2 text-sm">Manage Data</button>
        </div>
      </div>
    </div>
  );
};

import { ArrowRight } from 'lucide-react';
export default Settings;
