import { getUserByUsername } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { notFound } from "next/navigation";
import React from "react";

const UserPage = async ({ params }) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  return (
    <div>
      <div>
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600 text-center">
          Welcome to my scheduling page. Please select an event below to book
          call with me
        </p>
      </div>
    </div>
  );
};

export default UserPage;
