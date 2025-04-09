
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface QuickEntryFormProps {
  onComplete: (data: any) => void;
}

const QuickEntryForm: React.FC<QuickEntryFormProps> = ({ onComplete }) => {
  const [summary, setSummary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would send the text to an AI extraction service
    // to parse out relevant patient information
    
    // Mock extracted data
    const patientData = {
      id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      name: "New Patient",
      age: 45,
      primaryDiagnosis: "Unknown - Pending Analysis"
    };
    
    onComplete(patientData);
  };

  const exampleText = "A 32 yo woman who presents following a severe 'exploding' headache. She and her husband report that yesterday she was in the kitchen and stood up and hit her head on the corner of a cabinet. The next morning she developed a sudden 'exploding' headache. She came to the hospital where head CT showed a significant amount of blood in her right ventricle. NSGY evaluated her for spontaneous intraventricular hemorrhage with a concern for an underlying vascular malformation. Cerebral angiogram was done which showed abnormal vasculature with a draining vein from L temporal lobe penetrating deep white matter consistent with AVM. The patient did continue to have a headaches but they were improving with pain medication. The patient refused PT evaluation but was ambulating independently without difficulty.";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-2xl font-bold text-trialos-blue mb-2">Quick Summary Entry</h2>
        <p className="text-gray-600 mb-6">
          Enter a summary of the patient's medical condition and our AI will extract the relevant details.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Patient Summary
            </label>
            <Textarea
              id="summary"
              placeholder="Enter patient summary here..."
              className="w-full h-60"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
            <p className="text-sm text-gray-500 font-medium mb-2">Example Summary:</p>
            <p className="text-sm text-gray-600">{exampleText}</p>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline">
              Clear
            </Button>
            <Button type="submit">
              Process Summary
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickEntryForm;
