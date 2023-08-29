import { getSession } from "next-auth/react";
//從useLoadScript()改成這個
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "@/components/map/Map";

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function SearchAllPage() {
  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
    </>
  );
}

export default SearchAllPage;
