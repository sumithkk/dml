import Navbar from "@components/Navbar";
import Head from "next/head";

const Services = () => {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <Navbar pageName="Home" />
      <div className="page-content-title">Services page</div>
    </>
  );
};

export default Services;
