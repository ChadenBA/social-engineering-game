import { useState } from "react";
import {
  ShieldCheck,
  MailCheck,
  ShieldUser,
  UserCheck,
  Home as HomeIcon,
} from "lucide-react";
import i18n from "i18next";

const menuItems = [
  { icon: <HomeIcon size={24} />, label: "Home" },
  { icon: <ShieldCheck size={24} />, label: "Quiz" },
  { icon: <MailCheck size={24} />, label: "Phishing" },
  { icon: <UserCheck size={24} />, label: "Role Play" },
  { icon: <ShieldUser size={24} />, label: "101" },
];

interface SidebarProps {
  onSelect: (label: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setIsOpen] = useState(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onSelect(menuItems[index].label);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-gray-800 w-24">
      {/* Menu Items */}
      <div>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`relative mb-6 p-3 rounded-xl transition-colors duration-300 
              ${
                activeIndex === index
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
            {activeIndex === index && (
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-400 rounded"></span>
            )}
          </button>
        ))}
      </div>      
    </div>
  );
}
