import type { FormField, SwitchParams } from "../../../types";

import styles from "../../styles/switchField.module.css";

import Button from "./Button";

interface Props {
  field: FormField;
  onToggle: (params: SwitchParams) => void;
  value: boolean;
}

export default function Switch({ field, onToggle, value }: Props) {
  const isChecked = Boolean(value);

  return (
    <div className={styles.wrapper}>
      {field.label && (
        <label className={styles.label} id={`${field.name}-label`}>
          {field.label}
        </label>
      )}

      <Button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={field.label ? `${field.name}-label` : undefined}
        additionalClassName={`${styles.switchTrack} ${
          isChecked ? styles.switchTrackActive : ""
        }`}
        onClick={() =>
          onToggle({
            fieldName: field.name || "",
            value,
            field,
          })
        }
      >
        <span
          className={`${styles.switchThumb} ${
            isChecked ? styles.switchThumbActive : ""
          }`}
        />
      </Button>
    </div>
  );
};