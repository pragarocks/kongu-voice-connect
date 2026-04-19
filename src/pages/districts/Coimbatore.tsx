import React, { useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import coimbatoreNews from '@/data/news/coimbatore.json';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Coimbatore = () => {
  const [filter, setFilter] = useState("All");

  // Logic to identify the main featured story (PM Modi Rally)
  const featured = coimbatoreNews.find(item => item.featured) || coimbatoreNews[0];
  
  const categories = ["All", "Election", "Campaign", "Awareness", "Enforcement"];
  
  const newsList = filter === "All" 
    ? coimbatoreNews.filter(item => item.id !== featured.id)
    : coimbatoreNews.filter(item => item.category === filter && item.id !== featured.id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 1. Use your existing SiteHeader component */}
      <SiteHeader />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        {/* District Title Section */}
        <div className="mb-12">
          <h1 className="text-6xl font-black tracking-tighter mb-3">Coimbatore</h1>
          <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">
            <span>10 constituencies</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            <span>Polling: April 23, 2026</span>
          </div>
        </div>

        {/* 2. Featured Hero Section (Blue Gradient Style) */}
        <section className="mb-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1b63cc] via-[#1a73e8] to-[#673ab7] p-10 md:p-14 text-white shadow-2xl flex flex-col justify-center min-h-[420px]">
            <div className="flex gap-3 mb-8">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md uppercase text-[10px] py-1 px-3">
                ★ Featured
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md uppercase text-[10px] py-1 px-3">
                {featured.category}
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.1] mb-6 max-w-3xl drop-shadow-xl">
              {featured.title}
            </h2>
            <p className="text-lg text-blue-50/80 mb-8 max-w-2xl leading-relaxed">
              {featured.summary}
            </p>
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest opacity-70">
              <span>{featured.date}</span>
              <button className="hover:underline flex items-center gap-1">Read more <span className="text-base">→</span></button>
            </div>
          </div>
        </section>

        {/* 3. News Feed with Filter Tabs */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b pb-8">
            <h2 className="text-3xl font-black tracking-tighter">Latest News</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button 
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-6 h-9 text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                    filter === cat ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-primary/5"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsList.map((item) => (
              <Card key={item.id} className="border-none shadow-none group cursor-pointer hover:bg-accent/50 transition-all rounded-2xl p-4 -m-4">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-primary">{item.category}</span>
                    <span className="text-muted-foreground/60">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-extrabold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* 4. Use your existing SiteFooter component */}
      <SiteFooter />
    </div>
  );
};

export default Coimbatore;
