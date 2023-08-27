import { getSession } from "next-auth/react";
import { useLoadScript } from "@react-google-maps/api";
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
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <h1>This is search page</h1>
      <Map />
    </>
  );
}

export default SearchAllPage;
