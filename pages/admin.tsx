import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";
import AdminDashboard from "../components/AdminDashboard";

const admin = () => {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      if (userData.role !== "admin") {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [router, userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AdminDashboard />;
};

export default admin;
