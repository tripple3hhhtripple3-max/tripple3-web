import { notFound } from "next/navigation";
import axios from "axios";
import SiteRenderer from "@/components/SiteRenderer";

export default async function SiteSubPage({
  params,
}: {
  params: Promise<{ siteName: string; slug: string }>;
}) {
  const { siteName, slug } = await params;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const { data } = await axios.get(
      `${backendUrl}/pages/public/by-subdomain?subdomain=${siteName}&slug=${slug}`
    );

    if (!data || !data.website || !data.page) {
      return notFound();
    }

    return <SiteRenderer website={data.website} page={data.page} />;
  } catch (err: any) {
    console.error(`Failed to load page /${slug}:`, err.message);
    return notFound();
  }
}
