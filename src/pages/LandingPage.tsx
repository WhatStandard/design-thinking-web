//import React from 'react';
import FullScreenBox from "@/components/FullScreenBox";
import { RedButton } from "@/components/RedButton";
import styled from 'styled-components';
import problemsImage from '../images/problems.png';
import problemsImage1 from '../images/problem1.png';
import problemsImage2 from '../images/problem2.png';
import './animation.css';

const Subject = styled.p`
  font-size: 3.4rem;
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
      <div style={{height: '3rem'}} />
      
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

      <div style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        animation: 'move-left 10s linear infinite',
        // backgroundColor: '#ff0000',
        // height: '30px'
      }}>
        {/* <img className='monsters-image' src={monsters} alt='예시 화면' />
        <img className='monsters-image-2' src={monsters} alt='예시 화면' /> */}
        <img style={{width: '200vw', minWidth: '200vw', position: 'relative', top: '15vw'}} src={problemsImage} />
      </div>
      
    </FullScreenBox>
  </>
}