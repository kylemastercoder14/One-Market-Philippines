/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { finishSettingUpSeller } from "@/actions/seller";

const SettingUpForm = ({ sellerId }: { sellerId: string }) => {
  const router = useRouter();
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [focusOrange, setFocusOrange] = useState(false);
  const [nationality, setNationality] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isReturnRefundAddress, setIsReturnRefundAddress] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the nationalities from the REST Countries API
    const fetchNationalities = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // Extract unique nationalities (demonym), remove duplicates, and sort alphabetically
        const demonyms = data
          .map(
            (country: any) =>
              country.demonyms?.eng?.m || country.demonyms?.eng?.f
          )
          .filter(Boolean); // Remove null/undefined values
        const uniqueSortedNationalities = Array.from(new Set(demonyms)).sort(); // Remove duplicates and sort
        setNationalities(uniqueSortedNationalities as string[]);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  const handleFocus = () => {
    setFocusOrange(true);
  };

  const handleBlur = () => {
    setFocusOrange(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await finishSettingUpSeller(
        nationality,
        residentialAddress,
        streetAddress,
        contactPerson,
        phoneNumber,
        isReturnRefundAddress,
        sellerId
      );
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        router.push(`/seller/${sellerId}/products/create`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
    // Handle form
    console.log({
      nationality,
      residentialAddress,
      streetAddress,
      contactPerson,
      phoneNumber,
      isReturnRefundAddress,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-6">
      <div className="space-y-1">
        <Label>Nationality</Label>
        <Select
          defaultValue={nationality}
          onValueChange={(value) => setNationality(value)}
          disabled={loading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your nationality" />
          </SelectTrigger>
          <SelectContent>
            {nationalities.map((nationality, index) => (
              <SelectItem key={index} value={nationality}>
                {nationality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Business Address</Label>
        <Textarea
          value={residentialAddress}
          onChange={(value) => setResidentialAddress(value.target.value)}
          placeholder="Enter the business address"
          disabled={loading}
        />
        <Textarea
          value={streetAddress}
          onChange={(value) => setStreetAddress(value.target.value)}
          placeholder="Enter the street address"
          disabled={loading}
        />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <div className="space-y-1">
          <Label>Contact Person</Label>
          <Input
            value={contactPerson}
            onChange={(value) => setContactPerson(value.target.value)}
            placeholder="Enter the contact person"
            disabled={loading}
          />
        </div>
        <div className="space-y-1">
          <Label>Phone Number</Label>
          <PhoneInput
            className={`flex h-9 ${focusOrange ? "border-orange-600" : "border-input"} w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-orange-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
            placeholder="Enter the phone number"
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultCountry="PH"
            countries={["PH"]}
            international
            countryCallingCodeEditable={false}
            withCountryCallingCode
            limitMaxLength={true}
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value ?? "")}
            numberInputProps={{
              className: `rounded-md px-4 focus:outline-none bg-transparent h-full w-full !bg-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed`,
            }}
            maxLength={16}
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox
          defaultChecked={isReturnRefundAddress}
          onCheckedChange={(value) => setIsReturnRefundAddress(value === true)}
          checked={isReturnRefundAddress}
          disabled={loading}
        />
        <Label>Set as return/refund address</Label>
      </div>
      <Button
        disabled={loading}
        className="bg-orange-600 hover:bg-orange-600/80 flex ml-auto"
      >
        Start to add products
      </Button>
    </form>
  );
};

export default SettingUpForm;
