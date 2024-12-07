import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/chatroom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/SearchUser";
import ProfilePage from "./pages/ProfilePage";
import Signup from "./pages/signup";
import Login from "./pages/login";
import RecommendationsPage from "./pages/RecommendationsPage";
import PsRecommendation from "./pages/PsRecommendation";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/chats" element={<ChatRoom />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/searchUser" element={<Dashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/recommendations" element={<RecommendationsPage/>}/>
                    <Route path="/statement" element={<PsRecommendation/>}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
