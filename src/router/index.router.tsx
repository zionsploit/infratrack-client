import { Route, Routes } from "react-router"
import { Layout } from "../components/Layout"
import { Home } from "../pages/Core/Home"
import { CityFunded } from "../pages/Core/Project/CityFunded.Project"
import { Constructor } from "../pages/Core/Constructor"
import { Document } from "../pages/Core/Document"
import { ProjectInterface } from "../pages/Core/ProjectInterface"
import { UsersManagement } from "../pages/Core/UsersManagement"
import { PageOnWork } from "../pages/Core/PageOnWork"
import { Login } from "../pages/Core/Auth/Login"
import { Register } from "../pages/Core/Auth/Register"
import { GuessLayout } from "../components/Layout/GuessLayout"
import BrgyFunded from "../pages/Core/Project/BrgyFunded"
import { AddProject } from "../pages/Core/Project/AddProject"

export const Router = () => {

    return <>
        <Routes>
            <Route element={<GuessLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/dashboard" element={<PageOnWork />} />
                <Route path="/timeline" element={<PageOnWork />} />
                <Route path="project">
                    <Route path="city-funded">
                        <Route index element={<CityFunded />} />
                        <Route path="add" element={<AddProject />} />
                    </Route>
                    <Route path="brgy-funded">
                        <Route index element={<BrgyFunded />} />
                        <Route path="add" element={<AddProject />} />
                    </Route>
                </Route>
                <Route path="/contractor" element={<Constructor />} />
                <Route path="components">
                    <Route path="project-interface" element={<ProjectInterface />} />
                    <Route path="document" element={<Document />} />
                    <Route path="e-mail" element={<PageOnWork />} />
                    <Route path="project-backlog" element={<PageOnWork />} />
                    <Route path="reports" element={<PageOnWork />} />
                </Route>
                <Route path="/users-management" element={<UsersManagement />} />
                <Route path="/settings" element={<PageOnWork />} />
                <Route path="/api" element={<PageOnWork />} />
            </Route>
        </Routes>
    </>
}