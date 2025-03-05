
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Database, Link, Search, CheckCircle2, AlertTriangle, Upload } from 'lucide-react';

interface EhrImportProps {
  onPatientSelected: (patientData: any) => void;
}

const EhrImport: React.FC<EhrImportProps> = ({ onPatientSelected }) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const mockEhrSystems = [
    { id: 'epic', name: 'Epic', logo: '🏥' },
    { id: 'cerner', name: 'Cerner', logo: '⚕️' },
    { id: 'allscripts', name: 'Allscripts', logo: '🩺' },
    { id: 'athenahealth', name: 'Athenahealth', logo: '💉' }
  ];
  
  const connectToEhr = (ehrId: string) => {
    setIsLoading(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsLoading(false);
      setIsConnected(true);
      
      toast({
        title: "EHR Connected",
        description: `Successfully connected to ${ehrId.charAt(0).toUpperCase() + ehrId.slice(1)} EHR system.`,
      });
    }, 2000);
  };
  
  const searchPatients = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a patient name or ID to search.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate patient search
    setTimeout(() => {
      const mockResults = [
        {
          id: "EHR-78912",
          name: "Jennifer Martinez",
          dateOfBirth: "1982-04-15",
          gender: "Female",
          primaryDiagnosis: "Triple Negative Breast Cancer",
          mrn: "MRN-456123"
        },
        {
          id: "EHR-65432",
          name: "David Wilson",
          dateOfBirth: "1975-11-23",
          gender: "Male",
          primaryDiagnosis: "Stage III Colon Cancer",
          mrn: "MRN-789456"
        },
        {
          id: "EHR-34567",
          name: "Amanda Thompson",
          dateOfBirth: "1990-07-08",
          gender: "Female",
          primaryDiagnosis: "Hodgkin's Lymphoma",
          mrn: "MRN-321654"
        }
      ];
      
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1500);
  };
  
  const selectPatient = (patient: any) => {
    // Calculate age from DOB
    const birthDate = new Date(patient.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Format patient data for TrialOS
    const patientData = {
      id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      name: patient.name,
      age: age,
      primaryDiagnosis: patient.primaryDiagnosis,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      ehrId: patient.id,
      mrn: patient.mrn
    };
    
    toast({
      title: "Patient Selected",
      description: `${patient.name} has been selected for import.`,
    });
    
    onPatientSelected(patientData);
  };
  
  return (
    <div className="glass-panel rounded-xl p-6 bg-white/90 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-trialos-blue mb-2">Import from EHR</h2>
      <p className="text-gray-600 mb-6">
        Connect to your hospital's EHR system to import patient data directly into TrialOS.
      </p>
      
      {!isConnected ? (
        <>
          <div className="bg-trialos-blue/5 border border-trialos-blue/20 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Database size={20} className="text-trialos-blue mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-trialos-blue">Connect to your EHR System</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Select your EHR provider below to establish a connection. This is a one-time setup 
                  that allows secure access to patient records with proper authentication.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockEhrSystems.map((ehr) => (
              <div 
                key={ehr.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-trialos-blue/30 hover:bg-trialos-blue/5 cursor-pointer transition-all"
                onClick={() => connectToEhr(ehr.id)}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{ehr.logo}</div>
                  <span className="font-medium">{ehr.name} EHR</span>
                </div>
                <Link size={18} className="text-gray-400" />
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Don't see your EHR system? Contact support for custom integration options.
          </p>
        </>
      ) : (
        <>
          <div className="mb-6 flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircle2 size={20} className="mr-2" />
            <span className="font-medium">Successfully connected to EHR system</span>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Patient by Name or ID
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter patient name or ID..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                />
              </div>
              <button 
                onClick={searchPatients}
                className="ml-2 btn-primary rounded-lg px-4 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          
          {searchResults.length > 0 ? (
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Search Results</h3>
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
                {searchResults.map((patient) => (
                  <div 
                    key={patient.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => selectPatient(patient)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{patient.name}</h4>
                        <p className="text-sm text-gray-500">
                          DOB: {patient.dateOfBirth} • {patient.gender} • MRN: {patient.mrn}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {patient.primaryDiagnosis}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-3">
                Select a patient to import their data into TrialOS. You will be asked to obtain e-consent.
              </p>
            </div>
          ) : searchQuery && !isLoading ? (
            <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <AlertTriangle size={24} className="mx-auto text-amber-500 mb-2" />
              <p className="text-gray-600">No patients match your search criteria.</p>
              <p className="text-sm text-gray-500 mt-1">Try using different search terms or check the patient ID.</p>
            </div>
          ) : !isLoading && (
            <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50">
              <Upload size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">Search for a patient in your EHR system.</p>
              <p className="text-sm text-gray-500 mt-1">Enter a name, MRN, or patient ID above.</p>
            </div>
          )}
        </>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-10 h-10 border-t-4 border-b-4 border-trialos-blue rounded-full animate-spin"></div>
          <p className="ml-3 text-gray-600">
            {!isConnected 
              ? 'Connecting to EHR system...' 
              : 'Searching patient records...'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EhrImport;
