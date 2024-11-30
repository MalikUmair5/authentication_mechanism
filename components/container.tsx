
interface ContainerProps {
    children: React.ReactNode;
}


export default function Container({ children }: ContainerProps) {
  return (
    <>
      <section className=" lg:w-[550px] bg-white sm:w-auto shadow-md rounded-xl p-5 px-10">
        {children}
      </section>
    </>
  );
}
