export type SpingerStatus = "on" | "off" | "invited";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  company?: string;
  status: SpingerStatus;
  lastContacted?: string;
  avatarColor: string;
};

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Priyanshu Pandey",
    phone: "+91 98765 43210",
    company: "Design Studio",
    status: "off",
    lastContacted: "15 Oct",
    avatarColor: "#3B82F6",
  },
  {
    id: "2",
    name: "Ananya Sharma",
    phone: "+91 99887 76655",
    company: "Nova Labs",
    status: "on",
    lastContacted: "Today",
    avatarColor: "#10B981",
  },
  {
    id: "3",
    name: "Rohan Mehta",
    phone: "+91 91234 56780",
    status: "invited",
    lastContacted: "12 Oct",
    avatarColor: "#F59E0B",
  },
  {
    id: "4",
    name: "Kavya Iyer",
    phone: "+91 98111 22334",
    company: "BrightPath",
    status: "on",
    lastContacted: "Yesterday",
    avatarColor: "#8B5CF6",
  },
  {
    id: "5",
    name: "Aarav Singh",
    phone: "+91 90011 22334",
    status: "off",
    lastContacted: "8 Oct",
    avatarColor: "#EF4444",
  },
  {
    id: "6",
    name: "Neha Kapoor",
    phone: "+91 97654 32109",
    company: "Orbit Media",
    status: "on",
    lastContacted: "14 Oct",
    avatarColor: "#06B6D4",
  },
  {
    id: "7",
    name: "Vikram Joshi",
    phone: "+91 93456 78901",
    status: "off",
    lastContacted: "3 Oct",
    avatarColor: "#EC4899",
  },
  {
    id: "8",
    name: "Ishita Rao",
    phone: "+91 94567 89012",
    company: "Leaf & Co",
    status: "invited",
    lastContacted: "10 Oct",
    avatarColor: "#14B8A6",
  },
  {
    id: "9",
    name: "Dev Patel",
    phone: "+91 95678 90123",
    status: "on",
    lastContacted: "Today",
    avatarColor: "#6366F1",
  },
  {
    id: "10",
    name: "Meera Nair",
    phone: "+91 96789 01234",
    company: "City Clinic",
    status: "off",
    lastContacted: "1 Oct",
    avatarColor: "#F97316",
  },
];

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
