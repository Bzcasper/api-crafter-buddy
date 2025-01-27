import { Bell, Menu, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
  onMobileMenuClick: () => void;
  onSearchToggle: () => void;
  isSearchOpen: boolean;
}

export function Header({ onMobileMenuClick, onSearchToggle, isSearchOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 md:hidden"
          onClick={onMobileMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Search */}
        <div className="flex-1">
          <SearchInput isOpen={isSearchOpen} onToggle={onSearchToggle} />
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}