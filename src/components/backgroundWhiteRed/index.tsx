import React from "react";

export default function BackgroundWhiteRed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen relative bg-(--c01) flex flex-col place-content-center">
      {children}
      <div className="bg-[#cc0000] absolute bottom-0 h-[50%] w-full"></div>
    </div>
  );
}
