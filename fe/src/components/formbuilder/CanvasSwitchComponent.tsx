import type { CanvasFieldsValues } from "../../../types";
import type { CSSProperties } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: boolean;
  onChange: ({ value }: { value: boolean }) => void;
};

export default function CanvasSwitchField({
  params,
  onChange,
  value,
  id,
}: Props) {

  const getPxValue = (value: string | undefined, fallback: number) => {
    if (!value) return fallback;

    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const trackWidth = getPxValue(params?.switchTrackWidth as string, 90);

  const thumbWidth = getPxValue(params?.switchThumbWidth as string, 35);

  const padding = getPxValue(params?.switchTrackPadding as string, 5);

  const translateX = trackWidth - thumbWidth - padding * 2;

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


  //remove from BE all field properties
  const switchTrackStyles: CSSProperties = {
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
    transition: "background 0.2s ease",
    boxSizing: "border-box",
  };

  const switchThumbStyles: CSSProperties = {
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
    transition: "transform 0.25s ease, background 0.2s ease",
    willChange: "transform",
  };

  return (
    <div style={wrapperStyles}>
      {params.label && (
        <label style={labelStyles} htmlFor={id}>
          {params.label}
        </label>
      )}

      <button
        type="button"
        style={{...switchTrackStyles, backgroundColor: value ? "var(--primary-light)" : switchTrackStyles?.backgroundColor}}
        onClick={() => onChange({ value: !value })}
      >
        <span
          style={{
            ...switchThumbStyles,
            transform: value
              ? `translateX(${translateX}px)`
              : "translateX(0px)",
              backgroundColor: value ? "var(--primary)" : switchThumbStyles?.backgroundColor
          }}
        />
      </button>
    </div>
  );
}
