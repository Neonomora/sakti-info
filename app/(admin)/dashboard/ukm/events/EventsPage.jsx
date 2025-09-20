"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TaskPage() {
  const { data, error, isLoading } = useSWR("/api/admin/ukm/events", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <h1 className="text-red-300 text-4xl font-bold">Events</h1>
      <ul>
        {data?.map((item) => (
          <li key={item._id}>
            <p className="text-xl font-semibold">{item.title}</p>
            {item.subEvents?.length > 0 ? (
              <ul>
                {item.subEvents.map((sub) => (
                  <li key={sub._id} className="list-decimal list-inside">{sub.title}</li>
                ))}
              </ul>
            ) : (
              <p>No Sub Event</p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
