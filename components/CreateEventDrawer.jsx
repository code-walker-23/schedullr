"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import EventForm from "./EventForm";

const CreateEventDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParam = useSearchParams();

  useEffect(() => {
    const create = searchParam.get("create");
    console.log(create);
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParam]);

  const handleClose = () => {
    setIsOpen(false);
    // if is not affecting anything
    if (searchParam.get("create") === "true") {
      router.replace(window?.location?.pathname);
    }
  };

  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm onSubmitForm={handleClose} />
        <DrawerFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateEventDrawer;
