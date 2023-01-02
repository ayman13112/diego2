import { BrowserRouter, Routes, Route } from "react-router-dom";

import GuestHome from "./pages/Guest/GuestHome";
import Course from "./pages/Course";
import Navbar from "./components/Navbar";
import AddAdministrator from "./pages/Administrator/AddAdministrator";
import HomeAdministrator from "./pages/Administrator/HomeAdministrator";
import AddInstructor from "./pages/Administrator/AddInstructor";
import HomeInstructor from "./pages/Instructor/HomeInstructor";
import AddCorporateTrainee from "./pages/Administrator/AddCorporateTrainee";
import CourseReqsCorp from "./pages/Administrator/CourseReqsCorp";
import RefundReqsInd from "./pages/Administrator/RefundReqsInd";
import ViewReportedProblem from "./pages/Administrator/ViewReportedProblems";
import IndReportPage from "./pages/Administrator/IndReportPage";
import CorpReportPage from "./pages/Administrator/CorpReportPage";

import IndividualTrainee from "./pages/Trainee/IndividualTrainee";
import CorporateTrainee from "./pages/Trainee/CorporateTrainee";
import IndividualTraineeCourse from "./pages/Trainee/IndividualTraineeCourse";
import CorporateTraineeCourse from "./pages/Trainee/CorporateTraineeCourse";

import AddCourse from "./pages/Instructor/AddCourse";
import InstructorListCourse from "./pages/Instructor/InstructorListCourse";
import CourseInstructor from "./pages/Instructor/CourseInstructor";
import EditProfileInstructor from "./pages/Instructor/EditProfileInstructor";
import GuestCourse from "./pages/Guest/GuestCourse";
import InstructorContract from "./pages/Instructor/InstructorContract";

import ViewVideo from "./pages/Guest/ViewVideo";
//import EditBiography from "./pages/Instructor/EditBiography";

//import EditEmail from "./pages/Instructor/EditEmail";

//import ChangePassword from "./pages/Instructor/ChangePassword";
import IndChangePassword from "./pages/IndChangePassword";

import CorChangePassword from "./pages/CorChangePassword";

import SetPromotion from "./pages/Administrator/SetPromotion";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import MostView from "./pages/Instructor/MostView";

import IndMostView from "./pages/IndMostView";
import CorMostView from "./pages/CorMostView";

import GesMostView from "./pages/Guest/GesMostView";

//import AmountMoney from "./pages/Instructor2/AmountMoney";

import CourseAdministrator from "./pages/CourseAdministrator";

import CourseIndividual from "./pages/CourseIndividual";
import SetAllPromotion from "./pages/Administrator/SetAllPromotion";
import IndRegisteredCourses from "./pages/Trainee/IndRegisteredCourses";
import CorpRegisteredCourses from "./pages/Trainee/CorpRegisteredCourses";
import IndRegisteredCourse2 from "./pages/Trainee/IndRegisteredCourse2";
import CorpRegisteredCourse2 from "./pages/Trainee/CorpRegisteredCourse2";
import IndReportProblem from "./pages/Trainee/IndReportProblem";
import CorpReportProblem from "./pages/Trainee/CorpReportProblem";
import IndViewAllProblem from "./pages/Trainee/IndViewAllProblem";
import IndReportFollowUp from "./pages/Trainee/IndReportFollowUp";
import IndCourseCompleted from "./pages/Trainee/IndCourseCompleted";
import CorpCourseCompleted from "./pages/Trainee/IndCourseCompleted";
import IndWriteNotes from "./pages/Trainee/IndWriteNotes";
import CorpWriteNotes from "./pages/Trainee/CorpWriteNotes";
import IndividualExercise from "./pages/Trainee/IndividualExercise";
import CorpViewAllProblem from "./pages/Trainee/CorpViewAllProblem";
import CorpReportFollowUp from "./pages/Trainee/CorpReportFollowUp";
import IndPayCredit from "./pages/Trainee/IndPayCredit";

import ForgetPass from "./pages/ForgetPass";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/">
              <Route path="Login" element={<Login />} />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="GuestHome" element={<GuestHome />} />
              <Route path="GesMostView" element={<GesMostView />} />

              <Route path="GuestCourse" element={<GuestCourse />} />
              <Route path="course/:id" element={<Course />} />
              <Route path="HomeAdministrator" element={<HomeAdministrator />} />
              <Route path="SetPromotion/:id" element={<SetPromotion />} />
              <Route path="AddAdministrator" element={<AddAdministrator />} />
              <Route path="AddInstructor" element={<AddInstructor />} />
              <Route
                path="AddCorporateTrainee"
                element={<AddCorporateTrainee />}
              />
              <Route path="CourseReqsCorp/:id" element={<CourseReqsCorp />} />
              <Route path="RefundReqsInd/:id" element={<RefundReqsInd />} />
              <Route path="courseAdministrator/:id" element={<CourseAdministrator />} />
              <Route
                path="ViewReportedProblem/:id"
                element={<ViewReportedProblem />}
              />
              <Route
                path="IndReportPage"
                element={<IndReportPage />}
              />
              <Route
                path="CorpReportPage"
                element={<CorpReportPage />}
              />
              <Route
                path="SetAllPromotion"
                element={<SetAllPromotion />}
              />
              <Route path="HomeInstructor/:id" element={<HomeInstructor />} />
              <Route path="AddCourse/:id" element={<AddCourse />} />

              {/* <Route path="AmountMoney" element={<AmountMoney />} /> */}

              <Route path="mostview" element={<MostView />} />

              {/* <Route path="EditBiography/:id" element={<EditBiography />} /> */}

              {/* <Route path="EditEmail/:id" element={<EditEmail />} /> */}

              {/* <Route path="ChangePassword/:id" element={<ChangePassword />} /> */}

              <Route path="course/video/:id" element={<ViewVideo />} />
              {/* <Route path="individualTrainee" element={<IndividualTrainee />} />
              <Route path="individualTrainee/viewExam/:id" element={<ExamDetails />} /> */}

              <Route path="IndividualTrainee/:id" element={<IndividualTrainee />} />
              <Route path="CorporateTrainee/:id" element={<CorporateTrainee />} />
              <Route
                path="CorChangePassword/:id"
                element={<CorChangePassword />}
              />

              <Route path="CorMostView" element={<CorMostView />} />

              <Route
                path="CorChangePassword/:id"
                element={<CorChangePassword />}
              />

              <Route path="IndividualTraineeCourse/:id1/:id2" element={<IndividualTraineeCourse />} />
              <Route path="CorporateTraineeCourse/:id1/:id2" element={<CorporateTraineeCourse />} />
              <Route path="IndRegisteredCourses/:id" element={<IndRegisteredCourses />} />
              <Route path="CorpRegisteredCourses/:id" element={<CorpRegisteredCourses />} />
              <Route path="IndRegisteredCourse2/:id1/:id2" element={<IndRegisteredCourse2 />} />
              <Route path="CorpRegisteredCourse2/:id1/:id2" element={<CorpRegisteredCourse2 />} />
              <Route path="IndReportProblem/:id1/:id2" element={<IndReportProblem />} />
              <Route path="CorpReportProblem/:id1/:id2" element={<CorpReportProblem />} />
              <Route path="IndViewAllProblem/:id" element={<IndViewAllProblem />} />
              <Route path="IndReportFollowUp/:id1/:id2" element={<IndReportFollowUp />} />
              <Route path="CorpViewAllProblem/:id" element={<CorpViewAllProblem />} />
              <Route path="CorpReportFollowUp/:id1/:id2" element={<CorpReportFollowUp />} />
              <Route path="IndCourseCompleted/:id" element={<IndCourseCompleted />} />
              <Route path="CorpCourseCompleted/:id" element={<CorpCourseCompleted />} />
              <Route path="IndWriteNotes/:id1/:id2" element={<IndWriteNotes />} />
              <Route path="CorpWriteNotes/:id1/:id2" element={<CorpWriteNotes />} />
              <Route path="IndividualExercise/:id1/:id2" element={<IndividualExercise />} />
              <Route path="IndPayCredit/:id1/:id2" element={<IndPayCredit />} />
              <Route
                path="IndChangePassword/:id"
                element={<IndChangePassword />}
              />

              <Route path="IndMostView" element={<IndMostView />} />

              <Route
                path="InstructorListCourse/:id"
                element={<InstructorListCourse />}
              />
              <Route
                path="courseInstructor/:id"
                element={<CourseInstructor />}
              />

              <Route
                path="EditProfileInstructor/:id"
                element={<EditProfileInstructor />}
              />

              <Route
                path="InstructorContract"
                element={<InstructorContract />}
              />

              <Route
                path="CourseIndiviual/:id"
                element={<CourseIndividual />}
              />

              <Route
                path="forgetpass" 
                element={<ForgetPass />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
