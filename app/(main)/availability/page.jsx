import { getuserAvailability } from "@/actions/availablity";
import React from "react";
import AvailabilityForm from "./_components/availability-form";
import { defaultAvailability } from "./data";

const Availability = async () => {
  const availablity = await getuserAvailability();
  console.log(availablity);
  return (
    <AvailabilityForm initialData={availablity || defaultAvailability}>
      Availability
    </AvailabilityForm>
  );
};

export default Availability;
