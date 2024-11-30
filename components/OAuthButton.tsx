import { signIn } from "@/auth"

export interface OAuthButtonProps {
  name: string;
  children: React.ReactNode;
  provider: "google" | "github";
}

export function OAuthButton({ name, children, provider }: OAuthButtonProps) {
  return (
    <>
        <form action={async ()=>{
            "use server"
            await signIn(`${provider}`, {redirectTo: "/"})
        }}>

      <button type={"submit"} className=" mt-5 flex justify-center items-center p-3 gap-3 border-2 w-[200px] outline-none border-[#6b7280] border-opacity-25 rounded-md">
          {children}
          <p className="font-semibold">{name}</p>
      </button>
        </form>

    </>
  );
}
