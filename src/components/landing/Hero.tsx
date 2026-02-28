import {
  SignUpButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Calendar1Icon, MicIcon } from 'lucide-react'
import Image from "next/image"
const Hero = () => {
  return (
   <section 
   className='relative h-screen flex items-center overflow-hidden pt-20'>
     <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>





<div className='relative z-10 w-full px-6'>



<div className='max-w-7xl mx-auto'>
<div className='grid lg:grid-cols-2 gap-16 items-center'>


<div className='space-y-10 '>
<div className='space-y-6'>

<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary">
                  AI-Powered Veterinary Assistant
                  </span>
                  </div>


<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
    AI-powered care for
  </span>
  <br />
  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
    every animal
  </span>
  <br />
  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
    anytime, anywhere
  </span>
</h1>






<p className="text-lg md:text-xl leading-relaxed max-w-xl font-medium 
               bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 
               bg-clip-text text-transparent 
               animate-in fade-in slide-in-from-bottom-4 duration-700">
  Consult our AI-powered veterinary assistant for instant animal health insights,
  upload symptoms or images, and connect with trusted nearby vets.
  <span className="text-primary font-semibold"> Smart care for livestock and pets — available 24/7.</span>
</p>





</div>



<div className="flex flex-col sm:flex-row gap-4">

  {/* NOT LOGGED IN */}
  <SignedOut>
    <SignUpButton mode="modal">
      <Button size="lg">
        <MicIcon className="mr-2 size-5" />
        Try Voice Agent
      </Button>
    </SignUpButton>

    <SignUpButton mode="modal">
      <Button size="lg" variant="outline">
        <Calendar1Icon className="mr-2 size-5" />
        Book Appointment
      </Button>
    </SignUpButton>
  </SignedOut>

  {/* LOGGED IN */}
  <SignedIn>
    <Button size="lg">
      <MicIcon className="mr-2 size-5" />
      Try Voice Agent
    </Button>

    <Button size="lg" variant="outline">
      <Calendar1Icon className="mr-2 size-5" />
      Book Appointment
    </Button>
  </SignedIn>

</div>

</div>





{/* RIGHT CONTENT - HERO IMAGE */}

<div className="relative lg:pl-8 flex justify-center">

  {/* 🌿 Soft Green Glow Background */}
  <div className="absolute -top-10 -left-10 w-40 h-40 
                  bg-gradient-to-br from-primary/30 to-emerald-400/10 
                  rounded-full blur-3xl animate-pulse" />

  <div className="absolute -bottom-10 -right-10 w-56 h-56 
                  bg-gradient-to-br from-emerald-400/20 to-primary/10 
                  rounded-full blur-3xl animate-pulse delay-1000" />

  {/* ✨ Glass Frame Effect */}
  {/* RIGHT CONTENT - HERO IMAGE */}

            <div className="relative lg:pl-8">
              {/* GRADIENT ORBS */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl"></div>

            <Image
  src="/hero1.png"
  alt="Vetcare AI"
  width={1000}
  height={1000}
   className="w-full max-w-[900px] h-auto"
/>
            </div>
          </div>
        </div>






</div>
</div>


   </section>
  )
}

export default Hero
