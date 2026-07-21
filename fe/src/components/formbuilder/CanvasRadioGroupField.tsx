import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

import { Fragment, useState } from "react";

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

const buildOptionsStyles = (
  params: CanvasFieldsValues,
  active: boolean
): CSSProperties => ({
  padding:
    typeof params?.fieldPadding === "string"
      ? params.fieldPadding
      : "var(--space-3)",

  backgroundColor:
    typeof params?.fieldBackgroundColor === "string"
      ? params.fieldBackgroundColor
      : "var(--surface)",

  border: active
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

  flexWrap: "wrap",
  gap: "var(--space-2)",
  alignItems: "center",
  display: "flex",

  transition: "border 0.15s ease",
});


const buildLabelStyles = (
  params: CanvasFieldsValues,
  active: boolean
): CSSProperties => ({
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

  color: active
    ? typeof params?.focusedLabelColor === "string"
      ? params.focusedLabelColor
      : "var(--primary)"
    : typeof params?.labelTextColor === "string"
    ? params.labelTextColor
    : "var(--text-secondary)",

  transition: "color 0.15s ease",
});


const buildOptionInputStyles = (): CSSProperties => ({
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
});


const buildOptionLabelStyles = (
  params: CanvasFieldsValues
): CSSProperties => ({
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

  transition:
    "background-color .15s ease, border .15s ease",
});


const getOptionStyles = (
  option: string,
  value: string,
  params: CanvasFieldsValues
): CSSProperties => {
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

    opacity: selected ? 1 : 0.7,
  };
};


export default function CanvasRadioGroupField({
  params,
  onChange,
  value,
  id,
}: Props) {

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const active = hovered || focused;


  const wrapperStyles = buildWrapperStyles();

  const optionsStyles = buildOptionsStyles(
    params,
    active
  );

  const labelStyles = buildLabelStyles(
    params,
    active
  );

  const optionInputStyles = buildOptionInputStyles();

  const optionLabelStyles =
    buildOptionLabelStyles(params);


  return (
    <fieldset
      style={wrapperStyles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >

      {params.label && (
        <label style={labelStyles}>
          {params.label}
        </label>
      )}


      {Array.isArray(params?.options) &&
        params.options.length > 0 && (

        <div style={optionsStyles}>

          {params.options.map((option) => {

            const optionId = `${id}-${option}`;

            return (
              <Fragment key={option}>

                <input
                  style={optionInputStyles}
                  type="radio"
                  id={optionId}
                  name={id}
                  checked={option === value}
                  onChange={() =>
                    onChange({
                      value: option,
                    })
                  }
                />


                <label
                  htmlFor={optionId}
                  style={{
                    ...optionLabelStyles,
                    ...getOptionStyles(
                      option,
                      value,
                      params
                    ),
                  }}
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