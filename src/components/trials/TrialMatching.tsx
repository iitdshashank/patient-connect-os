
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Beaker, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Search,
  Sparkles,
  Map,
  Calendar,
  Hourglass,
  Users,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { Patient } from '../patients/PatientList';

interface Trial {
  id: string;
  title: string;
  phase: string;
  score: number;
  location: string;
  distance: string;
  sponsor: string;
  status: string;
  criteria: {
    met: string[];
    unmet: string[];
  };
  startDate: string;
  endDate: string;
  enrollment: {
    target: number;
    current: number;
  };
}

interface TrialMatchingProps {
  patient: Patient;
  onBack: () => void;
}

const TrialMatching: React.FC<TrialMatchingProps> = ({ patient, onBack }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [matchedTrials, setMatchedTrials] = useState<Trial[]>([]);
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null);
  
  const runTrialMatching = () => {
    setIsLoading(true);
    setMatchingComplete(false);
    setSelectedTrial(null);
    
    // Simulate trial matching with the TrialLM AI
    setTimeout(() => {
      const mockTrials: Trial[] = [
        {
          id: "NCT04276493",
          title: "Study of Neoadjuvant THP Plus Pembrolizumab Followed by AC in High-Risk HER2+ Breast Cancer",
          phase: "Phase 2",
          score: 92,
          location: "Memorial Sloan Kettering Cancer Center",
          distance: "2.4 miles",
          sponsor: "Memorial Sloan Kettering Cancer Center",
          status: "Recruiting",
          criteria: {
            met: [
              "HER2+ breast cancer",
              "Age between 18-75",
              "ECOG performance status 0-1"
            ],
            unmet: []
          },
          startDate: "2020-03-15",
          endDate: "2023-12-31",
          enrollment: {
            target: 30,
            current: 18
          }
        },
        {
          id: "NCT03199885",
          title: "Neratinib HER Mutation Basket Study (SUMMIT)",
          phase: "Phase 2",
          score: 87,
          location: "Dana-Farber Cancer Institute",
          distance: "5.8 miles",
          sponsor: "Puma Biotechnology, Inc.",
          status: "Recruiting",
          criteria: {
            met: [
              "HER2+ diagnosis",
              "Measurable disease per RECIST 1.1"
            ],
            unmet: [
              "Prior neratinib treatment"
            ]
          },
          startDate: "2018-07-01",
          endDate: "2023-09-30",
          enrollment: {
            target: 435,
            current: 348
          }
        },
        {
          id: "NCT04296942",
          title: "Dose Escalation Study of CLN-081 in Patients With NSCLC",
          phase: "Phase 1/2",
          score: 81,
          location: "Massachusetts General Hospital",
          distance: "3.2 miles",
          sponsor: "Cullinan Oncology, LLC",
          status: "Recruiting",
          criteria: {
            met: [
              "Histologically or cytologically confirmed NSCLC",
              "ECOG performance status 0-1"
            ],
            unmet: [
              "Active CNS metastases"
            ]
          },
          startDate: "2020-02-27",
          endDate: "2024-06-30",
          enrollment: {
            target: 100,
            current: 73
          }
        },
        {
          id: "NCT04538742",
          title: "Study of Oral Selective Estrogen Receptor Degrader (SERD) AZD9833 in Women With ER-positive HER2-negative Advanced Breast Cancer",
          phase: "Phase 2",
          score: 78,
          location: "Brigham and Women's Hospital",
          distance: "4.1 miles",
          sponsor: "AstraZeneca",
          status: "Recruiting",
          criteria: {
            met: [
              "ER-positive breast cancer",
              "Postmenopausal status"
            ],
            unmet: [
              "Prior treatment with fulvestrant"
            ]
          },
          startDate: "2020-09-01",
          endDate: "2024-03-31",
          enrollment: {
            target: 150,
            current: 97
          }
        },
        {
          id: "NCT04484870",
          title: "CRIZEC: Crizotinib and Ceritinib in Patients With MET Exon 14 Mutation Positive NSCLC",
          phase: "Phase 2",
          score: 75,
          location: "Dana-Farber Cancer Institute",
          distance: "5.8 miles",
          sponsor: "Dana-Farber Cancer Institute",
          status: "Recruiting",
          criteria: {
            met: [
              "MET exon 14 skipping mutation",
              "Measurable disease per RECIST 1.1"
            ],
            unmet: [
              "Prior MET inhibitor treatment"
            ]
          },
          startDate: "2020-08-01",
          endDate: "2024-12-31",
          enrollment: {
            target: 40,
            current: 17
          }
        }
      ];
      
      setMatchedTrials(mockTrials);
      setIsLoading(false);
      setMatchingComplete(true);
      
      toast({
        title: "Trial Matching Complete",
        description: `Found ${mockTrials.length} potential trials for ${patient.name}`,
      });
    }, 3500);
  };
  
  const handleSendReferral = (trial: Trial) => {
    toast({
      title: "Referral Request Sent",
      description: `Referral request for ${patient.name} has been sent to ${trial.sponsor} (${trial.id})`,
    });
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
          Back to Patients
        </button>
        <div className="flex items-center">
          <div className="px-3 py-1 rounded-full border border-trialos-blue/30 bg-trialos-blue/5 text-trialos-blue text-xs font-medium">
            Patient: {patient.name}
          </div>
        </div>
      </div>
      
      {!matchingComplete ? (
        <div className="glass-panel rounded-xl p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center mx-auto mb-4">
            <Beaker size={28} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Trial Matching</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Use our proprietary TrialLM technology to find the most suitable clinical trials for your patient.
          </p>
          
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 border-t-4 border-b-4 border-trialos-blue rounded-full animate-spin"></div>
                <p className="text-gray-600">Analyzing patient data and trial criteria...</p>
              </div>
              
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 mt-6">
                <h3 className="font-medium text-gray-700 mb-2">TrialLM Processing Steps:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                      <CheckCircle2 size={14} />
                    </span>
                    <span className="text-sm">Analyzing patient profile</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                      <CheckCircle2 size={14} />
                    </span>
                    <span className="text-sm">Extracting key eligibility factors</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-trialos-blue/20 text-trialos-blue flex items-center justify-center mr-2 animate-pulse">
                      <Search size={14} />
                    </span>
                    <span className="text-sm">Matching against trial database</span>
                  </li>
                  <li className="flex items-center opacity-50">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-2">
                      <BarChart3 size={14} />
                    </span>
                    <span className="text-sm">Ranking trials by suitability</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button 
              onClick={runTrialMatching}
              className="btn-primary rounded-lg px-6 py-3 flex items-center mx-auto"
            >
              <Sparkles size={18} className="mr-2" />
              <span>Match with TrialLM</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-${selectedTrial ? '1' : '3'} space-y-4`}>
            <div className="bg-white shadow-sm rounded-xl p-4 border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Matched Trials</h2>
                <div className="text-xs text-gray-500">
                  {matchedTrials.length} trials found
                </div>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {matchedTrials.map((trial) => (
                  <div 
                    key={trial.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-trialos-blue/50 hover:bg-trialos-blue/5 
                      ${selectedTrial?.id === trial.id ? 'border-trialos-blue bg-trialos-blue/5' : 'border-gray-200'}`}
                    onClick={() => setSelectedTrial(trial)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">{trial.id}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                            {trial.phase}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-800 text-sm mt-1 line-clamp-2">
                          {trial.title}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-10 h-10 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center relative">
                          {trial.score}
                          <span className="absolute -top-1 -right-1 text-xs">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Map size={12} className="mr-1" />
                      <span className="truncate">{trial.location}</span>
                      <span className="mx-1">•</span>
                      <span>{trial.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {selectedTrial && (
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white shadow-sm rounded-xl p-5 border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{selectedTrial.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                        {selectedTrial.phase}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                        {selectedTrial.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mt-2">
                      {selectedTrial.title}
                    </h2>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-trialos-blue/10 text-trialos-blue flex items-center justify-center font-bold relative">
                      {selectedTrial.score}
                      <span className="absolute top-0 right-0 text-xs">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Map size={16} className="mr-1 text-trialos-blue" />
                        Location
                      </h3>
                      <p className="text-gray-600">{selectedTrial.location}</p>
                      <p className="text-sm text-gray-500">{selectedTrial.distance} from patient</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Calendar size={16} className="mr-1 text-trialos-blue" />
                        Study Dates
                      </h3>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">Start: {selectedTrial.startDate}</span>
                        <span className="mx-2">—</span>
                        <span className="text-gray-600">End: {selectedTrial.endDate}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Users size={16} className="mr-1 text-trialos-blue" />
                        Enrollment
                      </h3>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-trialos-blue rounded-full"
                          style={{ width: `${(selectedTrial.enrollment.current / selectedTrial.enrollment.target) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedTrial.enrollment.current} of {selectedTrial.enrollment.target} patients enrolled
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Eligibility Match</h3>
                    <div className="space-y-2">
                      {selectedTrial.criteria.met.map((criterion, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{criterion}</span>
                        </div>
                      ))}
                      
                      {selectedTrial.criteria.unmet.map((criterion, idx) => (
                        <div key={idx} className="flex items-start">
                          <XCircle size={16} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div className="flex items-center">
                    <Hourglass size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">Sponsor: {selectedTrial.sponsor}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="border border-trialos-blue text-trialos-blue hover:bg-trialos-blue/10 rounded-lg px-4 py-2 text-sm flex items-center">
                      <ExternalLink size={14} className="mr-1" />
                      View on ClinicalTrials.gov
                    </button>
                    
                    <button 
                      onClick={() => handleSendReferral(selectedTrial)}
                      className="btn-primary rounded-lg px-4 py-2 text-sm flex items-center"
                    >
                      <MessageSquare size={14} className="mr-1" />
                      Send Referral
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-trialos-blue/5 border border-trialos-blue/20 rounded-lg p-4">
                <div className="flex items-start">
                  <Sparkles size={18} className="text-trialos-blue mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-trialos-blue">TrialLM Match Analysis</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      This trial was matched with a {selectedTrial.score}% confidence score based on the patient's diagnosis, 
                      medical history, and the trial's eligibility criteria. The patient meets all primary eligibility 
                      criteria with {selectedTrial.criteria.unmet.length === 0 ? 'no potential exclusions' : 
                      `${selectedTrial.criteria.unmet.length} potential exclusion(s)`} identified.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrialMatching;
