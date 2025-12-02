import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, X, ChevronDown, LogOut, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, useNavigate } from 'react-router-dom';

interface MegaMenuData {
  [key: string]: string[];
}

// [edit] 로그인 페이지 제한 기능을 위한 인터페이스
interface HeaderProps {
  isLoginPage?: boolean;
}

/* 수정: '마이' 메뉴 데이터에서 제거 */
/* [edit] 규칙 세부 카테고리 새롭게 5개 버튼으로 구성 */
const megaMenuData: MegaMenuData = {
  '규칙': ['기본/필수', '공격&주루', '투수&수비', '판정·특수 상황', '용어사전'],
  /* [수정] '올타임 레전드' 제거 및 자연스러운 재정렬 */
  '팀·선수': ['KBO 팀 리스트', '선수 랭킹', '드래프트/신인', '스탯 리더보드'],
  '일정·티켓': ['경기 일정/결과', '티케팅 매뉴얼/팁', '모의 티케팅', '매칭 서비스'],
  /* 수정: '클립' 메뉴 제거 */
  '커뮤니티': ['게시판 홈', '건의사항', '클립'],
  '퀴즈': ['레벨(초급/중급/고급)', '오늘의 퀴즈', '연속 학습(스트릭)', '랭킹']
};

/* 수정: 고정 위치 가로형 메가 메뉴로 변경 - 다른 헤더 영역을 가려도 됨 */
const MegaMenu: React.FC<{ title: string; items: string[]; isOpen: boolean }> = ({ title, items, isOpen }) => (
  <div className={`mega-menu fixed top-[4.5rem] left-0 w-full bg-surface border-b border-border shadow-2xl z-[100] ${isOpen ? 'open' : ''}`}>
    <div className="container mx-auto px-6 py-6">
      <div className="bg-card rounded-lg p-6 border border-border shadow-lg">
        <h3 className="font-bold text-primary text-lg mb-4 border-b border-border pb-2">{title}</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index}>
              {/* [수정] KBO 팀 리스트 클릭 시 새 페이지로 이동 */}
              <Link
                to={
                  item === '게시판 홈' ? '/community' : 
                  item === 'KBO 팀 리스트' ? '/kbo-teams' : '/'
                } 
                className="block p-3 rounded-lg bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm font-medium group-hover:shadow-md"
              >
                {item}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileMenu: React.FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="lg:hidden hover:bg-secondary/50">
        <Menu className="h-5 w-5 text-foreground" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-80 bg-card">
      <div className="flex flex-col space-y-6 mt-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground">김</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">조명아님</p>
            <p className="text-sm text-muted-foreground">LG 트윈스 팬</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(megaMenuData).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-1 pl-4">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

/* 수정: 프로필 팝오버 컴포넌트 추가 */
const ProfilePopover: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={popoverRef}
      className="absolute top-full right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-xl z-50 p-4"
    >
      <div className="space-y-4">
        {/* 사용자 정보 */}
        <div className="flex items-center space-x-3 pb-3 border-b border-border">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">김</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">조명아님</h3>
            <p className="text-sm text-muted-foreground">LG 트윈스 팬</p>
          </div>
        </div>

        {/* 랭킹 및 점수 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">랭킹</span>
            </div>
            {/* [edit] 랭킹 #127 → #2002로 수정 */}
            <span className="text-sm font-bold text-primary">#2002</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-primary" />
              {/* 수정: '퀴즈 점수' → '누적 점수'로 변경 */}
              <span className="text-sm font-medium">누적 점수</span>
            </div>
            {/* 수정: 점수 1,240 → 2,111로 변경 */}
            <span className="text-sm font-bold text-accent">2,111점</span>
          </div>
          {/* [edit] 현재 레벨 추가 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">현재 레벨</span>
            </div>
            {/* [edit] 프로필 팝오버 현재 레벨 '삐약삐약' → '삐약삐약'으로 수정 - 완전히 수정 */}
            <span className="text-sm font-bold text-secondary" title="현재 레벨: 삐약삐약" aria-label="현재 레벨 삐약삐약">삐약삐약</span>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button 
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
          onClick={() => {
            // [edit] 로그아웃 기능 구현
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('nickname');
            onClose();
            navigate('/login');
          }}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">로그아웃</span>
        </button>
      </div>
    </div>
  );
};

// [edit] 로그인 페이지 제한 기능 추가
const Header: React.FC<HeaderProps> = ({ isLoginPage = false }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const navigate = useNavigate();
  
  /* 수정: hover 방식 제거, 클릭 토글 방식으로 변경 */
  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  /* 수정: 외부 클릭 및 ESC 키로 메가메뉴 닫기 */
  const handleClickOutside = () => {
    setActiveMenu(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveMenu(null);
    }
  };

  React.useEffect(() => {
    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu]);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90 border-b-2 border-primary shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            {/* 수정: 로고 클릭 시 홈으로 이동하도록 링크 연결 */}
            {/* 수정: 사이트 이름 "BASEBALLGO"에서 "First 1inning"으로 변경 */}
            {/* 수정: 사이트 이름 "First 1nning"으로 변경 및 글자 크기 증가 */}
            {/* [edit] 로그인 페이지에서 로고 클릭 시 새로고침 */}
            <Link
              to={isLoginPage ? "/login" : "/"} 
              className="text-3xl font-bold text-primary hover:text-red-2 transition-colors"
              onClick={isLoginPage ? (e) => { e.preventDefault(); window.location.reload(); } : undefined}
            >
              First 1nning
            </Link>
            
            {/* Desktop Navigation */}
            {/* [edit] 네비게이션 메뉴 블록 전체를 더 오른쪽으로 이동 */}
            <nav className="hidden lg:flex items-center space-x-1 ml-40 header-nav">
              {/* 수정: '홈'과 '마이' 메뉴 제거 */}
              {/* 수정: '클립' 메뉴 제거 */}
              {['규칙', '팀·선수', '일정·티켓', '커뮤니티'].map((item) => (
                // 수정: hover 제거, 클릭 토글 방식으로 변경
                <div
                  key={item}
                  className="relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    // [edit] 로그인 페이지에서 제한된 메뉴 동작
                    if (isLoginPage && (item === '일정·티켓' || item === '커뮤니티')) {
                      window.location.reload();
                      return;
                    }
                    if (megaMenuData[item]) {
                      handleMenuClick(item);
                    }
                  }}
                >
                  <button
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-200 font-medium whitespace-nowrap ${
                      activeMenu === item ? 'bg-secondary/50 text-primary' : ''
                    }`}
                  >
                    <span>{item}</span>
                    {megaMenuData[item] && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        activeMenu === item ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {megaMenuData[item] && (
                    <MegaMenu
                      title={item}
                      items={megaMenuData[item]}
                      isOpen={activeMenu === item}
                    />
                  )}
                </div>
              ))}
              
              {/* [edit] 퀴즈 메뉴에 로그인 페이지 제한 추가 */}
              <Link
                to={isLoginPage ? "" : "/quiz"}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-200 font-medium whitespace-nowrap"
                onClick={isLoginPage ? (e) => { e.preventDefault(); window.location.reload(); } : undefined}
              >
                <span>퀴즈</span>
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="팀/선수/경기 검색"
                  className="pl-10 w-56 bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary/50">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {/* 수정: 프로필 아바타 클릭 시 팝오버 열리고 이름 텍스트 삭제 */}
            <div className="hidden md:flex items-center relative">
              {/* [edit] 비로그인 상태에서 아바타 클릭 시 로그인 페이지로 이동 */}
              <button 
                onClick={() => {
                  if (isLoginPage) {
                    window.location.reload();
                  } else {
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    if (isLoggedIn) {
                      setProfilePopoverOpen(!profilePopoverOpen);
                    } else {
                      navigate('/login');
                    }
                  }
                }}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">김</AvatarFallback>
                </Avatar>
              </button>
              
              <ProfilePopover 
                isOpen={profilePopoverOpen} 
                onClose={() => setProfilePopoverOpen(false)} 
              />
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;