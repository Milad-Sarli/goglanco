"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, onRemove, disabled = false }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return;
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    disabled,
  });

  if (value) {
    return (
      <div className="relative h-48 w-full">
        <img
          src={value}
          alt="Upload"
          className={cn(
            "h-full w-full object-cover rounded-md",
            disabled && "opacity-50"
          )}
        />
        <Button
          type="button"
          onClick={onRemove}
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-md p-4 h-48 flex flex-col items-center justify-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/20 hover:border-primary",
        disabled && "opacity-50 cursor-not-allowed hover:border-muted-foreground/20"
      )}
    >
      <input {...getInputProps()} />
      <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground text-center">
        {isDragActive
          ? "Drop the image here"
          : disabled
          ? "Image upload disabled"
          : "Drag and drop an image here, or click to select"}
      </p>
    </div>
  );
} 