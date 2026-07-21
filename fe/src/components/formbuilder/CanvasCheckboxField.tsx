import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

import { useState } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string | boolean }) => void;
};

const buildWrapperStyles = (): CSSProperties => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const buildContainerStyles = (
  params: CanvasFieldsValues,
  active: boolean
): CSSProperties => ({
  backgroundColor:
    typeof params?.containerBackgroundColor === "string"
      ? params.containerBackgroundColor
      : "var(--surface)",

  border: active
    ? typeof params?.containerFocusedBorder === "string"
      ? params.containerFocusedBorder
      : "1px solid var(--primary)"
    : typeof params?.containerBorder === "string"
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
});

const buildLabelStyles = (
  params: CanvasFieldsValues,
  active: boolean
): CSSProperties => ({
  fontSize:
    (params?.labelFontSize as string) ??
    "var(--text-sm)",

  fontWeight:
    (params?.labelFontWeight as string) ??
    "var(--font-weight-normal)",

  margin:
    (params?.labelMargin as string) ??
    "0 0 var(--space-2) 0",

  color: active
    ? ((params?.focusedLabelColor as string) ??
      "var(--primary)")
    : ((params?.labelTextColor as string) ??
      "var(--text-secondary)"),
});

const buildLabelContainerStyles = (
  params: CanvasFieldsValues
): CSSProperties => ({
  display: "flex",

  justifyContent:
    typeof params?.checkboxContentAlignment === "string"
      ? params.checkboxContentAlignment
      : "flex-start",

  alignItems: "center",

  height: "100%",

  width: "100%",

  padding:
    typeof params?.containerPadding === "string"
      ? params.containerPadding
      : "0 var(--space-3)",

  cursor: "pointer",

  userSelect: "none",
});

const buildOptionLabelStyles = (
  params: CanvasFieldsValues,
  active: boolean
): CSSProperties => ({
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

  color: active
    ? ((params?.checkboxOptionLabelFocusedColor as string) ??
      "var(--primary)")
    : ((params?.checkboxOptionLabelColor as string) ??
      "var(--text-secondary)"),
});

const buildFieldStyles = (
  params: CanvasFieldsValues
): CSSProperties => ({
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
});

export default function CanvasCheckboxField({
  params,
  onChange,
  value,
  id,
}: Props) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const active = focused || hovered;

  const wrapperStyles = buildWrapperStyles();

  const containerStyles = buildContainerStyles(
    params,
    active
  );

  const labelStyles = buildLabelStyles(
    params,
    active
  );

  const labelContainerStyles =
    buildLabelContainerStyles(params);

  const optionLabelStyles =
    buildOptionLabelStyles(
      params,
      active
    );

  const fieldStyles =
    buildFieldStyles(params);


  return (
    <div style={wrapperStyles}>
      {params?.label && (
        <label style={labelStyles}>
          {params.label}
        </label>
      )}

      <div
        style={containerStyles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <label
          htmlFor={id}
          style={labelContainerStyles}
        >
          <input
            style={{
              ...fieldStyles,
              outline: active
                ? "1px solid var(--primary)"
                : "none",
            }}

            id={id}

            type="checkbox"

            checked={Boolean(value)}

            onFocus={() =>
              setFocused(true)
            }

            onBlur={() =>
              setFocused(false)
            }

            onChange={(event) =>
              onChange({
                value: event.target.checked,
              })
            }
          />

          {params?.checkboxOptionLabel && (
            <span style={optionLabelStyles}>
              {params.checkboxOptionLabel}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}