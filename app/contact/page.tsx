"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            Have a question or ready to start your automation journey? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-400">contact@autostep.com</p>
                    <p className="text-gray-400">support@autostep.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-gray-400">123 Automation Street</p>
                    <p className="text-gray-400">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1 text-gray-400">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your automation needs..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
