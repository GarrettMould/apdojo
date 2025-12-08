'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DrawingPad } from '@/components/DrawingPad';
import { Upload, X, Pencil, Image as ImageIcon } from 'lucide-react';

interface DrawingInputProps {
  drawingKey: string;
  drawingData: string | undefined;
  onSave: (key: string, data: string) => void;
  isGraded: boolean;
  enableStickers?: boolean;
  stickerLabels?: string[];
}

export const DrawingInput: React.FC<DrawingInputProps> = ({ 
  drawingKey, 
  drawingData, 
  onSave, 
  isGraded,
  enableStickers = false,
  stickerLabels = ['LRAS', 'SRAS', 'AD', 'Price Level', 'Real GDP']
}) => {
  const [inputMethod, setInputMethod] = useState<'draw' | 'upload'>('draw');

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    // Optional: Add file size validation here if needed
    // if (file.size > 2 * 1024 * 1024) { // e.g., 2MB limit
    //   alert('File is too large. Please upload an image under 2MB.');
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      if (base64String) {
        onSave(drawingKey, base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const switchInputMethod = (method: 'draw' | 'upload') => {
    // Clear the answer when switching methods to avoid confusion
    if (inputMethod !== method && !isGraded) {
      onSave(drawingKey, '');
    }
    setInputMethod(method);
  };

  return (
    <div className="space-y-3">
      {/* Tabs for Draw/Upload */}
      {!isGraded && (
        <div className="flex border-b">
          <button onClick={() => switchInputMethod('draw')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${inputMethod === 'draw' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <Pencil className="w-4 h-4" /> Draw
          </button>
          <button onClick={() => switchInputMethod('upload')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${inputMethod === 'upload' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <ImageIcon className="w-4 h-4" /> Upload
          </button>
        </div>
      )}
      
      {/* Input Area */}
      <div className={`border-2 rounded-lg bg-white relative ${isGraded ? 'border-transparent' : 'border-gray-200'}`}>
        {isGraded && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg z-10 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">Answer submitted</span>
          </div>
        )}

        {/* Show either the drawing pad or upload UI */}
        {(() => {
          // Check if data is structured (JSON) - if so, always show pad for editing
          let isStructured = false;
          let imageData = drawingData;
          try {
            if (drawingData) {
              const parsed = JSON.parse(drawingData);
              if (parsed.image) {
                isStructured = true;
                imageData = parsed.image;
              }
            }
          } catch (e) {
            // Not JSON
          }

          return !drawingData || isStructured ? (
            <>
              {inputMethod === 'draw' && (
                <DrawingPad
                  isLarge={true}
                  onSave={(data) => onSave(drawingKey, data)}
                  initialData={imageData}
                  enableStickers={enableStickers}
                  stickerLabels={stickerLabels}
                />
              )}
            
              {inputMethod === 'upload' && (
                <div className="text-center p-8">
                  <input
                    type="file"
                    id={`file-input-${drawingKey}`}
                    onChange={(e) => handleImageUpload(e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                    accept="image/*"
                  />
                  <label htmlFor={`file-input-${drawingKey}`} className="cursor-pointer">
                    <div className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Upload a PNG, JPG, or GIF.</p>
                </div>
              )}
            </>
          ) : null;
        })()}

        {/* If there IS data (from drawing or upload) and it's NOT structured, show the preview */}
        {drawingData && (() => {
          // Check if it's structured data (JSON) - if so, don't show preview (pad is shown above)
          let isStructured = false;
          try {
            if (drawingData) {
              const parsed = JSON.parse(drawingData);
              if (parsed.image) {
                isStructured = true;
              }
            }
          } catch (e) {
            // Not JSON
          }

          if (isStructured) return null; // Structured data shows pad above
          
          return (
            <div className="relative p-4">
              <img src={drawingData} alt="Drawing preview" className="w-full h-auto max-w-md mx-auto rounded-md border" />
              {!isGraded && (
                <Button variant="destructive" size="icon" onClick={() => onSave(drawingKey, '')} className="absolute top-2 right-2 h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};
