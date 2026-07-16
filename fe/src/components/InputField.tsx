import { useState } from "react";

import type { FormField, FieldUpdateParams } from "../../types";

import styles from "../styles/inputField.module.css";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import type { LucideProps } from "lucide-react";

import type { ForwardRefExoticComponent } from "react";

import Button from "./Button";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (params: FieldUpdateParams) => void;
}

const FIELD_ICONS: Record<
  string,
  ForwardRefExoticComponent<Omit<LucideProps, "ref">>
> = {
  email: Mail,
  password: Lock,
};

export default function InputField({
  field,
  value,
  error,
  onChange
}: Props) {
  const [passwordFieldType, setPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const isPassword =
    field.isPassword || field.name?.includes?.("password") || false;

  const validators = Array.isArray(field.separateValidators)
    ? field.separateValidators.map((v) => {
        const isEmpty = !value || value.length === 0;
        const regex = new RegExp(v.regex);

        return {
          message: v.message,
          valid: !isEmpty && regex.test(value),
          neutral: isEmpty,
        };
      })
    : [];

  const FieldIcon = field.name ? FIELD_ICONS[field.name] : null;

  const showPills = !value || !!error;

  const errorId = field.name ? `${field.name}-error` : undefined;
  const pillsId = field.name ? `${field.name}-pills` : undefined;

  return (
    <div
      className={styles.wrapper}
    >
      {field.label && (
        <label
          className={styles.label}
          htmlFor={field.name}
        >
          {field.label}
        </label>
      )}

      <div
        className={`${styles.inputWrapper} ${error ? styles.errorWrapper : ""}`}
      >
        {FieldIcon && (
          <div className={styles.icon} aria-hidden="true">
            <FieldIcon size={18} />
          </div>
        )}

        <input
          id={field.name}
          className={styles.input}
          value={value ?? ""}
          onChange={(e) =>
            onChange({
              fieldName: field.name || "",
              value: e.target.value,
              field,
            })
          }
          step={field.step}
          min={field.min || ""}
          max={field.max || ""}
          placeholder={field.placeholder}
          name={field.name}
          type={isPassword ? passwordFieldType : field.type}
          aria-invalid={!!error}
          aria-describedby={
            [error ? errorId : null, validators.length ? pillsId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        {isPassword && (
          <Button
            type="button"
            visual="ghost"
            additionalClassName={`${styles.icon} ${styles.clickableIcon} ${styles.toggleBtn}`}
            onClick={() =>
              setPasswordFieldType((prev) =>
                prev === "password" ? "text" : "password",
              )
            }
            ariaLabel={
              passwordFieldType === "password"
                ? "Show password"
                : "Hide password"
            }
            Icon={passwordFieldType === "password" ? Eye : EyeOff}
            iconSize={18}
            iconColor={"#4f46e5"}
          />
        )}
      </div>
      {error && !field.validationPills && (
        <small id={errorId} className={styles.errorText}>
          {error}
        </small>
      )}
      {validators.length > 0 && showPills && (
        <div id={pillsId} className={styles.pills}>
          {validators.map(({ message, valid, neutral }, idx) => (
            <span
              key={idx}
              className={`${styles.pill} ${
                neutral ? "" : valid ? styles.pillValid : styles.pillInvalid
              }`}
            >
              {message}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};