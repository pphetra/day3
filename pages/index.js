import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen p-8 ">
      <ul className="list-disc marker:text-blue-500 list-inside">
        <li>
          Register
          <ul className="pl-5 list-disc list-inside">
            <li className="list-disc">
              <Link href="./registers/pure_react">
                <a>Pure React</a>
              </Link>
            </li>
            <li className="list-disc">
              <Link href="./registers/use_hook_form">
                <a>React hook form</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
