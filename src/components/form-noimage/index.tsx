export default function FormNoImage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl flex overflow-hidden mx-auto w-screen sm:w-[80%] shadow relative ">
      <div className="sm:w-1/2 p-1 mx-auto">
        <form className="items-center p-1.5 sm:p-6">{children}</form>
      </div>
    </div>
  );
}
