export const routes: Record<string, Record<string, string>> = {
    server: {
        login: "/api/login",
        registration: "/api/registration",
        formbuilder: "/api/formbuilder",
    },
    client: {
        root: "/",
        login: "/login",
        registration: "/registration"
    }
}