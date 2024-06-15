import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
