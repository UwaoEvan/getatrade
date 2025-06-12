"use client";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { useRouter } from "next/navigation";

type Verified = {
  status?: string;
};

export default function Unverified({ status }: Verified) {
  const router = useRouter();
  return (
    <Card className="border-amber-200 bg-amber-50 mb-4">
      <CardContent className="px-4">
        {status === "Not verified" ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Account not verified
                </p>
                <p className="text-xs text-amber-600">
                  Complete verification to unlock all features
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => router.push("/verification")}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Verify Now
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Verification in Progress
                </p>
                <p className="text-xs text-amber-600">
                  Your documents have been submitted and are currently being
                  reviewed. You&apos;ll be notified once your account is
                  verified.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
