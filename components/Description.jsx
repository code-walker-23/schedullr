import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Description = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
      <div className="lg:w-1/2">
        <h1 className="text-7xl font-extrabold pb-6 gradient-title">
          Simplify Your scheduling
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Schedullr helps you manage your time effectively. Create events, set
          your availablity, and let others book time with you seamlessly.
        </p>
        <Link href={"/dashboard"}>
          <Button size="lg" className="text-lg">
            {" "}
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            alt="scheduling illustration"
            src="/poster.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
