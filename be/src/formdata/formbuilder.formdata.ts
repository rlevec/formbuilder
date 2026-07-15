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

export const generateBaseFieldProperties = ({
  type,
}: {
  type: FieldType;
}): FormField[] => {
  const fields: FormField[] = [
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
      placeholder: "",
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
      order: 1,
      name: "label",
      label: "Field Label",
      type: "text",
      inputType: "text",
      placeholder: "Enter field label",
    }),

    generateField({
      id: crypto.randomUUID(),
      order: 33,
      frontendSlug: "labelMargin",
      label: "Label Margin",
      name: "labelMargin",
      type: "text",
      inputType: "text",
      placeholder: "0 0 24px 0",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 33,
      frontendSlug: "labelTextColor",
      label: "Label Text Color",
      name: "labelTextColor",
      type: "text",
      inputType: "text",
      placeholder: "#000",
      valueType: "string",
    }),

    generateField({
      id: crypto.randomUUID(),
      order: 30,
      frontendSlug: "focusedLabelColor",
      label: "Focused Label Color",
      name: "focusedLabelColor",
      type: "text",
      inputType: "text",
      placeholder: "#ffffff",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 30,
      frontendSlug: "labelFontWeight",
      label: "Label Font Weight",
      name: "labelFontWeight",
      options: fontWeights,
      type: "select",
      inputType: "select",
      placeholder: "Select label font weight",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 33,
      frontendSlug: "labelFontSize",
      label: "Label Font Size",
      name: "labelFontSize",
      type: "text",
      options: fontSizes,
      inputType: "select",
      placeholder: "Select label size",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 30,
      frontendSlug: "fieldBackgroundColor",
      label: "Field Background Color",
      name: "fieldBackgroundColor",
      type: "text",
      inputType: "text",
      placeholder: "#ffffff",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 30,
      frontendSlug: "fieldTextColor",
      label: "Field Text Color",
      name: "fieldTextColor",
      type: "text",
      inputType: "text",
      placeholder: "#ffffff",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 30,
      frontendSlug: "focusedFieldBorderColor",
      label: "Focused Field Border Color",
      name: "focusedFieldBorderColor",
      type: "text",
      inputType: "text",
      placeholder: "#ffffff",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 30,
      frontendSlug: "fieldFontWeight",
      label: "Field Font Weight",
      name: "fieldFontWeight",
      options: fontWeights,
      type: "select",
      inputType: "select",
      placeholder: "Select font weight",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 31,
      frontendSlug: "fieldPadding",
      label: "Field Padding",
      name: "fieldPadding",
      type: "text",
      inputType: "text",
      placeholder: "10px 12px",
      valueType: "string",
    }),

    generateField({
      id: crypto.randomUUID(),
      order: 32,
      frontendSlug: "fieldBorderRadius",
      label: "Field Border Radius",
      name: "fieldBorderRadius",
      type: "text",
      inputType: "text",
      placeholder: "8px",
      valueType: "string",
    }),

    generateField({
      id: crypto.randomUUID(),
      order: 33,
      frontendSlug: "fieldBorder",
      label: "Field Border",
      name: "fieldBorder",
      type: "text",
      inputType: "text",
      placeholder: "1px solid #fff",
      valueType: "string",
    }),
    generateField({
      id: crypto.randomUUID(),
      order: 33,
      frontendSlug: "fieldFontSize",
      label: "Field Font Size",
      name: "fieldFontSize",
      type: "text",
      options: fontSizes,
      inputType: "select",
      placeholder: "Select font size",
      valueType: "string",
    }),
  ];

  switch (type) {
    case "input": {
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 6,
          name: "inputType",
          label: "Input Type",
          type: "select",
          inputType: "select",
          placeholder: "Select input type",
          options: ["text", "number", "email", "phone", "date"]
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
      );
    }
    case "number":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "placeholder",
          label: "Placeholder",
          type: "text",
          inputType: "text",
          placeholder: "Enter number",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 5,
          name: "min",
          label: "Min Value",
          type: "number",
          inputType: "text",
          placeholder: "0",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 6,
          name: "max",
          label: "Max Value",
          type: "number",
          inputType: "text",
          placeholder: "100",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 7,
          name: "step",
          label: "Step",
          type: "number",
          inputType: "text",
          placeholder: "1",
        }),
      );
      break;
    case "shortText":
      fields.push(
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
      );
      break;
    case "date":
      fields.push(
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
      );
      break;
    case "paragraph":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "placeholder",
          label: "Placeholder",
          type: "text",
          inputType: "text",
          placeholder: "Enter placeholder text",
        }),
      );
      break;
    case "rating":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "maxRating",
          label: "Maximum Rating",
          type: "number",
          inputType: "text",
          placeholder: "e.g. 5",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 7,
          name: "ratingStyle",
          label: "Style",
          type: "select",
          inputType: "select",
          options: ["stars", "hearts", "emoji"],
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 9,
          name: "allowClear",
          label: "Allow Clear",
          type: "switch",
          inputType: "switch",
        }),
      );
      break;
    case "dropdown":
    case "radioGroup":
    case "checkboxGroup":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "dropdownOptions",
          label: "Options",
          type: "text",
          inputType: "optionsBuilder",
          placeholder: `Add ${type
            .split(/(?=[A-Z])/)
            .map((el) => el.toLowerCase())
            .join(" ")} option`,
        }),
      );
      break;
    case "email":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "placeholder",
          label: "Placeholder",
          type: "text",
          inputType: "text",
          placeholder: "example@email.com",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 5,
          name: "allowMultiple",
          label: "Allow Multiple Emails",
          type: "switch",
          inputType: "switch",
        }),
      );
      break;
    case "phone":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "placeholder",
          label: "Placeholder",
          type: "text",
          inputType: "text",
          placeholder: "+1 234 567 890",
        }),
      );
      break;
    case "imageUpload":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "allowedImageTypes",
          label: "Allowed Image Types",
          type: "select",
          inputType: "checkboxGroup",
          options: ["jpg", "jpeg", "png", "webp"],
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 5,
          name: "multiple",
          label: "Allow Multiple Images",
          type: "switch",
          inputType: "switch",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 6,
          name: "maxFiles",
          label: "Max Files",
          type: "number",
          inputType: "text",
          placeholder: "e.g. 3",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 7,
          name: "maxFileSizeMB",
          label: "Max File Size (MB)",
          type: "number",
          inputType: "text",
          placeholder: "e.g. 5",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 8,
          name: "showPreview",
          label: "Show Preview",
          type: "switch",
          inputType: "switch",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 9,
          name: "aspectRatio",
          label: "Aspect Ratio",
          type: "select",
          inputType: "select",
          options: ["free", "1:1", "4:3", "16:9"],
        }),
      );
      break;
    case "fileUpload":
      fields.push(
        generateField({
          id: crypto.randomUUID(),
          order: 4,
          name: "allowedFileTypes",
          label: "Allowed File Types",
          type: "text",
          inputType: "optionsBuilder",
          placeholder: "pdf, docx, xlsx, zip",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 5,
          name: "multiple",
          label: "Allow Multiple Files",
          type: "switch",
          inputType: "switch",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 6,
          name: "maxFiles",
          label: "Max Files",
          type: "number",
          inputType: "text",
          placeholder: "e.g. 5",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 7,
          name: "maxFileSizeMB",
          label: "Max File Size (MB)",
          type: "number",
          inputType: "text",
          placeholder: "e.g. 10",
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 8,
          name: "uploadStyle",
          label: "Upload Style",
          type: "select",
          inputType: "radioGroup",
          options: ["button", "dragAndDrop"],
        }),
        generateField({
          id: crypto.randomUUID(),
          order: 9,
          name: "showFileName",
          label: "Show File Name",
          type: "switch",
          inputType: "switch",
        }),
      );
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
      /*
  {
    id: crypto.randomUUID(),
    frontendSlug: "shortText",
    title: "Short Text",
  },

  {
    id: crypto.randomUUID(),
    frontendSlug: "number",
    title: "Number",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "email",
    title: "Email",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "phone",
    title: "Phone",
  },
  {
    id: crypto.randomUUID(),
    frontendSlug: "date",
    title: "Date",
  },
  */
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
  {
    id: crypto.randomUUID(),
    frontendSlug: "fileUpload",
    title: "File Upload",
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
      //shortText: fieldSchemas.shortText,
      input: fieldSchemas.input,
      paragraph: fieldSchemas.paragraph,
      //number: fieldSchemas.number,
      //email: fieldSchemas.email,
      //phone: fieldSchemas.phone,
      //date: fieldSchemas.date,
      dropdown: fieldSchemas.dropdown,
      radioGroup: fieldSchemas.radioGroup,
      checkbox: fieldSchemas.checkbox,
      checkboxGroup: fieldSchemas.checkboxGroup,
      toggle: fieldSchemas.toggle,
      rating: fieldSchemas.rating,
      imageUpload: fieldSchemas.imageUpload,
      fileUpload: fieldSchemas.fileUpload,
    },
  },
};
