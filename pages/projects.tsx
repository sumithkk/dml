import Navbar from "@components/Navbar";
import Head from "next/head";

const Projects = () => {
  return (
    <>
      <Head>
        <meta name="description" content="This is login page" />
        <title>Projects</title>
      </Head>
      <Navbar pageName="Home" />
      <div className="page-content-title">Projects page</div>
    </>
  );
};

export default Projects;
