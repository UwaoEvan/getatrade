import { getUser } from "@/app/lib/actions";
import { auth } from "@/app/lib/auth";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default async function Page() {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <p className="text-sm text-gray-600">
          We&apos;ll show you leads based on the services you offer.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">{user?.role}</h3>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{user?.role}</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
