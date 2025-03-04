
import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import PatientList, { Patient } from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';
import EConsentForm from '../components/patients/EConsentForm';
import TrialMatching from '../components/trials/TrialMatching';

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
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'consent' | 'match'>('list');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  const handleAddPatient = () => {
    setCurrentView('add');
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
      setCurrentView('match');
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
    setCurrentView('match');
  };
  
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-block text-xs mb-2 px-3 py-1 bg-trialos-light text-trialos-blue rounded-full font-medium">
          Trial Matching
        </div>
        <h1 className="text-3xl font-bold text-trialos-blue">Find a Trial</h1>
        <p className="text-gray-600 mt-2">Match your patients with suitable clinical trials using our TrialLM AI technology</p>
      </div>
      
      {/* Main content */}
      <div className="glass-panel rounded-xl p-6 border-t-4 border-trialos-blue">
        {currentView === 'list' && (
          <PatientList 
            patients={patients} 
            onSelectPatient={handleSelectPatient}
            onAddNewPatient={handleAddPatient}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        
        {currentView === 'add' && (
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
            <PatientForm onComplete={handlePatientAdded} />
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
        
        {currentView === 'match' && selectedPatient && (
          <TrialMatching 
            patient={selectedPatient}
            onBack={() => setCurrentView('list')}
          />
        )}
      </div>
    </div>
  );
};

export default FindTrial;
