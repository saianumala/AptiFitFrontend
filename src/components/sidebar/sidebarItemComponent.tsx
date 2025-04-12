import { activeTabAtom } from "@/recoilStore/recoilAtoms";
import { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function SidebarItem({ item }: { item: any }) {
  const [activeTab, setActiveTab] = useRecoilState(activeTabAtom);

  const isActive = activeTab === item.id;

  return (
    <Link to={item.id} className="w-full">
      <button
        className={`flex items-center w-full p-4 ${
          isActive
            ? "bg-blue-50 text-blue-500 border-r-4 border-blue-500"
            : "text-gray-600"
        }`}
        onClick={() => {
          setActiveTab(item.id);
        }}
      >
        {Array.isArray(item.icon) ? (
          <div className="flex mx-auto md:mx-0 md:mr-4">
            {item.icon.map(
              (
                Icon: React.ForwardRefExoticComponent<
                  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
                >,
                i: number
              ) => (
                <Icon
                  key={i}
                  size={20}
                  className={i > 0 ? "ml-1 md:hidden" : ""}
                />
              )
            )}
          </div>
        ) : (
          <item.icon className="mx-auto md:mx-0 md:mr-4" size={20} />
        )}
        <span className="hidden md:inline">{item.label}</span>
      </button>
    </Link>
  );
}
