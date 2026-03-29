import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, ShieldIcon, CalendarIcon } from "lucide-react";

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      
      {/* HOW TO USE CARD */}
      <Card className="group relative overflow-hidden border border-border/60 bg-card/80 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500">
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-violet-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <CardHeader className="relative pb-6 pt-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
              <MicIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight">How to Use</CardTitle>
              <CardDescription className="text-base mt-1.5 text-muted-foreground">
                Simple steps to interact with your AI veterinary assistant
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6 px-8 pb-8">
          {[
            "Tap the microphone and start speaking about your animal’s issue",
            "Describe symptoms like fever, injury, or behavior changes",
            "Get instant AI guidance and possible treatment suggestions",
            "View real-time conversation and follow recommendations",
          ].map((text, i) => (
            <div 
              key={i} 
              className="flex items-start gap-4 group/item hover:bg-muted/40 -mx-2 px-2 py-3 rounded-2xl transition-all duration-300"
            >
              <div className="mt-1.5 w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform duration-300" />
              </div>
              <span className="text-[15px] leading-relaxed text-muted-foreground group-hover/item:text-foreground transition-colors">
                {text}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FEATURES CARD */}
      <Card className="group relative overflow-hidden border border-border/60 bg-card/80 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500">
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <CardHeader className="relative pb-6 pt-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
              <ShieldIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-semibold tracking-tight">Powerful Features</CardTitle>
              <CardDescription className="text-base mt-1.5 text-muted-foreground">
                Advanced AI capabilities for animal healthcare
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4 px-8 pb-8">
          {[
            {
              icon: MicIcon,
              text: "Real-time voice interaction with VetCare AI",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: ShieldIcon,
              text: "AI-powered disease insights & treatment guidance",
              color: "from-violet-500 to-purple-600"
            },
            {
              icon: CalendarIcon,
              text: "Conversation history & animal health tracking",
              color: "from-amber-500 to-orange-500"
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group/feature flex items-center gap-5 p-5 rounded-3xl 
                         bg-gradient-to-br from-muted/30 to-transparent 
                         border border-border/50 hover:border-primary/30 
                         hover:shadow-lg hover:-translate-x-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} 
                             flex items-center justify-center shadow-lg flex-shrink-0 
                             group-hover/feature:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-[15px] leading-snug text-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default FeatureCards;