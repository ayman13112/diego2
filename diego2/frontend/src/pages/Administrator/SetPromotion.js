import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SetPromotion = () => {
  const [promotion, setPromotion] = useState("");

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const promotion = { promotion };
    console.log(promotion);
    const response = await axios.put(
      `/api/administrator/setpromotion/${id}`,
      {"Price":promotion}
    );

    if (response.data) {
      console.log(response.data);
      alert("updated price successfully");
    }
  };

  return (
    <form className="classForm" onSubmit={handleSubmit}>
      <h3> Enter promotion </h3>

      <label>Promotion</label>
      <input
        type="text"
        required
        //value={promotion}
        onChange={(e) => setPromotion(e.target.value)}
      />

      <button> Update </button>
    </form>
  );
};

export default SetPromotion;
