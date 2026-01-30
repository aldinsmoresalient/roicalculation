import { useState, useEffect } from 'react';
import { DollarSign, Shield, Clock, TrendingUp, Target, TrendingDown, BarChart3, CheckCircle, Users, Scale, Zap, ChevronUp, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

// Salient Brand Colors
const colors = {
  cream: '#FAF6F2',
  creamSecondary: '#F6F0E9',
  charcoal: '#0F0F0F',
  muted: 'rgba(15, 15, 15, 0.6)',
  accent: '#C9A962',
  accentMuted: 'rgba(201, 169, 98, 0.15)',
  success: '#3D7C5E',
  error: '#9B4D4D',
};

// Card Component
const Card = ({ children, dark = false, className = '' }) => (
  <div
    className={`p-6 transition-all duration-200 ${className}`}
    style={{
      backgroundColor: dark ? colors.charcoal : 'white',
      color: dark ? 'white' : colors.charcoal,
      borderRadius: '24px',
      border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
      boxShadow: dark
        ? '0 4px 24px rgba(0,0,0,0.3)'
        : '0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)',
    }}
  >
    {children}
  </div>
);

// Badge Component
const Badge = ({ children }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-1 h-4 rounded-full"
      style={{ backgroundColor: colors.accent }}
    />
    <span
      className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold"
      style={{
        backgroundColor: colors.charcoal,
        color: 'white',
        borderRadius: '24px',
      }}
    >
      {children}
    </span>
  </div>
);

// Format currency
const formatCurrency = (value) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

// Input field component
const InputField = ({ label, description, value, onChange, icon: Icon, prefix = '', suffix = '', min = 0, max = 100000, step = 1 }) => {
  // Fix floating point precision issues
  const precision = step < 1 ? String(step).split('.')[1]?.length || 1 : 0;
  const round = (num) => Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);

  const increment = () => onChange(round(Math.min(max, value + step)));
  const decrement = () => onChange(round(Math.max(min, value - step)));

  return (
    <div
      className="flex flex-col p-3"
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon className="w-3.5 h-3.5" style={{ color: colors.accent }} strokeWidth={1.5} />
        <span className="text-[9px] uppercase tracking-wider font-semibold opacity-50">{label}</span>
      </div>
      <p className="text-[10px] opacity-50 mb-2">{description}</p>
      <div
        className="flex items-center justify-between px-2 py-2"
        style={{
          backgroundColor: colors.cream,
          borderRadius: '8px',
          border: `2px solid ${colors.accent}40`,
        }}
      >
        <div className="flex items-center gap-1 flex-1">
          {prefix && <span className="text-base font-medium" style={{ color: colors.accent }}>{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            min={min}
            max={max}
            step={step}
            className="text-xl font-bold bg-transparent outline-none text-center hide-spinners flex-1"
            style={{ color: colors.charcoal, minWidth: 0 }}
          />
          {suffix && <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: colors.accent }}>{suffix}</span>}
        </div>
        <div className="flex flex-col ml-1.5 border-l pl-1.5" style={{ borderColor: `${colors.accent}30` }}>
          <button onClick={increment} className="p-0.5 hover:bg-white/50 rounded transition-colors" type="button">
            <ChevronUp className="w-3.5 h-3.5" style={{ color: colors.accent }} strokeWidth={2} />
          </button>
          <button onClick={decrement} className="p-0.5 hover:bg-white/50 rounded transition-colors" type="button">
            <ChevronDown className="w-3.5 h-3.5" style={{ color: colors.accent }} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function BusinessCalculator() {
  // Input state (in millions for disputed dollars and operational cost)
  const [annualDisputedDollars, setAnnualDisputedDollars] = useState(60); // in millions
  const [currentOperationalCost, setCurrentOperationalCost] = useState(4); // in millions
  const [currentRecoveryRate, setCurrentRecoveryRate] = useState(81); // percentage
  const [currentTimePerClaim, setCurrentTimePerClaim] = useState(30); // minutes

  // Salient target time per claim (fixed at 6 minutes)
  const salientTargetTime = 6;
  const fraudPreventionImprovement = 4; // 4% improvement in fraud loss prevention

  // Dispute flow assumptions (percentages)
  const claimDenialRate = 4; // % denied at claim decision
  const merchantLiableRate = 70; // % of approved that merchant is liable
  const chargebackSuccessRate = 99; // % of chargebacks that succeed

  // Dispute flow calculated values
  const disputedDollars = annualDisputedDollars * 1000000;

  // Step 1: Claim Decision
  const deniedAmount = disputedDollars * (claimDenialRate / 100);
  const approvedAmount = disputedDollars * ((100 - claimDenialRate) / 100);

  // Step 2: Liability Assignment (of approved)
  const merchantLiableAmount = approvedAmount * (merchantLiableRate / 100);
  const bankLiableAmount = approvedAmount * ((100 - merchantLiableRate) / 100);

  // Step 3: Chargeback Recovery (of merchant liable)
  const chargebackSuccessAmount = merchantLiableAmount * (chargebackSuccessRate / 100);
  const chargebackFailedAmount = merchantLiableAmount * ((100 - chargebackSuccessRate) / 100);

  // Step 4: Bank Liable Resolution
  const bankRecoveredAmount = bankLiableAmount * (currentRecoveryRate / 100);
  const bankWriteOffAmount = bankLiableAmount * ((100 - currentRecoveryRate) / 100);

  // Total Bank Loss
  const totalBankLoss = chargebackFailedAmount + bankWriteOffAmount;

  // Operational efficiency calculations
  const operationalCost = currentOperationalCost * 1000000;
  const timeReductionPercent = Math.max(0, Math.min(95, Math.round(((currentTimePerClaim - salientTargetTime) / currentTimePerClaim) * 100)));
  const operationalEfficiency = operationalCost * (timeReductionPercent / 100);

  // Fraud loss prevention
  const fraudLossPrevention = totalBankLoss * (fraudPreventionImprovement / 100);

  // Total Value
  const totalValue = operationalEfficiency + fraudLossPrevention;

  const headerStyle = { fontFamily: 'Halant, Georgia, serif', lineHeight: '0.9', letterSpacing: '-0.02em' };

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.creamSecondary, overflowY: 'auto' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Halant:wght@300;400;500;600;700&display=swap');

        .hide-spinners::-webkit-inner-spin-button,
        .hide-spinners::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .hide-spinners {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto p-3 md:p-6 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge>Value Analysis</Badge>
            <h2 className="text-xl md:text-2xl" style={headerStyle}>Dispute Operations</h2>
          </div>
        </div>

        {/* Your Inputs Section */}
        <div>
          <h3 className="text-[10px] font-semibold mb-1.5 opacity-60 uppercase tracking-wide">Your Inputs</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <InputField
              label="Annual Disputed Dollars"
              description="Total disputed per year"
              value={annualDisputedDollars}
              onChange={setAnnualDisputedDollars}
              icon={DollarSign}
              prefix="$"
              suffix="M"
              min={1}
              max={500}
              step={1}
            />
            <InputField
              label="Operational Cost (Millions)"
              description="Annual ops cost"
              value={currentOperationalCost}
              onChange={setCurrentOperationalCost}
              icon={BarChart3}
              prefix="$"
              suffix="M"
              min={0.1}
              max={50}
              step={0.1}
            />
            <InputField
              label="Recovery Rate"
              description="% recovered of recoverable"
              value={currentRecoveryRate}
              onChange={setCurrentRecoveryRate}
              icon={Target}
              suffix="%"
              min={50}
              max={99}
              step={1}
            />
            <InputField
              label="Time per Claim"
              description="Minutes per dispute"
              value={currentTimePerClaim}
              onChange={setCurrentTimePerClaim}
              icon={Clock}
              suffix="min"
              min={5}
              max={120}
              step={1}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Left - Dispute Flow Breakdown */}
          <div className="lg:col-span-7">
            <Card style={{ padding: '12px' }}>
              <h3 className="font-semibold text-xs mb-2">Dispute Flow Breakdown</h3>

              {/* Starting Point */}
              <div className="mb-2 p-1.5 rounded-lg flex items-center justify-between" style={{ backgroundColor: colors.cream }}>
                <span className="text-[9px] uppercase tracking-wider opacity-50">Starting Point</span>
                <span className="text-base font-bold" style={{ fontFamily: 'Halant, Georgia, serif' }}>
                  {formatCurrency(disputedDollars)} <span className="text-[10px] font-normal opacity-60">annual</span>
                </span>
              </div>

              {/* Step 1: Claim Decision */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: colors.accentMuted, color: colors.accent }}>1</div>
                  <span className="font-semibold text-xs">Claim Decision</span>
                </div>
                <div className="ml-5 text-[10px] space-y-0.5">
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Denied → Cardholder</span>
                    <span><span className="opacity-40">{claimDenialRate}%</span> · <span className="font-semibold">{formatCurrency(deniedAmount)}</span></span>
                  </div>
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Approved → continues</span>
                    <span><span className="opacity-40">{100 - claimDenialRate}%</span> · <span className="font-semibold">{formatCurrency(approvedAmount)}</span></span>
                  </div>
                </div>
              </div>

              {/* Step 2: Liability Assignment */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: colors.accentMuted, color: colors.accent }}>2</div>
                  <span className="font-semibold text-xs">Liability Assignment</span>
                  <span className="text-[9px] opacity-40">({formatCurrency(approvedAmount)})</span>
                </div>
                <div className="ml-5 text-[10px] space-y-0.5">
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Merchant → chargeback</span>
                    <span><span className="opacity-40">{merchantLiableRate}%</span> · <span className="font-semibold">{formatCurrency(merchantLiableAmount)}</span></span>
                  </div>
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Bank liable</span>
                    <span><span className="opacity-40">{100 - merchantLiableRate}%</span> · <span className="font-semibold">{formatCurrency(bankLiableAmount)}</span></span>
                  </div>
                </div>
              </div>

              {/* Step 3: Chargeback Recovery */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: colors.accentMuted, color: colors.accent }}>3</div>
                  <span className="font-semibold text-xs">Chargeback Recovery</span>
                  <span className="text-[9px] opacity-40">({formatCurrency(merchantLiableAmount)})</span>
                </div>
                <div className="ml-5 text-[10px] space-y-0.5">
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Successful</span>
                    <span><span className="opacity-40">{chargebackSuccessRate}%</span> · <span className="font-semibold">{formatCurrency(chargebackSuccessAmount)}</span></span>
                  </div>
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(155,77,77,0.08)' }}>
                    <span className="opacity-60">Failed → bank absorbs</span>
                    <span><span className="font-semibold" style={{ color: colors.error }}>{formatCurrency(chargebackFailedAmount)}</span></span>
                  </div>
                </div>
              </div>

              {/* Step 4: Bank Liable Resolution */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: colors.accentMuted, color: colors.accent }}>4</div>
                  <span className="font-semibold text-xs">Bank Resolution</span>
                  <span className="text-[9px] opacity-40">({formatCurrency(bankLiableAmount)})</span>
                </div>
                <div className="ml-5 text-[10px] space-y-0.5">
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Recovered</span>
                    <span><span className="opacity-40">{currentRecoveryRate}%</span> · <span className="font-semibold">{formatCurrency(bankRecoveredAmount)}</span></span>
                  </div>
                  <div className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(155,77,77,0.08)' }}>
                    <span className="opacity-60">Write-off</span>
                    <span><span className="font-semibold" style={{ color: colors.error }}>{formatCurrency(bankWriteOffAmount)}</span></span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div className="text-[9px] uppercase tracking-wider opacity-50 mb-2">Where the {formatCurrency(disputedDollars)} Lands</div>
                <div className="space-y-0.5 text-[10px]">
                  {[
                    { label: 'Cardholder (denied)', amount: deniedAmount, pct: claimDenialRate },
                    { label: 'Merchant (CB success)', amount: chargebackSuccessAmount, pct: Math.round((chargebackSuccessAmount / disputedDollars) * 100) },
                    { label: 'Failed CB → Bank', amount: chargebackFailedAmount, pct: Math.round((chargebackFailedAmount / disputedDollars) * 100), loss: true },
                    { label: 'Bank recovered', amount: bankRecoveredAmount, pct: Math.round((bankRecoveredAmount / disputedDollars) * 100) },
                    { label: 'Bank write-off', amount: bankWriteOffAmount, pct: Math.round((bankWriteOffAmount / disputedDollars) * 100), loss: true },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between py-1 px-1.5 rounded" style={{ backgroundColor: row.loss ? 'rgba(155,77,77,0.08)' : 'rgba(0,0,0,0.02)' }}>
                      <span className={row.loss ? '' : 'opacity-60'}>{row.label}</span>
                      <span>
                        <span className="font-semibold" style={row.loss ? { color: colors.error } : {}}>{formatCurrency(row.amount)}</span>
                        <span className="opacity-40 ml-1">{row.pct}%</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 p-2 rounded-lg flex justify-between items-center" style={{ backgroundColor: colors.error, color: 'white' }}>
                  <span className="font-semibold text-xs">Total Annual Bank Loss</span>
                  <span className="text-lg font-bold" style={{ fontFamily: 'Halant, Georgia, serif' }}>{formatCurrency(totalBankLoss)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right - Operational Efficiency & Total */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {/* Operational Efficiency Breakdown */}
            <Card style={{ padding: '10px' }}>
              <h3 className="font-semibold text-xs mb-1.5">Operational Efficiency Breakdown</h3>

              {/* Starting Point */}
              <div className="mb-1.5 p-1.5 rounded-lg flex items-center justify-between" style={{ backgroundColor: colors.cream }}>
                <span className="text-[9px] uppercase tracking-wider opacity-50">Current State</span>
                <span className="text-sm font-bold" style={{ fontFamily: 'Halant, Georgia, serif' }}>
                  {formatCurrency(operationalCost)} <span className="text-[9px] font-normal opacity-60">ops cost</span>
                </span>
              </div>

              {/* Time Reduction */}
              <div className="mb-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: colors.accentMuted, color: colors.accent }}>1</div>
                  <span className="font-semibold text-[10px]">Time Reduction</span>
                </div>
                <div className="ml-4 text-[9px] space-y-0.5">
                  <div className="flex justify-between py-0.5 px-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Current</span>
                    <span className="font-semibold">{currentTimePerClaim} min</span>
                  </div>
                  <div className="flex justify-between py-0.5 px-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                    <span className="opacity-60">Salient target</span>
                    <span className="font-semibold">{salientTargetTime} min</span>
                  </div>
                  <div className="flex justify-between py-0.5 px-1 rounded" style={{ backgroundColor: 'rgba(61,124,94,0.1)' }}>
                    <span className="opacity-60">Reduction</span>
                    <span className="font-semibold" style={{ color: colors.success }}>{timeReductionPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Efficiency Savings */}
              <div className="mb-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: colors.accentMuted, color: colors.accent }}>2</div>
                  <span className="font-semibold text-[10px]">Efficiency Savings</span>
                </div>
                <div className="ml-4 text-[9px]">
                  <div className="flex justify-between py-0.5 px-1 rounded" style={{ backgroundColor: 'rgba(61,124,94,0.1)' }}>
                    <span className="opacity-60">{formatCurrency(operationalCost)} × {timeReductionPercent}%</span>
                    <span className="font-semibold" style={{ color: colors.success }}>{formatCurrency(operationalEfficiency)}</span>
                  </div>
                </div>
              </div>

              {/* Total Operational Savings */}
              <div className="mt-1.5 p-1.5 rounded-lg flex justify-between items-center" style={{ backgroundColor: colors.success, color: 'white' }}>
                <span className="font-semibold text-[10px]">Total Operational Savings</span>
                <span className="text-base font-bold" style={{ fontFamily: 'Halant, Georgia, serif' }}>{formatCurrency(operationalEfficiency)}</span>
              </div>
            </Card>

            {/* Total Annual Value */}
            <Card dark style={{ padding: '10px' }}>
              <div className="text-[8px] uppercase tracking-wider opacity-40 mb-1.5">Total Annual Value</div>

              <div className="space-y-1">
                <div className="flex items-center justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" style={{ color: colors.success }} strokeWidth={1.5} />
                    <span className="text-[9px] opacity-70">Operational savings</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: colors.success }}>{formatCurrency(operationalEfficiency)}</span>
                </div>
                <div className="flex items-center justify-between py-1 px-1.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5 opacity-50" strokeWidth={1.5} />
                    <span className="text-[9px] opacity-70">Fraud loss prevention ({formatCurrency(totalBankLoss)} × {fraudPreventionImprovement}%)</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'Halant, Georgia, serif' }}>{formatCurrency(fraudLossPrevention)}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-1.5 rounded-lg" style={{ backgroundColor: colors.accentMuted }}>
                  <span className="text-[9px] font-semibold" style={{ color: colors.accent }}>Total</span>
                  <span className="text-lg font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: colors.accent }}>{formatCurrency(totalValue)}</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-white/10 text-center">
                <div className="text-[8px] opacity-40">Monthly Impact</div>
                <div className="text-sm font-semibold" style={{ color: colors.accent }}>{formatCurrency(totalValue / 12)}/month</div>
              </div>
            </Card>

            {/* Beyond the Numbers */}
            <Card style={{ padding: '10px' }}>
              <h3 className="font-semibold text-[10px] mb-1.5">Beyond the Numbers</h3>
              <div className="space-y-1">
                {[
                  { icon: Users, label: 'Experience', desc: 'Faster resolution', impacts: [{ text: 'Retention', up: true }, { text: 'CLV', up: true }] },
                  { icon: CheckCircle, label: 'Consistency', desc: 'Uniform decisions', impacts: [{ text: 'Risk', up: false }] },
                  { icon: Scale, label: 'Compliance', desc: '100% audit coverage', impacts: [{ text: 'Risk', up: false }] },
                  { icon: Zap, label: 'Scalability', desc: 'Better than hiring', impacts: [{ text: 'COGS', up: false }] },
                ].map((item, i) => (
                  <div key={i} className="p-1 rounded flex items-center justify-between" style={{ backgroundColor: colors.cream }}>
                    <div className="flex items-center gap-1">
                      <item.icon className="w-3 h-3" style={{ color: colors.accent }} strokeWidth={1.5} />
                      <span className="text-[9px] font-semibold">{item.label}</span>
                      <span className="text-[8px] opacity-40">— {item.desc}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {item.impacts.map((impact, j) => (
                        <div key={j} className="flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[8px] font-medium"
                          style={{
                            backgroundColor: impact.up ? 'rgba(61, 124, 94, 0.15)' : 'rgba(201, 169, 98, 0.15)',
                            color: impact.up ? colors.success : colors.accent
                          }}>
                          {impact.up ? <ArrowUp className="w-2 h-2" strokeWidth={2} /> : <ArrowDown className="w-2 h-2" strokeWidth={2} />}
                          {impact.text}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
