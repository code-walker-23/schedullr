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
    throw new Error("Error Creating an Event");
  }
}
