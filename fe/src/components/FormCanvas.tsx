import { memo, useMemo } from "react";

import type { FormField } from "../../types";

import FormCanvasElement from "./FormCanvasElement";

type CanvasFieldInstance = {
  id: string;
  fields: FormField[];
  type: string;
  value: string | boolean | string[] | number;
};

interface Props {
  canvasFieldSelected: string | null;
  data: CanvasFieldInstance[];
  handleDragStart: (startId: string) => void;
  handleDrop: (dropId: string) => void;
  handleDragEnd: () => void;
  handleSelectCanvasField: (canvasEntry: CanvasFieldInstance) => void;
  updateCanvasFieldValue: (
    id: string,
    value: boolean | string | string[] | number,
  ) => void;
  selectedFormSettings: Record<string, string | boolean>;
}

export const FormCanvas = ({
  data,
  handleDragStart,
  handleDrop,
  handleDragEnd,
  handleSelectCanvasField,
  canvasFieldSelected,
  updateCanvasFieldValue,
  selectedFormSettings,
}: Props) => {
  console.log("selectedFormSettings", selectedFormSettings);

  const safeTextAlign = (value?: string): React.CSSProperties["textAlign"] => {
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

  const canvasStyles = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      backgroundColor: selectedFormSettings?.canvasBackgroundColor ? String(selectedFormSettings?.canvasBackgroundColor) : "var(--surface)",
      padding: String(selectedFormSettings?.canvasPadding),
      border: String(selectedFormSettings?.canvasBorder),
    }),
    [selectedFormSettings],
  );

  const gridStyles = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      rowGap: selectedFormSettings?.gridVerticalGap as string,
      columnGap: selectedFormSettings?.gridHorizontalGap as string,
    }),
    [selectedFormSettings],
  );

  const headerStyles = useMemo(
    () => ({
      margin: selectedFormSettings?.headerMargin as string,
      color: selectedFormSettings?.headerTextColor as string,
      fontSize: selectedFormSettings?.headerTextSize as string,
      fontWeight: selectedFormSettings?.headerTextWeight as string,
      textAlign: safeTextAlign(
        selectedFormSettings?.headerAlignment as React.CSSProperties["textAlign"],
      ),
    }),
    [selectedFormSettings],
  );

  const descriptionStyles = useMemo(
    () => ({
      margin: selectedFormSettings?.descriptionMargin as string,
      color: selectedFormSettings?.descriptionTextColor as string,
      fontSize: selectedFormSettings?.descriptionTextSize as string,
      fontWeight: selectedFormSettings?.descriptionTextWeight as string,
      textAlign: safeTextAlign(
        selectedFormSettings?.descriptionAlignmentStyle as React.CSSProperties["textAlign"],
      ),
    }),
    [selectedFormSettings],
  );

  const buttonStyles = useMemo(
    () => ({
      alignSelf: selectedFormSettings?.buttonAlignment as string,
      margin: selectedFormSettings?.buttonMargin as string,
      padding: selectedFormSettings?.buttonPadding as string,
      width: selectedFormSettings?.buttonWidth as string,
      backgroundColor: selectedFormSettings?.buttonBackgroundColor as string,
      color: selectedFormSettings?.buttonTextColor as string,
      border: selectedFormSettings?.buttonBorder as string,
      borderRadius: selectedFormSettings?.buttonBorderRadius as string,
    }),
    [selectedFormSettings],
  );

  const buttonContainerStyles = useMemo(
    () => ({
      display: "flex",
      justifyContent:
        selectedFormSettings?.buttonAlignment === "left"
          ? "flex-start"
          : selectedFormSettings?.buttonAlignment === "right"
          ? "flex-end"
          : "center",
    }),
    [selectedFormSettings],
  );

  if (!data) return null;

  return (
    <div style={canvasStyles}>
      {selectedFormSettings.formTitle && (
        <h1 style={headerStyles}>
          {selectedFormSettings?.formTitle as string}
        </h1>
      )}
      {selectedFormSettings.formDescription && (
        <p style={descriptionStyles}>
          {selectedFormSettings?.formDescription as string}
        </p>
      )}
      {data.length > 0 && (
        <div style={gridStyles}>
          {data.map((canvasEntry) => {
            return (
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
            );
          })}
        </div>
      )}
      {selectedFormSettings.formSubmitButtonText && (
        <div style={buttonContainerStyles}>
          <button style={buttonStyles}>
            {selectedFormSettings?.formSubmitButtonText as string}
          </button>
        </div>
      )}
    </div>
  );
};

const MemoizedFormCanvas = memo(FormCanvas);

export default MemoizedFormCanvas;
