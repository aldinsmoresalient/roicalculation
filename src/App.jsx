import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Clock, DollarSign, Shield, Zap, CheckCircle, FileText, TrendingDown, Users, Scale, Car, CreditCard, Database, Settings, Search, Send, RotateCcw, Archive, Brain, Eye, Layers } from 'lucide-react';

// Salient Brand Colors
const colors = {
  cream: '#FAF6F2',
  creamSecondary: '#F6F0E9',
  charcoal: '#0F0F0F',
  muted: 'rgba(15, 15, 15, 0.6)',
};

// Slide Canvas - Base container with consistent padding and typography
const SlideCanvas = ({ children, theme = 'light' }) => (
  <div 
    className="w-full h-full p-12 flex flex-col justify-between overflow-hidden"
    style={{
      backgroundColor: theme === 'light' ? colors.cream : theme === 'secondary' ? colors.creamSecondary : colors.charcoal,
      color: theme === 'dark' ? 'white' : colors.charcoal,
      fontFamily: 'Geist, system-ui, sans-serif',
    }}
  >
    {children}
  </div>
);

// Badge Component - Breadcrumb for slide context
const Badge = ({ children, light = false }) => (
  <span 
    className="px-3 py-1 text-[10px] uppercase tracking-widest font-semibold w-fit"
    style={{
      backgroundColor: light ? 'rgba(255,255,255,0.15)' : colors.charcoal,
      color: light ? 'white' : 'white',
      borderRadius: '24px',
    }}
  >
    {children}
  </span>
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

// Card Component with consistent 24px radius
const Card = ({ children, dark = false, className = '' }) => (
  <div 
    className={`p-5 ${className}`}
    style={{
      backgroundColor: dark ? colors.charcoal : 'white',
      color: dark ? 'white' : colors.charcoal,
      borderRadius: '24px',
      border: dark ? 'none' : '1px solid rgba(0,0,0,0.05)',
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

  const headerStyle = { fontFamily: 'Halant, Georgia, serif', lineHeight: '0.95' };

  const renderSlide = () => {
    const slide = slides[current];
    
    switch(slide.type) {
      // TITLE SLIDE - Centered, High-impact opening
      case 'title':
        return (
          <SlideCanvas theme="light">
            <div></div>
            <div className="flex flex-col items-center text-center gap-6">
              <span 
                className="text-2xl font-semibold tracking-[0.3em]"
                style={{ fontFamily: 'Halant, Georgia, serif', color: colors.charcoal }}
              >
                SALIENT
              </span>
              <h1 
                className="text-7xl max-w-4xl"
                style={headerStyle}
              >
                AI-Powered Dispute Resolution
              </h1>
              <p className="text-xl opacity-60 max-w-2xl">
                Built for Yendo's Vehicle-Secured Credit Card
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/5 text-sm" style={{borderRadius: '24px'}}>
                  <CreditCard className="w-4 h-4 opacity-60" />
                  <span className="opacity-80">Mastercard Network</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-black/5 text-sm" style={{borderRadius: '24px'}}>
                  <Car className="w-4 h-4 opacity-60" />
                  <span className="opacity-80">Vehicle-Secured Lending</span>
                </div>
              </div>
            </div>
            <div></div>
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
                  <p className="text-sm">When we partner with data & tech-first companies like Yendo, we ship in <span className="font-semibold">weeks—not years</span>.</p>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // PROBLEM SLIDE
      case 'problem':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>The Problem</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>Disputes Today: Manual & Unstructured</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: AlertTriangle, title: 'Manual Investigation', desc: 'Analysts dig through multiple systems, relying on tribal knowledge and inconsistent judgment calls.' },
                { icon: Users, title: 'Often Outsourced', desc: 'Third-party vendors lack context on vehicle-secured nuances and compliance standards.' },
                { icon: FileText, title: 'No Audit Trail', desc: 'Decision rationale lives in emails and analyst memory—not exam-ready.' },
              ].map((item, i) => (
                <Card key={i} className="space-y-4">
                  <div className="w-12 h-12 flex items-center justify-center" style={{backgroundColor: colors.creamSecondary, borderRadius: '24px'}}>
                    <item.icon className="w-5 h-5 opacity-60" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </SlideCanvas>
        );
      
      // IMPACT SLIDE - Data with metrics
      case 'impact':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>The Impact</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>The Real Cost of Status Quo</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Clock, title: 'Slow Resolution', desc: 'MC allows 45-day cycles—manual burns time', dark: false },
                { icon: TrendingDown, title: 'Poor CX', desc: 'Underserved customers need fast, fair outcomes', dark: false },
                { icon: Scale, title: 'Compliance Risk', desc: 'Reg Z, Reg E, CFPB exam exposure', dark: true },
                { icon: DollarSign, title: 'High Cost', desc: '$25-40+ per dispute with manual processes', dark: false },
              ].map((item, i) => (
                <Card key={i} dark={item.dark} className="flex items-center gap-6">
                  <div 
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: item.dark ? 'rgba(255,255,255,0.1)' : colors.creamSecondary, 
                      borderRadius: '24px'
                    }}
                  >
                    <item.icon className="w-6 h-6 opacity-60" />
                  </div>
                  <div>
                    <h3 className="text-xl" style={headerStyle}>{item.title}</h3>
                    <p className="text-sm opacity-60">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </SlideCanvas>
        );
      
      // TRANSITION SLIDE - Dark mode, reset the room
      case 'solution-intro':
        return (
          <SlideCanvas theme="dark">
            <Badge light>The Solution</Badge>
            <div className="flex flex-col items-center text-center gap-6">
              <span 
                className="text-2xl font-semibold tracking-[0.3em] opacity-80"
                style={{ fontFamily: 'Halant, Georgia, serif' }}
              >
                SALIENT
              </span>
              <h1 className="text-6xl max-w-3xl" style={headerStyle}>
                AI agents built for US consumer lenders.
              </h1>
              <p className="text-lg opacity-50 max-w-2xl">
                End-to-end dispute lifecycle automation with compliance-first AI that fits how lenders are supervised and examined.
              </p>
            </div>
            <div></div>
          </SlideCanvas>
        );

      // WHY SALIENT - Feature slide
      case 'why-salient':
        return (
          <SlideCanvas theme="dark">
            <div className="flex flex-col gap-6">
              <Badge light>Why Salient</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Purpose-built AI for regulated lending</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Compliance-first for US lending', desc: 'Built around the realities of US consumer-lending regulation and supervision—CFPB, OCC, FDIC, NCUA, and state regulators.' },
                { icon: Settings, title: 'Back-office workflow automation', desc: 'Our agents run full workflows end-to-end—from intake through documentation and system updates.' },
                { icon: Brain, title: 'Borrower-level memory', desc: 'Every interaction is informed by history: prior calls, promises, hardship notes, disputes, and claims.' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="p-6 space-y-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '24px'}}
                  >
                    <item.icon className="w-5 h-5 opacity-60" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </SlideCanvas>
        );

      // LIFECYCLE OVERVIEW - Process slide
      case 'lifecycle-overview':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Product Overview</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>12-Step Dispute Lifecycle</h2>
            </div>
            
            <div className="grid grid-cols-6 gap-4">
              {[
                { phase: 'INITIATION', steps: [{ n: '01', t: 'Trigger & Capture', d: 'Intake from any channel' }, { n: '02', t: 'Classification', d: 'Claim type + posture' }] },
                { phase: 'ELIGIBILITY', steps: [{ n: '03', t: 'Eligibility Check', d: 'Time windows & prerequisites' }, { n: '04', t: 'Planning', d: 'Investigation objectives' }] },
                { phase: 'SCREENING', steps: [{ n: '05', t: 'Early Screening', d: 'Auto-deny, approve, or route' }] },
                { phase: 'INVESTIGATION', steps: [{ n: '06', t: 'Evidence Gathering', d: 'Fact gathering & verification' }, { n: '07', t: 'Evaluation', d: 'Truth & recoverability' }] },
                { phase: 'DECISION', steps: [{ n: '08', t: 'Decisioning', d: 'Approve/deny with controls' }, { n: '09', t: 'Execution', d: 'Credits, recovery, notices' }] },
                { phase: 'CLOSEOUT', steps: [{ n: '10', t: 'Lifecycle Mgmt', d: 'Responses & escalations' }, { n: '11', t: 'Documentation', d: 'Audit-ready narrative' }, { n: '12', t: 'Closeout', d: 'Final status & learnings' }], dark: true },
              ].map((group, i) => (
                <Card key={i} dark={group.dark} className="space-y-3">
                  <div className="text-[10px] font-bold tracking-widest opacity-50">{group.phase}</div>
                  <div className="space-y-3">
                    {group.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span className="text-sm opacity-30" style={headerStyle}>{step.n}</span>
                        <div>
                          <div className="text-xs font-semibold">{step.t}</div>
                          <div className="text-[10px] opacity-50">{step.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </SlideCanvas>
        );

      // PHASE 1 - Process detail
      case 'phase-1':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-6">
              <Badge>Steps 1-4</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>Case Initiation & Classification</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              {[
                { n: 1, title: 'Trigger & Capture', color: '#8B7355', items: ['Customer contact (call/chat/online)', 'Bank-detected anomaly or fraud alert', 'Capture: who, what txn, what happened', 'Immediate safeguards (card controls)'] },
                { n: 2, title: 'Classification', color: '#8B7355', items: ['Posture: Fraud vs Non-fraud vs ATM/EFT', 'Claim type: Drives investigation path', 'Scope: Single txn, series, duplicates', 'Maps to MC reason codes (4837, 4853, 4863...)'] },
                { n: 3, title: 'Eligibility Check', color: '#5B8A9A', items: ['Can bank still act internally?', 'Can bank still act externally (network)?', 'Merchant resolution attempted? (non-fraud)', 'Transaction posted vs pending?'] },
                { n: 4, title: 'Investigation Planning', color: '#5B8A9A', items: ['What facts must be established?', 'What supports customer reimbursement?', 'What supports external recovery?', 'Information sources identified'] },
              ].map((step, i) => (
                <Card key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold"
                      style={{backgroundColor: step.color, borderRadius: '24px'}}
                    >
                      {step.n}
                    </div>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <ul className="text-xs space-y-1 opacity-70 pl-11">
                    {step.items.map((item, j) => <li key={j}>• {item}</li>)}
                  </ul>
                </Card>
              ))}
            </div>
            
            <Card className="text-center py-3" style={{backgroundColor: colors.creamSecondary}}>
              <span className="text-sm opacity-70">Output: Classified claim + Eligibility confirmed + Investigation checklist</span>
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
                  { title: 'Version Control', desc: 'Git-style versioning—know exactly what logic applied to any historical dispute' },
                  { title: 'Automated Testing', desc: 'Regression tests run before any rule goes live—no surprises in production' },
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
                  { title: 'Audit Risk', desc: 'Heavily scrutinized—every case must be traceable' },
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
                  <h3 className="font-semibold text-sm">Zero-Tolerance Rule</h3>
                  <p className="text-xs opacity-50">Any "NO" on compliance = <span className="text-white font-semibold">ZERO points</span> for entire category</p>
                  <p className="text-[10px] opacity-30 italic">Cannot be offset by operational excellence</p>
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
            <div className="flex flex-col gap-6">
              <Badge>Comparison</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>Before & After Salient</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <Card className="space-y-4">
                <h3 className="text-lg font-semibold opacity-40">Without Salient</h3>
                <ul className="space-y-2 text-sm opacity-70">
                  {[
                    'Manual investigation (days to weeks)',
                    'Inconsistent decisions across analysts',
                    'Compliance gaps & exam risk',
                    '$25-40+ per dispute',
                    'No clear audit trail',
                    'Manual Mastercom case filing'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-black/20" style={{borderRadius: '50%'}}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card dark className="space-y-4">
                <h3 className="text-lg font-semibold">With Salient</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  {[
                    'Automated 12-step lifecycle (minutes)',
                    'Consistent, rule-based outcomes',
                    'Compliance encoded & enforced',
                    '60-80% cost reduction',
                    'Complete audit trail & versioning',
                    'Direct Mastercom API integration'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
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
            <div className="flex flex-col gap-6">
              <Badge>Value Analysis</Badge>
              <h2 className="text-5xl max-w-3xl" style={headerStyle}>The Business Case for Yendo</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-12 justify-center">
                <Metric value="60-80%" label="Cost Reduction" description="↓ per dispute processing" />
                <Metric value="90%" label="Faster Resolution" description="↓ days to minutes" />
                <Metric value="100%" label="Audit Coverage" description="↑ exam-ready" />
              </div>
              
              <Card dark className="text-center py-6">
                <div className="text-lg font-semibold mb-1">Example: 5,000 disputes/month as Yendo scales</div>
                <div className="opacity-60">At $30/dispute manual → $8/dispute with Salient = <span className="font-bold text-green-400">$110,000/month saved</span></div>
              </Card>
            </div>
          </SlideCanvas>
        );
      
      // CLOSING SLIDE - Dark, memorable finish
      case 'takeaways':
        return (
          <SlideCanvas theme="dark">
            <Badge light>Key Takeaways</Badge>
            
            <div className="space-y-8">
              <h2 className="text-5xl" style={headerStyle}>Why Salient for Yendo?</h2>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Zap, title: '12-Step Automation', desc: 'End-to-end dispute lifecycle' },
                  { icon: CheckCircle, title: 'Evidence-Based', desc: '2+ strong links standard' },
                  { icon: Shield, title: 'Compliance-First', desc: 'Reg Z, E, CFPB built-in' },
                  { icon: Layers, title: 'Mastercom Direct', desc: 'API case filing & lifecycle' },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-4"
                    style={{backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)'}}
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '24px'}}>
                      <item.icon className="w-5 h-5 opacity-60" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs opacity-50">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <div className="text-xl opacity-70" style={headerStyle}>Faster, more accurate decisions at a lower per-dispute cost.</div>
              <div className="text-sm opacity-40">Let's discuss next steps.</div>
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
      `}</style>
      <div className="flex-1 p-4">
        <div className="w-full h-full shadow-2xl overflow-hidden" style={{borderRadius: '24px'}}>
          {renderSlide()}
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3" style={{backgroundColor: colors.charcoal}}>
        <button 
          onClick={prev} 
          disabled={current === 0} 
          className="flex items-center gap-2 px-4 py-2 text-white text-sm disabled:opacity-30 transition-colors"
          style={{backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '24px'}}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)} 
              className="w-2 h-2 transition-colors"
              style={{
                backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.3)',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>
        <button 
          onClick={next} 
          disabled={current === slides.length - 1} 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium disabled:opacity-30 transition-colors"
          style={{backgroundColor: colors.cream, color: colors.charcoal, borderRadius: '24px'}}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
