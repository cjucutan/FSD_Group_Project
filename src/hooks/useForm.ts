import { useState } from "react";

export function useFormState(initialValues: Record<string, any>) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    clearFieldError(field);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
        const newErrors = new Map(prev);
        newErrors.delete(field);
        return newErrors;
    })
  }

  const clearAllErrors = () => setErrors(new Map());

  const resetForm = () => {
    setFormData(initialValues);
    clearAllErrors();
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    clearFieldError,
    clearAllErrors,
    resetForm,
  };
};
