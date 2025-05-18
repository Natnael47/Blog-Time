import { buttonVariants } from "@/components/ui/button";
import {
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar2() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="relative w-full">
      <Navbar className="border-none">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center">
            <NavbarButton variant="secondary">
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <p>{user.given_name}</p>
                    <LogoutLink
                      postLogoutRedirectURL="/"
                      className={buttonVariants()}
                    >
                      LogOut
                    </LogoutLink>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <LoginLink className={buttonVariants()}>Login</LoginLink>
                    <RegisterLink
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      SignIn
                    </RegisterLink>
                  </div>
                )}
              </div>
            </NavbarButton>
          </div>
        </NavBody>
      </Navbar>
    </div>
  );
}
