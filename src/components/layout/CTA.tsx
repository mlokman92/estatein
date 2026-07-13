import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const description =
  "Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.";

type MeshSquare = { x: number; y: number; size: number; opacity: number };

// Approximates the two "Abstract Design" raster assets in the Figma: a dense
// mesh of small rotated squares that clusters against a bottom corner and
// fades toward the centre. `x`/`y` are px offsets from that corner.
function cornerMesh(): MeshSquare[] {
  const cols = 10;
  const rows = 6;
  const step = 30;
  const squares: MeshSquare[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = Math.hypot(c, r);
      // Triangular cull so the mesh is densest at the corner.
      if (dist > cols - 1) continue;
      squares.push({
        x: c * step,
        y: r * step,
        size: dist < 3 ? 13 : dist < 6 ? 10 : 8,
        opacity: Math.min(0.45, Math.max(0.06, 0.45 - dist * 0.045)),
      });
    }
  }

  return squares;
}

const mesh = cornerMesh();

export function CTA() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg py-16 lg:py-20 3xl:py-[100px]">
      {/* Faint grid artwork */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      {/* Subtle purple glow */}
      <div className="pointer-events-none absolute inset-0 glow-purple" />
      {/* Abstract rotated-square mesh, clustered in the two bottom corners */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-0 h-[220px] w-[320px]">
          {mesh.map((s, i) => (
            <span
              key={`bl-${i}`}
              className="absolute rotate-45 rounded-[2px] border border-line-strong"
              style={{
                left: s.x,
                bottom: s.y,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-0 right-0 h-[220px] w-[320px]">
          {mesh.map((s, i) => (
            <span
              key={`br-${i}`}
              className="absolute rotate-45 rounded-[2px] border border-line-strong"
              style={{
                right: s.x,
                bottom: s.y,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>
      </div>

      <Container className="relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-[1.2] text-white sm:text-4xl 3xl:text-5xl">
              Start Your Real Estate Journey Today
            </h2>
            <p className="mt-3.5 text-base font-medium text-muted sm:text-lg">
              {description}
            </p>
          </div>

          <div className="shrink-0">
            <Button variant="primary" href="/properties">
              Explore Properties
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
