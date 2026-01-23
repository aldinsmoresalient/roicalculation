import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Clock, DollarSign, Shield, Zap, CheckCircle, FileText, TrendingDown, Users, Scale, Car, CreditCard, Database, Settings, Search, Send, RotateCcw, Archive, Brain, Eye, Layers, XCircle, Flag, User, Mail, Phone, MapPin, CircleDot, File, MessageSquare } from 'lucide-react';

// Salient Brand Colors
const colors = {
  cream: '#FAF6F2',
  creamSecondary: '#F6F0E9',
  charcoal: '#0F0F0F',
  muted: 'rgba(15, 15, 15, 0.6)',
  accent: '#C9A962', // Warm gold accent
  accentMuted: 'rgba(201, 169, 98, 0.15)',
  success: '#3D7C5E', // Muted sophisticated green
  error: '#9B4D4D', // Muted sophisticated red
};

// Slide Canvas - Base container with consistent padding and typography
const SlideCanvas = ({ children, theme = 'light', centered = false }) => (
  <div
    className={`w-full h-full p-12 flex flex-col overflow-hidden relative ${centered ? 'justify-center items-center' : 'justify-start gap-8'}`}
    style={{
      backgroundColor: theme === 'light' ? colors.cream : theme === 'secondary' ? colors.creamSecondary : colors.charcoal,
      color: theme === 'dark' ? 'white' : colors.charcoal,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}
  >
    {children}
  </div>
);

// Badge Component - Breadcrumb for slide context with subtle accent
const Badge = ({ children, light = false }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-1 h-4 rounded-full"
      style={{ backgroundColor: light ? 'rgba(255,255,255,0.4)' : colors.accent }}
    />
    <span
      className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold"
      style={{
        backgroundColor: light ? 'rgba(255,255,255,0.1)' : colors.charcoal,
        color: 'white',
        borderRadius: '24px',
        border: light ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
    >
      {children}
    </span>
  </div>
);

// Metric Component - Big data display
const Metric = ({ value, label, description, light = false }) => (
  <div 
    className="flex flex-col gap-2 pl-6"
    style={{ borderLeft: `1px solid ${light ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}` }}
  >
    <div 
      className="text-5xl tracking-tight"
      style={{ fontFamily: 'Halant, Georgia, serif', lineHeight: '0.9' }}
    >
      {value}
    </div>
    <div className="font-bold uppercase tracking-widest text-[10px] opacity-60">
      {label}
    </div>
    {description && (
      <p className="text-sm leading-relaxed max-w-[200px] mt-2 opacity-80">
        {description}
      </p>
    )}
  </div>
);

// Card Component with consistent 24px radius and premium shadows
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

const slides = [
  { id: 'title', type: 'title' },
  { id: 'agenda', type: 'agenda' },
  { id: 'yendo-context', type: 'yendo-context' },
  { id: 'problem', type: 'problem' },
  { id: 'impact', type: 'impact' },
  { id: 'solution-intro', type: 'solution-intro' },
  { id: 'why-salient', type: 'why-salient' },
  { id: 'lifecycle-overview', type: 'lifecycle-overview' },
  { id: 'claims-ui', type: 'claims-ui' },
  { id: 'phase-1', type: 'phase-1' },
  { id: 'phase-2', type: 'phase-2' },
  { id: 'phase-3', type: 'phase-3' },
  { id: 'feature-rules', type: 'feature-rules' },
  { id: 'simulations', type: 'simulations' },
  { id: 'mastercom', type: 'mastercom' },
  { id: 'evidence-packages', type: 'evidence-packages' },
  { id: 'compliance', type: 'compliance' },
  { id: 'comparison', type: 'comparison' },
  { id: 'value-prop', type: 'value-prop' },
  { id: 'takeaways', type: 'takeaways' },
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(slides.length - 1, c + 1));

  const headerStyle = { fontFamily: 'Halant, Georgia, serif', lineHeight: '0.9', letterSpacing: '-0.02em' };

  const renderSlide = () => {
    const slide = slides[current];
    
    switch(slide.type) {
      // TITLE SLIDE - Centered, High-impact opening
      case 'title':
        return (
          <SlideCanvas theme="light" centered>
            <div className="flex flex-col items-center text-center gap-8">
              <span
                className="text-xl font-medium tracking-[0.35em] opacity-70"
                style={{ fontFamily: 'Halant, Georgia, serif', color: colors.charcoal }}
              >
                SALIENT
              </span>
              <h1
                className="text-8xl max-w-5xl"
                style={{...headerStyle, fontWeight: 400}}
              >
                AI-Powered Dispute Resolution
              </h1>
              <p className="text-lg opacity-50 max-w-2xl mt-2">
                Built for Yendo's Vehicle-Secured Credit Card
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div
                  className="flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-200"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  <CreditCard className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                  <span className="opacity-70">Mastercard Network</span>
                </div>
                <div
                  className="flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-200"
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  <Car className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                  <span className="opacity-70">Vehicle-Secured Lending</span>
                </div>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // AGENDA SLIDE
      case 'agenda':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Overview</Badge>
              <h2 className="text-5xl max-w-2xl" style={headerStyle}>Today's Discussion</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '01', title: 'The Yendo Opportunity', desc: 'Why data-first companies unlock better outcomes' },
                { num: '02', title: 'Current Pain Points', desc: 'Manual processes, compliance risk, cost' },
                { num: '03', title: 'Salient Solution', desc: '12-step automated dispute lifecycle' },
                { num: '04', title: 'Value & ROI', desc: 'Faster resolution, lower cost, exam-ready' },
              ].map((item, i) => (
                <Card key={i} className="flex items-start gap-6">
                  <span className="text-4xl opacity-20" style={headerStyle}>{item.num}</span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm opacity-60">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </SlideCanvas>
        );
      
      // YENDO CONTEXT - Data slide with metrics
      case 'yendo-context':
        return (
          <SlideCanvas theme="secondary">
            <div className="flex flex-col gap-6">
              <Badge>Why Yendo</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>The Ideal Partner for AI-Powered Disputes</h2>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5 space-y-4">
                <Card className="space-y-3">
                  <h3 className="font-bold text-sm opacity-50">THE USUAL BOTTLENECK</h3>
                  <p className="text-xs opacity-60">Most dispute automation projects stall because legacy lenders have:</p>
                  <ul className="text-xs space-y-1.5 opacity-80">
                    {['Fragmented data across siloed systems', '12-18 month integration timelines', 'Risk-averse IT governance', 'Manual processes embedded in culture'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="opacity-40">✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card dark className="space-y-3">
                  <h3 className="font-bold text-sm opacity-50">WHY YENDO IS DIFFERENT</h3>
                  <ul className="text-xs space-y-1.5 opacity-80">
                    {['Unified data layer from day one', 'API-first architecture', 'AI already in production (underwriting)', 'Engineering-led decision making', 'Speed as a competitive advantage'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              
              <div className="col-span-7 flex flex-col justify-between">
                <div className="flex gap-8 justify-end">
                  <Metric value="95%" label="Origination Cost Reduction" />
                  <Metric value="10 min" label="Approval Time" />
                  <Metric value="$50M" label="Series B (Oct 2025)" />
                </div>
                <Card dark className="text-center py-4">
                  <p className="text-sm">When we partner with data & tech-first companies like Yendo, we ship in <span className="font-semibold">weeks, not years</span>.</p>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // PROBLEM SLIDE
      case 'problem':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-3">
              <Badge>The Problem</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Disputes Today: Manual & Unstructured</h2>
            </div>

            {/* Metrics row */}
            <div className="flex gap-8">
              {[
                { value: '5-10 days', label: 'Avg. resolution time' },
                { value: '$25-40+', label: 'Cost per dispute' },
                { value: '3-5 systems', label: 'Touched per case' },
              ].map((m, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold" style={headerStyle}>{m.value}</span>
                  <span className="text-xs opacity-40">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Pain points */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: AlertTriangle, title: 'Manual Investigation', desc: 'Analysts toggle between systems with tribal knowledge.', consequence: 'Slow & expensive' },
                { icon: Users, title: 'Often Outsourced', desc: 'BPO implementations are hard to monitor.', consequence: 'Quality drift' },
                { icon: FileText, title: 'No Audit Trail', desc: 'Decision rationale lives in emails and memory.', consequence: 'Exam exposure' },
                { icon: Scale, title: 'Inconsistent Outcomes', desc: 'Same facts, different analysts, different results.', consequence: 'Compliance risk' },
              ].map((item, i) => (
                <Card key={i} className="space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center" style={{backgroundColor: colors.creamSecondary, borderRadius: '20px'}}>
                    <item.icon className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs opacity-50 leading-relaxed">{item.desc}</p>
                  <div className="text-[10px] font-medium pt-1" style={{color: colors.error}}>→ {item.consequence}</div>
                </Card>
              ))}
            </div>

            {/* Callout */}
            <Card dark className="text-center py-3">
              <p className="text-sm">Every manual touchpoint is a <span className="font-semibold">compliance risk</span> and a <span className="font-semibold">cost multiplier</span>.</p>
            </Card>
          </SlideCanvas>
        );
      
      // IMPACT SLIDE - CX focused
      case 'impact':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-3">
              <Badge>The Impact</Badge>
              <h2 className="text-4xl max-w-4xl" style={headerStyle}>Disputes Are a Defining Customer Moment</h2>
              <p className="text-sm opacity-50 max-w-2xl">When customers dispute a charge, they're stressed and watching closely. How you respond shapes their perception of your brand.</p>
            </div>

            <div className="grid grid-cols-12 gap-4">
              {/* Left side - the problem */}
              <div className="col-span-5 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-40">When resolution is slow & inconsistent</div>
                {[
                  { icon: Clock, title: 'Repeat Contacts', desc: 'Customers call back for status updates, increasing support costs' },
                  { icon: TrendingDown, title: 'Eroded Trust', desc: 'Each delay signals you don\'t have their back' },
                  { icon: Users, title: 'Higher Churn', desc: 'Frustrated customers leave, and tell others' },
                ].map((item, i) => (
                  <Card key={i} className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{backgroundColor: colors.creamSecondary, borderRadius: '16px'}}>
                      <item.icon className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs opacity-50">{item.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Right side - compounding cost */}
              <div className="col-span-7 flex flex-col gap-3">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-40">The compounding cost</div>
                <Card dark className="flex-1 flex flex-col justify-center p-6 space-y-4">
                  <div className="space-y-2">
                    {[
                      { label: 'Base handling cost', value: '$25-40', cumulative: '$25-40' },
                      { label: '+ Repeat contacts & escalations', value: '+$15-25', cumulative: '$40-65' },
                      { label: '+ Rework from inconsistent decisions', value: '+$20-30', cumulative: '$60-95' },
                      { label: '+ Lost customer lifetime value', value: '+$200-500', cumulative: '$260-595' },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="opacity-60">{row.label}</span>
                        <div className="flex items-center gap-4">
                          <span className="opacity-40 text-xs">{row.value}</span>
                          <span className="font-semibold w-20 text-right" style={{color: i === 3 ? colors.accent : 'white'}}>{row.cumulative}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="text-xs opacity-40">True cost per mishandled dispute</span>
                    <span className="text-2xl font-semibold" style={{color: colors.accent}}>$260-595</span>
                  </div>
                </Card>
                <p className="text-xs opacity-40 text-center">Fast, consistent resolution isn't just good service. It protects lifetime value.</p>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // TRANSITION SLIDE - Dark mode, reset the room
      case 'solution-intro':
        return (
          <SlideCanvas theme="dark" centered>
            <div className="absolute top-16 left-16">
              <Badge light>The Solution</Badge>
            </div>
            <div className="flex flex-col items-center text-center gap-8">
              <span
                className="text-lg font-medium tracking-[0.4em] opacity-60"
                style={{ fontFamily: 'Halant, Georgia, serif' }}
              >
                SALIENT
              </span>
              <h1 className="text-7xl max-w-4xl" style={{...headerStyle, fontWeight: 400}}>
                AI agents built for US consumer lenders.
              </h1>
              <p className="text-lg opacity-40 max-w-2xl mt-4 leading-relaxed">
                End-to-end dispute lifecycle automation with compliance-first AI that fits how lenders are supervised and examined.
              </p>
            </div>
          </SlideCanvas>
        );

      // WHY SALIENT - Feature slide
      case 'why-salient':
        return (
          <SlideCanvas theme="dark">
            <div className="flex flex-col gap-4">
              <Badge light>Why Salient</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>Purpose-built AI for regulated lending</h2>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Compliance-first for US lending', desc: 'Built around the realities of US consumer-lending regulation and supervision. CFPB, OCC, FDIC, NCUA, and state regulators.' },
                { icon: Settings, title: 'Back-office workflow automation', desc: 'Our agents run full workflows end-to-end, from intake through documentation and system updates.' },
                { icon: Brain, title: 'Borrower-level memory', desc: 'Every interaction is informed by history: prior calls, promises, hardship notes, disputes, and claims.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-7 space-y-5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '24px'}}
                  >
                    <item.icon className="w-5 h-5 opacity-50" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </SlideCanvas>
        );

      // LIFECYCLE OVERVIEW - Process slide
      case 'lifecycle-overview':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-2">
              <Badge>Product Overview</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>12-Step Dispute Lifecycle</h2>
            </div>

            {/* Main phases with flow */}
            <div className="flex items-stretch gap-2">
              {[
                {
                  phase: 'INTAKE',
                  color: '#8B7355',
                  time: '< 1 min',
                  steps: [
                    { n: '01', t: 'Trigger & Capture', auto: true },
                    { n: '02', t: 'Classification', auto: true },
                    { n: '03', t: 'Eligibility Check', auto: true },
                    { n: '04', t: 'Planning', auto: true },
                  ],
                  output: 'Classified claim'
                },
                {
                  phase: 'INVESTIGATION',
                  color: '#5B8A9A',
                  time: '1-5 min',
                  steps: [
                    { n: '05', t: 'Early Screening', auto: true },
                    { n: '06', t: 'Evidence Gathering', auto: true },
                    { n: '07', t: 'Evaluation', auto: false },
                  ],
                  output: 'Evidence package'
                },
                {
                  phase: 'RESOLUTION',
                  color: '#2E7D32',
                  time: '< 1 min',
                  steps: [
                    { n: '08', t: 'Decisioning', auto: false },
                    { n: '09', t: 'Execution', auto: true },
                  ],
                  output: 'Decision + credits'
                },
                {
                  phase: 'CLOSEOUT',
                  color: colors.charcoal,
                  time: 'Ongoing',
                  steps: [
                    { n: '10', t: 'Lifecycle Mgmt', auto: true },
                    { n: '11', t: 'Documentation', auto: true },
                    { n: '12', t: 'Closeout', auto: true },
                  ],
                  output: 'Audit trail'
                },
              ].map((group, i, arr) => (
                <div key={i} className="flex items-stretch flex-1">
                  <div
                    className="flex-1 p-4 flex flex-col"
                    style={{
                      backgroundColor: i === 3 ? colors.charcoal : 'white',
                      color: i === 3 ? 'white' : colors.charcoal,
                      borderRadius: '16px',
                      border: i === 3 ? 'none' : '1px solid rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Phase header */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="text-[9px] font-bold tracking-widest px-2 py-1 rounded-full"
                        style={{ backgroundColor: group.color, color: 'white' }}
                      >
                        {group.phase}
                      </div>
                      <div className="text-[10px] opacity-50">{group.time}</div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-2 flex-1">
                      {group.steps.map((step, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="text-[10px] opacity-30 w-4">{step.n}</span>
                          <span className="text-[11px] flex-1">{step.t}</span>
                          <span
                            className="text-[8px] px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: step.auto
                                ? (i === 3 ? 'rgba(255,255,255,0.15)' : 'rgba(46,125,50,0.1)')
                                : (i === 3 ? 'rgba(255,255,255,0.15)' : 'rgba(201,169,98,0.2)'),
                              color: step.auto
                                ? (i === 3 ? 'rgba(255,255,255,0.7)' : '#2E7D32')
                                : (i === 3 ? 'rgba(255,255,255,0.7)' : '#96722E')
                            }}
                          >
                            {step.auto ? 'Auto' : 'Review'}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Output */}
                    <div
                      className="mt-3 pt-2 text-[10px] text-center border-t"
                      style={{ borderColor: i === 3 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }}
                    >
                      <span className="opacity-40">→</span> <span className="font-medium">{group.output}</span>
                    </div>
                  </div>

                  {/* Arrow between phases */}
                  {i < arr.length - 1 && (
                    <div className="flex items-center px-1">
                      <ChevronRight className="w-4 h-4 opacity-20" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary bar */}
            <Card dark className="flex items-center justify-between py-3 px-6">
              <div className="flex items-center gap-6">
                {[
                  { label: 'Total time', value: 'Minutes, not days' },
                  { label: 'Automation rate', value: '10 of 12 steps' },
                  { label: 'Audit coverage', value: '100%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs opacity-40">{item.label}:</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs opacity-50">Human review only where judgment matters</div>
            </Card>
          </SlideCanvas>
        );

      // CLAIMS INVESTIGATION UI - Product mockup
      case 'claims-ui':
        return (
          <div
            className="w-full h-full p-10 flex flex-col gap-4 overflow-hidden relative"
            style={{
              backgroundColor: colors.creamSecondary,
              color: colors.charcoal,
              fontFamily: 'Geist, system-ui, sans-serif',
            }}
          >
            <div className="flex flex-col gap-2">
              <Badge>Product Preview</Badge>
              <h2 className="text-3xl max-w-3xl" style={headerStyle}>Claims Investigation Interface</h2>
            </div>

            <div className="flex-1 flex gap-3 min-h-0">
              {/* Left Panel - Case Info */}
              <div className="w-[280px] flex flex-col gap-2 overflow-hidden">
                {/* Cardholder Info */}
                <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider opacity-40 mb-1">
                    <User className="w-3 h-3" strokeWidth={1.5} />
                    Cardholder
                  </div>
                  <div className="font-semibold text-xs">MARIA THOMPSON</div>
                  <div className="text-[10px] opacity-50 space-y-0 mt-1">
                    <div className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" strokeWidth={1.5} /> m.thompson@email.com</div>
                    <div className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" strokeWidth={1.5} /> (555) 867-5309</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" strokeWidth={1.5} /> Austin, TX 78701</div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-black/5 flex justify-between text-[9px]">
                    <div><span className="opacity-40">Account</span> <span className="font-mono font-medium">48291056</span></div>
                    <div><span className="opacity-40">Card</span> <span className="font-mono">••••4521</span></div>
                  </div>
                </div>

                {/* Disputed Transaction */}
                <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider opacity-40 mb-1">
                    <AlertTriangle className="w-2.5 h-2.5" strokeWidth={1.5} />
                    Disputed Transaction
                  </div>
                  <div className="text-[10px] font-medium">LUXE ELECTRONICS ONLINE</div>
                  <div className="text-[9px] opacity-40">Sep 1, 2025 • MCC: 5732</div>
                  <div className="text-lg font-semibold mt-1" style={{fontFamily: 'Halant, Georgia, serif'}}>$847.99</div>
                </div>

                {/* Documentation */}
                <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm flex-1 overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider opacity-40">
                      <FileText className="w-2.5 h-2.5" strokeWidth={1.5} />
                      Documentation (21)
                    </div>
                    <div className="text-[8px] px-1.5 py-0.5 rounded-full" style={{backgroundColor: colors.accentMuted, color: colors.accent}}>
                      Generate All
                    </div>
                  </div>
                  <div className="space-y-1">
                    {[
                      { name: 'Dispute Case File', date: 'Oct 14, 2025', icon: File },
                      { name: 'Cardholder Statement', date: 'Sep 23, 2025', icon: MessageSquare },
                      { name: 'Merchant Response', date: 'Sep 16, 2025', icon: Mail },
                      { name: 'Decision Narrative', date: 'Sep 16, 2025', icon: FileText },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-black/[0.02] text-[9px]">
                        <doc.icon className="w-2.5 h-2.5 opacity-40" strokeWidth={1.5} />
                        <div className="flex-1 truncate">
                          <div className="font-medium truncate">{doc.name}</div>
                          <div className="opacity-40 text-[8px]">{doc.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - AI Analysis */}
              <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                {/* Recommendation Header */}
                <div className="rounded-xl p-3 border-2" style={{backgroundColor: 'rgba(155, 77, 77, 0.05)', borderColor: 'rgba(155, 77, 77, 0.2)'}}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4" style={{color: colors.error}} strokeWidth={1.5} />
                      <span className="text-sm font-semibold">Recommend: <span style={{color: colors.error}}>DENY</span></span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold" style={{backgroundColor: colors.error, color: 'white'}}>
                        HIGH CONFIDENCE
                      </span>
                    </div>
                    <span className="text-[9px] opacity-40">Actual Outcome: Resolved-Denied ✓</span>
                  </div>
                  <p className="text-[10px] opacity-60 leading-relaxed">
                    The claim of fraud is undermined by inconsistencies in cardholder statements regarding card possession and confirmation from the merchant that the card was used for the transaction.
                  </p>
                </div>

                {/* Analysis Grid */}
                <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
                  {/* What Customer Claims */}
                  <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm overflow-hidden">
                    <div className="text-[9px] uppercase tracking-wider opacity-40 mb-1">What the Customer Claims</div>
                    <p className="text-[10px] opacity-70 leading-relaxed">
                      Cardholder claims that a fraudulent transaction of $847.99 occurred on her card, which she asserts she had in her possession at all times.
                    </p>
                    <div className="mt-2 pt-2 border-t border-black/5">
                      <div className="text-[9px] uppercase tracking-wider opacity-40 mb-1">Timeline</div>
                      <div className="space-y-0.5 text-[9px] opacity-60">
                        <div>• 09/02/2025 - Transaction occurred</div>
                        <div>• 09/08/2025 - Reported as fraudulent</div>
                        <div>• 01/13/2026 - Requests to reopen claim</div>
                      </div>
                    </div>
                  </div>

                  {/* Our Assessment */}
                  <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm overflow-hidden">
                    <div className="text-[9px] uppercase tracking-wider opacity-40 mb-1">Our Assessment</div>
                    <p className="text-[10px] opacity-70 leading-relaxed">
                      The evidence suggests inconsistencies in the cardholder's claims. Initial statements confirm card possession, but later communications indicate uncertainty.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[9px] opacity-40">Credibility:</span>
                      <span className="text-[10px] font-semibold" style={{color: colors.error}}>Low</span>
                    </div>
                  </div>

                  {/* Red Flags */}
                  <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider mb-1" style={{color: colors.error}}>
                      <Flag className="w-2.5 h-2.5" strokeWidth={1.5} />
                      Red Flags (2)
                    </div>
                    <div className="space-y-1.5 text-[9px]">
                      <div className="p-1.5 rounded-lg" style={{backgroundColor: 'rgba(155, 77, 77, 0.05)'}}>
                        <span className="opacity-70">Inconsistency in claims regarding card possession</span>
                        <span className="ml-1 opacity-40">[NOTE-1]</span>
                      </div>
                      <div className="p-1.5 rounded-lg" style={{backgroundColor: 'rgba(155, 77, 77, 0.05)'}}>
                        <span className="opacity-70">Merchant records confirm card was used</span>
                        <span className="ml-1 opacity-40">[CORR-4]</span>
                      </div>
                    </div>
                  </div>

                  {/* Supporting Factors */}
                  <div className="bg-white rounded-xl p-3 border border-black/5 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider mb-1" style={{color: colors.success}}>
                      <CheckCircle className="w-2.5 h-2.5" strokeWidth={1.5} />
                      Supporting Factors (2)
                    </div>
                    <div className="space-y-1.5 text-[9px]">
                      <div className="p-1.5 rounded-lg" style={{backgroundColor: 'rgba(61, 124, 94, 0.05)'}}>
                        <span className="opacity-70">Initially claimed card in possession</span>
                        <span className="ml-1 opacity-40">[NOTE-1]</span>
                      </div>
                      <div className="p-1.5 rounded-lg" style={{backgroundColor: 'rgba(61, 124, 94, 0.05)'}}>
                        <span className="opacity-70">No prior relationship with merchant</span>
                        <span className="ml-1 opacity-40">[INTAKE-Q2]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // PHASE 1 - Process detail
      case 'phase-1':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-4">
              <Badge>Steps 1-4</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Case Initiation & Classification</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { n: 1, title: 'Trigger & Capture', color: '#8B7355', items: ['Customer contact (call/chat/online)', 'Bank-detected anomaly or fraud alert', 'Capture: who, what txn, what happened', 'Immediate safeguards (card controls)'] },
                { n: 2, title: 'Classification', color: '#8B7355', items: ['Posture: Fraud vs Non-fraud vs ATM/EFT', 'Claim type: Drives investigation path', 'Scope: Single txn, series, duplicates', 'Maps to MC reason codes (4837, 4853, 4863...)'] },
                { n: 3, title: 'Eligibility Check', color: '#5B8A9A', items: ['Can bank still act internally?', 'Can bank still act externally (network)?', 'Merchant resolution attempted? (non-fraud)', 'Transaction posted vs pending?'] },
                { n: 4, title: 'Investigation Planning', color: '#5B8A9A', items: ['What facts must be established?', 'What supports customer reimbursement?', 'What supports external recovery?', 'Information sources identified'] },
              ].map((step, i) => (
                <Card key={i} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 flex items-center justify-center text-white text-xs font-bold"
                      style={{backgroundColor: step.color, borderRadius: '24px'}}
                    >
                      {step.n}
                    </div>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <ul className="text-xs space-y-0.5 opacity-70 pl-10">
                    {step.items.map((item, j) => <li key={j}>• {item}</li>)}
                  </ul>
                </Card>
              ))}
            </div>

            <Card className="text-center py-2" style={{backgroundColor: colors.creamSecondary}}>
              <span className="text-xs opacity-70">Output: Classified claim + Eligibility confirmed + Investigation checklist</span>
            </Card>
          </SlideCanvas>
        );

      // PHASE 2 - Process detail
      case 'phase-2':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Steps 5-7</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Early Screening & Evidence Evaluation</h2>
            </div>
            
            <div className="space-y-5">
              <Card className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor: '#9A5B5B', borderRadius: '24px'}}>5</div>
                  <h3 className="font-semibold">Early Screening</h3>
                </div>
                <div className="grid grid-cols-4 gap-3 pl-11">
                  {[
                    { label: 'STOP', desc: 'Time-bar, duplicate', bg: colors.creamSecondary },
                    { label: 'AUTO-APPROVE', desc: 'Bank error, conceded', bg: '#E8F5E9', color: '#2E7D32' },
                    { label: 'AUTO-DENY', desc: 'Contradictions', bg: '#FFEBEE', color: '#C62828' },
                    { label: 'INVESTIGATE', desc: 'Evidence needed', bg: '#E3F2FD', color: '#1565C0' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 text-center" style={{backgroundColor: item.bg, borderRadius: '16px'}}>
                      <div className="text-xs font-bold" style={{color: item.color || 'inherit'}}>{item.label}</div>
                      <div className="text-[10px] opacity-60">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <div className="grid grid-cols-2 gap-5">
                <Card className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor: '#7C6A9A', borderRadius: '24px'}}>6</div>
                    <h3 className="font-semibold">Evidence Gathering</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pl-11 text-xs">
                    <div>
                      <div className="font-semibold mb-1 opacity-70">Internal Sources</div>
                      <ul className="opacity-60 space-y-0.5">
                        <li>• Account/transaction data</li>
                        <li>• Customer profile</li>
                        <li>• Auth records, device tokens</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-1 opacity-70">External Sources</div>
                      <ul className="opacity-60 space-y-0.5">
                        <li>• Credit bureaus</li>
                        <li>• Identity verification</li>
                        <li>• Merchant communications</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                <Card className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor: '#7C6A9A', borderRadius: '24px'}}>7</div>
                    <h3 className="font-semibold">Evaluation</h3>
                  </div>
                  <ul className="text-xs space-y-1 opacity-70 pl-11">
                    <li>• <span className="font-semibold">Truth & Consistency:</span> Facts align with claim?</li>
                    <li>• <span className="font-semibold">Strong Link Standard:</span> 2+ strong links required</li>
                    <li>• <span className="font-semibold">Recoverability:</span> Can bank pursue recovery?</li>
                    <li>• <span className="font-semibold">Confidence:</span> High → Auto | Med → Review | Low → Escalate</li>
                  </ul>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );

      // PHASE 3 - Process detail
      case 'phase-3':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Steps 8-12</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Decisioning, Execution & Documentation</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { n: 8, title: 'Decisioning', color: '#2E7D32', items: ['Decision authority controls', 'Second-level review triggers', 'First-party fraud flagging'], showButtons: true },
                  { n: 9, title: 'Execution', color: '#2E7D32', items: ['Provisional/final credits', 'Fee reversals', 'Chargeback initiation', 'Required customer notices', '→ Mastercom API submission'] },
                  { n: 10, title: 'Lifecycle Mgmt', color: '#7C6A9A', items: ['Handle counterparty responses', 'Accept / Counter / Escalate', 'Update customer impact', 'Manage representments'] },
                ].map((step, i) => (
                  <Card key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: step.color, borderRadius: '24px'}}>{step.n}</div>
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                    </div>
                    {step.showButtons && (
                      <div className="flex gap-2 pl-10">
                        <span className="px-3 py-1 text-[10px] font-semibold" style={{backgroundColor: '#E8F5E9', color: '#2E7D32', borderRadius: '12px'}}>APPROVE</span>
                        <span className="px-3 py-1 text-[10px] font-semibold" style={{backgroundColor: '#FFEBEE', color: '#C62828', borderRadius: '12px'}}>DENY</span>
                      </div>
                    )}
                    <ul className="text-xs space-y-0.5 opacity-60 pl-10">
                      {step.items.map((item, j) => <li key={j}>• {item}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: 11, title: 'Documentation', color: '#00695C', items: ['Compile decision narrative: claimed → checked → found → decided', 'Record compliance essentials: dates, rationale, notices', 'Output: Audit-ready package for CFPB exams'] },
                  { n: 12, title: 'Closeout & Feedback', color: '#00695C', items: ['Mark final status, verify all actions complete', 'Tag trends: merchant issues, fraud patterns', 'Feed learnings back to improve routing/automation'] },
                ].map((step, i) => (
                  <Card key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: step.color, borderRadius: '24px'}}>{step.n}</div>
                      <h3 className="font-semibold text-sm">{step.title}</h3>
                    </div>
                    <ul className="text-xs space-y-0.5 opacity-60 pl-10">
                      {step.items.map((item, j) => <li key={j}>• {item}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </SlideCanvas>
        );

      // FEATURE RULES - Code + benefits layout
      case 'feature-rules':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Programmatic Rules</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Versionable & Auditable Logic</h2>
            </div>
            
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-7">
                <div className="p-6 font-mono text-xs" style={{backgroundColor: colors.charcoal, borderRadius: '24px', color: 'white'}}>
                  <div className="opacity-50 mb-1">// MC 4853 - Cardholder Dispute</div>
                  <div style={{color: '#4ADE80'}}>rule</div>
                  <div className="pl-4">"provisional_credit_eligible"</div>
                  <div className="pl-4 opacity-50">when:</div>
                  <div className="pl-8" style={{color: '#93C5FD'}}>dispute.reason_code = "4853"</div>
                  <div className="pl-8" style={{color: '#93C5FD'}}>dispute.amount &lt; $500</div>
                  <div className="pl-8" style={{color: '#93C5FD'}}>strong_links &gt;= 2</div>
                  <div className="pl-8" style={{color: '#93C5FD'}}>days_since_txn &lt; 120</div>
                  <div className="pl-4 opacity-50">then:</div>
                  <div className="pl-8" style={{color: '#FCD34D'}}>→ issue_provisional_credit</div>
                  <div className="pl-8" style={{color: '#FCD34D'}}>→ file_to_mastercom</div>
                  <div className="pl-8" style={{color: '#FCD34D'}}>→ log_decision_rationale</div>
                </div>
              </div>
              <div className="col-span-5 space-y-4">
                {[
                  { title: 'Transparent Logic', desc: 'Every decision follows explicit rules your compliance team can review and approve' },
                  { title: 'Version Control', desc: 'Git-style versioning. Know exactly what logic applied to any historical dispute' },
                  { title: 'Automated Testing', desc: 'Regression tests run before any rule goes live. No surprises in production' },
                ].map((item, i) => (
                  <Card key={i} className="space-y-1">
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs opacity-60">{item.desc}</p>
                  </Card>
                ))}
                <Card dark className="space-y-1">
                  <h4 className="font-semibold text-sm">Strong Link Standard</h4>
                  <p className="text-xs opacity-50">2+ strong evidentiary links required for customer-favorable decisions</p>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );

      // SIMULATIONS - Data slide
      case 'simulations':
        return (
          <SlideCanvas theme="secondary">
            <div className="flex flex-col gap-4">
              <Badge>Programmatic Advantage</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Simulation & What-If Analysis</h2>
              <p className="text-sm opacity-60 max-w-2xl">Because rules are programmatic and data is unified, you can simulate policy changes against historical data before deploying.</p>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <Card className="space-y-3">
                  <h3 className="font-semibold">What-If Scenarios</h3>
                  {[
                    { q: '"Raise auto-approve threshold from $500 to $750?"', a: '→ Impact on approval rate, loss rate, handle time' },
                    { q: '"Require only 1 strong link instead of 2?"', a: '→ Fraud exposure vs customer experience tradeoff' },
                    { q: '"Auto-deny repeat claimants with 3+ disputes?"', a: '→ Quantify false positive risk' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 border-l-4 border-black/10" style={{backgroundColor: colors.cream, borderRadius: '0 16px 16px 0'}}>
                      <div className="text-xs font-semibold">{item.q}</div>
                      <div className="text-[10px] opacity-50 mt-1">{item.a}</div>
                    </div>
                  ))}
                </Card>
              </div>
              <div className="col-span-6 space-y-4">
                <Card className="space-y-3">
                  <h3 className="font-semibold">Simulation Outputs</h3>
                  {[
                    { label: 'Approval Rate Change', value: '+12.3%', pct: 62, color: '#4CAF50' },
                    { label: 'Projected Loss Impact', value: '+$23K/mo', pct: 28, color: '#FF9800' },
                    { label: 'Handle Time Reduction', value: '-34%', pct: 75, color: '#2196F3' },
                  ].map((item, i) => (
                    <div key={i} className="p-2" style={{backgroundColor: colors.cream, borderRadius: '12px'}}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="opacity-60">{item.label}</span>
                        <span className="font-semibold" style={{color: item.color}}>{item.value}</span>
                      </div>
                      <div className="w-full h-1.5" style={{backgroundColor: '#e5e0da', borderRadius: '4px'}}>
                        <div className="h-1.5" style={{backgroundColor: item.color, width: `${item.pct}%`, borderRadius: '4px'}}></div>
                      </div>
                    </div>
                  ))}
                </Card>
                <div className="grid grid-cols-3 gap-3">
                  {['Zero Risk', 'Data-Driven', 'Fast Iteration'].map((item, i) => (
                    <Card key={i} className="text-center py-3">
                      <div className="text-sm" style={headerStyle}>{item}</div>
                      <div className="text-[10px] opacity-50">{['Test before going live', 'Quantify tradeoffs', 'Hundreds of scenarios'][i]}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </SlideCanvas>
        );

      // MASTERCOM - Process with highlight
      case 'mastercom':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Mastercard Integration</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Direct Mastercom API Submission</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between px-12">
                {[
                  { label: 'Intake', icon: FileText },
                  { label: 'Investigate', icon: Search },
                  { label: 'Decide', icon: CheckCircle },
                  { label: 'Mastercom', icon: Send, highlight: true },
                  { label: 'Lifecycle', icon: RotateCcw },
                  { label: 'Close', icon: Archive },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-12 h-12 flex items-center justify-center"
                      style={{
                        backgroundColor: step.highlight ? colors.charcoal : 'white',
                        color: step.highlight ? 'white' : colors.charcoal,
                        borderRadius: '24px',
                        border: step.highlight ? 'none' : '1px solid rgba(0,0,0,0.1)'
                      }}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-semibold ${step.highlight ? '' : 'opacity-60'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card dark className="space-y-3">
                  <h3 className="font-semibold">Case Filing Automation</h3>
                  <ul className="text-xs space-y-1 opacity-60">
                    <li>• Chargebacks, second presentments, pre-arb, arbitration</li>
                    <li>• All MC reason codes: 4837, 4853, 4863, 4870, 4871</li>
                    <li>• Automatic deadline tracking (45-day cycles)</li>
                    <li>• Response handling & escalation management</li>
                  </ul>
                </Card>
                <Card className="space-y-3">
                  <h3 className="font-semibold">Documentation Handling</h3>
                  <ul className="text-xs space-y-1 opacity-60">
                    <li>• Auto-generate evidence packages</li>
                    <li>• Transaction records, auth data, cardholder comms</li>
                    <li>• Supports .jpg, .tif, .pdf per MC specs</li>
                    <li>• One-click attach to case filing</li>
                  </ul>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );

      // EVIDENCE PACKAGES
      case 'evidence-packages':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-4">
              <Badge>Documentation Automation</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Auto-Generated Evidence Packages</h2>
              <p className="text-sm opacity-60 max-w-2xl">Every dispute requires a defensible evidence package. Salient automatically compiles, formats, and attaches documentation.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Database, title: 'Source Aggregation', items: ['Transaction & auth records', 'Device tokens & IP data', 'Customer communications', 'Account history & profile'] },
                  { icon: Eye, title: 'Evidence Provenance', items: ['Source system identified', 'Timestamp of retrieval', 'What each item shows', 'Link strength classification'] },
                  { icon: FileText, title: 'Audit-Ready Narrative', items: ['What was claimed', 'What was checked', 'What was found', 'Why we decided as we did'] },
                ].map((item, i) => (
                  <Card key={i} className="space-y-3">
                    <div className="w-10 h-10 flex items-center justify-center" style={{backgroundColor: colors.creamSecondary, borderRadius: '24px'}}>
                      <item.icon className="w-4 h-4 opacity-60" />
                    </div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <ul className="text-xs space-y-0.5 opacity-60">
                      {item.items.map((line, j) => <li key={j}>• {line}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="space-y-2">
                  <h3 className="font-semibold text-sm">Package by Claim Type</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2" style={{backgroundColor: colors.creamSecondary, borderRadius: '12px'}}>
                      <div className="font-semibold opacity-70 mb-1">Fraud (4837, 4863)</div>
                      <ul className="opacity-50">
                        <li>• Auth method & device info</li>
                        <li>• Velocity analysis</li>
                        <li>• Strong link docs</li>
                      </ul>
                    </div>
                    <div className="p-2" style={{backgroundColor: colors.creamSecondary, borderRadius: '12px'}}>
                      <div className="font-semibold opacity-70 mb-1">Non-Fraud (4853)</div>
                      <ul className="opacity-50">
                        <li>• Merchant comms</li>
                        <li>• Goods/services evidence</li>
                        <li>• Refund history</li>
                      </ul>
                    </div>
                  </div>
                </Card>
                <Card dark className="space-y-2">
                  <h3 className="font-semibold text-sm">Mastercom Formatting</h3>
                  <ul className="text-xs space-y-1 opacity-60">
                    {['Auto-converts to .jpg, .tif, .pdf', 'File size optimization', 'Structured naming conventions', 'Duplicate detection'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );

      // COMPLIANCE
      case 'compliance':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-4">
              <Badge>Compliance & Governance</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Why Compliance-First Matters for Disputes</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { title: 'Audit Risk', desc: 'Heavily scrutinized. Every case must be traceable' },
                  { title: 'Regulatory', desc: 'Direct customer impact with CFPB implications' },
                  { title: 'Visibility', desc: 'Limited insight without documentation' },
                  { title: 'Volume', desc: 'Small errors affect many customers' },
                ].map((item, i) => (
                  <Card key={i} className="space-y-1">
                    <div className="text-xs font-semibold">{item.title}</div>
                    <p className="text-[10px] opacity-50">{item.desc}</p>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="space-y-2">
                  <h3 className="font-semibold text-sm">Regulations Encoded</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    {[
                      ['Reg Z:', 'Credit card billing'], ['Reg E:', 'Debit/EFT resolution'],
                      ['FCRA:', 'Credit reporting'], ['GLBA:', 'Privacy'],
                      ['BSA:', 'Suspicious activity'], ['UDAAP:', 'Fair practices']
                    ].map(([label, value], i) => (
                      <div key={i}><span className="font-semibold opacity-70">{label}</span> <span className="opacity-50">{value}</span></div>
                    ))}
                  </div>
                </Card>
                <Card className="space-y-2">
                  <h3 className="font-semibold text-sm">Four Quality Dimensions</h3>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {['Compliance: Reg adherence', 'Procedural: Process steps', 'Documentation: Audit trail', 'Outcome: Correct decision'].map((item, i) => (
                      <div key={i} className="p-1.5" style={{backgroundColor: colors.creamSecondary, borderRadius: '8px'}}>{item}</div>
                    ))}
                  </div>
                </Card>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card dark className="space-y-2">
                  <h3 className="font-semibold text-sm">Zero-Tolerance Enforcement</h3>
                  <p className="text-xs opacity-50">Compliance failures <span className="text-white font-semibold">block case progression</span> until resolved</p>
                  <p className="text-[10px] opacity-30 italic">No workarounds or manual overrides</p>
                </Card>
                <Card className="space-y-2">
                  <h3 className="font-semibold text-sm">Audit-Ready Narrative</h3>
                  <ul className="text-xs space-y-0.5 opacity-60">
                    <li>• What was claimed?</li>
                    <li>• What was checked?</li>
                    <li>• What was found?</li>
                    <li>• Why did we decide?</li>
                  </ul>
                </Card>
                <Card className="space-y-2">
                  <h3 className="font-semibold text-sm">Auto-Escalation</h3>
                  <ul className="text-xs space-y-0.5 opacity-60">
                    <li>• Egregious → Leadership</li>
                    <li>• Patterns → Root cause</li>
                    <li>• Violations → Immediate flag</li>
                    <li>• Gaps → Rework queue</li>
                  </ul>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // COMPARISON - Before/After
      case 'comparison':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-4">
              <Badge>Comparison</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>Before & After Salient</h2>
            </div>

            <div className="grid grid-cols-2 gap-8 flex-1">
              <Card className="space-y-5 flex flex-col">
                <h3 className="text-xl font-semibold opacity-30" style={headerStyle}>Without Salient</h3>
                <ul className="space-y-3 text-sm opacity-60 flex-1">
                  {[
                    'Manual investigation (days to weeks)',
                    'Inconsistent decisions across analysts',
                    'Compliance gaps & exam risk',
                    '$25-40+ per dispute',
                    'No clear audit trail',
                    'Manual Mastercom case filing'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full opacity-40" style={{backgroundColor: colors.charcoal}}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card dark className="space-y-5 flex flex-col">
                <h3 className="text-xl font-semibold" style={headerStyle}>With Salient</h3>
                <ul className="space-y-3 text-sm opacity-70 flex-1">
                  {[
                    'Automated 12-step lifecycle (minutes)',
                    'Consistent, rule-based outcomes',
                    'Compliance encoded & enforced',
                    '60% cost reduction',
                    'Complete audit trail & versioning',
                    'Direct Mastercom API integration'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{color: colors.accent}} strokeWidth={1.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </SlideCanvas>
        );
      
      // VALUE PROP - ROI Data slide
      case 'value-prop':
        return (
          <SlideCanvas theme="secondary">
            <div className="flex flex-col gap-4">
              <Badge>Value Analysis</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>The Business Case for Yendo</h2>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-10">
              <div className="flex gap-16 justify-center">
                {[
                  { value: '60%', label: 'Cost Reduction', desc: '$30 → $12 per dispute' },
                  { value: '90%+', label: 'Faster Resolution', desc: 'Days reduced to minutes' },
                  { value: '100%', label: 'Audit Coverage', desc: 'Exam-ready documentation' },
                ].map((m, i) => (
                  <div key={i} className="flex flex-col gap-2 pl-8" style={{ borderLeft: `3px solid ${colors.accent}` }}>
                    <div className="text-6xl tracking-tight" style={{ fontFamily: 'Halant, Georgia, serif', lineHeight: '1', fontWeight: 500 }}>
                      {m.value}
                    </div>
                    <div className="font-bold uppercase tracking-widest text-[10px] opacity-50 mt-1">
                      {m.label}
                    </div>
                    <p className="text-sm opacity-60 max-w-[180px]">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Card dark className="py-8 px-12">
                <div className="text-xl font-medium mb-4 text-center">Projected Savings at Scale</div>
                <div className="flex items-center justify-center gap-8 text-base">
                  <div className="text-center">
                    <div className="opacity-50 text-sm mb-1">Volume</div>
                    <div className="font-semibold">5,000/mo</div>
                  </div>
                  <div className="opacity-30">×</div>
                  <div className="text-center">
                    <div className="opacity-50 text-sm mb-1">Savings</div>
                    <div className="font-semibold">$18/dispute</div>
                  </div>
                  <div className="opacity-30">=</div>
                  <div className="text-center">
                    <div className="opacity-50 text-sm mb-1">Monthly</div>
                    <div className="font-semibold" style={{color: colors.accent}}>$90,000</div>
                  </div>
                  <div className="opacity-30">→</div>
                  <div className="text-center">
                    <div className="opacity-50 text-sm mb-1">Annual</div>
                    <div className="font-semibold" style={{color: colors.accent}}>$1.08M</div>
                  </div>
                </div>
                <div className="text-center mt-4 opacity-40 text-sm">
                  Based on $30 manual cost → $12 with Salient
                </div>
              </Card>
            </div>
          </SlideCanvas>
        );
      
      // CLOSING SLIDE - Dark, memorable finish
      case 'takeaways':
        return (
          <SlideCanvas theme="dark">
            <Badge light>Key Takeaways</Badge>

            <div className="flex-1 flex flex-col justify-center gap-10">
              <h2 className="text-6xl" style={headerStyle}>Why Salient for Yendo?</h2>

              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Zap, title: '12-Step Automation', desc: 'End-to-end dispute lifecycle' },
                  { icon: CheckCircle, title: 'Evidence-Based', desc: '2+ strong links standard' },
                  { icon: Shield, title: 'Compliance-First', desc: 'Reg Z, E, CFPB built-in' },
                  { icon: Layers, title: 'Mastercom Direct', desc: 'API case filing & lifecycle' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                      style={{backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '24px'}}
                    >
                      <item.icon className="w-5 h-5 opacity-50" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs opacity-40">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4 mt-4">
                <div className="text-2xl opacity-60" style={headerStyle}>
                  Faster, more accurate decisions at a lower per-dispute cost.
                </div>
                <div
                  className="inline-flex items-center gap-2 px-6 py-3 mt-4 text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.charcoal,
                    borderRadius: '24px',
                  }}
                >
                  Let's discuss next steps
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </SlideCanvas>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col" style={{backgroundColor: colors.creamSecondary}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Halant:wght@300;400;500;600;700&display=swap');

        .slide-container {
          animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="flex-1 p-4">
        <div
          key={current}
          className="slide-container w-full h-full overflow-hidden"
          style={{
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)'
          }}
        >
          {renderSlide()}
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3" style={{backgroundColor: colors.charcoal}}>
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-sm disabled:opacity-20 transition-all duration-200 hover:bg-white/15"
          style={{backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '24px'}}
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} /> Prev
        </button>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2 h-2 transition-all duration-300 hover:scale-125"
              style={{
                backgroundColor: i === current ? colors.accent : 'rgba(255,255,255,0.25)',
                borderRadius: '50%',
                transform: i === current ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium disabled:opacity-20 transition-all duration-200 hover:opacity-90"
          style={{backgroundColor: colors.cream, color: colors.charcoal, borderRadius: '24px'}}
        >
          Next <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
