
import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  Info, 
  Link,
  Mail, 
  Phone, 
  ExternalLink,
  Pen,
  Save,
  Send
} from 'lucide-react';

interface EConsentFormProps {
  patient: {
    id: string;
    name: string;
    contactEmail?: string;
    contactPhone?: string;
  };
  onConsentComplete: (patientId: string) => void;
}

const EConsentForm: React.FC<EConsentFormProps> = ({ patient, onConsentComplete }) => {
  const { toast } = useToast();
  const [consentMethod, setConsentMethod] = useState<'email' | 'sms' | 'manual'>('email');
  const [emailAddress, setEmailAddress] = useState(patient.contactEmail || '');
  const [phoneNumber, setPhoneNumber] = useState(patient.contactPhone || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showManualConsent, setShowManualConsent] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSignatureData(null);
      }
    }
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        const rect = canvas.getBoundingClientRect();
        let x, y;
        
        if ('touches' in e) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
        } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }
        
        ctx.moveTo(x, y);
      }
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        let x, y;
        
        if ('touches' in e) {
          x = e.touches[0].clientX - rect.left;
          y = e.touches[0].clientY - rect.top;
        } else {
          x = e.clientX - rect.left;
          y = e.clientY - rect.top;
        }
        
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#0033A0';
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignatureData(canvas.toDataURL());
    }
  };
  
  const saveSignature = () => {
    if (!signatureData) {
      toast({
        title: "Signature Required",
        description: "Please sign the consent form before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate saving the signature and processing consent
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Consent Recorded",
        description: `Manual consent for ${patient.name} has been successfully recorded.`
      });
      onConsentComplete(patient.id);
    }, 1500);
  };
  
  const sendEConsent = () => {
    if (consentMethod === 'email' && !emailAddress) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the e-consent form.",
        variant: "destructive"
      });
      return;
    }
    
    if (consentMethod === 'sms' && !phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to send the e-consent form via SMS.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sending e-consent
    setTimeout(() => {
      setIsLoading(false);
      const destination = consentMethod === 'email' ? emailAddress : phoneNumber;
      toast({
        title: "E-Consent Sent",
        description: `E-consent form has been sent to ${patient.name} via ${consentMethod} (${destination}).`
      });
      
      // Simulate patient completing e-consent after some time
      setTimeout(() => {
        toast({
          title: "E-Consent Completed",
          description: `${patient.name} has completed the e-consent form.`
        });
        onConsentComplete(patient.id);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="glass-panel rounded-xl p-6 bg-white/90 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-trialos-blue mb-2">Patient E-Consent</h2>
      <p className="text-gray-600 mb-6">
        Obtain patient consent for trial matching and sharing information with trial sponsors
      </p>
      
      {/* Patient Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="bg-trialos-blue/10 p-2 rounded-full mr-3">
            <CheckCircle className="text-trialos-blue" size={20} />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{patient.name}</h3>
            <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
          </div>
        </div>
      </div>
      
      {!showManualConsent ? (
        <>
          {/* E-Consent Method Selection */}
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Select E-Consent Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all 
                    ${consentMethod === 'email' ? 'border-trialos-blue bg-trialos-blue/5' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setConsentMethod('email')}
                >
                  <div className="flex items-center">
                    <Mail size={18} className={consentMethod === 'email' ? 'text-trialos-blue' : 'text-gray-500'} />
                    <span className="ml-2 font-medium">Email</span>
                  </div>
                </div>
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all 
                    ${consentMethod === 'sms' ? 'border-trialos-blue bg-trialos-blue/5' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setConsentMethod('sms')}
                >
                  <div className="flex items-center">
                    <Phone size={18} className={consentMethod === 'sms' ? 'text-trialos-blue' : 'text-gray-500'} />
                    <span className="ml-2 font-medium">SMS</span>
                  </div>
                </div>
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all 
                    ${consentMethod === 'manual' ? 'border-trialos-blue bg-trialos-blue/5' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setConsentMethod('manual')}
                >
                  <div className="flex items-center">
                    <Pen size={18} className={consentMethod === 'manual' ? 'text-trialos-blue' : 'text-gray-500'} />
                    <span className="ml-2 font-medium">Manual Consent</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email input */}
            {consentMethod === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Email Address
                </label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="patient@example.com"
                  required
                />
              </div>
            )}
            
            {/* SMS input */}
            {consentMethod === 'sms' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Mobile Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trialos-blue focus:border-trialos-blue"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            )}
            
            {/* Consent Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start">
                <Info size={18} className="text-trialos-blue mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="mb-2">
                    By proceeding, the patient will be asked to consent to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Having their de-identified medical information used for trial matching</li>
                    <li>Sharing their contact information with matched trial sponsors</li>
                    <li>Being contacted by trial teams for screening eligibility</li>
                  </ul>
                  <div className="mt-3">
                    <a href="#" className="text-trialos-blue hover:underline flex items-center">
                      <Link size={14} className="mr-1" />
                      View full consent document
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between border-t border-gray-200 pt-4">
              {consentMethod === 'manual' ? (
                <button
                  type="button"
                  onClick={() => setShowManualConsent(true)}
                  className="btn-primary rounded-lg px-6 py-2 flex items-center"
                  disabled={isLoading}
                >
                  <Pen size={16} className="mr-2" />
                  <span>Capture Manual Consent</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={sendEConsent}
                  className="btn-primary rounded-lg px-6 py-2 flex items-center"
                  disabled={isLoading}
                >
                  <Send size={16} className="mr-2" />
                  <span>{isLoading ? "Sending..." : "Send E-Consent"}</span>
                </button>
              )}
              
              <button
                type="button"
                className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50"
                onClick={() => {/* Handle cancel */}}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Manual Consent Form */}
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Manual Consent Capture</h3>
              <p className="text-sm text-gray-600 mb-4">
                Use this form when the patient is physically present and can sign the consent form manually.
              </p>
              
              <div className="border border-gray-300 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Clinical Trial Matching Consent</h4>
                <p className="text-sm text-gray-600 mb-3">
                  I, {patient.name}, hereby authorize St. Mary's Hospital to:
                </p>
                <ol className="text-sm text-gray-600 list-decimal pl-5 space-y-2">
                  <li>Use my de-identified medical information for matching me with appropriate clinical trials</li>
                  <li>Share my contact information with matched trial sponsors if I express interest</li>
                  <li>Allow trial teams to contact me for screening eligibility</li>
                </ol>
                <p className="text-sm text-gray-600 mt-3">
                  I understand that I can withdraw this consent at any time by contacting my healthcare provider.
                </p>
              </div>
              
              <div className="border border-gray-300 rounded-lg mb-4">
                <div className="p-3 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Signature
                  </label>
                </div>
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={150}
                  className="w-full touch-none bg-white"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={endDrawing}
                  onMouseLeave={endDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={endDrawing}
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-gray-600 hover:text-gray-800 text-sm mr-4"
                >
                  Clear Signature
                </button>
              </div>
            </div>
            
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => setShowManualConsent(false)}
                className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={saveSignature}
                className="btn-primary rounded-lg px-6 py-2 flex items-center"
                disabled={isLoading || !signatureData}
              >
                <Save size={16} className="mr-2" />
                <span>{isLoading ? "Processing..." : "Record Consent"}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EConsentForm;
