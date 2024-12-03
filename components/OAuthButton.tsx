import { handleOAuthSubmit } from "@/lib/actions";

export interface OAuthButtonProps {
  name: string;
  children: React.ReactNode;
  provider: "google" | "github";
}

export function OAuthButton({ name, children, provider }: OAuthButtonProps) {
  return (
    <>
      <form action={handleOAuthSubmit}>
        <button
          type={"submit"}
          className=" mt-5 flex justify-center items-center p-3 gap-3 border-2 w-[200px] outline-none border-[#6b7280] border-opacity-25 rounded-md"
        >
          <input type="hidden" name="provider" value={provider} />
          {children}
          <p className="font-semibold">{name}</p>
        </button>
      </form>
    </>
  );
}
