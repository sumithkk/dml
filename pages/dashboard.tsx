import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { getUsers } from "../redux/actions/userActions";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
import { GetServerSideProps } from 'next';
import { authMiddleware } from '../middleware/auth';
import Head from "next/head";

// pages/dashboard.ts
const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>(); // Adjust the type here
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const users = useSelector((state: RootState) => state.users.data);
  const totalPages = useSelector((state: RootState) => state.users.totalPages);
  const currentPage = useSelector(
    (state: RootState) => state.users.currentPage
  );
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    console.log('loggedIn', loggedIn);
    if (loggedIn) {
      dispatch(getUsers(1));
    } 
  }, [dispatch, loggedIn]);

  const handlePageChange = (page: number) => {
    if(page !== currentPage){
      dispatch(getUsers(page));
    }
    
  };

  const memoizedUsers = useMemo(() => users, [users]);

  if (loading === "pending") {
    return <Loader />;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar pageName="Dashboard" />
      <h2 className="table-title">User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {memoizedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} type="button" onClick={() => handlePageChange(currentPage - 1)}>{`<`}</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={index + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} type="button" onClick={() => handlePageChange(currentPage + 1)}>{`>`}</button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = authMiddleware(async () => {
  return {
    props: {}, // This page has access to the user's session.
  };
});

export default Dashboard;
