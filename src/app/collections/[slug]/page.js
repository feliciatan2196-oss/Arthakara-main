import Navbar from "@/components/ui/Navbar";
import Collection from "@/components/collection/CollectionPage";

export default function CollectionDetail({ params }) {
  return (
    <div className="p-10 bg-white min-h-screen">
      <Navbar />
      <Collection slug={params.slug} />
    </div>
  );
}