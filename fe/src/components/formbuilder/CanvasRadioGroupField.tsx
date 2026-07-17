import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

import { Fragment } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string }) => void;
};

export default function CanvasRadioGroupField({
  params,
  onChange,
  value,
}: Props) {
  const wrapperStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    border: "none"
  };

  const optionsStyles: CSSProperties = {
    padding:
      typeof params?.fieldPadding === "string"
        ? params.fieldPadding
        : "var(--space-3)",
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
    flexWrap: "wrap",
    gap: "var(--space-2)",
    alignItems: "center",
    display: "flex",
  };

  const labelStyles: CSSProperties = {
    fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
    fontWeight:
      (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
    margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
    color: (params?.labelTextColor as string) ?? "var(--text-secondary)",
  };

  const optionInputStyles: CSSProperties = {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
  };

  const optionLabelStyles: CSSProperties = {
    backgroundColor:
      typeof params?.optionBackgroundColor === "string"
        ? params.optionBackgroundColor
        : "var(--surface)",
    color:
      typeof params?.optionTextColor === "string"
        ? params.optionTextColor
        : "var(--text-primary)",

    border:
      typeof params?.optionBorder === "string"
        ? params.optionBorder
        : "1px solid var(--border)",

    borderRadius:
      typeof params?.optionBorderRadius === "string"
        ? params.optionBorderRadius
        : "var(--radius-md)",

    padding:
      typeof params?.optionPadding === "string"
        ? params.optionPadding
        : "var(--space-2) var(--space-3)",

    fontSize:
      typeof params?.optionFontSize === "string"
        ? params.optionFontSize
        : "var(--text-xs)",

    fontWeight:
      typeof params?.optionFontWeight === "string" ||
      typeof params?.optionFontWeight === "number"
        ? params.optionFontWeight
        : 400,
    cursor: "pointer",
  };

  const getOptionStyles = (option: string): CSSProperties => {
    const selected = option === value;

    return {
      backgroundColor: selected
        ? typeof params?.selectedOptionBackgroundColor === "string"
          ? params.selectedOptionBackgroundColor
          : "var(--surface-muted)"
        : typeof params?.optionBackgroundColor === "string"
          ? params.optionBackgroundColor
          : "var(--surface)",

      border: selected
        ? typeof params?.selectedOptionBorder === "string"
          ? params.selectedOptionBorder
          : "1px solid var(--primary)"
        : typeof params?.optionBorder === "string"
          ? params.optionBorder
          : "1px solid var(--border)",

      opacity: selected ? 1 : 0.5,
    };
  };

  return (
    <fieldset style={wrapperStyles}>
      {params.label && <label style={labelStyles}>{params.label}</label>}
      {Array.isArray(params?.options) && params?.options?.length > 0 && (
        <div style={optionsStyles}>
          {params?.options?.map?.((option) => {
            return (
              <Fragment key={option}>
                <input
                  style={optionInputStyles}
                  type="radio"
                  id={option}
                  name={option}
                  checked={option === value}
                  onChange={() => onChange({ value: option })}
                />
                <label
                  style={{
                    ...optionLabelStyles,
                    ...getOptionStyles(option),
                  }}
                  htmlFor={option}
                >
                  {option}
                </label>
              </Fragment>
            );
          })}
        </div>
      )}
    </fieldset>
  );
}
