import { FC } from 'react'

interface SidebarButtonProps {
  onClick?: () => void; // Function to handle button click
  icon?: React.ReactNode; // Icon for the button
  text?: string; // Text to display next to the icon
}

const SidebarButton: FC<SidebarButtonProps> = ({ onClick, icon, text }) => {
  return (
    <button
      className="flex items-center w-full px-4 py-2 text-md font-normal text-gray-800 transition duration-300 ease-in-out rounded-lg hover:bg-gray-200"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span className='ml-2'>{text}</span>
    </button>
  );
}

export default SidebarButton;
