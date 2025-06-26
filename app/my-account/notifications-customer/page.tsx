import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-600">
          Personalise your notification preferences at any time.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">
          Lead and job updates
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">
              Responses from tradespeople
            </h3>
            <p className="text-sm text-gray-600">
              When a tradesperson sends you a message.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email</span>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">
              Marketing communications
            </h3>
            <p className="text-sm text-gray-600">
              Receive marketing communications.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email</span>
              <Switch />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Newsletter</h2>
        <p className="text-sm text-gray-600">
          Our fortnightly newsletter with advice, related services and pricing
          guides.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Email</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">SMS</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Job Reviews</h2>
        <p className="text-sm text-gray-600">
          Reminders to review the tradesperson on our platform.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Email</span>
          <Switch />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Promotions</h2>
        <p className="text-sm text-gray-600">
          Receive our feedback requests, product news, sweepstakes and surveys.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Email</span>
          <Switch defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Help us improve</h2>
        <p className="text-sm text-gray-600">
          Participate in paid and unpaid research.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Email</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
}
