import FormCanvasElement from "./FormCanvasElement";

import { getStringSetting } from "../lib/utils";

import type { CanvasFieldInstance, CanvasFieldValue } from "../../types";

interface Props {
  canvasFieldSelected: string | null;
  data: CanvasFieldInstance[];
  handleDragStart: (startId: string) => void;
  handleDrop: (dropId: string) => void;
  handleDragEnd: () => void;
  handleSelectCanvasField: (
    canvasEntry: CanvasFieldInstance
  ) => void;
  updateCanvasFieldValue: (
    id: string,
    value: CanvasFieldValue,
  ) => void;
  selectedFormSettings: Record<string, string | boolean>;
}
export default function FormCanvas({
  data,
  handleDragStart,
  handleDrop,
  handleDragEnd,
  handleSelectCanvasField,
  canvasFieldSelected,
  updateCanvasFieldValue,
  selectedFormSettings,
}: Props) {
 
  const safeTextAlign = (
    value?: string,
  ): React.CSSProperties["textAlign"] => {
    if (
      value === "left" ||
      value === "right" ||
      value === "center" ||
      value === "start" ||
      value === "end"
    ) {
      return value;
    }

    return "center";
  };
const canvasStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: getStringSetting({
    key: "canvasBackgroundColor",
    fallback: "var(--surface)",
    settings: selectedFormSettings,
  }),
  padding: getStringSetting({
    key: "canvasPadding",
    fallback: "var(--space-2)",
    settings: selectedFormSettings,
  }),
  border: getStringSetting({
    key: "canvasBorder",
    fallback: "1px solid var(--border)",
    settings: selectedFormSettings,
  }),
};

const gridStyles: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: getStringSetting({
    key: "gridVerticalGap",
    fallback: "var(--space-4)",
    settings: selectedFormSettings,
  }),
  columnGap: getStringSetting({
    key: "gridHorizontalGap",
    fallback: "var(--space-4)",
    settings: selectedFormSettings,
  }),
};

const headerStyles: React.CSSProperties = {
  margin: getStringSetting({
    key: "headerMargin",
    fallback: "0 0 var(--space-6) 0",
    settings: selectedFormSettings,
  }),
  color: getStringSetting({
    key: "headerTextColor",
    fallback: "var(--text-primary)",
    settings: selectedFormSettings,
  }),
  fontSize: getStringSetting({
    key: "headerTextSize",
    fallback: "var(--text-3xl)",
    settings: selectedFormSettings,
  }),
  fontWeight: getStringSetting({
    key: "headerTextWeight",
    fallback: "800",
    settings: selectedFormSettings,
  }),
  textAlign: safeTextAlign(
    getStringSetting({
      key: "headerAlignment",
      fallback: "center",
      settings: selectedFormSettings,
    }),
  ),
};

const descriptionStyles: React.CSSProperties = {
  margin: getStringSetting({
    key: "descriptionMargin",
    fallback: "0 var(--space-6) 0 0",
    settings: selectedFormSettings,
  }),
  color: getStringSetting({
    key: "descriptionTextColor",
    fallback: "var(--text-primary)",
    settings: selectedFormSettings,
  }),
  fontSize: getStringSetting({
    key: "descriptionTextSize",
    fallback: "var(--text-base)",
    settings: selectedFormSettings,
  }),
  fontWeight: getStringSetting({
    key: "descriptionTextWeight",
    fallback: "400",
    settings: selectedFormSettings,
  }),
  textAlign: safeTextAlign(
    getStringSetting({
      key: "descriptionAlignmentStyle",
      fallback: "center",
      settings: selectedFormSettings,
    }),
  ),
};

const buttonStyles: React.CSSProperties = {
  alignSelf: getStringSetting({
    key: "buttonAlignment",
    fallback: "center",
    settings: selectedFormSettings,
  }),
  margin: getStringSetting({
    key: "buttonMargin",
    fallback: "var(--space-6) 0 0 0",
    settings: selectedFormSettings,
  }),
  padding: getStringSetting({
    key: "buttonPadding",
    fallback: "var(--space-3) var(--space-4)",
    settings: selectedFormSettings,
  }),
  width: getStringSetting({
    key: "buttonWidth",
    fallback: "125px",
    settings: selectedFormSettings,
  }),
  backgroundColor: getStringSetting({
    key: "buttonBackgroundColor",
    fallback: "var(--primary)",
    settings: selectedFormSettings,
  }),
  color: getStringSetting({
    key: "buttonTextColor",
    fallback: "var(--surface)",
    settings: selectedFormSettings,
  }),
  border: getStringSetting({
    key: "buttonBorder",
    fallback: "1px solid var(--primary)",
    settings: selectedFormSettings,
  }),
  borderRadius: getStringSetting({
    key: "buttonBorderRadius",
    fallback: "var(--radius-md)",
    settings: selectedFormSettings,
  }),
  cursor: "pointer",
};

const buttonAlignment = getStringSetting({
  key: "buttonAlignment",
  fallback: "center",
  settings: selectedFormSettings,
});

const buttonContainerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent:
    buttonAlignment === "left"
      ? "flex-start"
      : buttonAlignment === "right"
      ? "flex-end"
      : "center",
};  

  if (!data) return null;

  return (
    <div style={canvasStyles}>
      <h1 style={headerStyles}>
        {getStringSetting({key: "formTitle", fallback: "Form", settings: selectedFormSettings})}
      </h1>
        <p style={descriptionStyles}>
          {getStringSetting({key: "formDescription", fallback: "Description", settings: selectedFormSettings})}
        </p>

      {data.length > 0 && (
        <div style={gridStyles}>
          {data.map((canvasEntry) => (
            <FormCanvasElement
              key={canvasEntry.id}
              canvasEntry={canvasEntry}
              canvasFieldSelected={canvasFieldSelected}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragEnd={handleDragEnd}
              handleSelectCanvasField={handleSelectCanvasField}
              updateCanvasFieldValue={updateCanvasFieldValue}
            />
          ))}
        </div>
      )}

      <div style={buttonContainerStyles}>
        <button style={buttonStyles}>
          {getStringSetting({
            key: "formSubmitButtonText",
            fallback: "Submit",
            settings: selectedFormSettings
          })}
        </button>
      </div>
    </div>
  );
}