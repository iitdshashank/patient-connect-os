
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckSquare, 
  Square, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { Patient } from './PatientList';

interface PatientProfileForMatchingProps {
  patient: Patient;
  onBack: () => void;
  onProceed: () => void;
}

const PatientProfileForMatching: React.FC<PatientProfileForMatchingProps> = ({ patient, onBack, onProceed }) => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'demographics': true,
    'diagnosis': true,
    'treatments': false,
    'labs': false,
    'genomics': false,
    'notes': false
  });
  
  const [selectedData, setSelectedData] = useState<Record<string, boolean>>({
    'demographics': true,
    'diagnosis': true,
    'treatments': true,
    'labs': true,
    'genomics': true,
    'clinicalNote1': false,
    'clinicalNote2': true,
    'clinicalNote3': false
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const toggleDataSelection = (key: string) => {
    setSelectedData({
      ...selectedData,
      [key]: !selectedData[key]
    });
  };
  
  const handleProceed = () => {
    // Check if at least some data is selected
    const hasSelection = Object.values(selectedData).some(value => value);
    
    if (!hasSelection) {
      toast({
        title: "Selection Required",
        description: "Please select at least one data category for trial matching.",
        variant: "destructive"
      });
      return;
    }
    
    // Proceed to trial matching
    onProceed();
  };
  
  // Mock patient data
  const patientData = {
    demographics: {
      age: patient.age,
      gender: "Female",
      ethnicity: "Caucasian",
      weight: "68 kg",
      height: "165 cm"
    },
    diagnosis: {
      primary: patient.diagnosis,
      stage: "Stage II",
      histology: "Invasive ductal carcinoma",
      diagnosisDate: "2023-08-15",
      biomarkers: "ER+/PR+/HER2+"
    },
    treatments: {
      surgeries: [
        "Lumpectomy (2023-09-10)",
        "Sentinel lymph node biopsy (2023-09-10)"
      ],
      medications: [
        "Tamoxifen 20mg daily (Current)",
        "Trastuzumab IV (Completed 2023-12-20)"
      ],
      radiotherapy: "Completed 30 sessions (2023-10-15 to 2023-11-25)"
    },
    labs: {
      cbc: "WBC: 5.2, RBC: 4.1, Hgb: 12.8, Plt: 210",
      chemistry: "Glucose: 92, Creatinine: 0.9, ALT: 25, AST: 28",
      tumorMarkers: "CA 15-3: 22 (Normal range: <30)"
    },
    genomics: {
      mutations: "PIK3CA mutation positive",
      variantsOfUnknownSignificance: "PALB2 c.2748+1G>T",
      tumorMutationalBurden: "Low (3 mutations/Mb)"
    },
    clinicalNotes: [
      {
        id: "clinicalNote1",
        date: "2023-11-15",
        author: "Dr. Smith, Oncology",
        content: "Patient is responding well to hormone therapy. No significant side effects reported. Next follow-up scheduled in 3 months."
      },
      {
        id: "clinicalNote2",
        date: "2023-10-05",
        author: "Dr. Johnson, Radiation Oncology",
        content: "Radiotherapy initiated for right breast. Treatment plan: 30 sessions of 2 Gy each. Patient tolerated first session well with minimal skin reaction."
      },
      {
        id: "clinicalNote3",
        date: "2023-09-15",
        author: "Dr. Miller, Surgical Oncology",
        content: "Post-surgical follow-up shows good healing. Pathology confirmed clear margins. Sentinel lymph node negative for metastasis. Patient being referred to medical oncology for adjuvant therapy discussion."
      }
    ]
  };
  
  // Section component for collapsible data sections
  const Section = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
        onClick={() => toggleSection(id)}
      >
        <h3 className="font-medium text-gray-800 flex items-center">
          <input
            type="checkbox"
            checked={selectedData[id] || false}
            onChange={(e) => {
              e.stopPropagation();
              toggleDataSelection(id);
            }}
            className="mr-3 h-4 w-4 rounded border-gray-300 text-trialos-blue focus:ring-trialos-blue"
          />
          {title}
        </h3>
        <span>
          {expandedSections[id] ? (
            <ChevronUp size={18} className="text-gray-500" />
          ) : (
            <ChevronDown size={18} className="text-gray-500" />
          )}
        </span>
      </div>
      
      {expandedSections[id] && (
        <div className="p-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
  
  // Function to render clinical note
  const renderClinicalNote = (note: any) => (
    <div key={note.id} className="mb-3 last:mb-0 bg-white p-3 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="text-xs text-gray-500">{note.date}</span>
            <span className="mx-2">•</span>
            <span className="text-xs text-gray-500">{note.author}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1 line-clamp-2">{note.content}</p>
        </div>
        <div onClick={(e) => {
          e.stopPropagation();
          toggleDataSelection(note.id);
        }}>
          {selectedData[note.id] ? (
            <CheckSquare size={18} className="text-trialos-blue cursor-pointer" />
          ) : (
            <Square size={18} className="text-gray-400 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
  
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
      
      <div className="bg-trialos-blue/5 border border-trialos-blue/20 rounded-lg p-4">
        <div className="flex items-start">
          <FileText size={20} className="text-trialos-blue mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-trialos-blue">Select Data for Trial Matching</h3>
            <p className="text-sm text-gray-600 mt-1">
              Review and select the patient data below that you want to include in the trial matching process. 
              This helps our TrialLM™ technology find the most relevant clinical trials.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle size={20} className="text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Data Privacy Notice</h3>
            <p className="text-sm text-amber-700 mt-1">
              Only selected data will be used for trial matching. Patient identification information will be masked 
              when sharing with trial sponsors unless explicit permission is granted.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Section title="Demographics" id="demographics">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Age</p>
              <p className="font-medium">{patientData.demographics.age} years</p>
            </div>
            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-medium">{patientData.demographics.gender}</p>
            </div>
            <div>
              <p className="text-gray-500">Ethnicity</p>
              <p className="font-medium">{patientData.demographics.ethnicity}</p>
            </div>
            <div>
              <p className="text-gray-500">Weight/Height</p>
              <p className="font-medium">{patientData.demographics.weight} / {patientData.demographics.height}</p>
            </div>
          </div>
        </Section>
        
        <Section title="Diagnosis" id="diagnosis">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Primary Diagnosis</p>
              <p className="font-medium">{patientData.diagnosis.primary}</p>
            </div>
            <div>
              <p className="text-gray-500">Stage</p>
              <p className="font-medium">{patientData.diagnosis.stage}</p>
            </div>
            <div>
              <p className="text-gray-500">Histology</p>
              <p className="font-medium">{patientData.diagnosis.histology}</p>
            </div>
            <div>
              <p className="text-gray-500">Diagnosis Date</p>
              <p className="font-medium">{patientData.diagnosis.diagnosisDate}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Biomarkers</p>
              <p className="font-medium">{patientData.diagnosis.biomarkers}</p>
            </div>
          </div>
        </Section>
        
        <Section title="Treatment History" id="treatments">
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Surgeries</p>
              <ul className="list-disc pl-5 space-y-1">
                {patientData.treatments.surgeries.map((surgery, index) => (
                  <li key={index} className="font-medium">{surgery}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Medications</p>
              <ul className="list-disc pl-5 space-y-1">
                {patientData.treatments.medications.map((medication, index) => (
                  <li key={index} className="font-medium">{medication}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Radiotherapy</p>
              <p className="font-medium">{patientData.treatments.radiotherapy}</p>
            </div>
          </div>
        </Section>
        
        <Section title="Lab Results" id="labs">
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Complete Blood Count</p>
              <p className="font-medium">{patientData.labs.cbc}</p>
            </div>
            <div>
              <p className="text-gray-500">Chemistry</p>
              <p className="font-medium">{patientData.labs.chemistry}</p>
            </div>
            <div>
              <p className="text-gray-500">Tumor Markers</p>
              <p className="font-medium">{patientData.labs.tumorMarkers}</p>
            </div>
          </div>
        </Section>
        
        <Section title="Genomic Data" id="genomics">
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Known Mutations</p>
              <p className="font-medium">{patientData.genomics.mutations}</p>
            </div>
            <div>
              <p className="text-gray-500">Variants of Unknown Significance</p>
              <p className="font-medium">{patientData.genomics.variantsOfUnknownSignificance}</p>
            </div>
            <div>
              <p className="text-gray-500">Tumor Mutational Burden</p>
              <p className="font-medium">{patientData.genomics.tumorMutationalBurden}</p>
            </div>
          </div>
        </Section>
        
        <Section title="Clinical Notes" id="notes">
          <div className="space-y-2">
            {patientData.clinicalNotes.map(renderClinicalNote)}
          </div>
        </Section>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleProceed}
          className="btn-primary rounded-lg px-6 py-2 flex items-center"
        >
          <span>Proceed to Trial Matching</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PatientProfileForMatching;
