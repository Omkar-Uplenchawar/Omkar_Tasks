import React from "react";
import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
} from "./ProjectsStyle";
import ProjectCard from "../Cards/ProjectCards";
import { useRecoilValueLoadable } from "recoil";
import { fetchUserData } from "../../assets/recoilState";

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("all");
  const [selectedTech, setSelectedTech] = useState(null);
  const userDataLoadable = useRecoilValueLoadable(fetchUserData);
  if (userDataLoadable.state === "loading") {
    return <p>Loading...</p>;
  }
  if (userDataLoadable.state === "hasError") {
    return <p>Error fetching user data. Please try again later.</p>;
  }

  const data = userDataLoadable.contents.projects;
  const enabledProjects = data.filter((skill) => skill.enabled);
  const sortedProjects = [...enabledProjects].sort(
    (a, b) => a.sequence - b.sequence
  );
  //console.log(data);
  const handleToggle = (tech) => {
    setSelectedTech(null);
  };
  const showAllProjects = () => {
    setSelectedTech(null);
  };
  const filteredProjects = selectedTech
    ? sortedProjects.filter((project) =>
        project.techStack.some((tech) => tech === selectedTech)
      )
    : sortedProjects;

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup>
          <ToggleButton onClick={() => handleToggle("Reactjs")}>
            REACTJS
          </ToggleButton>
          <ToggleButton onClick={() => handleToggle("Nextjs")}>
            NEXTJS
          </ToggleButton>
          <ToggleButton onClick={() => handleToggle("Mern")}>MERN</ToggleButton>
          <ToggleButton onClick={() => handleToggle("CSS")}>CSS</ToggleButton>
          <ToggleButton onClick={() => handleToggle("TailwindCSS")}>
            TAILWINDCSS
          </ToggleButton>
          <ToggleButton onClick={showAllProjects}> All</ToggleButton>
        </ToggleButtonGroup>
        <CardContainer>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
