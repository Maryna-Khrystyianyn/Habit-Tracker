"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/userSlice";

export default function PersistUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return null; 
}