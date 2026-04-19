import React from 'react';
// Import the JSON data from your data folder
import coimbatoreNews from '../../data/news/coimbatore.json';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Coimbatore = () => {
  const featuredNews = coimbatoreNews.filter(item => item.featured);
  const regularNews = coimbatoreNews.filter(item => !item.featured);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Coimbatore</h1>
        <p className="text-muted-foreground">Latest election updates and constituency news.</p>
      </header>

      {/* Featured Headlines */}
      {featuredNews.length > 0 && (
        <section className="grid gap-4 md:grid-cols-2">
          {featuredNews.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-primary shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="destructive">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* General Feed */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest Updates</h2>
        <div className="grid gap-4">
          {regularNews.map((item) => (
            <Card key={item.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px]">{item.category}</Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

// This line is the most important part! It fixes your build error.
export default Coimbatore;
