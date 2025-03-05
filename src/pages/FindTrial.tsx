
import React, { useState } from 'react';
import { Search, UserPlus, Sparkles, ArrowRight } from 'lucide-react';
import PatientList, { Patient } from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';
import EConsentForm from '../components/patients/EConsentForm';
import TrialMatching from '../components/trials/TrialMatching';
import EhrImport from '../components/patients/EhrImport';
import PatientAddOptions from '../components/patients/PatientAddOptions';
import PatientProfileForMatching from '../components/patients/PatientProfileForMatching';
import ProcessingAnimation from '../components/trials/ProcessingAnimation';

const FindTrial: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "PT-12845",
      name: "Sarah Johnson",
      age: 54,
      diagnosis: "Breast Cancer (HER2+)",
      status: 'consented' as const
    },
    {
      id: "PT-10592",
      name: "Robert Lee",
      age: 67,
      diagnosis: "NSCLC",
      status: 'matched' as const
    },
    {
      id: "PT-11438",
      name: "Michael Chen",
      age: 42,
      diagnosis: "Colorectal Cancer",
      status: 'pending' as const
    },
    {
      id: "PT-13501",
      name: "Emma Williams",
      age: 36,
      diagnosis: "Ovarian Cancer",
      status: 'consented' as const
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'list' | 'addOptions' | 'form' | 'ehr' | 'consent' | 'match' | 'profile' | 'processing'>('list');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [consentSent, setConsentSent] = useState(false);
  
  const handleAddPatient = () => {
    setCurrentView('addOptions');
  };

  const handleFormOption = () => {
    setCurrentView('form');
  };

  const handleEhrOption = () => {
    setCurrentView('ehr');
  };
  
  const handlePatientAdded = (patientData: any) => {
    const newPatient: Patient = {
      id: patientData.id,
      name: patientData.name,
      age: patientData.age,
      diagnosis: patientData.primaryDiagnosis,
      status: 'pending' as const
    };
    
    setPatients([newPatient, ...patients]);
    setSelectedPatient(newPatient);
    setCurrentView('consent');
  };
  
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    if (patient.status === 'pending') {
      setCurrentView('consent');
    } else if (patient.status === 'consented') {
      setCurrentView('profile');
    } else {
      // If already matched, could show the match results again
      setCurrentView('match');
    }
  };
  
  const handleConsentComplete = (patientId: string) => {
    // Update patient status to consented
    const updatedPatients = patients.map(patient => 
      patient.id === patientId 
        ? { ...patient, status: 'consented' as const } 
        : patient
    );
    
    setPatients(updatedPatients);
    setSelectedPatient(prevPatient => 
      prevPatient && prevPatient.id === patientId 
        ? { ...prevPatient, status: 'consented' as const } 
        : prevPatient
    );
    setCurrentView('list');
    setConsentSent(true);
  };

  const startTrialMatching = () => {
    setCurrentView('processing');
    
    // Simulate processing time before showing results
    setTimeout(() => {
      setCurrentView('match');
    }, 8000);
  };

  const startTrialMatchmaking = () => {
    if (selectedPatient) {
      setCurrentView('profile');
    } else {
      // If no patient is selected, show the list to select one
      setCurrentView('list');
    }
  };
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-trialos-blue/10 via-trialos-blue/5 to-transparent rounded-xl p-6 border-l-4 border-trialos-blue">
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Trial Matching
        </div>
        <h1 className="text-3xl font-bold headline-gradient">Find the Perfect Trial</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Match your patients with suitable clinical trials using our proprietary TrialLM™ 
          technology, powered by advanced AI and real-time eligibility assessment.
        </p>
        
        {currentView === 'list' && !selectedPatient && (
          <button
            onClick={startTrialMatchmaking}
            className="mt-4 btn-primary rounded-lg px-6 py-3 flex items-center"
          >
            <Sparkles size={18} className="mr-2" />
            <span>Start Trial Matchmaking</span>
            <ArrowRight size={18} className="ml-2" />
          </button>
        )}
      </div>
      
      {/* Consent sent notification */}
      {consentSent && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Consent request has been sent successfully to the patient.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setConsentSent(false)}
                  className="inline-flex bg-green-50 p-1.5 text-green-500 rounded-md hover:bg-green-100 focus:outline-none"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="glass-panel rounded-xl p-6 border-t-4 border-trialos-blue shadow-glass">
        {currentView === 'list' && (
          <PatientList 
            patients={patients} 
            onSelectPatient={handleSelectPatient}
            onAddNewPatient={handleAddPatient}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        
        {currentView === 'addOptions' && (
          <>
            <button 
              onClick={() => setCurrentView('list')}
              className="mb-6 text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Patient List
            </button>
            <PatientAddOptions 
              onSelectForm={handleFormOption} 
              onSelectEhr={handleEhrOption} 
            />
          </>
        )}
        
        {currentView === 'form' && (
          <>
            <button 
              onClick={() => setCurrentView('addOptions')}
              className="mb-6 text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Add Options
            </button>
            <PatientForm onComplete={handlePatientAdded} />
          </>
        )}

        {currentView === 'ehr' && (
          <>
            <button 
              onClick={() => setCurrentView('addOptions')}
              className="mb-6 text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Add Options
            </button>
            <EhrImport onPatientSelected={handlePatientAdded} />
          </>
        )}
        
        {currentView === 'consent' && selectedPatient && (
          <>
            <button 
              onClick={() => setCurrentView('list')}
              className="mb-6 text-gray-500 hover:text-gray-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Patient List
            </button>
            <EConsentForm 
              patient={selectedPatient} 
              onConsentComplete={handleConsentComplete} 
            />
          </>
        )}

        {currentView === 'profile' && selectedPatient && (
          <PatientProfileForMatching 
            patient={selectedPatient}
            onBack={() => setCurrentView('list')}
            onProceed={startTrialMatching}
          />
        )}

        {currentView === 'processing' && (
          <ProcessingAnimation />
        )}
        
        {currentView === 'match' && selectedPatient && (
          <TrialMatching 
            patient={selectedPatient}
            onBack={() => setCurrentView('list')}
          />
        )}
      </div>
      
      {/* Premium Feature Highlight */}
      {currentView === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="premium-card">
            <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600 text-sm">
              Our TrialLM™ technology uses advanced machine learning to analyze patient data and find the most suitable clinical trials.
            </p>
          </div>
          
          <div className="premium-card">
            <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">HIPAA Compliant</h3>
            <p className="text-gray-600 text-sm">
              End-to-end encryption and secure data handling ensures all patient information is protected to the highest standards.
            </p>
          </div>
          
          <div className="premium-card">
            <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Results</h3>
            <p className="text-gray-600 text-sm">
              Get instant trial matching results with detailed eligibility assessments and proximity-based recommendations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTrial;
