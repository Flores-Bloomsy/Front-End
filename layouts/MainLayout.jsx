import ResponsiveNavBar from "@/components/navbar/ResponsiveNavBar";

export default function MainLayout({ children }) {
  return (
    <main>
      <ResponsiveNavBar />
      {children}
    </main>
  );
}
