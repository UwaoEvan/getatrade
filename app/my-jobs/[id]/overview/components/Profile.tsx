"use client";
import { TabsContent } from "@/components/ui/tabs";
import { CheckCircle, Clock, Info, Shield } from "lucide-react";

type Props = {
  value: string;
  about?: string;
};

export default function Profile({ value, about }: Props) {
  return (
    <TabsContent value={value} className="mt-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>Member since 2025</span>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Good to know
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700">
              Verified by Getatradelink
            </span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700">Offers warranty</span>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Trades</h4>
        <p className="text-sm text-gray-700">Painter & Decorator</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          About this company
        </h4>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{about}</p>
        <p className="text-xs text-gray-500 italic">
          *The details provided in this profile have not been verified by
          Getatradelink.
        </p>
      </div>
      {/* Please <span className="underline">contact us</span> if you
          believe any of this information is incorrect. */}
      <div>
        {/* <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                src={`/placeholder.svg?height=150&width=150`}
                alt={`Portfolio image ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div> */}
      </div>
    </TabsContent>
  );
}
