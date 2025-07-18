'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';

interface FileUploadProps {
  endpoint: 'messageFile' | 'serverImage';
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative w-20 h-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          type="button"
          onClick={() => onChange('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
