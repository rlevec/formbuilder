import styles from "../styles/formBuilderWrapper.module.css"

import FormBuilder from "../components/FormBuilder"

import { useCustomQuery } from "../api"

export default function Formbuilder() {

        const {data, isLoading, isError } = useCustomQuery({key: "formbuilder_formdata", fetchParams: {url: "/api/formdata/formbuilder"}})

    console.log("data", data)
    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    else if(isError) {
        return (
            <div>Error</div>
        )
    }

    return (
        <div className={styles.page}>
      <main className={styles.main}>
         <FormBuilder data={data.data}/>
      </main>
    </div>
    )
}