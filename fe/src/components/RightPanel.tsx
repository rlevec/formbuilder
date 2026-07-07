import Button from "./Button";
import FieldSettings from "./FieldSettings";
import FormSettings from "./FormSettings";

import styles from "../styles/rightPanel.module.css";

import type {
  FormBuilderSettingsField,
  FormField,
  HandleFieldUpdateParams
} from "../../types";

interface Props {
  canvasFieldSelected: string | null;
  activeSettings: "field" | "form";
  formFields: Record<string, FormBuilderSettingsField[]> | null;
  handleAddFieldToCanvas: () => void;
  handleFieldUpdate: (params: HandleFieldUpdateParams) => void;
  fieldSettingsConfig: FormField[] | null;
  formConfigQuery: Record<string, string | boolean>;
  fieldConfigQuery: Record<string, string | boolean | string[] | number>;
  handleUpdateFieldInCanvas: () => void;
  handleTabChange: (type: "field" | "form") => void;
  updateFormSetting: () => void;
}

export default function RightPanel({
  activeSettings,
  handleFieldUpdate,
  fieldConfigQuery,
  formConfigQuery,
  handleTabChange,
  fieldSettingsConfig,
  formFields,
  handleAddFieldToCanvas,
  canvasFieldSelected,
  handleUpdateFieldInCanvas,
  updateFormSetting
}: Props) {


  return (
    <aside className={styles.wrapper} aria-label="Settings panel">
      <nav className={styles.settings} role="tablist">
        {(["field", "form"] as const).map((type) => {
          const isActive = activeSettings === type;

          return (
            <Button
              key={type}
              onClick={() => handleTabChange(type)}
              visual="secondary"
              title={`${type[0].toUpperCase() + type.slice(1)} Settings`}
              additionalClassName={`${styles.settingButton} ${
                isActive
                  ? styles.settingsButtonActive
                  : styles.settingsButtonInactive
              }`}
              role="tab"
              aria-selected={isActive}
            />
          );
        })}
      </nav>
      <section className={styles.formFielsWrapper}>
        {activeSettings === "field" && (
          <section aria-label="Field settings">
            <FieldSettings
              fieldSettingsConfig={fieldSettingsConfig}
              fieldConfigQuery={fieldConfigQuery}
              handleFieldUpdate={handleFieldUpdate}
            />
          </section>
        )}
        {activeSettings === "form" && (
          <section aria-label="Form settings">
            <FormSettings
              formConfigQuery={formConfigQuery}
              handleFieldUpdate={handleFieldUpdate}
              formFields={formFields}
            />
          </section>
        )}
      </section>
      <footer className={styles.panelFooter}>
        {activeSettings === "field" && (
          <Button
            title={`${canvasFieldSelected ? "Update" : "Create"} Field`}
            type="button"
            onClick={canvasFieldSelected ? handleUpdateFieldInCanvas : handleAddFieldToCanvas}
            additionalClassName={styles.panelFooterButton}
          />
        )}

        {activeSettings === "form" && (
          <Button
            title="Update Form Settings"
            additionalClassName={styles.panelFooterButton}
            onClick={() => updateFormSetting()}
          />
        )}
      </footer>
    </aside>
  );
};
