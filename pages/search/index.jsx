import { clientSidePageGuards } from "@/components/utils/clientSidePageGuards";

function SearchAllPage() {
  clientSidePageGuards();
  return (
    <>
      <h1>This is All page</h1>
    </>
  );
}

export default SearchAllPage;
