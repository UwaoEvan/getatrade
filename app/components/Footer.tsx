"use client";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import facebook from "@/public/facebook.png";
import linkedin from "@/public/linkedin.png";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-gray-200 text-gray-700 pt-12">
      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 flex justify-around">
        <div>
          <Image
            src={Logo}
            alt="logo"
            className="h-10 w-20 md:h-20 md:w-40 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <p className="text-sm w-20 md:w-60 mt-2">
            Helping you find the right tradesperson, the reliable way.
          </p>
          <div className="flex space-x-2 mt-4">
            <a
              href="https://www.linkedin.com/company/getatradelinkltd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={linkedin}
                alt="linkedin"
                className="h-6 w-6 object-contain"
              />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61574881120840"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={facebook}
                alt="facebook"
                className="h-6 w-6 object-contain"
              />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-md font-semibold mb-3">Explore</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Popular Trades
              </a>
            </li>
            <li>
              <Link href="/post-a-job" className="hover:underline">
                Post a Job
              </Link>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tradespeople Join
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-md font-semibold mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:info@getatradelinkltd.com"
                className="hover:underline"
              >
                Customer Support
              </a>
            </li>
            <li>
              <Link href="/pricing-guides" className="hover:underline">
                Pricing guides
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:underline">
                Terms and conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6 border-t text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Getatradelink. All rights reserved.
      </div>
    </footer>
  );
}
