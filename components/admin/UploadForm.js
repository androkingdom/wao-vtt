"use client";

import { UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const uploadTips = [
  "Use properly formatted VTT subtitle files.",
  "Multiple files can be uploaded together.",
  "Course name should be concise and descriptive.",
  "Provide a short course description to help learners.",
  "Check your internet connection to avoid upload errors.",
];

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [files, setFiles] = useState([]);

  function onFileChange(e) {
    setFiles(Array.from(e.target.files));
  }

  async function onFormSubmit(data) {
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    if (data.description) formData.append("description", data.description);

    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Upload failed:", error);
        return;
      }

      const result = await res.json();
      reset();
      setFiles([]);
      
      console.log("Upload success:", result);
    } catch (err) {
      console.error("Error uploading:", err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-12 gap-12 min-h-screen">
      {/* Main Form */}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="col-span-12 md:col-span-8 space-y-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-3xl border border-white/10 p-10 shadow-xl"
      >
        <h1 className="text-white text-4xl font-extrabold mb-8">
          Upload New Course
        </h1>

        {/* Course Name */}
        <div>
          <label className="block mb-3 text-white font-extrabold tracking-wide text-xl">
            Course Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("courseName", { required: "Course name is required" })}
            placeholder="Enter course name"
            disabled={isSubmitting}
            className="w-full px-5 py-4 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition"
            type="text"
          />
          {errors.courseName && (
            <p className="text-red-500 mt-2 font-semibold">
              {errors.courseName.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-3 text-white font-extrabold tracking-wide text-xl">
            Description (optional)
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Add a short description"
            disabled={isSubmitting}
            className="w-full px-5 py-4 rounded-3xl bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-3 text-white font-extrabold tracking-wide text-xl">
            Upload Files
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".vtt,text/vtt"
            onChange={onFileChange}
            disabled={isSubmitting}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-3xl text-white font-extrabold cursor-pointer select-none shadow-lg hover:shadow-xl transition"
          >
            Choose Files
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || files.length === 0}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-3xl text-white font-extrabold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              Uploading Course
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UploadCloud size={24} />
              Upload Course
            </span>
          )}
        </button>
      </form>

      {/* Aside Panel */}
      <aside className="col-span-12 md:col-span-4 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 shadow-lg max-h-[calc(100vh-96px)] sticky top-24 overflow-y-auto text-white">
        {files.length > 0 ? (
          <ul className="">
            {files.map((file, idx) => (
              <li
                key={file.name + file.size + idx}
                className={`flex items-center justify-between gap-4 truncate py-2 ${
                  idx !== files.length - 1 ? "border-b border-white/20" : ""
                }`}
                title={file.name}
              >
                <span className="truncate">{file.name}</span>
                <span className="text-xs text-gray-300">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-4 list-disc list-inside text-gray-300">
            <h2 className="text-3xl font-bold mb-6">Tips for Uploading</h2>
            {uploadTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
