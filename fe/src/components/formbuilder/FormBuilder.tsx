import styles from "../../styles/formBuilder.module.css";

import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import FormCanvas from "./FormCanvas";
import FormHeader from "./FormHeader";

import {
  type FormBuilder,
} from "../../../types";

interface Props {
  data: FormBuilder;
}

import useFromBuilder from "../../hooks/useFormBuilder";

export default function FormBuilder({ data }: Props) {

  const {
    activeSettings,
    formConfigQuery,
    fieldConfigQuery,
    selectedDefaultFieldConfig,
    fieldSettingsConfig,
    canvasFields,
    logout,
    handleFieldUpdate,
    inputFields, fieldTypes,
    handleTabChange,
    handleDragEnd,
    handleDragStart,
    handleDrop,
    handleSelectDefaultFieldConfig,
    formSettings,
    handleAddFieldToCanvas,
    handleUpdateFieldInCanvas,
    handleSelectCanvasField,
    canvasFieldSelected,
    updateCanvasFieldValue,
    updateFormSetting,
    selectedFormSettings,
    saveTemplate
  } = useFromBuilder(data)


  return (
    <main className={styles.layout}>
      <header className={styles.topbar}>
        <FormHeader logout={logout} saveTemplate={saveTemplate}/>
      </header>
      <aside className={styles.leftPanel}>
        <LeftPanel
          selectedDefaultFieldConfigId={
            selectedDefaultFieldConfig ? selectedDefaultFieldConfig.id : null
          }
          inputFields={inputFields}
          fieldTypes={fieldTypes}
          handleSelectDefaultFieldConfig={handleSelectDefaultFieldConfig}
        />
      </aside>
      <section className={styles.canvas}>
        <FormCanvas
          selectedFormSettings={selectedFormSettings}
          handleSelectCanvasField={handleSelectCanvasField}
          data={canvasFields}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          handleDragEnd={handleDragEnd}
          canvasFieldSelected={canvasFieldSelected}
          updateCanvasFieldValue={updateCanvasFieldValue}
        />
      </section>
      <aside className={styles.rightPanel}>
        <RightPanel
          canvasFieldSelected={canvasFieldSelected}
          fieldSettingsConfig={fieldSettingsConfig}
          handleTabChange={handleTabChange}
          formConfigQuery={formConfigQuery}
          fieldConfigQuery={fieldConfigQuery}
          handleFieldUpdate={handleFieldUpdate}
          formFields={formSettings}
          activeSettings={activeSettings}
          handleAddFieldToCanvas={handleAddFieldToCanvas}
          handleUpdateFieldInCanvas={handleUpdateFieldInCanvas}
          updateFormSetting={updateFormSetting}

        />
      </aside>
    </main>
  );
}
