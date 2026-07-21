import { z } from "zod";
import type { FormField } from "../../types";

export const buildZodSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    if (!field.name) continue;

    let schema = z.string().trim();

    const hasSeparateValidators =
      Array.isArray(field.separateValidators) &&
      field.separateValidators.length > 0;


    if (field.required) {
      schema = schema.min(1, field.requiredMessage || "Required");
    } else {
      schema = schema.optional() as unknown as z.ZodString;
    }

    if (field.validator && !hasSeparateValidators) {
      try {
        const regex = new RegExp(field.validator);

        schema = schema.regex(
          regex,
          field.validationMessage || `Invalid ${field.name}`
        );
      } catch {
        console.warn(`Invalid regex for field: ${field.name}`);
      }
    }

  
    if (hasSeparateValidators) {
      for (const v of field.separateValidators!) {
        try {
          const regex = new RegExp(v.regex);
          schema = schema.regex(regex, v.message);
        } catch {
          console.warn(
            `Invalid regex in separateValidators for field: ${field.name}`
          );
        }
      }
    }

    shape[field.name] = schema;
  }

  return z.object(shape);
};