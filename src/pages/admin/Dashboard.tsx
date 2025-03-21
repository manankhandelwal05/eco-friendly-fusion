
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Truck,
  Recycle,
  Award,
  Settings,
  Search,
  User,
  Trash2,
  Edit,
  TrendingUp,
  BarChart4,
  Calendar,
  Filter,
  Download,
  PlusCircle,
  Database,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ListFilter,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { EcoPointsBadge } from "@/components/ui-custom/EcoPointsBadge";
import { toast } from "sonner";

// Mock data for demonstrations
const mockUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "user", status: "active", ecoPoints: 420, registeredDate: "2023-10-15", pickups: 12 },
  { id: 2, name: "Sam Wilson", email: "sam@example.com", role: "user", status: "active", ecoPoints: 280, registeredDate: "2023-09-22", pickups: 8 },
  { id: 3, name: "Taylor Kim", email: "taylor@example.com", role: "staff", status: "active", ecoPoints: 0, registeredDate: "2023-07-10", pickups: 0 },
  { id: 4, name: "Casey Lopez", email: "casey@example.com", role: "user", status: "inactive", ecoPoints: 150, registeredDate: "2023-11-05", pickups: 5 },
  { id: 5, name: "Morgan Lee", email: "morgan@example.com", role: "staff", status: "active", ecoPoints: 0, registeredDate: "2023-08-30", pickups: 0 },
  { id: 6, name: "Jordan Chen", email: "jordan@example.com", role: "admin", status: "active", ecoPoints: 0, registeredDate: "2023-05-15", pickups: 0 },
];

const mockPickups = [
  { id: 1, userId: 1, userName: "Alex Johnson", wasteType: "Plastic", weight: 2.5, status: "completed", ecoPoints: 25, date: "2023-12-15" },
  { id: 2, userId: 2, userName: "Sam Wilson", wasteType: "Paper", weight: 3.0, status: "completed", ecoPoints: 15, date: "2023-12-18" },
  { id: 3, userId: 1, userName: "Alex Johnson", wasteType: "E-Waste", weight: 1.2, status: "in-progress", ecoPoints: 0, date: "2023-12-20" },
  { id: 4, userId: 4, userName: "Casey Lopez", wasteType: "Glass", weight: 4.0, status: "pending", ecoPoints: 0, date: "2023-12-22" },
  { id: 5, userId: 2, userName: "Sam Wilson", wasteType: "Metal", weight: 1.8, status: "completed", ecoPoints: 27, date: "2023-12-10" },
];

const mockRewards = [
  { id: 1, name: "10% Discount Coupon", points: 100, available: true, claimed: 45 },
  { id: 2, name: "$20 Cashback", points: 500, available: true, claimed: 23 },
  { id: 3, name: "Free Reusable Bottle", points: 300, available: true, claimed: 56 },
  { id: 4, name: "Earth Day Special Pack", points: 250, available: false, claimed: 30 },
];

const mockTransactions = [
  { id: 1, userId: 1, userName: "Alex Johnson", type: "earned", points: 25, date: "2023-12-15", reason: "Plastic waste recycling" },
  { id: 2, userId: 2, userName: "Sam Wilson", type: "redeemed", points: 100, date: "2023-12-16", reason: "10% Discount Coupon" },
  { id: 3, userId: 1, userName: "Alex Johnson", type: "earned", points: 30, date: "2023-12-17", reason: "E-waste recycling" },
  { id: 4, userId: 4, userName: "Casey Lopez", type: "redeemed", points: 500, date: "2023-12-18", reason: "$20 Cashback" },
  { id: 5, userId: 2, userName: "Sam Wilson", type: "earned", points: 15, date: "2023-12-19", reason: "Paper waste recycling" },
];

const mockWasteCategories = [
  { id: 1, name: "Plastic", pointsPerKg: 10, totalCollected: 450, trend: "up" },
  { id: 2, name: "Paper", pointsPerKg: 5, totalCollected: 780, trend: "up" },
  { id: 3, name: "E-Waste", pointsPerKg: 30, totalCollected: 120, trend: "down" },
  { id: 4, name: "Glass", pointsPerKg: 8, totalCollected: 320, trend: "stable" },
  { id: 5, name: "Metal", pointsPerKg: 15, totalCollected: 280, trend: "up" },
  { id: 6, name: "Organic", pointsPerKg: 3, totalCollected: 920, trend: "up" },
];

// Mock stats for overview
const mockStats = {
  totalUsers: 348,
  totalStaff: 12,
  totalWaste: 2870,
  totalEcoPoints: 28450,
  activePickups: 27,
  pendingVerifications: 15,
  wasteAnalysisAccuracy: 94.5,
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWasteCategory, setSelectedWasteCategory] = useState<string | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddRewardDialog, setShowAddRewardDialog] = useState(false);
  const [showUpdateCategoryDialog, setShowUpdateCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Handlers
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleAddUser = () => {
    toast.success("New user added successfully");
    setShowAddUserDialog(false);
  };

  const handleAddReward = () => {
    toast.success("New reward added successfully");
    setShowAddRewardDialog(false);
  };

  const handleUpdateCategory = () => {
    toast.success("Waste category updated successfully");
    setShowUpdateCategoryDialog(false);
  };

  const handleUserAction = (action: string, userId: number) => {
    switch (action) {
      case "edit":
        toast.info("Opening user editor...");
        break;
      case "delete":
        toast.success("User deleted successfully");
        break;
      case "suspend":
        toast.success("User suspended successfully");
        break;
      default:
        break;
    }
  };

  const handleRewardAction = (action: string, rewardId: number) => {
    switch (action) {
      case "edit":
        toast.info("Opening reward editor...");
        break;
      case "delete":
        toast.success("Reward deleted successfully");
        break;
      case "toggle":
        toast.success("Reward availability updated");
        break;
      default:
        break;
    }
  };

  const handleViewCategory = (category: any) => {
    setSelectedCategory(category);
    setShowUpdateCategoryDialog(true);
  };

  // Filter functions
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPickups = selectedWasteCategory 
    ? mockPickups.filter(pickup => pickup.wasteType.toLowerCase() === selectedWasteCategory.toLowerCase())
    : mockPickups;

  // Sidebar menu items
  const sidebarMenuItems = [
    { id: "overview", label: "Overview", icon: BarChart4, active: activeTab === "overview" },
    { id: "users", label: "Users & Staff", icon: Users, active: activeTab === "users" },
    { id: "pickups", label: "Pickups", icon: Truck, active: activeTab === "pickups" },
    { id: "waste", label: "Waste Categories", icon: Recycle, active: activeTab === "waste" },
    { id: "rewards", label: "Rewards", icon: Award, active: activeTab === "rewards" },
    { id: "transactions", label: "Transactions", icon: Database, active: activeTab === "transactions" },
    { id: "settings", label: "Settings", icon: Settings, active: activeTab === "settings" },
  ];

  // Admin dashboard layout with sidebar
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background to-muted/30">
        <Sidebar>
          <SidebarHeader className="border-b border-border/40 pb-2">
            <div className="flex items-center px-2 py-2">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Recycle className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-2">
                <h2 className="text-lg font-semibold">EcoWaste Admin</h2>
                <p className="text-xs text-muted-foreground">Management Console</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleTabChange(item.id)}
                    isActive={item.active}
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/40 pt-2">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@ecowaste.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate("/auth/login")}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <Header />
          <main className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your waste management and recycling platform
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SidebarTrigger />
              </div>
            </div>

            {/* Dashboard content based on active tab */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <GlassCard className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1">{mockStats.totalUsers}</h3>
                      </div>
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      <span>+14% from last month</span>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Waste Collected</p>
                        <h3 className="text-2xl font-bold mt-1">{mockStats.totalWaste} kg</h3>
                      </div>
                      <div className="rounded-full bg-green-100 p-2 text-green-600">
                        <Recycle className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      <span>+23% from last month</span>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Eco-Points</p>
                        <h3 className="text-2xl font-bold mt-1">{mockStats.totalEcoPoints}</h3>
                      </div>
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <Award className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      <span>+18% from last month</span>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Pickups</p>
                        <h3 className="text-2xl font-bold mt-1">{mockStats.activePickups}</h3>
                      </div>
                      <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                        <Truck className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-xs text-amber-600">
                      <AlertCircle className="h-3.5 w-3.5 mr-1" />
                      <span>{mockStats.pendingVerifications} pending verification</span>
                    </div>
                  </GlassCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GlassCard>
                    <CardHeader>
                      <CardTitle>Waste Collection by Category</CardTitle>
                      <CardDescription>
                        Distribution of waste collected across different categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockWasteCategories.map(category => (
                          <div key={category.id} className="space-y-2">
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <Recycle className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm font-medium">{category.name}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">{category.totalCollected} kg</span>
                                {category.trend === "up" && <TrendingUp className="h-4 w-4 ml-1 text-green-500" />}
                                {category.trend === "down" && <TrendingUp className="h-4 w-4 ml-1 text-red-500 rotate-180" />}
                                {category.trend === "stable" && <TrendingUp className="h-4 w-4 ml-1 text-amber-500 rotate-90" />}
                              </div>
                            </div>
                            <Progress value={(category.totalCollected / 1000) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </GlassCard>

                  <GlassCard>
                    <CardHeader>
                      <CardTitle>Recent Pickup Requests</CardTitle>
                      <CardDescription>
                        Latest waste pickup requests from users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockPickups.slice(0, 4).map(pickup => (
                          <div key={pickup.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>{pickup.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="ml-3">
                                <p className="text-sm font-medium">{pickup.userName}</p>
                                <p className="text-xs text-muted-foreground">{pickup.wasteType} • {pickup.date}</p>
                              </div>
                            </div>
                            <Badge variant={
                              pickup.status === "completed" ? "success" : 
                              pickup.status === "in-progress" ? "warning" : "outline"
                            }>
                              {pickup.status === "completed" ? "Completed" : 
                               pickup.status === "in-progress" ? "In Progress" : "Pending"}
                            </Badge>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab("pickups")}>
                          View All Pickups
                        </Button>
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <GlassCard className="col-span-1">
                    <CardHeader>
                      <CardTitle>AI System Performance</CardTitle>
                      <CardDescription>
                        Monitoring AI categorization accuracy
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle className="text-muted/30 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                            <circle className="text-primary stroke-current" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" 
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${2 * Math.PI * 40 * (1 - mockStats.wasteAnalysisAccuracy/100)}`}
                              transform="rotate(-90 50 50)"
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-2xl font-bold">{mockStats.wasteAnalysisAccuracy}%</span>
                              <span className="block text-xs text-muted-foreground">Accuracy</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Waste Recognition</span>
                            <span>96.3%</span>
                          </div>
                          <Progress value={96.3} className="h-1" />
                          
                          <div className="flex justify-between text-xs">
                            <span>Weight Estimation</span>
                            <span>94.1%</span>
                          </div>
                          <Progress value={94.1} className="h-1" />
                          
                          <div className="flex justify-between text-xs">
                            <span>Quality Assessment</span>
                            <span>92.8%</span>
                          </div>
                          <Progress value={92.8} className="h-1" />
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>

                  <GlassCard className="col-span-1 md:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>
                        Latest eco-point transactions in the system
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Points</TableHead>
                                <TableHead>Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockTransactions.slice(0, 5).map(transaction => (
                                <TableRow key={transaction.id}>
                                  <TableCell className="font-medium">{transaction.userName}</TableCell>
                                  <TableCell>
                                    <Badge variant={transaction.type === "earned" ? "success" : "default"}>
                                      {transaction.type === "earned" ? "Earned" : "Redeemed"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <span className={transaction.type === "earned" ? "text-green-600" : "text-amber-600"}>
                                      {transaction.type === "earned" ? "+" : "-"}{transaction.points}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                          View All Transactions
                        </Button>
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search users..."
                      className="w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="user">Users</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account in the system.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="Enter full name" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter email address" />
                        </div>
                        <div className="grid gap-2">
                          <Label>User Role</Label>
                          <RadioGroup defaultValue="user">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="user" id="r1" />
                              <Label htmlFor="r1">User</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="staff" id="r2" />
                              <Label htmlFor="r2">Staff</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="admin" id="r3" />
                              <Label htmlFor="r3">Admin</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddUser}>Add User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <GlassCard>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Eco-Points</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={
                                user.role === "admin" ? "default" : 
                                user.role === "staff" ? "outline" : "secondary"
                              }>
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className={`h-2 w-2 rounded-full mr-2 ${user.status === "active" ? "bg-green-500" : "bg-slate-300"}`} />
                                <span className="capitalize">{user.status}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {user.role === "user" ? (
                                <EcoPointsBadge points={user.ecoPoints} />
                              ) : (
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </TableCell>
                            <TableCell>{user.registeredDate}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVerticalIcon className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleUserAction("edit", user.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                  </DropdownMenuItem>
                                  {user.status === "active" ? (
                                    <DropdownMenuItem onClick={() => handleUserAction("suspend", user.id)}>
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Suspend
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={() => handleUserAction("activate", user.id)}>
                                      <CheckCircle2 className="mr-2 h-4 w-4" />
                                      Activate
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    onClick={() => handleUserAction("delete", user.id)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </GlassCard>
              </div>
            )}

            {activeTab === "waste" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Waste Categories Management</h2>
                  <Dialog open={showUpdateCategoryDialog} onOpenChange={setShowUpdateCategoryDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedCategory ? "Update" : "Add New"} Waste Category</DialogTitle>
                        <DialogDescription>
                          {selectedCategory ? "Update the details of this waste category." : "Create a new waste category in the system."}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="catname">Category Name</Label>
                          <Input id="catname" placeholder="e.g. Plastic, Paper, Metal"
                            defaultValue={selectedCategory?.name} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="points">Points Per Kg</Label>
                          <Input id="points" type="number" placeholder="Enter points value"
                            defaultValue={selectedCategory?.pointsPerKg} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="desc">Description</Label>
                          <Input id="desc" placeholder="Brief description of this waste type" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowUpdateCategoryDialog(false)}>Cancel</Button>
                        <Button onClick={handleUpdateCategory}>{selectedCategory ? "Update" : "Add"} Category</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockWasteCategories.map(category => (
                    <GlassCard key={category.id} className="relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-16 h-16 ${
                        category.trend === "up" ? "bg-green-500/10" : 
                        category.trend === "down" ? "bg-red-500/10" : "bg-amber-500/10"
                      } flex items-center justify-center rounded-bl-full`}>
                        {category.trend === "up" && <TrendingUp className="h-5 w-5 text-green-500" />}
                        {category.trend === "down" && <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />}
                        {category.trend === "stable" && <TrendingUp className="h-5 w-5 text-amber-500 rotate-90" />}
                      </div>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Recycle className="h-5 w-5 mr-2 text-primary" />
                          {category.name}
                        </CardTitle>
                        <CardDescription>
                          {category.pointsPerKg} eco-points per kg
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Total Collected</span>
                              <span className="font-medium">{category.totalCollected} kg</span>
                            </div>
                            <Progress value={(category.totalCollected / 1000) * 100} className="h-2" />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleViewCategory(category)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </GlassCard>
                  ))}
                </div>

                <GlassCard>
                  <CardHeader>
                    <CardTitle>AI Model Training</CardTitle>
                    <CardDescription>
                      Manage the AI models for waste classification
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Image Recognition Model</h3>
                            <p className="text-sm text-muted-foreground">Based on YOLOv8 architecture</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Last trained: <span className="text-muted-foreground">3 days ago</span></p>
                          <Button size="sm" className="mt-2">Train Model</Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Weight Estimation Model</h3>
                            <p className="text-sm text-muted-foreground">Computer vision for material density</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Last trained: <span className="text-muted-foreground">1 week ago</span></p>
                          <Button size="sm" className="mt-2">Train Model</Button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Quality Assessment Model</h3>
                            <p className="text-sm text-muted-foreground">Evaluates recyclability and condition</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Last trained: <span className="text-muted-foreground">2 weeks ago</span></p>
                          <Button size="sm" className="mt-2">Train Model</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </GlassCard>
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Rewards Management</h2>
                  <Dialog open={showAddRewardDialog} onOpenChange={setShowAddRewardDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Reward
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Reward</DialogTitle>
                        <DialogDescription>
                          Create a new reward that users can redeem with their eco-points.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="rewardname">Reward Name</Label>
                          <Input id="rewardname" placeholder="Enter reward name" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="rewardpoints">Required Points</Label>
                          <Input id="rewardpoints" type="number" placeholder="Points needed to redeem" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="rewarddesc">Description</Label>
                          <Input id="rewarddesc" placeholder="Brief description of this reward" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="available" defaultChecked />
                          <Label htmlFor="available">Available for redemption</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddRewardDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddReward}>Add Reward</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockRewards.map(reward => (
                    <GlassCard key={reward.id} className="relative">
                      {!reward.available && (
                        <div className="absolute -right-2 -top-2 bg-muted z-10 rounded-full px-2 py-1 text-xs border border-border">
                          Unavailable
                        </div>
                      )}
                      <CardHeader className={!reward.available ? "opacity-50" : ""}>
                        <CardTitle className="flex items-center">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          {reward.name}
                        </CardTitle>
                        <CardDescription>
                          <EcoPointsBadge points={reward.points} /> required
                        </CardDescription>
                      </CardHeader>
                      <CardContent className={!reward.available ? "opacity-50" : ""}>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Times Claimed</span>
                              <span className="font-medium">{reward.claimed}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex-1">
                                  <MoreHorizontalIcon className="h-4 w-4 mr-2" />
                                  Manage
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleRewardAction("edit", reward.id)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRewardAction("toggle", reward.id)}>
                                  {reward.available ? (
                                    <>
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Disable
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="mr-2 h-4 w-4" />
                                      Enable
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleRewardAction("delete", reward.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "pickups" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search pickups..."
                      className="w-full sm:w-[300px]"
                      prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                    <Select
                      value={selectedWasteCategory || ""}
                      onValueChange={setSelectedWasteCategory}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {mockWasteCategories.map(cat => (
                          <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <GlassCard>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Waste Type</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Eco-Points</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPickups.map(pickup => (
                          <TableRow key={pickup.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{pickup.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{pickup.userName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {pickup.wasteType}
                              </Badge>
                            </TableCell>
                            <TableCell>{pickup.weight} kg</TableCell>
                            <TableCell>
                              <Badge variant={
                                pickup.status === "completed" ? "success" : 
                                pickup.status === "in-progress" ? "warning" : "outline"
                              }>
                                {pickup.status === "completed" ? "Completed" : 
                                 pickup.status === "in-progress" ? "In Progress" : "Pending"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {pickup.ecoPoints > 0 ? (
                                <EcoPointsBadge points={pickup.ecoPoints} />
                              ) : (
                                <span className="text-muted-foreground">Pending</span>
                              )}
                            </TableCell>
                            <TableCell>{pickup.date}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVerticalIcon className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <UserRound className="mr-2 h-4 w-4" />
                                    Assign Staff
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart className="mr-2 h-4 w-4" />
                                    Update Status
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </GlassCard>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search transactions..."
                      className="w-[300px]"
                      prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                    />
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="earned">Earned</SelectItem>
                        <SelectItem value="redeemed">Redeemed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>

                <GlassCard>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map(transaction => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">#{transaction.id.toString().padStart(6, '0')}</TableCell>
                            <TableCell>{transaction.userName}</TableCell>
                            <TableCell>
                              <Badge variant={transaction.type === "earned" ? "success" : "default"}>
                                {transaction.type === "earned" ? "Earned" : "Redeemed"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={transaction.type === "earned" ? "text-green-600" : "text-amber-600"}>
                                {transaction.type === "earned" ? "+" : "-"}{transaction.points}
                              </span>
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{transaction.reason}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </GlassCard>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 animate-fade-in">
                <GlassCard>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>
                      Configure the waste management platform settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="general">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="ai">AI & ML</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="api">API & Integrations</TabsTrigger>
                      </TabsList>
                      <TabsContent value="general" className="mt-4 space-y-4">
                        <div className="grid gap-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Enable User Registration</h3>
                              <p className="text-sm text-muted-foreground">Allow new users to register on the platform</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Eco Points System</h3>
                              <p className="text-sm text-muted-foreground">Enable or disable the eco-points reward system</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Maintenance Mode</h3>
                              <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="ai" className="mt-4 space-y-4">
                        <div className="grid gap-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">AI Waste Analysis</h3>
                              <p className="text-sm text-muted-foreground">Enable AI-powered waste analysis</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label>AI Model Selection</Label>
                            <Select defaultValue="yolov8">
                              <SelectTrigger>
                                <SelectValue placeholder="Select AI model" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yolov8">YOLOv8 (Recommended)</SelectItem>
                                <SelectItem value="googlecloud">Google Cloud Vision</SelectItem>
                                <SelectItem value="custom">Custom Trained Model</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Confidence Threshold</Label>
                            <Input type="number" placeholder="0.7" defaultValue="0.7" />
                            <p className="text-xs text-muted-foreground">Minimum confidence score (0-1) for waste classification</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="notifications" className="mt-4 space-y-4">
                        <div className="grid gap-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Email Notifications</h3>
                              <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Push Notifications</h3>
                              <p className="text-sm text-muted-foreground">Send push notifications to mobile app users</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">Admin Alerts</h3>
                              <p className="text-sm text-muted-foreground">Receive alerts for critical system events</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="api" className="mt-4 space-y-4">
                        <div className="grid gap-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">API Access</h3>
                              <p className="text-sm text-muted-foreground">Enable API access for third-party integrations</p>
                            </div>
                            <Switch />
                          </div>
                          <Separator />
                          <div className="space-y-2">
                            <Label>API Key</Label>
                            <div className="flex items-center space-x-2">
                              <Input type="password" value="••••••••••••••••••••••" disabled />
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <RefreshCwIcon className="h-4 w-4 mr-2" />
                                Rotate
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Webhook URL</Label>
                            <Input placeholder="https://your-service.com/webhook" />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard>
                    <CardHeader>
                      <CardTitle>System Information</CardTitle>
                      <CardDescription>
                        Overview of system components and status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Platform Version</span>
                          <span>v1.0.3</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Database Status</span>
                          <Badge variant="success">Healthy</Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">AI Model Version</span>
                          <span>YOLOv8-m-2.1</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Backup</span>
                          <span>Today, 04:30 AM</span>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Download System Logs
                        </Button>
                      </div>
                    </CardContent>
                  </GlassCard>

                  <GlassCard>
                    <CardHeader>
                      <CardTitle>Support & Help</CardTitle>
                      <CardDescription>
                        Get help with the platform administration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Newspaper className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Documentation</h3>
                            <p className="text-sm text-muted-foreground">Read platform documentation</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            View
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                          <div className="rounded-full bg-primary/10 p-2">
                            <HelpCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Support Center</h3>
                            <p className="text-sm text-muted-foreground">Get help from our team</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Contact
                          </Button>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                          <div className="rounded-full bg-primary/10 p-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Training Resources</h3>
                            <p className="text-sm text-muted-foreground">Learn about the platform</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Browse
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>
              </div>
            )}
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

// Import missing icons
const MoreVerticalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const MoreHorizontalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const RefreshCwIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

const Newspaper = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
);

const HelpCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const BookOpen = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const UserRound = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

const BarChart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

const Checkbox = ({ id, defaultChecked }: { id: string, defaultChecked?: boolean }) => (
  <input type="checkbox" id={id} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
);

const Switch = ({ defaultChecked }: { defaultChecked?: boolean }) => (
  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary">
    <span data-state={defaultChecked ? "checked" : "unchecked"} className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${defaultChecked ? "translate-x-5" : "translate-x-0.5"}`} />
  </div>
);

export default AdminDashboard;
