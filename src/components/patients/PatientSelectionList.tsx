
import React, { useState } from 'react';
import { Search, ArrowRight, FileText } from 'lucide-react';
import { Patient } from './PatientList';

interface PatientSelectionListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onBack: () => void;
}

const PatientSelectionList: React.FC<PatientSelectionListProps> = ({ 
  patients, 
  onSelectPatient,
  onBack
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
  };
  
  const handleProceed = () => {
    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    if (selectedPatient) {
      onSelectPatient(selectedPatient);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="text-xl font-semibold text-trialos-blue">Select Patient for Trial Matching</h2>
      </div>
      
      <div className="bg-trialos-blue/5 border border-trialos-blue/20 rounded-lg p-4">
        <div className="flex items-start">
          <FileText size={20} className="text-trialos-blue mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-trialos-blue">Patient Selection</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select a patient from the list below to proceed with trial matching. Only consented patients are displayed.
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-trialos-blue focus:border-trialos-blue"
          placeholder="Search patients by name, ID, or diagnosis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diagnosis
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No consented patients found matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr 
                  key={patient.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedPatientId === patient.id ? 'bg-trialos-blue/5' : ''}`}
                  onClick={() => handleSelectPatient(patient.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-trialos-blue focus:ring-trialos-blue border-gray-300"
                        checked={selectedPatientId === patient.id}
                        onChange={() => handleSelectPatient(patient.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.diagnosis}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          onClick={handleProceed}
          disabled={!selectedPatientId}
          className={`rounded-lg px-6 py-2 flex items-center ${
            selectedPatientId 
              ? 'btn-primary' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Review Details</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PatientSelectionList;
