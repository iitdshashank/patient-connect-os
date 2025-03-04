import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  UserCircle,
  CalendarIcon,
  FileType,
  Stethoscope,
  Syringe,
  Activity,
  FileText,
  ArrowRight,
  Save
} from 'lucide-react';

interface PatientFormProps {
  onComplete: (patientData: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Demographics
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactEmail: '',
    contactPhone: '',
    
    // Diagnosis
    primaryDiagnosis: '',
    diagnosisDate: '',
    cancerStage: '',
    histology: '',
    
    // Treatment History
    previousTreatments: '',
    currentTreatments: '',
    
    // Lab Results
    recentLabResults: '',
    
    // Performance Status
    ecogStatus: '0',
    
    // Additional Info
    additionalNotes: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.primaryDiagnosis) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a unique patient ID
    const patientId = `PT-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Prepare patient data
    const patientData = {
      id: patientId,
      name: `${formData.firstName} ${formData.lastName}`,
      age: calculateAge(formData.dateOfBirth),
      diagnosis: formData.primaryDiagnosis,
      status: 'pending' as const,
      ...formData
    };
    
    // Notify success and pass data to parent component
    toast({
      title: "Patient Added Successfully",
      description: `${patientData.name} has been added to your patient list.`,
    });
    
    onComplete(patientData);
  };
  
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  return (
    <div className="glass-panel rounded-xl p-6 bg-white/90 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-trialos-blue mb-6">Add New Patient</h2>
      
      {/* Form progress indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <div 
            key={step} 
            className="flex flex-col items-center"
            onClick={() => setCurrentStep(step)}
          >
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep === step 
                  ? 'bg-trialos-blue text-white' 
                  : currentStep > step 
                    ? 'bg-green-100 text-green-600 border border-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }
                cursor-pointer transition-all duration-300
              `}
            >
              {currentStep > step ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </div>
            <span className="text-xs mt-1 text-gray-500">
              {step === 1 && "Demographics"}
              {step === 2 && "Diagnosis"}
              {step === 3 && "Treatment"}
              {step === 4 && "Labs"}
              {step === 5 && "Review"}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Demographics */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-trialos-blue">
              <UserCircle size={24} />
              <h3 className="text-lg font-medium">Demographics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Diagnosis */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-trialos-blue">
              <FileType size={24} />
              <h3 className="text-lg font-medium">Diagnosis Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Diagnosis *</label>
                <input
                  type="text"
                  name="primaryDiagnosis"
                  value={formData.primaryDiagnosis}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="e.g., Breast Cancer (HER2+)"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="date"
                    name="diagnosisDate"
                    value={formData.diagnosisDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cancer Stage</label>
                <select
                  name="cancerStage"
                  value={formData.cancerStage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                >
                  <option value="">Select Stage</option>
                  <option value="0">Stage 0</option>
                  <option value="I">Stage I</option>
                  <option value="II">Stage II</option>
                  <option value="III">Stage III</option>
                  <option value="IV">Stage IV</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Histology</label>
                <textarea
                  name="histology"
                  value={formData.histology}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="Histology details if available..."
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Treatment */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-trialos-blue">
              <Syringe size={24} />
              <h3 className="text-lg font-medium">Treatment History</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Treatments</label>
                <textarea
                  name="previousTreatments"
                  value={formData.previousTreatments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="List previous cancer treatments, including surgeries, radiation, chemotherapy..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Treatments</label>
                <textarea
                  name="currentTreatments"
                  value={formData.currentTreatments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="List current medications and treatments..."
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Labs & Performance */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-trialos-blue">
              <Stethoscope size={24} />
              <h3 className="text-lg font-medium">Lab Results & Performance Status</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recent Lab Results</label>
                <textarea
                  name="recentLabResults"
                  value={formData.recentLabResults}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="Summarize recent lab results relevant to diagnosis..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ECOG Performance Status</label>
                <select
                  name="ecogStatus"
                  value={formData.ecogStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                >
                  <option value="0">0 - Fully active</option>
                  <option value="1">1 - Restricted in strenuous activity</option>
                  <option value="2">2 - Ambulatory, capable of self-care</option>
                  <option value="3">3 - Limited self-care</option>
                  <option value="4">4 - Completely disabled</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Eastern Cooperative Oncology Group (ECOG) performance status scale</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="Any additional information that might be relevant..."
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-trialos-blue">
              <FileText size={24} />
              <h3 className="text-lg font-medium">Review & Submit</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-700">Patient Information</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.firstName} {formData.lastName}<br />
                  DOB: {formData.dateOfBirth} ({calculateAge(formData.dateOfBirth)} years old)<br />
                  {formData.gender && `Gender: ${formData.gender}`}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700">Contact Information</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.contactEmail && `Email: ${formData.contactEmail}`}<br />
                  {formData.contactPhone && `Phone: ${formData.contactPhone}`}
                </p>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700">Diagnosis</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.primaryDiagnosis}
                  {formData.cancerStage && `, Stage ${formData.cancerStage}`}<br />
                  {formData.diagnosisDate && `Diagnosed: ${formData.diagnosisDate}`}
                </p>
                {formData.histology && (
                  <div className="mt-2">
                    <h5 className="font-medium text-sm text-gray-700">Histology</h5>
                    <p className="text-sm text-gray-600">{formData.histology}</p>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 border-t border-gray-200 pt-2 mt-2">
                <p className="text-sm text-gray-500">
                  Please review all patient information for accuracy before submitting. After submission, 
                  you'll be able to proceed with obtaining e-consent and matching with clinical trials.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={handlePrevStep}
            className={`px-4 py-2 rounded-lg ${
              currentStep === 1 ? 'invisible' : 'border border-trialos-blue text-trialos-blue hover:bg-trialos-blue/10'
            }`}
          >
            Previous
          </button>
          
          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-primary rounded-lg px-6 py-2 flex items-center"
            >
              <span>Next</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary rounded-lg px-6 py-2 flex items-center"
            >
              <Save size={16} className="mr-2" />
              <span>Submit Patient</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
