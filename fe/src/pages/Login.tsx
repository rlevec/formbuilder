import styles from "../styles/authWrapper.module.css"

import { useCustomQuery } from "../api"

import Form from "../components/Form"

export default function Login() {

    const {data, isLoading, isError } = useCustomQuery({key: "auth_login_form", fetchParams: {url: "/api/formdata/login"}})

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

    console.log("data", data)

    return (
        <main className={styles.wrapper}>
            <Form data={data.data} type={"login"}/>
        </main>
    )
}