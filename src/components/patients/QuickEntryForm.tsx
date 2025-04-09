
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Brain, UserCircle, ArrowRight, Save } from 'lucide-react';

interface QuickEntryFormProps {
  onComplete: (patientData: any) => void;
}

const QuickEntryForm: React.FC<QuickEntryFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [patientDescription, setPatientDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatientDescription(e.target.value);
    setExtractedData(null);
  };
  
  const analyzePatientDescription = () => {
    if (patientDescription.trim().length < 30) {
      toast({
        title: "Insufficient Information",
        description: "Please provide a more detailed description of the patient.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Extract some key information from the text
      const nameMatch = patientDescription.match(/(?:patient|name|patient name)[^\w]+([\w\s]+?)(?:,|\.|is|a|\d|$)/i);
      const ageMatch = patientDescription.match(/(\d+)[ -](?:year|yr|years)[- ](?:old)/i);
      const diagnosisMatch = patientDescription.match(/(?:diagnosed with|suffering from|has|with) ([^\.]+?)(?:\.|\,|and|is|for)/i);
      
      const extractedName = nameMatch ? nameMatch[1].trim() : "Unknown Patient";
      const extractedAge = ageMatch ? parseInt(ageMatch[1]) : 0;
      const extractedDiagnosis = diagnosisMatch ? diagnosisMatch[1].trim() : "Unknown Diagnosis";
      
      // Generate a unique patient ID
      const patientId = `PT-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const extractedPatientData = {
        id: patientId,
        name: extractedName,
        age: extractedAge,
        diagnosis: extractedDiagnosis,
        fullText: patientDescription,
      };
      
      setExtractedData(extractedPatientData);
      setAnalyzing(false);
    }, 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!extractedData) {
      toast({
        title: "Data Not Analyzed",
        description: "Please analyze the patient description first.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Patient Added Successfully",
      description: `${extractedData.name} has been added to your patient list.`,
    });
    
    onComplete(extractedData);
  };
  
  return (
    <div className="glass-panel rounded-xl p-6 bg-white/90 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-trialos-blue mb-6">Quick Text Entry</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Simply describe the patient and their condition in a paragraph. Our AI will automatically extract 
          key information like name, age, diagnosis, and other relevant details.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Example:</strong> "Patient John Smith is a 54-year-old male diagnosed with Stage 2 Non-Small Cell Lung Cancer. He was diagnosed 3 months ago and has undergone initial rounds of chemotherapy. He has a history of smoking for 20 years but quit 5 years ago."
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Description</label>
            <textarea
              value={patientDescription}
              onChange={handleTextChange}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue resize-none"
              placeholder="Describe the patient and their condition in a paragraph..."
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={analyzePatientDescription}
              disabled={analyzing || patientDescription.trim().length < 10}
              className={`flex items-center px-4 py-2 rounded-lg ${
                analyzing || patientDescription.trim().length < 10
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-trialos-blue text-white hover:bg-trialos-blue/90'
              }`}
            >
              <Brain size={18} className="mr-2" />
              {analyzing ? 'Analyzing...' : 'Analyze Description'}
            </button>
          </div>
          
          {analyzing && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-trialos-blue mr-3"></div>
              <p className="text-gray-600">Analyzing patient description...</p>
            </div>
          )}
          
          {extractedData && (
            <div className="mt-6 border border-green-200 bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-3 flex items-center">
                <UserCircle size={18} className="mr-2" />
                Extracted Patient Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {extractedData.name}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Age:</span> {extractedData.age} years
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Diagnosis:</span> {extractedData.diagnosis}
                  </p>
                </div>
              </div>
              
              <button
                type="submit"
                className="mt-4 btn-primary rounded-lg px-6 py-2 flex items-center"
              >
                <Save size={16} className="mr-2" />
                <span>Save Patient Information</span>
              </button>
            </div>
          )}
        </form>
      </div>
      
      <div className="bg-trialos-blue/5 border border-trialos-blue/20 rounded-lg p-4 mt-8">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-trialos-blue mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-trialos-blue">How It Works</h4>
            <p className="text-sm text-gray-600 mt-1">
              Our natural language processing AI extracts structured information from your text description. 
              For best results, include details about the patient's name, age, diagnosis, and treatment history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickEntryForm;
