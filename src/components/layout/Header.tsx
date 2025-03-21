
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Leaf, ChevronDown, Bell, LogOut, User, Settings } from "lucide-react";
import { EcoPointsBadge } from "../ui-custom/EcoPointsBadge";
import { useAuth } from "@/contexts/AuthContext";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const NavLink = ({ href, label, icon, active }: NavLinkProps) => (
  <Link
    to={href}
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      "inline-flex items-center gap-1.5 px-3 py-2 rounded-md",
      active ? "text-primary bg-primary/5" : "text-muted-foreground"
    )}
  >
    {icon}
    {label}
  </Link>
);

const MobileNavItem = ({ href, label, icon, active }: NavLinkProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
      active
        ? "bg-accent text-accent-foreground font-medium"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )}
  >
    {icon && <span className="size-4">{icon}</span>}
    <span>{label}</span>
  </Link>
);

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const userRole = user?.user_metadata?.role || "user";
  const ecoPoints = profile?.eco_points || 0;
  const userName = profile?.first_name || "User";
  const userEmail = user?.email || "";
  const userInitials = userName.charAt(0) + (profile?.last_name?.charAt(0) || "");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isNavLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await signOut();
  };

  const userNavigation = [
    { href: "/user/dashboard", label: "Dashboard" },
    { href: "/user/waste-upload", label: "Upload Waste" },
    { href: "/user/rewards", label: "Rewards" },
    { href: "/user/history", label: "History" },
  ];

  const staffNavigation = [
    { href: "/staff/dashboard", label: "Dashboard" },
    { href: "/staff/pickups", label: "Pickups" },
    { href: "/staff/waste-verification", label: "Verification" },
    { href: "/staff/earnings", label: "Earnings" },
  ];

  const adminNavigation = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/staff", label: "Staff" },
    { href: "/admin/waste-data", label: "Waste Data" },
    { href: "/admin/settings", label: "Settings" },
  ];

  let navItems = userNavigation;
  if (userRole === "staff") navItems = staffNavigation;
  if (userRole === "admin") navItems = adminNavigation;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="size-8 rounded-full bg-primary text-primary-foreground grid place-items-center">
            <Leaf className="size-4" />
          </div>
          <span className="font-semibold text-xl hidden sm:inline-block">EcoRecycle</span>
        </Link>

        {user ? (
          <>
            <div className="hidden md:flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.label}>
                      <Link to={item.href}>
                        <NavigationMenuLink 
                          className={cn(
                            navigationMenuTriggerStyle(),
                            isNavLinkActive(item.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-3">
              <EcoPointsBadge points={ecoPoints} className="hidden sm:flex" />
              
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="size-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">{userEmail}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 size-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 size-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="size-5" />
              </Button>
            </div>

            {isMobileMenuOpen && (
              <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-fade-in md:hidden">
                <div className="container p-4 pt-6 max-h-[calc(100vh-4rem)] overflow-y-auto animate-slide-down">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <MobileNavItem
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        active={isNavLinkActive(item.href)}
                      />
                    ))}
                  </nav>
                  <div className="h-px bg-border my-4" />
                  <div className="space-y-2">
                    <MobileNavItem href="/profile" label="Profile" icon={<User />} />
                    <MobileNavItem href="/settings" label="Settings" icon={<Settings />} />
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all w-full text-left text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="size-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Get started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
