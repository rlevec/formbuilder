import { useState } from "react";

import type { FormField, FieldUpdateParams } from "../../types";

import styles from "../styles/textField.module.css";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import type { LucideProps } from "lucide-react";

import type { ForwardRefExoticComponent } from "react";

import Button from "./Button";

interface CanvasFieldStyles {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: string | number;
  padding?: string;
  borderRadius?: string;
  border?: string;
  labelMargin?: string;
  labelTextColor?: string;
  labelFontWeight?: string | number;
  fieldFontSize?: string;
  labelFontSize?: string;
  focusedLabelColor?: string;
  focusedFieldBorderColor?: string;
}

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (params: FieldUpdateParams) => void;
  isCanvas?: boolean;
  canvasStyles?: CanvasFieldStyles;
}

const FIELD_ICONS: Record<
  string,
  ForwardRefExoticComponent<Omit<LucideProps, "ref">>
> = {
  email: Mail,
  password: Lock,
};

export default function TextField({
  field,
  value,
  error,
  onChange,
  isCanvas,
  canvasStyles,
}: Props) {
  const [passwordFieldType, setPasswordFieldType] = useState<
    "password" | "text"
  >("password");

  const [canvasFieldInFocus, setCanvasFieldInFocus] = useState(false);

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
      style={isCanvas ? { display: "flex", flexDirection: "column" } : {}}
      className={!isCanvas ? styles.wrapper : ""}
    >
      {field.label && (
        <label
          style={
            isCanvas
              ? {
                  fontSize: canvasStyles?.labelFontSize ?? "14px",
                  margin: canvasStyles?.labelMargin ?? "0 0 0.5rem",
                  color: canvasFieldInFocus
                    ? (canvasStyles?.focusedLabelColor ??
                      canvasStyles?.labelTextColor ??
                      "#6b7280")
                    : (canvasStyles?.labelTextColor ?? "#6b7280"),
                  fontWeight: canvasStyles?.labelFontWeight ?? "500",
                }
              : {}
          }
          className={!isCanvas ? styles.label : ""}
          htmlFor={field.name}
        >
          {field.label}
        </label>
      )}

      <div
        className={
          !isCanvas
            ? `${styles.inputWrapper} ${error ? styles.errorWrapper : ""}`
            : ""
        }
      >
        {FieldIcon && (
          <div className={styles.icon} aria-hidden="true">
            <FieldIcon size={18} />
          </div>
        )}

        <input
          onFocus={() => isCanvas && setCanvasFieldInFocus(true)}
          onBlur={() => isCanvas && setCanvasFieldInFocus(false)}
          style={
            isCanvas
              ? {
                  fontSize: canvasStyles?.fieldFontSize,
                  color: canvasStyles?.textColor ?? "var(--text-primary)",
                  width: "100%",
                  fontWeight: canvasStyles?.fontWeight ?? "400",
                  background: canvasStyles?.backgroundColor ?? "var(--surface)",
                  border: canvasStyles?.border ?? "1px solid var(--border)",
                  borderColor: canvasFieldInFocus
                    ? (canvasStyles?.focusedFieldBorderColor ??
                      canvasStyles?.border ??
                      "var(--border)")
                    : (canvasStyles?.border ?? "var(--border)"),
                  borderRadius: canvasStyles?.borderRadius ?? "8px",
                  padding: canvasStyles?.padding ?? "0 var(--space-3)",
                  height: "45px",
                }
              : {}
          }
          id={field.name}
          className={!isCanvas ? styles.input : styles.canvasInput}
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
        {isPassword && !isCanvas && (
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
      {validators.length > 0 && showPills && !isCanvas && (
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