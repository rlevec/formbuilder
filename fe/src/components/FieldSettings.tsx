import type { FormField, HandleFieldUpdateParams} from "../../types";

import TextField from "./TextField";
import SwitchField from "./SwitchField";
import TextareaField from "./TextareaField";
import SelectField from "./SelectField";
import RadioGroupField from "./RadioGroupField";
import OptionsBuilderField from "./OptionsBuilderField";

import styles from "../styles/fieldSettings.module.css";

interface Props {
  handleFieldUpdate: (params: HandleFieldUpdateParams) => void;
  fieldConfigQuery: Record<string, string | boolean | string[] | number>;
  fieldSettingsConfig: FormField[] | null
}

const getValue = (
  map: Record<string, string | boolean | string[] | number>,
  key?: string
) => {
  if (!key) return undefined;
  return map[key];
};

export default function FieldSettings({
  handleFieldUpdate,
  fieldConfigQuery,
  fieldSettingsConfig
}: Props) {

  if(!fieldSettingsConfig) return null;

  return (
    <form className={styles.wrapper}>
      {fieldSettingsConfig.map((fieldEntry) => {
        const name = fieldEntry.name;
        const value = getValue(fieldConfigQuery, name);

        switch (fieldEntry.inputType) {
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
              <TextareaField
                key={fieldEntry.id}
                field={fieldEntry}
                value={typeof value === "string" ? value : ""}
                onChange={handleFieldUpdate}
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

          case "optionsBuilder":
            return (
              <OptionsBuilderField
                key={fieldEntry.id}
                field={fieldEntry}
                options={Array.isArray(value) ? value : []}
                onClick={handleFieldUpdate}
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

          case "radioGroup":
            return (
              <RadioGroupField
                key={fieldEntry.id}
                field={fieldEntry}
                value={typeof value === "string" ? value : ""}
                onSelect={handleFieldUpdate}
              />
            );

          default:
            return null;
        }
      })}
    </form>
  );
};