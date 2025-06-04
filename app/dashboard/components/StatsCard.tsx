import { Card, CardContent } from "@/components/ui/card";

type Stat = {
  stat: {
    title: string;
    value?: number;
    change: string;
    color: string;
    icon: any;
  };
};

export default function StatsCard({ stat }: Stat) {
  return (
    <Card className="bg-white w-full md:w-[32%] mb-2 py-4">
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
              {stat.title}
            </p>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            {/* <p className="text-xs text-gray-500 mt-1">{stat.change}</p> */}
          </div>
          <div className={`p-2 rounded-full ${stat.color}`}>
            <stat.icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
