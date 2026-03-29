import DentalHealthOverview from "@/components/dashboard/DentalHealthOverview";
import NextAppointment from "@/components/dashboard/NextAppointment";

function ActivityOverview() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <DentalHealthOverview />
      <NextAppointment />
    </div>
  );
}
export default ActivityOverview;
