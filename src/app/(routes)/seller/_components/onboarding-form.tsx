/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React, { useState } from "react";
import BusinessType, { RadioGroup } from "./business-type";
import { CheckIcon, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ImageUpload from "@/components/globals/image-upload";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CATEGORIES } from "@/constants/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import AlertModal from "@/components/ui/alert-modal";

const OnboardingForm = () => {
  const searchParams = useSearchParams();
  const [selectedValue, setSelectedValue] = useState("individual");
  const [cancelModal, setCancelModal] = useState(false);
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [identificationType, setIdentificationType] = useState("");
  const [dynamicModal, setDynamicModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    requirements: { title: string; description: string }[];
  }>({
    title: "",
    description: "",
    requirements: [],
  });

  type BusinessTypeKeys =
    | "Individual"
    | "Sole-Proprietorship"
    | "Corporation"
    | "Partnership";

  const modalData: Record<
    BusinessTypeKeys,
    {
      title: string;
      description: string;
      requirements: { title: string; description: string }[];
    }
  > = {
    Individual: {
      title: "What you need to know",
      description:
        "You're selling under your own name, not as a registered business.",
      requirements: [
        {
          title: "ID Verification",
          description:
            "This involves uploading images of the front side of a local ID.",
        },
        { title: "Legal name", description: "The name on your ID." },
        {
          title: "ID number",
          description: "The unique identification number on your ID.",
        },
        {
          title: "Residential address",
          description: "The residential address on your ID.",
        },
      ],
    },
    "Sole-Proprietorship": {
      title: "What you need to know",
      description: "You own an unincorporated business by yourself.",
      requirements: [
        {
          title: "Business verification",
          description:
            "This involves uploading certificate of business document.",
        },
        {
          title: "Legal business name",
          description:
            "This should be match what was used to register with your government. Make sure it's also the same as the name on your bank account.",
        },
        {
          title: "Business registration number",
          description:
            "A business registration number is used to identify a business entity.",
        },
        {
          title: "Registered business address",
          description: "The address on your business document.",
        },
      ],
    },
    Corporation: {
      title: "What you need to know",
      description:
        "The legal entity of your business is independent from its owners.",
      requirements: [
        {
          title: "Business verification",
          description:
            "This involves uploading certificate of business document.",
        },
        {
          title: "Legal business name",
          description:
            "This should be match what was used to register with your government. Make sure it's also the same as the name on your bank account.",
        },
        {
          title: "Business registration number",
          description:
            "A business registration number is used to identify a business entity.",
        },
        {
          title: "Registered business address",
          description: "The address on your business document.",
        },
      ],
    },
    Partnership: {
      title: "What you need to know",
      description: "You and one or more people run a business together.",
      requirements: [
        {
          title: "Business verification",
          description:
            "This involves uploading certificate of business document.",
        },
        {
          title: "Legal business name",
          description:
            "This should be match what was used to register with your government. Make sure it's also the same as the name on your bank account.",
        },
        {
          title: "Business registration number",
          description:
            "A business registration number is used to identify a business entity.",
        },
        {
          title: "Registered business address",
          description: "The address on your business document.",
        },
      ],
    },
  };

  const handleViewRequirements = (type: BusinessTypeKeys) => {
    setModalContent(modalData[type]);
    setDynamicModal(true);
  };

  const handleCancel = () => {
    window.location.assign("/seller/account/register");
  };

  return (
    <>
      <AlertModal
        isOpen={cancelModal}
        onClose={() => setCancelModal(false)}
        onConfirm={handleCancel}
        title="Are you sure you want to cancel finishing your account?"
      />
      <Modal
        className="max-w-4xl"
        title={modalContent.title}
        description={modalContent.description}
        onClose={() => setDynamicModal(false)}
        isOpen={dynamicModal}
      >
        {/* add a dynamic data based on the business type clicked */}
        <div className="space-y-5">
          {modalContent.requirements.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckIcon className="text-green-600 w-4 h-4" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={() => setDynamicModal(false)}
          className="bg-orange-600 hover:bg-orange-600/80 mt-5 ml-auto flex"
        >
          Got it
        </Button>
      </Modal>
      <form>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
          <p className="text-md text-muted-foreground font-semibold">
            Business Type
          </p>
          <RadioGroup value={selectedValue} onChangeAction={setSelectedValue}>
            <div className="flex gap-4 flex-col mt-3">
              {Object.keys(modalData).map((type) => (
                <BusinessType key={type} value={type as BusinessTypeKeys}>
                  <div>
                    <h3 className="font-semibold">{type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {modalData[type as BusinessTypeKeys].description}
                    </p>
                    <div
                      onClick={() =>
                        handleViewRequirements(type as BusinessTypeKeys)
                      }
                      className="text-sm mt-2 font-semibold hover:text-black text-muted-foreground flex items-center gap-2"
                    >
                      <span>View requirements</span>
                      <ExternalLink className="w-4 h-4 mr-2 text-orange-600" />
                    </div>
                  </div>
                </BusinessType>
              ))}
            </div>
          </RadioGroup>
          <p className="text-md text-muted-foreground font-semibold mt-7">
            Shop Name
          </p>
          <p className="text-sm text-muted-foreground">
            You can just draft a name now and change it later! Please don&apos;t
            use &apos;Flagship&apos; or &apos;Official&apos; as part of the shop
            name. Please don&apos;t use only numbers or special characters or
            any foreign characters other than English characters.
          </p>
          <Input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="mt-2"
            placeholder="Please enter a shop name"
          />
          <p className="text-md text-muted-foreground font-semibold mt-7">
            Select product category you sell
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Please select the product category you plan to sell. The category
            information filled in here will not affect product uploading.
          </p>
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className="text-muted-foreground">
              <SelectValue
                placeholder="Select a product category"
                className="text-muted-foreground"
              />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 p-3 flex items-center gap-6">
          <Image alt="Store" src="/images/owner.png" width={100} height={100} />
          <div>
            <p className="text-lg font-semibold">
              Who&apos;s the primary shop owner?
            </p>
            <p className="text-muted-foreground">
              For compliance purposes, we may verify the primary shop owner.
              This information won&apos;t ever be shared outside of our secure
              service.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
          <p className="text-md text-muted-foreground font-semibold mb-2">
            Type of Identification
          </p>
          <Select
            onValueChange={setIdentificationType}
            defaultValue={identificationType}
          >
            <SelectTrigger className="text-muted-foreground">
              <SelectValue placeholder="Select type of identifcation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UMID">UMID</SelectItem>
              <SelectItem value="SSS">SSS</SelectItem>
              <SelectItem value="TIN ID">TIN ID</SelectItem>
              <SelectItem value="Voter's ID">Voter&apos;s ID</SelectItem>
              <SelectItem value="National ID">National ID</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground mt-2 flex flex-col">
            <p>
              1. Upload images of the front side of your ID. These images will
              be used for identity verification purposes.
            </p>
            <p>
              2. Be sure that your images include all information on the front
              side of your ID, including any signatures. Images also need to be
              clear, without any warped or blurred portions.
            </p>
            <p>
              3. Files must be less than 5 MB, and in JPG or PNG format.
              <span className="font-semibold text-orange-600 cursor-pointer">
                View Sample
              </span>
            </p>
          </div>
          <ImageUpload
            imageCount={1}
            className="mt-5"
            onImageUpload={() => {}}
            defaultValue=""
          />
        </div>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
          <p className="text-md text-muted-foreground font-semibold">
            Certificate of Registration (COR): Bureau of Internal Revenue (BIR)
            Form 2303
          </p>
          <p className="text-muted-foreground text-sm">
            All local online sellers must be registered with the BIR and have
            their COR. If you don&apos;t have a COR, you can apply for one at
            the{" "}
            <span
              onClick={() =>
                window.open("https://www.bir.gov.ph/newbizreg", "_blank")
              }
              className="font-semibold text-orange-600 cursor-pointer"
            >
              BIR NewBizReg website
            </span>
            .
          </p>
          <p className="text-muted-foreground text-sm mt-3">
            Note: Your COR details must match your TikTok Shop seller account
            details. Only PNG, JPG and BMP files under the 10 MB file size limit
            are supported. Please only upload your COR. By uploading your COR,
            you agree to have your COR displayed on your shop profile in
            accordance with local regulations.{" "}
            <span className="font-semibold text-orange-600 cursor-pointer">
              View Sample
            </span>
          </p>
          <ImageUpload
            imageCount={3}
            className="mt-5"
            onImageUpload={() => {}}
            defaultValue=""
          />
        </div>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 py-6 px-5">
          <p className="text-md text-muted-foreground font-semibold">
            Additional contact information
          </p>
          <p className="text-sm text-muted-foreground">
            Additional contact information will be used as a back-up contact
            method. It cannot be used to log in. TikTok works hard to protect
            your data privacy.
          </p>
          <div className="flex flex-col space-y-2 mt-2">
            <Label className="text-muted-foreground mt-2">Email Address</Label>
            <Input
              value={searchParams.get("email") || ""}
              disabled
              className="mt-2"
              placeholder="Please enter your email"
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-2">
            <div className="flex flex-col space-y-2">
              <Label className="text-muted-foreground mt-2">Given Name</Label>
              <Input className="mt-2" placeholder="Given Name" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="text-muted-foreground mt-2">Middle Name</Label>
              <Input className="mt-2" placeholder="Middle Name (if you have)" />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="text-muted-foreground mt-2">Family Name</Label>
              <Input className="mt-2" placeholder="Family Name" />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 mt-4">
          <Checkbox className="mt-1" />
          <p className="text-sm text-muted-foreground">
            I agree to the{" "}
            <span className="text-orange-600 font-semibold">
              1 Market Philippines Advertising Terms
            </span>{" "}
            and{" "}
            <span className="text-orange-600 font-semibold">
              1 Market Philippines Payment Terms
            </span>{" "}
            and acknowledge that a Business Center account as well as an
            advertising account will be automatically created for me to use
            advertising related services.
          </p>
        </div>
        <div className="flex items-center mt-4 justify-end gap-2">
          <Button
            type="button"
            onClick={() => setCancelModal(true)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() =>
              window.location.assign("/seller/account/finishing-setup")
            }
            className="bg-orange-600 hover:bg-orange-600/80"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
