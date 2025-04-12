import { LucideProps } from "lucide-react";

export default function DashboardCard({
  title = "N/A",
  value = "N/A",
  Icon,
  color = "bg-blue-100",
  textColor = "text-blue-600",
}: {
  title: string | undefined;
  value: string | undefined;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color?: string;
  textColor?: string;
}) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex items-center mb-2">
        <div className={`${color} p-2 rounded-full mr-3`}>
          <Icon className={`${textColor}`} size={18} />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="capitalize">{value}</p>
    </div>
  );
}
