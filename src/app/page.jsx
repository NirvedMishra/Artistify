import Link from "next/link";
import { Button } from "@/components/ui/button";
const categories = [
  { name: "Singers", description: "Find top vocal performers." },
  { name: "Dancers", description: "Book energetic dance artists." },
  { name: "Speakers", description: "Engaging public speakers for events." },
  { name: "DJs", description: "Party with top DJs in town." },
];

export default function HomePage() {
  return (
    <div>
      <section className="text-center h-74 py-16 px-6 bg-transparent z-10">
        <div className="-z-10 bg-[url('/custom-party-background.jpeg')] bg-center bg-cover absolute my-20 h-74 inset-0"></div>
        <div className="-z-10 bg-black/40 absolute my-20 h-74 inset-0"></div>
        <h2 className="text-4xl font-bold mb-4 text-white z-100">Discover Talented Artists for Your Event</h2>
        <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
          Artistify helps you find and book amazing performers, speakers, and more—tailored to your needs.
        </p>
        <Link href="/artists">
          <Button className="bg-white text-black cursor-pointer">Explore Artists</Button>
        </Link>
      </section>

      <section className="py-12 px-6">
        <h3 className="text-2xl font-semibold mb-8 text-center">Browse by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx}
            href={{
              pathname: '/artists',
              query: { category: cat.name.slice(0,-1)},
            }} className="border rounded-xl p-6 text-center shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">{cat.name}</h4>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
