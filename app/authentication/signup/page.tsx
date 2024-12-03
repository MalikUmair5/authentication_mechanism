"use client";
import Button from "@/components/Button";
import Container from "@/components/container";
import Input from "@/components/Input";
import { OAuthButton } from "@/components/OAuthButton";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import Form from "next/form";
import { FormEvent, useState } from "react";
import { CreateUser, handleSignupSubmit } from "@/lib/actions";
import { RegisterUserType } from "@/lib/definations";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
type ValidationError = {
  code: string;
  minimum?: number;
  type: string;
  inclusive?: boolean;
  exact?: boolean;
  validation?: string;
  message: string;
  path: string[];
};

export default function Page() {
  let [errors, setErrors] = useState<Record<string, string | null>>({
    Name: null,
    Email: null,
    ContactNumber: null,
    Address: null,
    Password: null,
    ConfirmPassword: null,
  });
  let [dbError, setDbError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const fieldErrors: Record<string, string | null> = {};
    let errorList = await handleSignupSubmit(formData);

    if (errorList) {
      console.log(errorList);
      errorList.forEach((error: ValidationError) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      let userData: RegisterUserType = {
        name: formData.get("Name") as string,
        email: formData.get("Email") as string,
        ContactNumber: formData.get("contactNumber") as string,
        Address: formData.get("Address") as string,
        Password: formData.get("Password") as string,
      };
      let userCreation = CreateUser(userData);
      userCreation.then((response) => {
        if (response.success) {
          console.log(response);
          redirect("/");
        } else {
          if (response.message.slice(0, 6) === "E11000") {
            setDbError("Email already exists");
          } else {
            setDbError(response.message);
          }
        }
      });
    }
  };

  return (
    <>
      <section className="flex items-center justify-center flex-col">
        <h1 className="heading">Sign up to your account</h1>
        <Container>
          <Form action={"/"} onSubmit={handleSubmit}>
            <Input
              error={errors.Name}
              name="Name"
              value="Name"
              type={"text"}
            ></Input>
            <Input
              error={errors.Email}
              name="Email"
              value="Email"
              type={"email"}
            ></Input>
            <Input
              name="contactNumber"
              value={"Contact Number"}
              type={"number"}
              error={errors.ContactNumber}
            ></Input>
            <label htmlFor="contactNumber"></label>
            <Input
              error={errors.Address}
              name="Address"
              value="Address"
              type={"text"}
            ></Input>
            <Input
              name="Password"
              value={"Create Password"}
              type={"password"}
              error={errors.Password}
            ></Input>
            <Input
              name="ConfirmPassword"
              value={"Confirm Password"}
              type={"password"}
              error={errors.ConfirmPassword}
            ></Input>
            {dbError ? <p className="mt-0 text-red-500">{dbError}</p> : null}
            <Button name="Next" type={"submit"}>
              <FaArrowRight />
            </Button>
          </Form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 ">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className={"flex justify-around gap-2"}>
            <OAuthButton name={"Google"} provider={"google"}>
              <FcGoogle size={25} />
            </OAuthButton>
            <OAuthButton name={"GitHub"} provider={"github"}>
              <FaGithub size={25} />
            </OAuthButton>
          </div>
        </Container>
      </section>
    </>
  );
}
