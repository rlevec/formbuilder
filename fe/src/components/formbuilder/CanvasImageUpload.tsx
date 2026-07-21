import type { CanvasFieldsValues } from "../../../types";
import type { ChangeEvent, CSSProperties } from "react";

import { Upload, X } from "lucide-react";

import { useState } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string | boolean }) => void;
};

const getAspectRatio = (params: CanvasFieldsValues): string =>
  typeof params?.aspectRatio === "string" && params.aspectRatio !== "free"
    ? params.aspectRatio.replace(":", " / ")
    : "1 / 1";

const getAllowedTypes = (params: CanvasFieldsValues): string[] =>
  Array.isArray(params?.allowedImageTypes)
    ? (params.allowedImageTypes as string[])
    : ["png", "webp", "jpeg", "jpg"];

const getEnrichedTypes = (allowedTypes: string[]): string =>
  allowedTypes.map((type) => `image/${type}`).join(",");

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

  transition: "color .2s ease",
});

const buildAspectRatioContainerStyles = (
  aspectRatio: string,
): CSSProperties => ({
  width: "100%",
  position: "relative",
  aspectRatio,
});

const buildFieldStyles = (
  params: CanvasFieldsValues,
  active: boolean,
  hovered: boolean,
): CSSProperties => {
  const normalBorder =
    typeof params?.fieldBorder === "string"
      ? params.fieldBorder
      : "1px solid var(--border)";

  const hoverBorder =
    typeof params?.fieldHoverBorder === "string"
      ? params.fieldHoverBorder
      : normalBorder;

  const focusedBorder =
    typeof params?.fieldFocusedBorder === "string"
      ? params.fieldFocusedBorder
      : "1px solid var(--primary)";

  return {
    cursor: "pointer",

    width: "100%",
    height: "100%",

    boxSizing: "border-box",

    backgroundColor:
      typeof params?.fieldBackgroundColor === "string"
        ? params.fieldBackgroundColor
        : "var(--surface)",

    border: active ? focusedBorder : hovered ? hoverBorder : normalBorder,

    borderRadius:
      typeof params?.fieldBorderRadius === "string"
        ? params.fieldBorderRadius
        : "var(--radius-md)",

    padding:
      typeof params?.fieldPadding === "string"
        ? params.fieldPadding
        : "var(--space-3)",

    color:
      typeof params?.fieldTextColor === "string"
        ? params.fieldTextColor
        : "var(--text-primary)",

    fontSize:
      typeof params?.fieldFontSize === "string"
        ? params.fieldFontSize
        : "var(--text-base)",

    fontWeight:
      typeof params?.fieldFontWeight === "string" ||
      typeof params?.fieldFontWeight === "number"
        ? params.fieldFontWeight
        : 400,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    textAlign: "center",

    gap: "var(--space-6)",

    transition: "border-color .2s ease, color .2s ease",
  };
};

const buildAllowedTypesStyles = (): CSSProperties => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const buildAllowedTypeStyles = (active: boolean): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  color: active ? "var(--primary)" : "#6b7280",

  transition: "color .2s ease",
});

const buildDividerStyles = (active: boolean): CSSProperties => ({
  height: "25px",
  width: "2px",
  backgroundColor: active ? "var(--primary)" : "#6b7280",

  margin: "0 10px",

  transition: "background-color .2s ease",
});

const buildImageStyles = (params: CanvasFieldsValues): CSSProperties => ({
  width: "100%",
  height: "100%",

  objectFit: "cover",

  display: "block",

  border:
    typeof params?.fieldBorder === "string"
      ? params.fieldBorder
      : "1px solid var(--border)",

  borderRadius:
    typeof params?.fieldBorderRadius === "string"
      ? params.fieldBorderRadius
      : "var(--radius-md)",
});

const buildDeleteButtonStyles = (): CSSProperties => ({
  cursor: "pointer",

  position: "absolute",

  top: "var(--space-4)",
  right: "var(--space-4)",

  zIndex: 2,

  backgroundColor: "var(--surface)",

  borderRadius: "8px",

  padding: "var(--space-2)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function CanvasImageUploadField({
  params,
  id,
  onChange,
  value,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const [focused, setFocused] = useState(false);

  const [deleteHovered, setDeleteHovered] = useState(false);

  const active = hovered || focused;

  const aspectRatio = getAspectRatio(params);

  const allowedTypes = getAllowedTypes(params);

  const enrichedTypes = getEnrichedTypes(allowedTypes);

  const wrapperStyles = buildWrapperStyles();

  const labelStyles = buildLabelStyles(params, active);

  const aspectRatioStyles = buildAspectRatioContainerStyles(aspectRatio);

  const fieldStyles = buildFieldStyles(params, focused, hovered);

  const imageStyles = buildImageStyles(params);

  const deleteStyles = buildDeleteButtonStyles();

  const fileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    onChange({ value: objectUrl });

    event.target.value = "";
  };

  const fileDelete = () => {
    onChange({ value: "" });
  };

  return (
    <div style={wrapperStyles}>
      {params?.label && <label style={labelStyles}>{params.label}</label>}

      <div style={aspectRatioStyles}>
        <input
          id={id}
          type="file"
          accept={enrichedTypes}
          onChange={fileChange}
          style={{
            display: "none",
          }}
        />

        {value !== "" ? (
          <>
            <img src={value} alt="Uploaded" style={imageStyles} />

            <div
              style={deleteStyles}
              onClick={fileDelete}
              onMouseEnter={() => setDeleteHovered(true)}
              onMouseLeave={() => setDeleteHovered(false)}
            >
              <X
                width={20}
                height={20}
                color={deleteHovered ? "var(--error)" : "var(--text-primary)"}
              />
            </div>
          </>
        ) : (
          <label
            htmlFor={id}
            tabIndex={0}
            style={fieldStyles}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <Upload
              width={50}
              height={50}
              color={active ? "var(--primary)" : "#6b7280"}
            />

            <div style={buildAllowedTypesStyles()}>
              {allowedTypes.map((type, index) => (
                <div key={type} style={buildAllowedTypeStyles(active)}>
                  {index > 0 && <div style={buildDividerStyles(active)} />}

                  {type}
                </div>
              ))}
            </div>
          </label>
        )}
      </div>
    </div>
  );
}
