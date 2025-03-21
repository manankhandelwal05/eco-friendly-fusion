
import React from "react";
import { Link } from "react-router-dom";
import { 
  Upload, 
  ArrowUp, 
  Truck, 
  Recycle, 
  Clock, 
  Calendar, 
  ExternalLink,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { EcoPointsBadge } from "@/components/ui-custom/EcoPointsBadge";

// Mock data for waste history
const wasteHistory = [
  { id: 1, type: "Plastic", weight: "2.5kg", points: 25, date: "2023-06-10" },
  { id: 2, type: "Paper", weight: "3.2kg", points: 16, date: "2023-06-05" },
  { id: 3, type: "E-waste", weight: "1.8kg", points: 54, date: "2023-05-28" },
  { id: 4, type: "Metal", weight: "4.1kg", points: 41, date: "2023-05-20" },
];

// Mock data for upcoming events
const upcomingEvents = [
  { 
    id: 1, 
    title: "Beach Cleanup Drive", 
    location: "Sunset Beach", 
    date: "July 15, 2023", 
    participants: 24 
  },
  { 
    id: 2, 
    title: "Tree Planting Event", 
    location: "City Park", 
    date: "July 22, 2023", 
    participants: 38 
  },
];

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 py-8 md:py-12 mx-auto">
          {/* Page header */}
          <div className="flex flex-col gap-2 mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground">
              Track your recycling activity and eco impact
            </p>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard className="animate-scale-in" style={{ animationDelay: "0ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Eco-Points</h3>
                  <div className="size-10 rounded-full bg-eco-light grid place-items-center">
                    <Trophy className="size-5 text-eco-green" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">250</p>
                  <div className="flex items-center gap-1 text-eco-green text-sm mt-1">
                    <ArrowUp className="size-4" />
                    <span>12% this month</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "50ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Waste Recycled</h3>
                  <div className="size-10 rounded-full bg-blue-50 grid place-items-center">
                    <Recycle className="size-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">42.3 kg</p>
                  <div className="flex items-center gap-1 text-blue-500 text-sm mt-1">
                    <ArrowUp className="size-4" />
                    <span>8% this month</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Pickups Completed</h3>
                  <div className="size-10 rounded-full bg-purple-50 grid place-items-center">
                    <Truck className="size-5 text-purple-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">12</p>
                  <div className="flex items-center gap-1 text-purple-500 text-sm mt-1">
                    <ArrowUp className="size-4" />
                    <span>3 this month</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "150ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Requests</h3>
                  <div className="size-10 rounded-full bg-amber-50 grid place-items-center">
                    <Clock className="size-5 text-amber-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground mt-1">Pending pickup</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Rewards progress */}
            <GlassCard className="lg:col-span-1 animate-scale-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-3">
                <CardTitle>Rewards Progress</CardTitle>
                <CardDescription>
                  You're on your way to the next reward level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Green Enthusiast</span>
                      <span className="text-sm text-muted-foreground">250/500 points</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="text-sm font-medium">Upcoming rewards:</div>
                    <div className="p-3 border rounded-lg bg-muted/30 flex items-start gap-3">
                      <div className="size-10 rounded-full bg-eco-light grid place-items-center shrink-0">
                        <Trophy className="size-5 text-eco-green" />
                      </div>
                      <div>
                        <div className="font-medium">Eco-Champion Badge</div>
                        <div className="text-sm text-muted-foreground">Unlock at 500 points</div>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg bg-muted/30 flex items-start gap-3">
                      <div className="size-10 rounded-full bg-eco-light grid place-items-center shrink-0">
                        <Trophy className="size-5 text-eco-green" />
                      </div>
                      <div>
                        <div className="font-medium">$25 Cashback Reward</div>
                        <div className="text-sm text-muted-foreground">Unlock at 750 points</div>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link to="/user/rewards">
                      View all rewards
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </GlassCard>

            {/* Middle and Right column - Recent history and events */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload waste banner */}
              <GlassCard className="bg-gradient-to-r from-eco-green/10 to-eco-blue/10 animate-scale-in" style={{ animationDelay: "250ms" }}>
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Ready to recycle more waste?</h3>
                    <p className="text-muted-foreground">
                      Upload a photo of your waste and request a pickup
                    </p>
                  </div>
                  <Button size="lg" className="shrink-0" asChild>
                    <Link to="/user/waste-upload">
                      <Upload className="mr-2 size-4" />
                      Upload Waste
                    </Link>
                  </Button>
                </div>
              </GlassCard>

              {/* Recent activity */}
              <GlassCard className="animate-scale-in" style={{ animationDelay: "300ms" }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Your recent waste recycling history
                      </CardDescription>
                    </div>
                    <Link to="/user/history" className="text-sm text-primary hover:underline flex items-center">
                      View all
                      <ExternalLink className="ml-1 size-3" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wasteHistory.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-full grid place-items-center shrink-0 
                            ${item.type === "Plastic" ? "bg-blue-50 text-blue-500" : 
                              item.type === "Paper" ? "bg-amber-50 text-amber-500" : 
                              item.type === "E-waste" ? "bg-purple-50 text-purple-500" :
                              "bg-gray-50 text-gray-500"}`}
                          >
                            <Recycle className="size-5" />
                          </div>
                          <div>
                            <div className="font-medium">{item.type}</div>
                            <div className="text-sm text-muted-foreground">{item.weight}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <EcoPointsBadge points={item.points} size="sm" />
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric"
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </GlassCard>

              {/* Upcoming community events */}
              <GlassCard className="animate-scale-in" style={{ animationDelay: "350ms" }}>
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Community Events</CardTitle>
                  <CardDescription>
                    Join these events to earn bonus eco-points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg overflow-hidden">
                        <div className="p-4 flex gap-4">
                          <div className="size-12 rounded-md bg-primary/10 grid place-items-center shrink-0">
                            <Calendar className="size-6 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                            <div className="flex items-center gap-3 text-sm">
                              <span>{event.date}</span>
                              <span className="text-muted-foreground">•</span>
                              <span>{event.participants} participants</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-muted/30 px-4 py-2 border-t">
                          <span className="text-sm font-medium">Earn 50 bonus points</span>
                          <Button variant="outline" size="sm">Join Event</Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/community-events">
                        Browse more events
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
