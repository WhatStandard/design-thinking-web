import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  Star,
  Play,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';

const MyTeamCard: React.FC = () => {
  /* 수정: 2025년 KBO 데이터와 동기화, 공식 스타일 팀 로고로 업데이트 */
  const myTeamData = {
    name: 'LG 트윈스',
    shortName: 'LG',
    rank: 1,
    wins: 85,
    losses: 56,
    draws: 3,
    winRate: 0.603,
    /* 수정: 업로드해주신 실제 LG 트윈스 공식 로고 사용 */
    logo: '/images/LG.jpeg'
  };
  
  const recentGames = [
    { result: 'W', score: '7-3' },
    { result: 'L', score: '2-5' },
    { result: 'W', score: '8-4' },
    { result: 'W', score: '6-2' },
    { result: 'L', score: '1-3' }
  ];

  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          내 팀
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          {/* 수정: 원형 이니셜 배지 제거, 팀 로고로 교체 */}
          <img 
            src={myTeamData.logo} 
            alt={`${myTeamData.name} 로고`}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="font-semibold text-foreground">{myTeamData.name}</h3>
            {/* 수정: 하이픈 없이 A승 B패 C무 0.XXX 형식으로 표시 */}
            <p className="text-sm text-muted-foreground">
              {myTeamData.rank}위 · {myTeamData.wins}승 {myTeamData.losses}패 {myTeamData.draws}무 {myTeamData.winRate.toFixed(3)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">최근 5경기</span>
            <div className="flex space-x-1">
              {recentGames.map((game, index) => (
                <Badge 
                  key={index}
                  variant={game.result === 'W' ? 'default' : 'secondary'}
                  className={`text-xs px-2 py-1 ${
                    game.result === 'W' 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {game.result}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-3 bg-surface rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">다음 경기</span>
              <Badge className="bg-primary text-primary-foreground text-xs">티켓오픈</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                오늘 18:30 vs 롯데 (잠실)
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          티켓 보기
        </Button>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">팀 뉴스</p>
          <a href="#" className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2">
            LG 트윈스, 시즌 마지막 홈경기에서 팬들과 특별한 만남
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const QuizProgressCard: React.FC = () => {
  const streakDays = 6;
  /* 수정: 누적 점수 1,240 → 2,111로 변경 */
  const currentScore = 2111;
  const currentLevel = '초급';
  const progressPercent = 75;

  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Target className="mr-2 h-5 w-5 text-accent" />
          퀴즈 & 학습 진행
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">{streakDays}</div>
            <div className="text-xs text-muted-foreground">연속일</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{currentScore.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">누적점수</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{currentLevel}</div>
            <div className="text-xs text-muted-foreground">현재레벨</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">레벨 진행도</span>
            <span className="text-sm font-medium text-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">중급까지 25% 남음</p>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-accent/10 rounded-lg">
          <Zap className="h-4 w-4 text-accent" />
          <span className="text-sm text-foreground font-medium">
            {streakDays}일 연속 학습 중! 🔥
          </span>
        </div>

        {/* [수정] 오늘의 퀴즈 시작 버튼을 퀴즈 페이지로 연결 */}
        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={() => window.location.href = '/#/quiz'}
        >
          <Play className="mr-2 h-4 w-4" />
          오늘의 퀴즈 시작
        </Button>
      </CardContent>
    </Card>
  );
};

const RecommendationCard: React.FC = () => {
  const recommendations = [
    {
      title: '야구 기초 룰 완전정복',
      description: '스트라이크, 볼, 아웃의 기본 개념부터',
      tag: '초보가이드',
      icon: BookOpen,
      readTime: '5분'
    },
    {
      title: 'KBO 팀별 특징 알아보기',
      description: '각 구단의 역사와 대표 선수들',
      tag: '팀정보',
      icon: Users,
      readTime: '8분'
    },
    {
      title: '직관 매너와 응원 문화',
      description: '야구장에서 지켜야 할 에티켓',
      tag: '직관팁',
      icon: Star,
      readTime: '3분'
    }
  ];

  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          맞춤 추천
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((item, index) => (
          <div 
            key={index}
            className="p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors cursor-pointer group"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.tag}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {item.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 mt-4">
          더 많은 추천 보기
        </Button>
      </CardContent>
    </Card>
  );
};

const MyFeedCard: React.FC = () => {
  const feedItems = [
    {
      type: 'clip',
      title: '[쇼츠] 오늘의 수비 하이라이트',
      time: '2시간 전',
      views: '1.2K',
      thumbnail: '🎬'
    },
    {
      type: 'post',
      title: 'LG vs 롯데 경기 예상 라인업 분석',
      time: '4시간 전',
      views: '856',
      thumbnail: '📝'
    },
    {
      type: 'clip',
      title: '역전 홈런 베스트 모음',
      time: '6시간 전',
      views: '2.1K',
      thumbnail: '⚾'
    }
  ];

  return (
    <Card className="bg-card border-border card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Star className="mr-2 h-5 w-5 text-accent" />
          내 피드
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {feedItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface/50 transition-colors cursor-pointer"
          >
            <div className="text-2xl">{item.thumbnail}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <span>{item.time}</span>
                <span>•</span>
                <span>조회 {item.views}</span>
              </div>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 mt-4">
          피드 더 보기
        </Button>
      </CardContent>
    </Card>
  );
};

const PersonalDashboard: React.FC = () => {
  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* 수정: 학습 안내 문구 추가 */}
        <div className="mb-6">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-accent">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">오늘은 아직 학습하지 않았습니다</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">오늘의 퀴즈를 시작해보세요!</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">개인 대시보드</h2>
          <p className="text-muted-foreground">나만의 야구 여정을 한눈에 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MyTeamCard />
          <QuizProgressCard />
          <RecommendationCard />
          <MyFeedCard />
        </div>
      </div>
    </section>
  );
};

export default PersonalDashboard;