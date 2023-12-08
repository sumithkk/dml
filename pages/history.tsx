import Navbar from "@components/Navbar";
import Head from "next/head";

const History = () => {
  return (
    <>
      <Head>
        <meta name="description" content="This is history page" />
        <title>History</title>
      </Head>
      <Navbar pageName="Home" />
      <div className="page-content-title">History page</div>
    </>
  );
};

export default History;
