import styles from "../styles/formCanvasElement.module.css";

import type { CanvasFieldInstance, CanvasFieldValue } from "../../types";

import CanvasInputField from "./CanvasInputField";
import CanvasTextareaField from "./CanvasTextareaField";
import CanvasSelectField from "./CanvasSelectField";
import CanvasRadioGroupField from "./CanvasRadioGroupField";

interface Props {
  canvasFieldSelected: string | null;
  canvasEntry: CanvasFieldInstance;
  handleDragStart: (startId: string) => void;
  handleDrop: (dropId: string) => void;
  handleDragEnd: () => void;
  handleSelectCanvasField: (canvasEntry: CanvasFieldInstance) => void;
  updateCanvasFieldValue: (id: string, value: CanvasFieldValue) => void;
}

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
      {type === "input" && (
        <CanvasInputField
          id={id}
          params={params}
          value={(canvasEntry.value as string) ?? ""}
          onChange={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "paragraph" && (
        <CanvasTextareaField
          id={id}
          params={params}
          value={(canvasEntry.value as string) ?? ""}
          onChange={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "dropdown" && (
        <CanvasSelectField
          id={id}
          params={params}
          value={(canvasEntry.value as string) ?? ""}
          onChange={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "radioGroup" && (
        <CanvasRadioGroupField
          id={id}
          params={params}
          value={(canvasEntry.value as string) ?? ""}
          onChange={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
    </div>
  );
}
