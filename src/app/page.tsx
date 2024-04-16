import { seo } from "@/seo";
import type { Metadata, ResolvingMetadata } from "next";

import Main from "./_Main";

type Props = {
  params: unknown;
  searchParams: { r?: string };
};

export default async function HomePage(_: Props) {
  return <Main />;
}

export async function generateMetadata(
  { searchParams }: Props,
  _: ResolvingMetadata
): Promise<Metadata> {
  return seo;
}
