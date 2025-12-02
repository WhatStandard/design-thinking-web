import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

// [수정] KBO 팀 리스트 페이지 - kbo list.png 구성에 맞춘 10개 현존 구단
const KBOTeamsPage: React.FC = () => {
  // 현존 10개 KBO 구단 정보 (현대, 쌍방울 제외)
  const kboTeams = [
    {
      id: 'kia',
      name: 'KIA 타이거즈',
      logo: '/images/kia.jpeg',
      /* [edit] KIA 우승 횟수 11회 → 12회로 업데이트 */
      description: '1982년 창단한 광주·전남 연고팀. 12회 우승의 명문구단.',
      summary: '창단 1982년 | 우승 12회 | 광주-기아 챔피언스 필드',
      website: 'https://tigers.co.kr/',
      backgroundColor: '#EA1E2C'
    },
    {
      id: 'lg',
      name: 'LG 트윈스',
      logo: '/images/LG.jpeg',
      /* [edit] LG 우승 횟수 2회 → 4회로 업데이트 */
      description: '1982년 창단한 서울 잠실 연고팀. 쌍둥이 마스코트로 유명.',
      summary: '창단 1982년 | 우승 4회 | 서울 잠실야구장',
      website: 'https://lgtwins.com/web/topc',
      backgroundColor: '#C30452'
    },
    {
      id: 'samsung',
      name: '삼성 라이온즈',
      logo: '/images/samsung.jpeg',
      description: '1982년 창단한 대구·경북 연고팀. 8회 우승의 강호.',
      summary: '창단 1982년 | 우승 8회 | 대구 삼성라이온즈파크',
      website: 'https://www.samsunglions.com/',
      backgroundColor: '#074CA1'
    },
    {
      id: 'doosan',
      name: '두산 베어스',
      logo: '/images/doosan.jpeg',
      description: '1982년 창단한 서울 잠실 연고팀. 6회 우승의 전통 강팀.',
      summary: '창단 1982년 | 우승 6회 | 서울 잠실야구장',
      website: 'https://www.doosanbears.com/',
      backgroundColor: '#131230'
    },
    {
      id: 'kt',
      name: 'KT 위즈',
      logo: '/images/kt.jpeg',
      description: '2015년 창단한 수원 연고팀. KBO 리그 최신 구단.',
      /* [edit] KT 우승 횟수 0회 → 1회로 업데이트 */
      summary: '창단 2015년 | 우승 1회 | 수원 KT위즈파크',
      website: 'https://www.ktwiz.co.kr/',
      backgroundColor: '#000000'
    },
    {
      id: 'ssg',
      name: 'SSG 랜더스',
      logo: '/images/ssg.jpeg',
      description: '1982년 창단한 인천 연고팀. 2021년 SSG로 새 출발.',
      /* [edit] SSG 우승 횟수 1회 → 5회로 업데이트 */
      summary: '창단 1982년 | 우승 5회 | 인천 SSG랜더스필드',
      website: 'https://www.ssglanders.com/',
      backgroundColor: '#CE0E2D'
    },
    {
      id: 'lotte',
      name: '롯데 자이언츠',
      logo: '/images/lotte.jpeg',
      description: '1982년 창단한 부산·울산·경남 연고팀. 갈매기 군단.',
      summary: '창단 1982년 | 우승 2회 | 부산 사직야구장',
      website: 'https://www.giantsclub.com',
      backgroundColor: '#041E42'
    },
    {
      id: 'hanwha',
      name: '한화 이글스',
      logo: '/images/hanwha.jpeg',
      description: '1986년 창단한 대전 연고팀. 독수리 마스코트의 구단.',
      summary: '창단 1986년 | 우승 1회 | 대전 한화생명이글스파크',
      website: 'https://www.hanwhaeagles.co.kr/',
      backgroundColor: '#FF6600'
    },
    {
      id: 'nc',
      name: 'NC 다이노스',
      logo: '/images/nc.jpeg',
      description: '2013년 창단한 창원 연고팀. 공룡을 상징하는 신생 강호.',
      /* [edit] NC 우승 횟수 0회 → 1회로 업데이트 */
      summary: '창단 2013년 | 우승 1회 | 창원 NC파크',
      website: 'https://www.ncdinos.com/',
      backgroundColor: '#315288'
    },
    {
      id: 'kiwoom',
      name: '키움 히어로즈',
      logo: '/images/kiwoom.jpeg',
      description: '2008년 창단한 서울 고척 연고팀. 영웅들의 구단.',
      summary: '창단 2008년 | 우승 0회 | 서울 고척스카이돔',
      website: 'https://www.heroesbaseball.co.kr/',
      backgroundColor: '#570514'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 전역 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-8">
        {/* [수정] 페이지 제목 - kbo list.png와 유사한 스타일 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">KBO 팀 리스트</h1>
          <div className="w-20 h-1 bg-primary rounded-full mb-4"></div>
          <p className="text-lg text-muted-foreground">
            한국프로야구 10개 구단의 정보를 확인하고 공식 홈페이지를 방문해보세요.
          </p>
        </div>

        {/* [수정] KBO 팀 카드 리스트 - kbo list.png의 가로형 카드 구성 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {kboTeams.map((team) => (
            <Card 
              key={team.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/50"
            >
              {/* [수정] 클릭 시 팀 공식 홈페이지로 새 창에서 열기 */}
              <a 
                href={team.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <CardContent className="p-0">
                  {/* 팀 색상 헤더 */}
                  <div 
                    className="h-2 w-full"
                    style={{ backgroundColor: team.backgroundColor }}
                  ></div>
                  
                  {/* 카드 내용 */}
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* [수정] 좌측 팀 로고 - 48-64px 범위 반응형 */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-lg p-2 shadow-sm border border-border flex items-center justify-center">
                          <img 
                            src={team.logo}
                            alt={`${team.name} 로고`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      {/* [수정] 우측 팀 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {team.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {team.description}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium">
                              {team.summary}
                            </p>
                          </div>
                          
                          {/* 외부 링크 아이콘 */}
                          <div className="flex-shrink-0 ml-4">
                            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>

        {/* 추가 정보 섹션 */}
        <div className="mt-12 p-6 bg-secondary/30 rounded-lg">
          <h2 className="text-xl font-bold text-foreground mb-4">KBO 리그 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10</div>
              <div className="text-sm text-muted-foreground">참가 구단</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1982</div>
              <div className="text-sm text-muted-foreground">리그 출범</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">144</div>
              <div className="text-sm text-muted-foreground">정규시즌 경기수</div>
            </div>
          </div>
        </div>
      </main>

      {/* 전역 푸터 */}
      <Footer />
    </div>
  );
};

export default KBOTeamsPage;