
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckSquare, 
  Square, 
  ArrowRight,
  AlertTriangle,
  Clock,
  FileType,
  Calendar,
  CircleCheck,
  FileMedical,
  TestTube,
  Dna,
  StickyNote
} from 'lucide-react';
import { Patient } from './PatientList';

interface PatientProfileForMatchingProps {
  patient: Patient;
  onBack: () => void;
  onProceed: () => void;
}

interface ClinicalDocument {
  id: string;
  type: 'note' | 'test' | 'procedure' | 'medication' | 'imaging';
  title: string;
  description: string;
  date: string;
  doctor: string;
  content?: string;
}

const PatientProfileForMatching: React.FC<PatientProfileForMatchingProps> = ({ patient, onBack, onProceed }) => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'demographics': true,
    'diagnosis': true,
    'treatments': false,
    'labs': false,
    'genomics': false,
    'timeline': true
  });
  
  const [selectedData, setSelectedData] = useState<Record<string, boolean>>({
    'demographics': true,
    'diagnosis': true,
    'treatments': true,
    'labs': true,
    'genomics': true
  });

  // Mock timeline of clinical documents
  const [clinicalDocuments, setClinicalDocuments] = useState<ClinicalDocument[]>([
    {
      id: "doc-001",
      type: "note",
      title: "Initial Oncology Consultation",
      description: "First visit with oncologist Dr. Sarah Miller",
      date: "2023-08-10",
      doctor: "Dr. Sarah Miller",
      content: "Patient presents with newly diagnosed breast cancer. Planning for biopsy and staging workup."
    },
    {
      id: "doc-002",
      type: "test",
      title: "Diagnostic Mammogram",
      description: "Bilateral diagnostic mammogram with 3D tomosynthesis",
      date: "2023-08-12",
      doctor: "Dr. James Wilson",
      content: "2.5 cm mass in upper outer quadrant of right breast, suspicious for malignancy (BIRADS 5)."
    },
    {
      id: "doc-003",
      type: "procedure",
      title: "Breast Biopsy",
      description: "Ultrasound-guided core needle biopsy of right breast mass",
      date: "2023-08-15",
      doctor: "Dr. Lisa Chen"
    },
    {
      id: "doc-004",
      type: "test",
      title: "Pathology Report",
      description: "Biopsy pathology results",
      date: "2023-08-18",
      doctor: "Dr. Michael Patel",
      content: "Invasive ductal carcinoma, Grade 2, ER+/PR+/HER2+."
    },
    {
      id: "doc-005",
      type: "imaging",
      title: "CT Chest/Abdomen/Pelvis",
      description: "Staging CT scan",
      date: "2023-08-25",
      doctor: "Dr. Robert Johnson",
      content: "No evidence of metastatic disease. Small right axillary lymph nodes, likely reactive."
    },
    {
      id: "doc-006",
      type: "note",
      title: "Surgical Oncology Consultation",
      description: "Consultation for surgical planning",
      date: "2023-08-30",
      doctor: "Dr. Jennifer Lee",
      content: "Discussed surgical options. Patient prefers breast conservation if possible. Planning for lumpectomy with sentinel lymph node biopsy."
    },
    {
      id: "doc-007",
      type: "procedure",
      title: "Lumpectomy",
      description: "Right breast lumpectomy with sentinel lymph node biopsy",
      date: "2023-09-10",
      doctor: "Dr. Jennifer Lee"
    },
    {
      id: "doc-008",
      type: "note",
      title: "Medical Oncology Follow-up",
      description: "Post-surgical follow-up and treatment planning",
      date: "2023-09-20",
      doctor: "Dr. Sarah Miller",
      content: "Surgical pathology confirms Stage II breast cancer with negative sentinel nodes. Recommending adjuvant chemotherapy followed by radiation and hormonal therapy."
    },
    {
      id: "doc-009",
      type: "medication",
      title: "Chemotherapy Initiation",
      description: "First cycle of TC chemotherapy",
      date: "2023-10-05",
      doctor: "Dr. Sarah Miller"
    },
    {
      id: "doc-010",
      type: "test",
      title: "Cardiac Function Assessment",
      description: "MUGA scan for cardiac monitoring",
      date: "2023-11-10",
      doctor: "Dr. David Brown",
      content: "Left ventricular ejection fraction 62%, within normal limits."
    },
    {
      id: "doc-011",
      type: "note",
      title: "Chemotherapy Completion Note",
      description: "Final cycle of chemotherapy completed",
      date: "2023-12-15",
      doctor: "Dr. Sarah Miller",
      content: "Patient completed 4 cycles of TC chemotherapy with minimal side effects. Preparing for radiation therapy."
    },
    {
      id: "doc-012",
      type: "note",
      title: "Radiation Oncology Consultation",
      description: "Radiation therapy planning",
      date: "2023-12-20",
      doctor: "Dr. Emily Taylor",
      content: "Planning for 30 sessions of radiation therapy to the right breast."
    }
  ]);
  
  // Add selected state to each document
  const [selectedDocuments, setSelectedDocuments] = useState<Record<string, boolean>>(
    clinicalDocuments.reduce((acc, doc) => ({ ...acc, [doc.id]: true }), {})
  );
  
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
  
  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocuments({
      ...selectedDocuments,
      [docId]: !selectedDocuments[docId]
    });
  };
  
  const handleProceed = () => {
    // Check if at least some data is selected
    const hasSelection = Object.values(selectedData).some(value => value) || 
                          Object.values(selectedDocuments).some(value => value);
    
    if (!hasSelection) {
      toast({
        title: "Selection Required",
        description: "Please select at least one data category or document for trial matching.",
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
    }
  };
  
  // Section component for collapsible data sections
  const Section = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
        onClick={() => toggleSection(id)}
      >
        <h3 className="font-medium text-gray-800 flex items-center">
          {id !== 'timeline' && (
            <input
              type="checkbox"
              checked={selectedData[id] || false}
              onChange={(e) => {
                e.stopPropagation();
                toggleDataSelection(id);
              }}
              className="mr-3 h-4 w-4 rounded border-gray-300 text-trialos-blue focus:ring-trialos-blue"
            />
          )}
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
  
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch(type) {
      case 'note':
        return <StickyNote size={16} className="text-blue-500" />;
      case 'test':
        return <TestTube size={16} className="text-green-500" />;
      case 'procedure':
        return <FileMedical size={16} className="text-red-500" />;
      case 'medication':
        return <FileType size={16} className="text-purple-500" />;
      case 'imaging':
        return <FileType size={16} className="text-amber-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
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
          Back to Patient Selection
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
        
        <Section title="Clinical Timeline Documents" id="timeline">
          <div className="relative pl-6 border-l-2 border-gray-200">
            {clinicalDocuments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((document, index) => (
              <div key={document.id} className="mb-6 relative">
                {/* Timeline dot */}
                <div className="absolute -left-[27px] w-4 h-4 rounded-full bg-trialos-blue/20 border-2 border-trialos-blue flex items-center justify-center">
                  {getDocumentIcon(document.type)}
                </div>
                
                {/* Document card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 ml-2 hover:border-trialos-blue/50 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Calendar size={12} className="mr-1" />
                        <span>{document.date}</span>
                        <span className="mx-1">•</span>
                        <span>{document.doctor}</span>
                      </div>
                      
                      <h4 className="font-medium text-gray-800">{document.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{document.description}</p>
                      
                      {document.content && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700 border-l-2 border-gray-300">
                          {document.content}
                        </div>
                      )}
                    </div>
                    
                    <div 
                      className="ml-3 cursor-pointer"
                      onClick={() => toggleDocumentSelection(document.id)}
                    >
                      {selectedDocuments[document.id] ? (
                        <CheckSquare size={18} className="text-trialos-blue" />
                      ) : (
                        <Square size={18} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          onClick={handleProceed}
          className="btn-primary rounded-lg px-6 py-2 flex items-center"
        >
          <span>Initiate Search</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PatientProfileForMatching;
