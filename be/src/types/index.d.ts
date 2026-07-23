import "express-session";

import { QueryResult, QueryResultRow } from "pg";

export type DbResult<T extends QueryResultRow> = QueryResult<T>;

export type User = {
  id: number;
  email: string;
  password: string;
  created_at: Date;
};

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      email: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
      };
    }
  }
}

export type HTMLInputType =
  | "search"
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

export type FormComponentType =
  | "search"
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
  | "dropdown"
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
  id?: string;
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
  min?: number;
  max?: number;
  valueType?: string;
  isInput?: boolean;
  options?: string[]
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

export type CanvasFieldValue = string | boolean | string[] | number;

export type CanvasFieldsValues = Record<string, CanvasFieldValue>;

export type CanvasFieldInstance = {
  id: string;
  params: CanvasFieldsValues;
  type: string;
  value: CanvasFieldValue;
};