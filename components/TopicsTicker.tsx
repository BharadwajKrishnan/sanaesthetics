// Session topics scrolling past, one row per group, the rows moving in opposite directions. Each row's
// content is repeated so the loop joins up; the copy is hidden from assistive tech. The movement pauses
// on hover, and without it (reduced motion) the rows simply sit still.
import { Eyebrow } from "@/components/SiteChrome";

export function TopicsTicker({
  rows,
}: {
  rows: readonly (readonly string[])[];
}) {
  return (
    <div aria-label="Session topics">
      <Eyebrow className="text-maroon">Sessions you can ask for</Eyebrow>
      <div className="ticker-fade mt-4 space-y-2 overflow-hidden">
        {rows.map((row, r) => (
          <div
            key={r}
            className="group/ticker flex w-max"
            style={{ animationDirection: r % 2 ? "reverse" : "normal" }}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="ticker-track flex shrink-0 items-center"
                style={{ animationDirection: "inherit" }}
              >
                {row.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center whitespace-nowrap pr-6 font-serif text-xl font-semibold text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mr-6 inline-block h-1.5 w-1.5 rounded-full bg-brass"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
