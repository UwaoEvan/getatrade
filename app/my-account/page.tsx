import CompanyProfile from "./components/CompanyProfile";
import { auth } from "../lib/auth";
import { getUser } from "../lib/actions";
import { redirect } from "next/navigation";

export default async function MyAccount() {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);

  if ((user?.role !== "customer" && !user?.about) || !user?.location) {
    redirect("/update-profile");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <CompanyProfile
        email={user?.email}
        phoneNumber={user?.phoneNumber as string}
        role={user?.role as string}
        about={user?.about as string}
      />
    </div>
  );
}
