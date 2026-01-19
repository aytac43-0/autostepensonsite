import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with AI Automation",
    excerpt: "Learn how AI-powered automation can transform your business workflows and increase productivity by up to 10x.",
    date: "January 15, 2026",
    readTime: "5 min read",
    category: "AI & Automation"
  },
  {
    id: 2,
    title: "5 Ways n8n Can Revolutionize Your Workflow",
    excerpt: "Discover the most powerful n8n features that businesses are using to automate repetitive tasks and save countless hours.",
    date: "January 10, 2026",
    readTime: "7 min read",
    category: "n8n Workflows"
  },
  {
    id: 3,
    title: "Case Study: E-commerce Automation Success",
    excerpt: "How a growing e-commerce business automated their entire order processing system and reduced errors by 95%.",
    date: "January 5, 2026",
    readTime: "8 min read",
    category: "Case Studies"
  },
  {
    id: 4,
    title: "The Future of Business Automation",
    excerpt: "Exploring emerging trends in AI and automation technology and what they mean for businesses in 2026 and beyond.",
    date: "December 28, 2025",
    readTime: "6 min read",
    category: "Industry Insights"
  },
  {
    id: 5,
    title: "Integrating Multiple Platforms with n8n",
    excerpt: "A comprehensive guide to connecting your favorite business tools and creating seamless automated workflows.",
    date: "December 20, 2025",
    readTime: "10 min read",
    category: "Technical Guides"
  },
  {
    id: 6,
    title: "ROI of Automation: What to Expect",
    excerpt: "Breaking down the costs and benefits of implementing automation solutions in your business.",
    date: "December 15, 2025",
    readTime: "5 min read",
    category: "Business Strategy"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            Insights, guides, and stories about automation and AI
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center gap-2 text-sm text-purple-400 mb-3">
                  <span className="font-semibold">{post.category}</span>
                </div>

                <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
