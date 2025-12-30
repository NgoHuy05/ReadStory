"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getProfile } from "../store/authSlice";

export default function AppInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return null;
}
