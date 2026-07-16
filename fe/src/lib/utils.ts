import {
  Type,
  AlignLeft,
  Hash,
  Calendar,
  Mail,
  Phone,
  Image,
  Paperclip,
  ToggleLeft,
  ChevronDown,
  CheckSquare,
  ListChecks,
  SlidersHorizontal,
  Star,
  SeparatorHorizontal,
  Heading,
  TextCursorInput,
  Columns3,
} from "lucide-react";

export const FIELD_ICONS = {
  shortText: Type,
  paragraph: AlignLeft,
  number: Hash,
  date: Calendar,
  email: Mail,
  phone: Phone,
  imageUpload: Image,
  fileUpload: Paperclip,
  toggle: ToggleLeft,
  dropdown: ChevronDown,
  checkbox: CheckSquare,
  checkboxGroup: ListChecks,
  radioGroup: ListChecks,
  rating: Star,
  range: SlidersHorizontal,
  heading: Heading,
  paragraphText: AlignLeft,
  divider: SeparatorHorizontal,
  section: TextCursorInput,
  columns: Columns3,
  default: Type,
} as const;


export const formatFieldName = (value: string) =>
  value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();


export const getStringSetting = ({
    key,
    fallback,
    settings
  }: {key: string, fallback: string, settings: Record<string, string | boolean>}): string => {
    const value = settings?.[key];

    return typeof value === "string" ? value : fallback;
  };
