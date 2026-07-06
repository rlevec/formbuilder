import { Request, Response } from "express";

import { getFormdata } from "../services/formdata.service";

export const formdataController = async (
    req: Request<{ type: string }>,
    res: Response
) => {
    const type = req.params.type;

    const formdata = getFormdata({type})

    return res.json(formdata);
};