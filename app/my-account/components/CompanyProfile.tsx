import Image from "next/image";
import info from "@/public/menuicons/info.png";
import GuaranteeSelector from "./GuaranteeSelector";

type Props = {
  about?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
};

export default function GeneralProfile({ about }: Props) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">Company description</h1>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-md font-semibold">About your company</h2>
        </div>

        <p className="text-md text-gray-700">{about}</p>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-md font-semibold">Guarantee</h2>
      </div>
      <p className="text-md text-gray-700">
        Increase your chances of getting hired by offering a guarantee.
      </p>
      <div className="flex items-center my-4">
        <Image src={info} alt="info" className="w-4 h-4 object-contain mr-2" />
        <p className="text-sm text-gray-700">
          Homeowners are aware guarantees vary and should discuss the terms in
          advance.
        </p>
      </div>
      <GuaranteeSelector />
    </div>
  );
}
