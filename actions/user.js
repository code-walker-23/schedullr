"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUsername(username) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch existing user by username
  const existingUser = await db.user.findUnique({
    where: { username },
  });

  // Check if the username is already taken by a different user
  if (existingUser && existingUser.clerkUserId !== userId) {
    throw new Error("Username is already taken");
  }

  try {
    // Update the username in your database
    await db.user.update({
      where: { clerkUserId: userId },
      data: { username },
    });

    // Update the username in Clerk
    await clerkClient.users.updateUser(userId, { username });

    return { success: true, username }; // Return the updated username
  } catch (error) {
    throw new Error(`Failed to update username: ${error.message}`);
  }
}

export async function getUserByUsername(username) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          _count: {
            select: { bookings: true },
          },
        },
      },
    },
  });
  return user;
}
