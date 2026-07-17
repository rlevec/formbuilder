import styles from "../../styles/formCanvasElement.module.css";

import type { CanvasFieldInstance, CanvasFieldValue } from "../../../types";

import CanvasInputField from "./CanvasInputField";
import CanvasTextareaField from "./CanvasTextareaField";
import CanvasSelectField from "./CanvasSelectField";
import CanvasRadioGroupField from "./CanvasRadioGroupField";
import CanvasCheckboxField from "./CanvasCheckboxField";
import CanvasCheckboxGroupField from "./CanvasCheckboxGroupField";
import CanvasSwitchField from "./CanvasSwitchComponent";
import CanvasRatingField from "./CanvasRatingField";
import CanvasFileUploadField from "./CanvasFileUpload";

interface Props {
  canvasFieldSelected: string | null;
  canvasEntry: CanvasFieldInstance;
  handleDragStart: (startId: string) => void;
  handleDrop: (dropId: string) => void;
  handleDragEnd: () => void;
  handleSelectCanvasField: (canvasEntry: CanvasFieldInstance) => void;
  updateCanvasFieldValue: (id: string, value: CanvasFieldValue) => void;
}

const FIELD_COMPONENTS: Record<string, React.ComponentType<any>> = {
  input: CanvasInputField,
  paragraph: CanvasTextareaField,
  dropdown: CanvasSelectField,
  radioGroup: CanvasRadioGroupField,
  checkbox: CanvasCheckboxField,
  checkboxGroup: CanvasCheckboxGroupField,
  toggle: CanvasSwitchField,
  rating: CanvasRatingField,
  fileUpload: CanvasFileUploadField
};

export default function FormCanvasElement({
  canvasEntry,
  canvasFieldSelected,
  handleDragStart,
  handleDrop,
  handleDragEnd,
  handleSelectCanvasField,
  updateCanvasFieldValue,
}: Props) {
  const { type = "", id = "", params = {} } = canvasEntry || {};

  const widthField = params.width;

  const widthValue = widthField ? widthField : "full";

  const fieldProps = {
    id,
    params,
    value: (canvasEntry.value as string) ?? "",
    onChange: ({ value }: { value: CanvasFieldValue }) =>
      updateCanvasFieldValue(canvasEntry.id, value),
  };

  const ActiveFieldComponent = FIELD_COMPONENTS[type];

  if (!ActiveFieldComponent) return null;

  return (
    <div
      className={`${styles.field} ${
        widthValue === "half" ? styles.half : styles.full
      } ${canvasEntry.id === canvasFieldSelected ? styles.selected : ""}`}
      draggable={true}
      onDragStart={() => handleDragStart(id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(id)}
      onDragEnd={() => handleDragEnd()}
      key={id}
      onClick={() => handleSelectCanvasField(canvasEntry)}
    >
      <ActiveFieldComponent {...fieldProps} />
    </div>
  );
}
