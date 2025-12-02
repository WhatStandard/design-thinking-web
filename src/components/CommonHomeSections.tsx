import React, { useState, useEffect } from 'react';
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
  ThumbsUp,
  Edit3,
  Save,
  X,
  GripVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickTiles: React.FC = () => {
  /* 수정: 빠른 시작 카드 편집 모드 추가 */
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableTiles, setEditableTiles] = useState<any[]>([]);

  const defaultTiles = [
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

  /* 수정: localStorage에서 순서 불러오기 및 초기화 */
  useEffect(() => {
    const savedOrder = localStorage.getItem('quickTilesOrder');
    if (savedOrder) {
      try {
        const orderArray = JSON.parse(savedOrder);
        const reorderedTiles = orderArray.map((index: number) => defaultTiles[index]).filter(Boolean);
        setEditableTiles(reorderedTiles.length === defaultTiles.length ? reorderedTiles : defaultTiles);
      } catch {
        setEditableTiles(defaultTiles);
      }
    } else {
      setEditableTiles(defaultTiles);
    }
  }, []);

  /* 수정: 드래그앤드롭 기능으로 변경, 실시간 재정렬 효과 추가 */
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  /* 수정: 실시간 재정렬 효과를 위한 개선된 드래그 핸들러 */
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
      
      // 실시간 재정렬: 드래그 중에 임시로 순서 변경
      const newTiles = [...editableTiles];
      const draggedItem = newTiles[draggedIndex];
      
      newTiles.splice(draggedIndex, 1);
      newTiles.splice(index, 0, draggedItem);
      
      setEditableTiles(newTiles);
      setDraggedIndex(index); // 드래그된 인덱스 업데이트
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  /* 수정: 편집 모드 저장 */
  const saveOrder = () => {
    const orderArray = editableTiles.map(tile => defaultTiles.findIndex(dt => dt.title === tile.title));
    localStorage.setItem('quickTilesOrder', JSON.stringify(orderArray));
    setIsEditMode(false);
  };

  /* 수정: 편집 모드 취소 */
  const cancelEdit = () => {
    const savedOrder = localStorage.getItem('quickTilesOrder');
    if (savedOrder) {
      try {
        const orderArray = JSON.parse(savedOrder);
        const reorderedTiles = orderArray.map((index: number) => defaultTiles[index]).filter(Boolean);
        setEditableTiles(reorderedTiles.length === defaultTiles.length ? reorderedTiles : defaultTiles);
      } catch {
        setEditableTiles(defaultTiles);
      }
    } else {
      setEditableTiles(defaultTiles);
    }
    setIsEditMode(false);
  };

  const tiles = editableTiles.length > 0 ? editableTiles : defaultTiles;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        {/* 수정: 편집 링크 추가 */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">빠른 시작</h2>
            <p className="text-muted-foreground">원하는 기능을 바로 이용해보세요</p>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditMode ? (
              <button 
                onClick={() => setIsEditMode(true)}
                className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors underline text-sm"
              >
                <Edit3 className="h-4 w-4" />
                <span>편집</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={saveOrder}
                  className="flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>저장</span>
                </button>
                <button 
                  onClick={cancelEdit}
                  className="flex items-center space-x-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm"
                >
                  <X className="h-4 w-4" />
                  <span>취소</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tiles.map((tile, index) => (
            <Card 
              key={index} 
              className={`bg-card border-border card-hover group relative transition-all duration-200 ${
                isEditMode ? 'border-primary/50 cursor-move' : 'cursor-pointer'
              } ${
                draggedIndex === index ? 'opacity-50 scale-105 shadow-lg' : ''
              } ${
                dragOverIndex === index ? 'transform translate-y-1' : ''
              }`}
              draggable={isEditMode}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
            >
              {/* 수정: 드래그 핸들 스타일 개선 - 카드 배경색과 동일하게 */}
              {isEditMode && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="p-1 cursor-move opacity-60 hover:opacity-100 transition-opacity">
                    {/* 점 6개 (2x3) 드래그 핸들 */}
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
  /* 수정: 2025년 KBO 순위 데이터 반영 및 전체 순위 토글 기능 */
  const [showFullRankings, setShowFullRankings] = useState(false);
  
  /* 수정: 팀 로고 정보 추가 */
  const allRankings = [
    /* 수정: 업로드해주신 실제 공식 KBO 팀 로고 사용 */
    { rank: 1, team: 'LG 트윈스', wins: 85, losses: 56, draws: 3, winRate: 0.603, logo: '/images/LG.jpeg' },
    { rank: 2, team: '한화 이글스', wins: 83, losses: 57, draws: 4, winRate: 0.593, logo: '/images/hanwha.jpeg' },
    { rank: 3, team: 'SSG 랜더스', wins: 75, losses: 65, draws: 4, winRate: 0.536, logo: '/images/ssg.jpeg' },
    { rank: 4, team: '삼성 라이온즈', wins: 74, losses: 68, draws: 2, winRate: 0.521, logo: '/images/samsung.jpeg' },
    { rank: 5, team: 'NC 다이노스', wins: 71, losses: 67, draws: 6, winRate: 0.514, logo: '/images/nc.jpeg' },
    { rank: 6, team: 'kt wiz', wins: 71, losses: 68, draws: 5, winRate: 0.511, logo: '/images/kt.jpeg' },
    { rank: 7, team: '롯데 자이언츠', wins: 66, losses: 72, draws: 6, winRate: 0.478, logo: '/images/lotte.jpeg' },
    { rank: 8, team: 'KIA 타이거즈', wins: 65, losses: 75, draws: 4, winRate: 0.464, logo: '/images/kia.jpeg' },
    { rank: 9, team: '두산 베어스', wins: 61, losses: 77, draws: 6, winRate: 0.442, logo: '/images/doosan.jpeg' },
    { rank: 10, team: '키움 히어로즈', wins: 47, losses: 93, draws: 4, winRate: 0.336, logo: '/images/kiwoom.jpeg' }
  ];
  
  const displayedRankings = showFullRankings ? allRankings : allRankings.slice(0, 5);

  /* 수정: 실제 유튜브 야구 영상으로 교체 */
  const clips = [
    {
      title: 'KBO 역대 최고의 홈런 모음 (1982~2023)',
      duration: '8:45',
      views: '1.2M',
      thumbnail: '/images/youtube-thumbnail-homerun_20251130_144840.png',
      url: 'https://www.youtube.com/watch?v=Pjsc96S4WWo'
    },
    {
      title: '[삼성 vs 롯데] 야구 하이라이트│KBO 리그',
      duration: '5:18',
      views: '45K',
      thumbnail: '/images/youtube-thumbnail-highlights_20251130_144912.png',
      url: 'https://www.youtube.com/watch?v=cqnudMSlKN4'
    },
    {
      title: '2024 KBO 모먼트 TOP 10 - 최고 조회수',
      duration: '12:30',
      views: '890K',
      thumbnail: '/images/youtube-thumbnail-bestplay_20251130_144939.png',
      url: 'https://www.youtube.com/watch?v=b9IwJnycSos'
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
                {/* 수정: 하이픈 없이 A승 B패 C무 0.XXX(승률) 형식으로 표시 */}
                {displayedRankings.map((team) => (
                  <div 
                    key={team.rank}
                    className="flex items-center justify-between p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {team.rank}
                      </div>
                      {/* 수정: 팀 로고 추가 */}
                      <img 
                        src={team.logo} 
                        alt={`${team.team} 로고`}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="font-semibold text-foreground">{team.team}</div>
                    </div>
                    {/* 수정: 각 항목을 개별 span으로 분리하여 CSS 간격 제어 */}
                    <div className="text-sm text-muted-foreground text-right">
                      <div className="flex items-center gap-4">
                        <span className="min-w-[2.5rem]">{team.wins}승</span>
                        <span className="min-w-[2.5rem]">{team.losses}패</span>
                        <span className="min-w-[2rem]">{team.draws}무</span>
                        <span className="font-semibold text-foreground">{team.winRate.toFixed(3)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* 수정: 전체 순위 토글 버튼 */}
              <Button 
                variant="ghost" 
                className="w-full mt-4 text-primary hover:bg-primary/10"
                onClick={() => setShowFullRankings(!showFullRankings)}
              >
                {/* 수정: 버튼 텍스트 '접기'로 변경 */}
                {showFullRankings ? '접기' : '전체 순위 보기'}
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
                {/* 수정: 실제 유튜브 영상 링크와 썸네일 이미지 적용 */}
                {clips.map((clip, index) => (
                  <Link
                    key={index}
                    to={clip.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 bg-surface/50 rounded-lg hover:bg-surface transition-colors cursor-pointer group block"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                      <img 
                        src={clip.thumbnail} 
                        alt={clip.title}
                        className="w-full h-full object-cover"
                      />
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
                  </Link>
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
      /* 수정: 게시판 카테고리 변경 */
      category: '자유 게시판'
    },
    {
      title: '올 시즌 MVP 후보 누구라고 생각하시나요?',
      author: '트윈스팬',
      replies: 67,
      likes: 128,
      time: '4시간 전',
      category: '자유 게시판'
    },
    {
      title: '잠실야구장 직관 꿀팁 공유합니다',
      author: '직관러버',
      replies: 34,
      likes: 89,
      time: '6시간 전',
      category: '자유 게시판'
    },
    {
      title: '야구 초보인데 포지션별 역할 설명 부탁드려요',
      author: '야구입문자',
      replies: 18,
      likes: 32,
      time: '8시간 전',
      category: '질문/답변'
    },
    {
      title: '이번 주말 경기 같이 보실 분 계신가요?',
      author: '함께야구',
      replies: 12,
      likes: 25,
      time: '10시간 전',
      category: '같이 가요'
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