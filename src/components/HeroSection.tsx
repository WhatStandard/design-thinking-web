import React from 'react';
import { Calendar, Play, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const todayGames = [
    {
      teams: '두산 vs SSG',
      stadium: '잠실',
      time: '18:30',
      status: '생중계',
      statusType: 'live' as const
    },
    {
      teams: 'KIA vs NC',
      stadium: '광주',
      time: '18:30',
      status: '예매중',
      statusType: 'ticket' as const
    },
    {
      teams: 'LG vs 롯데',
      stadium: '잠실',
      time: '18:30',
      status: '티켓오픈',
      statusType: 'ticket' as const
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-background to-secondary/30 py-16">
      {/* 수정: 장식용 동그라미 3개 삭제 - 레이아웃 여백 자연스럽게 보정 */}
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Hero Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                안녕하세요, <span className="text-primary">조명아</span>님!
                <br />
                {/* 수정: '핵심만 쏙.' → '핵심만 쏙!' 변경 및 느낌표 색상 맞춤 */}
                오늘도 야구 한 입, <span className="text-accent">핵심만 쏙<span className="text-accent">!</span></span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                내 팀 일정과 퀴즈 진행 상황을 확인하고, 추천 클립으로 빠르게 따라잡으세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Calendar className="mr-2 h-5 w-5" />
                오늘 경기 보기
              </Button>
              {/* [수정] 퀴즈 이어서 풀기 버튼을 퀴즈 페이지로 연결 */}
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => navigate('/quiz') }
              >
                <Play className="mr-2 h-5 w-5" />
                퀴즈 이어서 풀기
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">6일</div>
                <div className="text-sm text-muted-foreground">연속 학습</div>
              </div>
              <div className="text-center">
                {/* 수정: 누적 점수 1,240 → 2,111로 변경 */}
                <div className="text-2xl font-bold text-accent">2,111</div>
                <div className="text-sm text-muted-foreground">누적 점수</div>
              </div>
              <div className="text-center">
                {/* [edit] 현재 레벨 '삐약삐약' → '삐약삐약'으로 수정 - 완전히 수정 */}
                <div className="text-2xl font-bold text-foreground" title="현재 레벨: 삐약삐약" aria-label="현재 레벨 삐약삐약">삐약삐약</div>
                <div className="text-sm text-muted-foreground">현재 레벨</div>
              </div>
            </div>
          </div>

          {/* Today's Games Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-surface border-2 border-secondary shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Trophy className="mr-2 h-5 w-5 text-primary" />
                    오늘의 주요 경기
                  </h3>
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    {todayGames.length}경기
                  </Badge>
                </div>

                <div className="space-y-3">
                  {todayGames.map((game, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">
                          {game.teams}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          {game.stadium} · {game.time}
                        </div>
                      </div>
                      <Badge 
                        variant={game.statusType === 'live' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {game.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-primary hover:bg-primary/10"
                >
                  전체 일정 보기
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;