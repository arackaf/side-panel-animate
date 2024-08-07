"use client";

const data = [
  { name: "Taylor Swift", streams: 400_000 },
  { name: "Lake Street Dive", streams: 250_000 },
  { name: "Joss Stone", streams: 10_000 },
  { name: "Grace Potter", streams: 700_000 },
];

export default function Home() {
  return (
    <main className="p-8">
      <h1>Hello</h1>

      <div className="flex flex-col gap-3">
        <div className="bg-slate-500 p-24">Filters and such</div>
        <div className="">
          <div className="grid grid-cols-[100%_1fr] overflow-hidden" style={{ transition: "grid-template-cols 200ms ease-in" }}>
            <div className="">
              <table cellPadding="15">
                <thead>
                  <tr>
                    <th>Artist</th>
                    <th>Streams</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr>
                      <td>{d.name}</td>
                      <td>{d.streams}</td>
                      <td>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      </td>
                      <td>
                        <select>
                          <option>View Albums</option>
                        </select>
                      </td>
                      <td>
                        <button className="border p-4">View Release Checklist</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-10">
              <h1 className="text-lg  ">Side Panel</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
