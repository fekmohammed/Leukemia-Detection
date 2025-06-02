import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// ✅ Replace this with direct fetch instead of broken getPatients()
const Detection = () => {
  const { id } = useParams();
  const [patientId, setPatientId] = useState(id || "");
  const [patientName, setPatientName] = useState("");
  const [images, setImages] = useState([]);
  const [patients, setPatients] = useState([]);

  // ✅ Fetch patients.json from public folder
  useEffect(() => {
    fetch("/patients.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPatients(data);
      })
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  useEffect(() => {
  if (patientId && patients.length > 0) {
    const normalizedId = patientId.trim().toLowerCase();

    const patient = patients.find((p) =>
      p.patientId.toString().trim().toLowerCase() === normalizedId
    );

    if (patient) {
      setPatientName(patient.fullname);
    } else {
      setPatientName("Patient not found");
    }
  }
}, [patientId, patients]);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-primary mb-6">
        Leukemia Detection
      </h1>

      <div className="space-y-4">
        {patientId && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium">Patient ID</label>
              <Input
                value={patientId}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium">Patient Name</label>
              <Input
                value={patientName}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1 block">
            Upload Images
          </label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {images.map((file, index) => (
              <div key={index} className="border p-2 rounded shadow-sm">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-xs mt-1 text-center">{file.name}</p>
              </div>
            ))}
          </div>
        )}

        <Button className="w-full mt-4">Run Detection</Button>
      </div>
    </div>
  );
};

export default Detection;
