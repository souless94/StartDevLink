"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import {
  signOut,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import { LogIn, BookOpen, Link as AppLink, LogOut } from "react-feather";

export function AppNavBar() {
  const session = useSessionContext();

  if (session.loading) {
    return (
      <Navbar maxWidth="xl" isBordered>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            {" "}
            <AppLink size={25} /> <span> StartDevLink </span>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem isActive>
            <Link color="secondary" href="/docs">
              <BookOpen size={25} /> User Guide
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="primary"
              variant="ghost"
              radius="lg"
              href="/auth"
              startContent={<LogIn size={25} />}
            >
              {" "}
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }

  async function onLogout() {
    await signOut();
    window.location.href = "/"; // or to wherever your logic page is
  }

  return (
    <div>
      <Navbar maxWidth="xl" isBordered>
        <NavbarBrand>
          {session.doesSessionExist ? (
            <Link className="font-bold text-inherit" href="/dashboard">
              {" "}
              <AppLink size={25} /> <span> StartDevLink </span>
            </Link>
          ) : (
            <Link className="font-bold text-inherit" href="/">
              {" "}
              <AppLink size={25} /> <span> StartDevLink </span>
            </Link>
          )}
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem isActive>
            <Link color="secondary" href="/docs">
              <BookOpen size={25} /> User Guide
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {!session.doesSessionExist ? (
              <Button
                as={Link}
                color="primary"
                variant="ghost"
                radius="lg"
                href="/auth"
                startContent={<LogIn size={25} />}
              >
                {" "}
                Login
              </Button>
            ) : (
              <Button
                color="danger"
                variant="ghost"
                radius="lg"
                onPress={onLogout}
                startContent={<LogOut size={25} />}
              >
                Signout
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
