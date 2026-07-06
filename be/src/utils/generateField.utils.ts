import crypto from 'crypto';

import type {FormField} from '../types';

export const generateField = ({
  name,
  type,
  inputType,
  label,
  frontendSlug,
  order,
  placeholder,
  isPassword,
  required,
  requiredMessage,
  validator,
  validationMessage,
  separateValidators,
  validationPills,
  min,
  max,
  valueType,
  options
}: FormField): FormField => {
  return {
    id: crypto.randomUUID(),
    ...(name !== undefined && { name }),
    ...(type !== undefined && { type }),
    ...(inputType !== undefined && { inputType }),
    ...(label !== undefined && { label }),
    ...(frontendSlug !== undefined && { frontendSlug }),
    ...(order !== undefined && { order }),
    ...(placeholder !== undefined && { placeholder }),
    ...(isPassword !== undefined && { isPassword }),
    ...(required !== undefined && { required }),
    ...(requiredMessage !== undefined && { requiredMessage }),
    ...(validator !== undefined && { validator }),
    ...(validationMessage !== undefined && { validationMessage }),
    ...(separateValidators !== undefined && { separateValidators }),
    ...(validationPills !== undefined && { validationPills }),
    ...(min !== undefined && { min }),
    ...(max !== undefined && { max }),
    ...(valueType !== undefined && { valueType }),
    ...(options !== undefined && { options }),
  };
};