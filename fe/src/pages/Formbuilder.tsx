import styles from "../styles/formBuilderWrapper.module.css";

import FormBuilder from "../components/formbuilder/FormBuilder";

import { useCustomQuery } from "../api";

import type { FormBuilderResponse } from "../../types";

export default function Formbuilder() {
  const { data, isLoading, isError } = useCustomQuery<FormBuilderResponse>({
    key: "formbuilder_formdata",
    fetchParams: {
      url: "/api/formdata/formbuilder",
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  } else if (!data || !data?.data) {
    return <div>Response data is missing</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FormBuilder data={data?.data} />
      </main>
    </div>
  );
}
