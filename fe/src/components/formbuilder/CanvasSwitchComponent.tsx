import type { CanvasFieldsValues } from "../../../types";
import type { CSSProperties } from "react";
import { useState } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: boolean;
  onChange: ({ value }: { value: boolean }) => void;
};

const getPxValue = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;

  const parsed = parseFloat(value);

  return Number.isNaN(parsed) ? fallback : parsed;
};

const buildWrapperStyles = (): CSSProperties => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const buildLabelStyles = (
  params: CanvasFieldsValues,
  active: boolean,
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

  transition: "color 0.2s ease",
});

const buildSwitchTrackStyles = (
  params: CanvasFieldsValues,
  trackWidth: number,
  padding: number,
): CSSProperties => ({
  display: "flex",
  alignItems: "center",

  width: `${trackWidth}px`,

  height:
    typeof params?.switchTrackHeight === "string"
      ? params.switchTrackHeight
      : "45px",

  border:
    typeof params?.switchTrackBorder === "string"
      ? params.switchTrackBorder
      : "1px solid var(--border)",

  borderRadius:
    typeof params?.switchTrackBorderRadius === "string"
      ? params.switchTrackBorderRadius
      : "8px",

  backgroundColor:
    typeof params?.switchTrackBackgroundColor === "string"
      ? params.switchTrackBackgroundColor
      : "var(--surface-muted)",

  padding: `${padding}px`,

  cursor: "pointer",

  transition:
    "border-color 0.2s ease, background-color 0.2s ease",

  boxSizing: "border-box",

  outline: "none",
});

const buildSwitchThumbStyles = (
  params: CanvasFieldsValues,
  thumbWidth: number,
): CSSProperties => ({
  width: `${thumbWidth}px`,

  height:
    typeof params?.switchThumbHeight === "string"
      ? params.switchThumbHeight
      : "35px",

  borderRadius:
    typeof params?.switchThumbBorderRadius === "string"
      ? params.switchThumbBorderRadius
      : "6px",

  backgroundColor:
    typeof params?.switchThumbBackgroundColor === "string"
      ? params.switchThumbBackgroundColor
      : "var(--surface)",

  transition:
    "transform 0.25s ease, background-color 0.2s ease",

  willChange: "transform",
});


export default function CanvasSwitchField({
  params,
  onChange,
  value,
  id,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);


  const active = hovered || focused || value;


  const trackWidth = getPxValue(
    params?.switchTrackWidth as string,
    90,
  );

  const thumbWidth = getPxValue(
    params?.switchThumbWidth as string,
    35,
  );

  const padding = getPxValue(
    params?.switchTrackPadding as string,
    5,
  );


  const translateX =
    trackWidth - thumbWidth - padding * 2;


  const wrapperStyles = buildWrapperStyles();

  const labelStyles = buildLabelStyles(
    params,
    active,
  );


  const switchTrackStyles =
    buildSwitchTrackStyles(
      params,
      trackWidth,
      padding,
    );


  const switchThumbStyles =
    buildSwitchThumbStyles(
      params,
      thumbWidth,
    );


  const trackBorder = value
    ? "var(--primary)"
    : hovered
    ? typeof params?.switchHoverBorder === "string"
      ? params.switchHoverBorder
      : "1px solid var(--primary)"
    : focused
    ? typeof params?.switchFocusedBorder === "string"
      ? params.switchFocusedBorder
      : "1px solid var(--primary)"
    : switchTrackStyles.border;


  const trackBackground = value
    ? "var(--primary-light)"
    : switchTrackStyles.backgroundColor;


  const thumbBackground = value
    ? "var(--primary)"
    : switchThumbStyles.backgroundColor;


  return (
    <div style={wrapperStyles}>

      {params?.label && (
        <label
          htmlFor={id}
          style={labelStyles}
        >
          {params.label}
        </label>
      )}


      <button
        id={id}
        type="button"

        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}

        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}

        onClick={() =>
          onChange({
            value: !value,
          })
        }

        style={{
          ...switchTrackStyles,

          border: trackBorder,

          backgroundColor:
            trackBackground,
        }}
      >

        <span
          style={{
            ...switchThumbStyles,

            transform: value
              ? `translateX(${translateX}px)`
              : "translateX(0px)",

            backgroundColor:
              thumbBackground,
          }}
        />

      </button>

    </div>
  );
}