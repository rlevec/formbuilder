import styles from "../styles/checkboxField.module.css";

import type { FormField, FieldUpdateParams } from "../../../types";

interface Props {
  field: FormField;
  value: string | boolean;
  error?: string;
  onChange: (params: FieldUpdateParams) => void;
}

export default function CheckboxField({ field, error, value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={field?.name || ""}
        className={`${styles.inputWrapper} ${error ? styles.errorWrapper : ""}`}
      >
        <input
          id={field?.name || ""}
          type="checkbox"
          checked={Boolean(value)}
          className={styles.input}
          onChange={(e) =>
            onChange({
              fieldName: field.name ?? "",
              value: e.target.checked,
              field,
            })
          }
        />

        <span className={styles.label}>{field?.label ?? ""}</span>
      </label>

      {field?.description && (
        <small className={styles.description}>{field.description}</small>
      )}

      {error && <small className={styles.errorText}>{error}</small>}
    </div>
  );
};