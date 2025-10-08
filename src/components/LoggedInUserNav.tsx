import { UserButton } from "@clerk/nextjs";
import DesktopMenu from "./DesktopMenu";
import MobileNav from "./MobileNav";

export default function LoggedInUserNav() {
  return (
    <>
      <div className="hidden lg:flex items-center gap-4">
        <DesktopMenu />
        <UserButton />
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </>
  );
}
