import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-screen-lg mx-auto p-4 text-xl">
      <p>
        A crafting calculator for Minecraft just like the many others out there.
        This calculator allows you to easily plan and organize your crafting
        recipes in Minecraft. With the ability to add new items and create
        custom recipes, you can efficiently manage your resources and see what
        materials are needed to craft specific items.
      </p>
      <br />
      <p>
        I drew alot of inspiration from this{" "}
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://craftingcalculator.app/"
        >
          calculator
        </Link>
        .
      </p>
    </div>
  );
}
