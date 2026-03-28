import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, HelpCircle, CreditCard, Calendar } from 'lucide-react';
import { formatCurrency, formatNumber, cn } from '@/src/lib/utils';

export default function LoanCalculatorPage() {
  const [amount, setAmount] = React.useState(300000000);
  const [rate, setRate] = React.useState(4.2);
  const [term, setTerm] = React.useState(30); // years
  const [method, setMethod] = React.useState<'equal-principal-interest' | 'equal-principal'>('equal-principal-interest');

  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    let schedule = [];
    let totalInterest = 0;
    let balance = amount;

    if (method === 'equal-principal-interest') {
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      
      for (let i = 1; i <= months; i++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance -= principal;
        totalInterest += interest;
        
        if (i % 12 === 0 || i === 1 || i === months) {
          schedule.push({
            month: i,
            payment: Math.round(monthlyPayment),
            principal: Math.round(principal),
            interest: Math.round(interest),
            balance: Math.max(0, Math.round(balance))
          });
        }
      }
      
      setResult({
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(amount + totalInterest),
        schedule: schedule.slice(0, 12) // Show first year for chart
      });
    } else {
      const principalPerMonth = amount / months;
      let firstPayment = 0;
      
      for (let i = 1; i <= months; i++) {
        const interest = balance * monthlyRate;
        const payment = principalPerMonth + interest;
        if (i === 1) firstPayment = payment;
        balance -= principalPerMonth;
        totalInterest += interest;
        
        if (i % 12 === 0 || i === 1 || i === months) {
          schedule.push({
            month: i,
            payment: Math.round(payment),
            principal: Math.round(principalPerMonth),
            interest: Math.round(interest),
            balance: Math.max(0, Math.round(balance))
          });
        }
      }
      
      setResult({
        monthlyPayment: Math.round(firstPayment), // Show first month as representative
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(amount + totalInterest),
        schedule: schedule.slice(0, 12)
      });
    }
  };

  return (
    <div className="py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">대출 이자 계산기</h1>
        <p className="mt-2 text-slate-500">상환 방식에 따른 월 납입금과 총 이자 비용을 상세히 분석합니다.</p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-700">대출 금액 (원)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">대출 금리 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">대출 기간 (년)</label>
                <select
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  {[10, 15, 20, 25, 30, 35, 40, 50].map(y => (
                    <option key={y} value={y}>{y}년</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">상환 방식</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-200 bg-white"
                >
                  <option value="equal-principal-interest">원리금균등상환</option>
                  <option value="equal-principal">원금균등상환</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full rounded-xl bg-purple-600 py-4 font-bold text-white shadow-lg hover:bg-purple-700 transition-colors"
            >
              이자 계산하기
            </button>
          </div>

          {result && (
            <div className="rounded-2xl border bg-white p-8 shadow-sm space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">첫 달 납입금</p>
                  <p className="mt-1 text-xl font-extrabold text-purple-900">{formatCurrency(result.monthlyPayment)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">총 이자액</p>
                  <p className="mt-1 text-xl font-extrabold text-slate-900">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">총 상환액</p>
                  <p className="mt-1 text-xl font-extrabold text-slate-900">{formatCurrency(result.totalPayment)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-900">상환 스케줄 (초기 1년)</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.schedule}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" label={{ value: '개월', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis tickFormatter={(v) => `${v/10000}만`} />
                      <Tooltip formatter={(v: number) => formatCurrency(v)} />
                      <Legend />
                      <Bar dataKey="principal" name="원금" stackId="a" fill="#a855f7" />
                      <Bar dataKey="interest" name="이자" stackId="a" fill="#e9d5ff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold text-slate-900">
              <Info className="h-5 w-5 text-purple-500" />
              상환 방식 가이드
            </h3>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-bold text-slate-800">원리금균등상환</p>
                <p className="mt-1">매달 갚는 원금과 이자의 합계가 동일합니다. 자금 계획 수립에 유리합니다.</p>
              </div>
              <div>
                <p className="font-bold text-slate-800">원금균등상환</p>
                <p className="mt-1">매달 갚는 원금이 동일합니다. 초기 부담은 크지만 총 이자액은 가장 적습니다.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold">LTV/DSR이 궁금하신가요?</h3>
            <p className="mt-2 text-sm opacity-80">지역별, 소득별 대출 한도 규제를 전문가가 직접 분석해 드립니다.</p>
            <button className="mt-4 w-full rounded-xl bg-white py-3 font-bold text-slate-900 hover:bg-slate-100 transition-colors">
              대출 한도 상담받기
            </button>
          </div>
        </div>
      </div>

      <article className="prose prose-slate max-w-none rounded-2xl border bg-white p-8 shadow-sm">
        <h2>대출 이자 계산과 현명한 상환 전략</h2>
        <p>
          집을 살 때 대출은 필수적인 도구입니다. 하지만 어떤 상환 방식을 선택하느냐에 따라 
          수천만 원의 이자 차이가 발생할 수 있습니다. 본 가이드에서는 대출의 기본 개념과 전략을 설명합니다.
        </p>

        <h3>1. 원리금균등 vs 원금균등, 무엇이 다를까?</h3>
        <p>
          <strong>원리금균등상환</strong>은 매달 지불하는 금액이 일정하여 가계부를 관리하기 편리합니다. 
          반면 <strong>원금균등상환</strong>은 매달 원금을 똑같이 갚아나가기 때문에 시간이 지날수록 이자가 줄어들어 
          전체 상환 기간 동안 내는 총 이자액이 원리금균등 방식보다 적습니다. 
          여유 자금이 있다면 원금균등 방식이 경제적으로는 더 유리합니다.
        </p>

        <h3>2. 대출 기간 설정의 전략</h3>
        <p>
          대출 기간을 길게 잡으면(예: 40년, 50년) 매달 내는 원리금 부담은 줄어들지만, 
          전체 기간 동안 지불하는 총 이자액은 기하급수적으로 늘어납니다. 
          따라서 본인의 소득 수준에서 감당 가능한 범위 내에서 기간을 최대한 짧게 설정하거나, 
          중도상환수수료가 없는 시점에 수시로 원금을 갚아나가는 것이 좋습니다.
        </p>

        <h3>3. DSR(총부채원리금상환비율) 규제 이해하기</h3>
        <p>
          현재 대한민국 대출 시장에서 가장 중요한 지표는 DSR입니다. 
          연간 갚아야 하는 모든 대출의 원리금이 연 소득의 40%를 넘지 못하도록 제한하는 규제입니다. 
          따라서 소득 증빙이 어려운 경우 대출 한도가 크게 줄어들 수 있으므로 미리 확인이 필요합니다.
        </p>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <HelpCircle className="h-6 w-6 text-purple-500" />
            자주 묻는 질문 (FAQ)
          </h3>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-bold text-slate-800">Q1. 거치 기간이 무엇인가요?</h4>
              <p className="mt-2 text-slate-600">대출 초기 일정 기간 동안 원금은 갚지 않고 이자만 내는 기간을 말합니다. 초기 부담은 적지만, 거치 기간이 끝나면 원금 상환 부담이 갑자기 커지므로 주의해야 합니다.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Q2. 중도상환수수료는 보통 얼마인가요?</h4>
              <p className="mt-2 text-slate-600">대부분의 시중은행은 대출 후 3년 이내에 원금을 갚을 경우 약 1.2% 내외의 수수료를 부과합니다. 3년이 지나면 보통 면제됩니다.</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
