import Button from "@/components/Button";
import Container from "@/components/container";
import Input from "@/components/Input";
import { OAuthButton } from "@/components/OAuthButton";
import { FcGoogle } from "react-icons/fc";
import {FaArrowRight, FaGithub} from "react-icons/fa";
import Form from "next/form";




export default function Page() {
  return (
    <>
      <section className="flex items-center justify-center h-screen flex-col">
        <h1 className="heading">Sign up to your account</h1>
        <Container>
          <Form action={"/"}>
            <Input name="Name" type={"text"}></Input>
          <Input name="Email" type={"email"} ></Input>
            <Input name={"Contact Number"} type={"number"}></Input>
          <Button name="Next" type={"submit"}><FaArrowRight/></Button>
          </Form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 ">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className={"flex justify-around gap-2"}>
            <OAuthButton name={"Google"} provider={"google"}>
              <FcGoogle size={25}/>
            </OAuthButton>
            <OAuthButton name={"GitHub"} provider={"github"}>
              <FaGithub size={25}/>
            </OAuthButton>
          </div>
        </Container>
      </section>
    </>
  );
}
