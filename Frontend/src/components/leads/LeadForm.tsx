import { useForm } from "react-hook-form";
import type { CreateLeadPayload } from "../../types";

interface LeadFormProps {
  defaultValues?: Partial<CreateLeadPayload>;
  onSubmit: (data: CreateLeadPayload) => void;
  isSubmitting: boolean;
  mode?: "create" | "edit";
}

function LeadForm({ defaultValues, onSubmit, isSubmitting, mode = "create" }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLeadPayload>({
    defaultValues: {
      status: "new",
      source: "website",
      ...defaultValues,
    },
  });

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border text-sm bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="lead-name" className={labelClass}>
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          placeholder="e.g. Rahul Sharma"
          className={inputClass}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          })}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="lead-email" className={labelClass}>
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="e.g. rahul@example.com"
          className={inputClass}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-status" className={labelClass}>
            Status
          </label>
          <select id="lead-status" className={inputClass} {...register("status")}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div>
          <label htmlFor="lead-source" className={labelClass}>
            Source <span className="text-red-500">*</span>
          </label>
          <select
            id="lead-source"
            className={inputClass}
            {...register("source", { required: "Source is required" })}
          >
            <option value="website">🌐 Website</option>
            <option value="instagram">📸 Instagram</option>
            <option value="referral">🤝 Referral</option>
            <option value="other">📌 Other</option>
          </select>
          {errors.source && <p className={errorClass}>{errors.source.message}</p>}
        </div>
      </div>

      <button
        id="lead-form-submit"
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
      >
        {isSubmitting ? "Saving..." : mode === "create" ? "✨ Create Lead" : "💾 Save Changes"}
      </button>
    </form>
  );
}

export default LeadForm;
