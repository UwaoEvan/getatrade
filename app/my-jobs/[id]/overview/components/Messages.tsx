import { TabsContent } from "@/components/ui/tabs";

type Props = {
  value: string;
};

export default function Messages({ value }: Props) {
  return (
    <TabsContent value={value} className="mt-6">
      <div className="text-center py-8 text-gray-500">
        <p>No messages yet</p>
      </div>
    </TabsContent>
  );
}
