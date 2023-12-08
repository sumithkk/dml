import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Navbar from "../../components/Navbar";
import { Button } from "@mui/material";
import { Person } from "../../types";
import PersonModal from "../../components/PersonModal";
import { useDispatch } from "react-redux";
import { updatePerson } from "../../redux/actions/userActions";
import Header from "@components/Header"

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const personState = useSelector((state: RootState) => state.persons);

  const person =
    personState && personState.persons.find((p: Person) => p.id === Number(id));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    let loggedIn;
    if (typeof window !== "undefined") {
      loggedIn = localStorage.getItem("loggedIn");
      if (!loggedIn) {
        router.push("/login");
      }
    }
  }, []);

  const handleEditClick = () => {
    console.log("Opening modal...");
    setIsEditModalOpen(true);
  };

  const handleSavePerson = (updatedPerson: Person) => {
    console.log(updatedPerson);
    dispatch(updatePerson(updatedPerson));
    setIsEditModalOpen(false);
  };

  if (!person) {
    return <div>person not found</div>;
  }

  return (
    <div>
      <Header title="Profile" />
      <Navbar pageName="Profile" />
      <div className="profileTable">
        <Button
          color="inherit"
          variant="outlined"
          style={{ margin: "20px 0" }}
          onClick={handleEditClick}
        >
          Edit Profile
        </Button>
        <table>
          <tbody>
            {person && (
              <>
                <tr>
                  <td className="head">Name</td>
                  <td>{person.name}</td>
                </tr>
                <tr>
                  <td className="head">Age</td>
                  <td>{person.age}</td>
                </tr>
                <tr>
                  <td className="head">Profession</td>
                  <td>{person.profession}</td>
                </tr>
              </>
            )}
          </tbody>
          {isEditModalOpen && (
            <PersonModal
              open={isEditModalOpen}
              handleClose={() => setIsEditModalOpen(false)}
              handleSave={handleSavePerson}
              initialPerson={person}
              type="edit"
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default Profile;
