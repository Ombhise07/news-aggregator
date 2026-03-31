export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      
      {/* Spinner */}
      <div
        className="
          w-10 h-10
          border-4
          border-surface-container-high
          border-t-secondary
          rounded-full
          animate-spin
        "
      />

      {/* Text */}
      <p className="text-sm text-on-surface-variant font-medium">
        Loading news...
      </p>
    </div>
  );
}