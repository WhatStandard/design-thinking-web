import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Play, 
  MessageSquare, 
  Trophy,
  Clock,
  MapPin,
  Tv,
  Ticket,
  TrendingUp,
  Eye,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

const QuickTiles: React.FC = () => {
  const tiles = [
    {
      icon: BookOpen,
      title: '규칙',
      description: '야구 기초부터 고급 전략까지',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Users,
      title: '팀·선수 DB',
      description: 'KBO 리그 완전 데이터베이스',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Calendar,
      title: '일정·티켓',
      description: '경기 일정과 예매 정보',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Play,
      title: '클립/쇼츠',
      description: '하이라이트와 명장면 모음',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: MessageSquare,
      title: '커뮤니티',
      description: '팬들과 함께하는 소통 공간',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">빠른 시작</h2>
          <p className="text-muted-foreground">원하는 기능을 바로 이용해보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tiles.map((tile, index) => (
            <Card key={index} className="bg-card border-border card-hover cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl ${tile.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <tile.icon className={`h-6 w-6 ${tile.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{tile.title}</h3>
                <p className="text-sm text-muted-foreground">{tile.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const WeeklySchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('월');
  
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
  
  const scheduleData = {
    '월': [
      { time: '18:30', home: 'LG', away: '롯데', stadium: '잠실', broadcast: 'KBS', ticket: '예매중' },
      { time: '18:30', home: 'KIA', away: 'NC', stadium: '광주', broadcast: 'MBC', ticket: '매진' }
    ],
    '화': [
      { time: '18:30', home: '두산', away: 'SSG', stadium: '잠실', broadcast: 'SBS', ticket: '예매중' },
      { time: '18:30', home: '삼성', away: 'KT', stadium: '대구', broadcast: 'SPOTV', ticket: '예매중' }
    ],
    '수': [
      { time: '18:30', home: '한화', away: 'LG', stadium: '대전', broadcast: 'KBS', ticket: '오픈예정' }
    ],
    '목': [],
    '금': [
      { time: '18:30', home: 'KIA', away: '두산', stadium: '광주', broadcast: 'MBC', ticket: '예매중' }
    ],
    '토': [
      { time: '14:00', home: 'LG', away: 'NC', stadium: '잠실', broadcast: 'SBS', ticket: '예매중' },
      { time: '17:00', home: 'SSG', away: '삼성', stadium: '인천', broadcast: 'SPOTV', ticket: '예매중' }
    ],
    '일': [
      { time: '14:00', home: '롯데', away: 'KT', stadium: '부산', broadcast: 'KBS', ticket: '예매중' }
    ]
  };

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">이번 주 경기 일정</h2>
          <p className="text-muted-foreground">원하는 날짜를 선택해서 경기 정보를 확인하세요</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(day)}
                  className={selectedDay === day ? "bg-primary text-primary-foreground" : ""}
                >
                  {day}요일
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            {scheduleData[selectedDay as keyof typeof scheduleData].length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>이날은 경기가 없습니다</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scheduleData[selectedDay as keyof typeof scheduleData].map((game, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-surface/50 rounded-lg hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {game.time}
                      </div>
                      <div className="font-semibold text-foreground">
                        {game.home} vs {game.away}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {game.stadium}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Tv className="mr-1 h-4 w-4" />
                        {game.broadcast}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          game.ticket === '매진' ? 'destructive' : 
                          game.ticket === '예매중' ? 'default' : 'secondary'
                        }
                      >
                        {game.ticket}
                      </Badge>
                      {game.ticket === '예매중' && (
                        <Button size="sm" variant="outline">
                          <Ticket className="mr-1 h-3 w-3" />
                          예매
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const RankingsAndClips: React.FC = () => {
  const rankings = [
    { rank: 1, team: 'KIA', wins: 87, losses: 58, winRate: '.600' },
    { rank: 2, team: 'LG', wins: 85, losses: 60, winRate: '.585' },
    { rank: 3, team: 'SSG', wins: 81, losses: 64, winRate: '.557' },
    { rank: 4, team: '두산', wins: 77, losses: 67, winRate: '.534' },
    { rank: 5, team: '삼성', wins: 75, losses: 70, winRate: '.517' }
  ];

  const clips = [
    {
      title: '[쇼츠] 오늘의 수비 하이라이트',
      duration: '0:45',
      views: '12K',
      thumbnail: '🛡️'
    },
    {
      title: '150km 직구 모음',
      duration: '1:23',
      views: '8.5K',
      thumbnail: '⚡'
    },
    {
      title: '역전 홈런 베스트',
      duration: '2:15',
      views: '25K',
      thumbnail: '⚾'
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Rankings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-primary" />
                KBO 순위
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rankings.map((team) => (
                  <div 
                    key={team.rank}
                    className="flex items-center justify-between p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {team.rank}
                      </div>
                      <div className="font-semibold text-foreground">{team.team}</div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{team.wins}승</span>
                      <span>{team.losses}패</span>
                      <span className="font-semibold text-foreground">{team.winRate}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-primary hover:bg-primary/10">
                전체 순위 보기
              </Button>
            </CardContent>
          </Card>

          {/* Clips */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="mr-2 h-5 w-5 text-red-500" />
                실시간 클립
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clips.map((clip, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors cursor-pointer group"
                  >
                    <div className="w-16 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                      {clip.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {clip.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {clip.duration}
                        </Badge>
                        <div className="flex items-center">
                          <Eye className="mr-1 h-3 w-3" />
                          {clip.views}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-primary hover:bg-primary/10">
                더 많은 클립 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const CommunityHotTopics: React.FC = () => {
  const hotTopics = [
    {
      title: 'LG vs 롯데 경기 예상 라인업 분석해보실 분?',
      author: '야구매니아',
      replies: 23,
      likes: 45,
      time: '2시간 전',
      category: '경기분석'
    },
    {
      title: '올 시즌 MVP 후보 누구라고 생각하시나요?',
      author: '트윈스팬',
      replies: 67,
      likes: 128,
      time: '4시간 전',
      category: '선수토론'
    },
    {
      title: '잠실야구장 직관 꿀팁 공유합니다',
      author: '직관러버',
      replies: 34,
      likes: 89,
      time: '6시간 전',
      category: '직관후기'
    },
    {
      title: '야구 초보인데 포지션별 역할 설명 부탁드려요',
      author: '야구입문자',
      replies: 18,
      likes: 32,
      time: '8시간 전',
      category: '질문답변'
    },
    {
      title: '이번 주말 경기 같이 보실 분 계신가요?',
      author: '함께야구',
      replies: 12,
      likes: 25,
      time: '10시간 전',
      category: '모임'
    }
  ];

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-orange-500" />
                커뮤니티 핫토픽
              </div>
              <Badge className="bg-orange-500/10 text-orange-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                실시간
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotTopics.map((topic, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between p-4 bg-surface/50 rounded-lg hover:bg-surface transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {topic.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{topic.time}</span>
                    </div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                      {topic.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>by {topic.author}</span>
                      <div className="flex items-center">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        {topic.replies}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="mr-1 h-3 w-3" />
                        {topic.likes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-primary hover:bg-primary/10">
              커뮤니티 더 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const CommonHomeSections: React.FC = () => {
  return (
    <>
      <QuickTiles />
      <WeeklySchedule />
      <RankingsAndClips />
      <CommunityHotTopics />
    </>
  );
};

export default CommonHomeSections;