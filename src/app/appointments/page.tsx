"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";
import { useBookAppointment, useUserAppointments } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarIcon, ClockIcon, Stethoscope } from "lucide-react";

function AppointmentsPage() {
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDentistId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          setBookedAppointment(appointment);

          try {
            await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(new Date(appointment.date), "EEEE, MMMM d, yyyy"),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });
          } catch (error) {
            console.error("Email error:", error);
          }

          setShowConfirmationModal(true);

          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) =>
          toast.error(`Failed to book appointment: ${error.message}`),
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Book a Vet Appointment 🐾
          </h1>
          <p className="text-muted-foreground">
            Find and connect with trusted veterinary doctors near you
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        {currentStep === 1 && (
          <DoctorSelectionStep
            selectedDentistId={selectedDentistId}
            onContinue={() => setCurrentStep(2)}
            onSelectDentist={handleSelectDentist}
          />
        )}

        {currentStep === 2 && selectedDentistId && (
          <TimeSelectionStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedType}
          />
        )}

        {currentStep === 3 && selectedDentistId && (
          <BookingConfirmationStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            isBooking={bookAppointmentMutation.isPending}
            onBack={() => setCurrentStep(2)}
            onModify={() => setCurrentStep(2)}
            onConfirm={handleBookAppointment}
          />
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          appointmentDetails={{
            doctorName: bookedAppointment.doctorName,
            appointmentDate: format(
              new Date(bookedAppointment.date),
              "EEEE, MMMM d, yyyy"
            ),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}

      {/* USER APPOINTMENTS */}
      {userAppointments.length > 0 && (
        <div className="mb-12 max-w-7xl mx-auto px-6">
          
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Stethoscope className="size-5 text-primary" />
              Your Upcoming Vet Visits
            </h2>
            <span className="text-sm text-muted-foreground">
              {userAppointments.length} appointment
              {userAppointments.length > 1 && "s"}
            </span>
          </div>

          {/* GRID */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {userAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                
                {/* TOP */}
                <div className="flex items-center gap-3 mb-4">
                  
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {appointment.doctorImageUrl ? (
                      <img
                        src={appointment.doctorImageUrl}
                        alt={appointment.doctorName}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Stethoscope className="text-primary size-5" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-sm">
                      {appointment.doctorName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {appointment.reason}
                    </p>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="size-4" />
                    {format(new Date(appointment.date), "MMM d, yyyy")}
                  </p>

                  <p className="flex items-center gap-2 text-muted-foreground">
                    <ClockIcon className="size-4" />
                    {appointment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AppointmentsPage;