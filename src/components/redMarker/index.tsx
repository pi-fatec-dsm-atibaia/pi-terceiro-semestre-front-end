interface RedMarkerProps {
  children: React.ReactNode;
}

export default function RedMarker({ children }: RedMarkerProps) {
  return (
    <div className="flex mb-3 max-sm:mt-[15px]">
      <div className="mt-1.5 w-1 h-3.5 mr-1 bg-red-700" />
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}
