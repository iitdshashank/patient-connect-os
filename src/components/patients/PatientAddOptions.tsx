
import React from 'react';
import { FileType, Database, ArrowRight, Upload, MessageSquare } from 'lucide-react';

interface PatientAddOptionsProps {
  onSelectForm: () => void;
  onSelectEhr: () => void;
  onSelectQuickEntry: () => void;
  onSelectDocUpload: () => void;
}

const PatientAddOptions: React.FC<PatientAddOptionsProps> = ({ 
  onSelectForm, 
  onSelectEhr, 
  onSelectQuickEntry,
  onSelectDocUpload
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-trialos-blue mb-6">Add New Patient</h2>
      <p className="text-gray-600 mb-8">
        Choose how you would like to add a new patient to the TrialOS platform.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={onSelectEhr}
          className="premium-card cursor-pointer hover:border-trialos-blue/50 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
            <Database size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Import from EHR</h3>
          <p className="text-gray-600 text-sm mb-4">
            Connect to your hospital's EHR system to import patient data directly. 
            This is the fastest and most accurate way to add patients.
          </p>
          <div className="flex justify-end mt-4">
            <button className="text-trialos-blue font-medium flex items-center text-sm">
              <span>Continue</span>
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div 
          onClick={onSelectDocUpload}
          className="premium-card cursor-pointer hover:border-trialos-blue/50 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
            <Upload size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Documents</h3>
          <p className="text-gray-600 text-sm mb-4">
            Upload patient's medical reports and prescriptions. Our AI will automatically extract 
            relevant clinical data using advanced OCR technology.
          </p>
          <div className="flex justify-end mt-4">
            <button className="text-trialos-blue font-medium flex items-center text-sm">
              <span>Continue</span>
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div 
          onClick={onSelectForm}
          className="premium-card cursor-pointer hover:border-trialos-blue/50 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
            <FileType size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Manual Entry</h3>
          <p className="text-gray-600 text-sm mb-4">
            Manually enter comprehensive patient information using our detailed multi-step form. 
            This option allows you to input complete clinical information.
          </p>
          <div className="flex justify-end mt-4">
            <button className="text-trialos-blue font-medium flex items-center text-sm">
              <span>Continue</span>
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div 
          onClick={onSelectQuickEntry}
          className="premium-card cursor-pointer hover:border-trialos-blue/50 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Text Entry</h3>
          <p className="text-gray-600 text-sm mb-4">
            Write a brief paragraph describing the patient's condition and details. Our AI will parse 
            the text and extract structured information automatically.
          </p>
          <div className="flex justify-end mt-4">
            <button className="text-trialos-blue font-medium flex items-center text-sm">
              <span>Continue</span>
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-trialos-blue/5 border border-trialos-blue/20 rounded-lg p-4 mt-8">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-trialos-blue mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-trialos-blue">Patient Consent Required</h4>
            <p className="text-sm text-gray-600 mt-1">
              All patients added to TrialOS require consent before their data can be used for trial matching. 
              You'll be prompted to send an e-consent request after adding patient information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAddOptions;
