import styles from "../styles/authWrapper.module.css";

import { useCustomQuery } from "../api";

import Form from "../components/form/Form";

import type { AuthFormResponse } from "../../types";

export default function Registration() {
  const { data, isLoading, isError } = useCustomQuery<AuthFormResponse>({
    key: "auth_login_form",
    fetchParams: { url: "/api/formdata/registration" },
  });


  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  } else if (!data || !data?.data) {
    return <div>Response data is missins</div>;
  }

  return (
    <main className={styles.wrapper}>
      <Form data={data.data} type={"registration"} />
    </main>
  );
}
