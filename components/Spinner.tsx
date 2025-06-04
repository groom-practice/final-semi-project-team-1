import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex justify-center items-center p-6">
      <ClipLoader color="#3b82f6" size={40} />
    </div>
  );
}

export default Spinner;
