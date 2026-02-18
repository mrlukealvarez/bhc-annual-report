import Link from "next/link";

const entitySlugs = [
  "growwise",
  "outpost-media",
  "seed-foundation",
  "seed-academy",
  "the-cult",
  "the-op",
  "pass-creek",
  "settle-the-west",
  "auric-labs",
  "bhc",
  "delegate-iq",
  "adventurecap",
  "grow-campus",
];

export function generateStaticParams() {
  return entitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${name} — BHC Annual Report`,
    description: `Entity detail page for ${name}`,
  };
}

export default async function EntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <p className="text-gray-600">Entity detail page — Coming soon, Sprint 231+</p>
    </main>
  );
}
