import Link from "next/link";

export default function HomeButton() {

    return (
        <Link 
        href="/"
        className="inline-block font-mono px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200">
            Home
        </Link>
    )
}