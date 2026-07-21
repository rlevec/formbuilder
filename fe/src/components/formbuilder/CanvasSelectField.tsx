import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

import { ChevronDown } from "lucide-react";

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

const buildFieldStyles = (
  params: CanvasFieldsValues,
  hasValue: boolean,
  open: boolean
): CSSProperties => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  outline: "none",

  backgroundColor:
    typeof params?.fieldBackgroundColor === "string"
      ? params.fieldBackgroundColor
      : "var(--surface)",

  border: open
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

  opacity: hasValue ? 1 : 0.6,
});

const buildDropdownContainerStyles = (
  params: CanvasFieldsValues
): CSSProperties => ({
  listStyle: "none",
  margin: 0,
  padding: 0,

  border:
    typeof params?.dropdownContainerBorder === "string"
      ? params.dropdownContainerBorder
      : "1px solid var(--border)",

  borderRadius:
    typeof params?.dropdownContainerBorderRadius === "string"
      ? params.dropdownContainerBorderRadius
      : "var(--radius-md)",

  overflow: "hidden",
});

const buildDropdownOptionStyles = (
  params: CanvasFieldsValues,
  hovered: boolean,
  selected: boolean
): CSSProperties => ({
  width: "100%",
  border: "none",
  cursor: "pointer",

  backgroundColor: selected
    ? typeof params?.dropdownFieldSelectedBackgroundColor === "string"
      ? params.dropdownFieldSelectedBackgroundColor
      : "var(--primary-light)"
    : hovered
    ? typeof params?.dropdownFieldHoveredBackgroundColor === "string"
      ? params.dropdownFieldHoveredBackgroundColor
      : "var(--surface-hover)"
    : typeof params?.dropdownFieldBackgroundColor === "string"
    ? params.dropdownFieldBackgroundColor
    : "var(--surface)",

  fontSize:
    typeof params?.dropdownFieldFontSize === "string"
      ? params.dropdownFieldFontSize
      : "var(--text-sm)",

  fontWeight:
    typeof params?.dropdownFieldFontWeight === "string" ||
    typeof params?.dropdownFieldFontWeight === "number"
      ? params.dropdownFieldFontWeight
      : 400,

  padding:
    typeof params?.dropdownFieldPadding === "string"
      ? params.dropdownFieldPadding
      : "var(--space-3)",

  color:
    typeof params?.dropdownFieldTextColor === "string"
      ? params.dropdownFieldTextColor
      : "var(--text-primary)",
});

const buildLabelStyles = (
  params: CanvasFieldsValues,
  open: boolean
): CSSProperties => ({
  fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",

  fontWeight:
    (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",

  margin:
    (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",

  color: open
    ? ((params?.focusedLabelColor as string) ?? "var(--primary)")
    : ((params?.labelTextColor as string) ?? "var(--text-secondary)"),
});

export default function CanvasSelectField({
  params,
  onChange,
  value,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [optionHovered, setOptionHovered] = useState<string | null>(null);

  const wrapperStyles = buildWrapperStyles();

  const hasValue = value !== "";

  const displayValue = hasValue
    ? value
    : params?.placeholder ?? "Select option...";

  const fieldStyles = buildFieldStyles(
    params,
    hasValue,
    open
  );

  const dropdownContainerStyles =
    buildDropdownContainerStyles(params);

  const labelStyles = buildLabelStyles(
    params,
    open
  );

  return (
    <div style={wrapperStyles}>
      {params?.label && (
        <label style={labelStyles}>
          {params.label}
        </label>
      )}

      <button
        type="button"
        style={fieldStyles}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{displayValue}</span>

        <ChevronDown
          color={open ? "#4f46e5" : "#9ca3af"}
          size={18}
        />
      </button>

      {Array.isArray(params?.options) &&
        params.options.length > 0 &&
        open && (
          <ul style={dropdownContainerStyles}>
            {params.options.map((option) => {
              const isHovered = optionHovered === option;
              const isSelected = value === option;

              return (
                <li key={option}>
                  <button
                    type="button"
                    onMouseEnter={() =>
                      setOptionHovered(option)
                    }
                    onMouseLeave={() =>
                      setOptionHovered(null)
                    }
                    style={buildDropdownOptionStyles(
                      params,
                      isHovered,
                      isSelected
                    )}
                    onClick={() => {
                      onChange({
                        value: option,
                      });

                      setOpen(false);
                      setOptionHovered(null);
                    }}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
    </div>
  );
}