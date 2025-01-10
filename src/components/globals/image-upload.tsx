"use client";

import { uploadToS3 } from "@/lib/s3";
import { X } from "lucide-react";
import { CameraIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ImageUpload = ({
  onImageUpload,
  className,
  defaultValue = "",
  imageCount
}: {
  onImageUpload: (url: string) => void;
  defaultValue?: string;
  className?: string;
  imageCount: number;
}) => {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
    },
    maxFiles: imageCount || 3,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > imageCount) {
        toast.error(`You can only upload up to ${imageCount} images.`);
        return;
      }

      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Please upload a smaller image.");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);

      try {
        toast.loading("Uploading image...");
        const { url } = await uploadToS3(file);
        toast.success("Image uploaded successfully!");
        setImageUrl(url);
        onImageUpload(url);
        toast.dismiss();
      } catch (error) {
        setImageUrl(""); // Remove the preview if upload fails
        toast.error("Image upload failed.");
        console.log(error);
      }
    },
  });

  const handleRemoveImage = () => {
    setImageUrl("");
    toast.info("Image removed.");
    onImageUpload("");
  };

  return (
    <div className={cn("rounded-xl", className)}>
      <div
        {...getRootProps({
          className:
            "border-dashed border-[3px] rounded-xl cursor-pointer h-[200px] flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <div className="relative w-full h-[140px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-0 right-0">
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
              alt="Image"
              className="object-contain w-full h-full"
              fill
            />
          </div>
        ) : (
          <>
            <CameraIcon className="w-10 h-10 text-gray-600" />
            <p className="mt-2 text-sm text-muted-foreground">
              Add Photo {imageCount ? `(${imageCount} max)` : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
