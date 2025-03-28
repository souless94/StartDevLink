'use client';
import { useEffect, useState } from 'react';
import { redirectToAuth } from 'supertokens-auth-react';
import SuperTokens from 'supertokens-auth-react/ui';
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';
import { Link, Navbar, NavbarBrand } from "@heroui/react";
import { Link as AppLink, LogIn } from 'react-feather';

export default function Auth() {
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (
      SuperTokens.canHandleRoute([ThirdPartyPreBuiltUI]) === false
    ) {
      void redirectToAuth({ redirectBack: false });
    } else {
      setLoaded(true);
    }
  }, []);

  if (loaded) {
    return (
      <div>
        <Navbar maxWidth="xl" isBordered>
          <NavbarBrand>
            <Link className="font-bold text-inherit" href="/"> <AppLink size={25} /> <span> StartDevLink </span></Link>
          </NavbarBrand>
        </Navbar>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600 inline-flex rounded-md shadow-sm"> <LogIn size={25} /> Sign in to your StartDevLink Journey </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {SuperTokens.getRoutingComponent([ThirdPartyPreBuiltUI])}
          </div>
        </div>
      </div>
      );
  }

  return null;
}