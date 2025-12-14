export default function UserTag({ href, children, className }) {
  const base =
    "inline-block bg-blue-600/20 text-blue-200 px-2 py-1 rounded-md font-semibold";

  return (
    <span className={base + (className ? ` ${className}` : "")}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <>{children}</>
      )}
    </span>
  );
}
