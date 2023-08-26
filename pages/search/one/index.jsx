import { getSession } from "next-auth/react";

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

function SearchOnePage() {
  return (
    <>
      <h1>This is UBike1.0 page</h1>
    </>
  );
}

export default SearchOnePage;
