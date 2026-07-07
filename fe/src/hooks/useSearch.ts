import { useState, useRef } from "react";

import type { FormBuilderField } from "../../types";

type UseSearchOptions<FormBuilderField> = {
  delay?: number;
  data: FormBuilderField[];
  filter: (item: FormBuilderField, query: string) => boolean;
};

export function useSearch({
  delay = 250,
  data,
  filter,
}: UseSearchOptions<FormBuilderField>) {
  const [search, setSearch] = useState("");

  const [results, setResults] = useState<FormBuilderField[]>(data);

 const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (value: string) => {
    setSearch(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!value) {
        setResults(data);
      } else {
        const filtered = data.filter((item) =>
          filter(item, value.toLowerCase())
        );
        setResults(filtered);
      }
    }, delay);
  }

  return {
    search,
    setSearch: onChange,
    results,
  };
}