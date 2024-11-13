import { useState } from 'react';
import { uploadFiles } from '@uploadthing/react';
export function usePDFUpload() {
  const [uploading, setUploading] = useState(false);
  const uploadPDF = async (file: File) => {
    setUploading(true);
    try {
      const response = await uploadFiles({
        files: [file],
        endpoint: 'pdfUploader'
      });
      setUploading(false);
      return response[0].fileUrl;
    } catch (error) {
      console.error('Upload error', error);
      setUploading(false);
      return null;
    }
  };
  return { uploadPDF, uploading };
}