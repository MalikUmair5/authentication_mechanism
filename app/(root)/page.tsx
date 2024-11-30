import Button from "@/components/Button";
import {signOut} from "@/auth";
import { auth } from "@/auth"
import {redirect} from "next/navigation";


export default async function Home() {
    const session = await auth()
    if(!session?.user) redirect("/authentication/Login_page")
  return(
      <>
          <h1 className={"heading"}>Welcome Umair!</h1>

          <form
              action={async () => {
                  "use server"
                  await signOut()
              }}
          >
              <Button name={"Logout"} type={"submit"}></Button>

          </form>
      </>
  )


}
