
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, Clock, Beaker } from 'lucide-react';

export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  status: 'consented' | 'pending' | 'matched';
}

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onAddNewPatient: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  onSelectPatient,
  onAddNewPatient,
  searchQuery,
  setSearchQuery
}) => {
  const navigate = useNavigate();
  
  const filteredPatients = patients.filter(patient => {
    const query = searchQuery.toLowerCase();
    return (
      patient.name.toLowerCase().includes(query) ||
      patient.diagnosis.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query)
    );
  });
  
  const getStatusIcon = (status: 'consented' | 'pending' | 'matched') => {
    switch (status) {
      case 'consented':
        return <CheckCircle2 size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'matched':
        return <Beaker size={16} className="text-trialos-blue" />;
    }
  };
  
  const getStatusText = (status: 'consented' | 'pending' | 'matched') => {
    switch (status) {
      case 'consented':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">Consented</span>;
      case 'pending':
        return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">Consent Pending</span>;
      case 'matched':
        return <span className="text-xs px-2 py-1 rounded-full bg-trialos-blue/20 text-trialos-blue">Trial Matched</span>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Patients</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-trialos-blue/20 focus:border-trialos-blue"
            />
          </div>
          <button 
            onClick={onAddNewPatient}
            className="btn-primary rounded-lg px-4 py-2 flex items-center"
          >
            <span className="hidden sm:inline">Add Patient</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
      
      {filteredPatients.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500">
            {searchQuery ? 'No patients match your search criteria' : 'No patients found. Add your first patient!'}
          </p>
          <button 
            onClick={onAddNewPatient}
            className="mt-4 btn-primary rounded-lg px-4 py-2"
          >
            Add New Patient
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              className="glass-panel rounded-xl p-5 cursor-pointer card-hover"
              onClick={() => onSelectPatient(patient)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500">Patient ID: {patient.id}</p>
                  <h3 className="font-semibold text-gray-800 mt-1">{patient.name}</h3>
                </div>
                {getStatusText(patient.status)}
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Age</p>
                  <p className="font-medium">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-gray-500">Diagnosis</p>
                  <p className="font-medium">{patient.diagnosis}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  {getStatusIcon(patient.status)}
                  <span className="ml-1">
                    {patient.status === 'consented' ? 'Ready for matching' : 
                     patient.status === 'pending' ? 'Awaiting consent' : 
                     'Trial matched'}
                  </span>
                </div>
                <button className="text-sm text-trialos-blue font-medium flex items-center">
                  <span>View Details</span>
                  <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
