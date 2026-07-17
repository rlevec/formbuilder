"use client";

import { useState } from "react";

import type { FormEvent } from "react";

import { useCustomMutation } from "../api";

import { useNavigate } from "react-router-dom";

import type { FormData, Response, FieldUpdateParams } from "../../types";

import { buildZodSchema } from "../validators/buildZodSchema";

const URL_MAP: Record<string, string> = {
  login: "/api/auth/login",
  registration: "/api/auth/register",
};

const ROUTE_MAP: Record<string, string> = {
  registration: "/auth/login",
  login: "/",
};

export default function useForm({
  data,
  type,
}: {
  data: FormData;
  type: string;
}) {
  const [query, setQuery] = useState<Record<string, string | boolean>>({});
  const [fieldError, setFieldError] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>("");

  const navigate = useNavigate();

  const submitMutation = useCustomMutation({
    fetchParams: {
      url: URL_MAP?.[type],
      options: { method: "POST" },
    },
    options: {
      onSuccess: () => {
        const targetRoute = ROUTE_MAP[type];

        if (targetRoute) {
          navigate(targetRoute, { replace: true });
        }
      },
      onError: (data: Response) => {
        console.log("error_data", data);
        setFormError(data.message || data.data.message || "Invalid Request");
      },
    },
  });

const isFormValid =
  data.fields.length === Object.keys(query).length &&
  !Object.values(fieldError).some(Boolean);

  const handleChange = ({ fieldName, value, field }: FieldUpdateParams) => {
    setQuery((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    let error = "";

    if (field.required && !value) {
      error = field.requiredMessage ?? "";
    }

    if (field.separateValidators && !error) {
      const failed = field.separateValidators.find(
        ({ regex }) => !new RegExp(regex).test(String(value)),
      );

      if (failed) error = failed.message;
    }

    if (field.validator && !field.separateValidators?.length && !error) {
      const regex = new RegExp(field.validator);
      if (!regex.test(String(value))) {
        error = field.validationMessage ?? "";
      }
    }

    setFieldError((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError("");

    const schema = buildZodSchema(data.fields);

    const result = schema.safeParse(query);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field === "string") {
          errors[field] = issue.message;
        }
      });

      setFieldError(errors);
      return;
    }

    submitMutation.mutate(result.data);
  };

  return {
    query,
    setQuery,
    fieldError,
    setFieldError,
    formError,
    setFormError,
    isFormValid,
    handleChange,
    handleSubmit,
  };
}
