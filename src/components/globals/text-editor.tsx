"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import React, { useMemo } from "react";

const TextEditor = ({
  value,
  onChange,
  placeholder
}: {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  return (
    <div className="bg-white">
      <ReactQuill placeholder={placeholder} theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
