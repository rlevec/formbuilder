import styles from "../../styles/checkboxGroupField.module.css";

import type { FormField, FieldUpdateParams } from "../../../types";

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
  console.log("value", value);
  return (
    <div className={styles.wrapper}>
      {field.label && <label className={styles.label}>{field.label}</label>}
      <div className={styles.container}>
        {field.options?.map((option) => {
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
              {error && <small className={styles.errorText}>{error}</small>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
