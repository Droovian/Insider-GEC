import { FC } from 'react'

interface SidebarButtonProps {
  onClick?: () => void; 
  icon?: React.ReactNode; 
  text?: string; 
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
