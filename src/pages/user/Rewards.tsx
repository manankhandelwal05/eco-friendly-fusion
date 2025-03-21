
import React, { useState } from "react";
import { 
  Trophy, 
  Gift, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  CornerRightDown,
  Check,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { EcoPointsBadge } from "@/components/ui-custom/EcoPointsBadge";
import { toast } from "sonner";

// Mock rewards data
const availableRewards = [
  {
    id: 1,
    title: "$5 Cashback",
    description: "Redeem your points for cash sent directly to your bank account",
    pointsCost: 100,
    category: "cashback",
    image: "💸"
  },
  {
    id: 2,
    title: "$10 Cashback",
    description: "Redeem your points for cash sent directly to your bank account",
    pointsCost: 200,
    category: "cashback",
    image: "💸"
  },
  {
    id: 3,
    title: "$25 Cashback",
    description: "Redeem your points for cash sent directly to your bank account",
    pointsCost: 500,
    category: "cashback",
    image: "💸"
  },
  {
    id: 4,
    title: "Coffee Shop Voucher",
    description: "Get a free coffee at participating coffee shops",
    pointsCost: 150,
    category: "voucher",
    image: "☕"
  },
  {
    id: 5,
    title: "Eco-friendly Water Bottle",
    description: "Stylish reusable water bottle made from recycled materials",
    pointsCost: 300,
    category: "merchandise",
    image: "🧴"
  },
  {
    id: 6,
    title: "Plant a Tree",
    description: "We'll plant a tree in your name to help combat climate change",
    pointsCost: 250,
    category: "impact",
    image: "🌳"
  }
];

// Mock achievement badges
const achievements = [
  {
    id: 1,
    title: "First Upload",
    description: "Upload your first waste photo",
    icon: "🔄",
    unlocked: true,
    date: "April 15, 2023"
  },
  {
    id: 2,
    title: "Recycling Enthusiast",
    description: "Complete 5 waste pickups",
    icon: "♻️",
    unlocked: true,
    date: "May 3, 2023"
  },
  {
    id: 3,
    title: "Plastic Warrior",
    description: "Recycle over 10kg of plastic waste",
    icon: "🏆",
    unlocked: true,
    date: "May 20, 2023"
  },
  {
    id: 4,
    title: "E-Waste Hero",
    description: "Recycle any electronic waste",
    icon: "💻",
    unlocked: false,
    progress: 0
  },
  {
    id: 5,
    title: "Community Champion",
    description: "Participate in a community cleanup event",
    icon: "🌍",
    unlocked: false, 
    progress: 0
  },
  {
    id: 6,
    title: "Eco Influencer",
    description: "Refer 3 friends to the platform",
    icon: "🌟",
    unlocked: false,
    progress: 2,
    total: 3
  }
];

// Mock redemption history
const redemptionHistory = [
  {
    id: 1,
    title: "$5 Cashback",
    pointsCost: 100,
    date: "June 10, 2023",
    status: "completed",
    category: "cashback"
  },
  {
    id: 2,
    title: "Coffee Shop Voucher",
    pointsCost: 150,
    date: "May 22, 2023",
    status: "completed",
    category: "voucher"
  },
  {
    id: 3,
    title: "$10 Cashback",
    pointsCost: 200,
    date: "May 5, 2023",
    status: "completed",
    category: "cashback"
  }
];

const levelTiers = [
  { name: "Newcomer", points: 0, badge: "🌱" },
  { name: "Green Helper", points: 250, badge: "🍃" },
  { name: "Eco Enthusiast", points: 500, badge: "🌿" },
  { name: "Sustainability Warrior", points: 1000, badge: "🌳" },
  { name: "Earth Guardian", points: 2500, badge: "🌎" },
];

const Rewards = () => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any | null>(null);
  const [redeemDialogOpen, setRedeemDialogOpen] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [isProcessingRedemption, setIsProcessingRedemption] = useState(false);

  // Current user's points - would normally come from user context/state
  const currentPoints = 250;
  
  // Calculate current level
  const getCurrentLevel = () => {
    for (let i = levelTiers.length - 1; i >= 0; i--) {
      if (currentPoints >= levelTiers[i].points) {
        return levelTiers[i];
      }
    }
    return levelTiers[0];
  };
  
  const currentLevel = getCurrentLevel();
  
  // Calculate next level
  const getNextLevel = () => {
    for (let i = 0; i < levelTiers.length; i++) {
      if (levelTiers[i].points > currentPoints) {
        return levelTiers[i];
      }
    }
    return null; // Max level reached
  };
  
  const nextLevel = getNextLevel();
  
  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    if (!nextLevel) return 100;
    const currentLevelPoints = currentLevel.points;
    const nextLevelPoints = nextLevel.points;
    return Math.round(((currentPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100);
  };

  const handleRedeemClick = (reward: any) => {
    setSelectedReward(reward);
    setRedeemDialogOpen(true);
  };

  const handleRedeemConfirm = () => {
    if (selectedReward?.category === "cashback" && (!bankAccountNumber || !bankName)) {
      toast.error("Please enter your bank details");
      return;
    }
    
    setIsProcessingRedemption(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessingRedemption(false);
      setRedeemDialogOpen(false);
      toast.success(`Successfully redeemed ${selectedReward?.title}!`);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 py-8 md:py-12 mx-auto">
          {/* Page header */}
          <div className="flex flex-col gap-2 mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Rewards & Achievements</h1>
            <p className="text-muted-foreground">
              Redeem your eco-points and track your achievements
            </p>
          </div>

          {/* Points & Level Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="lg:col-span-2 animate-scale-in overflow-visible">
              <div className="px-6 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Your Eco-Points</h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{currentPoints}</span>
                      <span className="text-muted-foreground">available points</span>
                    </div>
                  </div>
                  <EcoPointsBadge points={currentPoints} size="lg" />
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                          {currentLevel.badge}
                        </div>
                        <span className="font-medium">{currentLevel.name}</span>
                      </div>
                      {nextLevel && (
                        <div className="flex items-center gap-2">
                          <CornerRightDown className="size-4 text-muted-foreground" />
                          <div className="flex items-center gap-1">
                            <div className="flex items-center justify-center size-7 rounded-full bg-muted text-muted-foreground">
                              {nextLevel.badge}
                            </div>
                            <span className="text-muted-foreground">{nextLevel.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <Progress value={getProgressToNextLevel()} className="h-2" />
                      {nextLevel && (
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{currentPoints} points</span>
                          <span>{nextLevel.points - currentPoints} more to {nextLevel.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                  <Button asChild variant="outline" className="h-12">
                    <a href="/community-events">
                      <Gift className="mr-2 size-4" />
                      Earn More Points
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-12">
                    <a href="/user/waste-upload">
                      <Trophy className="mr-2 size-4" />
                      Upload Waste
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-12">
                    <a href="/user/history">
                      <ExternalLink className="mr-2 size-4" />
                      View History
                    </a>
                  </Button>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="h-full animate-scale-in" style={{ animationDelay: "100ms" }}>
              <div className="px-6 py-8 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Next Rewards</h2>
                <div className="space-y-4 flex-1">
                  {availableRewards.slice(0, 3).map((reward) => (
                    <div key={reward.id} className="p-3 border rounded-lg bg-muted/30 flex items-start gap-3">
                      <div className="size-10 rounded-full bg-primary/10 grid place-items-center shrink-0 text-lg">
                        {reward.image}
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">{reward.title}</div>
                        <div className="text-sm text-muted-foreground">{reward.pointsCost} points</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full mt-4">
                  <a href="#rewardsTab">Browse all rewards</a>
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* Tabs content */}
          <div className="mb-8 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <Tabs defaultValue="rewards" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="rewards" id="rewardsTab">Rewards</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              {/* Rewards Tab */}
              <TabsContent value="rewards" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRewards.map((reward) => (
                    <GlassCard 
                      key={reward.id} 
                      className={`animate-scale-in transition-all duration-300 hover:shadow-hover ${
                        currentPoints < reward.pointsCost ? "opacity-60" : ""
                      }`}
                      hoverable
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="bg-secondary/50">
                            {reward.category === "cashback" ? "Cashback" : 
                             reward.category === "voucher" ? "Voucher" :
                             reward.category === "merchandise" ? "Merchandise" : "Impact"}
                          </Badge>
                          <div className="text-3xl">{reward.image}</div>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-1">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>
                        
                        <div className="mt-auto pt-4 flex flex-col gap-2">
                          <div className="text-center font-medium">
                            {reward.pointsCost} points
                          </div>
                          <Button
                            onClick={() => handleRedeemClick(reward)}
                            disabled={currentPoints < reward.pointsCost || isRedeeming}
                            variant={currentPoints < reward.pointsCost ? "outline" : "default"}
                          >
                            {currentPoints < reward.pointsCost ? "Not Enough Points" : "Redeem"}
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>
              
              {/* Achievements Tab */}
              <TabsContent value="achievements" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <GlassCard 
                      key={achievement.id} 
                      className={`animate-scale-in transition-all duration-300 ${
                        !achievement.unlocked ? "opacity-80" : ""
                      }`}
                    >
                      <div className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center justify-center size-12 rounded-full bg-secondary">
                            <span className="text-2xl">{achievement.icon}</span>
                          </div>
                          {achievement.unlocked ? (
                            <Badge className="bg-primary text-primary-foreground">
                              <CheckCircle2 className="mr-1 size-3" />
                              Unlocked
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-secondary/50">
                              <Clock className="mr-1 size-3" />
                              In Progress
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        
                        {achievement.unlocked ? (
                          <div className="mt-auto pt-4 text-sm text-muted-foreground">
                            Unlocked on {achievement.date}
                          </div>
                        ) : achievement.progress !== undefined ? (
                          <div className="mt-auto pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.total}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-1.5" />
                          </div>
                        ) : (
                          <div className="mt-auto pt-4 text-sm text-muted-foreground">
                            Not yet unlocked
                          </div>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history" className="mt-0">
                <GlassCard className="animate-scale-in">
                  <div className="px-4 pt-2 pb-3">
                    <h2 className="text-xl font-semibold mb-4">Redemption History</h2>
                    
                    <div className="space-y-4">
                      {redemptionHistory.map((item) => (
                        <div key={item.id} className="p-4 border rounded-lg bg-muted/20">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-secondary/50 grid place-items-center shrink-0">
                                {item.category === "cashback" ? (
                                  <CreditCard className="size-5" />
                                ) : item.category === "voucher" ? (
                                  <Gift className="size-5" />
                                ) : (
                                  <Trophy className="size-5" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {item.pointsCost} points
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-primary/20 hover:bg-primary/20 text-primary border-primary/20">
                                <Check className="mr-1 size-3" />
                                Completed
                              </Badge>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {redemptionHistory.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No redemption history yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />

      {/* Redeem Dialog */}
      <Dialog open={redeemDialogOpen} onOpenChange={setRedeemDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redeem {selectedReward?.title}</DialogTitle>
            <DialogDescription>
              You're about to redeem this reward for {selectedReward?.pointsCost} points.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedReward?.category === "cashback" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Select value={bankName} onValueChange={setBankName}>
                    <SelectTrigger id="bank-name">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-of-america">Bank of America</SelectItem>
                      <SelectItem value="chase">Chase</SelectItem>
                      <SelectItem value="wells-fargo">Wells Fargo</SelectItem>
                      <SelectItem value="citibank">Citibank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="Enter your account number"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The cashback will be transferred to this account within 3-5 business days.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <div className="text-5xl mb-4">{selectedReward?.image}</div>
                <p>{selectedReward?.description}</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setRedeemDialogOpen(false)}
              disabled={isProcessingRedemption}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRedeemConfirm}
              disabled={isProcessingRedemption}
            >
              {isProcessingRedemption ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Redemption"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Rewards;
