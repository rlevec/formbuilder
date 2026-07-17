import type { CSSProperties } from "react";
import type { CanvasFieldsValues } from "../../../types";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string[];
  onChange: ({ value }: { value: string[] }) => void;
};

export default function CanvasCheckboxGroupField({
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

  const containerStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
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
    minHeight:
      typeof params?.containerHeight === "string"
        ? params.containerHeight
        : "var(--field-height)",
  };

  const labelStyles: CSSProperties = {
    fontSize:
      typeof params?.labelFontSize === "string"
        ? params.labelFontSize
        : "var(--text-sm)",
    fontWeight:
      typeof params?.labelFontWeight === "string" ||
      typeof params?.labelFontWeight === "number"
        ? params.labelFontWeight
        : "var(--font-weight-normal)",
    margin:
      typeof params?.labelMargin === "string"
        ? params.labelMargin
        : "0 0 var(--space-2) 0",
    color:
      typeof params?.labelTextColor === "string"
        ? params.labelTextColor
        : "var(--text-secondary)",
  };

  const labelContainerStyles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent:
      typeof params?.checkboxContentAlingment === "string"
        ? params.checkboxContentAlingment
        : "flex-start",
    width: "100%",
    padding:
      typeof params?.containerPadding === "string"
        ? params.containerPadding
        : "var(--space-3)",
    cursor: "pointer",
    userSelect: "none",
  };

  const optionLabelStyles: CSSProperties = {
    fontSize:
      typeof params?.checkboxOptionLabelFontSize === "string"
        ? params.checkboxOptionLabelFontSize
        : "var(--text-sm)",

    fontWeight:
      typeof params?.checkboxOptionLabelFontWeight === "string" ||
      typeof params?.checkboxOptionLabelFontWeight === "number"
        ? params.checkboxOptionLabelFontWeight
        : "var(--font-weight-medium)",

    margin:
      typeof params?.checkboxOptionLabelMargin === "string"
        ? params.checkboxOptionLabelMargin
        : "0 0 0 var(--space-2)",

    color:
      typeof params?.checkboxOptionLabelTextColor === "string"
        ? params.checkboxOptionLabelTextColor
        : "var(--text-secondary)",
  };

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

    height:
      typeof params?.fieldHeight === "string"
        ? params.fieldHeight
        : "20px",

    width:
      typeof params?.fieldHeight === "string"
        ? params.fieldHeight
        : "20px",

    cursor: "pointer",
  };

  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange({ value: [...value, option] });
    } else {
      onChange({
        value: value.filter((v) => v !== option),
      });
    }
  };

  return (
    <div style={wrapperStyles}>
      {params?.label && <label style={labelStyles}>{params.label}</label>}

      <div style={containerStyles}>
        {Array.isArray(params.options) &&
          params.options.map((option, index) => {
            const inputId = `${id}-${index}`;
            const checked = value.includes(String(option));

            return (
              <label
                key={String(option)}
                htmlFor={inputId}
                style={labelContainerStyles}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  style={{
                    ...fieldStyles,
                    outline: checked
                      ? "1px solid var(--text-primary)"
                      : undefined,
                  }}
                  onChange={(e) =>
                    handleChange(String(option), e.target.checked)
                  }
                />
                  <span style={optionLabelStyles}>{option}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}