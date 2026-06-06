"use client";

export default function PageSidebar({
  pages,
  currentPage,
  onPageSelect,
}: {
  pages: number;
  currentPage: number;
  onPageSelect: (
    page: number
  ) => void;
}) {
  return (
    <aside
      className="
      w-64
      bg-zinc-950
      border-r
      border-zinc-800
      overflow-y-auto
      flex-shrink-0
    "
    >
      <div className="p-4">
        <h2
          className="
          text-zinc-400
          text-sm
          font-medium
          mb-4
        "
        >
          Pages
        </h2>

        <div className="space-y-3">
          {Array.from({
            length: pages,
          }).map((_, i) => {
            const page =
              i + 1;

            return (
              <button
                key={page}
                onClick={() =>
                  onPageSelect(
                    page
                  )
                }
                className={`
                  w-full
                  rounded-xl
                  border
                  transition-all
                  p-3
                  text-left

                  ${
                    currentPage ===
                    page
                      ? `
                        border-blue-500
                        bg-blue-500/10
                      `
                      : `
                        border-zinc-800
                        bg-zinc-900
                        hover:bg-zinc-800
                      `
                  }
                `}
              >
                <div
                  className="
                  bg-white
                  rounded
                  aspect-[0.7]
                  mb-2
                "
                />

                <div
                  className="
                  text-sm
                  text-white
                "
                >
                  Page {page}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
