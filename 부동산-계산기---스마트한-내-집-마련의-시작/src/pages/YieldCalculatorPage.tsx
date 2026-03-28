import React from 'react';
import { Info, HelpCircle, Calculator, Percent } from 'lucide-react';
import { formatCurrency, cn } from '@/src/lib/utils';

export default function YieldCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = React.useState(500000000);
  const [deposit, setDeposit] = React.useState(50000000);
  const [monthlyRent, setMonthlyRent] = React.useState(1800000);
  const [loanAmount, setLoanAmount] = React.useState(200000000);
  const [loanRate, setLoanRate] = React.useState(4.5);
  const [expenses, setExpenses] = React.useState(100000); // Monthly maintenance, etc.

  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    const annualRent = (monthlyRent - expenses) * 12;
    const annualInterest = loanAmount * (loanRate / 100);
    const netAnnualIncome = annualRent - annualInterest;
    
    const investment = purchasePrice - deposit - loanAmount;
    const yieldRate = (netAnnualIncome / investment) * 100;

    setResult({
      investment,
      netAnnualIncome,
      yieldRate: yieldRate.toFixed(2),
      monthlyNet: Math.round(netAnnualIncome / 12)
    });
  };

  return (
    <div className="py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">부동산 수익률 계산기</h1>
        <p className="mt-2 text-slate-500">매매가와 임대 조건을 입력하여 실질적인 투자 수익률을 분석하세요.</p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">매매가 (원)</label>
                <input
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">임대 보증금 (원)</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">월 임대료 (원)</label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">월 기타 비용 (수선비 등)</label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">대출 금액 (원)</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">대출 금리 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full rounded-xl bg-orange-600 py-4 font-bold text-white shadow-lg hover:bg-orange-700 transition-colors"
            >
              수익률 계산하기
            </button>
          </div>

          {result && (
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-orange-900">분석 결과</h2>
                <div className="rounded-full bg-orange-600 px-4 py-1 text-sm font-bold text-white">
                  수익률 {result.yieldRate}%
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">실투자금 (내 돈)</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{formatCurrency(result.investment)}</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">월 순수익 (이자 제외)</p>
                  <p className="mt-1 text-xl font-bold text-orange-600">{formatCurrency(result.monthlyNet)}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-orange-200 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">연간 총 임대료</span>
                  <span className="font-semibold">{formatCurrency(monthlyRent * 12)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">연간 총 대출 이자</span>
                  <span className="font-semibold text-red-500">-{formatCurrency(loanAmount * (loanRate / 100))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">연간 순수익</span>
                  <span className="font-bold text-slate-900">{formatCurrency(result.netAnnualIncome)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold text-slate-900">
              <Percent className="h-5 w-5 text-orange-500" />
              수익률 계산 공식
            </h3>
            <div className="mt-4 space-y-2 text-xs text-slate-500 leading-relaxed">
              <p>• 수익률 = (연간 순수익 / 실투자금) × 100</p>
              <p>• 연간 순수익 = (월세 - 비용) × 12 - 대출이자</p>
              <p>• 실투자금 = 매매가 - 보증금 - 대출금</p>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">투자 체크리스트</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>□ 공실률 5% 가정하기</li>
              <li>□ 취득세 및 복비 포함 여부</li>
              <li>□ 재산세 및 종부세 고려</li>
              <li>□ 주변 임대 시세 변화 확인</li>
            </ul>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none rounded-2xl border bg-white p-8 shadow-sm">
        <h2>성공적인 부동산 투자를 위한 수익률 분석 가이드</h2>
        <p>
          부동산 투자의 핵심은 '수익률'입니다. 하지만 많은 초보 투자자들이 단순히 '월세가 얼마 나온다'는 사실에만 집중하여 
          실질적인 비용과 리스크를 간과하곤 합니다. 정확한 수익률 계산은 투자의 성패를 가르는 첫걸음입니다.
        </p>

        <h3>1. 표면 수익률 vs 실질 수익률</h3>
        <p>
          표면 수익률은 대출을 고려하지 않고 매매가 대비 임대료만 계산한 것입니다. 
          반면 실질 수익률(자기자본 수익률, ROE)은 대출 이자와 각종 경비를 제외하고 실제 내 돈이 들어간 금액 대비 수익을 계산한 것입니다. 
          레버리지(대출)를 활용하면 수익률이 극대화될 수 있지만, 금리 인상 시 역레버리지 효과로 손실이 발생할 수도 있습니다.
        </p>

        <h3>2. 수익률에 영향을 미치는 숨은 비용들</h3>
        <p>
          계산기에 입력하는 월세 외에도 고려해야 할 비용이 많습니다:
          <ul>
            <li><strong>공실 리스크:</strong> 1년 중 한 달만 공실이 생겨도 연 수익률은 약 8% 하락합니다.</li>
            <li><strong>유지 보수비:</strong> 도배, 장판, 누수 수리 등 임대인이 부담해야 할 수선비가 발생합니다.</li>
            <li><strong>세금:</strong> 보유세(재산세, 종부세)와 임대소득세를 반드시 계산에 포함해야 합니다.</li>
          </ul>
        </p>

        <h3>3. 지역별 적정 수익률 기준</h3>
        <p>
          일반적으로 서울 강남권 아파트는 시세 차익 기대감이 높아 임대 수익률이 2~3%대로 낮은 편입니다. 
          반면 지방이나 수도권 외곽의 상가, 오피스텔은 시세 차익보다는 월세 수익이 목적이므로 5~7% 이상의 수익률을 기대하는 것이 보통입니다.
        </p>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <HelpCircle className="h-6 w-6 text-orange-500" />
            자주 묻는 질문 (FAQ)
          </h3>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-bold text-slate-800">Q1. 대출을 많이 받을수록 수익률이 좋아지나요?</h4>
              <p className="mt-2 text-slate-600">대출 금리가 임대 수익률보다 낮다면 대출을 많이 받을수록 수익률이 올라가는 '레버리지 효과'가 나타납니다. 하지만 금리가 오르면 이자 부담이 커져 오히려 마이너스 수익률이 될 수 있으므로 주의해야 합니다.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Q2. 상가 투자의 적정 수익률은 얼마인가요?</h4>
              <p className="mt-2 text-slate-600">상가는 아파트보다 리스크가 크기 때문에 보통 연 5% 이상의 수익률을 기준으로 삼습니다. 최근에는 금리 상승으로 인해 6% 이상을 요구하는 투자자들이 많아졌습니다.</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
