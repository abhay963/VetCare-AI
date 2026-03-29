import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Stethoscope,
  PawPrint,
  CalendarCheck,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

async function VetHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  return (
    <Card className="lg:col-span-2">
      
      {/* HEADER */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="size-5 text-primary" />
          Your Animal Health Dashboard 🐾
        </CardTitle>
        <CardDescription>
          Track your pets & farm animals health and care history
        </CardDescription>
      </CardHeader>

      {/* CONTENT */}
      <CardContent>
        
        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <StatBox
            icon={<CalendarCheck className="size-5 text-primary" />}
            value={appointmentStats.completedAppointments}
            label="Completed Visits"
          />

          <StatBox
            icon={<Stethoscope className="size-5 text-primary" />}
            value={appointmentStats.totalAppointments}
            label="Total Consultations"
          />

          <StatBox
            icon={<PawPrint className="size-5 text-primary" />}
            value={format(new Date(user?.createdAt!), "MMM yyyy")}
            label="Member Since"
          />
        </div>

        {/* CTA */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquare className="size-5 text-primary" />
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-1">
                Need help with your animal?
              </h4>

              <p className="text-sm text-muted-foreground mb-3">
                Talk to VetCare AI for instant guidance or connect with a nearby veterinary doctor.
              </p>

              <div className="flex gap-2">
                <Link href="/voice">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Talk to AI Vet
                  </Button>
                </Link>

                <Link href="/appointments">
                  <Button size="sm" variant="outline">
                    Book Vet Visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

export default VetHealthOverview;


/* 🔥 Reusable Stat Component */
function StatBox({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: any;
  label: string;
}) {
  return (
    <div className="text-center p-4 bg-muted/30 rounded-xl flex flex-col items-center gap-2">
      <div className="bg-primary/10 p-2 rounded-lg">{icon}</div>
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}