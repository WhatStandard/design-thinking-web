import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Ticket, 
  Play, 
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { icon: BookOpen, label: '초보 가이드', href: '#' },
    { icon: Ticket, label: '티케팅 매뉴얼', href: '#' },
    { icon: Play, label: '모의 티케팅', href: '#' },
    { icon: HelpCircle, label: '퀴즈 시작', href: '#' }
  ];

  const serviceLinks = [
    { label: '서비스 소개', href: '#' },
    { label: '이용약관', href: '#' },
    { label: '개인정보처리방침', href: '#' },
    { label: '문의하기', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' }
  ];

  return (
    <footer className="bg-secondary/30 border-t-2 border-primary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-2">BASEBALLGO</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                야구 입문자를 위한 완벽한 가이드.<br />
                규칙부터 티케팅까지, 야구의 모든 것을 쉽고 재미있게 배워보세요.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="mr-2 h-4 w-4" />
                contact@baseballgo.kr
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                1588-0000
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                서울시 강남구 테헤란로 123
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">빠른 이동</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                  asChild
                >
                  <a href={link.href} className="flex items-center">
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">서비스 정보</h4>
            <div className="space-y-3">
              {serviceLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto text-muted-foreground hover:text-primary"
                  asChild
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">소셜 미디어</h4>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">뉴스레터 구독</p>
              <p className="text-xs text-muted-foreground">
                야구 소식과 팁을 이메일로 받아보세요
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  구독
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 BASEBALLGO. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for Baseball Fans</span>
            <div className="flex items-center space-x-2">
              <span>Powered by</span>
              <span className="font-semibold text-primary">KBO League</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              BASEBALLGO는 야구 입문자를 위한 교육 및 정보 제공 서비스입니다. 
              KBO 리그와의 공식적인 제휴 관계는 없으며, 모든 팀 로고 및 선수 정보는 교육 목적으로만 사용됩니다.
            </p>
            <p>
              티켓 예매는 각 구단 공식 홈페이지 또는 공인 예매처를 통해 진행해주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;