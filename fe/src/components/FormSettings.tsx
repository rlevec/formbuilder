import type { FormBuilderSettingsField } from "../../types";

import TextField from "./InputField";
import SwitchField from "./SwitchField";
import Textarea from "./TextareaField";
import SelectField from "./SelectField";

import styles from "../styles/formSettings.module.css";

import type { HandleFieldUpdateParams } from "../../types";

interface Props {
  formFields: Record<string, FormBuilderSettingsField[]> | null;
  handleFieldUpdate: (params: HandleFieldUpdateParams) => void;
  formConfigQuery: Record<string, string | boolean>;
}

const formatSectionTitle = (key: string) =>
  key.charAt(0).toUpperCase() + key.slice(1);

const getValue = (map: Record<string, string | boolean>, key?: string) => {
  if (!key) return undefined;
  return map[key];
};

export default function FormSettings({
  formFields,
  formConfigQuery,
  handleFieldUpdate,
}: Props) {
  if (!formFields) return;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={styles.wrapper}
      aria-label="Form settings"
    >
      {Object.entries(formFields).map(([sectionKey, fields]) => (
        <section key={sectionKey} className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              {formatSectionTitle(sectionKey)}
            </h3>
            <div className={styles.sectionDivider} />
          </div>

          <div className={styles.fieldGroup}>
            {fields.map((fieldEntry) => {
              const name = fieldEntry.name;
              const value = getValue(formConfigQuery, name);

              switch (fieldEntry.type) {
                case "text":
                  return (
                    <TextField
                      key={fieldEntry.id}
                      field={fieldEntry}
                      value={typeof value === "string" ? value : ""}
                      onChange={handleFieldUpdate}
                    />
                  );

                case "textarea":
                  return (
                    <Textarea
                      key={fieldEntry.id}
                      field={fieldEntry}
                      value={typeof value === "string" ? value : ""}
                      onChange={handleFieldUpdate}
                    />
                  );
                case "select":
                  return (
                    <SelectField
                      key={fieldEntry.id}
                      field={fieldEntry}
                      value={typeof value === "string" ? value : ""}
                      onSelect={handleFieldUpdate}
                    />
                  );
                case "switch":
                  return (
                    <SwitchField
                      key={fieldEntry.id}
                      field={fieldEntry}
                      value={Boolean(value)}
                      onToggle={handleFieldUpdate}
                    />
                  );

                default:
                  return null;
              }
            })}
          </div>
        </section>
      ))}
    </form>
  );
};