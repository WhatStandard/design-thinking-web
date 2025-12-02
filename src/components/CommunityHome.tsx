import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from './Header';
import Footer from './Footer';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Menu,
  ChevronDown
} from 'lucide-react';

// COMMUNITY HOME – 변경 지점: 탭 데이터 정의
const TAB_DATA = {
  notice: '공지사항',
  hot: '핫게시판', 
  free: '자유 게시판',
  market: '사요/팔아요',
  mate: '같이 가요',
  qna: '질문/답변',
  'my-posts': '내가 쓴 글',
  'my-comments': '댓글 단 글',
  scrap: '스크랩'
};

// [edit] 공지사항 등록일 연도 수정 - 모든 항목 2025로, 최상단만 2026으로 변경
const NOTICE_DATA = [
  {
    id: 1,
    title: '2026 시즌 커뮤니티 이용 안내',
    author: '관리자',
    views: 1234,
    date: '2026-12-01',
    isNotice: true
  },
  {
    id: 2,
    title: '커뮤니티 운영 정책 변경 안내',
    author: '관리자',
    views: 856,
    date: '2025-11-28',
    isNotice: true
  },
  {
    id: 3,
    title: '야구 시즌 종료에 따른 서비스 안내',
    author: '관리자',
    views: 2103,
    date: '2025-11-25',
    isNotice: true
  },
  {
    id: 4,
    title: '개인정보 처리방침 개정 안내',
    author: '관리자',
    views: 445,
    date: '2025-11-20',
    isNotice: true
  },
  {
    id: 5,
    title: 'First 1nning 서비스 오픈 안내',
    author: '관리자',
    views: 3567,
    date: '2025-11-15',
    isNotice: true
  }
];

const CommunityHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('notice');
  const [searchCategory, setSearchCategory] = useState<string>('title');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // COMMUNITY HOME – 변경 지점: URL 해시 처리
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && TAB_DATA[hash as keyof typeof TAB_DATA]) {
      setActiveTab(hash);
    }
  }, []);

  // COMMUNITY HOME – 변경 지점: 탭 전환 함수
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // COMMUNITY HOME – 변경 지점: 검색 처리
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    console.log(`검색: ${searchTerm}, 카테고리: ${searchCategory}, 게시판: ${activeTab}`);
    alert(`"${searchTerm}" 검색 기능은 준비 중입니다.`);
  };

  // COMMUNITY HOME – 변경 지점: 페이지네이션 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // COMMUNITY HOME – 변경 지점: 게시판 내용 렌더링
  const renderBoardContent = () => {
    if (activeTab === 'notice') {
      return (
        <div className="space-y-0">
          {NOTICE_DATA.map((post) => (
            <div 
              key={post.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border hover:bg-secondary/20 transition-colors cursor-pointer"
            >
              <div className="col-span-6 text-left">
                {post.isNotice && (
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded mr-2">
                    공지
                  </span>
                )}
                <span className="text-foreground hover:text-primary transition-colors">
                  {post.title}
                </span>
              </div>
              <div className="col-span-2 text-center text-muted-foreground text-sm">
                {post.author}
              </div>
              <div className="col-span-2 text-center text-muted-foreground text-sm">
                {post.views.toLocaleString()}
              </div>
              <div className="col-span-2 text-center text-muted-foreground text-sm">
                {post.date}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-12 text-muted-foreground">
        {TAB_DATA[activeTab as keyof typeof TAB_DATA]} 준비 중입니다.
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 전역 헤더 */}
      <Header />
      {/* COMMUNITY HOME – 변경 지점: 커뮤니티 전용 미니 헤더 */}
      <nav className="bg-surface border-b border-border shadow-sm" aria-label="Community secondary navigation">
        <div className="container mx-auto px-6">
          {/* 첫 번째 줄: 주요 게시판 */}
          <div className="flex items-center justify-start space-x-8 py-3 border-b border-border/50">
            {['notice', 'hot', 'free', 'market', 'mate', 'qna'].map((tabId) => (
              <button
                key={tabId}
                onClick={() => handleTabChange(tabId)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 relative ${
                  activeTab === tabId
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary/30'
                }`}
                aria-current={activeTab === tabId ? 'page' : undefined}
              >
                {TAB_DATA[tabId as keyof typeof TAB_DATA]}
                {activeTab === tabId && (
                  <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
          
          {/* 두 번째 줄: 개인 메뉴 */}
          <div className="flex items-center justify-start space-x-8 py-3">
            {['my-posts', 'my-comments', 'scrap'].map((tabId) => (
              <button
                key={tabId}
                onClick={() => handleTabChange(tabId)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 relative ${
                  activeTab === tabId
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary/30'
                }`}
                aria-current={activeTab === tabId ? 'page' : undefined}
              >
                {TAB_DATA[tabId as keyof typeof TAB_DATA]}
                {activeTab === tabId && (
                  <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* COMMUNITY HOME – 변경 지점: 검색 및 필터 영역 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-foreground">
            {TAB_DATA[activeTab as keyof typeof TAB_DATA]}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* 카테고리 선택 */}
            <select 
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="author">작성자</option>
              <option value="title-content">제목+내용</option>
            </select>
            
            {/* 검색 입력 */}
            <div className="relative">
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full sm:w-64 pr-12"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* COMMUNITY HOME – 변경 지점: 게시판 테이블 */}
        <Card className="overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/30 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-6 text-left">제목</div>
            <div className="col-span-2 text-center hidden sm:block">닉네임</div>
            <div className="col-span-2 text-center">조회</div>
            <div className="col-span-2 text-center">등록일</div>
          </div>
          
          {/* 테이블 내용 */}
          <div className="min-h-[400px]">
            {renderBoardContent()}
          </div>
        </Card>

        {/* [EDIT] 페이지네이션 1페이지만 노출 - 2,3 제거 */}
        <div className="flex items-center justify-center mt-8">
          <nav className="flex items-center space-x-2" aria-label="페이지네이션">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={true}
              className="p-2 opacity-50 cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="px-3 py-2 bg-primary text-primary-foreground"
            >
              1
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={true}
              className="p-2 opacity-50 cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </main>
      
      {/* 전역 푸터 */}
      <Footer />
    </div>
  );
};

export default CommunityHome;