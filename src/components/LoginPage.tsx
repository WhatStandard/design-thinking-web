import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';

// [edit] 로그인 페이지 - login.png 참고한 심플한 로그인 카드
const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // [edit] 프론트엔드 로그인 검증 - swcon/swcon만 허용
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'swcon' && password === 'swcon') {
      // [edit] 로그인 성공 시 메인 페이지로 이동
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('nickname', '조명아');
      //window.location.href = '/';
      navigate('/');
    } else {
      // 로그인 실패
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* [edit] 로그인 페이지용 제한된 헤더 */}
      <Header isLoginPage={true} />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-center min-h-[60vh]">
          {/* [edit] login.png 참고한 심플한 로그인 카드 */}
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">
                로그인
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* 아이디 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    아이디
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                {/* 비밀번호 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    비밀번호
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                {/* 에러 메시지 */}
                {error && (
                  <div className="text-sm text-destructive text-center">
                    {error}
                  </div>
                )}

                {/* 로그인 버튼 */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
                >
                  로그인
                </Button>
              </form>

              {/* [edit] 하단 링크들 - login.png와 동일한 구성 */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <Link to="/" className="hover:text-primary transition-colors">
                    아이디 찾기
                  </Link>
                  <span>·</span>
                  <Link to="/" className="hover:text-primary transition-colors">
                    비밀번호 찾기
                  </Link>
                  <span>·</span>
                  <Link to="/" className="hover:text-primary transition-colors">
                    회원가입
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 전역 푸터 */}
      <Footer />
    </div>
  );
};

export default LoginPage;