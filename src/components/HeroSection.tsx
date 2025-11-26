import React from 'react';
import { Calendar, Play, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HeroSection: React.FC = () => {
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
    <section className="relative bg-gradient-to-br from-background to-secondary/30 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-accent rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-destructive rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Hero Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                안녕하세요, <span className="text-primary">김야구</span>님!
                <br />
                오늘도 야구 한 입, <span className="text-accent">핵심만 쏙</span>.
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
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
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
                <div className="text-2xl font-bold text-accent">1,240</div>
                <div className="text-sm text-muted-foreground">누적 점수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">초급</div>
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