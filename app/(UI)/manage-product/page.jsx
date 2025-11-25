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
        const res = await fetch("http://localhost:2002/roam_cars", {
          cache: "no-store",
        });

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

    const res = await fetch(`http://localhost:2002/roam_cars/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Deleted Successfully!");
    }
  };

  if (loading) return <p className="p-6 text-xl">Loading...</p>;

  return (
    <div className="p-6 max-w-[1400px] mx-auto my-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

      <table className="w-full my-10 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-base-200 text-left">
            <th className="border border-gray-300 p-3">Image</th>
            <th className="border border-gray-300 p-3">Title</th>
            <th className="border border-gray-300 p-3">Price</th>
            <th className="border border-gray-300 p-3">Meta</th>
            <th className="border border-gray-300 p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item._id} className="">
              <td className="border my-3 border-gray-300 p-3">
                <img
                  src={item.image || "/placeholder.png"}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>

              <td className="border border-gray-300 p-3 font-semibold">
                {item.title}
              </td>

              <td className="border border-gray-300 p-3 text-blue-600 font-bold">
                {item.price}
              </td>

              <td className="border border-gray-300 p-3 text-gray-200">
                {item.meta || "N/A"}
              </td>

              <td className="border border-gray-300 p-3 space-x-2">
                {/* ▶ View Button → Go to Details */}
                <button
                  onClick={() => router.push(`/products/${item._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                {/* ▶ Delete */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
