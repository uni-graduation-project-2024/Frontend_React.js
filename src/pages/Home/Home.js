import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import { IoPerson } from "react-icons/io5";
import { RiAiGenerate } from "react-icons/ri";

import './Home.css'; 
import ManCelebration from '../../assets/svg/ManCelebration';
import { getAuthToken, removeAuthToken } from '../../services/auth';
import LearntendoLogo from '../../assets/svg/LearntendoLogo/LearntendoLogo';

const Home = () => {
  const navigate = useNavigate();
  const { user } = getAuthToken();

  const handleLoginClick = () => {
    navigate("/loginregister");
  };

  const handleSignInClick = () => {
    navigate("/loginregister", {state: {toMode: "signUp"}});
  };

  const handleLogOutClick = () => {
    removeAuthToken();
    navigate("/loginregister");
  };

  return (
    <div className="home-container" style={{backgroundImage: "url(/images/Background-effect.png)", backgroundRepeat: "no-repeat"}}>
      <div style={{marginTop:"30px"}}>
      <LearntendoLogo playAnimation={true} setLineVisible={true}></LearntendoLogo>
      </div>
      <ManCelebration showDecoration={false} heightDimmension={200} scaleValue={1.5}/>
      <div className="home-auth-buttons-container">
        {!user ? (
          <>
            <button onClick={handleLoginClick} className="home-auth-button home-login-button">
              <FaSignInAlt /> Login
            </button>
            <button onClick={()=>handleSignInClick()} className="home-auth-button home-signup-button">
              <IoPerson /> Sign Up
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/GenerationForm")} className="home-auth-button home-login-button">
              <RiAiGenerate /> Generate
            </button>
            <button onClick={handleLogOutClick} className="home-auth-button home-signup-button">
              <FaSignOutAlt /> LogOut
            </button>
          </>
        )}
      </div>
      {/* Video section */}
      <div className="home-video-section">
        <video className="home-video" controls>
          <source src="/videos/explained_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


      </div>
    </div>
  );
};

export default Home;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSignInAlt } from 'react-icons/fa';
// import { RiAiGenerate } from "react-icons/ri";

// import './Home.css'; 
// import ManCelebration from '../../assets/svg/ManCelebration';
// import { getAuthToken, removeAuthToken } from '../../services/auth';

// const Home = () => {
//   const navigate = useNavigate();
//   const {user} = getAuthToken();

//   const handleLoginClick = () => {
//     navigate("/loginregister"); 
//   };

//   const handleLogOutClick = () => {
//     removeAuthToken();
//     navigate("/loginregister"); 
//   };

//   return (
//     <>
//     <div className="home-container">
//       <div className="home-main">
//         <div className="home-text">
//           <h1 className="home-title">Welcome to Learntendo</h1>
//           {user && 
//           (
//           <>
//             <button onClick={()=> navigate("/GenerationForm")} className="home-login-button">
//               <RiAiGenerate /> Generate
//             </button>
//             <button onClick={handleLogOutClick} className="home-login-button">
//               <FaSignInAlt /> LogOut
//             </button>
//           </>
//           )}
//           {!user && 
//           (
//           <button onClick={handleLoginClick} className="home-login-button">
//             <FaSignInAlt /> Login
//           </button>
//           )}
//                     <video width="50%" height="auto" controls>
//             <source src="/videos/explained_video.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <ManCelebration/>
//         </div>
        
        
//       </div>
//       {/* <div className="features-container">
//           <div className="feature-card">
//             <h3 className="feature-header">Create Quizies</h3>
//             <p className="feaute-text">You can create unlimited quizies from your content</p>
//           </div>
//           <div className="feature-card">
//             <h3 className="feature-header">Challenges</h3>
//             <p className="feaute-text">You can create unlimited quizies from your content</p>
//           </div>
//           <div className="feature-card">
//             <h3 className="feature-header">Leaderboards</h3>
//             <p className="feaute-text">You can create unlimited quizies from your content</p>
//           </div>
//           <div className="feature-card">
//             <h3 className="feature-header">Progress evaluation</h3>
//             <p className="feaute-text">You can create unlimited quizies from your content</p>
//           </div>
//       </div> */}
//     </div>
//     </>
//   );
// };

// export default Home;

// import React from "react";
// import { PlayCircle, Rocket, Star, FileText, Trophy, BadgeCheck } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "../../../components/ui/button";
// import { Card } from "../../../components/ui/card";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
//       {/* Hero Section */}
//       <div className="text-center pt-20 pb-10 px-6">
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
//         >
//           Turn Learning Into a Game!
//         </motion.h1>
//         <p className="text-lg md:text-xl mb-6">
//           Upload your notes. Unlock challenges. Earn XP. Learn with fun!
//         </p>
//         <div className="flex justify-center gap-4 flex-wrap">
//           <Button className="text-white bg-purple-600 hover:bg-purple-700">
//             <PlayCircle className="mr-2" /> Watch How It Works
//           </Button>
//           <Button className="text-white bg-blue-600 hover:bg-blue-700">
//             <Rocket className="mr-2" /> Join Learntendo
//           </Button>
//         </div>
//         <img
//           src="/mascot.gif"
//           alt="Learntendo Mascot"
//           className="mx-auto mt-8 w-48 md:w-56"
//         />
//       </div>

//       {/* Features Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 py-10">
//         <Card className="p-6 text-center shadow-xl rounded-2xl">
//           <FileText className="w-10 h-10 mx-auto mb-4 text-blue-600" />
//           <h3 className="text-xl font-semibold mb-2">Auto-Generated Quizzes</h3>
//           <p>Upload PDFs, and get instant questions to test your knowledge.</p>
//         </Card>
//         <Card className="p-6 text-center shadow-xl rounded-2xl">
//           <Trophy className="w-10 h-10 mx-auto mb-4 text-purple-600" />
//           <h3 className="text-xl font-semibold mb-2">Weekly Challenges</h3>
//           <p>Compete with friends or classmates in engaging quiz challenges.</p>
//         </Card>
//         <Card className="p-6 text-center shadow-xl rounded-2xl">
//           <BadgeCheck className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
//           <h3 className="text-xl font-semibold mb-2">Earn XP & Badges</h3>
//           <p>Track your progress and collect achievements as you learn.</p>
//         </Card>
//       </div>

//       {/* Testimonials */}
//       <div className="bg-white py-10 px-6 md:px-20 text-center">
//         <h2 className="text-2xl font-bold mb-6 text-blue-800">What Students Say</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <blockquote className="bg-blue-50 p-4 rounded-xl shadow">
//             “I actually *want* to study now!” – <strong>High school student</strong>
//           </blockquote>
//           <blockquote className="bg-purple-50 p-4 rounded-xl shadow">
//             “Learntendo makes learning feel like playing a game.” – <strong>University student</strong>
//           </blockquote>
//         </div>
//       </div>

//       {/* Final CTA */}
//       <div className="text-center py-12 bg-gradient-to-br from-purple-200 to-blue-100">
//         <h2 className="text-3xl font-bold mb-4 text-purple-900">
//           Join thousands of learners already levelling up with Learntendo.
//         </h2>
//         <Button className="text-white bg-green-600 hover:bg-green-700 text-lg px-6 py-3 rounded-full">
//           Sign Up Now
//         </Button>
//       </div>
//     </div>
//   );
// }
// import React from "react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-800">
//       {/* Hero Section */}
//       <div className="text-center py-16 px-4 md:px-12">
//         <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">🎮 Turn Learning Into a Game!</h1>
//         <p className="text-lg md:text-xl mb-6 text-gray-700">
//           Upload notes, unlock challenges, earn XP, and level up while studying.
//         </p>

//                 <video
//           width="720"
//           height="405"
//           controls
//           className="rounded-2xl shadow-xl border-4 border-purple-300"
//         >
//           <source src="/videos/explained_video.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>



//         {/* Call to Action */}
//         <div className="flex flex-wrap justify-center gap-4">
//           <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition">
//             Watch How It Works
//           </button>
//           <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">
//             Join Learntendo
//           </button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 pb-20">
//         <FeatureCard
//           title="🧠 Auto-Generated Quizzes"
//           desc="Upload PDFs and get instant questions to test your knowledge."
//         />
//         <FeatureCard
//           title="⚔️ Weekly Challenges"
//           desc="Compete with friends or classmates in engaging quiz battles."
//         />
//         <FeatureCard
//           title="🏆 Earn XP & Badges"
//           desc="Track progress and unlock achievements as you learn."
//         />
//       </div>

//       {/* Final CTA */}
//       <div className="text-center pb-10">
//         <h2 className="text-2xl font-bold mb-4">Join thousands of learners leveling up with Learntendo</h2>
//         <button className="px-8 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition">
//           🚀 Sign Up Now
//         </button>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ title, desc }) {
//   return (
//     <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-1">
//       <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
//       <p className="text-gray-700">{desc}</p>
//     </div>
//   );
// }
