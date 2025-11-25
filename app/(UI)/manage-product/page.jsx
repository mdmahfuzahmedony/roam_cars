"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://roam-car-server.vercel.app/roam_cars",
          {
            cache: "no-store",
          }
        );

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // DELETE Handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(
      `https://roam-car-server.vercel.app/roam_cars/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Deleted Successfully!");
    }
  };

  if (loading) return <p className="p-6 text-xl text-center">Loading...</p>;

  return (
    // 1. px-4 যোগ করা হয়েছে মোবাইল প্যাডিংয়ের জন্য
    <div className="p-4 md:p-6 max-w-[1450px] mx-auto my-10 md:my-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
        Manage Products
      </h1>

      {/* 2. এই div টি টেবিলকে রেসপন্সিভ (স্ক্রলযোগ্য) বানাবে */}
      <div className="overflow-x-auto w-full shadow-lg rounded-lg bg-gray-800 border border-gray-700">
        
        {/* 3. min-w-[800px] দেওয়া হয়েছে যাতে টেবিলটি সংকুচিত না হয়ে স্ক্রল হয় */}
        <table className="w-full min-w-[800px] border-collapse text-left text-sm md:text-base">
          <thead className="bg-gray-900 text-gray-100 uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold border-b border-gray-700">Image</th>
              <th className="p-4 font-semibold border-b border-gray-700">Title</th>
              <th className="p-4 font-semibold border-b border-gray-700">Price</th>
              <th className="p-4 font-semibold border-b border-gray-700">Meta</th>
              <th className="p-4 font-semibold border-b border-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700 text-gray-300">
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-gray-700 transition duration-150">
                <td className="p-4">
                  <img
                    src={item.image || "/placeholder.png"}
                    className="h-12 w-16 md:h-16 md:w-24 object-cover rounded border border-gray-600"
                    alt="Car"
                  />
                </td>

                <td className="p-4 font-medium text-white">
                  {item.title}
                </td>

                <td className="p-4 text-blue-400 font-bold whitespace-nowrap">
                  {item.price}
                </td>

                <td className="p-4 text-gray-400 text-xs md:text-sm">
                  {item.meta || "N/A"}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    {/* ▶ View Button */}
                    <button
                      onClick={() => router.push(`/products/${item._id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs md:text-sm transition"
                    >
                      View
                    </button>

                    {/* ▶ Delete */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs md:text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* টিপস: নিচে মোবাইলের জন্য একটা ছোট মেসেজ দিতে পারো */}
      <p className="md:hidden text-gray-500 text-xs text-center mt-3">
        Swipe left to see more details →
      </p>
    </div>
  );
}