import { notFound } from "next/navigation";
import axios from "axios";
import SiteRenderer from "@/components/SiteRenderer";

export default async function SiteHomePage({
  params,
}: {
  params: Promise<{ siteName: string }>;
}) {
  const { siteName } = await params;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const { data } = await axios.get(
      `${backendUrl}/pages/public/by-subdomain?subdomain=${siteName}&slug=`
    );

    if (!data || !data.website || !data.page) {
      return notFound();
    }

    // Pass the website configuration and resolved page layout to renderer
    return <SiteRenderer website={data.website} page={data.page} />;
  } catch (err: any) {
    console.error("Failed to load homepage:", err.message);
    return notFound();
  }
}
