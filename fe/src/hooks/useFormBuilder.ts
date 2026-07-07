import { useState, useMemo, useCallback, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "../api";

type CanvasFieldValue = string | boolean | string[] | number;


type CanvasFieldInstance = {
  id: string;
  fields: FormField[];
  type: string;
  value: CanvasFieldValue;
};

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
    Record<string, string | boolean | string[] | number>
  >({});

  const [selectedDefaultFieldConfig, setSelectedDefaultFieldConfig] =
    useState<SelectedDefaultFieldConfig | null>(null);

  const [fieldSettingsConfig, setFieldSettingsConfig] = useState<
    FormField[] | null
  >(null);

  const [canvasFields, setCanvasFields] = useState<CanvasFieldInstance[]>([]);

  const [selectedFormSettings, setSelectedFormSettings] = useState<Record<string, string | boolean>>({});


  const navigate = useNavigate()

  const logoutMutation = useCustomMutation({
    fetchParams: {
      url: "/api/auth/logout",
      options: { method: "POST" },
    },
    options: {
      onSuccess: () => navigate(routes.client.login, {replace: true}),
      onError: (data: Response) => console.log("error_data", data),
    },
  });

  const handleFieldUpdate = useCallback(
    ({ fieldName, value, field, isOptionDelete }: HandleFieldUpdateParams) => {
      const inputType = field?.inputType;

      const normalizedValue =
        inputType === "switch" ? !Boolean(value) : String(value);

      if (activeSettings === "form") {
        setFormConfigQuery((prev) => ({
          ...prev,
          [fieldName]: normalizedValue,
        }));
        return;
      }

      if (inputType === "optionsBuilder") {
        setFieldConfigQuery((prev) => {
          const current = prev[fieldName];
          const list = Array.isArray(current) ? current : [];

          if (isOptionDelete) {
            return {
              ...prev,
              [fieldName]: list.filter((v) => v !== value),
            };
          }

          if (list.includes(String(value))) return prev;

          return {
            ...prev,
            [fieldName]: [...list, String(value)],
          };
        });

        return;
      }

      setFieldConfigQuery((prev) => ({
        ...prev,
        [fieldName]: normalizedValue,
      }));
    },
    [activeSettings],
  );

  const { inputFields, fieldTypes } = useMemo(() => {
    const list = Array.isArray(data.fieldTypes) ? data.fieldTypes : [];

    const inputFields: FormBuilderField[] = [];
    const fieldTypesArr: FormBuilderField[] = [];

    for (const el of list) {
      if (!el) continue;

      if (el.isInput) {
        inputFields.push(el);
      } else {
        fieldTypesArr.push(el);
      }
    }

    return {
      inputFields,
      fieldTypes: fieldTypesArr,
    };
  }, [data.fieldTypes]);

  const handleTabChange = useCallback(
    (type: "field" | "form") => setActiveSettings(type),
    [],
  );

  const handleDragStart = useCallback((startId: string): void => {
    if (!startId) return;

    dragStartIdRef.current = startId;
  }, []);

  const handleDragOver = useCallback((dragId: string): void => {
    if (!dragId) return;

    dragOverIdRef.current = dragId;
  }, []);

  const handleDrop = useCallback((dropId: string) => {
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
  }, []);

  const handleDragEnd = useCallback(() => {
    dragStartIdRef.current = null;
    dragOverIdRef.current = null;
  }, []);

  const handleSelectDefaultFieldConfig = useCallback(
    ({ slug, id }: { slug: string; id: string }) => {
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
    },
    [data.settings.fields],
  );

  const handleAddFieldToCanvas = useCallback(() => {
    const fields =
      fieldSettingsConfig?.map((el) => ({
        ...el,
        value: el.name ? fieldConfigQuery[el.name] : "",
      })) ?? [];

    const canvasFieldObject = {
      id: crypto.randomUUID(),
      fields,
      value: getDefaultValue(selectedDefaultFieldConfig?.slug ?? ""),
      type: selectedDefaultFieldConfig ? selectedDefaultFieldConfig.slug : "",
    };

    setCanvasFields((prev) => [...prev, canvasFieldObject]);
  }, [fieldConfigQuery, fieldSettingsConfig, selectedDefaultFieldConfig]);

  const handleUpdateFieldInCanvas = useCallback(() => {
    setCanvasFields((prev) => {
      return prev.map((item) => {
        if (item.id !== canvasFieldSelected) return item;

        return {
          ...item,
          fields: item.fields.map((field) => ({
            ...field,
            value: field.name ? fieldConfigQuery[field.name] : "",
          })),
        };
      });
    });
  }, [fieldConfigQuery, canvasFieldSelected]);

  const handleSelectCanvasField = useCallback(
    (canvasEntry: CanvasFieldInstance) => {
      if (!canvasEntry) return;

      const fields = canvasEntry.fields;

      const queryObj: Record<string, string | boolean | string[] | number> = {};

      for (const el of fields) {
        const name = el.name ?? null;
        const value = el.value ?? null;

        if (name && value) queryObj[name] = value;
      }

      setFieldConfigQuery(queryObj);
      setCanvasFieldSelected(canvasEntry.id);
    },
    [],
  );
  const updateCanvasFieldValue = useCallback(
    (id: string, value: boolean | string | string[] | number) => {
      setCanvasFields((prev) => {
        if (!prev) return prev;

        return prev.map((item) => {
          if (item.id !== id) return item;

          if (item.type === "checkboxGroup") {
            const current = Array.isArray(item.value) ? item.value : [];

            return {
              ...item,
              value: current.includes(String(value))
                ? current.filter((v) => v !== value)
                : [...current, String(value)],
            };
          }

          return {
            ...item,
            value,
          };
        });
      });
    },
    [],
  );

  const updateFormSetting = useCallback(() => {
    setSelectedFormSettings((prev) => ({
      ...prev,
      ...formConfigQuery,
    }));
  }, [formConfigQuery]);


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
