import { FaRobot, FaArrowLeft, FaChevronDown } from "react-icons/fa";

export default function ChatHeader({
  selectedCourse,
  availableCourses = [],
  onCourseChange,
  onBackToLanding,
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-t-xl border border-white/10 p-4 mb-0">
      <div className="flex items-center justify-between">
        {/* Left side - Bot info and back button */}
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            onClick={onBackToLanding}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 border border-white/10"
            title="Back to landing page"
          >
            <FaArrowLeft className="w-4 h-4 text-white" />
          </button>

          {/* Bot avatar */}
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            <FaRobot className="w-5 h-5 text-white" />
          </div>

          {/* Bot info */}
          <div>
            <h3 className="font-semibold text-white">VTT RAG Assistant</h3>
            <p className="text-sm text-gray-400">
              Ask questions about your videos
            </p>
          </div>
        </div>

        {/* Right side - Course dropdown */}
        <div className="relative">
          <select
            value={selectedCourse || ""}
            onChange={(e) => onCourseChange(e.target.value)}
            className="appearance-none bg-white/10 border border-white/20 rounded-lg px-4 py-2 pr-10 text-white text-sm min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          >
            <option value="" disabled className="bg-slate-800 text-gray-300">
              Select a course
            </option>
            {/* {availableCourses.map((course) => (
              <option
                key={course.id}
                value={course.id}
                className="bg-slate-800 text-white"
              >
                {course.title} ({course.videoCount} videos)
              </option>
            ))} */}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <FaChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Selected course indicator */}
      {selectedCourse && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-300">
              Active:{" "}
              {availableCourses.find((c) => c.id === selectedCourse)?.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
