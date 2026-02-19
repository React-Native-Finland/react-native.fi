import eventsData from '@/data/events.json';
import { Event, EventData } from '@/data/types';

export type { Event };
export type { Speaker, Talk } from '@/data/types';

function computeIsPast(event: EventData): Event {
  const eventDate = new Date(`${event.date}T${event.endTime}:00`);
  return {
    ...event,
    isPast: eventDate < new Date(),
  };
}

export function getAllEvents(): Event[] {
  return (eventsData as EventData[])
    .map(computeIsPast)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getUpcomingEvents(): Event[] {
  return (eventsData as EventData[])
    .map(computeIsPast)
    .filter((event) => !event.isPast)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastEvents(): Event[] {
  return (eventsData as EventData[])
    .map(computeIsPast)
    .filter((event) => event.isPast)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventBySlug(slug: string): Event | undefined {
  const event = (eventsData as EventData[]).find((e) => e.slug === slug);
  return event ? computeIsPast(event) : undefined;
}
