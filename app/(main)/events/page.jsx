import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/EventCard";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Events />
    </Suspense>
  );
}
const Events = async () => {
  const { events, username } = await getUserEvents();
  if (events.length === 0) {
    return <p>You haven&apos;t created any events</p>;
  }
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events.map((event) => {
        return <EventCard key={event.id} event={event} username={username} />;
      })}
    </div>
  );
};
