
interface InputProps {
  name: string;
    type: "text" | "password" | "email" | "number";
}

export default function Input({ name, type }: InputProps) {
  return (
      <div className=" my-5">
        <p className="mb-2">{name}</p>
          <input
            type={type}
            name={name}
            className="focus:border-blue-500 focus:border-[2px] border-2 outline-none border-[#6b7280] border-opacity-25 rounded-md p-2 w-full"
            required
          />
      </div>
  );
}
