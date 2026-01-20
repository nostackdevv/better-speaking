export function BlogShell({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <main
      className={[
        "mx-auto w-full px-4 pt-24 pb-16",
        size === "md" ? "max-w-3xl" : "max-w-5xl",
      ].join(" ")}
    >
      {children}
    </main>
  );
}
