import { auth } from "@clerk/nextjs/server";

export async function getuserAvailability() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      availability: {
        include: { days: true },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (!user.availability) {
    return null;
  }
  const availabilityData = {
    timeGap: user.availability.timeGap,
  };
  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].forEach((day) => {
    const foundDay = user.availability.days.find(
      (data) => data.day === day.toUpperCase
    );
    availabilityData[day] = {
      isAvailable: !!foundDay, // it converst into the boolean
      startTime: foundDay
        ? foundDay.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: foundDay
        ? foundDay.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return availabilityData;
}
