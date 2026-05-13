"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully. We'll get back to you soon!");
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a question or need assistance? Our support team is here to help you with any inquiries regarding our products or your orders.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex items-start gap-6">
            <div className="h-14 w-14 bg-[#ff9800]/10 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin className="h-6 w-6 text-[#ff9800]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Store</h3>
              <p className="text-gray-400 leading-relaxed">
                123 Tech Avenue, Maarif<br />
                Casablanca, Morocco<br />
                20000
              </p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex items-start gap-6">
            <div className="h-14 w-14 bg-[#ff9800]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="h-6 w-6 text-[#ff9800]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Phone & Email</h3>
              <p className="text-gray-400 leading-relaxed mb-1">+212 600 000 000</p>
              <p className="text-[#ff9800]">support@gadgetmghrib.com</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex items-start gap-6">
            <div className="h-14 w-14 bg-[#ff9800]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="h-6 w-6 text-[#ff9800]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Business Hours</h3>
              <p className="text-gray-400 leading-relaxed">
                Monday - Friday: 9:00 AM - 8:00 PM<br />
                Saturday: 10:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">First Name</label>
                <Input required placeholder="Youssef" className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Last Name</label>
                <Input required placeholder="Alaoui" className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Email Address</label>
              <Input required type="email" placeholder="youssef@example.com" className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Subject</label>
              <Input required placeholder="How can we help you?" className="h-12 bg-white/5 border-white/10 text-white focus-visible:ring-[#ff9800] rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Message</label>
              <textarea 
                required 
                rows={5} 
                placeholder="Type your message here..." 
                className="w-full p-4 bg-white/5 border border-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9800] rounded-xl resize-none"
              ></textarea>
            </div>

            <Button type="submit" className="w-full h-14 bg-[#ff9800] hover:bg-[#e65100] text-black font-bold text-lg rounded-xl transition-all">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}