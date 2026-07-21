import type { FormBuilder, FormField } from "../types";

import { generateField } from "../utils/generateField.utils";

import crypto from "crypto";

type FieldType =
  | "input"
  | "shortText"
  | "paragraph"
  | "dropdown"
  | "rating"
  | "fileUpload"
  | "toggle"
  | "radioGroup"
  | "checkboxGroup"
  | "checkbox"
  | "imageUpload"
  | "date"
  | "phone"
  | "email"
  | "number";

const fontWeights = Array.from({ length: 9 }, (_, i) =>
  ((i + 1) * 100).toString(),
);

const fontSizes = Array.from({ length: 10 }, (_, i) => (12 + i * 2).toString());

const inputFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 6,
    name: "inputType",
    label: "Input Type",
    type: "select",
    inputType: "select",
    placeholder: "Select input type",
    options: ["text", "number", "email", "phone", "date"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "fieldHeight",
    label: "Field Height",
    type: "text",
    inputType: "text",
    placeholder: "46px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "minLength",
    label: "Min Length",
    type: "number",
    inputType: "text",
    placeholder: "Enter minimum length",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 6,
    name: "maxLength",
    label: "Max Length",
    type: "number",
    inputType: "text",
    placeholder: "Enter maximum length",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 6,
    name: "minDate",
    label: "Min Date",
    type: "text",
    inputType: "text",
    placeholder: "YYYY-MM-DD",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 7,
    name: "maxDate",
    label: "Max Date",
    type: "text",
    inputType: "text",
    placeholder: "YYYY-MM-DD",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 8,
    name: "disablePast",
    label: "Disable Past Dates",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 9,
    name: "disableFuture",
    label: "Disable Future Dates",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 10,
    name: "includeTime",
    label: "Include Time",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelMargin",
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelTextColor",
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "focusedLabelColor",
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "labelFontWeight",
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select label font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelFontSize",
    name: "labelFontSize",
    type: "text",
    inputType: "select",
    options: fontSizes,
    label: "Label Font Size",
    placeholder: "Select label size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldBackgroundColor",
    name: "fieldBackgroundColor",
    label: "Field Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldTextColor",
    name: "fieldTextColor",
    label: "Field Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldFontWeight",
    name: "fieldFontWeight",
    label: "Field Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "fieldFontSize",
    name: "fieldFontSize",
    type: "text",
    inputType: "select",
    options: fontSizes,
    label: "Field Font Size",
    placeholder: "Select font size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    frontendSlug: "fieldPadding",
    name: "fieldPadding",
    label: "Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px 12px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    frontendSlug: "fieldBorderRadius",
    name: "fieldBorderRadius",
    label: "Field Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "fieldBorder",
    name: "fieldBorder",
    label: "Field Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 7,
    name: "fieldFocusedBorder",
    label: "Field Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #00000",
  }),
];

const paragraphFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 4,
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    inputType: "text",
    placeholder: "Enter placeholder text",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelMargin",
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelTextColor",
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "focusedLabelColor",
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "labelFontWeight",
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select label font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelFontSize",
    name: "labelFontSize",
    label: "Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select label size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldBackgroundColor",
    name: "fieldBackgroundColor",
    label: "Field Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldTextColor",
    name: "fieldTextColor",
    label: "Field Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldFontWeight",
    name: "fieldFontWeight",
    label: "Field Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "fieldFontSize",
    name: "fieldFontSize",
    label: "Field Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select font size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    frontendSlug: "fieldPadding",
    name: "fieldPadding",
    label: "Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px 12px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    frontendSlug: "fieldBorderRadius",
    name: "fieldBorderRadius",
    label: "Field Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "fieldBorder",
    name: "fieldBorder",
    label: "Field Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 7,
    name: "fieldFocusedBorder",
    label: "Field Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #00000",
  }),
];

const dropdownFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 4,
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    inputType: "text",
    placeholder: "Enter placeholder text",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "labelFontWeight",
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select label font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelFontSize",
    name: "labelFontSize",
    label: "Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select label size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelMargin",
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "labelTextColor",
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "focusedLabelColor",
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldBackgroundColor",
    name: "fieldBackgroundColor",
    label: "Field Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldTextColor",
    name: "fieldTextColor",
    label: "Field Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    frontendSlug: "fieldFontWeight",
    name: "fieldFontWeight",
    label: "Field Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "fieldFontSize",
    name: "fieldFontSize",
    label: "Field Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select font size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    frontendSlug: "fieldPadding",
    name: "fieldPadding",
    label: "Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px 12px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    frontendSlug: "fieldBorderRadius",
    name: "fieldBorderRadius",
    label: "Field Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    frontendSlug: "fieldBorder",
    name: "fieldBorder",
    label: "Field Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 7,
    name: "fieldFocusedBorder",
    label: "Field Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #00000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownFieldPadding",
    label: "Dropdown Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "24px 10px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownFieldBackgroundColor",
    label: "Dropdown Field Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownFieldHoveredBackgroundColor",
    label: "Dropdown Field Hovered Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownFieldTextColor",
    label: "Dropdown Field Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownFieldFontSize",
    label: "Dropdown Field Font Size",
    type: "text",
    inputType: "text",
    placeholder: "1rem",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    frontendSlug: "dropdownFieldFontWeight",
    name: "dropdownFieldFontWeight",
    label: "Dropdown Field Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select dropdown field font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownContainerBorder",
    label: "Dropdown Container Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid red",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownContainerBorderRadius",
    label: "Dropdown Container Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "dropdownFieldSelectedBackgroundColor",
    label: "Dropdown Field Selected Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#e0e7ff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 50,
    name: "options",
    label: "Options",
    type: "text",
    inputType: "optionsBuilder",
    placeholder: "Add option",
  }),
];

const ratingFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 4,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    name: "labelFontSize",
    label: "Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "fieldBackgroundColor",
    label: "Field Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 41,
    name: "fieldBorder",
    label: "Field Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 42,
    name: "fieldBorderRadius",
    label: "Field Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 43,
    name: "fieldHeight",
    label: "Field Height",
    type: "text",
    inputType: "text",
    placeholder: "46px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 44,
    name: "fieldPadding",
    label: "Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 50,
    name: "maxRating",
    label: "Maximum Rating",
    type: "number",
    inputType: "text",
    placeholder: "5",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 51,
    name: "ratingStyle",
    label: "Rating Style",
    type: "select",
    inputType: "select",
    options: ["stars", "hearts", "emoji"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 52,
    name: "ratingIconHeight",
    label: "Rating Icon Size",
    type: "text",
    inputType: "text",
    placeholder: "25px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 53,
    name: "ratingIconsAlignment",
    label: "Rating Alignment",
    type: "select",
    inputType: "select",
    options: ["start", "center", "end"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 54,
    name: "ratingIconsGap",
    label: "Rating Icon Gap",
    type: "text",
    inputType: "text",
    placeholder: "16px",
  }),
];

const checkboxFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 4,
    name: "checkboxOptionLabel",
    label: "Checkbox Option Label",
    type: "text",
    inputType: "text",
    placeholder: "Do you agree with Terms & Conditions",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "containerBackgroundColor",
    label: "Container Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "containerBorder",
    label: "Container Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "containerFocusedBorder",
    label: "Container Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "containerBorderRadius",
    label: "Container Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "containerHeight",
    label: "Container Height",
    type: "text",
    inputType: "text",
    placeholder: "46px",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "containerPadding",
    label: "Container Padding",
    type: "text",
    inputType: "text",
    placeholder: "12px 24px",
  }),

  generateField({
    id: crypto.randomUUID(),
    frontendSlug: "checkboxContentAlingment",
    label: "Checkbox Content Alignment",
    name: "checkboxContentAlingment",
    type: "select",
    inputType: "select",
    options: ["left", "center", "right"],
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "checkboxOptionLabelFontSize",
    label: "Checkbox Option Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select font size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "checkboxOptionLabelFontWeight",
    label: "Checkbox Option Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "checkboxOptionLabelMargin",
    label: "Checkbox Option Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 0 12px",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "checkboxOptionLabelColor",
    label: "Checkbox Option Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "checkboxOptionLabelFocusedColor",
    label: "Checkbox Option Label Focused Color",
    type: "text",
    inputType: "text",
    placeholder: "#000000",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select label font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "labelFontSize",
    label: "Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select label size",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldBackgroundColor",
    label: "Field Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldBorder",
    label: "Field Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldBorderRadius",
    label: "Field Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldHeight",
    label: "Field Height",
    type: "text",
    inputType: "text",
    placeholder: "25px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldFontWeight",
    label: "Field Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select font weight",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldTextColor",
    label: "Field Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldPadding",
    label: "Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px 12px",
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    name: "fieldFontSize",
    label: "Field Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select font size",
    valueType: "string",
  }),
];

const checkboxGroupConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 4,
    name: "options",
    label: "Options",
    type: "text",
    inputType: "optionsBuilder",
    placeholder: "Add option",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 5,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 20,
    name: "containerBackgroundColor",
    label: "Container Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 21,
    name: "containerBorder",
    label: "Container Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 22,
    name: "containerFocusedBorder",
    label: "Container Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 23,
    name: "containerBorderRadius",
    label: "Container Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 24,
    name: "containerHeight",
    label: "Container Height",
    type: "text",
    inputType: "text",
    placeholder: "46px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 25,
    name: "containerPadding",
    label: "Container Padding",
    type: "text",
    inputType: "text",
    placeholder: "12px 24px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 26,
    frontendSlug: "checkboxContentAlingment",
    label: "Checkbox Content Alignment",
    name: "checkboxContentAlingment",
    type: "select",
    inputType: "select",
    options: ["left", "center", "right"],
    valueType: "string",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 30,
    name: "fieldBackgroundColor",
    label: "Checkbox Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    name: "fieldBorder",
    label: "Checkbox Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    name: "fieldHoverBorder",
    label: "Checkbox Hover Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    name: "fieldBorderRadius",
    label: "Checkbox Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "4px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 34,
    name: "fieldHeight",
    label: "Checkbox Size",
    type: "text",
    inputType: "text",
    placeholder: "20px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 40,
    name: "checkboxOptionLabelTextColor",
    label: "Option Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 41,
    name: "checkboxOptionLabelFocusedColor",
    label: "Option Label Hover Color",
    type: "text",
    inputType: "text",
    placeholder: "#000000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 42,
    name: "checkboxOptionLabelFontSize",
    label: "Option Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select font size",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 43,
    name: "checkboxOptionLabelFontWeight",
    label: "Option Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select font weight",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 44,
    name: "checkboxOptionLabelMargin",
    label: "Option Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 0 12px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 50,
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 51,
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 52,
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 53,
    name: "labelFontSize",
    label: "Label Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
    placeholder: "Select label size",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 54,
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
    placeholder: "Select label font weight",
  }),
];

const radioGroupFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "options",
    label: "Options",
    type: "text",
    inputType: "optionsBuilder",
    placeholder: "Add option",
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 10,
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 11,
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#4f46e5",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 12,
    name: "labelFontSize",
    label: "Label Font Size",
    type: "select",
    inputType: "select",
    options: fontSizes,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 13,
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 14,
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 20,
    name: "fieldBackgroundColor",
    label: "Container Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 21,
    name: "fieldBorder",
    label: "Container Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #ddd",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 22,
    name: "fieldFocusedBorder",
    label: "Container Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 23,
    name: "fieldBorderRadius",
    label: "Container Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 24,
    name: "fieldPadding",
    label: "Container Padding",
    type: "text",
    inputType: "text",
    placeholder: "12px",
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 30,
    name: "optionBackgroundColor",
    label: "Option Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    name: "selectedOptionBackgroundColor",
    label: "Selected Option Background Color",
    type: "text",
    inputType: "text",
    placeholder: "#eef2ff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    name: "optionTextColor",
    label: "Option Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    name: "optionBorder",
    label: "Option Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #ddd",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 34,
    name: "selectedOptionBorder",
    label: "Selected Option Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 35,
    name: "optionBorderRadius",
    label: "Option Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "18px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 36,
    name: "optionPadding",
    label: "Option Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px 12px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 37,
    name: "optionFontSize",
    label: "Option Font Size",
    type: "select",
    inputType: "select",
    options: fontSizes,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 38,
    name: "optionFontWeight",
    label: "Option Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
  }),
];

const toggleFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 10,
    name: "labelMargin",
    label: "Label Margin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 11,
    name: "labelTextColor",
    label: "Label Text Color",
    type: "text",
    inputType: "text",
    placeholder: "#666",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 12,
    name: "focusedLabelColor",
    label: "Focused Label Color",
    type: "text",
    inputType: "text",
    placeholder: "#4f46e5",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 13,
    name: "labelFontSize",
    label: "Label Font Size",
    type: "select",
    inputType: "select",
    options: fontSizes,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 14,
    name: "labelFontWeight",
    label: "Label Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 20,
    name: "switchTrackWidth",
    label: "Track Width",
    type: "text",
    inputType: "text",
    placeholder: "90px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 21,
    name: "switchTrackHeight",
    label: "Track Height",
    type: "text",
    inputType: "text",
    placeholder: "45px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 22,
    name: "switchTrackPadding",
    label: "Track Padding",
    type: "text",
    inputType: "text",
    placeholder: "5px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 23,
    name: "switchTrackBorder",
    label: "Track Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #ddd",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 24,
    name: "switchFocusedBorder",
    label: "Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 25,
    name: "switchHoverBorder",
    label: "Hover Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary-light)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 26,
    name: "switchTrackBorderRadius",
    label: "Track Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 27,
    name: "switchTrackBackgroundColor",
    label: "Track Background",
    type: "text",
    inputType: "text",
    placeholder: "#ddd",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 28,
    name: "switchActiveTrackBackgroundColor",
    label: "Active Track Background",
    type: "text",
    inputType: "text",
    placeholder: "var(--primary-light)",
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 30,
    name: "switchThumbWidth",
    label: "Thumb Width",
    type: "text",
    inputType: "text",
    placeholder: "35px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    name: "switchThumbHeight",
    label: "Thumb Height",
    type: "text",
    inputType: "text",
    placeholder: "35px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 32,
    name: "switchThumbBorderRadius",
    label: "Thumb Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "50%",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 33,
    name: "switchThumbBackgroundColor",
    label: "Thumb Background",
    type: "text",
    inputType: "text",
    placeholder: "#fff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 34,
    name: "switchActiveThumbBackgroundColor",
    label: "Active Thumb Background",
    type: "text",
    inputType: "text",
    placeholder: "#fff",
  }),
];
const imageUploadFieldConfig = [
  generateField({
    id: crypto.randomUUID(),
    order: 1,
    name: "label",
    label: "Field Label",
    type: "text",
    inputType: "text",
    placeholder: "Enter field label",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 2,
    name: "description",
    label: "Field Description",
    type: "text",
    inputType: "textarea",
    placeholder: "Enter field description",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 3,
    name: "required",
    label: "Field Required",
    type: "switch",
    inputType: "switch",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 4,
    name: "width",
    label: "Field Width",
    type: "select",
    inputType: "radioGroup",
    options: ["half", "full"],
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 10,
    frontendSlug: "labelTextColor",
    label: "Label Text Color",
    name: "labelTextColor",
    type: "text",
    inputType: "text",
    placeholder: "#000",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 11,
    frontendSlug: "focusedLabelColor",
    label: "Focused Label Color",
    name: "focusedLabelColor",
    type: "text",
    inputType: "text",
    placeholder: "#ffffff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 12,
    frontendSlug: "labelMargin",
    label: "Label Margin",
    name: "labelMargin",
    type: "text",
    inputType: "text",
    placeholder: "0 0 24px 0",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 13,
    frontendSlug: "labelFontSize",
    label: "Label Font Size",
    name: "labelFontSize",
    type: "text",
    inputType: "select",
    options: fontSizes,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 14,
    frontendSlug: "labelFontWeight",
    label: "Label Font Weight",
    name: "labelFontWeight",
    type: "select",
    inputType: "select",
    options: fontWeights,
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 20,
    name: "fieldBackgroundColor",
    label: "Field Background Color",
    type: "text",
    inputType: "text",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 21,
    name: "fieldTextColor",
    label: "Field Text Color",
    type: "text",
    inputType: "text",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 22,
    name: "fieldBorder",
    label: "Field Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid #fff",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 23,
    name: "fieldHoverBorder",
    label: "Field Hover Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 24,
    name: "fieldFocusedBorder",
    label: "Field Focused Border",
    type: "text",
    inputType: "text",
    placeholder: "1px solid var(--primary)",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 25,
    name: "fieldBorderRadius",
    label: "Field Border Radius",
    type: "text",
    inputType: "text",
    placeholder: "8px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 26,
    name: "fieldPadding",
    label: "Field Padding",
    type: "text",
    inputType: "text",
    placeholder: "10px 12px",
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 27,
    name: "fieldFontSize",
    label: "Field Font Size",
    type: "text",
    inputType: "select",
    options: fontSizes,
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 28,
    name: "fieldFontWeight",
    label: "Field Font Weight",
    type: "select",
    inputType: "select",
    options: fontWeights,
  }),
  generateField({
    id: crypto.randomUUID(),
    order: 30,
    name: "allowedImageTypes",
    label: "Allowed Image Types",
    type: "select",
    inputType: "checkboxGroup",
    options: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
  }),

  generateField({
    id: crypto.randomUUID(),
    order: 31,
    name: "aspectRatio",
    label: "Aspect Ratio",
    type: "select",
    inputType: "select",
    options: ["free", "1:1", "4:3", "16:9"],
  }),
];

export const generateBaseFieldProperties = ({
  type,
}: {
  type: FieldType;
}): FormField[] => {
  const fields: FormField[] = [];
  switch (type) {
    case "input":
      fields.push(...inputFieldConfig);
      break;
    case "paragraph":
      fields.push(...paragraphFieldConfig);
      break;
    case "rating":
      fields.push(...ratingFieldConfig);
      break;
    case "dropdown":
      fields.push(...dropdownFieldConfig);
      break;
    case "radioGroup":
      fields.push(...radioGroupFieldConfig);
      break;
    case "checkbox":
      fields.push(...checkboxFieldConfig);
      break;
    case "checkboxGroup":
      fields.push(...checkboxGroupConfig);
      break;
    case "toggle":
      fields.push(...toggleFieldConfig);
      break;
    case "imageUpload":
      fields.push(...imageUploadFieldConfig);
      break;
  }

  return fields;
};

const fieldSchemas = {
  shortText: generateBaseFieldProperties({
    type: "shortText",
  }),

  input: generateBaseFieldProperties({
    type: "input",
  }),

  paragraph: generateBaseFieldProperties({
    type: "paragraph",
  }),

  rating: generateBaseFieldProperties({
    type: "rating",
  }),

  dropdown: generateBaseFieldProperties({
    type: "dropdown",
  }),

  fileUpload: generateBaseFieldProperties({
    type: "fileUpload",
  }),

  number: generateBaseFieldProperties({
    type: "number",
  }),

  email: generateBaseFieldProperties({
    type: "email",
  }),

  phone: generateBaseFieldProperties({
    type: "phone",
  }),

  date: generateBaseFieldProperties({
    type: "date",
  }),

  radioGroup: generateBaseFieldProperties({
    type: "radioGroup",
  }),

  checkbox: generateBaseFieldProperties({
    type: "checkbox",
  }),

  checkboxGroup: generateBaseFieldProperties({
    type: "checkboxGroup",
  }),

  toggle: generateBaseFieldProperties({
    type: "toggle",
  }),

  imageUpload: generateBaseFieldProperties({
    type: "imageUpload",
  }),
};

const titleField = generateField({
  frontendSlug: "formTitle",
  label: "Title",
  name: "formTitle",
  type: "text",
  inputType: "text",
  placeholder: "Enter form title",
  valueType: "string",
  required: true,
  requiredMessage: "Title is required",
  validator: "/^[a-zA-Z0-9 ]{3,50}$/",
  validationMessage: "3-50 characters, letters and numbers only",
});

const descriptionField = generateField({
  order: 2,
  frontendSlug: "formDescription",
  label: "Description",
  name: "formDescription",
  type: "text",
  inputType: "textarea",
  placeholder: "Write a short description of your form...",
  valueType: "string",
  required: false,
});

const submitButtonTextField = generateField({
  order: 3,
  frontendSlug: "formSubmitButtonText",
  label: "Submit Button Text",
  name: "formSubmitButtonText",
  type: "text",
  inputType: "text",
  placeholder: "Submit",
  valueType: "string",
  required: true,
});

const showFieldLabelsField = generateField({
  order: 4,
  frontendSlug: "formShowFieldLabels",
  label: "Show Field Labels",
  name: "formShowFieldLabels",
  type: "switch",
  inputType: "switch",
  valueType: "boolean",
});

const showRequiredAsteriskField = generateField({
  order: 5,
  frontendSlug: "formShowRequiredAsterisk",
  label: "Show Required Asterisk",
  name: "formShowRequiredAsterisk",
  type: "switch",
  inputType: "switch",
  valueType: "boolean",
});

const successMessageField = generateField({
  order: 9,
  frontendSlug: "formSuccessMessage",
  label: "Success Message",
  name: "formSuccessMessage",
  type: "text",
  inputType: "textarea",
  placeholder: "Message shown after successful submission...",
  valueType: "string",
});

const redirectUrlField = generateField({
  order: 10,
  frontendSlug: "formRedirectUrl",
  label: "Redirect URL",
  name: "formRedirectUrl",
  type: "text",
  inputType: "text",
  placeholder: "https://example.com/thank-you",
  valueType: "string",
  validator:
    "/^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/",
  validationMessage: "Must be a valid URL",
});

const webhookUrlField = generateField({
  order: 15,
  frontendSlug: "formWebhookUrl",
  label: "Webhook URL",
  name: "formWebhookUrl",
  type: "text",
  inputType: "text",
  placeholder: "https://api.example.com/webhook",
  valueType: "string",
  validator: "/^(https?:\/\/).+/",
  validationMessage: "Must be a valid URL",
});

const maxSubmissionsField = generateField({
  order: 13,
  frontendSlug: "formMaxSubmissions",
  label: "Max Submissions",
  name: "formMaxSubmissions",
  type: "number",
  inputType: "text",
  placeholder: "Enter max number of submissions (e.g. 100)",
  valueType: "number",
  validator: "/^[0-9]*$/",
  validationMessage: "Must be a number",
});

const submissionDeadlineField = generateField({
  order: 14,
  frontendSlug: "formSubmissionDeadline",
  label: "Submission Deadline",
  name: "formSubmissionDeadline",
  type: "text",
  inputType: "text",
  placeholder: "YYYY-MM-DD",
  valueType: "string",
});

const gridVerticalGapStyleField = generateField({
  order: 14,
  frontendSlug: "gridVerticalGap",
  label: "Vertical Gap",
  name: "gridVerticalGap",
  type: "text",
  inputType: "text",
  placeholder: "14px / 1rem / 2em",
  valueType: "string",
});

const gridHorizontalGapStyleField = generateField({
  order: 14,
  frontendSlug: "gridHorizontalGap",
  label: "Horizontal Gap",
  name: "gridHorizontalGap",
  type: "text",
  inputType: "text",
  placeholder: "14px / 1rem / 2em",
  valueType: "string",
});

const canvasPaddingStyleField = generateField({
  order: 14,
  frontendSlug: "canvasPadding",
  label: "Padding",
  name: "canvasPadding",
  type: "text",
  inputType: "text",
  placeholder: "10px 24px / 1rem 2em",
  valueType: "string",
});

const canvasBorderRadiusStyleField = generateField({
  order: 14,
  frontendSlug: "canvasBorderRadius",
  label: "Border Radius",
  name: "canvasBorderRadius",
  type: "text",
  inputType: "text",
  placeholder: "14px / 1rem / 2em",
  valueType: "string",
});

const canvasBackgroundColorStyleField = generateField({
  order: 14,
  frontendSlug: "canvasBackgroundColor",
  label: "Background Color",
  name: "canvasBackgroundColor",
  type: "text",
  inputType: "text",
  placeholder: "#ffffff / rgb(255, 255, 255) / hsl(0, 0%, 100%)",
  valueType: "string",
});

const canvasBorderStyleField = generateField({
  order: 14,
  frontendSlug: "canvasBorder",
  label: "Border",
  name: "canvasBorder",
  type: "text",
  inputType: "text",
  placeholder: "1px solid #000000 / 1px dashed #ff0000",
  valueType: "string",
});

const headerTextSizeStyleField = generateField({
  order: 14,
  frontendSlug: "headerTextSize",
  label: "Header Text Size",
  name: "headerTextSize",
  type: "text",
  inputType: "text",
  placeholder: "14px / 1rem / 2em",
  valueType: "string",
});

const headerTextWeightStyleField = generateField({
  order: 14,
  frontendSlug: "headerTextWeight",
  label: "Header Text Weight",
  name: "headerTextWeight",
  type: "select",
  inputType: "select",
  placeholder: "Select font weight",
  options: fontWeights,
  valueType: "string",
});

const headerMarginStyleField = generateField({
  order: 14,
  frontendSlug: "headerMargin",
  label: "Header Margin",
  name: "headerMargin",
  type: "text",
  inputType: "text",
  placeholder: "24px auto 0 auto / 1rem auto 0 auto",
  valueType: "string",
});

const headerTextColorStyleField = generateField({
  order: 14,
  frontendSlug: "headerTextColor",
  label: "Header Text Color",
  name: "headerTextColor",
  type: "text",
  inputType: "text",
  placeholder: "#ffffff / rgb(255, 255, 255) / hsl(0, 0%, 100%)",
  valueType: "string",
});

const descriptionTextSizeStyleField = generateField({
  order: 14,
  frontendSlug: "descriptionTextSize",
  label: "Description Text Size",
  name: "descriptionTextSize",
  type: "text",
  inputType: "text",
  placeholder: "14px / 1rem / 2em",
  valueType: "string",
});

const descriptionTextWeightStyleField = generateField({
  order: 14,
  frontendSlug: "descriptionTextWeight",
  label: "Description Text Weight",
  name: "descriptionTextWeight",
  type: "select",
  inputType: "select",
  placeholder: "Select font weight",
  options: fontWeights,
  valueType: "string",
});

const descriptionMarginStyleField = generateField({
  order: 14,
  frontendSlug: "descriptionMargin",
  label: "Description Margin",
  name: "descriptionMargin",
  type: "text",
  inputType: "text",
  placeholder: "24px auto 0 auto / 1rem auto 0 auto",
  valueType: "string",
});

const descriptionTextColorStyleField = generateField({
  order: 14,
  frontendSlug: "descriptionTextColor",
  label: "Description Text Color",
  name: "descriptionTextColor",
  type: "text",
  inputType: "text",
  placeholder: "#ffffff / rgb(255, 255, 255) / hsl(0, 0%, 100%)",
  valueType: "string",
});

const headerAlignmentStyleField = generateField({
  order: 40,
  frontendSlug: "headerAlignment",
  label: "Header Alignment",
  name: "headerAlignment",
  placeholder: "Select header alignment",
  type: "select",
  inputType: "select",
  options: ["left", "center", "right"],
  valueType: "string",
});

const descriptionAlignmentStyleField = generateField({
  order: 40,
  frontendSlug: "descriptionAlignment",
  label: "Description Alignment",
  name: "descriptionAlignment",
  placeholder: "Select description alignment",
  type: "select",
  inputType: "select",
  options: ["left", "center", "right"],
  valueType: "string",
});

const buttonBackgroundColorField = generateField({
  order: 20,
  frontendSlug: "buttonBackgroundColor",
  label: "Button Background Color",
  name: "buttonBackgroundColor",
  type: "text",
  inputType: "text",
  placeholder: "#111827",
  valueType: "string",
});

const buttonTextColorField = generateField({
  order: 21,
  frontendSlug: "buttonTextColor",
  label: "Button Text Color",
  name: "buttonTextColor",
  type: "text",
  inputType: "text",
  placeholder: "#ffffff",
  valueType: "string",
});

const buttonBorderRadiusField = generateField({
  order: 22,
  frontendSlug: "buttonBorderRadius",
  label: "Button Border Radius",
  name: "buttonBorderRadius",
  type: "text",
  inputType: "text",
  placeholder: "8px",
  valueType: "string",
});

const buttonMarginField = generateField({
  order: 23,
  frontendSlug: "buttonMargin",
  label: "Button Margin",
  name: "buttonMargin",
  type: "text",
  inputType: "text",
  placeholder: "24px auto 0 auto / 1rem auto 0 auto",
  valueType: "string",
});

const buttonPaddingField = generateField({
  order: 23,
  frontendSlug: "buttonPadding",
  label: "Button Padding",
  name: "buttonPadding",
  type: "text",
  inputType: "text",
  placeholder: "10px 12px",
  valueType: "string",
});

const buttonAlignmentField = generateField({
  order: 23,
  frontendSlug: "buttonAlignment",
  label: "Button Alignment",
  name: "buttonAlignment",
  type: "select",
  inputType: "select",
  placeholder: "Select button alignment",
  options: ["left", "center", "right"],
  valueType: "string",
});

const buttonWidthField = generateField({
  order: 23,
  frontendSlug: "buttonWidth",
  label: "Button Width",
  name: "buttonWidth",
  type: "text",
  inputType: "text",
  placeholder: "125px / 10rem / 20em",
  valueType: "string",
});

const buttonBorderField = generateField({
  order: 32,
  frontendSlug: "buttonBorder",
  label: "Button Border",
  name: "buttonBorder",
  type: "text",
  inputType: "text",
  placeholder: "1px solid #ccc",
  valueType: "string",
});

const fieldTypes = [
  {
    id: crypto.randomUUID(),
    isInput: true,
    type: "search",
    placeholder: "Search fields...",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "input",
    title: "Input",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "paragraph",
    title: "Paragraph",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "dropdown",
    title: "Dropdown",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "radioGroup",
    title: "Radio Group",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "checkbox",
    title: "Checkbox",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "checkboxGroup",
    title: "Checkbox Group",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "toggle",
    title: "Toggle",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "rating",
    title: "Rating",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "imageUpload",
    title: "Image Upload",
  },
];

export const formbuilder: FormBuilder = {
  fieldTypes,
  settings: {
    form: {
      display: [titleField, descriptionField],
      submission: [submitButtonTextField, successMessageField],
      behavior: [
        webhookUrlField,
        redirectUrlField,
        maxSubmissionsField,
        submissionDeadlineField,
      ],
      ui: [showFieldLabelsField, showRequiredAsteriskField],
      canvasStyles: [
        canvasPaddingStyleField,
        canvasBorderRadiusStyleField,
        canvasBackgroundColorStyleField,
        canvasBorderStyleField,
      ],
      gridStyles: [gridVerticalGapStyleField, gridHorizontalGapStyleField],
      headerStyles: [
        headerMarginStyleField,
        headerTextColorStyleField,
        headerTextSizeStyleField,
        headerTextWeightStyleField,
        headerAlignmentStyleField,
      ],
      descriptionStyles: [
        descriptionMarginStyleField,
        descriptionTextColorStyleField,
        descriptionTextSizeStyleField,
        descriptionTextWeightStyleField,
        descriptionAlignmentStyleField,
      ],
      buttonStyles: [
        buttonMarginField,
        buttonPaddingField,
        buttonAlignmentField,
        buttonWidthField,
        buttonBackgroundColorField,
        buttonTextColorField,
        buttonBorderField,
        buttonBorderRadiusField,
      ],
    },
    fields: {
      input: fieldSchemas.input,
      paragraph: fieldSchemas.paragraph,
      dropdown: fieldSchemas.dropdown,
      radioGroup: fieldSchemas.radioGroup,
      checkbox: fieldSchemas.checkbox,
      checkboxGroup: fieldSchemas.checkboxGroup,
      toggle: fieldSchemas.toggle,
      rating: fieldSchemas.rating,
      imageUpload: fieldSchemas.imageUpload,
    },
  },
};
