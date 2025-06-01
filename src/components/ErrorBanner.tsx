import React from 'react';
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ErrorBannerProps = {
  message: string;
  onClose?: () => void;
  className?: string;
};

const ErrorBanner = ({ message, onClose, className }: ErrorBannerProps) => {
  return (
    <div className={cn(
      "bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md flex items-center justify-between",
      className
    )}>
      <p>{message}</p>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-2 text-destructive hover:text-destructive/80 transition"
          aria-label="Close error message"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
