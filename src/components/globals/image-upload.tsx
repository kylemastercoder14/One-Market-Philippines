"use client";

import { uploadToS3 } from "@/lib/s3";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_IMAGES = 7;

const ImageUpload = ({
  onImageUpload,
  className,
  defaultValues = [],
  disabled,
}: {
  onImageUpload: (urls: string[]) => void;
  defaultValues?: string[];
  className?: string;
  disabled?: boolean;
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(defaultValues);

  useEffect(() => {
    // Sync state with defaultValues when it changes
    setImageUrls(defaultValues);
  }, [defaultValues]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
    },
    maxFiles: MAX_IMAGES,
    onDrop: async (acceptedFiles) => {
      if (imageUrls.length + acceptedFiles.length > MAX_IMAGES) {
        toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
        return;
      }

      const newUrls = [...imageUrls];
      for (const file of acceptedFiles) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Please upload smaller images (max 5MB).");
          return;
        }

        const previewUrl = URL.createObjectURL(file);
        newUrls.push(previewUrl);
        setImageUrls([...newUrls]); // Update state immediately with preview

        try {
          toast.loading("Uploading image...");
          const { url } = await uploadToS3(file);
          toast.success("Image uploaded successfully!");

          // Replace the preview URL with the uploaded URL
          const index = newUrls.indexOf(previewUrl);
          if (index > -1) newUrls[index] = url;

          setImageUrls([...newUrls]);
          onImageUpload([...newUrls]); // Pass updated URLs
          toast.dismiss();
        } catch (error) {
          // Remove preview URL in case of an error
          setImageUrls((prev) => prev.filter((img) => img !== previewUrl));
          toast.error("Image upload failed.");
          console.error(error);
        }
      }
    },
  });

  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    onImageUpload(updatedImages);
    toast.info("Image removed.");
  };

  return (
    <div className={cn("grid md:grid-cols-8 grid-cols-1 gap-3", className)}>
      {imageUrls.map((url, index) => (
        <div
          key={index}
          className="relative w-32 h-[120px] rounded-md overflow-hidden border border-input"
        >
          <div className="z-10 absolute top-1 right-1">
            <Button
              variant="destructive"
              type="button"
              size="icon"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Image
            src={url}
            alt={`Uploaded image ${index + 1}`}
            className="object-cover w-full h-full"
            fill
          />
        </div>
      ))}

      {imageUrls.length < MAX_IMAGES && (
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
          <p className="text-xs text-muted-foreground">
            ({imageUrls.length}/{MAX_IMAGES})
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
