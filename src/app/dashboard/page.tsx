"use client";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { AppNavBar } from "../_components/AppNavBar";
import { AppDashBoard } from "../_components/AppDashboard";


export default function DashBoard() {
  return (
    <SessionAuth>
        <AppNavBar />
        <AppDashBoard />
    </SessionAuth>
  );
}
