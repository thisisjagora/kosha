"use client";
import { useToast } from "@/components/toast/use-toast";

export default function Home() {
  const { toast } = useToast()
  return (
    <div>
      <div className="border py-3 px-6 rounded-lg">
        Kosha Moves
      </div>
      <div 
        className="border py-2 px-8 rounded-lg hover:cursor-pointer"
        onClick={() => {
          toast({
            title: "Your Move Request Has Been Sent",
            description: "KM-00345093 will process your request within 24 hours",
          })
        }}
      >
        Test Toast
      </div>
    </div>
  );
}
