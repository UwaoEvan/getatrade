import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function Component() {
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
            <h3 className="font-medium text-gray-900">New leads</h3>
            <p className="text-sm text-gray-600">
              Relevant leads as soon as they are posted.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email</span>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Daily lead summary</h3>
            <p className="text-sm text-gray-600">
              Summary of relevant leads in the last 24 hours.
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
        <h2 className="text-lg font-medium text-gray-900">
          Invites from customers
        </h2>
        <p className="text-sm text-gray-600">
          A customer invites you to talk about a lead.
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
        <h2 className="text-lg font-medium text-gray-900">
          Messages and job status
        </h2>
        <p className="text-sm text-gray-600">
          New messages, new contacts, being hired, job completion and reviews.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Email</span>
          <Switch />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Closed Jobs</h2>
        <p className="text-sm text-gray-600">
          Closed jobs and unsuccessful hires.
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Email</span>
          <Switch defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Hired status</h2>
        <p className="text-sm text-gray-600">Let us know if you were hired.</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Email</span>
          <Switch defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">
          Marketing communications
        </h2>

        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" defaultChecked />
          <label htmlFor="marketing" className="text-sm text-gray-700">
            Receive marketing communications.
          </label>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Promotions</h2>
        <p className="text-sm text-gray-600">
          Receive our feedback requests, product news, sweepstakes and surveys.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Email</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Call</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Help us improve</h2>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Research</h3>
          <p className="text-sm text-gray-600">
            Participate in paid and unpaid research.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Email</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
