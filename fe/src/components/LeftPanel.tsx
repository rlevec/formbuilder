import styles from "../styles/leftPanel.module.css";

import SearchField from "./SearchField";
import Button from "./Button";

import { useSearch } from "../hooks/useSearch";

import type { FormBuilderField, FormField } from "../../types";

import { FIELD_ICONS } from "../lib/utils";
interface Props {
  inputFields: FormBuilderField[];
  fieldTypes: FormBuilderField[];
  handleSelectDefaultFieldConfig: ({slug, id}: {slug: string, id: string}) => void;
  selectedDefaultFieldConfigId: string | FormField[] | null;
}
export default function LeftPanel({
  inputFields,
  fieldTypes,
  handleSelectDefaultFieldConfig,
  selectedDefaultFieldConfigId
}: Props) {
  
  const { search, setSearch, results } = useSearch({
    delay: 250,
    data: fieldTypes,
    filter: (field, query) => {
      if (field.isInput) return true;
      return (field.title ?? "").toLowerCase().includes(query);
    },
  });


  return (
    <main className={styles.wrapper}>
      {inputFields.length > 0 && (
        <SearchField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          field={{
            order: 2,
            name: "fieldSearch",
            placeholder: "Search...",
          }}
        />
      )}

      {results.length > 0 && (
        <ul className={styles.fieldsContainer}>
          {results.map((field, idx) => {
            const Icon =
              FIELD_ICONS[field.frontendSlug as keyof typeof FIELD_ICONS] ??
              FIELD_ICONS.default;

            const slug = field.frontendSlug ?? "";
            const id = field.id ?? ""
            const isSelected = selectedDefaultFieldConfigId === id

            return (
              <li key={field.id ?? idx} className={styles.actionContainer}>
                <Button
                  type="button"
                  visual="secondary"
                  aria-label={`Add ${field.title}`}
                  additionalClassName={`${styles.actionBtn} ${isSelected ? styles.actionBtnSelected : ""}`}
                  onClick={() => handleSelectDefaultFieldConfig({slug, id})}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSelectDefaultFieldConfig({slug, id});
                    }
                  }}
                >
                  <Icon size={16} color="#4f46e5" />
                  <span>{field.title}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};