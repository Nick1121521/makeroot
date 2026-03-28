import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Home, TrendingUp, CreditCard, Menu, X, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: '홈', path: '/', icon: Home },
    { name: '취득세', path: '/acquisition-tax', icon: Calculator },
    { name: '전세vs월세', path: '/rent-comparison', icon: Calculator },
    { name: '수익률', path: '/yield-calculator', icon: TrendingUp },
    { name: '대출이자', path: '/loan-calculator', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Calculator className="h-6 w-6" />
            <span>부동산계산기.com</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === item.path ? "text-blue-600" : "text-slate-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 text-slate-600 hover:bg-slate-100">
              <Star className="h-5 w-5" />
            </button>
            <button 
              className="md:hidden rounded-full p-2 text-slate-600 hover:bg-slate-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 md:hidden">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 border-b py-4 text-lg font-medium text-slate-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 text-blue-500" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Top Ad Slot */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-100 text-slate-400">
          광고 영역 (상단)
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-20">
        {children}
      </main>

      {/* Bottom Ad Slot */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-100 text-slate-400">
          광고 영역 (하단)
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">부동산계산기.com</h3>
              <p className="mt-2 text-sm text-slate-500">
                정확하고 빠른 부동산 계산 서비스를 제공합니다. 취득세, 양도세, 대출 이자 등 복잡한 계산을 한 번에 해결하세요.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">계산기 바로가기</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                <li><Link to="/acquisition-tax">취득세 계산기</Link></li>
                <li><Link to="/rent-comparison">전세 vs 월세 비교</Link></li>
                <li><Link to="/yield-calculator">수익률 계산기</Link></li>
                <li><Link to="/loan-calculator">대출 이자 계산기</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">고객 지원</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                <li>자주 묻는 질문</li>
                <li>전문가 상담 신청</li>
                <li>제휴 문의</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-xs text-slate-400">
            © 2026 부동산계산기.com. All rights reserved. 본 서비스의 계산 결과는 참고용이며 실제와 다를 수 있습니다.
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
          <TrendingUp className="h-5 w-5" />
          전문가 상담 연결
        </button>
      </div>
    </div>
  );
}
