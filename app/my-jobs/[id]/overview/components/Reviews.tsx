import { TabsContent } from "@/components/ui/tabs";

type Props = {
  value: string;
};

export default function Review({ value }: Props) {
  return (
    <TabsContent value={value} className="mt-6">
      <div className="text-center py-8 text-gray-500">
        <p>No reviews yet</p>
      </div>
    </TabsContent>
  );
}
