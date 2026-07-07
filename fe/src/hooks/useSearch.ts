import { useState, useCallback, useRef } from "react";

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
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onChange = useCallback((value: string) => {
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
  }, [delay, data, filter]); 

  return {
    search,
    setSearch: onChange,
    results,
  };
}