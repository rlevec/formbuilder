import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

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

const buildLabelStyles = (params: CanvasFieldsValues): CSSProperties => ({
  fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
  fontWeight:
    (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
  margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
  color: (params?.labelTextColor as string) ?? "var(--text-secondary)",
});

const buildFieldStyles = (params: CanvasFieldsValues): CSSProperties => ({
  backgroundColor:
    typeof params?.fieldBackgroundColor === "string"
      ? params.fieldBackgroundColor
      : "var(--surface)",
  border:
    typeof params?.fieldBorder === "string"
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
  resize: "vertical",
  minHeight: "200px",
  maxHeight: "400px",
});

export default function CanvasTextareaField({ params, id, onChange, value }: Props) {
  const wrapperStyles = buildWrapperStyles();
  const labelStyles = buildLabelStyles(params);
  const fieldStyles = buildFieldStyles(params);

  return (
    <div style={wrapperStyles}>
      {params?.label && <label style={labelStyles}>{params.label}</label>}
      <textarea
        onChange={(event) => onChange({ value: event?.target?.value })}
        value={value}
        style={fieldStyles}
        placeholder={(params?.placeholder as string) ?? "Enter value..."}
        name={id}
      />
    </div>
  );
}
