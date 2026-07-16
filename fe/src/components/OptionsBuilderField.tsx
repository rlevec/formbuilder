import { useState } from "react";

import { Plus, Minus } from "lucide-react";

import type { FormField, FieldUpdateParams } from "../../types";

import styles from "../styles/optionsBuilderField.module.css";
import Button from "./Button";

interface Props {
  field: FormField;
  options: string[];
  error?: string;
  onClick: (params: FieldUpdateParams) => void;
}

export default function OptionsBuilderField({ field, options, error, onClick }: Props) {
  const [query, setQuery] = useState("");

  const handleAdd = () => {
    if (!query.trim()) return;

    onClick({
      fieldName: field.name || "",
      value: query.trim(),
      field,
    });

    setQuery("");
  }

  const errorId = field.name ? `${field.name}-error` : undefined;

  return (
    <div className={styles.wrapper}>
      {field.label && (
        <label className={styles.label} htmlFor={field.name}>
          {field.label}
        </label>
      )}
      <section
        className={`${styles.container} ${
          error ? styles.errorWrapper : ""
        }`}
        aria-describedby={error ? errorId : undefined}
      >
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            id={field.name}
            type="text"
            placeholder={field.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            aria-invalid={!!error}
          />
          <Button
            visual="success"
            Icon={Plus}
            type="button"
            onClick={handleAdd}
            additionalClassName={styles.addBtn}
            aria-label="Add option"
          />
        </div>
        {Array.isArray(options) && options.length > 0 && (
          <ul className={styles.optionsWrapper}>
            {options.map((option, idx) => (
              <li key={idx} className={styles.optionItem}>
                <span className={styles.optionText}>{option}</span>
                <Button
                  type="button"
                  visual="danger"
                  Icon={Minus}
                  additionalClassName={styles.removeBtn}
                  onClick={() =>
                    onClick({
                      fieldName: field.name || "",
                      value: option,
                      field,
                      isOptionDelete: true,
                    })
                  }
                  aria-label={`Remove option ${option}`}
                />
              </li>
            ))}
          </ul>
        )}
        {error && (
          <small id={errorId} className={styles.errorText}>
            {error}
          </small>
        )}
      </section>
    </div>
  );
};