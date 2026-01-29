import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Clock, DollarSign, Shield, Zap, CheckCircle, FileText, TrendingDown, Users, Scale, CreditCard, Database, Settings, Search, Send, RotateCcw, Archive, Brain, Eye, Layers, XCircle, Flag, User, Mail, Phone, MapPin, File, MessageSquare, TrendingUp, Target, Upload, Filter, Download, Globe, BarChart3, ArrowLeft, ThumbsUp, ThumbsDown, RefreshCw, ChevronDown, Store, Wifi } from 'lucide-react';

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
  { id: 'ideal-partner', type: 'ideal-partner' },
  { id: 'problem', type: 'problem' },
  { id: 'impact', type: 'impact' },
  { id: 'solution-intro', type: 'solution-intro' },
  { id: 'why-salient', type: 'why-salient' },
  { id: 'lifecycle-overview', type: 'lifecycle-overview' },
  { id: 'product-dashboard', type: 'product-dashboard' },
  { id: 'claims-ui', type: 'claims-ui' },
  { id: 'product-reporting', type: 'product-reporting' },
  { id: 'product-trends', type: 'product-trends' },
  { id: 'phase-1', type: 'phase-1' },
  { id: 'phase-2', type: 'phase-2' },
  { id: 'phase-3', type: 'phase-3' },
  { id: 'feature-rules', type: 'feature-rules' },
  { id: 'simulations', type: 'simulations' },
  { id: 'mastercom', type: 'mastercom' },
  { id: 'evidence-packages', type: 'evidence-packages' },
  { id: 'compliance', type: 'compliance' },
  { id: 'comparison', type: 'comparison' },
  { id: 'business-case', type: 'business-case' },
  { id: 'takeaways', type: 'takeaways' },
];

// Fixed slide dimensions (16:9 aspect ratio)
const SLIDE_WIDTH = 1200;
const SLIDE_HEIGHT = 675;
const NAV_HEIGHT = 56;

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [scale, setScale] = useState(1);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(slides.length - 1, c + 1));

  // Calculate scale to fit viewport while maintaining aspect ratio
  useEffect(() => {
    const updateScale = () => {
      const padding = 32; // 16px on each side
      const availableWidth = window.innerWidth - padding;
      const availableHeight = window.innerHeight - NAV_HEIGHT - padding;

      const scaleX = availableWidth / SLIDE_WIDTH;
      const scaleY = availableHeight / SLIDE_HEIGHT;

      // Use the smaller scale to ensure slide fits both dimensions
      setScale(Math.min(scaleX, scaleY, 1)); // Cap at 1 to prevent scaling up
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Touch/swipe navigation
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only trigger if horizontal swipe is dominant and exceeds threshold
    const minSwipeDistance = 50;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        prev(); // Swipe right = previous slide
      } else {
        next(); // Swipe left = next slide
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

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
                End-to-End Automation for Consumer Lenders
              </p>
              <div className="flex items-center gap-4 mt-8">
                {[
                  { icon: CreditCard, label: 'Credit Cards' },
                  { icon: DollarSign, label: 'Consumer Loans' },
                  { icon: Shield, label: 'Compliance-First' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-2.5 text-sm transition-all duration-200"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '24px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                    }}
                  >
                    <item.icon className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                    <span className="opacity-70">{item.label}</span>
                  </div>
                ))}
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
                { num: '01', title: 'The Opportunity', desc: 'Why data-first lenders unlock better outcomes' },
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
      
      // IDEAL PARTNER - Data slide with characteristics
      case 'ideal-partner':
        return (
          <SlideCanvas theme="secondary">
            <div className="flex flex-col gap-4">
              <Badge>Ideal Partner</Badge>
              <h2 className="text-4xl max-w-3xl" style={headerStyle}>The Right Fit for AI-Powered Disputes</h2>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1">
              {/* Left side - Bottleneck vs Great Partner */}
              <div className="col-span-5 flex flex-col gap-4">
                <Card className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(155,77,77,0.1)' }}>
                      <XCircle className="w-3 h-3" style={{ color: colors.error }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-sm opacity-70">THE USUAL BOTTLENECK</h3>
                  </div>
                  <p className="text-xs opacity-50">Most dispute automation projects stall because legacy lenders have:</p>
                  <ul className="text-xs space-y-2 opacity-80">
                    {[
                      { text: 'Fragmented data across siloed systems', sub: 'No single source of truth' },
                      { text: '12-18 month integration timelines', sub: 'Slow procurement cycles' },
                      { text: 'Risk-averse IT governance', sub: 'Change aversion' },
                      { text: 'Manual processes embedded in culture', sub: 'Tribal knowledge dependency' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(155,77,77,0.05)' }}>
                        <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.error, opacity: 0.5 }} strokeWidth={1.5} />
                        <div>
                          <div>{item.text}</div>
                          <div className="text-[10px] opacity-50">{item.sub}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card dark className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full" style={{ backgroundColor: colors.accentMuted }}>
                      <CheckCircle className="w-3 h-3" style={{ color: colors.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-sm opacity-70">WHAT MAKES A GREAT PARTNER</h3>
                  </div>
                  <ul className="text-xs space-y-2 opacity-80">
                    {[
                      { text: 'Unified or accessible data layer', sub: 'Clean integration points' },
                      { text: 'API-first architecture', sub: 'Modern infrastructure' },
                      { text: 'Openness to AI-driven automation', sub: 'Innovation mindset' },
                      { text: 'Engineering-led decision making', sub: 'Technical partnership' },
                      { text: 'Speed as a competitive advantage', sub: 'Move fast, iterate' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} strokeWidth={1.5} />
                        <div>
                          <div>{item.text}</div>
                          <div className="text-[10px] opacity-40">{item.sub}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Right side - Metrics and value */}
              <div className="col-span-7 flex flex-col gap-4">
                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '60%', label: 'Cost Reduction', icon: TrendingDown, desc: '$30 → $12 per dispute' },
                    { value: '90%+', label: 'Faster Resolution', icon: Zap, desc: 'Days reduced to minutes' },
                    { value: '100%', label: 'Audit Coverage', icon: Shield, desc: 'Every decision documented' },
                  ].map((m, i) => (
                    <Card key={i} className="text-center p-4">
                      <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: colors.accentMuted, borderRadius: '20px' }}>
                        <m.icon className="w-4 h-4" style={{ color: colors.accent }} strokeWidth={1.5} />
                      </div>
                      <div className="text-3xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: colors.accent }}>{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wider opacity-50 mt-1">{m.label}</div>
                      <div className="text-[10px] opacity-40 mt-1">{m.desc}</div>
                    </Card>
                  ))}
                </div>

                {/* Timeline comparison */}
                <Card className="flex-1 p-5">
                  <h4 className="font-semibold text-sm mb-4">Implementation Timeline</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="opacity-60">Legacy Lender (typical)</span>
                        <span className="font-semibold" style={{ color: colors.error }}>12-18 months</span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: colors.creamSecondary }}>
                        <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: `${colors.error}40` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="opacity-60">Data-first Partner</span>
                        <span className="font-semibold" style={{ color: colors.success }}>4-8 weeks</span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: colors.creamSecondary }}>
                        <div className="h-full rounded-full" style={{ width: '15%', backgroundColor: colors.success }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center gap-3">
                    <Zap className="w-4 h-4" style={{ color: colors.accent }} strokeWidth={1.5} />
                    <span className="text-sm"><span className="font-semibold">10x faster</span> time to value with the right partner</span>
                  </div>
                </Card>

                {/* Bottom callout */}
                <Card dark className="text-center py-3">
                  <p className="text-sm">When we partner with data & tech-first lenders, we ship in <span className="font-semibold" style={{ color: colors.accent }}>weeks, not years</span>.</p>
                </Card>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // PROBLEM SLIDE
      case 'problem':
        return (
          <SlideCanvas theme="light">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-3">
                <Badge>The Problem</Badge>
                <h2 className="text-4xl max-w-xl" style={headerStyle}>Disputes Today: Manual & Unstructured</h2>
              </div>

              {/* Metrics row - now positioned to the right */}
              <div className="flex gap-6">
                {[
                  { value: '5-10', unit: 'days', label: 'Avg. resolution' },
                  { value: '$25-40+', unit: '', label: 'Per dispute' },
                  { value: '3-5', unit: 'systems', label: 'Per case' },
                ].map((m, i) => (
                  <div key={i} className="text-right pl-4" style={{ borderLeft: `2px solid ${colors.error}20` }}>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-2xl font-semibold" style={{ ...headerStyle, color: colors.error }}>{m.value}</span>
                      {m.unit && <span className="text-sm opacity-40">{m.unit}</span>}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider opacity-40">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain points */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: AlertTriangle, title: 'Manual Investigation', desc: 'Analysts toggle between systems with tribal knowledge.', consequence: 'Slow & expensive' },
                { icon: Users, title: 'Often Outsourced', desc: 'BPO implementations are hard to monitor.', consequence: 'Quality drift' },
                { icon: FileText, title: 'No Audit Trail', desc: 'Decision rationale lives in emails and memory.', consequence: 'Exam exposure' },
                { icon: Scale, title: 'Inconsistent Outcomes', desc: 'Same facts, different analysts, different results.', consequence: 'Compliance risk' },
              ].map((item, i) => (
                <Card key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: 'rgba(155,77,77,0.08)', borderRadius: '16px' }}>
                      <item.icon className="w-4 h-4" style={{ color: colors.error, opacity: 0.7 }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-xs opacity-50 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-black/5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.error }}></div>
                    <span className="text-[10px] font-medium" style={{ color: colors.error }}>{item.consequence}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Callout */}
            <Card dark className="flex items-center justify-center gap-3 py-3">
              <AlertTriangle className="w-4 h-4" style={{ color: colors.accent }} strokeWidth={1.5} />
              <p className="text-sm">Every manual touchpoint is a <span className="font-semibold" style={{ color: colors.accent }}>compliance risk</span> and a <span className="font-semibold" style={{ color: colors.accent }}>cost multiplier</span>.</p>
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
            {/* Subtle decorative element */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
              style={{ background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)` }}
            />
            <div className="flex flex-col items-center text-center gap-8 relative z-10">
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
              <div className="flex items-center gap-6 mt-6">
                {['Reg Z & E Compliant', 'CFPB Exam-Ready', 'Mastercom Integrated'].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 text-xs"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <CheckCircle className="w-3 h-3 opacity-50" strokeWidth={1.5} />
                    <span className="opacity-60">{item}</span>
                  </div>
                ))}
              </div>
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

            <div className="grid grid-cols-3 gap-5 flex-1">
              {[
                {
                  icon: Shield,
                  title: 'Compliance-first for US lending',
                  desc: 'Built around the realities of US consumer-lending regulation and supervision.',
                  details: ['CFPB examination readiness', 'OCC, FDIC, NCUA aligned', 'State regulator requirements', 'Reg Z & Reg E encoded'],
                  highlight: 'Zero compliance shortcuts'
                },
                {
                  icon: Settings,
                  title: 'Back-office workflow automation',
                  desc: 'Our agents run full workflows end-to-end, from intake through documentation.',
                  details: ['12-step dispute lifecycle', 'Mastercom API integration', 'Evidence package generation', 'Decision documentation'],
                  highlight: '10 of 12 steps automated'
                },
                {
                  icon: Brain,
                  title: 'Borrower-level memory',
                  desc: 'Every interaction is informed by history across all touchpoints.',
                  details: ['Prior disputes & claims', 'Call history & promises', 'Hardship notes', 'Account behavior patterns'],
                  highlight: 'Full context, every time'
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 flex flex-col"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: i === 0 ? colors.accentMuted : 'rgba(255,255,255,0.08)', borderRadius: '24px' }}
                  >
                    <item.icon className="w-5 h-5" style={{ opacity: i === 0 ? 1 : 0.5, color: i === 0 ? colors.accent : 'white' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-40 leading-relaxed mb-4">{item.desc}</p>

                  <div className="flex-1 space-y-2 mb-4">
                    {item.details.map((detail, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: colors.accent }} strokeWidth={1.5} />
                        <span className="opacity-60">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-auto pt-4 border-t border-white/10 text-center"
                  >
                    <span className="text-xs font-medium" style={{ color: colors.accent }}>{item.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stats bar */}
            <div className="flex items-center justify-center gap-12 py-3 px-6" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
              {[
                { label: 'Regulations Encoded', value: '6+' },
                { label: 'Exam-Ready Documentation', value: '100%' },
                { label: 'Steps Automated', value: '10/12' },
                { label: 'Time to Value', value: '4-8 weeks' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-semibold" style={{ color: colors.accent }}>{stat.value}</div>
                  <div className="text-[10px] opacity-40 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </SlideCanvas>
        );

      // LIFECYCLE OVERVIEW - Process slide
      case 'lifecycle-overview':
        return (
          <SlideCanvas theme="light">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Badge>Product Overview</Badge>
                <h2 className="text-4xl max-w-xl" style={headerStyle}>12-Step Dispute Lifecycle</h2>
              </div>
              {/* Quick stats */}
              <div className="flex gap-4">
                {[
                  { value: '10/12', label: 'Automated', color: colors.success },
                  { value: '2', label: 'Review', color: colors.accent },
                  { value: '< 10 min', label: 'Total Time', color: colors.charcoal },
                ].map((stat, i) => (
                  <div key={i} className="text-center px-3">
                    <div className="text-xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: stat.color }}>{stat.value}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main phases with flow */}
            <div className="flex items-stretch gap-2 flex-1">
              {[
                {
                  phase: 'INTAKE',
                  color: '#8B7355',
                  time: '< 1 min',
                  steps: [
                    { n: '01', t: 'Trigger & Capture', auto: true, desc: 'Call, chat, alert' },
                    { n: '02', t: 'Classification', auto: true, desc: 'Fraud vs non-fraud' },
                    { n: '03', t: 'Eligibility Check', auto: true, desc: 'Can we act?' },
                    { n: '04', t: 'Planning', auto: true, desc: 'Investigation path' },
                  ],
                  output: 'Classified claim'
                },
                {
                  phase: 'INVESTIGATION',
                  color: '#5B8A9A',
                  time: '1-5 min',
                  steps: [
                    { n: '05', t: 'Early Screening', auto: true, desc: 'Quick wins/stops' },
                    { n: '06', t: 'Evidence Gathering', auto: true, desc: 'Data collection' },
                    { n: '07', t: 'Evaluation', auto: false, desc: 'Confidence scoring' },
                  ],
                  output: 'Evidence package'
                },
                {
                  phase: 'RESOLUTION',
                  color: '#2E7D32',
                  time: '< 1 min',
                  steps: [
                    { n: '08', t: 'Decisioning', auto: false, desc: 'Approve/Deny' },
                    { n: '09', t: 'Execution', auto: true, desc: 'Credits, notices' },
                  ],
                  output: 'Decision + credits'
                },
                {
                  phase: 'CLOSEOUT',
                  color: colors.charcoal,
                  time: 'Ongoing',
                  steps: [
                    { n: '10', t: 'Lifecycle Mgmt', auto: true, desc: 'Responses, escalations' },
                    { n: '11', t: 'Documentation', auto: true, desc: 'Audit narrative' },
                    { n: '12', t: 'Closeout', auto: true, desc: 'Final status' },
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
                    <div className="space-y-1.5 flex-1">
                      {group.steps.map((step, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 p-1.5 rounded-lg"
                          style={{ backgroundColor: i === 3 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                        >
                          <span className="text-[9px] opacity-30 w-4 pt-0.5">{step.n}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-medium">{step.t}</span>
                              <span
                                className="text-[7px] px-1 py-0.5 rounded-full flex-shrink-0"
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
                            <div className="text-[8px] opacity-40">{step.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Output */}
                    <div
                      className="mt-2 pt-2 text-[10px] text-center border-t"
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
              <div className="flex items-center gap-8">
                {[
                  { icon: Clock, label: 'Total time', value: 'Minutes, not days' },
                  { icon: Zap, label: 'Automation', value: '10 of 12 steps' },
                  { icon: Shield, label: 'Audit coverage', value: '100%' },
                  { icon: FileText, label: 'Documentation', value: 'Auto-generated' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 opacity-40" strokeWidth={1.5} />
                    <span className="text-xs opacity-40">{item.label}:</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </SlideCanvas>
        );

      // PRODUCT DASHBOARD - Claims Dashboard
      case 'product-dashboard':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-2">
              <Badge>Claims Queue</Badge>
              <h2 className="text-4xl max-w-xl" style={headerStyle}>Unified Claims Dashboard</h2>
              <p className="text-sm opacity-50 max-w-lg">Every claim in one place. AI recommendations surface what needs attention, so reviewers focus on judgment—not triage.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1">
              {/* Left - Feature copy */}
              <div className="col-span-4 flex flex-col gap-4">
                <Card className="flex-1 space-y-4">
                  <h3 className="font-semibold text-sm">What You See at a Glance</h3>
                  {[
                    { icon: AlertTriangle, title: 'Action Required', desc: 'Claims needing human review, prioritized by urgency and amount', color: '#F59E0B' },
                    { icon: Brain, title: 'AI Recommendations', desc: 'Pay, Deny, or Review—with confidence scores and reasoning', color: colors.accent },
                    { icon: CheckCircle, title: 'Decision Tracking', desc: 'Monitor reviewer throughput and agreement rates', color: colors.success },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15`, borderRadius: '12px' }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{item.title}</div>
                        <div className="text-[10px] opacity-50 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>

                <Card dark className="p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5" style={{ color: colors.accent }} strokeWidth={1.5} />
                    <div>
                      <div className="text-sm font-semibold">Batch Processing</div>
                      <div className="text-[10px] opacity-50">Upload claims via CSV or API. Bulk actions for efficiency.</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right - UI Mockup */}
              <div className="col-span-8 flex flex-col">
                <div
                  className="flex-1 rounded-2xl overflow-hidden border border-black/10"
                  style={{ backgroundColor: '#FAFAFA', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                >
                  {/* Mini header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-black/5">
                    <div className="text-xs font-semibold opacity-70">Claims Dashboard</div>
                    <div className="flex items-center gap-2 px-2 py-1 text-[9px] rounded" style={{ backgroundColor: '#3B82F6', color: 'white' }}>
                      <Upload className="w-2.5 h-2.5" strokeWidth={1.5} /> Upload
                    </div>
                  </div>

                  {/* Summary cards row */}
                  <div className="grid grid-cols-3 gap-2 p-3">
                    <div className="bg-white rounded-lg p-2 border-2" style={{ borderColor: '#F59E0B' }}>
                      <div className="text-[8px] uppercase opacity-40">Action Required</div>
                      <div className="text-lg font-semibold" style={{ fontFamily: 'Halant, Georgia, serif' }}>100</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-black/5">
                      <div className="text-[8px] uppercase opacity-40">AI Recommendations</div>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs" style={{ color: colors.success }}>Pay 55</span>
                        <span className="text-xs" style={{ color: colors.error }}>Deny 24</span>
                        <span className="text-xs" style={{ color: '#F59E0B' }}>Review 21</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-black/5">
                      <div className="text-[8px] uppercase opacity-40">Decisions Today</div>
                      <div className="text-lg font-semibold" style={{ fontFamily: 'Halant, Georgia, serif' }}>0</div>
                    </div>
                  </div>

                  {/* Table preview */}
                  <div className="mx-3 bg-white rounded-lg border border-black/5 overflow-hidden">
                    <div className="grid grid-cols-6 gap-2 px-3 py-1.5 bg-gray-50 border-b border-black/5 text-[7px] uppercase opacity-40 font-semibold">
                      <div>Claim ID</div>
                      <div>Date</div>
                      <div>Type</div>
                      <div>Amount</div>
                      <div className="col-span-2">Status</div>
                    </div>
                    {[
                      { id: '251201000777C', date: '01/29/26', type: 'Lost/Stolen', amount: '$3,434', rec: 'PAY' },
                      { id: '251215002178C', date: '01/29/26', type: 'Lost/Stolen', amount: '$2,066', rec: 'PAY' },
                      { id: '251218001286C', date: '01/29/26', type: 'Card Not Present', amount: '$1,605', rec: 'DENY' },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-6 gap-2 px-3 py-1.5 border-b border-black/5 text-[8px]">
                        <div className="font-mono" style={{ color: '#3B82F6' }}>{row.id}</div>
                        <div className="opacity-50">{row.date}</div>
                        <div className="opacity-70">{row.type}</div>
                        <div className="font-semibold">{row.amount}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <span className="px-1.5 py-0.5 text-[7px] rounded" style={{ backgroundColor: row.rec === 'PAY' ? `${colors.success}15` : `${colors.error}15`, color: row.rec === 'PAY' ? colors.success : colors.error }}>
                            {row.rec}
                          </span>
                          <span className="text-[7px] opacity-40">Needs Review</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SlideCanvas>
        );

      // CLAIMS INVESTIGATION UI - Product mockup (Updated)
      case 'claims-ui':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-2">
              <Badge>Claim Investigation</Badge>
              <h2 className="text-4xl max-w-xl" style={headerStyle}>AI-Powered Decision Support</h2>
              <p className="text-sm opacity-50 max-w-lg">Every claim gets a thorough, documented investigation. AI synthesizes evidence and explains its reasoning—reviewers confirm or override with full context.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1">
              {/* Left - Feature copy */}
              <div className="col-span-4 flex flex-col gap-4">
                <Card className="flex-1 space-y-4">
                  <h3 className="font-semibold text-sm">Investigation Capabilities</h3>
                  {[
                    { icon: Brain, title: 'Decision Summary', desc: 'Plain-language explanation of recommendation with confidence level and key evidence', color: colors.accent },
                    { icon: Search, title: '26+ Investigation Steps', desc: 'Automated checks across account activity, transactions, devices, and behavioral patterns', color: '#3B82F6' },
                    { icon: Filter, title: 'Evidence Categorization', desc: 'Each data point tagged as Pay, Deny, Inconclusive, or Missing Data', color: colors.success },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15`, borderRadius: '12px' }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{item.title}</div>
                        <div className="text-[10px] opacity-50 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>

                <Card dark className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: colors.accent }} strokeWidth={1.5} />
                    <div>
                      <div className="text-sm font-semibold">Audit-Ready</div>
                      <div className="text-[10px] opacity-50">Every decision logged with full evidence trail for Reg E compliance.</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right - UI Mockup */}
              <div className="col-span-8 flex flex-col">
                <div
                  className="flex-1 rounded-2xl overflow-hidden border border-black/10"
                  style={{ backgroundColor: '#FAFAFA', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                >
                  {/* Mini header bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-black/5">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-[8px] opacity-40">
                        <ArrowLeft className="w-2.5 h-2.5" strokeWidth={1.5} />
                        Back
                      </div>
                      <div>
                        <div className="text-[7px] uppercase opacity-30">Recommendation</div>
                        <div className="text-[9px] font-semibold" style={{ color: colors.accent }}>Needs Review</div>
                      </div>
                      <div className="px-1.5 py-0.5 text-[7px] rounded border border-black/10 flex items-center gap-1">
                        <AlertTriangle className="w-2 h-2" strokeWidth={1.5} />
                        Fraud
                      </div>
                      <div>
                        <div className="text-[7px] uppercase opacity-30">Claim ID</div>
                        <div className="text-[8px] font-mono">251117001143C</div>
                      </div>
                      <div>
                        <div className="text-[7px] uppercase opacity-30">Amount</div>
                        <div className="text-[8px] font-semibold">$535.53</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button className="px-2 py-1 text-[8px] font-medium text-white rounded" style={{ backgroundColor: colors.charcoal }}>
                        Approve
                      </button>
                      <button className="px-2 py-1 text-[8px] font-medium rounded border border-black/10">
                        Reject
                      </button>
                    </div>
                  </div>

                  {/* Decision Summary */}
                  <div className="mx-3 mt-2 bg-white rounded-lg p-2.5 border-l-3" style={{ borderLeftWidth: '3px', borderLeftColor: colors.error, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(155,77,77,0.1)' }}>
                        <CheckCircle className="w-2.5 h-2.5" style={{ color: colors.error }} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-semibold text-[9px]">Decision Summary</span>
                          <span className="text-[7px] opacity-40">WEAK • 26 STEPS</span>
                        </div>
                        <p className="text-[7px] opacity-50 leading-relaxed">
                          Manual review: conflicting indicators—device/IP suggests involvement, but new-account status and 3DS flags indicate possible takeover.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-3 mx-3 mt-2 border-b border-black/10 pb-1.5">
                    {[
                      { label: 'Investigation Steps', active: true },
                      { label: 'Transactions', active: false },
                      { label: 'Documents', active: false },
                      { label: 'Cardholder', active: false },
                    ].map((tab, i) => (
                      <div key={i} className={`text-[8px] pb-1 ${tab.active ? 'border-b border-black font-semibold' : 'opacity-40'}`}>
                        {tab.label}
                      </div>
                    ))}
                  </div>

                  {/* Investigation steps */}
                  <div className="mx-3 mt-2 space-y-1.5 pb-2">
                    {[
                      { section: 'ACCOUNT ACTIVITY', steps: 1, result: 'Supports Deny', resultColor: colors.error },
                      { section: 'ACCOUNT INTERACTIONS', steps: 1, result: 'Missing Data', resultColor: colors.accent },
                      { section: 'TRANSACTION ANALYSIS', steps: 3, result: 'Inconclusive', resultColor: '#6B7280' },
                      { section: 'DEVICE & NETWORK', steps: 5, result: 'Supports Deny', resultColor: colors.error },
                    ].map((group, i) => (
                      <div key={i} className="bg-white rounded border border-black/5">
                        <div className="flex items-center justify-between px-2 py-1.5">
                          <div className="flex items-center gap-1.5">
                            <ChevronDown className="w-2 h-2 opacity-40" strokeWidth={1.5} />
                            <span className="text-[7px] font-semibold uppercase tracking-wider opacity-60">{group.section}</span>
                            <span className="text-[6px] opacity-30">({group.steps})</span>
                          </div>
                          <span className="text-[7px] font-medium" style={{ color: group.resultColor }}>{group.result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SlideCanvas>
        );

      // PRODUCT REPORTING - Disputes Reporting mockup
      case 'product-reporting':
        return (
          <SlideCanvas theme="secondary">
            <div className="flex flex-col gap-2">
              <Badge>Analytics</Badge>
              <h2 className="text-4xl max-w-xl" style={headerStyle}>Disputes Reporting</h2>
              <p className="text-sm opacity-50 max-w-lg">Real-time visibility into dispute operations. Track volume, resolution times, and containment—spot issues before they become problems.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1">
              {/* Left - Feature copy */}
              <div className="col-span-4 flex flex-col gap-4">
                <Card className="flex-1 space-y-4">
                  <h3 className="font-semibold text-sm">Key Metrics at a Glance</h3>
                  {[
                    { icon: TrendingUp, title: 'Volume Tracking', desc: 'Monitor dispute volume by day, week, or month with trend analysis', color: '#3B82F6' },
                    { icon: Clock, title: 'Resolution Time', desc: 'Average time from claim receipt to decision—track agent efficiency', color: colors.accent },
                    { icon: CheckCircle, title: 'Containment Rate', desc: 'Percentage of disputes resolved without escalation or representment', color: colors.success },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15`, borderRadius: '12px' }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{item.title}</div>
                        <div className="text-[10px] opacity-50 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>

                <Card dark className="p-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5" style={{ color: colors.accent }} strokeWidth={1.5} />
                    <div>
                      <div className="text-sm font-semibold">Dispute Reasons</div>
                      <div className="text-[10px] opacity-50">Drill down by fraud type, merchant category, or reason code.</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right - UI Mockup */}
              <div className="col-span-8 flex flex-col">
                <div
                  className="flex-1 rounded-2xl overflow-hidden border border-black/10"
                  style={{ backgroundColor: '#FAFAFA', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                >
                  {/* Mini header */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-black/5">
                    <div className="text-[9px] font-semibold opacity-70">Disputes Reporting</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[7px] opacity-40">
                        {['Day', 'Week', 'Month'].map((item, i) => (
                          <span key={i} className={`px-1.5 py-0.5 rounded ${i === 0 ? 'bg-black text-white' : ''}`}>{item}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 text-[7px] rounded border border-black/10 opacity-50">
                        <Clock className="w-2 h-2" strokeWidth={1.5} />
                        Jan 22-29
                      </div>
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-5 gap-1.5 p-2">
                    {[
                      { label: 'Total Disputes', value: '851', change: '+50%', positive: true },
                      { label: 'Avg Resolution', value: '5m 26s', change: '-3%', positive: true },
                      { label: 'Handle Time', value: '6m 41s', change: '+5%', positive: false },
                      { label: 'Containment', value: '86%', change: '+13%', positive: true },
                      { label: 'Completion', value: '59%', change: '+10%', positive: true },
                    ].map((m, i) => (
                      <div key={i} className="bg-white rounded-lg p-1.5 border border-black/5">
                        <div className="text-[6px] opacity-40 uppercase">{m.label}</div>
                        <div className="text-sm font-semibold" style={{ fontFamily: 'Halant, Georgia, serif' }}>{m.value}</div>
                        <div className="text-[6px]" style={{ color: m.positive ? colors.success : colors.error }}>{m.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="mx-2 bg-white rounded-lg p-2 border border-black/5">
                    <div className="text-[8px] font-semibold mb-1">Dispute Trends</div>
                    <div className="relative h-20">
                      <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,40 C25,35 50,15 75,12 C100,10 125,12 150,30 C175,47 200,55 225,52 C250,50 275,45 300,42 C325,40 350,35 375,25 C400,15 400,60 0,60 Z" fill="url(#chartGradient2)" />
                        <path d="M0,40 C25,35 50,15 75,12 C100,10 125,12 150,30 C175,47 200,55 225,52 C250,50 275,45 300,42 C325,40 350,35 375,25 C400,15 400,15 400,15" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[6px] opacity-30 mt-0.5">
                      <span>01/22</span><span>01/24</span><span>01/26</span><span>01/28</span>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="mx-2 mt-2 bg-white rounded-lg p-2 border border-black/5 mb-2">
                    <div className="text-[8px] font-semibold mb-1.5">Dispute Reasons</div>
                    <div className="space-y-1.5">
                      {[
                        { label: 'Non-Fraud', pct: 45, count: 380 },
                        { label: 'Fraud - Card Present', pct: 32, count: 272 },
                        { label: 'Fraud - Card Not Present', pct: 23, count: 199 },
                      ].map((r, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[7px] mb-0.5">
                            <span className="font-medium">{r.label}</span>
                            <span className="opacity-50">{r.count} ({r.pct}%)</span>
                          </div>
                          <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: colors.creamSecondary }}>
                            <div className="h-full rounded-full" style={{ width: `${r.pct * 2}%`, backgroundColor: '#3B82F6' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideCanvas>
        );

      // PRODUCT TRENDS - Fraud Trend Analysis mockup
      case 'product-trends':
        return (
          <SlideCanvas theme="light">
            <div className="flex flex-col gap-2">
              <Badge>Fraud Intelligence</Badge>
              <h2 className="text-4xl max-w-xl" style={headerStyle}>Fraud Trend Analysis</h2>
              <p className="text-sm opacity-50 max-w-lg">Spot organized fraud before it spreads. AI links claims by merchant, IP, device, and behavioral patterns—revealing rings that manual review would miss.</p>
            </div>

            <div className="grid grid-cols-12 gap-6 flex-1">
              {/* Left - Feature copy */}
              <div className="col-span-4 flex flex-col gap-4">
                <Card className="flex-1 space-y-4">
                  <h3 className="font-semibold text-sm">Pattern Detection</h3>
                  {[
                    { icon: Store, title: 'Merchant Clustering', desc: 'Identify merchants appearing across multiple unrelated claims—potential fraud hotspots', color: colors.accent },
                    { icon: Globe, title: 'Network Analysis', desc: 'Link claims by IP address, subnet, device fingerprint, or phone number', color: '#3B82F6' },
                    { icon: AlertTriangle, title: 'Risk Scoring', desc: 'Surface high-risk patterns: same IP across accounts, rapid account creation, etc.', color: '#F59E0B' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15`, borderRadius: '12px' }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{item.title}</div>
                        <div className="text-[10px] opacity-50 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </Card>

                <Card dark className="p-4">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5" style={{ color: colors.accent }} strokeWidth={1.5} />
                    <div>
                      <div className="text-sm font-semibold">Continuous Learning</div>
                      <div className="text-[10px] opacity-50">Re-analyze claims as new data arrives. Patterns emerge over time.</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right - UI Mockup */}
              <div className="col-span-8 flex flex-col">
                <div
                  className="flex-1 rounded-2xl overflow-hidden border border-black/10"
                  style={{ backgroundColor: '#FAFAFA', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                >
                  {/* Mini header */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-black/5">
                    <div className="text-[9px] font-semibold opacity-70">Fraud Trend Analysis</div>
                    <div className="flex items-center gap-1.5">
                      <button className="flex items-center gap-1 px-2 py-0.5 text-[7px] font-medium rounded border border-black/10">
                        <RefreshCw className="w-2 h-2" strokeWidth={1.5} />
                        Process New
                      </button>
                    </div>
                  </div>

                  {/* Alert banner */}
                  <div className="mx-2 mt-2 flex items-center justify-between px-2 py-1.5 rounded-lg border" style={{ borderColor: '#F59E0B', backgroundColor: '#FFFBEB' }}>
                    <div className="flex items-center gap-1.5 text-[8px]" style={{ color: '#D97706' }}>
                      <AlertTriangle className="w-3 h-3" strokeWidth={1.5} />
                      34 new claims available for analysis
                    </div>
                    <button className="px-2 py-0.5 text-[7px] font-medium rounded border" style={{ borderColor: '#F59E0B', color: '#D97706' }}>
                      Analyze
                    </button>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-4 gap-1.5 p-2">
                    {[
                      { label: 'Claims Analyzed', value: '27' },
                      { label: 'Identifiers', value: '706' },
                      { label: 'Trends Detected', value: '10', highlight: true },
                      { label: 'At Risk', value: '$3,349' },
                    ].map((m, i) => (
                      <div key={i} className="bg-white rounded-lg p-1.5" style={{ border: m.highlight ? '1.5px solid #F59E0B' : '1px solid rgba(0,0,0,0.05)' }}>
                        <div className="text-[6px] opacity-40 uppercase">{m.label}</div>
                        <div className="text-sm font-semibold" style={{ fontFamily: 'Halant, Georgia, serif' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Trends panels */}
                  <div className="grid grid-cols-2 gap-2 px-2 pb-2">
                    {/* Merchant Trends */}
                    <div className="bg-white rounded-lg p-2 border border-black/5">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1">
                          <Store className="w-3 h-3 opacity-50" strokeWidth={1.5} />
                          <span className="font-semibold text-[8px]">Merchant Trends</span>
                        </div>
                        <span className="text-[7px]" style={{ color: colors.accent }}>6</span>
                      </div>
                      <div className="space-y-1">
                        {[
                          { name: 'amazon', claims: 3, risk: '$587' },
                          { name: "mcdonald's", claims: 3, risk: '$32' },
                          { name: 'chevron', claims: 2, risk: '$136' },
                        ].map((m, i) => (
                          <div key={i} className="flex items-center justify-between p-1.5 rounded border border-black/5">
                            <span className="text-[8px] font-medium">{m.name}</span>
                            <div className="flex items-center gap-2 text-[7px]">
                              <span style={{ color: '#F59E0B' }}>{m.claims} claims</span>
                              <span style={{ color: colors.error }}>{m.risk}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* IP Trends */}
                    <div className="bg-white rounded-lg p-2 border border-black/5">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1">
                          <Wifi className="w-3 h-3 opacity-50" strokeWidth={1.5} />
                          <span className="font-semibold text-[8px]">IP/Subnet Trends</span>
                        </div>
                        <span className="text-[7px]" style={{ color: colors.accent }}>3</span>
                      </div>
                      <div className="space-y-1">
                        {[
                          { subnet: '172.56.222.0/24', claims: 2, risk: '$1,006' },
                          { subnet: '172.56.65.0/24', claims: 2, risk: '$464' },
                          { subnet: '174.197.70.0/24', claims: 2, risk: '$236' },
                        ].map((ip, i) => (
                          <div key={i} className="flex items-center justify-between p-1.5 rounded border border-black/5">
                            <span className="text-[7px] font-mono font-medium">{ip.subnet}</span>
                            <div className="flex items-center gap-2 text-[7px]">
                              <span style={{ color: '#F59E0B' }}>{ip.claims}</span>
                              <span style={{ color: colors.error }}>{ip.risk}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideCanvas>
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
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Badge>Programmatic Advantage</Badge>
                <h2 className="text-4xl max-w-xl" style={headerStyle}>Simulation & What-If Analysis</h2>
                <p className="text-sm opacity-50 max-w-lg">Test policy changes against historical data before deploying. Quantify tradeoffs with zero risk.</p>
              </div>
              {/* Key benefits */}
              <div className="flex gap-4">
                {[
                  { icon: Shield, label: 'Zero Risk', desc: 'Test safely' },
                  { icon: BarChart3, label: 'Data-Driven', desc: 'Quantified' },
                  { icon: Zap, label: 'Fast Iteration', desc: 'Minutes' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <item.icon className="w-4 h-4" style={{ color: colors.accent }} strokeWidth={1.5} />
                    <div>
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div className="text-[9px] opacity-40">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5 flex-1">
              {/* Left - What-If Scenarios */}
              <div className="col-span-5 flex flex-col gap-4">
                <Card className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: colors.accentMuted, borderRadius: '16px' }}>
                      <Search className="w-4 h-4" style={{ color: colors.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-sm">What-If Scenarios</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { q: 'Raise auto-approve threshold from $25 to $50?', impact: 'Approval rate, loss exposure, handle time', icon: DollarSign },
                      { q: 'Require only 1 strong link instead of 2?', impact: 'Fraud exposure vs customer experience', icon: Target },
                      { q: 'Auto-deny repeat claimants with 3+ disputes?', impact: 'False positive risk, customer impact', icon: XCircle },
                      { q: 'Extend provisional credit window by 5 days?', impact: 'Cash flow, customer satisfaction', icon: Clock },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3"
                        style={{ backgroundColor: colors.cream, borderRadius: '12px' }}
                      >
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'white', borderRadius: '8px' }}>
                          <item.icon className="w-3 h-3 opacity-50" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">{item.q}</div>
                          <div className="text-[10px] opacity-40 mt-0.5">→ {item.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right - Simulation Output */}
              <div className="col-span-7 flex flex-col gap-4">
                <Card dark className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                      <h3 className="font-semibold text-sm">Simulation Output</h3>
                    </div>
                    <div className="text-[9px] px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      Auto-approve $25 → $50
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-5">
                    {[
                      { label: 'Approval Rate', value: '+12.3%', sub: '68% → 80%', color: colors.success },
                      { label: 'Loss Exposure', value: '+$23K', sub: 'Monthly increase', color: '#F59E0B' },
                      { label: 'Handle Time', value: '-34%', sub: '6.2 → 4.1 min', color: colors.accent },
                    ].map((metric, i) => (
                      <div key={i} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <div className="text-2xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: metric.color }}>{metric.value}</div>
                        <div className="text-[10px] opacity-50 mt-1">{metric.label}</div>
                        <div className="text-[9px] opacity-30">{metric.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Claims Auto-Approved', before: '2,340', after: '3,120', pct: 78, color: colors.success },
                      { label: 'Claims Requiring Review', before: '1,660', after: '880', pct: 22, color: colors.accent },
                      { label: 'Projected Monthly Losses', before: '$45K', after: '$68K', pct: 45, color: '#F59E0B' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="opacity-60">{item.label}</span>
                          <span className="opacity-40">{item.before} → <span className="font-semibold text-white">{item.after}</span></span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <div className="h-full rounded-full" style={{ backgroundColor: item.color, width: `${item.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-[10px] opacity-40">Based on last 90 days of dispute data</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">Net Impact:</span>
                      <span className="text-sm font-semibold" style={{ color: colors.success }}>+$41K/mo savings</span>
                    </div>
                  </div>
                </Card>

                {/* Bottom action row */}
                <div className="flex items-center gap-3">
                  <Card className="flex-1 flex items-center gap-3 p-3">
                    <RefreshCw className="w-4 h-4 opacity-40" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs font-semibold">Run hundreds of scenarios</div>
                      <div className="text-[10px] opacity-40">Test any parameter combination</div>
                    </div>
                  </Card>
                  <Card className="flex-1 flex items-center gap-3 p-3">
                    <CheckCircle className="w-4 h-4" style={{ color: colors.success }} strokeWidth={1.5} />
                    <div>
                      <div className="text-xs font-semibold">Deploy with confidence</div>
                      <div className="text-[10px] opacity-40">Version-controlled rule changes</div>
                    </div>
                  </Card>
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

            <div className="grid grid-cols-2 gap-6 flex-1">
              {/* Without Salient */}
              <Card className="flex flex-col" style={{ backgroundColor: colors.creamSecondary, border: 'none' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: 'rgba(155,77,77,0.1)', borderRadius: '24px' }}>
                    <XCircle className="w-4 h-4" style={{ color: colors.error }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold opacity-50" style={headerStyle}>Without Salient</h3>
                </div>
                <div className="space-y-2 flex-1">
                  {[
                    { text: 'Manual investigation', sub: 'Days to weeks per case' },
                    { text: 'Inconsistent decisions', sub: 'Varies by analyst' },
                    { text: 'Compliance gaps', sub: 'Exam risk exposure' },
                    { text: '$25-40+ per dispute', sub: 'High operational cost' },
                    { text: 'No audit trail', sub: 'Documentation in emails' },
                    { text: 'Manual case filing', sub: 'Mastercom by hand' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-2" style={{ backgroundColor: 'white', borderRadius: '12px' }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: colors.error, opacity: 0.5 }}></div>
                      <div>
                        <div className="text-sm font-medium opacity-70">{item.text}</div>
                        <div className="text-[10px] opacity-40">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* With Salient */}
              <Card dark className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: colors.accentMuted, borderRadius: '24px' }}>
                    <CheckCircle className="w-4 h-4" style={{ color: colors.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold" style={headerStyle}>With Salient</h3>
                </div>
                <div className="space-y-2 flex-1">
                  {[
                    { text: 'Automated 12-step lifecycle', sub: 'Minutes, not days' },
                    { text: 'Consistent rule-based outcomes', sub: 'Every time, auditable' },
                    { text: 'Compliance encoded & enforced', sub: 'Reg Z, E, CFPB built-in' },
                    { text: '60% cost reduction', sub: '$30 → $12 per dispute' },
                    { text: 'Complete audit trail', sub: 'Versioned, searchable' },
                    { text: 'Direct Mastercom API', sub: 'Automated filing & lifecycle' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-2" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} strokeWidth={1.5} />
                      <div>
                        <div className="text-sm font-medium opacity-90">{item.text}</div>
                        <div className="text-[10px] opacity-40">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </SlideCanvas>
        );
      
      // BUSINESS CASE - Combined ROI and Opportunity slide
      case 'business-case':
        return (
          <SlideCanvas theme="secondary">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Badge>Value Analysis</Badge>
                <h2 className="text-4xl max-w-xl" style={headerStyle}>The Business Case</h2>
              </div>
              {/* Top-line metrics */}
              <div className="flex gap-6">
                {[
                  { value: '60%', label: 'Cost Reduction', color: colors.success },
                  { value: '90%+', label: 'Faster', color: colors.accent },
                  { value: '100%', label: 'Audit Coverage', color: colors.charcoal },
                ].map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: m.color }}>{m.value}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-40">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5 flex-1">
              {/* Left - Value breakdown table */}
              <div className="col-span-7 flex flex-col gap-4">
                <Card className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">Total Annual Value by Dispute Amount</h3>
                    <div className="text-[9px] px-2 py-1 rounded-full opacity-50" style={{ backgroundColor: colors.cream }}>
                      4,000/mo • 12.5% preventable loss
                    </div>
                  </div>

                  {/* Table header */}
                  <div className="grid grid-cols-4 gap-3 pb-2 border-b border-black/10 mb-2">
                    {['Avg Amount', 'Loss Prevention', 'Labor Savings', 'Total Value'].map((header, i) => (
                      <div key={i} className="text-[9px] uppercase tracking-wider opacity-40 font-semibold">
                        {header}
                      </div>
                    ))}
                  </div>

                  {/* Table rows */}
                  <div className="space-y-1.5">
                    {[
                      { amount: '$150', loss: '$900K', labor: '$728K', total: '$1.6M', highlight: false },
                      { amount: '$200', loss: '$1.2M', labor: '$728K', total: '$1.9M', highlight: true },
                      { amount: '$250', loss: '$1.5M', labor: '$728K', total: '$2.2M', highlight: false },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-4 gap-3 py-2.5 px-3 items-center"
                        style={{
                          backgroundColor: row.highlight ? colors.accentMuted : 'transparent',
                          borderRadius: '12px',
                          border: row.highlight ? `1px solid ${colors.accent}30` : '1px solid transparent'
                        }}
                      >
                        <div className="text-sm font-semibold" style={headerStyle}>{row.amount}</div>
                        <div className="text-sm font-medium" style={{ color: colors.success }}>{row.loss}</div>
                        <div className="text-sm opacity-60">{row.labor}</div>
                        <div className="text-lg font-semibold" style={{ ...headerStyle, color: row.highlight ? colors.accent : colors.charcoal }}>
                          {row.total}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-black/5 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: colors.success }} strokeWidth={1.5} />
                    <span className="text-xs"><span className="font-semibold" style={{ color: colors.success }}>Loss prevention often exceeds labor savings</span> — better evidence, faster response, consistent decisions.</span>
                  </div>
                </Card>

                {/* Input assumptions */}
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Volume', value: '4K/mo', icon: BarChart3 },
                    { label: 'Preventable Rate', value: '12.5%', icon: Target },
                    { label: 'Avg Dispute', value: '$200', icon: DollarSign },
                    { label: 'Cost Reduction', value: '$18/case', icon: TrendingDown },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex-1 flex items-center gap-2 p-2.5"
                      style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}
                    >
                      <item.icon className="w-3.5 h-3.5 opacity-40" strokeWidth={1.5} />
                      <div>
                        <div className="text-[8px] uppercase tracking-wider opacity-40">{item.label}</div>
                        <div className="text-xs font-semibold">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Summary */}
              <div className="col-span-5 flex flex-col gap-4">
                <Card dark className="flex-1 p-6">
                  <div className="text-[10px] uppercase tracking-wider opacity-40 mb-4">At $200 Avg. Dispute Amount</div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 px-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" style={{ color: colors.success }} strokeWidth={1.5} />
                        <span className="text-sm opacity-70">Loss Prevention</span>
                      </div>
                      <span className="text-xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: colors.success }}>$1.2M</span>
                    </div>
                    <div className="flex items-center justify-between py-3 px-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 opacity-50" strokeWidth={1.5} />
                        <span className="text-sm opacity-70">Labor Savings</span>
                      </div>
                      <span className="text-xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif' }}>$728K</span>
                    </div>
                    <div className="flex items-center justify-between py-4 px-4 rounded-xl" style={{ backgroundColor: colors.accentMuted }}>
                      <span className="text-sm font-semibold" style={{ color: colors.accent }}>Total Annual Value</span>
                      <span className="text-3xl font-semibold" style={{ fontFamily: 'Halant, Georgia, serif', color: colors.accent }}>$1.9M</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <div className="text-[10px] opacity-40 mb-1">Monthly Impact</div>
                    <div className="text-lg font-semibold" style={{ color: colors.accent }}>$158K/month</div>
                  </div>
                </Card>

                {/* Value drivers */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: CheckCircle, label: 'Fewer incorrect decisions', color: colors.success },
                    { icon: Clock, label: 'Faster resolution times', color: colors.accent },
                    { icon: FileText, label: 'Better evidence packages', color: colors.charcoal },
                    { icon: Shield, label: 'Reduced exam risk', color: colors.success },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5"
                      style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}
                    >
                      <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} strokeWidth={1.5} />
                      <span className="text-[10px]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SlideCanvas>
        );
      
      // CLOSING SLIDE - Dark, memorable finish
      case 'takeaways':
        return (
          <SlideCanvas theme="dark">
            <Badge light>Key Takeaways</Badge>

            <div className="flex-1 flex flex-col justify-center gap-8">
              <div className="space-y-3">
                <h2 className="text-6xl" style={headerStyle}>Why Salient?</h2>
                <p className="text-lg opacity-40 max-w-2xl">
                  Purpose-built dispute automation for regulated consumer lenders.
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Zap, title: '12-Step Automation', desc: 'End-to-end dispute lifecycle', highlight: 'Minutes, not days' },
                  { icon: Target, title: 'Evidence-Based', desc: '2+ strong links standard', highlight: 'Consistent outcomes' },
                  { icon: Shield, title: 'Compliance-First', desc: 'Reg Z, E, CFPB built-in', highlight: 'Exam-ready' },
                  { icon: Layers, title: 'Mastercom Direct', desc: 'API case filing & lifecycle', highlight: 'Full integration' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 space-y-4"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center"
                      style={{ backgroundColor: i === 0 ? colors.accentMuted : 'rgba(255,255,255,0.08)', borderRadius: '24px' }}
                    >
                      <item.icon className="w-5 h-5" style={{ opacity: i === 0 ? 1 : 0.5, color: i === 0 ? colors.accent : 'white' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs opacity-40 mt-1">{item.desc}</div>
                    </div>
                    <div className="text-[10px] font-medium pt-2 border-t border-white/10" style={{ color: colors.accent }}>
                      {item.highlight}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xl opacity-50" style={headerStyle}>
                  Faster, more accurate decisions at a lower per-dispute cost.
                </div>
                <div
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200"
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
    <div className="w-full h-screen flex flex-col overflow-hidden" style={{backgroundColor: colors.creamSecondary}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Halant:wght@300;400;500;600;700&display=swap');

        .slide-container {
          animation: slideIn 0.4s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      {/* Slide area - centers the scaled slide, handles swipe gestures */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={current}
          className="slide-container overflow-hidden"
          style={{
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)',
            flexShrink: 0,
          }}
        >
          {renderSlide()}
        </div>
      </div>
      {/* Navigation bar - responsive layout with iOS safe area support */}
      <div
        className="flex flex-col gap-2 px-4 pt-3"
        style={{
          backgroundColor: colors.charcoal,
          paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
        }}
      >
        {/* Prev/Next buttons - full width on mobile for easy tapping */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex-1 max-w-[140px] flex items-center justify-center gap-2 px-5 py-3 text-white text-sm disabled:opacity-20 transition-all duration-200 hover:bg-white/15 active:scale-95"
            style={{backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '24px', minHeight: '44px'}}
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} /> Prev
          </button>

          {/* Slide counter - compact display */}
          <div className="text-white/60 text-sm font-medium min-w-[60px] text-center">
            {current + 1} / {slides.length}
          </div>

          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="flex-1 max-w-[140px] flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium disabled:opacity-20 transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{backgroundColor: colors.cream, color: colors.charcoal, borderRadius: '24px', minHeight: '44px'}}
          >
            Next <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Dot indicators - hidden on very small screens, visible on tablet+ */}
        <div className="hidden sm:flex items-center justify-center gap-1.5">
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
      </div>
    </div>
  );
}
