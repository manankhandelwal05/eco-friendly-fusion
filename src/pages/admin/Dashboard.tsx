
import React, { useState } from "react";
import { 
  Users, 
  UserCog, 
  Recycle, 
  BarChart3, 
  TrendingUp, 
  Download,
  CalendarDays, 
  ArrowUpRight, 
  ArrowDownRight, 
  CircleUser,
  UserCheck,
  Settings,
  Leaf,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui-custom/GlassCard";

// Chart import
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

// Mock data for charts
const monthlyWasteData = [
  { name: "Jan", plastic: 4000, paper: 2400, ewaste: 1500, organic: 3200 },
  { name: "Feb", plastic: 3500, paper: 2100, ewaste: 1200, organic: 3000 },
  { name: "Mar", plastic: 5000, paper: 2600, ewaste: 1700, organic: 3800 },
  { name: "Apr", plastic: 4200, paper: 2800, ewaste: 1900, organic: 3500 },
  { name: "May", plastic: 4800, paper: 3000, ewaste: 2000, organic: 4000 },
  { name: "Jun", plastic: 5500, paper: 3200, ewaste: 2200, organic: 4200 },
];

const wasteDistributionData = [
  { name: "Plastic", value: 35 },
  { name: "Paper", value: 25 },
  { name: "E-waste", value: 15 },
  { name: "Metal", value: 10 },
  { name: "Organic", value: 15 },
];

const userGrowthData = [
  { name: "Jan", users: 150 },
  { name: "Feb", users: 210 },
  { name: "Mar", users: 290 },
  { name: "Apr", users: 350 },
  { name: "May", users: 450 },
  { name: "Jun", users: 580 },
];

const ecoPointsData = [
  { name: "Jan", points: 12500 },
  { name: "Feb", points: 14800 },
  { name: "Mar", points: 18200 },
  { name: "Apr", points: 21500 },
  { name: "May", points: 25800 },
  { name: "Jun", points: 31000 },
];

const COLORS = ['#34D399', '#60A5FA', '#A78BFA', '#F59E0B', '#6D28D9'];

// Mock users for the table
const recentUsers = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma@example.com",
    joinDate: "June 12, 2023",
    points: 320,
    pickups: 8,
    status: "active"
  },
  {
    id: 2,
    name: "Alex Thompson",
    email: "alex@example.com",
    joinDate: "June 10, 2023",
    points: 150,
    pickups: 4,
    status: "active"
  },
  {
    id: 3,
    name: "Ryan Patel",
    email: "ryan@example.com",
    joinDate: "June 8, 2023",
    points: 85,
    pickups: 2,
    status: "active"
  },
  {
    id: 4,
    name: "Jordan Lee",
    email: "jordan@example.com",
    joinDate: "June 5, 2023",
    points: 210,
    pickups: 5,
    status: "inactive"
  },
  {
    id: 5,
    name: "Taylor Rodriguez",
    email: "taylor@example.com",
    joinDate: "June 1, 2023",
    points: 450,
    pickups: 12,
    status: "active"
  }
];

// Mock staff for the table
const staffMembers = [
  {
    id: 1,
    name: "James Davis",
    email: "james@example.com",
    role: "Pickup Staff",
    activePickups: 3,
    completedPickups: 45,
    performance: 95
  },
  {
    id: 2,
    name: "Sophia Chen",
    email: "sophia@example.com",
    role: "Sorting Staff",
    activePickups: 0,
    completedPickups: 120,
    performance: 98
  },
  {
    id: 3,
    name: "Daniel Kim",
    email: "daniel@example.com",
    role: "Pickup Staff",
    activePickups: 2,
    completedPickups: 37,
    performance: 90
  },
  {
    id: 4,
    name: "Olivia Williams",
    email: "olivia@example.com",
    role: "Sorting Staff",
    activePickups: 0,
    completedPickups: 85,
    performance: 92
  }
];

// Mock event approvals
const pendingEvents = [
  {
    id: 1,
    title: "Beach Cleanup",
    organizer: "Emma Wilson",
    date: "July 15, 2023",
    location: "Sunny Beach",
    participants: 25,
    status: "pending"
  },
  {
    id: 2,
    title: "Park Restoration",
    organizer: "Ryan Patel",
    date: "July 22, 2023",
    location: "Central Park",
    participants: 18,
    status: "pending"
  },
  {
    id: 3,
    title: "Recycling Workshop",
    organizer: "Taylor Rodriguez",
    date: "July 29, 2023",
    location: "Community Center",
    participants: 40,
    status: "pending"
  }
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Key metrics
  const totalUsers = 1250;
  const totalStaff = 28;
  const wasteCollected = "52.8 tons";
  const totalEcoPoints = "145,200";
  
  // Calculate month-over-month growth
  const userGrowth = 22.5; // percentage
  const wasteGrowth = 15.2; // percentage
  const pointsGrowth = 18.7; // percentage

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 py-8 md:py-12 mx-auto">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor platform activity and manage users
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <CalendarDays className="mr-2 size-4" />
                June 2023
              </Button>
              <Button variant="outline">
                <Download className="mr-2 size-4" />
                Reports
              </Button>
              <Button>
                <Settings className="mr-2 size-4" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard className="animate-scale-in" style={{ animationDelay: "0ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
                  <div className="size-10 rounded-full bg-blue-50 grid place-items-center">
                    <Users className="size-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{totalUsers}</p>
                  <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
                    <ArrowUpRight className="size-4" />
                    <span>{userGrowth}% this month</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "50ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Staff</h3>
                  <div className="size-10 rounded-full bg-purple-50 grid place-items-center">
                    <UserCog className="size-5 text-purple-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{totalStaff}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    In 5 locations
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Waste Collected</h3>
                  <div className="size-10 rounded-full bg-green-50 grid place-items-center">
                    <Recycle className="size-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{wasteCollected}</p>
                  <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
                    <ArrowUpRight className="size-4" />
                    <span>{wasteGrowth}% this month</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "150ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Eco-Points</h3>
                  <div className="size-10 rounded-full bg-amber-50 grid place-items-center">
                    <Leaf className="size-5 text-amber-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{totalEcoPoints}</p>
                  <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
                    <ArrowUpRight className="size-4" />
                    <span>{pointsGrowth}% this month</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Waste Collection */}
            <GlassCard className="animate-scale-in lg:col-span-2" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-0">
                <CardTitle>Monthly Waste Collection</CardTitle>
                <CardDescription>
                  Breakdown of waste types collected over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyWasteData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="plastic" fill="#60A5FA" />
                      <Bar dataKey="paper" fill="#F59E0B" />
                      <Bar dataKey="ewaste" fill="#A78BFA" />
                      <Bar dataKey="organic" fill="#34D399" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </GlassCard>
            
            {/* Waste Distribution */}
            <GlassCard className="animate-scale-in" style={{ animationDelay: "250ms" }}>
              <CardHeader className="pb-0">
                <CardTitle>Waste Distribution</CardTitle>
                <CardDescription>
                  Breakdown of collected waste by category
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {wasteDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4">
                  {wasteDistributionData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="size-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </GlassCard>
            
            {/* User Growth */}
            <GlassCard className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <CardHeader className="pb-0">
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Monthly active user growth
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Tabs for Users, Staff, and Events */}
          <Tabs defaultValue="users" className="mb-8 animate-scale-in" style={{ animationDelay: "350ms" }}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users" className="mt-0 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold">Recent Users</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-[250px] pl-9"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <GlassCard>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-3 px-4 font-medium">User</th>
                        <th className="py-3 px-4 font-medium">Join Date</th>
                        <th className="py-3 px-4 font-medium">Points</th>
                        <th className="py-3 px-4 font-medium">Pickups</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b last:border-0 hover:bg-muted/20">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-full bg-primary/10 grid place-items-center">
                                <CircleUser className="size-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{user.joinDate}</td>
                          <td className="py-3 px-4">{user.points}</td>
                          <td className="py-3 px-4">{user.pickups}</td>
                          <td className="py-3 px-4">
                            {user.status === "active" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                Inactive
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="py-4 px-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of {totalUsers} users
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            {/* Staff Tab */}
            <TabsContent value="staff" className="mt-0 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold">Staff Members</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search staff..."
                      className="w-full sm:w-[250px] pl-9"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="sorting">Sorting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <GlassCard>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-3 px-4 font-medium">Staff Member</th>
                        <th className="py-3 px-4 font-medium">Role</th>
                        <th className="py-3 px-4 font-medium">Active Pickups</th>
                        <th className="py-3 px-4 font-medium">Completed</th>
                        <th className="py-3 px-4 font-medium">Performance</th>
                        <th className="py-3 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffMembers.map((staff) => (
                        <tr key={staff.id} className="border-b last:border-0 hover:bg-muted/20">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-full bg-primary/10 grid place-items-center">
                                <UserCheck className="size-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{staff.name}</div>
                                <div className="text-sm text-muted-foreground">{staff.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-muted/50">
                              {staff.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{staff.activePickups}</td>
                          <td className="py-3 px-4">{staff.completedPickups}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Progress value={staff.performance} className="h-2 w-24" />
                              <span className="text-sm">{staff.performance}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="py-4 px-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 4 of {totalStaff} staff members
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="mt-0 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold">Pending Event Approvals</h2>
                <Button>
                  <Leaf className="mr-2 size-4" />
                  Create New Event
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingEvents.map((event) => (
                  <GlassCard key={event.id} hoverable>
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Pending Approval
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          ID: #{event.id}
                        </div>
                      </div>
                      
                      <div className="space-y-1 mb-4">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Organized by {event.organizer}
                        </p>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarDays className="size-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="size-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="size-4 text-muted-foreground" />
                          <span>{event.participants} participants</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t flex gap-2">
                        <Button variant="outline" className="flex-1">Decline</Button>
                        <Button className="flex-1">Approve</Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Eco-Points Trend */}
          <GlassCard className="mb-8 animate-scale-in" style={{ animationDelay: "400ms" }}>
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>Eco-Points Trend</CardTitle>
                  <CardDescription>
                    Monthly eco-points awarded to users
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <TrendingUp className="mr-2 size-4" />
                  View Full Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ecoPointsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
