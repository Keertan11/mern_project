import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4 overflow-hidden">
            {/* Hero background shapes */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-200 rounded-full opacity-30 blur-2xl z-0"></div>
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-200 rounded-full opacity-20 blur-2xl z-0"></div>
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl p-8 md:p-14 mt-10 md:mt-10">
                {/* Left: Hero content */}
                <div className="flex-1 flex flex-col items-start md:items-start">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 leading-tight">Take daily action on your biggest goals</h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-lg">
                        Transform your ambitions into reality. Goalsetter helps you break down big dreams into clear, actionable steps and daily habits.
                    </p>
                    <div className="flex gap-4 mb-8">
                        <Link to="/register" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition shadow-md">Register</Link>
                        <Link to="/login" className="bg-white border border-purple-600 text-purple-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-50 transition shadow-md">Login</Link>
                    </div>
                    <ul className="mb-6 w-full max-w-md text-left list-disc list-inside text-purple-700 space-y-1 text-base">
                        <li>Define clear, measurable goals</li>
                        <li>Break goals into subgoals and tasks</li>
                        <li>Build habits that drive progress</li>
                        <li>Track your progress visually</li>
                        <li>Stay motivated with a beautiful, simple interface</li>
                    </ul>
                </div>
                {/* Right: Illustration */}
                <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
                    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="110" cy="110" r="100" fill="#E9D5FF" />
                        <rect x="60" y="120" width="100" height="20" rx="10" fill="#A78BFA" />
                        <rect x="80" y="90" width="60" height="20" rx="10" fill="#C4B5FD" />
                        <rect x="100" y="60" width="20" height="20" rx="10" fill="#8B5CF6" />
                        <circle cx="110" cy="110" r="100" stroke="#A78BFA" strokeWidth="4" />
                    </svg>
                </div>
            </div>
            {/* Testimonial section */}
            {/* <div className="relative z-10 w-full max-w-2xl mx-auto mt-12">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 shadow-inner flex flex-col items-center">
                    <p className="text-gray-700 text-center font-semibold mb-2 text-lg">What our users say</p>
                    <div className="flex items-center gap-3 mb-2">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user" className="w-10 h-10 rounded-full border-2 border-purple-300" />
                        <span className="text-purple-700 font-medium">Amit R.</span>
                    </div>
                    <p className="text-gray-600 text-center text-base italic">“I love how easy it is to break down my goals and actually make progress every day. The design is clean and keeps me focused!”</p>
                </div>
            </div> */}
            <footer className="relative z-10 mt-10 text-gray-500 text-sm text-center">&copy; {new Date().getFullYear()} Goalsetter. All rights reserved.</footer>
        </div>
    );
};

export default Home;