import type {
  CanvasFieldValue,
  FormField,
  HandleFieldUpdateParams,
} from "../../../types";

import InputField from "../shared/InputField";
import SwitchField from "../shared/SwitchField";
import TextareaField from "../shared/TextareaField";
import SelectField from "../shared/SelectField";
import RadioGroupField from "../shared/RadioGroupField";
import OptionsBuilderField from "../shared/OptionsBuilderField";
import CheckboxGroupField from "../shared/CheckboxGroupField";

import styles from "../../styles/fieldSettings.module.css";

interface Props {
  handleFieldUpdate: (params: HandleFieldUpdateParams) => void;
  fieldConfigQuery: Record<string, CanvasFieldValue>;
  fieldSettingsConfig: FormField[] | null;
}

const getValue = (map: Record<string, CanvasFieldValue>, key?: string) => {
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
              <InputField
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
   case "checkboxGroup":
            return (
              <CheckboxGroupField
                key={fieldEntry.id}
                field={fieldEntry}
                value={Array.isArray(value) ? value : []}
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