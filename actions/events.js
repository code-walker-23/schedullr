"use server";
import { eventSchema } from "@/app/lib/validator";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
export async function createEvent(data) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  // redundant -> already parsed with schema
  const validatedData = eventSchema.parse(data);
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("User not Found");
  }
  try {
    const event = await db.event.create({
      data: {
        ...validatedData,
        userId: user.id,
      },
    });
    return event;
  } catch (error) {
    console.error("Error creating event:", error); // Log the original error for debugging
    throw new Error("Error creating an event"); // User-friendly message
  }
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const events = await db.event.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });
    return { events, username: user.username };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error(`Error fetching events: ${error.message}`); // Include original error message
  }
}

export async function deleteEvent(eventId) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const event = await db.event.findUnique({
      where: { id: eventId },
    });
    if (!event || event.userId !== user.id) {
      throw new Error("Event not Found or Unauthorized");
    }

    await db.event.delete({
      where: { id: eventId },
    });

    return { succes: true };
  } catch (error) {
    console.error("Error deleting events:", error);
    throw new Error(`Error deleting events: ${error.message}`); // Include original error message
  }
}

export async function getEventDetails(username, eventId) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          username: true,
          imageUrl: true,
        },
      },
    },
  });
  return event;
}

export async function getEventAvailability(eventId) {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });
  if (!event || !event.user.availability) {
    return [];
  }
  const { availability, bookings } = event.user;
  return event;
}
