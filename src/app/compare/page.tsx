import Link from "next/link";

export default function ComparePage() {
  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-4">BHC vs Elevate Rapid City</h1>
      <p className="text-gray-600">Coming soon — Sprint 231+</p>
    </main>
  );
}
