import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="
        w-full
        max-w-2xl
        mx-auto
        flex items-start gap-3
        p-4 md:p-5
        rounded-xl
        border border-error/30
        bg-error-container
        text-on-error-container
        shadow-sm
      "
    >
      {/* Icon */}
      <div className="mt-0.5">
        <AlertCircle className="w-5 h-5 text-error" />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="font-semibold text-sm md:text-base">
          Something went wrong
        </p>
        <p className="text-sm opacity-90">
          {message}
        </p>
      </div>
    </div>
  );
}