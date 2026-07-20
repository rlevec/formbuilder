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
  typeof params?.aspectRatio === "string"
    ? params.aspectRatio.replace(":", " / ")
    : "1 / 1";

const getAllowedTypes = (params: CanvasFieldsValues): string[] =>
  (params?.allowedImageTypes as string[]) ?? [
    "png",
    "webp",
    "jpeg",
    "jpg",
  ];

const getEnrichedTypes = (allowedTypes: string[]): string =>
  allowedTypes.map((type) => `image/${type}`).join(",");

const getFieldBorder = (params: CanvasFieldsValues): string =>
  typeof params?.fieldBorder === "string"
    ? params.fieldBorder
    : "1px solid var(--border)";

const getFieldBorderRadius = (params: CanvasFieldsValues): string =>
  typeof params?.fieldBorderRadius === "string"
    ? params.fieldBorderRadius
    : "var(--radius-md)";

const getFieldBackground = (params: CanvasFieldsValues): string =>
  typeof params?.fieldBackgroundColor === "string"
    ? params.fieldBackgroundColor
    : "var(--surface)";

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

const buildAspectRatioContainerStyles = (aspectRatio: string): CSSProperties => ({
  width: "100%",
  position: "relative",
  aspectRatio,
});

const buildFieldStyles = (
  params: CanvasFieldsValues,
  focused: boolean,
  fieldBackground: string,
  fieldBorder: string,
  fieldBorderRadius: string,
): CSSProperties => ({
  cursor: "pointer",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  backgroundColor: fieldBackground,
  border: fieldBorder,
  borderColor: focused ? "var(--primary)" : "var(--border)",
  borderRadius: fieldBorderRadius,
  fontSize:
    typeof params?.fieldFontSize === "string"
      ? params.fieldFontSize
      : "var(--text-base)",
  fontWeight:
    typeof params?.fieldFontWeight === "string" ||
    typeof params?.fieldFontWeight === "number"
      ? params.fieldFontWeight
      : 400,
  padding:
    typeof params?.fieldPadding === "string"
      ? params.fieldPadding
      : "var(--space-3)",
  color:
    typeof params?.fieldTextColor === "string"
      ? params.fieldTextColor
      : "var(--text-primary)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  gap: "var(--space-6)",
});

const buildAllowedTypesStyles = (): CSSProperties => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});

const buildAllowedTypeContainerStyles = (
  focused: boolean,
): CSSProperties => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: focused ? "var(--primary)" : "#6b7280",
});

const buildAllowedTypeDividerStyles = (focused: boolean): CSSProperties => ({
  height: "25px",
  width: "2.5px",
  backgroundColor: focused ? "var(--primary)" : "#6b7280",
  margin: "0 10px",
});

const buildImageStyles = (
  fieldBorder: string,
  fieldBorderRadius: string,
): CSSProperties => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  border: fieldBorder,
  borderRadius: fieldBorderRadius,
  boxSizing: "border-box",
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
}: Props) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [deleteHovered, setDeleteHovered] = useState(false);

  const aspectRatio = getAspectRatio(params);
  const fieldBorder = getFieldBorder(params);
  const fieldBorderRadius = getFieldBorderRadius(params);
  const fieldBackground = getFieldBackground(params);
  const allowedTypes = getAllowedTypes(params);
  const enrichedTypes = getEnrichedTypes(allowedTypes);

  const wrapperStyles = buildWrapperStyles();
  const labelStyles = buildLabelStyles(params);
  const aspectRatioContainer = buildAspectRatioContainerStyles(aspectRatio);
  const fieldStyles = buildFieldStyles(
    params,
    focused,
    fieldBackground,
    fieldBorder,
    fieldBorderRadius,
  );
  const allowedTypesStyles = buildAllowedTypesStyles();
  const allowedTypeContainerStyles = buildAllowedTypeContainerStyles(focused);
  const allowedTypeDividerStyles = buildAllowedTypeDividerStyles(focused);
  const imageStyles = buildImageStyles(fieldBorder, fieldBorderRadius);
  const deleteButtonStyles = buildDeleteButtonStyles();

  const fileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setUploadedImage(objectUrl);
    event.target.value = "";
  };

  const fileDelete = () => {
    setUploadedImage(null);
  };

  return (
    <div style={wrapperStyles}>
      {params.label && (
        <label style={labelStyles}>
          {params.label}
        </label>
      )}

      <div style={aspectRatioContainer}>
        <input
          id={id}
          type="file"
          accept={enrichedTypes}
          onChange={fileChange}
          style={{ display: "none" }}
        />

        {uploadedImage ? (
          <>
            <img
              src={uploadedImage}
              alt="Uploaded Img"
              width={400}
              height={400}
              style={imageStyles}
            />

            <div
              onClick={fileDelete}
              onMouseEnter={() => setDeleteHovered(true)}
              onMouseLeave={() => setDeleteHovered(false)}
              style={deleteButtonStyles}
            >
              <X
                color={
                  deleteHovered
                    ? "var(--error)"
                    : "black"
                }
                width={20}
                height={20}
              />
            </div>
          </>
        ) : (
          <label
            htmlFor={id}
            tabIndex={0}
            style={fieldStyles}
            onMouseEnter={() =>
              setFocused(true)
            }
            onMouseLeave={() =>
              setFocused(false)
            }
          >
            <Upload
              color={
                focused
                  ? "var(--primary)"
                  : "#6b7280"
              }
              width={50}
              height={50}
            />

            <div style={allowedTypesStyles}>
              {allowedTypes.map((type, index) => (
                <div
                  key={type}
                  style={allowedTypeContainerStyles}
                >
                  {index > 0 && (
                    <div style={allowedTypeDividerStyles} />
                  )}

                  <div>{type}</div>
                </div>
              ))}
            </div>
          </label>
        )}
      </div>
    </div>
  );
}