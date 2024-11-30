interface ButtonProps {
  name: string;
  type: "submit" | "reset";
  children?: JSX.Element;
}

export default function Button({ name, type, children }: ButtonProps) {
  return (
    <>
      <button type={type} className="bg-blue-500 text-white p-3 rounded-md w-full flex justify-center items-center gap-2">
       <p>{name}</p>
          {children}
      </button>
    </>
  );
}
