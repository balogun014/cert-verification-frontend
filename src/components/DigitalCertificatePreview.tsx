import React, { forwardRef } from 'react';
import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type DigitalCertificatePreviewProps = {
  studentName?: string;
  course?: string;
  dateIssued?: string;
  certificateId?: string;
  recipientEmail?: string;
  organization?: string;
  logoUrl?: string;
  className?: string;
};

const DigitalCertificatePreview = forwardRef<HTMLDivElement, DigitalCertificatePreviewProps>(({
  studentName = "",
  course = "",
  dateIssued = "",
  certificateId = "",
  recipientEmail = "",
  organization = "",
  logoUrl = "/placeholder.svg",
  className = "",
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Increased max width for a wider preview
        "w-full max-w-3xl rounded-xl shadow-lg border bg-gradient-to-r from-violet-50 via-white to-indigo-50 px-12 py-8 mx-auto",
        className
      )}
    >
      <div className="flex flex-col items-center mb-8">
        <img
          src={logoUrl}
          alt="Organization Logo"
          className="h-20 w-20 rounded-full bg-white border-2 border-gray-200 mb-2 object-contain shadow"
          draggable={false}
        />
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          {organization || <span className="italic text-gray-400">Organization Name</span>}
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <BadgeCheck className="w-12 h-12 text-violet-500 mb-2" />
        <h3 className="text-2xl font-semibold mb-2">Certificate of Achievement</h3>
        <p className="text-base text-muted-foreground mb-4 font-medium">
          This certificate is proudly presented to
        </p>
        <div className="mb-4">
          <span className="text-3xl font-bold block text-indigo-700">
            {studentName || <span className="italic text-gray-400">Student Name</span>}
          </span>
        </div>
        <p className="mb-2 text-gray-700">
          For successfully completing <span className="font-medium text-primary">{course || <span className="italic text-gray-400">Course Name</span>}</span>
        </p>
        <div className="flex justify-between w-full mt-6 text-base">
          <div>
            <div className="text-muted-foreground font-medium">Date Issued</div>
            <div>{dateIssued || <span className="italic text-gray-400">yyyy-mm-dd</span>}</div>
          </div>
          <div>
            <div className="text-muted-foreground font-medium">Certificate ID</div>
            <div>{certificateId || <span className="italic text-gray-400">ID</span>}</div>
          </div>
        </div>
        <div className="mt-8 w-full border-t pt-4 text-sm text-muted-foreground flex justify-between items-center">
          <span>Recipient: {recipientEmail || <span className="italic text-gray-400">Email</span>}</span>
          <span className="font-semibold">{organization || <span className="italic text-gray-400">Organization Name</span>}</span>
        </div>
      </div>
    </div>
  );
});

DigitalCertificatePreview.displayName = "DigitalCertificatePreview";

export default DigitalCertificatePreview;
