export default function Container({ className = "", children }) {
  const base = "mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8";
  return (
    <div className={`${base}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
