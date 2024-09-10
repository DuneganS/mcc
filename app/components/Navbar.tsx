import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-orange-500 bg-orange-500 ">
      <div className="flex items-center p-2">
        <Link href="/" className="">
          <span className="text-2xl font-semibold">
            Minecraft Crafting Calculator
          </span>
        </Link>
        <div>
          <ul className="list-style-none flex flex-row space-x-4 pl-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/items">Items</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
