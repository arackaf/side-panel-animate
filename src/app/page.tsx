"use client";

import { FC, useLayoutEffect, useRef, useState } from "react";

const data = [
  { name: "Taylor Swift", streams: 400_000 },
  { name: "Lake Street Dive", streams: 250_000 },
  { name: "Joss Stone", streams: 10_000 },
  { name: "Grace Potter", streams: 700_000 },
];

export function useWidth() {
  const ref = useRef<any>();
  const [width, set] = useState(0);
  const widthRef = useRef(width);
  const [ro] = useState(() =>
    typeof window === "object"
      ? new ResizeObserver(packet => {
          if (ref.current && widthRef.current != ref.current.offsetWidth) {
            widthRef.current = ref.current.offsetWidth;
            set(ref.current.offsetWidth);
          }
        })
      : null
  );
  useLayoutEffect(() => {
    if (ref.current) {
      set(ref.current.offsetWidth);
      ro!.observe(ref.current, {});
    }
    return () => ro!.disconnect();
  }, [ref.current]);

  return [ref, width as any];
}

export default function Home() {
  const [sidePanelRef, sidePanelWidth] = useWidth();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const gridCols = sidePanelOpen
    ? `calc(100% - ${sidePanelWidth}px) 1fr`
    : "100% 1fr";

  function toggle() {
    setSidePanelOpen(val => !val);
  }

  return (
    <main className="p-8">
      <h1>Hello</h1>

      <div className="flex flex-col gap-3">
        <div className="bg-slate-500 p-24">Filters and such</div>
        <div className="">
          <div
            className={`grid overflow-hidden`}
            style={{
              gridTemplateColumns: gridCols,
              transition: "grid-template-columns 200ms ease-in",
            }}
          >
            <div className="">
              <table cellPadding="15">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Streams</th>
                    <th></th>
                    <th></th>
                    <th
                      style={{
                        width: sidePanelOpen ? 0 : "213px",
                        transition: "width 200ms ease-in",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.name}</td>
                      <td>{d.streams}</td>
                      <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris
                      </td>
                      <td>
                        <select>
                          <option>View Albums</option>
                        </select>
                      </td>
                      <ViewChecklist
                        sidePanelOpen={sidePanelOpen}
                        toggle={toggle}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div ref={sidePanelRef} className="p-36 bg-teal-500">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSidePanelOpen(false)}
                  className="p-2 border ml-auto"
                >
                  Close
                </button>
                <h1 className="text-lg text-nowrap">Side Panel</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const ViewChecklist: FC<{ sidePanelOpen: boolean; toggle: any }> = props => {
  const { sidePanelOpen, toggle } = props;
  const [sizingRef, width] = useWidth();
  const widthToUse = width ? `${width}px` : "auto";

  console.log({ width });

  return (
    <td className="p-0">
      <div
        className="overflow-hidden"
        style={{
          width: sidePanelOpen ? 0 : widthToUse,
          transition: "width 200ms ease-in",
        }}
      >
        <div ref={sizingRef}>
          <button onClick={toggle} className="border p-4 text-nowrap">
            View Release Checklist
          </button>
        </div>
      </div>
    </td>
  );
};
