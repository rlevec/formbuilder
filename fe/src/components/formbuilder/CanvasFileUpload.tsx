import type { CanvasFieldsValues } from "../../../types";

import type { CSSProperties } from "react";

type Props = {
  id: string;
  params: CanvasFieldsValues;
  value: string;
  onChange: ({ value }: { value: string | boolean }) => void;
};

export default function CanvasFileUploadField({
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

  //allow images and pdf only

  const labelStyles: CSSProperties = {
    fontSize: (params?.labelFontSize as string) ?? "var(--text-sm)",
    fontWeight:
      (params?.labelFontWeight as string) ?? "var(--font-weight-normal)",
    margin: (params?.labelMargin as string) ?? "0 0 var(--space-2) 0",
    color: (params?.labelTextColor as string) ?? "var(--text-secondary)",
  };

  return (
    <div style={wrapperStyles}>
      {params.label && <label style={labelStyles}>{params.label}</label>}
      <div>
        <input style={{ display: "none" }} id={id} type="file"/>
        <label style={{ display: "inline-block" }} htmlFor={id}>
          Choose file
        </label>
      </div>
    </div>
  );
}
