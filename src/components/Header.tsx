import React, { useState } from 'react';
import { Search, Bell, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MegaMenuData {
  [key: string]: string[];
}

const megaMenuData: MegaMenuData = {
  '규칙': ['기초룰', '포지션', '득점/아웃', '용어사전', '심판 제스처', '초보 가이드'],
  '팀·선수': ['KBO 팀 리스트', '선수 랭킹', '올타임 레전드', '드래프트/신인', '스탯 리더보드'],
  '일정·티켓': ['주간 일정', '구장별 일정', '예매 팁', '좌석 배치', '모의 티케팅'],
  '클립': ['오늘의 하이라이트', '수비 명장면', '홈런 모음', '1분 쇼츠'],
  '커뮤니티': ['핫토픽', '질문/답변', '직관 후기', '매너 가이드'],
  '퀴즈': ['레벨(초급/중급/고급)', '오늘의 퀴즈', '연속 학습(스트릭)', '랭킹'],
  '마이': ['내 대시보드', '내 팀 설정', '알림', '설정', '로그아웃']
};

const MegaMenu: React.FC<{ title: string; items: string[]; isOpen: boolean }> = ({ title, items, isOpen }) => (
  <div className={`mega-menu absolute top-full left-0 w-full bg-surface border border-border shadow-xl z-50 ${isOpen ? 'open' : ''}`}>
    <div className="container mx-auto px-8 py-6">
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-bold text-primary text-lg mb-4 border-b border-border pb-2">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {items.map((item, index) => (
            <div key={index}>
              <a 
                href="#" 
                className="block p-3 rounded-lg bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm font-medium group-hover:shadow-md"
              >
                {item}
              </a>
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
            <p className="font-medium">김야구님</p>
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
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {item}
                    </a>
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

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuHover = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90 border-b-2 border-primary shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="/" className="text-2xl font-bold text-primary">
              BASEBALLGO
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {['홈', '규칙', '팀·선수', '일정·티켓', '클립', '커뮤니티', '퀴즈', '마이'].map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => handleMenuHover(item)}
                  onMouseLeave={handleMenuLeave}
                >
                  <a
                    href="#"
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-200 font-medium whitespace-nowrap"
                  >
                    <span>{item}</span>
                    {megaMenuData[item] && <ChevronDown className="h-4 w-4" />}
                  </a>
                  
                  {megaMenuData[item] && (
                    <MegaMenu
                      title={item}
                      items={megaMenuData[item]}
                      isOpen={activeMenu === item}
                    />
                  )}
                </div>
              ))}
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

            {/* Profile */}
            <div className="hidden md:flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">김</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">김야구님</p>
              </div>
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