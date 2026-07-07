import { memo } from "react";

import styles from "../styles/textareaField.module.css";

import type { FormField, FieldUpdateParams } from "../../types";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onChange: (params: FieldUpdateParams) => void;
}

export const TextareaField = ({ field, error, onChange, value }: Props) => {
  const errorId = field.name ? `${field.name}-error` : undefined;

  return (
    <div className={styles.wrapper}>
      {field.label && (
        <label className={styles.label} htmlFor={field.name}>
          {field.label}
        </label>
      )}
      <div
        className={`${styles.textareaWrapper} ${
          error ? styles.errorWrapper : ""
        }`}
      >
        <textarea
          id={field.name}
          className={styles.textarea}
          value={value ?? ""}
          onChange={(e) =>
            onChange({
              fieldName: field.name || "",
              value: e.target.value,
              field,
            })
          }
          placeholder={field.placeholder}
          name={field.name}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && (
        <small id={errorId} className={styles.errorText}>
          {error}
        </small>
      )}
    </div>
  );
};

const MemoizedTextareaField = memo(TextareaField);

export default MemoizedTextareaField;