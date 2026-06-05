"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface FormSchema {
  id: string;
  name: string;
  schema: FormField[];
}

interface DynamicFormProps {
  formId: string;
  buttonText?: string;
  bgColor?: string;
  textColor?: string;
}

export default function DynamicForm({
  formId,
  buttonText = "Submit",
}: DynamicFormProps) {
  const [schema, setSchema] = useState<FormField[]>([]);
  const [formName, setFormName] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSchema() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const { data } = await axios.get<FormSchema>(
          `${backendUrl}/forms/public/${formId}`
        );
        setSchema(data.schema || []);
        setFormName(data.name || "");
        
        // Initialize form fields
        const initialData: Record<string, string> = {};
        (data.schema || []).forEach((field) => {
          initialData[field.name] = "";
        });
        setFormData(initialData);
      } catch (err: any) {
        console.error("Failed to load form schema", err);
        setError("Failed to load form schema.");
      } finally {
        setLoading(false);
      }
    }

    if (formId) {
      fetchSchema();
    }
  }, [formId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Submitting to the route handler: /forms/[id]/submit
      await axios.post(`/forms/${formId}/submit`, formData);
      setSuccess(true);
      // Reset form
      const resetData: Record<string, string> = {};
      schema.forEach((field) => {
        resetData[field.name] = "";
      });
      setFormData(resetData);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to submit form. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-indigo-500" />
      </div>
    );
  }

  if (schema.length === 0) {
    return (
      <p className="text-sm text-zinc-550 text-center">
        This form has no configured fields.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {formName && (
        <h4 className="text-sm font-semibold text-zinc-400 mb-2">{formName}</h4>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4 text-xs text-emerald-400 text-center font-medium">
          Thank you! Your response has been submitted successfully.
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-xs text-red-400 text-center font-medium">
          {error}
        </div>
      )}

      {schema.map((field) => {
        const isTextarea = field.type === "textarea" || field.type === "textarea-large";
        return (
          <div key={field.name} className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-400">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {isTextarea ? (
              <textarea
                name={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500 focus:outline-none p-3 text-xs text-white placeholder-zinc-600 transition-colors"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500 focus:outline-none px-4 py-3 text-xs text-white placeholder-zinc-600 transition-colors"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3.5 mt-4 transition-all disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-indigo-600/30"
      >
        {submitting ? "Submitting..." : buttonText}
      </button>
    </form>
  );
}
