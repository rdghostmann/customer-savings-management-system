import CreateForm from "@/components/Customer/CreateForm";

export default function page() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Create Customer</h1>
      <CreateForm />
    </div>
  );
}