//import React from 'react';
import FullScreenBox from "@/components/FullScreenBox";
import { RedButton } from "@/components/RedButton";
import styled from 'styled-components';
import problemsImage from '../images/problems.png';
import problemsImage1 from '../images/problem1.png';
import problemsImage2 from '../images/problem2.png';
import './animation.css';
import ticketImage from '../images/ticketing.png';
import matchingImage from '../images/matching1.png';
import matchingFoundImage from '../images/matchingfound.png';

const Subject = styled.p`
  font-size: 4.2rem;
  line-height: 5.0rem;
  em {
    font-weight: bold;
    font-style: normal;
  }
`;

const Title = styled.p`
  font-size: 2.7rem;
  em {
    font-weight: bold;
    font-style: normal;
  }
`;

const ImageBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  animation: move-left 8s linear infinite;

  position: relative;
  top: 7vh;

  &:hover {
    animation-play-state: paused;
  }
`;

export default function LandingPage() {
  return <>
    <FullScreenBox style={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'center',
      padding: '10%',
      alignItems: 'flex-start',
      backgroundColor: '#F1EDEB',
    }}>
      <Subject>프로젝트 한줄 설명,</Subject>
      <Subject><em>설명설명</em>설명설명.</Subject>
      <div style={{ height: '3rem' }} />
      <RedButton>시작하기</RedButton>
      <div style={{height: '2.5rem'}} />
      
    </FullScreenBox>

    <FullScreenBox style={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'start',
      padding: 0,
      alignItems: 'flex-start',
      backgroundColor: '#F1EDEB',
      position: 'relative',
    }}>
      <div style={{
        padding: '100px'
      }}>
        <Title>모두가 쉽게 배울 수 있도록,</Title>
        <Title><em>개인 맞춤형 퀴즈</em>.</Title>
      </div>

      <ImageBox>
        {/* <img className='monsters-image' src={monsters} alt='예시 화면' />
        <img className='monsters-image-2' src={monsters} alt='예시 화면' /> */}

        <img style={{width: '200vw', minWidth: '200vw'}} src={problemsImage} />
      </ImageBox>
      
    </FullScreenBox>

    <FullScreenBox style={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'start',
      padding: 0,
      alignItems: 'flex-start',
      backgroundColor: '#F1EDEB',
      position: 'relative',
    }}>
      <div style={{
        padding: '100px'
      }}>
        <Title>티케팅이 처음인 당신을 위한</Title>
        <Title><em>모의 티케팅</em>.</Title>
      </div>

      <img style={{height: '65vh', width: '100vw', objectFit: 'contain'}} src={ticketImage} />
      
    </FullScreenBox>

    <FullScreenBox style={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'start',
      padding: 0,
      alignItems: 'flex-start',
      backgroundColor: '#F1EDEB',
      position: 'relative',
    }}>
      <div style={{
        padding: '100px'
      }}>
        <Title>혼자라도 두렵지 않다,</Title>
        <Title><em>경기 직관 매칭 서비스</em>.</Title>
      </div>

        <img style={{
          position: 'absolute',
          right: '40vw',
          top: '40vh',
          bottom: '10vh',
          height: '50vh',
          maxWidth: 'none',
        }} src={matchingImage} />
        <img style={{
          position: 'absolute', 
          right: '5vw',
          top: '10vh',
          bottom: '10vh',
          height: '80vh',
        }} src={matchingFoundImage} />
      
    </FullScreenBox>

    <FullScreenBox style={{
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'start',
      padding: 0,
      alignItems: 'flex-start',
      backgroundColor: '#F1EDEB',
      position: 'relative',
    }}>
      <div style={{
        padding: '100px'
      }}>
        <Title><em>퍼스트이닝</em>을 사랑하는</Title>
        <Title>다양한 사용자들의 의견.</Title>
      </div>

        <img style={{
          position: 'absolute',
          right: '40vw',
          top: '40vh',
          bottom: '10vh',
          height: '50vh',
          maxWidth: 'none',
        }} src={matchingImage} />
        <img style={{
          position: 'absolute', 
          right: '5vw',
          top: '10vh',
          bottom: '10vh',
          height: '80vh',
        }} src={matchingFoundImage} />
      
    </FullScreenBox>
  </>
}