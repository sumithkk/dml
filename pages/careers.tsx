import Navbar from "@components/Navbar";
import Head from "next/head";

const Careers = () => {
  return (
    <>
      <Head>
        <meta name="description" content="This is careers page" />
        <title>Careers</title>
      </Head>
      <Navbar pageName="Home" />
      <div className="page-content-title">Careers page</div>
    </>
  );
};

export default Careers;
