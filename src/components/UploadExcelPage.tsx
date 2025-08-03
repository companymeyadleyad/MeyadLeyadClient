import React, { useState } from 'react';
import { PropertyService } from 'services/propertyService';

const UploadExcelPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsLoading(true);
      const propertyService = new PropertyService();
      try {
        const response = await propertyService.uploadExel(selectedFile);
        console.log('File uploaded:', response);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', color: '#1a1a1a', minHeight: '100vh' }}>
      <h1 style={{ color: '#1a3b6d' }}>Upload Excel File</h1>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileChange} 
        style={{
          padding: '10px',
          border: '1px solid #1a3b6d',
          borderRadius: '5px',
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      />
      <button 
        onClick={handleUpload} 
        disabled={!selectedFile || isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#1a3b6d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        {isLoading ? 'Uploading...' : 'Upload File'}
      </button>
      {isLoading && <div style={{ marginTop: '10px' }}>Loading...</div>}
    </div>
  );
};

export default UploadExcelPage; 