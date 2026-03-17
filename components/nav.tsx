"use client";

import { useState } from "react";
import {
  MapPin,
  User,
  Menu,
  LogOut,
  Utensils,
  LayoutDashboard,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import SignInOverlay from "./sign-in-overlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleSignInSuccess = () => {
    setShowSignIn(false);
    router.push("/dashboard");
  };

  // Helper to check if a link is active
  const isActive = (path: string) => pathname?.startsWith(path);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md transition-all">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              CheapBites
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant={isActive("/map") ? "secondary" : "ghost"}
              asChild
              className={`rounded-full px-4 ${isActive("/map") ? "font-semibold text-primary bg-primary/10" : "text-gray-600"}`}
            >
              <Link href="/map">
                <MapPin className="mr-2 h-4 w-4" /> Map
              </Link>
            </Button>

            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full ml-2"
                  >
                    <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors">
                      <AvatarImage
                        src={session.user.image || ""}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {session.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() =>
                      signOut({ callbackUrl: "/", redirect: true })
                    }
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setShowSignIn(true)}
                className="rounded-full ml-2 font-semibold shadow-sm"
              >
                <User className="mr-2 h-4 w-4" /> Sign In
              </Button>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-600"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] bg-white border-l border-gray-100 p-0"
            >
              <SheetHeader className="p-6 border-b border-gray-100 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <div className="bg-primary text-white p-1 rounded-md">
                    <Utensils className="w-4 h-4" />
                  </div>
                  CheapBites
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col py-4 px-3 space-y-1">
                <Button
                  variant={isActive("/map") ? "secondary" : "ghost"}
                  asChild
                  onClick={() => setIsOpen(false)}
                  className={`justify-start h-12 ${isActive("/map") ? "text-primary bg-primary/10" : "text-gray-600"}`}
                >
                  <Link href="/map">
                    <MapPin className="mr-3 h-5 w-5" /> Discovery Map
                  </Link>
                </Button>

                {session?.user ? (
                  <>
                    <Button
                      variant={isActive("/dashboard") ? "secondary" : "ghost"}
                      asChild
                      onClick={() => setIsOpen(false)}
                      className={`justify-start h-12 ${isActive("/dashboard") ? "text-primary bg-primary/10" : "text-gray-600"}`}
                    >
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
                      </Link>
                    </Button>

                    <div className="my-4 border-t border-gray-100" />

                    <div className="px-4 py-2 flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name || "User"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {session.user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">
                          {session.user.name}
                        </span>
                        <span className="text-xs text-gray-500 line-clamp-1">
                          {session.user.email}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: "/", redirect: true });
                      }}
                      className="justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-5 w-5" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      setShowSignIn(true);
                    }}
                    className="justify-start h-12 mt-2 shadow-sm"
                  >
                    <User className="mr-3 h-5 w-5" /> Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Auth Overlay */}
      {showSignIn && (
        <div className="fixed inset-0 z-50">
          <SignInOverlay
            onClose={() => setShowSignIn(false)}
            onSuccess={handleSignInSuccess}
          />
        </div>
      )}
    </>
  );
};

export default Nav;
