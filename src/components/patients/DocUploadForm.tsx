
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  File, 
  X, 
  Scan, 
  UserCircle, 
  Save
} from 'lucide-react';

interface DocUploadFormProps {
  onComplete: (patientData: any) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const DocUploadForm: React.FC<DocUploadFormProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      setExtractedData(null);
    }
  };
  
  const removeFile = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
    setExtractedData(null);
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const processDocuments = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please upload at least one document to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      // Generate a unique patient ID
      const patientId = `PT-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Extract patient data from files (simulated)
      const patientData = {
        id: patientId,
        name: "Alex Johnson",
        age: 62,
        diagnosis: "Metastatic Colorectal Cancer",
        extractedFrom: uploadedFiles.map(f => f.name).join(', '),
        docCount: uploadedFiles.length
      };
      
      setExtractedData(patientData);
      setProcessing(false);
      
      toast({
        title: "Documents Processed",
        description: `Successfully extracted patient information from ${uploadedFiles.length} document(s).`,
      });
    }, 3000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!extractedData) {
      toast({
        title: "Data Not Processed",
        description: "Please process the uploaded documents first.",
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
      <h2 className="text-xl font-semibold text-trialos-blue mb-6">Upload Medical Documents</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Upload the patient's medical reports, prescriptions, or any clinical documents. 
          Our AI-powered OCR technology will automatically extract relevant patient information.
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* File upload area */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-trialos-blue/50 transition-colors">
              <input
                type="file"
                id="document-upload"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                disabled={processing}
              />
              
              <label 
                htmlFor="document-upload" 
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload size={40} className="text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">Drag files here or click to upload</h3>
                <p className="text-sm text-gray-500">
                  Supports PDF, JPG, PNG, DOC files (max 10MB each)
                </p>
                
                <button
                  type="button"
                  className="mt-4 bg-trialos-blue/10 text-trialos-blue hover:bg-trialos-blue/20 transition-colors px-4 py-2 rounded-lg flex items-center"
                >
                  <FileText size={18} className="mr-2" />
                  Select Files
                </button>
              </label>
            </div>
          </div>
          
          {/* Uploaded files list */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Uploaded Documents ({uploadedFiles.length})</h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {uploadedFiles.map(file => (
                  <div 
                    key={file.id} 
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-center">
                      <File size={20} className="text-trialos-blue mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      disabled={processing}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Process button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={processDocuments}
              disabled={processing || uploadedFiles.length === 0}
              className={`flex items-center px-4 py-2 rounded-lg ${
                processing || uploadedFiles.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-trialos-blue text-white hover:bg-trialos-blue/90'
              }`}
            >
              <Scan size={18} className="mr-2" />
              {processing ? 'Processing...' : 'Process Documents'}
            </button>
          </div>
          
          {/* Processing indicator */}
          {processing && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-trialos-blue mr-3"></div>
              <p className="text-gray-600">Processing documents with OCR...</p>
            </div>
          )}
          
          {/* Extracted data */}
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
                
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Extracted from:</span> {extractedData.extractedFrom}
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
            <h4 className="font-medium text-trialos-blue">Document Processing</h4>
            <p className="text-sm text-gray-600 mt-1">
              Our advanced OCR technology extracts patient information from medical documents. For best results, 
              upload recent and clear documents such as discharge summaries, diagnostic reports, or referral letters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocUploadForm;
