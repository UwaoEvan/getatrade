import { Send } from "lucide-react";

type Props = {
  user?: {
    id: number;
    username: string;
  };
};

export default function Chat({ user }: Props) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start">
        <div className="w-6 h-6 bg-purple-200 text-purple-700 rounded-full text-xs font-bold flex items-center justify-center mr-2">
          {user?.username.charAt(0).toUpperCase()}
        </div>
        <div className="bg-gray-100 p-3 rounded-md max-w-md">
          if you need to contact me my number is 07711589839.
          <div className="text-gray-400 text-xs text-right mt-1">14:51</div>
        </div>
      </div>

      <div className="flex items-start justify-end">
        <div className="bg-purple-50 p-3 rounded-md max-w-md">
          Thank you I will be sure contact you via your mobile . Thank you
          <div className="text-gray-400 text-xs text-right mt-1">
            Read 14:53
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-2 border-t border-gray-200">
        Wed, 03 Apr 2024
      </div>

      <div className="flex items-center gap-2">
        <textarea
          placeholder="Your message"
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
        />
        <button
          type="button"
          className="p-2 rounded-md bg-blue-400  text-white"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
