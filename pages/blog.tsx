import Navbar from "@components/Navbar";
import Head from "next/head";

const Blog = () => {
  return (
    <>
      <Head>
        <meta name="description" content="This is blog page" />
        <title>Blog</title>
      </Head>
      <Navbar pageName="Home" />
      <div className="page-content-title">Blog page</div>
    </>
  );
};

export default Blog;
