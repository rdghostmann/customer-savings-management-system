import ResetBalancesButton from "@/components/ResetBalanceButton/ResetBalanceButton";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Actions</h1>
      <ResetBalancesButton />
    </div>
  );
}