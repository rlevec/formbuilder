import type { FormData } from "../types";

import { generateField } from "../utils/generateField.utils";

const emailField = generateField({
        order: 1,
        frontendSlug: "email",
        placeholder: "Enter your email address...",
        name: "email",
        type: "email",
        validator:
          '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        validationMessage: "Please enter a valid email address.",
        requiredMessage: "Email is required!",
        required: true,
        isPassword: false,
        inputType: "text",
})

const passwordField = generateField({
        order: 2,
        isPassword: true,
        frontendSlug: "password",
        placeholder: "Enter your password...",
        name: "password",
        type: "password",
        validator: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
        validationMessage:
          "Password must be at least 8 characters long and contain at least one letter and one number.",
        requiredMessage: "Password is required!",
        required: true,
        inputType: "text",
})

export const registerFormdata: FormData = {
    header: "Create Your Account",
    description: "Complete all fields below to set up your account.",
    button: "Create Account",
    fields: [
      emailField,
      passwordField
    ],
    links: [
      {
        id: 1,
        frontendSlug: "login",
        label: "Already have an account?",
        labelWithLink: "Log In",
        route: "/login"
      }
    ]
  };