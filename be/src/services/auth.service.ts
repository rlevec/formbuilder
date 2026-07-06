import type { RegisterInput, LoginInput } from "../validators/auth.schema"

import { findUserByEmail, createUser } from "../repositories/auth.repository"

import { throwNewError } from "../utils/global.utils"

import { hashPassword, comparePassword } from "../utils/auth.utils"


export const login = async (body: LoginInput) => {
  const user = await findUserByEmail(body.email as string);

  if (!user) throwNewError(400, "Invalid credentials!");

  const passwordMatch = await comparePassword({
    password: body.password as string,
    hashedPassword: user.password,
  });

  if (!passwordMatch) throwNewError(400, "Invalid credentials!");

  return {
    id: user.id,
    email: user.email,
  };
};

export const register = async(body: RegisterInput) => {
    
    const exists = await findUserByEmail(body.email as string)

    if(exists) throwNewError(400, "Duplicate email!")

    const hashedPassword = await hashPassword(body.password as string);

    const createUserResponse = await createUser({
        email: body.email as string,
        password: hashedPassword,
    });

    if(!createUserResponse) throwNewError(400, "User DB creation error!")

    return {
        error: false,
        message: "You have successfully registered!",
    }
}