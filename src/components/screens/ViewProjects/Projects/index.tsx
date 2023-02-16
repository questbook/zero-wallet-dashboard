import { IProject } from "@/types";
import { Fragment } from "react";
import SingleProject from "./SingleProject";

interface Props {
    projects: IProject[]
}

export default function Projects({
    projects,
}: Props) {
    
    return (
        <Fragment >
            {
                projects.map(project => (
                    <SingleProject key={project.project_id} project={project} />
                ))
            }
        </Fragment>

    )
}
