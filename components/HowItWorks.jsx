import { howItWorks } from "@/lib/data";
const HowItWorks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {howItWorks.map((step, index) => (
        <div className="text-center" key={index}>
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 font-bold text-xl">{index + 1}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
