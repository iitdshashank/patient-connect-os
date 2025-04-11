
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ClipboardList, Building2, Briefcase, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="bg-white rounded-xl p-8 md:p-10 border border-recule-gray-200 shadow-soft text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-recule-black mb-4">Welcome to TrialOS</h1>
        <p className="text-xl text-recule-gray-700 max-w-3xl mx-auto mb-8">
          Your comprehensive platform for clinical trial management and patient matching
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => navigate('/find-trial')}
            className="bg-recule-black hover:bg-recule-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center"
          >
            <Search size={20} className="mr-2" />
            Find a Trial
            <ArrowRight size={20} className="ml-2" />
          </button>
          
          <button 
            onClick={() => navigate('/manage-trials')}
            className="bg-white hover:bg-recule-gray-100 text-recule-black px-6 py-3 rounded-lg font-medium border border-recule-gray-300 flex items-center"
          >
            <Briefcase size={20} className="mr-2" />
            Manage Trials
          </button>
        </div>
      </div>
      
      {/* Featured sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-recule-gray-200 shadow-soft hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-recule-gray-100 flex items-center justify-center mb-4">
            <Search size={24} className="text-recule-black" />
          </div>
          <h2 className="text-2xl font-bold text-recule-black mb-2">Find the Right Trials</h2>
          <p className="text-recule-gray-600 mb-6">
            Match your patients with suitable clinical trials using our advanced TrialLM™ matching algorithm.
          </p>
          <button 
            onClick={() => navigate('/find-trial')} 
            className="flex items-center text-recule-black hover:underline font-medium"
          >
            Learn more <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-recule-gray-200 shadow-soft hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-recule-gray-100 flex items-center justify-center mb-4">
            <ClipboardList size={24} className="text-recule-black" />
          </div>
          <h2 className="text-2xl font-bold text-recule-black mb-2">Manage Referrals</h2>
          <p className="text-recule-gray-600 mb-6">
            Track and manage your patient referrals to clinical trials in one centralized location.
          </p>
          <button 
            onClick={() => navigate('/referrals')} 
            className="flex items-center text-recule-black hover:underline font-medium"
          >
            Learn more <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-recule-gray-200 shadow-soft hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-recule-gray-100 flex items-center justify-center mb-4">
            <Building2 size={24} className="text-recule-black" />
          </div>
          <h2 className="text-2xl font-bold text-recule-black mb-2">Become a Trial Site</h2>
          <p className="text-recule-gray-600 mb-6">
            Transform your facility into a decentralized clinical trial site to expand access to innovative treatments.
          </p>
          <button 
            onClick={() => navigate('/microhub')} 
            className="flex items-center text-recule-black hover:underline font-medium"
          >
            Learn more <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-recule-gray-200 shadow-soft hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-recule-gray-100 flex items-center justify-center mb-4">
            <Briefcase size={24} className="text-recule-black" />
          </div>
          <h2 className="text-2xl font-bold text-recule-black mb-2">Manage Trials</h2>
          <p className="text-recule-gray-600 mb-6">
            Efficiently manage clinical trials running at your facility with our comprehensive trial management tools.
          </p>
          <button 
            onClick={() => navigate('/manage-trials')} 
            className="flex items-center text-recule-black hover:underline font-medium"
          >
            Learn more <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="bg-recule-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-recule-black mb-4">Ready to Transform Clinical Trial Management?</h2>
        <p className="text-recule-gray-600 mb-6 max-w-3xl mx-auto">
          Join thousands of healthcare providers across India who are using TrialOS to streamline their clinical trial operations and improve patient outcomes.
        </p>
        <button className="bg-recule-black hover:bg-recule-gray-800 text-white px-6 py-3 rounded-lg font-medium">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default Index;
