import styles from "../styles/form.module.css";

import type { FormData } from "../../types";

import TextField from "./TextField";
import FormLink from "./FormLink";
import Button from "./Button";

import useForm from "../hooks/useForm";

export default function Form({ data, type }: { data: FormData; type: string }) {
  const {
    query,
    fieldError,
    formError,
    isFormValid,
    handleChange,
    handleSubmit,
  } = useForm({ data, type });

  return (
    <form
      aria-labelledby="form-title"
      className={styles.form}
      onSubmit={(event) => handleSubmit(event)}
    >
      <header className={styles.header}>
        <h1 id="form-title" className={styles.headerTitle}>
          {data.header}
        </h1>
        <p className={styles.headerDescription}>{data.description}</p>
        {formError && <div className={styles.formError}>{formError}</div>}
      </header>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Form fields</legend>
        {data.fields.map((fieldEntry) => (
          <TextField
            key={fieldEntry.id}
            field={fieldEntry}
            value={(fieldEntry.name ? query[fieldEntry.name] : "")?.toString()}
            onChange={handleChange}
            error={fieldEntry.name ? fieldError?.[fieldEntry.name] : ""}
          />
        ))}
      </fieldset>
      <nav className={styles.footer} aria-label="Form links">
        <ul className={styles.linkList}>
          {data.links.map((linkEntry) => (
            <FormLink key={linkEntry.id} link={linkEntry} />
          ))}
        </ul>
      </nav>
      <Button
        disabled={!isFormValid}
        title={data.button}
        type="submit"
        additionalClassName={styles.submitButton}
      />
    </form>
  );
}
