import { memo } from "react";
import type { FormField, FieldUpdateParams } from "../../types";
import styles from "../styles/radioGroupField.module.css";

interface Props {
  field: FormField;
  value: string;
  error?: string;
  onSelect: (params: FieldUpdateParams) => void;
}

const RadioGroupField = ({ field, error, onSelect, value }: Props) => {
  const options = Array.isArray(field.options) ? field.options : [];
  const groupName = field.name || "radio-group";

  return (
   <div className={styles.wrapper}>
  <fieldset className={styles.fieldset}>
    
    <label className={styles.label}>
      {field.label ?? "Select"}
    </label>

    <div className={styles.options}>
      {options.map((option) => {
        const id = `${groupName}-${option}`;

        return (
          <div key={option} className={styles.optionWrapper}>
            <input
              type="radio"
              id={id}
              name={groupName}
              value={option}
              checked={option === value}
              onChange={() =>
                onSelect({
                  fieldName: groupName,
                  value: option,
                  field,
                })
              }
              className={styles.input}
            />

            <label htmlFor={id} className={styles.pill}>
              {option}
            </label>
          </div>
        );
      })}
    </div>
  </fieldset>

  {error && <div className={styles.errorText}>{error}</div>}
</div>
  );
};

const MemoizedRadioGroupField = memo(RadioGroupField);
export default MemoizedRadioGroupField;