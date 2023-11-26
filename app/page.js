import Image from "next/image";
import Connect from "./components/Connect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Connect />
    </main>
  );
}
