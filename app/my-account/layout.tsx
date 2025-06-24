import { getUser } from "../lib/actions";
import { auth } from "../lib/auth";
import CustomerMenu from "./components/CustomerMenu";
import TradespersonMenu from "./components/TradespersonMenu";

export default async function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = await getUser(session?.user?.email as string);
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="p-4 flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">My Account</h1>
        </div>
        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {user?.role === "customer" ? (
            <CustomerMenu
              name={user.username}
              location={user?.location as string}
              userId={user.id}
              imageUri={user?.profileUrl as string}
            />
          ) : (
            <TradespersonMenu
              name={user?.username}
              location={user?.location as string}
              userId={user?.id}
              imageUri={user?.profileUrl as string}
            />
          )}
          <main className="flex-1">
            <div className="p-4">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
