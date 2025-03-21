import React, { useState } from "react";
import { 
  Truck, 
  PackageCheck, 
  Recycle, 
  DollarSign,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronRight,
  FilterX,
  Filter,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { toast } from "sonner";

// Mock pickup requests data
const pickupRequests = [
  {
    id: 1,
    userName: "Emily Johnson",
    userAddress: "123 Green St, Portland, OR 97201",
    wasteType: "Plastic",
    dateRequested: "2023-06-15T10:30:00",
    status: "pending",
    timeSlot: "Morning (8 AM - 12 PM)",
    distance: "1.2 miles",
    estimatedPoints: 15,
    userImage: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    userName: "Michael Chen",
    userAddress: "456 Eco Ave, Portland, OR 97202",
    wasteType: "Paper",
    dateRequested: "2023-06-15T09:45:00",
    status: "pending",
    timeSlot: "Afternoon (12 PM - 4 PM)",
    distance: "0.8 miles",
    estimatedPoints: 10,
    userImage: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    userName: "Sarah Williams",
    userAddress: "789 Recycle Rd, Portland, OR 97205",
    wasteType: "E-waste",
    dateRequested: "2023-06-15T11:20:00",
    status: "pending",
    timeSlot: "Evening (4 PM - 8 PM)",
    distance: "2.1 miles",
    estimatedPoints: 35,
    userImage: "https://i.pravatar.cc/150?img=9"
  }
];

// Mock scheduled pickups
const scheduledPickups = [
  {
    id: 4,
    userName: "Jessica Brown",
    userAddress: "234 Oak Lane, Portland, OR 97210",
    wasteType: "Metal",
    date: "2023-06-16",
    status: "scheduled",
    timeSlot: "Morning (8 AM - 12 PM)",
    distance: "1.5 miles",
    estimatedPoints: 25,
    userImage: "https://i.pravatar.cc/150?img=25"
  },
  {
    id: 5,
    userName: "David Wilson",
    userAddress: "567 Pine St, Portland, OR 97211",
    wasteType: "Plastic",
    date: "2023-06-16",
    status: "in-progress",
    timeSlot: "Afternoon (12 PM - 4 PM)",
    distance: "0.6 miles",
    estimatedPoints: 15,
    userImage: "https://i.pravatar.cc/150?img=53"
  }
];

// Mock completed pickups
const completedPickups = [
  {
    id: 6,
    userName: "Amanda Garcia",
    userAddress: "890 Cedar Ave, Portland, OR 97212",
    wasteType: "Paper",
    date: "2023-06-14",
    status: "completed",
    timeSlot: "Morning (8 AM - 12 PM)",
    finalWeight: "3.2 kg",
    finalPoints: 16,
    userImage: "https://i.pravatar.cc/150?img=44"
  },
  {
    id: 7,
    userName: "Robert Smith",
    userAddress: "123 Maple Dr, Portland, OR 97213",
    wasteType: "Plastic",
    date: "2023-06-14",
    status: "completed",
    timeSlot: "Evening (4 PM - 8 PM)",
    finalWeight: "2.5 kg",
    finalPoints: 25,
    userImage: "https://i.pravatar.cc/150?img=61"
  }
];

// Define better types with common properties at the top level and specific ones in a discriminated union
type BasePickup = {
  id: number;
  userName: string;
  userAddress: string;
  wasteType: string;
  status: string;
  timeSlot: string;
  userImage: string;
};

type PickupRequest = BasePickup & {
  status: "pending";
  dateRequested: string;
  distance: string;
  estimatedPoints: number;
};

type ScheduledPickup = BasePickup & {
  status: "scheduled" | "in-progress";
  date: string;
  distance: string;
  estimatedPoints: number;
};

type CompletedPickup = BasePickup & {
  status: "completed";
  date: string;
  finalWeight: string;
  finalPoints: number;
};

type Pickup = PickupRequest | ScheduledPickup | CompletedPickup;

// Type guards to check which type of pickup we're dealing with
const isPendingPickup = (pickup: Pickup): pickup is PickupRequest => {
  return pickup.status === "pending";
};

const isScheduledPickup = (pickup: Pickup): pickup is ScheduledPickup => {
  return pickup.status === "scheduled" || pickup.status === "in-progress";
};

const isCompletedPickup = (pickup: Pickup): pickup is CompletedPickup => {
  return pickup.status === "completed";
};

const StaffDashboard = () => {
  const [selectedPickup, setSelectedPickup] = useState<Pickup | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [otpValue, setOtpValue] = useState("");
  const [isProcessingOtp, setIsProcessingOtp] = useState(false);
  
  // Combine all pickups and filter based on status if needed
  const allPickups = [...pickupRequests, ...scheduledPickups, ...completedPickups] as Pickup[];
  const filteredPickups = filterStatus === "all" 
    ? allPickups 
    : allPickups.filter(pickup => pickup.status === filterStatus);
  
  // Stats
  const totalPendingRequests = pickupRequests.length;
  const totalScheduledPickups = scheduledPickups.length;
  const totalCompletedToday = completedPickups.filter(p => 
    new Date(p.date).toDateString() === new Date().toDateString()
  ).length;
  const totalEarningsToday = completedPickups
    .filter(p => new Date(p.date).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + (p.finalPoints || 0) * 0.1, 0); // $0.10 per point

  const handlePickupSelect = (pickup: Pickup) => {
    setSelectedPickup(pickup);
    setDetailsDialogOpen(true);
  };

  const handleAcceptPickup = () => {
    toast.success(`Pickup request from ${selectedPickup?.userName} accepted`);
    setDetailsDialogOpen(false);
  };

  const handleStartPickup = () => {
    setDetailsDialogOpen(false);
    toast.success(`Starting pickup for ${selectedPickup?.userName}`);
  };

  const handleCompletePickup = () => {
    setDetailsDialogOpen(false);
    setOtpDialogOpen(true);
  };

  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsProcessingOtp(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsProcessingOtp(false);
      setOtpDialogOpen(false);
      toast.success("Pickup completed successfully");
      setOtpValue("");
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDisplayDate = (pickup: Pickup): string => {
    if (isPendingPickup(pickup)) {
      return formatDate(pickup.dateRequested);
    } else if (isScheduledPickup(pickup) || isCompletedPickup(pickup)) {
      return formatDate(pickup.date);
    }
    return "";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        );
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 py-8 md:py-12 mx-auto">
          {/* Page header */}
          <div className="flex flex-col gap-2 mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Staff Dashboard</h1>
            <p className="text-muted-foreground">
              Manage waste pickups and track your activities
            </p>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GlassCard className="animate-scale-in" style={{ animationDelay: "0ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Pending Requests</h3>
                  <div className="size-10 rounded-full bg-amber-50 grid place-items-center">
                    <Truck className="size-5 text-amber-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{totalPendingRequests}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Awaiting acceptance
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "50ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Scheduled Pickups</h3>
                  <div className="size-10 rounded-full bg-blue-50 grid place-items-center">
                    <Calendar className="size-5 text-blue-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{totalScheduledPickups}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ready for collection
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Completed Today</h3>
                  <div className="size-10 rounded-full bg-green-50 grid place-items-center">
                    <PackageCheck className="size-5 text-green-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">{totalCompletedToday}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Waste collected
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="animate-scale-in" style={{ animationDelay: "150ms" }}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Today's Earnings</h3>
                  <div className="size-10 rounded-full bg-purple-50 grid place-items-center">
                    <DollarSign className="size-5 text-purple-500" />
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-3xl font-bold">${totalEarningsToday.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on points
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Pickup Management */}
          <div className="mb-8 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <GlassCard>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Pickup Management</CardTitle>
                    <CardDescription>
                      View and manage waste pickup requests
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Filter className="size-4" />
                          <span>Filter</span>
                          {filterStatus !== "all" && (
                            <Badge variant="secondary" className="ml-1 text-xs">
                              {filterStatus}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                          All Pickups
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("scheduled")}>
                          Scheduled
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("in-progress")}>
                          In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("completed")}>
                          Completed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    {filterStatus !== "all" && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setFilterStatus("all")}
                        className="size-8"
                      >
                        <FilterX className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPickups.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No pickups found with the selected filter</p>
                    </div>
                  ) : (
                    filteredPickups.map((pickup) => (
                      <div
                        key={pickup.id}
                        className="border rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => handlePickupSelect(pickup)}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-full overflow-hidden shrink-0">
                                <img
                                  src={pickup.userImage}
                                  alt={pickup.userName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{pickup.userName}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="size-3" />
                                  <span className="truncate max-w-[200px]">{pickup.userAddress}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(pickup.status)}
                              <div className="text-xs text-muted-foreground mt-1">
                                {getDisplayDate(pickup)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between text-sm mt-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Recycle className="size-4 text-primary" />
                                <span>{pickup.wasteType}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="size-4 text-muted-foreground" />
                                <span>{pickup.timeSlot}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 sm:mt-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePickupSelect(pickup);
                              }}
                            >
                              View Details
                              <ChevronRight className="ml-1 size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />

      {/* Pickup Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pickup Details</DialogTitle>
            <DialogDescription>
              Review the details for this waste pickup request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPickup && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-full overflow-hidden shrink-0">
                  <img
                    src={selectedPickup.userImage}
                    alt={selectedPickup.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-lg">{selectedPickup.userName}</div>
                  <div className="text-muted-foreground">
                    {getStatusBadge(selectedPickup.status)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-medium text-right">{selectedPickup.userAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Waste Type:</span>
                  <span className="font-medium">{selectedPickup.wasteType}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {getDisplayDate(selectedPickup)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Slot:</span>
                  <span className="font-medium">{selectedPickup.timeSlot}</span>
                </div>
                
                {(isPendingPickup(selectedPickup) || isScheduledPickup(selectedPickup)) && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">{selectedPickup.distance}</span>
                  </div>
                )}
                
                {isCompletedPickup(selectedPickup) && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Final Weight:</span>
                      <span className="font-medium">{selectedPickup.finalWeight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Points Awarded:</span>
                      <span className="font-medium">{selectedPickup.finalPoints} points</span>
                    </div>
                  </>
                )}
                
                {(isPendingPickup(selectedPickup) || isScheduledPickup(selectedPickup)) && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Points:</span>
                    <span className="font-medium">~{selectedPickup.estimatedPoints} points</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            {selectedPickup?.status === "pending" && (
              <Button 
                onClick={handleAcceptPickup}
                className="flex-1"
              >
                <CheckCircle2 className="mr-2 size-4" />
                Accept Pickup
              </Button>
            )}
            
            {selectedPickup?.status === "scheduled" && (
              <Button 
                onClick={handleStartPickup}
                className="flex-1"
              >
                <Truck className="mr-2 size-4" />
                Start Pickup
              </Button>
            )}
            
            {selectedPickup?.status === "in-progress" && (
              <Button 
                onClick={handleCompletePickup}
                className="flex-1"
              >
                <PackageCheck className="mr-2 size-4" />
                Complete Pickup
              </Button>
            )}
            
            {selectedPickup?.status === "completed" && (
              <Button 
                variant="outline"
                onClick={() => setDetailsDialogOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
            )}
            
            {(selectedPickup?.status === "pending" || 
              selectedPickup?.status === "scheduled" || 
              selectedPickup?.status === "in-progress") && (
              <Button 
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="mr-2 size-4" />
                Cancel
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Collection OTP</DialogTitle>
            <DialogDescription>
              Please ask the user for the 6-digit OTP displayed on their app to verify the waste collection.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Enter 6-digit OTP</div>
              <Input
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                placeholder="123456"
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setOtpDialogOpen(false)}
              disabled={isProcessingOtp}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVerifyOtp}
              disabled={otpValue.length !== 6 || isProcessingOtp}
              className="flex-1"
            >
              {isProcessingOtp ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StaffDashboard;

