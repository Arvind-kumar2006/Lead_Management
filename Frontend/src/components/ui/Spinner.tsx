interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 animate-spin-custom`}
      role="status"
      aria-label="Loading..."
    />
  );
}

export default Spinner;
