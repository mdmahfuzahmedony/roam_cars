"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
const allBlogPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1698205462529-6536b5665f8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "News",
    author: "Ali Tufan",
    date: "April 20, 2023",
    title: "This Long-Awaited Technology May Finally Change the World",
    tags: ["technology", "future", "news"],
    description:
      "A deep dive into the latest technological advancements and their potential impact on global society.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1579709653018-b217036d9342?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Reviews",
    author: "Jane Doe",
    date: "March 15, 2023",
    title: "Review: The New Electric Car Experience",
    tags: ["cars", "electric", "review"],
    description:
      "An honest review of the newest electric car on the market, covering performance, battery life, and user experience.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1628102604085-f54f76274472?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tips & Tricks",
    author: "John Smith",
    date: "Feb 28, 2023",
    title: "5 Ways to Maintain Your Car for Longevity",
    tags: ["maintenance", "tips", "cars"],
    description:
      "Essential tips and tricks to keep your vehicle in top condition for years to come.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1517524009012-f0449a1d529d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "News",
    author: "Ali Tufan",
    date: "April 20, 2023",
    title: "Future of Transportation: Flying Cars Are Here?",
    tags: ["technology", "future", "news"],
    description:
      "Explore the exciting possibilities of flying cars and their potential impact on urban mobility.",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1520625419914-7f1a84f3e536?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Reviews",
    author: "Jane Doe",
    date: "March 15, 2023",
    title: "Comparing Top Autonomous Driving Systems",
    tags: ["cars", "autonomous", "review"],
    description:
      "A detailed comparison of the leading autonomous driving technologies available today.",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1596765792445-5d970364d9b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tips & Tricks",
    author: "John Smith",
    date: "Feb 28, 2023",
    title: "Mastering Off-Road Driving Techniques",
    tags: ["off-road", "tips", "driving"],
    description:
      "Learn the essential techniques to safely and effectively drive off-road vehicles.",
  },
];

const BlogPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <span className="mr-2">{post.author}</span>
          <span>|</span>
          <span className="ml-2">{post.date}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 leading-tight">
          {post.title}
        </h3>
      </div>
    </div>
  );
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(allBlogPosts.map((post) => post.category)),
  ];

  const filteredPosts = allBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 max-w-[1450px] mx-auto min-h-screen">
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content Area (Blog Posts) */}
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            All Blog Posts
          </h2>

          {/* Search Bar */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg">
                No posts found matching your criteria.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-10">
          {/* Recent Posts (You can make a separate component for this) */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Posts</h3>
            <ul className="space-y-3">
              {allBlogPosts.slice(0, 3).map(post => (
                <li key={post.id}>
                  <a href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 text-base">
                    {post.title}
                  </a>
                  <p className="text-gray-500 text-sm">{post.date}</p>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Categories in Sidebar (if not already filtered above) */}
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(1).map(category => ( // Exclude 'All' for sidebar categories
                <li key={category}>
                  <a href="#" className="text-gray-700 hover:text-blue-600">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Newsletter Signup (Placeholder for your component) */}
          {/* {NewsletterSignup && <NewsletterSignup />} */}
          <div className="bg-blue-100 p-6 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-bold text-blue-800 mb-3">
              Join Our Newsletter!
            </h3>
            <p className="text-blue-700 mb-4">
              Get the latest updates directly to your inbox.
            </p>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 mb-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
