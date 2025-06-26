"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import InteractiveMap from "./interactive-map";
import { auth } from "@/app/lib/auth";
import { getUser } from "@/app/lib/actions";
import { updateLocation } from "./action";

export default function WorkAreaPage() {
  const [distanceArea, setDistanceArea] = useState("16");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [centerCoords, setCenterCoords] = useState({
    lat: 51.2704,
    lng: 0.5218,
  }); // Default: Maidstone
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const session = await auth();
      const userData = await getUser(session?.user?.email as string);
      setUser(userData);
      setCurrentLocation(userData?.location ?? "");
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    const timeoutId = setTimeout(() => {
      geocodeLocation(currentLocation);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentLocation]);

  const geocodeLocation = async (location: string) => {
    if (!location.trim()) return;
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCenterCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
  };

  const handleSave = async () => {
    await updateLocation(currentLocation, parseInt(distanceArea), user?.id);
    return;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Work area</h1>
          <p className="text-gray-600">
            This is the area you are prepared to travel for work and ensures you
            receive relevant leads.
          </p>
        </div>

        <div className="border-[1px] px-4 py-6 rounded-sm bg-white space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="current-location"
              className="text-base font-medium text-gray-900"
            >
              Current location
            </Label>
            <Input
              id="current-location"
              value={currentLocation ?? ""}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="max-w-md"
              placeholder="Enter a location..."
              disabled={isGeocoding}
            />
            {isGeocoding && (
              <p className="text-sm text-gray-500">Searching for location...</p>
            )}
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="distance-area"
              className="text-base font-medium text-gray-900"
            >
              Distance area
            </Label>
            <Select value={distanceArea} onValueChange={setDistanceArea}>
              <SelectTrigger className="max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 miles</SelectItem>
                <SelectItem value="10">10 miles</SelectItem>
                <SelectItem value="16">16 miles</SelectItem>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
                <SelectItem value="100">100 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">
            The pins show your working distance
          </h2>
          <Card className="p-0 overflow-hidden">
            <InteractiveMap
              distance={parseInt(distanceArea)}
              centerCoords={centerCoords}
              locationName={currentLocation}
            />
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleSave} className="bg-blue-600 text-white">
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
