import type { Entity } from "@/types/entity";
import entitiesData from "@/../data/entities.json";
import { notFound } from "next/navigation";
import { EntityDetailClient } from "./entity-detail-client";

const entities = entitiesData as Entity[];

export function generateStaticParams() {
  return entities.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entity = entities.find((e) => e.slug === slug);
  if (!entity) return { title: "Entity Not Found — BHC Annual Report" };
  return {
    title: `${entity.name} — BHC Annual Report`,
    description: entity.tagline,
  };
}

export default async function EntityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entity = entities.find((e) => e.slug === slug);
  if (!entity) notFound();
  const relatedEntities = entities.filter(
    (e) => e.category === entity.category && e.slug !== entity.slug
  );
  return <EntityDetailClient entity={entity} relatedEntities={relatedEntities} />;
}
