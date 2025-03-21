
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, Check, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadAreaProps {
  onFileChange: (file: File) => void;
  className?: string;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

export const UploadArea = ({
  onFileChange,
  className,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
  maxSize = 5, // Default 5MB
}: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${maxSize}MB.`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setFileName(file.name);
    onFileChange(file);
  }, [allowedTypes, maxSize, onFileChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            "flex flex-col items-center justify-center gap-4"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center animate-pulse">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-1">Upload your waste image</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop or click to browse
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={allowedTypes.join(",")}
            id="file-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="mt-2" size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
              Select file
            </Button>
          </label>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPEG, PNG, WebP. Max size: {maxSize}MB
          </p>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-border animate-scale-in">
          <div className="aspect-video relative overflow-hidden bg-secondary/50">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Button 
              size="icon" 
              variant="secondary"
              className="w-8 h-8 rounded-full opacity-90 hover:opacity-100"
              onClick={removeFile}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <p className="text-sm font-medium truncate">{fileName}</p>
              <div className="ml-auto">
                <span className="flex items-center gap-1 text-xs bg-primary/90 text-white px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> Uploaded
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
