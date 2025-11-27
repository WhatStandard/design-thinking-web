//import React from 'react';
import FullScreenBox from "@/components/FullScreenBox";
import { RedButton } from "@/components/RedButton";
import styled from 'styled-components';

const Subject = styled.p`
  font-size: 3.4rem;
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
  </>
}