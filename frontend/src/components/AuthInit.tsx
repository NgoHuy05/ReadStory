"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loadAuth } from "../store/authSlice";

export default function AuthInit() {
  const dispatch = useDispatch<AppDispatch>();
  const { initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(loadAuth());
    }
  }, [initialized, dispatch]);
  if (!initialized) {
    return (
      <div className="min-h-screen bg-[var(--main-bg)] text-white dark:bg-darkMode-800 py-4">
        Loading...
      </div>
    );
  }
  return null;
}
