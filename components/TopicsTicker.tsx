// Session topics scrolling past in one line, right to left, without end. The list is repeated so
// the loop joins up; the copy is hidden from assistive tech. The movement pauses on hover, and without it
// (reduced motion) the line simply sits still.
export function TopicsTicker({ topics, className = "" }: { topics: readonly string[]; className?: string }) {
  return (
    <div aria-label="Session topics" className={`ticker-fade group/ticker flex w-full overflow-hidden border-y border-line/80 py-3 ${className}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1} className="ticker-track flex w-max shrink-0 items-center">
          {topics.map((topic) => (
            <li key={topic} className="flex items-center whitespace-nowrap pr-7 font-serif text-xl font-semibold text-ink sm:text-[1.45rem]">
              <span aria-hidden="true" className="mr-7 inline-block h-1.5 w-1.5 rotate-45 bg-brass" />
              {topic}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
