// components/OurServicesSection.tsx
import { api } from "~/trpc/react";
import ServiceItem from './OurServicesItems';

interface ActiveService {
  content: string;
  updatedAt: Date;
  id: number;
  isActive: boolean;
}

const ActiveServiceComponent = ({ activeService }: { activeService: ActiveService | null }) => {
  if (!activeService) {
    return <div>No active service found</div>;
  }

  return (
    <div>
      <p>{activeService.content}</p>
    </div>
  );
};

const OurServicesSection: React.FC = () => {
  // Use `api` instead of `trpc` for tRPC query
  const { data: activeService, isLoading, error } = api.services.getActiveService.useQuery();

  const services = [
    { name: "Branding Identity", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] },
    { name: "Interactive Design", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] },
    { name: "SEO/Marketing", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] },
    { name: "Development", features: ["Legacy Modernisation", "Solution Design", "Technology Enabling", "Mobile-First Systems"] }
  ];

  if (isLoading) return <div>Loading active service...</div>;

  if (error instanceof Error) {
    return <div>Error loading active service: {error.message}</div>;
  }

  return (
    <section className="flex flex-col items-center py-12 bg-black text-white min-w-full">
      {/* Header */}
      <div className="flex flex-col w-full max-w-[1110px] px-4">
        <div className="flex gap-4 items-center text-xl">
          <div className="w-4 h-[15px] bg-neutral-600"></div>
          <h2 className="font-bold">Our Services</h2>
        </div>
        <div className="mt-4 text-3xl font-bold">
          <ActiveServiceComponent activeService={activeService ?? null} />
        </div>
      </div>

      {/* Full-width line */}
      <div className="w-full border-t border-stone-500 my-4"></div>

      {/* Service and Features Section */}
      <div className="flex flex-wrap gap-5 mt-1 max-w-full w-full justify-center">
        <div className="flex flex-col w-full md:w-2/3 px-4">
          {/* Column Headers */}
          <div className="flex justify-between items-center py-2 mt-1 text-xl font-semibold">
            <span className="px-4">Services</span>
            <span className="px-4">Features</span>
            <span className="px-4">3D Illustrations</span>
          </div>

          {/* Service List */}
          <div className="flex flex-col mt-8 space-y-8 font-bold">
            {services.map((service, index) => (
              <ServiceItem key={index} {...service} persistentBackground={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
