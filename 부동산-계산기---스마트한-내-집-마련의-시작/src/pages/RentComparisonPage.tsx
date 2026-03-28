import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Info, HelpCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency, cn } from '@/src/lib/utils';

export default function RentComparisonPage() {
  const [jeonseDeposit, setJeonseDeposit] = React.useState(300000000);
  const [loanRate, setLoanRate] = React.useState(4.5);
  const [loanAmount, setLoanAmount] = React.useState(240000000);
  
  const [monthlyDeposit, setMonthlyDeposit] = React.useState(50000000);
  const [monthlyRent, setMonthlyRent] = React.useState(1200000);

  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    const jeonseInterest = (loanAmount * (loanRate / 100)) / 12;
    const jeonseOpportunityCost = ((jeonseDeposit - loanAmount) * 0.03) / 12; // 3% savings rate
    const totalJeonseCost = jeonseInterest + jeonseOpportunityCost;

    const monthlyOpportunityCost = (monthlyDeposit * 0.03) / 12;
    const totalMonthlyCost = monthlyRent + monthlyOpportunityCost;

    setResult({
      jeonse: Math.round(totalJeonseCost),
      monthly: Math.round(totalMonthlyCost),
      diff: Math.abs(Math.round(totalJeonseCost - totalMonthlyCost)),
      winner: totalJeonseCost < totalMonthlyCost ? '전세' : '월세'
    });
  };

  const chartData = result ? [
    { name: '전세 (이자+기회비용)', value: result.jeonse },
    { name: '월세 (임대료+기회비용)', value: result.monthly },
  ] : [];

  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">전세 vs 월세 비교 계산기</h1>
        <p className="mt-2 text-slate-500">대출 이자와 월세를 비교하여 가장 경제적인 주거 방식을 찾아보세요.</p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Jeonse Inputs */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" /> 전세 조건
              </h2>
              <div>
                <label className="text-sm font-medium text-slate-600">전세 보증금</label>
                <input
                  type="number"
                  value={jeonseDeposit}
                  onChange={(e) => setJeonseDeposit(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">대출 금액</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">대출 금리 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Monthly Inputs */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> 월세 조건
              </h2>
              <div>
                <label className="text-sm font-medium text-slate-600">월세 보증금</label>
                <input
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">월세액</label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg hover:bg-slate-800 transition-colors"
          >
            비교 분석하기
          </button>

          {result && (
            <div className="rounded-2xl border bg-white p-8 shadow-sm space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  한 달에 <span className="text-blue-600">{formatCurrency(result.diff)}</span> 더 저렴한 
                  <span className={cn("ml-2 px-3 py-1 rounded-lg text-white", result.winner === '전세' ? 'bg-blue-600' : 'bg-emerald-600')}>
                    {result.winner}
                  </span>가 유리합니다!
                </h2>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value/10000}만`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm text-blue-600 font-medium">전세 월 비용</p>
                  <p className="text-xl font-bold text-blue-900">{formatCurrency(result.jeonse)}</p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm text-emerald-600 font-medium">월세 월 비용</p>
                  <p className="text-xl font-bold text-emerald-900">{formatCurrency(result.monthly)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold text-slate-900">
              <Info className="h-5 w-5 text-blue-500" />
              비교 기준 안내
            </h3>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              본 계산기는 전세 대출 이자와 월세액뿐만 아니라, 보증금으로 인해 발생하는 <strong>기회비용(연 3% 예금 금리 가정)</strong>을 포함하여 계산합니다. 
              실제 주거 비용을 더 정확하게 파악할 수 있습니다.
            </p>
          </div>
          
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">최근 금리 동향</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">시중은행 전세자금대출</span>
                <span className="font-semibold text-blue-600">3.8% ~ 4.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">한국은행 기준금리</span>
                <span className="font-semibold">3.50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none rounded-2xl border bg-white p-8 shadow-sm">
        <h2>전세 vs 월세, 2026년 주거 전략 가이드</h2>
        <p>
          주거 형태를 결정할 때 가장 큰 고민은 '전세가 나을까, 월세가 나을까?'입니다. 
          과거에는 전세가 무조건 유리하다는 인식이 강했지만, 금리 변동성이 커진 현재는 철저한 계산이 필요합니다.
        </p>

        <h3>1. 전세의 경제성 분석</h3>
        <p>
          전세의 주거 비용은 크게 두 가지로 나뉩니다. 첫째는 전세 자금 대출에 대한 이자 비용이고, 
          둘째는 내 돈(자기자본)이 묶임으로써 발생하는 기회비용입니다. 
          예를 들어 3억 원의 전세 보증금 중 2억 원을 대출받았다면, 2억 원에 대한 이자와 나머지 1억 원을 예금했을 때 받을 수 있는 이자를 합산한 것이 실제 월 비용입니다.
        </p>

        <h3>2. 월세의 경제성 분석</h3>
        <p>
          월세는 매달 지불하는 임대료가 주된 비용입니다. 하지만 월세 역시 보증금이 존재하므로, 
          해당 보증금에 대한 기회비용을 합산해야 전세와 공정한 비교가 가능합니다. 
          최근에는 전세 사기 우려로 인해 보증금을 낮추고 월세를 높이는 '반전세' 형태도 인기를 끌고 있습니다.
        </p>

        <h3>3. 금리에 따른 선택 기준</h3>
        <p>
          일반적으로 <strong>전세 대출 금리 &lt; 전월세 전환율</strong>인 경우 전세가 유리하고, 
          반대의 경우 월세가 유리합니다. 전월세 전환율이란 전세를 월세로 바꿀 때 적용하는 비율로, 지역마다 차이가 있습니다.
        </p>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <HelpCircle className="h-6 w-6 text-blue-500" />
            자주 묻는 질문 (FAQ)
          </h3>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-bold text-slate-800">Q1. 전세 대출 이자는 소득공제가 되나요?</h4>
              <p className="mt-2 text-slate-600">네, 무주택 세대주가 국민주택규모(85㎡) 이하 주택의 전세 자금을 대출받은 경우, 원리금 상환액의 40%까지(연 400만 원 한도) 소득공제 혜택을 받을 수 있습니다.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Q2. 월세 세액공제 조건은 무엇인가요?</h4>
              <p className="mt-2 text-slate-600">총급여 7,000만 원 이하 무주택 세대주가 시가 4억 원 이하 주택에 거주하며 월세를 내는 경우, 월세액의 최대 17%까지 세액공제를 받을 수 있습니다.</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
