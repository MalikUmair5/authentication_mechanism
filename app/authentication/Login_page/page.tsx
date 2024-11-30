import Button from "@/components/Button";
import Container from "@/components/container";
import Input from "@/components/Input";
import { OAuthButton } from "@/components/OAuthButton";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Form from "next/form";
import {auth} from "@/auth";
import {redirect} from "next/navigation";



export default async function Page() {
   const session = await auth();
   if(session?.user) return redirect("/")
    return (
        <>
            <section className="flex items-center justify-center h-screen flex-col">
                <h1 className="heading">Sign up to your account</h1>
                <Container>
                    <Form action={"/"}>
                        <Input name="Email" type={"email"} ></Input>
                        <Input name={"password"} type={"password"}></Input>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-start items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="my-5 w-[20px] h-[20px]"
                                    value={"Remember me"}
                                />
                                <p>Remember me</p>
                            </div>
                            <Link href={"/public"} className="text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                        <Button name="Login" type={"submit"}></Button>
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
