"use client";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Furnish Plus</h1>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Categories
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Deals
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
