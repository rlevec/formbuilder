import { useState } from "react";
import type { FieldUpdateParams, FormField } from "../../types";

import { ChevronDown } from "lucide-react";

import styles from "../styles/selectField.module.css";

import Button from "./Button";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onSelect: (params: FieldUpdateParams) => void;
}

export default function SelectField({ field, value, error, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
      onSelect({
        fieldName: field.name || "",
        value: option,
        field,
      });
      setOpen(false);
    }

  console.log("fieldOptions", field.options);

  return (
    <div className={`${styles.wrapper} ${open ? styles.open : ""}`}>
      {field.label && <label className={styles.label}>{field.label}</label>}
      <div
        className={`${styles.inputWrapper} ${error ? styles.errorWrapper : ""}`}
      >
        <Button
          type="button"
          additionalClassName={styles.control}
          onClick={() => setOpen((v) => !v)}
          ariaHaspopup="listbox"
          ariaExpanded={open}
        >
          <span className={value ? styles.value : styles.placeholder}>
            {value || field.placeholder}
          </span>
          <ChevronDown
            color={open ? "#4f46e5" : "#9ca3af"}
            size={18}
            className={`${styles.icon} ${open ? styles.iconOpen : ""}`}
          />
        </Button>
      </div>
      {open && Array.isArray(field.options) && (
        <ul className={styles.options} role="listbox">
          {field.options.map((option, idx) => (
            <li
              key={`${option}-${idx}`}
              role="option"
              aria-selected={value === option}
            >
              <Button
                type="button"
                additionalClassName={styles.option}
                onClick={() => handleSelect(option)}
                title={option}
              />
            </li>
          ))}
        </ul>
      )}

      {error && <small className={styles.errorText}>{error}</small>}
    </div>
  );
};