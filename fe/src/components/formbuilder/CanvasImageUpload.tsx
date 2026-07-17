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

export default function CanvasImageUploadField({
  params,
  onChange,
  value,
  id,
}: Props) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);

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

  //allow images and pdf only

  const fieldStyles: CSSProperties = {
    cursor: "pointer",
    backgroundColor:
      typeof params?.fieldBackgroundColor === "string"
        ? params.fieldBackgroundColor
        : "var(--surface)",

    border:
      typeof params?.fieldBorder === "string"
        ? params.fieldBorder
        : "1px solid var(--border)",
    borderColor: focused ? "var(--primary)" : "var(--border)",
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

    aspectRatio: 1,
    width:
      typeof params?.fieldHeight === "string" ? params.fieldHeight : "100%",
    padding:
      typeof params?.fieldPadding === "string"
        ? params.fieldPadding
        : "0 var(--space-3)",

    color:
      typeof params?.fieldTextColor === "string"
        ? params.fieldTextColor
        : "var(--text-primary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    gap: "var(--space-6)",
  };

  const allowedTypesStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  const allowedTypeContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: focused ? "var(--primary)" : "#6b7280",
  };

  const allowedTypes = (params?.allowedTypes as string[]) ?? [
    "png",
    "webp",
    "jpeg",
    "jpg",
  ];
  const enrichedTypes = allowedTypes?.map((el) => `image/${el}`)?.join("");

  const fileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      if (objectUrl) setUploadedImage(objectUrl);
      event.target.value = "";
    }
  };

  const fileDelete = () => {
    setUploadedImage(null)
  }

  console.log("uploadedImage", uploadedImage);

  return (
    <div style={wrapperStyles}>
      {params.label && <label style={labelStyles}>{params.label}</label>}
      {uploadedImage ? (
        <div style={{ position: "relative", cursor: "initial" }}>
          <img
            style={{ width: "100%", height: "100%", aspectRatio: 1 }}
            src={uploadedImage}
            alt="Uploaded Img"
          />
          <div
          onClick={() => fileDelete()}
          tabIndex={0}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "var(--space-4)",
              right: "var(--space-4)",
              zIndex: "2",
              backgroundColor: "var(--surface)",
              borderRadius: "8px",
              padding: "var(--space-2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          > 
            <X color={deleteHovered ? "var(--error)" : "black"} />
          </div>
        </div>
      ) : (
        <div>
          <input
            style={{ display: "none" }}
            id={id}
            type="file"
            accept={enrichedTypes}
            onChange={(event) => fileChange(event)}
          />
          <label
            tabIndex={0}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            style={{ ...fieldStyles }}
            htmlFor={id}
          >
            <Upload
              color={focused ? "var(--primary)" : "#6b7280"}
              width={50}
              height={50}
            />
            <div style={allowedTypesStyles}>
              {allowedTypes?.map((el, idx) => {
                const isIdxInbetween = idx > 0 && idx < allowedTypes?.length;
                return (
                  <div key={el} style={allowedTypeContainer}>
                    {isIdxInbetween && (
                      <div
                        style={{
                          height: "25px",
                          width: "2.5px",
                          backgroundColor: focused
                            ? "var(--primary)"
                            : "#6b7280",
                          margin: "0 10px",
                        }}
                      />
                    )}
                    <div>{el}</div>
                  </div>
                );
              })}
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
