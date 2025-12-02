import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from './Header';
import Footer from './Footer';

// [EDIT] Quiz page component - quiz.png 레이아웃에 맞춘 퀴즈 페이지 구현
const QuizPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('규칙 퀴즈');

  // 퀴즈 카테고리 데이터
  const quizCategories = [
    '규칙 퀴즈',
    '역사 퀴즈', 
    '선수 퀴즈',
    '직접 판정!'
  ];

  // 카테고리별 정보
  const categoryInfo = {
    '규칙 퀴즈': {
      title: '규칙 퀴즈',
      subtitle: '기본 규칙',
      description: '야구의 기본 규칙을 배우고 테스트해보세요'
    },
    '역사 퀴즈': {
      title: '역사 퀴즈', 
      subtitle: '야구 역사',
      description: '한국 야구의 역사와 전설을 알아보세요'
    },
    '선수 퀴즈': {
      title: '선수 퀴즈',
      subtitle: '선수 정보',
      description: '현역 선수들과 레전드들에 대해 알아보세요'
    },
    '직접 판정!': {
      title: '직접 판정!',
      subtitle: '실전 판정',
      description: '실제 경기 상황에서 직접 판정해보세요'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 전역 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-8">
        {/* [EDIT] 페이지 제목 - quiz.png와 동일한 스타일 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">퀴즈</h1>
          <div className="w-16 h-1 bg-primary rounded-full"></div>
        </div>

        {/* [EDIT] 메인 레이아웃 - 좌측 사이드바 + 우측 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 좌측 사이드바 - 퀴즈 카테고리 */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <nav className="space-y-2">
                {quizCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* 우측 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              {/* 콘텐츠 헤더 */}
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {categoryInfo[activeCategory as keyof typeof categoryInfo].title}
                </h2>
                <p className="text-primary font-medium">
                  {categoryInfo[activeCategory as keyof typeof categoryInfo].subtitle}
                </p>
              </div>

              {/* [EDIT] quiz.png 완벽 재현 - chicken.png 캐릭터 사용 */}
              <div className="p-8">
                {/* quiz.png와 동일한 녹색 배경 섹션 */}
                <div 
                  className="rounded-lg p-16 text-center relative"
                  style={{ 
                    backgroundColor: '#7CB342',
                    minHeight: '400px'
                  }}
                >
                  
                  {/* [수정] chicken.png 캐릭터 크기 확대 - 데스크톱 max-width 360-420px, 모바일 반응형 */}
                  <div className="relative z-10 mb-12">
                    <div className="flex justify-center">
                      <img 
                        src="/images/chicken.png" 
                        alt="퀴즈 마스코트 캐릭터 - 빨간 야구모자와 선글라스를 착용한 노란색 병아리" 
                        className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 max-w-sm object-contain drop-shadow-2xl"
                        style={{ maxWidth: '420px' }}
                      />
                    </div>
                  </div>

                  {/* [EDIT] START 버튼 - quiz.png와 동일한 스타일 */}
                  <div className="relative z-10">
                    <Button
                      size="lg"
                      className="text-white font-bold px-20 py-5 text-2xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-200"
                      style={{ 
                        backgroundColor: '#8B4513',
                        border: 'none',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#7A3F12';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#8B4513';
                      }}
                    >
                      START
                    </Button>
                  </div>
                </div>

                {/* 추가 정보 섹션 */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">10</div>
                    <div className="text-sm text-muted-foreground">문제 수</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-accent mb-2">5분</div>
                    <div className="text-sm text-muted-foreground">예상 시간</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">초급</div>
                    <div className="text-sm text-muted-foreground">난이도</div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 최근 퀴즈 결과 섹션 */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">최근 퀴즈 결과</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: '규칙 퀴즈', score: 85, date: '2024-12-01' },
              { category: '선수 퀴즈', score: 92, date: '2024-11-28' },
              { category: '역사 퀴즈', score: 78, date: '2024-11-25' }
            ].map((result, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{result.category}</h4>
                  <span className={`text-lg font-bold ${
                    result.score >= 90 ? 'text-green-600' : 
                    result.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.score}점
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{result.date}</p>
                <div className="mt-3 w-full bg-secondary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      result.score >= 90 ? 'bg-green-600' : 
                      result.score >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* 전역 푸터 */}
      <Footer />
    </div>
  );
};

export default QuizPage;