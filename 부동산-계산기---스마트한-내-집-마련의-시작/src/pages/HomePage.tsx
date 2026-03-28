import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Home, TrendingUp, CreditCard, ArrowRight, Star, History } from 'lucide-react';
import { formatCurrency, cn } from '@/src/lib/utils';

export default function HomePage() {
  const [history, setHistory] = React.useState<any[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('calc_history');
    if (saved) setHistory(JSON.parse(saved).slice(0, 5));
  }, []);

  const calculators = [
    {
      title: '취득세 계산기',
      desc: '부동산 매수 시 발생하는 취득세, 지방교육세, 농어촌특별세를 계산합니다.',
      path: '/acquisition-tax',
      icon: Calculator,
      color: 'bg-blue-500',
    },
    {
      title: '전세 vs 월세 비교',
      desc: '전세 대출 이자와 월세를 비교하여 어떤 것이 더 유리한지 분석합니다.',
      path: '/rent-comparison',
      icon: Home,
      color: 'bg-emerald-500',
    },
    {
      title: '수익률 계산기',
      desc: '매매가 대비 임대 수익률 및 투자 가치를 정밀하게 분석합니다.',
      path: '/yield-calculator',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: '대출 이자 계산기',
      desc: '원리금균등, 원금균등 등 상환 방식에 따른 이자를 계산합니다.',
      path: '/loan-calculator',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          복잡한 부동산 계산, <br className="sm:hidden" />
          <span className="text-blue-600">한 번에 해결하세요</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          최신 세법과 금리를 반영한 정확한 계산기입니다. 
          내 집 마련부터 투자 수익률 분석까지 스마트하게 시작하세요.
        </p>
      </section>

      {/* Grid Section */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {calculators.map((calc) => (
          <Link
            key={calc.path}
            to={calc.path}
            className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className={cn("inline-flex rounded-xl p-3 text-white", calc.color)}>
              <calc.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">{calc.title}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {calc.desc}
            </p>
            <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
              계산하기 <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>

      {/* Recent History & Favorites */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <History className="h-5 w-5 text-blue-500" />
              최근 계산 기록
            </h2>
            <button className="text-sm text-slate-400 hover:text-slate-600">전체 삭제</button>
          </div>
          <div className="mt-6 space-y-4">
            {history.length > 0 ? (
              history.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.date}</p>
                  </div>
                  <Link to={item.path} className="text-sm font-medium text-blue-600">보기</Link>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400">
                아직 계산 기록이 없습니다.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Star className="h-5 w-5 text-yellow-500" />
            즐겨찾는 계산기
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {['아파트 취득세', '오피스텔 수익률', '버팀목 전세대출'].map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-800">💡 팁: 자주 사용하는 계산 결과를 저장하여 나중에 다시 확인할 수 있습니다.</p>
          </div>
        </section>
      </div>

      {/* Middle Ad Slot */}
      <div className="flex h-40 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-100 text-slate-400">
        광고 영역 (중단)
      </div>

      {/* SEO Content Section */}
      <section className="prose prose-slate max-w-none rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">부동산 계산기가 필요한 이유</h2>
        <p>
          부동산 거래는 인생에서 가장 큰 경제적 결정 중 하나입니다. 단순히 매매가만 고려하는 것이 아니라, 
          취득세, 중개보수, 대출 이자, 그리고 보유 시 발생하는 각종 세금까지 꼼꼼하게 따져봐야 합니다. 
          저희 부동산계산기.com은 사용자가 복잡한 수식 없이도 정확한 데이터를 기반으로 의사결정을 내릴 수 있도록 돕습니다.
        </p>
        <h3 className="text-xl font-semibold mt-6">취득세 계산의 중요성</h3>
        <p>
          주택 수, 지역(조정대상지역 여부), 면적에 따라 취득세율은 1%에서 최대 12%까지 차이가 납니다. 
          예를 들어 10억 원짜리 아파트를 살 때, 1주택자는 약 3,300만 원의 세금을 내지만, 다주택자는 1억 원 이상의 세금을 낼 수도 있습니다. 
          이러한 비용을 미리 계산하지 않으면 자금 계획에 큰 차질이 생길 수 있습니다.
        </p>
        <h3 className="text-xl font-semibold mt-6">전세 vs 월세, 무엇이 유리할까?</h3>
        <p>
          최근 금리 인상으로 인해 전세 대출 이자가 월세보다 높아지는 현상이 발생하기도 했습니다. 
          단순히 '전세가 무조건 좋다'는 고정관념에서 벗어나, 현재 금리와 본인의 자금 상황을 대입하여 
          실질적인 월 주거 비용을 비교해 보는 것이 현명합니다.
        </p>
      </section>
    </div>
  );
}
