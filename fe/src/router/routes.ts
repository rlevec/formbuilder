export const routes: Record<string, Record<string, string>> = {
    server: {
        login: "/api/login",
        logout: "/api/auth/logout",
        registration: "/api/registration",
        formbuilder: "/api/formbuilder",
        saveTemplate: "/api/formbuilder/template/save",
        getTemplates: "/api/formbuilder/templates"
    },
    client: {
        root: "/",
        login: "/login",
        registration: "/registration"
    }
}