import Link from "next/link";

interface CardDahboardProps {
  icon?: string;
  title: string;
  description: string;
  arrowIcon?: string;
  link?: string;
}

export default function CardDahboard({
  icon,
  title,
  description,
  arrowIcon,
  link,
}: CardDahboardProps) {
  return (
    <div
      className="relative w-[60vw] min-w-[168px] sm:w-full sm:max-w-[350px] h-[30vh] sm:h-[50vh] min-h-[258px] sm:min-h-[450px]
     bg-white flex flex-col max-sm:mx-auto items-center text-center p-4 sm:p-6 lg:p-8 rounded-xl"
    >
      <Link href={link || "#"} className="absolute inset-0 z-20" />
      <img
        src={icon}
        alt=""
        className="w-20 h-20 sm:w-40 sm:h-40 object-contain"
      />
      <strong className="text-2xl sm:text-4xl mt-4">{title}</strong>
      <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-[260px]">
        {description}
      </p>
      {arrowIcon && (
        <img
          src={arrowIcon}
          alt=""
          className="w-8 h-8 absolute bottom-10 sm:w-[50px] sm:h-[50px] mt-4 hidden sm:block"
        />
      )}
    </div>
  );
}
