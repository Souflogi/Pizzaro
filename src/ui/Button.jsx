import { twMerge } from "tailwind-merge";

function Button({
  children,
  className = "",
  shape = "",
  variant = "primary",
  size = "md",
  as: Component = "button",

  ...props
}) {
  const baseStyles = `
    inline-block font-semibold cursor-pointer rounded-full px-4 py-2 tracking-wide   uppercase shadow-sm transition-colors duration-300 focus:ring-1 focus:ring-[#f6c453] focus:ring-offset-2 focus:ring-offset-[#fff0e0] disabled:cursor-not-allowed `;

  const variants = {
    primary:
      "bg-[#d24038] text-[#fff8ec] hover:bg-[#b82d24] disabled:bg-[#f1a99e] disabled:text-[#fbeee8] ",
    outline:
      "border border-[#d24038] text-[#d24038] hover:bg-[#fff3d6] disabled:bg-transparent disabled:text-[#f0cbbb] disabled:border-[#f0cbbb]",
  };

  const sizes = {
    sm: "text-sm px-1.5 py-1 md:px-2 md:py-1.5",
    md: "text-sm px-2.5 py-1.5 md:px-3.5 md:py-2",
    lg: "text-lg px-3.5 py-2 md:px-4.5 md:py-3",
  };

  const shapes = {
    round:
      "flex aspect-square   items-center justify-center text-md px-2 py-0.5 md:px-2.5 md:py-0.5  ",
  };
  return (
    <Component
      {...props}
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        shapes[shape],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Button;
