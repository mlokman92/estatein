import { getSiteContent } from "@/lib/queries";
import type { BannerContent } from "@/lib/content";
import { HeaderClient } from "./HeaderClient";

// Server wrapper: fetches the editable announcement banner, then hands off to
// the interactive client header. Pages import `{ Header }` unchanged.
export async function Header() {
  const banner = await getSiteContent<BannerContent>("global.banner");
  return <HeaderClient banner={banner} />;
}
