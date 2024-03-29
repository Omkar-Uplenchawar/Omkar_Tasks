import React from "react";
import HeroBgAnimation from "../HeroBgAnimation";
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
  TextEx,
  TextData
} from "./HeroStyle";
import Typewriter from "typewriter-effect";
import { useRecoilValueLoadable } from "recoil";
import { fetchUserData } from "../../assets/recoilState";

const HeroSection = () => {
  const userDataLoadable = useRecoilValueLoadable(fetchUserData);
  if (userDataLoadable.state === "loading") {
    return <p>Loading...</p>;
  }
  if (userDataLoadable.state === "hasError") {
    return <p>Error fetching user data. Please try again later.</p>;
  }

  const data = userDataLoadable.contents.about;

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              Hi, I am <br /> {data.name}
            </Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: data.title,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{data.description}</SubTitle>
            <TextEx>
              <TextData>{data.exp_year}+ Years Experience</TextData>
              <TextData>{data.some_total}+ Projects</TextData>
            </TextEx>
            <ResumeButton target="display">Check Resume</ResumeButton>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={data.avatar.url} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
