import React from 'react';
import { Calculator, Info, Share2, Save, HelpCircle } from 'lucide-react';
import { formatNumber, formatCurrency, cn } from '@/src/lib/utils';

export default function AcquisitionTaxPage() {
  const [price, setPrice] = React.useState<number>(600000000);
  const [area, setArea] = React.useState<number>(84);
  const [houseCount, setHouseCount] = React.useState<number>(1);
  const [isAdjusted, setIsAdjusted] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    // Simplified logic for MVP
    let rate = 0.01;
    if (price > 900000000) rate = 0.03;
    else if (price > 600000000) rate = (price * (2/300000000) - 3) / 100;

    if (houseCount >= 2 && isAdjusted) rate = 0.08;
    if (houseCount >= 3 && isAdjusted) rate = 0.12;

    const acquisitionTax = price * rate;
    const educationTax = acquisitionTax * 0.1;
    const ruralTax = area > 85 ? price * 0.002 : 0;
    const total = acquisitionTax + educationTax + ruralTax;

    setResult({
      acquisitionTax,
      educationTax,
      ruralTax,
      total,
      rate: (rate * 100).toFixed(2)
    });

    // Save to history
    const history = JSON.parse(localStorage.getItem('calc_history') || '[]');
    history.unshift({
      id: Date.now().toString(),
      type: 'acquisition',
      title: `취득세: ${formatCurrency(price)}`,
      date: new Date().toLocaleDateString(),
      path: '/acquisition-tax'
    });
    localStorage.setItem('calc_history', JSON.stringify(history.slice(0, 20)));
  };

  return (
    <div className="py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">취득세 계산기</h1>
        <p className="mt-2 text-slate-500">부동산 매수 시 납부해야 할 세금을 정확하게 계산해 드립니다.</p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Input Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700">매매가 (원)</label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="예: 600,000,000"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    {formatCurrency(price)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">전용면적 (㎡)</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700">보유 주택 수</label>
                  <select
                    value={houseCount}
                    onChange={(e) => setHouseCount(Number(e.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  >
                    <option value={1}>1주택 (무주택 포함)</option>
                    <option value={2}>2주택</option>
                    <option value={3}>3주택 이상</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-700">조정대상지역 여부</p>
                  <p className="text-xs text-slate-500">현재 서울 강남, 서초, 송파, 용산구 해당</p>
                </div>
                <button
                  onClick={() => setIsAdjusted(!isAdjusted)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    isAdjusted ? "bg-blue-600" : "bg-slate-300"
                  )}
                >
                  <span className={cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform",
                    isAdjusted ? "translate-x-5" : "translate-x-0"
                  )} />
                </button>
              </div>

              <button
                onClick={calculate}
                className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg hover:bg-blue-700 transition-colors"
              >
                계산하기
              </button>
            </div>
          </div>

          {/* Result Card */}
          {result && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-blue-900">계산 결과</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">총 납부 세액</p>
                  <p className="mt-1 text-2xl font-extrabold text-blue-600">{formatCurrency(result.total)}</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">적용 세율</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{result.rate}%</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">취득세</span>
                  <span className="font-semibold">{formatCurrency(result.acquisitionTax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">지방교육세</span>
                  <span className="font-semibold">{formatCurrency(result.educationTax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">농어촌특별세</span>
                  <span className="font-semibold">{formatCurrency(result.ruralTax)}</span>
                </div>
              </div>
              <div className="mt-8 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50">
                  <Share2 className="h-4 w-4" /> 결과 공유
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50">
                  <Save className="h-4 w-4" /> 결과 저장
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar / Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold text-slate-900">
              <Info className="h-5 w-5 text-blue-500" />
              도움말
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>• 1주택자 취득세율: 1~3%</li>
              <li>• 2주택자(조정): 8%</li>
              <li>• 3주택자(조정): 12%</li>
              <li>• 전용면적 85㎡ 초과 시 농특세 부과</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold">전문가의 도움이 필요하신가요?</h3>
            <p className="mt-2 text-sm opacity-90">복잡한 증여, 상속, 양도세 상담을 지금 바로 신청하세요.</p>
            <button className="mt-4 w-full rounded-xl bg-white py-3 font-bold text-blue-600 hover:bg-blue-50 transition-colors">
              상담 예약하기
            </button>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-slate max-w-none rounded-2xl border bg-white p-8 shadow-sm">
        <h2>취득세 계산 방법과 2026년 최신 세율 가이드</h2>
        <p>
          부동산 취득세는 집을 살 때 가장 먼저 마주하게 되는 큰 지출입니다. 
          취득세는 단순히 매매가에 일정 비율을 곱하는 것이 아니라, 주택 수, 지역, 면적 등 다양한 변수에 따라 결정됩니다. 
          이 가이드에서는 취득세의 구조와 절세 전략에 대해 심도 있게 다룹니다.
        </p>

        <h3>1. 취득세의 구성 요소</h3>
        <p>
          우리가 흔히 말하는 '취득세'는 사실 세 가지 세금의 합계입니다:
          <ul>
            <li><strong>취득세:</strong> 부동산 취득 행위 자체에 부과되는 지방세</li>
            <li><strong>지방교육세:</strong> 취득세액의 10% (단, 1~3% 세율 적용 시 별도 계산)</li>
            <li><strong>농어촌특별세:</strong> 전용면적 85㎡ 초과 시 부과 (매매가의 0.2%)</li>
          </ul>
        </p>

        <h3>2. 주택 수에 따른 차등 세율</h3>
        <p>
          현재 대한민국 세법은 다주택자에 대해 징벌적 취득세율을 적용하고 있습니다. 
          조정대상지역 내에서 2주택을 취득할 경우 8%, 3주택 이상은 12%의 세율이 적용됩니다. 
          반면 비조정대상지역은 2주택까지는 일반 세율(1~3%)이 적용되므로, 투자 지역 선정 시 이를 반드시 고려해야 합니다.
        </p>

        <h3>3. 실제 사례 예시</h3>
        <p>
          <strong>사례 A:</strong> 무주택자가 서울(조정지역)의 84㎡ 아파트를 9억 원에 매수할 경우
          <br />
          취득세율 3%가 적용되어 약 2,700만 원의 취득세와 지방교육세 등이 발생합니다.
          <br /><br />
          <strong>사례 B:</strong> 1주택자가 서울의 84㎡ 아파트를 추가로 9억 원에 매수할 경우
          <br />
          취득세율 8%가 적용되어 약 7,200만 원 이상의 세금을 내야 합니다. 동일한 가격의 집이라도 주택 수에 따라 4,500만 원 이상의 차이가 발생합니다.
        </p>

        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <HelpCircle className="h-6 w-6 text-blue-500" />
            자주 묻는 질문 (FAQ)
          </h3>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-bold text-slate-800">Q1. 오피스텔의 취득세율은 얼마인가요?</h4>
              <p className="mt-2 text-slate-600">오피스텔은 주택법상 주택이 아니므로, 주거용으로 사용하더라도 취득 시점에는 4.6%(취득세 4% + 교육세 0.4% + 농특세 0.2%)의 단일 세율이 적용됩니다.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Q2. 생애 최초 주택 구입 시 혜택이 있나요?</h4>
              <p className="mt-2 text-slate-600">네, 생애 최초로 주택을 구입하는 경우 소득 제한 없이 취득가액 12억 원 이하 주택에 대해 최대 200만 원까지 취득세 감면 혜택을 받을 수 있습니다.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Q3. 분양권도 주택 수에 포함되나요?</h4>
              <p className="mt-2 text-slate-600">2020년 8월 12일 이후 취득한 분양권은 취득세 계산 시 주택 수에 포함됩니다. 따라서 기존 주택이 있는 상태에서 분양권을 취득하면 다주택자로 분류될 수 있습니다.</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
