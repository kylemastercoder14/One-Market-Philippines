"use client";

import { uploadToS3 } from "@/lib/s3";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SingleImageUpload = ({
  onSingleImageUpload,
  className,
  defaultValue = "",
  disabled,
}: {
  onSingleImageUpload: (url: string) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);

  useEffect(() => {
    // Sync state with defaultValue when it changes
    setImageUrl(defaultValue);
  }, [defaultValue]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (imageUrl) {
        toast.error("You can only upload one image.");
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please upload a smaller image (max 5MB).");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl); // Show preview immediately

      try {
        toast.loading("Uploading image...");
        const { url } = await uploadToS3(file);
        toast.success("Image uploaded successfully!");
        setImageUrl(url); // Update to uploaded URL
        onSingleImageUpload(url);
        toast.dismiss();
      } catch (error) {
        setImageUrl(""); // Clear preview on error
        toast.error("Image upload failed.");
        console.error(error);
      }
    },
  });

  const handleRemoveImage = () => {
    setImageUrl("");
    onSingleImageUpload("");
    toast.info("Image removed.");
  };

  return (
    <div className={cn("grid gap-3", className)}>
      {imageUrl ? (
        <div className="relative w-32 h-[120px] rounded-md overflow-hidden border border-input">
          <div className="z-10 absolute top-1 right-1">
            <Button
              variant="destructive"
              type="button"
              size="icon"
              onClick={handleRemoveImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Image
            src={imageUrl}
            alt="Uploaded image"
            className="object-cover w-full h-full"
            fill
          />
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `w-32 h-[120px] mx-2 border-[2px] rounded-md border-dashed border-input flex items-center justify-center flex-col ${
              disabled
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`,
          })}
        >
          <input {...getInputProps()} />
          <Plus className="w-5 h-5 text-gray-600" />
          <p className="mt-1 text-sm text-muted-foreground">Add Photo</p>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
