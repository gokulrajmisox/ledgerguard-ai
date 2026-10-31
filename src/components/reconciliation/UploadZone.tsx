"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";

interface UploadZoneProps {
  onUploadComplete: () => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.tiff'],
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    onUploadComplete();
    setUploadedFiles([]);
  };

  const fileTypes = {
    'application/pdf': 'PDF',
    'image/png': 'PNG',
    'image/jpeg': 'JPEG',
    'image/tiff': 'TIFF',
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-espresso">Upload Documents</h3>
        <span className="text-xs font-mono text-taupe">
          PDF, PNG, JPG, TIFF (Max 10MB each)
        </span>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? "border-mocha bg-mocha/5"
            : "border-mocha/20 bg-platinum/50 hover:border-mocha"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-mocha/50" />
          <h4 className="text-lg font-medium text-espresso">
            {isDragActive ? "Drop files here" : "Upload Documents"}
          </h4>
          <p className="text-sm text-taupe">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-xs text-taupe/70">
            Supported: PDF, PNG, JPG, JPEG, TIFF
          </p>
        </div>
      </div>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-status-error/10 border border-status-error/30">
          <p className="text-sm text-status-error">
            {fileRejections[0].errors[0].message}
          </p>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-espresso mb-2">
            Selected Files ({uploadedFiles.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-platinum/50 border border-mocha/10"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-mocha" />
                  <div>
                    <div className="text-sm text-espresso truncate max-w-48">
                      {file.name}
                    </div>
                    <div className="text-xs text-taupe">
                      {fileTypes[file.type as keyof typeof fileTypes] || file.type} - {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1.5 rounded hover:bg-mocha/10 transition-colors text-taupe hover:text-mocha"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={() => setUploadedFiles([])}
              className="px-4 py-2 rounded-lg border border-mocha/20 text-sm text-mocha hover:bg-mocha/5 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 rounded-lg bg-mocha text-ivory text-sm hover:bg-mocha/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Upload {uploadedFiles.length} Files</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadZone;
