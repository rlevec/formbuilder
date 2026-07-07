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
        inputType: "text",
        isPassword: false
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
        separateValidators: [
          {
            regex: "^.{8,100}$",
            message: "8 to 100 chars"
          },
          {
            regex: "[A-Z]",
            message: "Uppercase letter"
          },
          {
            regex: "[a-z]",
            message: "Lowercase letter"
          },
          {
            regex: "\\d",
            message: "Number"
          },
          {
            regex: "[@$!%*#?&]",
            message: "Special char"
          },
          {
            regex: "^[A-Za-z\\d@$!%*#?&]+$",
            message: "Valid characters only"
          }
        ],        
        validationPills: true,
})

export const loginFormdata:FormData = {
    header: "Log In to Your Account",
    description: "Enter your credentials to access your account.",
    button: "Log In",
    fields: [
      emailField,
      passwordField
    ],
    links: [
      {
        id: 1,
        frontendSlug: "register",
        label: "Don't have an account?",
        labelWithLink: "Register",
        route: "/registration"
      },
      {
        id: 2,
        frontendSlug: "resend-code",
        label: "Didn't receive activation code?",
        labelWithLink: "Resend it",
        route: "resend_activation"
      },
      {
        id: 3,
        frontendSlug: "forgot-password",
        label: "Forgot your password?",
        labelWithLink: "Reset it",
        route: "/forgot_password"
      },
    ]
  };