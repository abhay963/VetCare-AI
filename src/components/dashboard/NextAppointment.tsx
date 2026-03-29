import { getUserAppointments } from "@/lib/actions/appointments";
import { format, isAfter, isSameDay, parseISO, compareAsc } from "date-fns";
import NoNextAppointments from "./NoNextAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  CalendarIcon,
  ClockIcon,
  Stethoscope,
  PawPrint,
} from "lucide-react";

async function NextAppointment() {
  const appointments = await getUserAppointments();

  // ✅ filter upcoming CONFIRMED
  const upcomingAppointments =
    appointments
      ?.filter((appointment) => {
        const appointmentDate = parseISO(appointment.date);
        const today = new Date();
        const isUpcoming =
          isSameDay(appointmentDate, today) ||
          isAfter(appointmentDate, today);

        return isUpcoming && appointment.status === "CONFIRMED";
      })
      // ✅ IMPORTANT: sort by earliest date
      .sort((a, b) =>
        compareAsc(parseISO(a.date), parseISO(b.date))
      ) || [];

  const nextAppointment = upcomingAppointments[0];

  if (!nextAppointment) return <NoNextAppointments />;

  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(appointmentDate, "EEEE, MMM d");
  const isToday = isSameDay(appointmentDate, new Date());

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background hover:shadow-lg transition-all">
      
      {/* HEADER */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="size-5 text-primary" />
          Upcoming Vet Visit 🐾
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        
        {/* STATUS */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              {isToday ? "Today" : "Upcoming"}
            </span>
          </div>

          <span className="text-xs bg-muted/50 px-2 py-1 rounded">
            {nextAppointment.status}
          </span>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">

          {/* DOCTOR / REASON */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <PawPrint className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {nextAppointment.doctorName}
              </p>
              <p className="text-xs text-muted-foreground">
                {nextAppointment.reason || "General Checkup"}
              </p>
            </div>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <CalendarIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{formattedDate}</p>
              <p className="text-xs text-muted-foreground">
                {isToday ? "Happening today" : "Scheduled"}
              </p>
            </div>
          </div>

          {/* TIME */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <ClockIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">
                {nextAppointment.time}
              </p>
              <p className="text-xs text-muted-foreground">
                Local time
              </p>
            </div>
          </div>
        </div>

        {/* EXTRA INFO */}
        {upcomingAppointments.length > 1 && (
          <p className="text-xs text-center text-muted-foreground">
            +{upcomingAppointments.length - 1} more upcoming visit
            {upcomingAppointments.length > 2 ? "s" : ""}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default NextAppointment;