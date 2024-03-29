import React from "react";
import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
} from "./ServiceStyle";
import { useRecoilValueLoadable } from "recoil";
import { fetchUserData } from "../../assets/recoilState";
import ServiceCard from "../Cards/ServiceCard";

const Service = () => {
  const userDataLoadable = useRecoilValueLoadable(fetchUserData);
  if (userDataLoadable.state === "loading") {
    return <p>Loading...</p>;
  }
  if (userDataLoadable.state === "hasError") {
    return <p>Error fetching user data. Please try again later.</p>;
  }

  const data = userDataLoadable.contents.services;
  const enabledService = data.filter((service) => service.enabled);
  const sortedService = [...enabledService].sort(
    (a, b) => a.sequence - b.sequence
  );
  //console.log(data);

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Services</Title>
        <Desc>
          From web apps to android apps. 
        </Desc>
        <CardContainer>
          {sortedService.map((services, index) => (
            <ServiceCard
              key={index}
              services={services}
            />
            
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Service;
