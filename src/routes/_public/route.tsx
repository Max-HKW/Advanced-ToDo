import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Components
 */
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="root isolate min-h-dvh flex flex-col overflow-hidden">
      <Header />
      <main className="grow grid items-center pt-36 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
