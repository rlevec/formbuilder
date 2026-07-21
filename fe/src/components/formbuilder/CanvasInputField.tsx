import type { CanvasFieldsValues } from "../../../types";
import type { CSSProperties } from "react";

import { useState } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string }) => void;
};

const buildWrapperStyles = (): CSSProperties => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const buildLabelStyles = (
  params: CanvasFieldsValues,
  focused: boolean
): CSSProperties => ({
  fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
  fontWeight:
    (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
  margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
  color: focused
    ? ((params?.focusedLabelColor as string) ?? "var(--primary)")
    : ((params?.labelTextColor as string) ?? "var(--text-secondary)"),
});

const buildFieldStyles = (
  params: CanvasFieldsValues,
  focused: boolean
): CSSProperties => ({
  outline: "none",
  backgroundColor:
    typeof params?.fieldBackgroundColor === "string"
      ? params.fieldBackgroundColor
      : "var(--surface)",

  border: focused
    ? typeof params?.fieldFocusedBorder === "string"
      ? params.fieldFocusedBorder
      : "1px solid var(--primary)"
    : typeof params?.fieldBorder === "string"
    ? params.fieldBorder
    : "1px solid var(--border)",

  borderRadius:
    typeof params?.fieldBorderRadius === "string"
      ? params.fieldBorderRadius
      : "var(--radius-md)",

  fontSize:
    typeof params?.fieldFontSize === "string"
      ? params.fieldFontSize
      : "var(--text-base)",

  fontWeight:
    typeof params?.fieldFontWeight === "string" ||
    typeof params?.fieldFontWeight === "number"
      ? params.fieldFontWeight
      : 400,

  height:
    typeof params?.fieldHeight === "string"
      ? params.fieldHeight
      : "var(--field-height)",

  padding:
    typeof params?.fieldPadding === "string"
      ? params.fieldPadding
      : "0 var(--space-3)",

  color:
    typeof params?.fieldTextColor === "string"
      ? params.fieldTextColor
      : "var(--text-primary)",
});

export default function CanvasInputField({
  params,
  id,
  onChange,
  value,
}: Props) {
  const [focused, setFocused] = useState(false);

  const wrapperStyles = buildWrapperStyles();
  const labelStyles = buildLabelStyles(params, focused);
  const fieldStyles = buildFieldStyles(params, focused);

  return (
    <div style={wrapperStyles}>
      {params?.label && <label style={labelStyles}>{params.label}</label>}
      <input
        name={id}
        value={value}
        style={fieldStyles}
        type={(params?.inputType as string) ?? "text"}
        placeholder={(params?.placeholder as string) ?? "Enter value..."}
        required={Boolean(params?.required)}
        minLength={
          typeof params?.minLength === "number"
            ? params.minLength
            : undefined
        }
        maxLength={
          typeof params?.maxLength === "number"
            ? params.maxLength
            : undefined
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) =>
          onChange({
            value: event.target.value,
          })
        }
      />
    </div>
  );
}