//import React from 'react';
import styled from 'styled-components';
import defaultProfile from '../images/defaultprofile.jpg'

type ContainerProps = {
  slim?: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 1.8rem;
  border-radius: 1.5rem;

  gap: 1rem;
  font-size: 1.3rem;

  background-color: #ffffff;

  height: ${({slim}) => slim ? '200px' : '370px'};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;

  align-items: center;
  font-size: 1.6rem;
`

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
`;

type Props = {
  profileImage?: string,
  name: string,
  content: string,
  slim?: boolean
}

export default function UserThinking({profileImage, name, content, slim}: Props) {
  const image = profileImage || defaultProfile;

  return <Container slim={slim}>
    <ProfileContainer>
      <Image src={image} />
      {name}
    </ProfileContainer>
    {content}
  </Container>
}