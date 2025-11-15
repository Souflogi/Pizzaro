import clsx from "clsx";

function LinkButton({
  children,
  className = "",
  as: Component = "a",
  ...props
}) {
  return (
    <Component
      {...props}
      className={clsx(
        "text-sm font-semibold text-[#d24038] hover:text-[#a5221a]",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default LinkButton;
