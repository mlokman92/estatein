import Image from "next/image";
import { Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTeamMembers, getSiteContent } from "@/lib/queries";
import type { AboutSectionHeadings } from "@/lib/content";

// lucide v1 dropped brand icons — inline the classic Twitter/X bird for the badge.
const twitterPath =
  "M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958 1.13 4.66 4.66 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 001.96 9.824a4.647 4.647 0 01-2.11-.583v.06a4.66 4.66 0 003.737 4.568 4.692 4.692 0 01-2.104.08 4.661 4.661 0 004.352 3.234 9.348 9.348 0 01-5.786 1.995 9.5 9.5 0 01-1.112-.065 13.175 13.175 0 007.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 002.323-2.41z";

export async function MeetTheTeam() {
  const [team, headings] = await Promise.all([
    getTeamMembers(),
    getSiteContent<AboutSectionHeadings>("about.section_headings"),
  ]);

  if (team.length === 0) return null;

  const heading = headings?.team;

  return (
    <section className="border-t border-line py-16 lg:py-20 3xl:py-28">
      <Container>
        <SectionHeading
          title={heading?.title ?? "Meet the Estatein Team"}
          description={
            heading?.description ??
            "At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality."
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.id}
              className="rounded-2xl border border-line bg-surface p-5 text-center"
            >
              <div className="relative">
                <div className="relative aspect-[317/253] w-full overflow-hidden rounded-xl">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <a
                  href={member.twitter_url ?? "#"}
                  aria-label={`${member.name} on Twitter`}
                  className="absolute -bottom-6 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full border-4 border-surface bg-purple text-white transition-colors hover:bg-[#8b5cf6]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="size-5"
                  >
                    <path d={twitterPath} />
                  </svg>
                </a>
              </div>

              <h3 className="mt-10 text-xl font-semibold text-white 3xl:text-2xl">
                {member.name}
              </h3>
              <p className="mt-1 text-base text-muted">{member.role}</p>

              <a
                href={member.contact_url ?? "#"}
                aria-label={`Say hello to ${member.name}`}
                className="mt-6 flex items-center justify-between gap-3 rounded-btn border border-line bg-bg py-1.5 pl-5 pr-1.5 text-left transition-colors hover:border-line-strong"
              >
                <span className="text-base font-medium text-white">
                  Say Hello <span aria-hidden="true">👋</span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-btn bg-purple text-white">
                  <Send className="size-5" aria-hidden="true" />
                </span>
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
