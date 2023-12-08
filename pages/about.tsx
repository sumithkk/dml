import Navbar from "@components/Navbar";
import Head from "next/head";

const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Navbar pageName="Home" />
      <div className="page-content-title">About page</div>
    </>
  );
};

export default About;
