
import React from "react";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Upload, 
  Recycle, 
  Trophy, 
  Truck, 
  ChevronRight, 
  MoveRight, 
  ArrowRight,
  CheckCircle2,
  Users,
  PanelTop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30 py-20 md:py-28">
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
              <div className="flex-1 text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Leaf className="size-4" />
                  <span>Sustainability Reimagined</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Turn Your Waste Into <span className="text-gradient from-eco-green to-eco-blue">Rewards</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Join our innovative waste management platform that uses AI to categorize your waste 
                  and rewards you with eco-points for recycling.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <Link to="/auth/register">
                      Get Started
                      <ChevronRight className="ml-2 size-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/auth/login">
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 animate-scale-in">
                <div className="relative mx-auto max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-green/20 to-eco-blue/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <GlassCard className="overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="Recycling" 
                      className="w-full h-auto rounded-lg object-cover aspect-video" 
                    />
                  </GlassCard>
                  <div className="absolute -bottom-6 -right-6 size-32 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 grid place-items-center text-primary animate-spin-slow">
                    <Recycle className="size-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-muted/20" id="how-it-works">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform makes recycling easy, rewarding, and transparent with our AI-powered waste management system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative animate-scale-in" style={{ animationDelay: "100ms" }}>
                <GlassCard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center mb-6">
                      <Upload className="size-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Upload & Request</h3>
                    <p className="text-muted-foreground flex-grow">
                      Take a photo of your waste and request a pickup. Our AI system will analyze and categorize the waste.
                    </p>
                    <div className="size-8 rounded-full bg-muted/50 grid place-items-center mt-6">
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                </GlassCard>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="size-6 text-muted-foreground" />
                </div>
              </div>
              
              <div className="relative animate-scale-in" style={{ animationDelay: "200ms" }}>
                <GlassCard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="size-14 rounded-2xl bg-blue-500/10 grid place-items-center mb-6">
                      <Truck className="size-7 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Collection & Verification</h3>
                    <p className="text-muted-foreground flex-grow">
                      A staff member collects your waste and verifies it with an OTP. The waste is then taken to our AI sorting booth.
                    </p>
                    <div className="size-8 rounded-full bg-muted/50 grid place-items-center mt-6">
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </GlassCard>
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="size-6 text-muted-foreground" />
                </div>
              </div>
              
              <div className="animate-scale-in" style={{ animationDelay: "300ms" }}>
                <GlassCard className="h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="size-14 rounded-2xl bg-amber-500/10 grid place-items-center mb-6">
                      <Trophy className="size-7 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Earn & Redeem</h3>
                    <p className="text-muted-foreground flex-grow">
                      Receive eco-points based on your waste type, weight, and quality. Redeem them for cashback or rewards.
                    </p>
                    <div className="size-8 rounded-full bg-muted/50 grid place-items-center mt-6">
                      <span className="font-medium">3</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive waste management ecosystem connects users, staff, and advanced AI technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlassCard className="animate-scale-in" style={{ animationDelay: "100ms" }}>
                <div className="p-6 space-y-4">
                  <div className="size-12 rounded-xl bg-primary/10 grid place-items-center">
                    <PanelTop className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">User Portal</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>Upload waste images for AI analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>Track eco-points and rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>Request waste pickups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                      <span>Redeem points for rewards</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
              
              <GlassCard className="animate-scale-in" style={{ animationDelay: "200ms" }}>
                <div className="p-6 space-y-4">
                  <div className="size-12 rounded-xl bg-blue-500/10 grid place-items-center">
                    <Truck className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Staff Management</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Receive pickup requests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Verify waste with OTP system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Transport to AI sorting facility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Track earnings and performance</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
              
              <GlassCard className="animate-scale-in" style={{ animationDelay: "300ms" }}>
                <div className="p-6 space-y-4">
                  <div className="size-12 rounded-xl bg-purple-500/10 grid place-items-center">
                    <Users className="size-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Admin Controls</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Manage users and staff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Monitor waste collection data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Approve community events</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>Oversee AI categorization system</span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* AI Technology Section */}
        <section className="py-20 bg-muted/20">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by Advanced AI</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our platform leverages cutting-edge artificial intelligence to streamline 
                  waste management and maximize recycling efficiency.
                </p>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <div className="size-6 rounded-full bg-primary/10 grid place-items-center">
                        <span className="text-primary font-bold text-sm">1</span>
                      </div>
                      Image Recognition
                    </h3>
                    <p className="text-muted-foreground">
                      Google Vision API and YOLOv8 accurately identify and classify waste materials from user photos.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <div className="size-6 rounded-full bg-primary/10 grid place-items-center">
                        <span className="text-primary font-bold text-sm">2</span>
                      </div>
                      Sorting Algorithm
                    </h3>
                    <p className="text-muted-foreground">
                      AI-powered algorithms at our sorting facilities ensure precise waste categorization and measurement.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-border">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <div className="size-6 rounded-full bg-primary/10 grid place-items-center">
                        <span className="text-primary font-bold text-sm">3</span>
                      </div>
                      Smart Rewards
                    </h3>
                    <p className="text-muted-foreground">
                      Machine learning optimizes eco-point allocation based on waste type, quality, and environmental impact.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 animate-scale-in">
                <div className="relative mx-auto max-w-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-blue/20 to-eco-green/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <GlassCard className="overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                      alt="AI Technology" 
                      className="w-full h-auto rounded-lg object-cover aspect-video" 
                    />
                  </GlassCard>
                  <div className="absolute -bottom-6 -left-6 p-4 rounded-xl glass border border-primary/10 flex items-center gap-3 animate-slide-up">
                    <div className="size-10 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                      <Recycle className="size-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">AI Detection</div>
                      <div className="text-xs text-muted-foreground">Plastic • 96% confidence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join the EcoRecycle Revolution
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of the solution to waste management and environmental sustainability 
                while earning rewards for your eco-friendly actions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/auth/register">
                    Get Started Now
                    <MoveRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#how-it-works">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
