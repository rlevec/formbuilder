import { Search } from "lucide-react";

import styles from "../../styles/searchInput.module.css";

import type { FormField } from "../../../types";

interface Props {
  field: FormField;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchField(props: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.icon} aria-hidden="true">
          <Search size={18} />
        </div>

        <input
          className={styles.input}
          value={props.value ?? ""}
          onChange={(e) => props.onChange(e)}
          placeholder={props.field.placeholder ?? "Search"}
          name={props.field.name}
          type="search"
          aria-label={props.field.placeholder ?? "Search input"}
        />
      </div>
    </div>
  );
};