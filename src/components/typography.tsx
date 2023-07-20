import clsx from "clsx";

export const Typography = {
  h1: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className={clsx("text-5xl font-bold tracking-wider text-white", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className={clsx("text-xl font-bold tracking-normal text-white", className)} {...props}>
      {children}
    </h2>
  ),

  p: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={clsx("text-base font-bold tracking-tight text-black", className)} {...props}>
      {children}
    </p>
  ),
};
