"use client";

import { AppDispatch, RootState } from "@/src/store";
import { loadAuth } from "@/src/store/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthInit() {
  const dispatch = useDispatch<AppDispatch>();
  const { initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(loadAuth());
    }
  }, [initialized, dispatch]);

  return null;
}
