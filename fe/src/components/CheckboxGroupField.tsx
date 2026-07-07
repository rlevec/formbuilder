import styles from "../styles/checkboxField.module.css";

import type { FormField, FieldUpdateParams } from "../../types";

interface Props {
  field: FormField;
  value: string | string[];
  error?: string;
  onSelect: (params: FieldUpdateParams) => void;
}

export default function CheckboxGroupField({
  field,
  error,
  value,
  onSelect,
}: Props) {

  return (
    <div className={styles.wrapper}>
      {field.options?.map((option) => {
        console.log("val_test", {
          value,
          option,
          includes: Array.isArray(value) && value.includes(option),
        });
        return (
          <div key={option} className={styles.optionWrapper}>
            <label
              htmlFor={option || ""}
              className={`${styles.inputWrapper} ${error ? styles.errorWrapper : ""}`}
            >
              <input
                id={option || ""}
                type="checkbox"
                checked={Array.isArray(value) && value.includes(option)}
                className={styles.input}
                onChange={() =>
                  onSelect({
                    fieldName: field.name ?? "",
                    value: option,
                    field,
                  })
                }
              />

              <span className={styles.label}>{option ?? ""}</span>
            </label>

            {field?.description && (
              <small className={styles.description}>{field.description}</small>
            )}

            {error && <small className={styles.errorText}>{error}</small>}
          </div>
        );
      })}
    </div>
  );
};