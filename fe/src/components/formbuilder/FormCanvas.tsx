import FormCanvasElement from "./FormCanvasElement";

import type { CanvasFieldInstance, CanvasFieldValue } from "../../../types";

import styles from "../../styles/canvas.module.css"

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

 const getStringSetting = ({
    key,
    fallback,
    settings
  }: {key: string, fallback: string, settings: Record<string, string | boolean>}): string => {
    const value = settings?.[key];

    return typeof value === "string" ? value : fallback;
  };


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

const buildCanvasStyles = (
  settings: Record<string, string | boolean>,
): React.CSSProperties => ({
  width: "100%",
  height: "100%",
  backgroundColor: getStringSetting({
    key: "canvasBackgroundColor",
    fallback: "var(--surface)",
    settings,
  }),
  padding: getStringSetting({
    key: "canvasPadding",
    fallback: "var(--space-2)",
    settings,
  }),
  border: getStringSetting({
    key: "canvasBorder",
    fallback: "1px solid var(--border)",
    settings,
  }),
  overflow: "auto"
});

const buildGridStyles = (
  settings: Record<string, string | boolean>,
): React.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  rowGap: getStringSetting({
    key: "gridVerticalGap",
    fallback: "var(--space-4)",
    settings,
  }),
  columnGap: getStringSetting({
    key: "gridHorizontalGap",
    fallback: "var(--space-4)",
    settings,
  }),
});

const buildHeaderStyles = (
  settings: Record<string, string | boolean>,
): React.CSSProperties => ({
  margin: getStringSetting({
    key: "headerMargin",
    fallback: "0 0 var(--space-6) 0",
    settings,
  }),
  color: getStringSetting({
    key: "headerTextColor",
    fallback: "var(--text-primary)",
    settings,
  }),
  fontSize: getStringSetting({
    key: "headerTextSize",
    fallback: "var(--text-3xl)",
    settings,
  }),
  fontWeight: getStringSetting({
    key: "headerTextWeight",
    fallback: "800",
    settings,
  }),
  textAlign: safeTextAlign(
    getStringSetting({
      key: "headerAlignment",
      fallback: "center",
      settings,
    }),
  ),
});

const buildDescriptionStyles = (
  settings: Record<string, string | boolean>,
): React.CSSProperties => ({
  margin: getStringSetting({
    key: "descriptionMargin",
    fallback: "0 0 var(--space-6) 0",
    settings,
  }),
  color: getStringSetting({
    key: "descriptionTextColor",
    fallback: "var(--text-primary)",
    settings,
  }),
  fontSize: getStringSetting({
    key: "descriptionTextSize",
    fallback: "var(--text-base)",
    settings,
  }),
  fontWeight: getStringSetting({
    key: "descriptionTextWeight",
    fallback: "400",
    settings,
  }),
  textAlign: safeTextAlign(
    getStringSetting({
      key: "descriptionAlignmentStyle",
      fallback: "center",
      settings,
    }),
  ),
});

const buildButtonStyles = (
  settings: Record<string, string | boolean>,
): React.CSSProperties => ({
  alignSelf: getStringSetting({
    key: "buttonAlignment",
    fallback: "center",
    settings,
  }),
  margin: getStringSetting({
    key: "buttonMargin",
    fallback: "var(--space-6) 0 0 0",
    settings,
  }),
  padding: getStringSetting({
    key: "buttonPadding",
    fallback: "var(--space-3) var(--space-4)",
    settings,
  }),
  width: getStringSetting({
    key: "buttonWidth",
    fallback: "125px",
    settings,
  }),
  backgroundColor: getStringSetting({
    key: "buttonBackgroundColor",
    fallback: "var(--primary)",
    settings,
  }),
  color: getStringSetting({
    key: "buttonTextColor",
    fallback: "var(--surface)",
    settings,
  }),
  border: getStringSetting({
    key: "buttonBorder",
    fallback: "1px solid var(--primary)",
    settings,
  }),
  borderRadius: getStringSetting({
    key: "buttonBorderRadius",
    fallback: "var(--radius-md)",
    settings,
  }),
  cursor: "pointer",
});

const buildButtonContainerStyles = (
  settings: Record<string, string | boolean>,
): React.CSSProperties => {
  const alignment = getStringSetting({
    key: "buttonAlignment",
    fallback: "center",
    settings,
  });

  return {
    display: "flex",
    justifyContent:
      alignment === "left"
        ? "flex-start"
        : alignment === "right"
        ? "flex-end"
        : "center",
  };
};

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
  const canvasStyles = buildCanvasStyles(selectedFormSettings);
  const gridStyles = buildGridStyles(selectedFormSettings);
  const headerStyles = buildHeaderStyles(selectedFormSettings);
  const descriptionStyles = buildDescriptionStyles(selectedFormSettings);
  const buttonStyles = buildButtonStyles(selectedFormSettings);
  const buttonContainerStyles = buildButtonContainerStyles(
    selectedFormSettings,
  );

  const formTitle = getStringSetting({
    key: "formTitle",
    fallback: "Form",
    settings: selectedFormSettings,
  });

  const formDescription = getStringSetting({
    key: "formDescription",
    fallback: "Description",
    settings: selectedFormSettings,
  });

  const submitText = getStringSetting({
    key: "formSubmitButtonText",
    fallback: "Submit",
    settings: selectedFormSettings,
  });

  if (!data) return null;

  return (
    <div style={canvasStyles} className={styles.canvas}>
      <h1 style={headerStyles}>{formTitle}</h1>
      <p style={descriptionStyles}>{formDescription}</p>

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
        <button style={buttonStyles}>{submitText}</button>
      </div>
    </div>
  );
}

