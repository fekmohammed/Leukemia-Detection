import { Card } from "../components/ui/card";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-primary mb-4">Patient Profile: {id}</h1>
      {/* Add patient details */}
      <Card className="p-4 shadow-lg">
        <p>Patient details and test history go here.</p>
      </Card>
    </div>
  );
};


export default Profile;