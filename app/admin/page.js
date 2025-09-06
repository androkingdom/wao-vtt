"use client";

import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";
import UploadForm from "@/components/admin/UploadForm";

export default function AdminPage() {
  return (
    <AdminDashboardWrapper>
      <h1 className="text-white text-4xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>
      <UploadForm />
    </AdminDashboardWrapper>
  );
}
