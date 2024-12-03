interface InputProps {
  value: string;
  type: "text" | "password" | "email" | "number";
  name: string;
  error: string | null;
}

export default function Input({ value, type, name, error }: InputProps) {
  return (
    <div className="my-5 relative">
      <p className={`mb-0 ${error ? "text-red-700" : ""}`}>{value}</p>
      <div className="relative">
        <input
          type={type}
          name={name}
          className={`focus:border-blue-500 focus:border-[2px] border-2 outline-none ${
            error ? "border-red-700" : "border-[#6b7280]"
          } border-opacity-25 rounded-md p-2 w-full mb-0`}
        />
        {error && (
          <span className="absolute left-0 bottom-0 transform translate-y-full text-red-700 text-sm ">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}