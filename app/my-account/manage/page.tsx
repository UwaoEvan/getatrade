import { Button } from "@/components/ui/button";
import { deactivateAccount } from "./action";

export default function Manage() {
  return (
    <div className="max-w-md mx-auto md:p-6 space-y-4">
      <p className="text-xl md:text-2xl font-bold text-gray-800">
        Manage your account
      </p>
      <form onSubmit={deactivateAccount}>
        <Button
          type="submit"
          className="flex items-center gap-2 mt-6 px-3 py-2 text-sm font-bold rounded-md bg-red-400 text-white "
        >
          Delete Account
        </Button>
      </form>
    </div>
  );
}
