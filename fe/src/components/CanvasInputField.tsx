import type { CanvasFieldsValues } from "../../types";

import type { CSSProperties } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string }) => void;
};

export default function CanvasInputField({ params, id, onChange, value }: Props) {
  const wrapperStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const labelStyles: CSSProperties = {
    fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
    fontWeight:
      (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
    margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
    color: (params?.labelTextColor as string) ?? "var(--text-secondary)",
  };

  const fieldStyles: CSSProperties = {
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
  };

  return (
    <div style={wrapperStyles}>
      {params?.label && <label style={labelStyles}>{params.label}</label>}
      <input
        onChange={(event) => onChange({value: event?.target?.value})}
        value={value}
        style={fieldStyles}
        type={(params?.inputType as string) ?? "text"}
        placeholder={(params?.placeholder as string) ?? "Enter value..."}
        name={id}
      />
    </div>
  );
}
