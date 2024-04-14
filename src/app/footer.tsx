import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 rounded-xl ">
    <div className="container mx-auto px-4 flex justify-between">
      <div className="flex flex-col space-y-4">
        <ul className="list-none p-0">
          <li>
            <Link href="/legal/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/legal/terms">Terms</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-4">
        <ul className="list-none p-0">
          <li>
          <Link href="/team" className="text-gray-600 hover:text-gray-800">Team</Link>
          </li>         
          <li>
          <div className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} GEC Insider, Inc.
          </div>
          </li>
        </ul>
      
      </div>
    </div>
  </footer>

  );
};

export default Footer;