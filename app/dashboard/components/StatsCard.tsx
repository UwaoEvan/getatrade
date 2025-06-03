import { Card, CardContent } from "@/components/ui/card";

type Stat = {
  stat: {
    title: string;
    value: string;
    change: string;
    color: string;
    icon: any;
  };
};

export default function StatsCard({ stat }: Stat) {
  return (
    <Card className="bg-white w-full md:w-[40%] mb-2 ">
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </div>
          <div className={`p-3 rounded-full ${stat.color}`}>
            <stat.icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
