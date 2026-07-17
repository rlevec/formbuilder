export interface FormdataResponse {
  error: boolean;
  message: string;
  data: FormData;
}


export interface FormBuilderResponse {
  message: string;
  error: boolean;
  data: FormBuilder
}



interface Data {
   code: string;
   error: boolean;
   message: string; 
}

export interface Response {
    accessToken?: string;
    data: Data;
    message: string;
    status: number;
}

export interface FieldUpdateParams {
    field: FormField,
    fieldName: string;
    value: string | boolean;
    isOptionDelete?: boolean
}

export interface HandleFieldUpdateParams {
  fieldName: string;
  value: string | boolean;
  field: FormField;
  isOptionDelete?: boolean;
}

export interface SwitchParams {
  field: FormField;
  fieldName: string;
  value: boolean;
}

export type HTMLInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "textarea"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "optionsBuilder"
  | "radioGroup"
  ;

export type FormComponentType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "textarea"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "optionsBuilder"
  | "radioGroup"
  | "checkboxGroup"
  ;

export interface FormFieldSeparateValidator {
  regex: string;
  message: string;
}

export interface FormLink {
  id: number;
  frontendSlug: string;
  label: string;
  labelWithLink: string;
  route: string;
}

export interface FormField {
  id?: number;
  name?: string;
  type?: HTMLInputType;
  inputType?: FormComponentType;
  label?: string;
  frontendSlug?: string;
  order?: number;
  placeholder?: string;
  isPassword?: boolean;
  required?: boolean;
  requiredMessage?: string;
  validator?: string;
  validationMessage?: string;
  separateValidators?: FormFieldSeparateValidator[];
  validationPills?: boolean;
  min?: string | number;
  max?: string | number;
  options?: string[];
  step?: string | number;
  value?: string | boolean | number | string[];
  description?: string;
  maxRating?: string | number;
  ratingStyle?: string;
}

export interface FormData {
  header: string;
  description: string;
  button: string;
  fields: FormField[];
  links: FormLink[];
}

export type FormBuilderSettingsField = FormField;

export interface FormBuilderSettings {
  form: Record<string, FormBuilderSettingsField[]>
  fields: Record<string, FormField[]>
}

export interface FormBuilder {
    fieldTypes: FormBuilderField[]
    settings: FormBuilderSettings;
}

export interface FormBuilderFieldTypes {
  frontendSlug: string;
  title: string;
  fields: FormBuilderField[]
}

export interface FormBuilderField {
  frontendSlug?: string;
  title?: string;
  id?: string;
  isInput?: boolean;
  type?: string;
  placeholder?: string;
}

export interface CanvasFieldConfig {
  id: string;
  fieldType: string;
  values: Record<string, string | boolean | string[]>;
}

export interface EditorState {
  activeTab: "form" | "field";
  selectedFieldId: string | null;
  formValues: Record<string, string | boolean>;
  fieldValues: Record<string, string | boolean | string[]>;
}

export type FormBuilderQueryState = Record<
  string,
  Record<string, Record<string, string | boolean>>
>;


export interface FormbuilderResponse {
  error: boolean;
  message: string;
  data?: FormBuilder;
}

export interface AuthFormResponse {
  error: boolean;
  message: string;
  data?: FormData;
}

export type CanvasFieldValue = string | boolean | string[] | number;

export type CanvasFieldsValues = Record<string, CanvasFieldValue>;

export type CanvasFieldInstance = {
  id: string;
  params: CanvasFieldsValues;
  type: string;
  value: CanvasFieldValue;
};