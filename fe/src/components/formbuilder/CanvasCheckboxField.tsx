import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string | boolean }) => void;
};

export default function CanvasCheckboxField({
  params,
  onChange,
  value,
  id,
}: Props) {
  const wrapperStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const containerStyles = {
    backgroundColor:
      typeof params?.containerBackgroundColor === "string"
        ? params.containerBackgroundColor
        : "var(--surface)",
    border:
      typeof params?.containerBorder === "string"
        ? params.containerBorder
        : "1px solid var(--border)",
    borderRadius:
      typeof params?.containerBorderRadius === "string"
        ? params.containerBorderRadius
        : "var(--radius-md)",
    height:
      typeof params?.containerHeight === "string"
        ? params.containerHeight
        : "var(--field-height)",
  };

  const labelStyles: CSSProperties = {
    fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
    fontWeight:
      (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
    margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
    color: (params?.labelTextColor as string) ?? "var(--text-secondary)",
  };

  const labelContainerStyles: CSSProperties = {
    display: "flex",
    justifyContent: typeof params?.checkboxContentAlingment === "string"
        ? params.checkboxContentAlingment
        : "start",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding:
      typeof params?.containerPadding === "string"
        ? params.containerPadding
        : "0 var(--space-3)",
    cursor: "pointer",
    userSelect: "none",
  };

  const optionLabelStyles: CSSProperties = {
    fontSize:
      typeof params?.checkboxOptionLabelFontSize === "string"
        ? params.checkboxOptionLabelFontSize
        : "var(--text-sm)",

    fontWeight:
      typeof params?.checkboxOptionLabelFontWeight === "string"
        ? params.checkboxOptionLabelFontWeight
        : "var(--font-weight-medium)",

    margin:
      typeof params?.checkboxOptionLabelMargin === "string"
        ? params.checkboxOptionLabelMargin
        : "0 0 0 var(--space-2)",

    color:
      params?.checkboxOptionLabelMargin === "string"
        ? params.checkboxOptionLabelMargin
        : "var(--text-secondary)",
  };


  //padding should be removed from config
  //color should be removed from config
 //font-size should be removed from config
  const fieldStyles: CSSProperties = {
    accentColor:
      typeof params?.fieldBackgroundColor === "string"
        ? params.fieldBackgroundColor
        : "var(--surface-muted)",

    border:
      typeof params?.fieldBorder === "string"
        ? params.fieldBorder
        : "1px solid var(--text-primary)",

    borderRadius:
      typeof params?.fieldBorderRadius === "string"
        ? params.fieldBorderRadius
        : "var(--radius-md)",
    fontWeight:
      typeof params?.fieldFontWeight === "string" ||
      typeof params?.fieldFontWeight === "number"
        ? params.fieldFontWeight
        : 400,

    height:
      typeof params?.fieldHeight === "string"
        ? params.fieldHeight
        : "25px",
    aspectRatio: 1,
    cursor: "pointer",

  };

  return (
    <div style={wrapperStyles}>
      {params?.label && <label style={labelStyles}>{params.label}</label>}
      <div style={containerStyles}>
        <label htmlFor={id} style={labelContainerStyles}>
          <input
            style={{...fieldStyles, outline: value ? "1px solid var(--text-primary)" : "none"}}
            id={id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onChange({ value: event?.target?.checked })}
          />
          {params.checkboxOptionLabel && (
            <span style={optionLabelStyles}>{params.checkboxOptionLabel}</span>
          )}
        </label>
      </div>
    </div>
  );
}
