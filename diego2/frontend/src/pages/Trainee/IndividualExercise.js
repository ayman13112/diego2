import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";


const IndividualExercise = () => {
  const [questions, setQuestions] = useState([]);
  const [Password, setPassword] = useState("");

  const {id1,id2} = useParams()
  
  const fetchQuestions = async () => {
    await axios.get(`/api/individualTrainee/getexc/${id2}`).then(
        (res) => {
          // console.log(res);
  
          const quests = res.data;
          console.log(res.data)
          console.log(quests)
          setQuestions(quests)
          console.log(questions)
        }
    )
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const user = { UserName, Password };
    // const response = await axios.post(
    //   "/api/administrator/createadministrator",
    //   user
    // );

    // if (response.data) {
    //   console.log(response.data);
    // }
    alert("Administrator added successfully")

  };

  useEffect(() => {
    fetchQuestions();
});

  return (
    <div>
    <button>Show Exercise</button>
    <form className="userForm" onSubmit={handleSubmit}>
      <h3> Exercise </h3>
        {questions.map((question) => (
            
            <div>
                <label>{question.QuestionText}</label>
                <ul>
                <li>{question.Options[0]}</li>
                <li>{question.Options[1]}</li>
                <li>{question.Options[2]}</li>
                <li>{question.Options[3]}</li>
                </ul>
                <br />
                <label>Submit your answer</label>
                <input  
                    type="text"                
                />                   
                
            </div>
           
        ))} 
        <button> Submit Answers </button>
    </form>
    </div>
  );
};

export default IndividualExercise;

      
   
