import React from "react";
import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
} from "./TestimonalStyle";
import ProjectCard from "../Cards/ProjectCards";
import { useRecoilValueLoadable } from "recoil";
import { fetchUserData } from "../../assets/recoilState";
import TestimonailCard from "../Cards/TestimonialCard";

const Testimonal = () => {
  const userDataLoadable = useRecoilValueLoadable(fetchUserData);
  if (userDataLoadable.state === "loading") {
    return <p>Loading...</p>;
  }
  if (userDataLoadable.state === "hasError") {
    return <p>Error fetching user data. Please try again later.</p>;
  }

  const data = userDataLoadable.contents.testimonials;
  const enabledTestimonial = data.filter((service) => service.enabled);
  const sortedTestimonial = [...enabledTestimonial].sort(
    (a, b) => a.sequence - b.sequence
  );
  //console.log(data);

  return (
    <Container id="testimonial">
      <Wrapper>
        <Title>Testimonials</Title>
        <Desc>
          What My Customers Say 
        </Desc>
        <CardContainer>
          {sortedTestimonial.map((testimonial, index) => (
            <TestimonailCard
              key={index}
              testimonial={testimonial}
            />
            
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Testimonal;
