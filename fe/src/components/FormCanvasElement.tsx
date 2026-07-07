import { memo, useCallback, useMemo } from "react";

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

const FormCanvasElement = ({
  canvasEntry,
  canvasFieldSelected,
  handleDragStart,
  handleDrop,
  handleDragEnd,
  handleSelectCanvasField,
  updateCanvasFieldValue,
}: Props) => {
  const { fields = [], type = "", id = "" } = canvasEntry || {};

  const widthField = fields.find((field) => field.name === "width");

  const widthValue = widthField ? widthField.value : "full";

  console.log("canvasEtnry", canvasEntry);

  const getField = useCallback((name: string) => {
    return canvasEntry.fields.find((el) => el.name === name)?.value ?? null;
  }, [canvasEntry])

  const fieldStyles = useMemo(() => {
  return {
    backgroundColor: String(getField("fieldBackgroundColor")),
    textColor: getField("fieldTextColor"),
    fontWeight: getField("fieldFontWeight"),
    padding: getField("fieldPadding"),
    borderRadius: getField("fieldBorderRadius"),
    border: getField("fieldBorder"),
    labelMargin: getField("labelMargin"),
    labelTextColor: getField("labelTextColor"),
    labelFontWeight: getField("labelFontWeight"),
    fieldFontSize: getField("fieldFontSize"),
    labelFontSize: getField("labelFontSize"),
    focusedLabelColor: getField("focusedLabelColor"),
    focusedFieldBorderColor: getField("focusedFieldBorderColor")
  };
}, [getField]);

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
      {["shortText", "number", "email", "date", "phone"].includes(type) && (
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
            type:
              type === "shortText"
                ? "text"
                : type === "phone"
                  ? "tel"
                  : (type as HTMLInputType),
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
};

const MemoizedFormCanvasElement = memo(FormCanvasElement);

export default MemoizedFormCanvasElement;
