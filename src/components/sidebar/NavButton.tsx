import { FC } from 'react'

interface SidebarButtonProps {
  onClick?: () => void; // Function to handle button click
  icon?: React.ReactNode; // Icon for the button
  text?: string; // Text to display next to the icon
}

const SidebarButton: FC<SidebarButtonProps> = ({ onClick, icon, text }) => {
  return (
    <button
      className="flex items-center w-full px-4 py-2 text-md font-medium text-gray-800 hover:scale-110 transition duration-300 ease-in-out rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

export default SidebarButton;
