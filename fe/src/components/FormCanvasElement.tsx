import styles from "../styles/formCanvasElement.module.css";

import type { FormField, HTMLInputType } from "../../types";

import SwitchField from "./SwitchField";
import TextField from "./TextField";
import TextareaField from "./TextareaField";
import SelectField from "./SelectField";
import CheckboxGroupField from "./CheckboxGroupField";
import CheckboxField from "./CheckboxField";
import RatingField from "./RatingField";
import RadioGroupField from "./RadioGroupField";
import ImageUploadField from "./ImageUploadField";
import FileUploadField from "./FileUploadField";

type CanvasFieldInstance = {
  id: string;
  fields: FormField[];
  type: string;
  value: string | boolean | string[] | number;
};

interface CanvasFieldStyles {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: string | number;
  padding?: string;
  borderRadius?: string;
  border?: string;
  labelMargin?: string;
  labelTextColor?: string;
  labelFontWeight?: string | number;
  fieldFontSize?: string;
  labelFontSize?: string;
  focusedLabelColor?: string;
  focusedFieldBorderColor?: string;
}

interface Props {
  canvasFieldSelected: string | null;
  canvasEntry: CanvasFieldInstance;
  handleDragStart: (startId: string) => void;
  handleDrop: (dropId: string) => void;
  handleDragEnd: () => void;
  handleSelectCanvasField: (canvasEntry: CanvasFieldInstance) => void;
  updateCanvasFieldValue: (
    id: string,
    value: boolean | string | string[] | number,
  ) => void;
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
  const { fields = [], type = "", id = "" } = canvasEntry || {};

  const widthField = fields.find((field) => field.name === "width");

  const widthValue = widthField ? widthField.value : "full";

  console.log("canvasEtnry", canvasEntry);

  const getString = (name: string): string | undefined => {
    const value = canvasEntry.fields.find((el) => el.name === name)?.value;
    return typeof value === "string" ? value : undefined;
  };

  const getStringOrNumber = (name: string): string | number | undefined => {
    const value = canvasEntry.fields.find((el) => el.name === name)?.value;

    return typeof value === "string" || typeof value === "number"
      ? value
      : undefined;
  };

  const fieldStyles: CanvasFieldStyles = {
    backgroundColor: getString("fieldBackgroundColor"),
    textColor: getString("fieldTextColor"),
    fontWeight: getStringOrNumber("fieldFontWeight"),
    padding: getString("fieldPadding"),
    borderRadius: getString("fieldBorderRadius"),
    border: getString("fieldBorder"),
    labelMargin: getString("labelMargin"),
    labelTextColor: getString("labelTextColor"),
    labelFontWeight: getStringOrNumber("labelFontWeight"),
    fieldFontSize: getString("fieldFontSize"),
    labelFontSize: getString("labelFontSize"),
    focusedLabelColor: getString("focusedLabelColor"),
    focusedFieldBorderColor: getString("focusedFieldBorderColor"),
  };

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
      {type === "toggle" && (
        <SwitchField
          value={Boolean(canvasEntry.value)}
          onToggle={() =>
            updateCanvasFieldValue(canvasEntry.id, !canvasEntry.value)
          }
          field={{
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
        />
      )}
      {type === "input" && (
        <TextField
          isCanvas={true}
          value={(canvasEntry.value as string) ?? ""}
          canvasStyles={fieldStyles}
          field={{
            step:
              (canvasEntry.fields.find((el) => el.name === "step")?.value as
                | string
                | number) ?? undefined,
            min:
              (canvasEntry.fields.find((el) =>
                ["minValue", "minDate"].includes(el.name as string),
              ) as string | number) || "",
            max:
              (canvasEntry.fields.find((el) =>
                ["maxValue", "maxDate"].includes(el.name as string),
              )?.value as string | number) || "",

            type: String(
              canvasEntry.fields.find((el) => el.name === "inputType")?.value ?? "",
            ) as HTMLInputType ,
            placeholder: String(
              canvasEntry.fields.find((el) => el.name === "placeholder")
                ?.value ?? "",
            ),
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
          onChange={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "paragraph" && (
        <TextareaField
          value={(canvasEntry.value as string) ?? ""}
          field={{
            placeholder: String(
              canvasEntry.fields.find((el) => el.name === "placeholder")
                ?.value ?? "",
            ),
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
          onChange={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "dropdown" && (
        <SelectField
          field={{
            placeholder: String(
              canvasEntry.fields.find((el) => el.name === "placeholder")
                ?.value ?? "",
            ),
            options:
              (canvasEntry.fields.find((el) => el.name === "dropdownOptions")
                ?.value as string[]) ?? [],
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
          value={typeof canvasEntry.value === "string" ? canvasEntry.value : ""}
          onSelect={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "checkbox" && (
        <CheckboxField
          value={Boolean(canvasEntry.value)}
          onChange={() =>
            updateCanvasFieldValue(canvasEntry.id, !canvasEntry.value)
          }
          field={{
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
        />
      )}
      {type === "checkboxGroup" && (
        <CheckboxGroupField
          field={{
            placeholder: String(
              canvasEntry.fields.find((el) => el.name === "placeholder")
                ?.value ?? "",
            ),
            options:
              (canvasEntry.fields.find((el) => el.name === "dropdownOptions")
                ?.value as string[]) ?? [],
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
          value={canvasEntry.value as string[]}
          onSelect={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "rating" && (
        <RatingField
          field={{
            placeholder: String(
              canvasEntry.fields.find((el) => el.name === "placeholder")
                ?.value ?? "",
            ),
            maxRating: String(
              canvasEntry.fields.find((el) => el.name === "maxRating")?.value ??
                "",
            ),
            step: String(
              canvasEntry.fields.find((el) => el.name === "step")?.value ?? "",
            ),
            ratingStyle:
              (canvasEntry.fields.find((el) => el.name === "ratingStyle")
                ?.value as string) ?? "stars",
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
          value={typeof canvasEntry.value === "string" ? canvasEntry.value : ""}
          onSelect={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "radioGroup" && (
        <RadioGroupField
          field={{
            placeholder: String(
              canvasEntry.fields.find((el) => el.name === "placeholder")
                ?.value ?? "",
            ),
            options:
              (canvasEntry.fields.find((el) => el.name === "dropdownOptions")
                ?.value as string[]) ?? [],
            label: String(
              canvasEntry.fields.find((el) => el.name === "label")?.value ?? "",
            ),
          }}
          value={typeof canvasEntry.value === "string" ? canvasEntry.value : ""}
          onSelect={({ value }) =>
            updateCanvasFieldValue(canvasEntry.id, value)
          }
        />
      )}
      {type === "imageUpload" && <ImageUploadField />}
      {type === "fileUpload" && <FileUploadField />}
    </div>
  );
}
