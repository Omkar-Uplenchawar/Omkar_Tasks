import React from "react";
import styled from "styled-components";
import { useRecoilValueLoadable } from "recoil";
import { fetchUserData } from "../../assets/recoilState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center; 
  padding-bottom: 100px
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;
const SkillPer = styled.div`
  padding-left: 12px;
`;

const Skills = () => {
  const userDataLoadable = useRecoilValueLoadable(fetchUserData);
  if (userDataLoadable.state === "loading") {
    return <p>Loading...</p>;
  }
  if (userDataLoadable.state === "hasError") {
    return <p>Error fetching user data. Please try again later.</p>;
  }

  const data = userDataLoadable.contents.skills;
  const enabledSkills = data.filter(skill => skill.enabled);
  const sortedSkills = [...enabledSkills].sort((a, b) => a.sequence - b.sequence);
  return (
    <Container id="skills">
      <Wrapper>
        <Title>PROFESSIONAL SKILLS</Title>
        <Desc>Here are some of my skills on which I have been working on.</Desc>
        <SkillsContainer>
          {sortedSkills.map((item, index) => ( 
            <SkillItem key={index}>
              <SkillImage src={item.image.url} />
              {item.name}
              <SkillPer>{item.percentage}%</SkillPer>
            </SkillItem>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
