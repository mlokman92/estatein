import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getContactCards } from "@/lib/queries";
import { getSiteContent } from "@/lib/queries";
import type { SimpleHero } from "@/lib/content";
import { iconByName } from "@/lib/icons";

const DEFAULT_PARAGRAPH =
  "Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation.";

type SocialItem = { platform: string; url: string | null };

function Badge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex items-start justify-between">
      <span className="grid size-14 place-items-center rounded-full border border-purple-light/40">
        <Icon className="size-6 text-purple" aria-hidden="true" />
      </span>
      <ArrowUpRight className="size-6 text-muted-2" aria-hidden="true" />
    </div>
  );
}

export async function ContactHero() {
  const [hero, cards] = await Promise.all([
    getSiteContent<SimpleHero>("contact.hero"),
    getContactCards(),
  ]);

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50"
      />
      <div
        aria-hidden
        className="glow-purple pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px]"
      />

      <Container className="py-14 lg:py-16 3xl:py-24">
        <div className="max-w-4xl">
          <h1 className="text-[40px] font-semibold leading-[1.15] text-white sm:text-[44px] lg:text-5xl 3xl:text-6xl">
            {hero?.heading ?? "Get in Touch with Estatein"}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-[1.6] text-muted 3xl:text-lg">
            {hero?.paragraph ?? DEFAULT_PARAGRAPH}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 3xl:mt-12">
          {cards.map((card) => {
            const Icon = iconByName(card.icon);
            return card.kind === "single" ? (
              <a
                key={card.id}
                href={card.href ?? "#"}
                className="flex h-full flex-col gap-8 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
              >
                <Badge icon={Icon} />
                <p className="text-lg font-semibold text-white lg:text-xl">
                  {card.label}
                </p>
              </a>
            ) : (
              <div
                key={card.id}
                className="flex h-full flex-col gap-8 rounded-2xl border border-line bg-surface p-6"
              >
                <Badge icon={Icon} />
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {((card.links as SocialItem[]) ?? []).map((link) => (
                    <a
                      key={link.platform}
                      href={link.url ?? "#"}
                      className="text-lg font-semibold text-white transition-colors hover:text-purple-light lg:text-xl"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
