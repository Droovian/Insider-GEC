import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center items-center">
  <h1>
    Built with{" "}
    <Link href="https://nextjs.org/">
      <span>Nextjs</span>
    </Link>{" "}
    and{" "}
    <Link href="https://supabase.com/">
      <span>Supabase</span>
    </Link>
  </h1>
  <Link href="">
    <p>Github Repo</p>
  </Link>
</div>

  );
};

export default Footer;