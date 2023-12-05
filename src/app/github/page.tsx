import { BulkMergePrs } from "@/components/github/BulkMergePrs";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container min-h-screen">
        <BulkMergePrs />
      </div>
    </main>
  );
}
