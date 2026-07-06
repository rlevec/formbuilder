import { registerFormdata } from "../formdata/register.formdata";
import { loginFormdata } from "../formdata/login.formdata";
import { formbuilder } from "../formdata/formbuilder.formdata";

import { throwNewError } from "../utils/global.utils";

const FORMDATA_MAP = {
    login: loginFormdata,
    register: registerFormdata,
    formbuilder: formbuilder
} as const;

export const getFormdata = ({type}: {type:string}) => {
        if (!type || !(type in FORMDATA_MAP)) {
            return throwNewError(400, "Invalid type param");
        }
    
        const formdata = FORMDATA_MAP[type as keyof typeof FORMDATA_MAP];
    
        if (!formdata) {
            return throwNewError(400, "Invalid formdata for provided type");
        }

        return {
            error: false, 
            message: `You have successfully fetched ${type} formdata` , 
            data: formdata
        }
}