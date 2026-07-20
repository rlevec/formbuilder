import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "../api";

import type {
  CanvasFieldInstance,
  CanvasFieldsValues,
  CanvasFieldValue,
} from "../../types";

type SelectedDefaultFieldConfig = {
  slug: string;
  id: string;
};

import {
  type FormBuilder,
  type FormBuilderField,
  type HandleFieldUpdateParams,
  type FormField,
} from "../../types";
import { routes } from "../router/routes";

const getDefaultValue = (type: string): CanvasFieldValue => {
  switch (type) {
    case "toggle":
    case "checkbox":
      return false;

    case "checkboxGroup":
      return [];

    case "rating":
      return 0;

    default:
      return "";
  }
};

export default function useFromBuilder(data: FormBuilder) {
  const dragOverIdRef = useRef<string | null>(null);

  const dragStartIdRef = useRef<string | null>(null);

  const [canvasFieldSelected, setCanvasFieldSelected] = useState<string | null>(
    null,
  );

  const [activeSettings, setActiveSettings] = useState<"field" | "form">(
    "form",
  );

  const [formConfigQuery, setFormConfigQuery] = useState<
    Record<string, string | boolean>
  >({});

  const [fieldConfigQuery, setFieldConfigQuery] = useState<
    Record<string, CanvasFieldValue>
  >({});

  const [selectedDefaultFieldConfig, setSelectedDefaultFieldConfig] =
    useState<SelectedDefaultFieldConfig | null>(null);

  const [fieldSettingsConfig, setFieldSettingsConfig] = useState<
    FormField[] | null
  >(null);

  const [canvasFields, setCanvasFields] = useState<CanvasFieldInstance[]>([]);

  const [selectedFormSettings, setSelectedFormSettings] = useState<
    Record<string, string | boolean>
  >({});

  const navigate = useNavigate();

  const list = Array.isArray(data.fieldTypes) ? data.fieldTypes : [];

  const inputFields: FormBuilderField[] = [];
  const fieldTypes: FormBuilderField[] = [];

  for (const el of list) {
    if (!el) continue;

    if (el.isInput) {
      inputFields.push(el);
    } else {
      fieldTypes.push(el);
    }
  }

  const logoutMutation = useCustomMutation({
    fetchParams: {
      url: "/api/auth/logout",
      options: { method: "POST" },
    },
    options: {
      onSuccess: () => navigate(routes.client.login, { replace: true }),
      onError: () => {},
    },
  });

  const handleFieldUpdate = ({
    fieldName,
    value,
    field,
    isOptionDelete,
  }: HandleFieldUpdateParams) => {
    const inputType = field?.inputType;

    const arrValField = ["optionsBuilder", "checkboxGroup"];
    const isArrValField = inputType ? arrValField.includes(inputType) : false;

    const normalizedValue = inputType === "switch" ? !value : String(value);

    if (activeSettings === "form") {
      setFormConfigQuery((prev) => ({
        ...prev,
        [fieldName]: normalizedValue,
      }));
      return;
    }

    if (isArrValField) {
      setFieldConfigQuery((prev) => {
        const current = prev[fieldName];

        const list =
          Array.isArray(current) &&
          current.every((item) => typeof item === "string")
            ? current
            : [];

        const stringValue = String(value);

        if (inputType === "optionsBuilder") {
          if (isOptionDelete) {
            return {
              ...prev,
              [fieldName]: list.filter((v) => v !== stringValue),
            };
          }

          if (list.includes(stringValue)) {
            return prev;
          }

          return {
            ...prev,
            [fieldName]: [...list, stringValue],
          };
        }

        // checkboxGroup
        return {
          ...prev,
          [fieldName]: list.includes(stringValue)
            ? list.filter((v) => v !== stringValue)
            : [...list, stringValue],
        };
      });

      return;
    }

    setFieldConfigQuery((prev) => ({
      ...prev,
      [fieldName]: normalizedValue,
    }));
  };

  const handleTabChange = (type: "field" | "form") => setActiveSettings(type);

  const handleDragStart = (startId: string): void => {
    if (!startId) return;

    dragStartIdRef.current = startId;
  };

  const handleDragOver = (dragId: string): void => {
    if (!dragId) return;

    dragOverIdRef.current = dragId;
  };

  const handleDrop = (dropId: string) => {
    const startId = dragStartIdRef.current;

    if (!startId || !dropId) return;

    setCanvasFields((prev) => {
      const current = [...prev];

      const matchStartIdx = current.findIndex((el) => el.id === startId);
      const matchEndIdx = current.findIndex((el) => el.id === dropId);

      if (matchStartIdx === -1 || matchEndIdx === -1) return prev;

      const temp = current[matchStartIdx];
      current[matchStartIdx] = current[matchEndIdx];
      current[matchEndIdx] = temp;

      return current;
    });

    dragStartIdRef.current = null;
    dragOverIdRef.current = null;
  };

  const handleDragEnd = () => {
    dragStartIdRef.current = null;
    dragOverIdRef.current = null;
  };

  const handleSelectDefaultFieldConfig = ({
    slug,
    id,
  }: {
    slug: string;
    id: string;
  }) => {
    setSelectedDefaultFieldConfig((prev) => {
      if (prev?.id === id) return prev;
      return { slug, id };
    });

    const fields = data.settings.fields;
    const targetConfig = fields[slug] ?? [];

    if (Array.isArray(targetConfig) && targetConfig.length > 0) {
      setFieldConfigQuery({});
      setFieldSettingsConfig(targetConfig);
      setActiveSettings("field");
      setCanvasFieldSelected(null);
    }
  };

  const handleAddFieldToCanvas = () => {
    const params: CanvasFieldsValues = {};

    if (Array.isArray(fieldSettingsConfig) && fieldSettingsConfig.length > 0) {
      for (const item of fieldSettingsConfig) {
        const name = item.name ?? "";

        params[name] = name ? fieldConfigQuery[name] : "";
      }
    }

    const canvasFieldObject: CanvasFieldInstance = {
      id: crypto.randomUUID(),
      params,
      value: getDefaultValue(selectedDefaultFieldConfig?.slug ?? ""),
      type: selectedDefaultFieldConfig?.slug ?? "",
    };

    setCanvasFields((prev) => [...prev, canvasFieldObject]);
    setSelectedDefaultFieldConfig(null);
  };

  const handleUpdateFieldInCanvas = () => {
    setCanvasFields((prev) => {
      return prev.map((item) => {
        if (item.id !== canvasFieldSelected) return item;

        return {
          ...item,
          params: Object.fromEntries(
            Object.keys(item.params).map((key) => [
              key,
              fieldConfigQuery[key] ?? item.params[key],
            ]),
          ),
        };
      });
    });
  };

  const handleSelectCanvasField = (canvasEntry: CanvasFieldInstance) => {
    if (!canvasEntry) return;

    const inputType = canvasEntry.type;

    const dataFields = data?.settings?.fields;

    const matchFields = dataFields?.[inputType];

    const queryObj: CanvasFieldsValues = {};

    if (!matchFields) return;

    for (const el of matchFields) {
      const name = el.name ?? "";

      if (name && canvasEntry.params[name] !== undefined) {
        queryObj[name] = canvasEntry.params[name];
      }
    }

    setFieldConfigQuery(queryObj);
    setCanvasFieldSelected(canvasEntry.id);
  };

  const updateCanvasFieldValue = (
    id: string,
    value: boolean | string | string[] | number,
  ) => {
    setCanvasFields((prev) => {
      if (!prev) return prev;

      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          value,
        };
      });
    });
  };

  const updateFormSetting = () => {
    setSelectedFormSettings((prev) => ({
      ...prev,
      ...formConfigQuery,
    }));
  };

  return {
    dragOverIdRef,
    dragStartIdRef,
    activeSettings,
    setActiveSettings,
    formConfigQuery,
    setFormConfigQuery,
    fieldConfigQuery,
    setFieldConfigQuery,
    selectedDefaultFieldConfig,
    setSelectedDefaultFieldConfig,
    fieldSettingsConfig,
    setFieldSettingsConfig,
    canvasFields,
    setCanvasFields,
    logoutMutation,
    handleFieldUpdate,
    inputFields,
    fieldTypes,
    handleTabChange,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    handleDrop,
    handleSelectDefaultFieldConfig,
    formSettings: data.settings.form,
    canvasFieldSelected,
    handleAddFieldToCanvas,
    handleUpdateFieldInCanvas,
    handleSelectCanvasField,
    updateCanvasFieldValue,
    updateFormSetting,
    selectedFormSettings,
  };
}
