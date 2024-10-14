import { features } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>
            <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
            <CardTitle className="text-center text-blue-600">
              {feature.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Features;
