"use client"
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { AppNavBar } from "../../_components/AppNavBar";
import { CreateProjectForm } from "../../_components/CreateProjectForm";

export default function CreateUpdateProjectPage() {

    return (
      <SessionAuth>
        <AppNavBar />
        <CreateProjectForm />
      </SessionAuth>
    );
  }