
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  Upload, 
  Recycle, 
  Check, 
  AlertCircle, 
  Clock, 
  CalendarClock, 
  MapPin,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { UploadArea } from "@/components/ui-custom/UploadArea";
import { toast } from "sonner";

// Mock waste types with estimated points per kg
const wasteTypes = [
  { id: "plastic", name: "Plastic", pointsPerKg: 10, icon: Recycle },
  { id: "paper", name: "Paper", pointsPerKg: 5, icon: Recycle },
  { id: "ewaste", name: "E-waste", pointsPerKg: 30, icon: Recycle },
  { id: "metal", name: "Metal", pointsPerKg: 15, icon: Recycle },
  { id: "glass", name: "Glass", pointsPerKg: 8, icon: Recycle },
  { id: "organic", name: "Organic", pointsPerKg: 3, icon: Recycle },
  { id: "textile", name: "Textile", pointsPerKg: 7, icon: Recycle },
  { id: "other", name: "Other", pointsPerKg: 2, icon: Recycle },
];

// Mock available pickup times
const availableTimes = [
  { id: "morning", label: "Morning (8 AM - 12 PM)" },
  { id: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
  { id: "evening", label: "Evening (4 PM - 8 PM)" },
];

const WasteUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [predictedWasteType, setPredictedWasteType] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [activeStep, setActiveStep] = useState(1);
  
  // Form state
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    // Start analysis
    handleAnalyzeWaste();
  };

  const handleAnalyzeWaste = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate AI analysis with timeout
    setTimeout(() => {
      // Random waste type from our list
      const randomIndex = Math.floor(Math.random() * wasteTypes.length);
      const predictedType = wasteTypes[randomIndex].id;
      setPredictedWasteType(predictedType);
      
      // Random confidence between 70% and 98%
      const randomConfidence = Math.floor(Math.random() * (98 - 70) + 70);
      setConfidence(randomConfidence);
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      toast.success("Waste analysis completed!");
    }, 3000);
  };

  const handleContinue = () => {
    if (activeStep === 1 && analysisComplete) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!addressLine1 || !city || !zipCode || !preferredDate || !preferredTime) {
        toast.error("Please fill in all required fields");
        return;
      }
      setActiveStep(3);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Pickup request submitted successfully!");
      navigate("/user/dashboard");
    }, 2000);
  };

  const wasteTypeDetails = wasteTypes.find(type => type.id === predictedWasteType);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container px-4 py-8 md:py-12 mx-auto">
          {/* Page header */}
          <div className="flex flex-col gap-2 mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Upload Waste</h1>
            <p className="text-muted-foreground">
              Take a photo of your waste for AI analysis and schedule a pickup
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <div className={`size-10 rounded-full grid place-items-center font-medium ${activeStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <span className="text-sm">Upload</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${activeStep >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className="flex flex-col items-center gap-2">
                <div className={`size-10 rounded-full grid place-items-center font-medium ${activeStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <span className="text-sm">Details</span>
              </div>
              <div className={`h-1 flex-1 mx-2 ${activeStep >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className="flex flex-col items-center gap-2">
                <div className={`size-10 rounded-full grid place-items-center font-medium ${activeStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
                <span className="text-sm">Confirm</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="max-w-4xl mx-auto">
            {activeStep === 1 && (
              <div className="animate-scale-in">
                <GlassCard>
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <Camera className="size-5" />
                      <span>Upload Waste Image</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        Upload a clear image of your waste for AI analysis. Make sure the waste is visible and well-lit.
                      </p>
                    </div>
                    
                    <UploadArea
                      onFileChange={handleFileChange}
                      className="mt-4"
                    />
                    
                    {isAnalyzing && (
                      <div className="bg-muted/30 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                        <Loader2 className="size-5 animate-spin" />
                        <span>Analyzing waste type...</span>
                      </div>
                    )}
                    
                    {analysisComplete && predictedWasteType && (
                      <div className="animate-scale-in">
                        <div className="bg-primary/10 border-primary/20 border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="size-12 rounded-full bg-primary/20 grid place-items-center">
                              <Recycle className="size-6 text-primary" />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-lg">Detected Waste Type</h3>
                                <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                                  {confidence}% confidence
                                </span>
                              </div>
                              <p className="text-xl font-semibold">
                                {wasteTypes.find(type => type.id === predictedWasteType)?.name || 'Unknown'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Estimated eco-points: {wasteTypeDetails?.pointsPerKg || 0} points per kilogram
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Is this correct?</p>
                          <Tabs defaultValue={predictedWasteType} className="w-full">
                            <TabsList className="grid grid-cols-4 mb-2">
                              <TabsTrigger value="plastic">Plastic</TabsTrigger>
                              <TabsTrigger value="paper">Paper</TabsTrigger>
                              <TabsTrigger value="ewaste">E-waste</TabsTrigger>
                              <TabsTrigger value="other">Other</TabsTrigger>
                            </TabsList>
                            {predictedWasteType !== "plastic" && predictedWasteType !== "paper" && predictedWasteType !== "ewaste" && predictedWasteType !== "other" && (
                              <p className="text-sm text-muted-foreground mb-2">
                                Selected: {wasteTypes.find(type => type.id === predictedWasteType)?.name}
                              </p>
                            )}
                            <TabsContent value="other">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select waste type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {wasteTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        onClick={handleContinue}
                        disabled={!analysisComplete}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeStep === 2 && (
              <div className="animate-scale-in">
                <GlassCard>
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <MapPin className="size-5" />
                      <span>Pickup Details</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address1">Address Line 1 *</Label>
                        <Input
                          id="address1"
                          placeholder="Enter your street address"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address2">Address Line 2</Label>
                        <Input
                          id="address2"
                          placeholder="Apartment, suite, unit, building, floor, etc."
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City/Town *</Label>
                          <Input
                            id="city"
                            placeholder="Enter city or town"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipcode">Zip Code *</Label>
                          <Input
                            id="zipcode"
                            placeholder="Enter postal code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex items-center gap-2 text-lg font-medium mb-4">
                          <CalendarClock className="size-5" />
                          <span>Preferred Pickup Time</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="pickup-date">Preferred Date *</Label>
                            <Input
                              id="pickup-date"
                              type="date"
                              value={preferredDate}
                              onChange={(e) => setPreferredDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Preferred Time *</Label>
                            <RadioGroup
                              value={preferredTime}
                              onValueChange={setPreferredTime}
                              className="flex flex-col space-y-1"
                            >
                              {availableTimes.map((time) => (
                                <div key={time.id} className="flex items-center space-x-2">
                                  <RadioGroupItem value={time.id} id={time.id} />
                                  <Label htmlFor={time.id} className="font-normal">
                                    {time.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special instructions for pickup?"
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button onClick={handleContinue}>
                        Continue
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeStep === 3 && (
              <div className="animate-scale-in">
                <GlassCard>
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <Check className="size-5" />
                      <span>Confirm Pickup Request</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Waste Type:</span>
                          <span className="font-medium">
                            {wasteTypes.find(type => type.id === predictedWasteType)?.name || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Points:</span>
                          <span className="font-medium">
                            {wasteTypeDetails?.pointsPerKg || 0} points per kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address:</span>
                          <span className="font-medium text-right">
                            {addressLine1}<br />
                            {addressLine2 && `${addressLine2}, `}
                            {city}, {zipCode}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pickup Date:</span>
                          <span className="font-medium">
                            {new Date(preferredDate).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pickup Time:</span>
                          <span className="font-medium">
                            {availableTimes.find(time => time.id === preferredTime)?.label || 'Not specified'}
                          </span>
                        </div>
                        {additionalNotes && (
                          <div className="pt-2 border-t">
                            <span className="text-muted-foreground">Additional Notes:</span>
                            <p className="mt-1">{additionalNotes}</p>
                          </div>
                        )}
                      </div>

                      <div className="bg-primary/10 rounded-lg p-4 flex gap-3">
                        <AlertCircle className="size-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Important Information</p>
                          <p className="text-sm mt-1">
                            Once you submit this request, a staff member will be assigned to pick up your waste. 
                            You'll receive an OTP for verification during the pickup. Final eco-points will be 
                            determined after waste categorization at our facility.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WasteUpload;
