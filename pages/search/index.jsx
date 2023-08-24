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

function SearchAllPage() {
  return (
    <>
      <h1>This is search page</h1>
    </>
  );
}

export default SearchAllPage;
