"use client"
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { AppNavBar } from "~/app/_components/AppNavBar";
import { EditProjectForm } from "~/app/_components/EditProjectForm";

export default function CreateUpdateProjectPage() {

    return (
        <SessionAuth>
            <AppNavBar />
            <EditProjectForm />
        </SessionAuth>
    );
}