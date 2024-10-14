import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Description from "@/components/Description";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <Description />
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Key Features
        </h2>
        <Features />
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          What Our Users Say
        </h2>
        <Testimonials />
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          How It Works
        </h2>
        <HowItWorks />
      </div>
      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Simplify Your Scheduling?
        </h2>
        <p className="text-xl mb-6">
          Join thousands of professionals who trust schedullr for efficient time
          management.
        </p>
        <Link href={"/dashboard"}>
          <Button size="lg" variant="secondary" className="text-blue-600">
            Start For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
