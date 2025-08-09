import { useState } from "react";
import { ShieldCheck, MailCheck, UserCheck, Home as HomeIcon } from "lucide-react";

const menuItems = [
  { icon: <HomeIcon size={30} />, label: "Home" },
  { icon: <ShieldCheck size={30} />, label: "Quiz" },
  { icon: <MailCheck size={30} />, label: "Phishing" },
  { icon: <UserCheck size={30} />, label: "Role Play" },
];

interface SidebarProps {
  onSelect: (label: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onSelect(menuItems[index].label);
  };

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "15rem",
      position: "fixed",
      top: 0,
      left: 0,
    }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`relative mb-6 p-3 rounded-xl transition-colors duration-300 
            ${activeIndex === index
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
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
  );
}
