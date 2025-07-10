import React, { useState, useMemo, useCallback, useEffect, createContext, useContext, Children, cloneElement } from 'react';
import { Accessibility, Monitor, Box, TestTube2, Check, Circle, Loader2, Layers, Sparkles, Palette, HardDrive, Cpu, MoveRight, ArrowDown, Wind, Server, Package, GitBranchPlus, Zap, Grid, Type, Clock, ShieldCheck, Bug, Terminal, BarChart, Dribbble, Play, Pause, Code, Globe, Database, FileText, Search, Star, Heart, BookOpen, Lightbulb, Rocket, Target, TrendingUp, Shuffle, RotateCcw, ChevronRight, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

// Enhanced theme with more sophisticated styling
const theme = {
 colors: {
   primary: '#CF4500',
   primaryHover: '#9a3a0a',
   brandRed: '#D7373C',
   brandOrange: '#F37338',
   brandBlue: '#1D4ED8',
   brandPurple: '#7C3AED',
   text: '#141413',
   textOnDark: '#FFFFFF',
   subtleText: '#666666',
   background: '#FFFFFF',
   backgroundAlt: '#FAFAFA',
   darkBackground: '#0F0F0F',
   surface: '#FFFFFF',
   border: '#E8E5E1',
   success: '#059669',
   warning: '#D97706',
   error: '#DC2626',
   info: '#0284C7',
 },
 font: {
   body: `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
   heading: `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
   mono: `'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace`,
 },
 shadows: {
   sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
   md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
   lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
   xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
 },
 spacing: {
   xs: '0.25rem',
   sm: '0.5rem',
   md: '1rem',
   lg: '1.5rem',
   xl: '2rem',
   '2xl': '3rem',
 }
};

// Animation variants
const fadeInUp = {
 hidden: { opacity: 0, y: 60 },
 visible: { 
   opacity: 1, 
   y: 0, 
   transition: { 
     duration: 0.6, 
     ease: [0.21, 1.11, 0.81, 0.99] 
   } 
 },
};

const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
   opacity: 1,
   transition: {
     staggerChildren: 0.1,
     delayChildren: 0.1,
   },
 },
};

const slideInRight = {
 hidden: { opacity: 0, x: 100 },
 visible: { 
   opacity: 1, 
   x: 0, 
   transition: { duration: 0.5, ease: "easeOut" } 
 },
};

// Enhanced contexts
const StateDemoContext = createContext();
const ThemeContext = createContext(theme);

// Helper functions
const getLuminance = (hex) => {
 let color = hex.startsWith('#') ? hex.slice(1) : hex;
 if (color.length === 3) color = color.split('').map(c => c + c).join('');
 const rgb = parseInt(color, 16);
 if (isNaN(rgb)) return 0;
 const r = (rgb >> 16) & 0xff, g = (rgb >> 8) & 0xff, b = (rgb >> 0) & 0xff;
 const sRGB = [r, g, b].map(v => {
   v /= 255;
   return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
 });
 return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

const getContrastRatio = (color1, color2) => {
 const lum1 = getLuminance(color1), lum2 = getLuminance(color2);
 const lighter = Math.max(lum1, lum2), darker = Math.min(lum1, lum2);
 return (lighter + 0.05) / (darker + 0.05);
};

// Enhanced reusable components
const FloatingCard = ({ children, className = "", delay = 0 }) => (
 <div 
   className={`group relative ${className}`}
   style={{
     animation: `float 6s ease-in-out infinite`,
     animationDelay: `${delay}s`,
   }}
 >
   <style jsx>{`
     @keyframes float {
       0%, 100% { transform: translateY(0px) rotate(0deg); }
       33% { transform: translateY(-10px) rotate(1deg); }
       66% { transform: translateY(-5px) rotate(-1deg); }
     }
   `}</style>
   {children}
 </div>
);

const GlowButton = ({ children, onClick, variant = "primary", size = "md", disabled = false, loading = false, className = "" }) => {
 const sizeClasses = {
   sm: 'px-4 py-2 text-sm',
   md: 'px-6 py-3 text-base',
   lg: 'px-8 py-4 text-lg'
 };

 const variantClasses = {
   primary: `bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-orange-500/25`,
   secondary: `bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50`,
   ghost: `bg-transparent hover:bg-gray-100 text-gray-800`
 };

 return (
   <button
     onClick={onClick}
     disabled={disabled || loading}
     className={`
       relative overflow-hidden font-semibold rounded-xl transition-all duration-300 
       transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-500/30
       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
       ${sizeClasses[size]} ${variantClasses[variant]} ${className}
     `}
   >
     <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
     <div className="relative flex items-center justify-center gap-2">
       {loading && <Loader2 className="animate-spin" size={20} />}
       {children}
     </div>
   </button>
 );
};

const CodeBlock = ({ children, language = "javascript", className = "" }) => (
 <div className={`relative group ${className}`}>
   <div className="absolute top-3 right-3 z-10">
     <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-300 font-mono">
       {language}
     </div>
   </div>
   <pre className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 overflow-x-auto shadow-2xl border border-gray-700">
     <code className="text-sm font-mono text-gray-100 leading-relaxed">
       {children}
     </code>
   </pre>
 </div>
);

const MetricCard = ({ title, value, change, icon: Icon, trend = "up" }) => (
 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
   <div className="flex items-center justify-between mb-4">
     <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
       <Icon size={24} className={trend === 'up' ? 'text-green-600' : 'text-red-600'} />
     </div>
     <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
       trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
     }`}>
       {change}
     </div>
   </div>
   <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
   <p className="text-3xl font-bold text-gray-900">{value}</p>
 </div>
);

// Enhanced Hero Section with more visual effects
const HeroSection = () => {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
   setIsVisible(true);
 }, []);

 return (
   <div className="min-h-screen flex items-center justify-center text-center px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50">
     {/* Animated background elements */}
     <div className="absolute inset-0 z-0">
       <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0s'}} />
       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
       <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}} />
     </div>

     {/* Floating geometric shapes */}
     <FloatingCard className="absolute top-20 left-20 opacity-60" delay={0}>
       <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg transform rotate-12" />
     </FloatingCard>
     <FloatingCard className="absolute bottom-32 right-32 opacity-40" delay={2}>
       <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
     </FloatingCard>
     <FloatingCard className="absolute top-1/3 right-20 opacity-50" delay={4}>
       <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-md transform -rotate-12" />
     </FloatingCard>

     <div className="relative z-10 max-w-5xl mx-auto">
       <div 
         className={`transition-all duration-1000 ${
           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
         }`}
       >
         {/* Logo animation */}
         <div className="flex items-center justify-center mb-8 group">
           <div className="relative">
             <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-transform duration-300 group-hover:scale-110" />
             <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full -ml-12 opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
             <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-xl scale-150" />
           </div>
         </div>

         <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
           Modern UI Engineering
         </h1>

         <p className="max-w-4xl mx-auto text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
           An interactive deep-dive into advanced frontend development principles, 
           from React fundamentals to cutting-edge UI patterns that power world-class applications.
         </p>

         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <GlowButton 
             onClick={() => document.getElementById('react-evolution')?.scrollIntoView({ behavior: 'smooth' })}
             size="lg"
             className="group"
           >
             <span>Start Exploring</span>
             <ArrowDown size={20} className="transition-transform group-hover:translate-y-1" />
           </GlowButton>
           <GlowButton 
             variant="secondary"
             onClick={() => document.getElementById('project-architecture')?.scrollIntoView({ behavior: 'smooth' })}
             size="lg"
           >
             <Code size={20} />
             <span>Jump to Code</span>
           </GlowButton>
         </div>
       </div>
     </div>
   </div>
 );
};

// New React Evolution Section
const ReactEvolutionSection = () => {
 const [selectedEra, setSelectedEra] = useState('modern');
 
 const eras = {
   early: {
     title: 'Early React (2013-2016)',
     description: 'Class components, manual state management, and the birth of the virtual DOM revolution.',
     features: ['Class Components', 'componentDidMount', 'setState()', 'Mixins', 'React.createClass'],
     code: `class TodoApp extends React.Component {
 constructor(props) {
   super(props);
   this.state = { items: [], text: '' };
 }
 
 componentDidMount() {
   // Lifecycle methods everywhere!
   this.fetchTodos();
 }
 
 render() {
   return <div>{/* JSX was revolutionary */}</div>;
 }
}`
   },
   hooks: {
     title: 'Hooks Era (2018-2020)',
     description: 'React Hooks changed everything - functional components could finally manage state and side effects.',
     features: ['useState', 'useEffect', 'useContext', 'Custom Hooks', 'Functional Components'],
     code: `function TodoApp() {
 const [items, setItems] = useState([]);
 const [text, setText] = useState('');
 
 useEffect(() => {
   fetchTodos().then(setItems);
 }, []);
 
 return <div>{/* Much cleaner! */}</div>;
}`
   },
   modern: {
     title: 'Modern React (2021+)',
     description: 'Concurrent features, Suspense, Server Components, and the future of React development.',
     features: ['Concurrent Mode', 'Suspense', 'Server Components', 'Automatic Batching', 'useTransition'],
     code: `function TodoApp() {
 const [isPending, startTransition] = useTransition();
 const todos = useSuspense(fetchTodos);
 
 const updateSearch = (query) => {
   startTransition(() => {
     // Non-urgent updates
     setSearchQuery(query);
   });
 };
 
 return <Suspense fallback={<Loading />}>
   <TodoList todos={todos} />
 </Suspense>;
}`
   }
 };

 return (
   <div className="space-y-12">
     <div className="text-center">
       <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
         The Evolution of React
       </h3>
       <p className="text-xl text-gray-600 max-w-3xl mx-auto">
         From revolutionary virtual DOM to concurrent features, React has continuously evolved to solve real-world development challenges.
       </p>
     </div>

     {/* Era selector */}
     <div className="flex justify-center">
       <div className="bg-gray-100 p-2 rounded-2xl flex gap-2">
         {Object.entries(eras).map(([key, era]) => (
           <button
             key={key}
             onClick={() => setSelectedEra(key)}
             className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
               selectedEra === key
                 ? 'bg-white shadow-lg text-gray-900 transform scale-105'
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             {era.title}
           </button>
         ))}
       </div>
     </div>

     {/* Era content */}
     <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
       <div className="grid lg:grid-cols-2 gap-8 p-8">
         <div>
           <h4 className="text-2xl font-bold mb-4">{eras[selectedEra].title}</h4>
           <p className="text-gray-600 mb-6 text-lg leading-relaxed">
             {eras[selectedEra].description}
           </p>
           
           <div className="space-y-3">
             <h5 className="font-semibold text-gray-900 mb-3">Key Features:</h5>
             {eras[selectedEra].features.map((feature, index) => (
               <div 
                 key={feature}
                 className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 <CheckCircle size={20} className="text-green-500" />
                 <span className="font-mono text-sm">{feature}</span>
               </div>
             ))}
           </div>
         </div>

         <div>
           <CodeBlock language="javascript">
             {eras[selectedEra].code}
           </CodeBlock>
         </div>
       </div>
     </div>

     {/* React Pros and Cons */}
     <div className="grid md:grid-cols-2 gap-8">
       <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
         <h4 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
           <CheckCircle size={28} />
           Why Developers Love React
         </h4>
         <ul className="space-y-4">
           {[
             'Component-based architecture promotes reusability',
             'Virtual DOM enables predictable performance',
             'Massive ecosystem and community support',
             'Excellent developer tools and debugging',
             'Declarative programming model',
             'Strong backing from Meta (Facebook)'
           ].map((item, index) => (
             <li key={index} className="flex items-start gap-3">
               <Star size={16} className="text-green-600 mt-1 flex-shrink-0" />
               <span className="text-green-800">{item}</span>
             </li>
           ))}
         </ul>
       </div>

       <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-2xl border border-red-200">
         <h4 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
           <AlertTriangle size={28} />
           Common Developer Concerns
         </h4>
         <ul className="space-y-4">
           {[
             'Steep learning curve for complex concepts',
             'Rapid ecosystem changes and deprecations',
             'Bundle size concerns with large applications',
             'Over-engineering simple projects',
             'JSX syntax barrier for some developers',
             'State management complexity at scale'
           ].map((item, index) => (
             <li key={index} className="flex items-start gap-3">
               <XCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
               <span className="text-red-800">{item}</span>
             </li>
           ))}
         </ul>
       </div>
     </div>
   </div>
 );
};

// JavaScript vs TypeScript Section
const JSvsTSSection = () => {
 const [activeLanguage, setActiveLanguage] = useState('typescript');
 const [showErrors, setShowErrors] = useState(false);

 const codeExamples = {
   javascript: {
     title: 'JavaScript - Dynamic & Flexible',
     code: `// JavaScript - Runtime flexibility
function processUser(user) {
 return {
   id: user.id,
   name: user.name.toUpperCase(),
   email: user.email.toLowerCase(),
   age: user.age + 1
 };
}

// This works... until it doesn't
const result = processUser({ 
 id: 1, 
 name: 'Alice' 
 // Missing email and age!
});`,
     pros: [
       'Faster development for small projects',
       'No compilation step required',
       'More flexible and dynamic',
       'Lower barrier to entry',
       'Smaller bundle sizes'
     ],
     cons: [
       'Runtime errors from typos',
       'No autocomplete for object properties',
       'Difficult to refactor large codebases',
       'Documentation lives separately',
       'Hard to catch bugs during development'
     ]
   },
   typescript: {
     title: 'TypeScript - Safety & Scale',
     code: `// TypeScript - Compile-time safety
interface User {
 id: number;
 name: string;
 email: string;
 age: number;
}

function processUser(user: User): ProcessedUser {
 return {
   id: user.id,
   name: user.name.toUpperCase(),
   email: user.email.toLowerCase(),
   age: user.age + 1
 };
}

// Compiler catches missing properties!
const result = processUser({ 
 id: 1, 
 name: 'Alice' 
 // ❌ Error: Missing email and age
});`,
     pros: [
       'Catch errors at compile time',
       'Excellent IDE support and autocomplete',
       'Self-documenting code with types',
       'Safer refactoring at scale',
       'Better team collaboration'
     ],
     cons: [
       'Additional build step required',
       'Learning curve for type system',
       'More verbose than JavaScript',
       'Can slow down initial development',
       'Type definitions maintenance'
     ]
   }
 };

 return (
   <div className="space-y-12">
     <div className="text-center">
       <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text text-transparent">
         JavaScript vs TypeScript
       </h3>
       <p className="text-xl text-gray-600 max-w-3xl mx-auto">
         The eternal debate: Dynamic flexibility vs. Static type safety. Each has its place in modern development.
       </p>
     </div>

     {/* Language selector */}
     <div className="flex justify-center">
       <div className="bg-gray-100 p-2 rounded-2xl flex gap-2">
         <button
           onClick={() => setActiveLanguage('javascript')}
           className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
             activeLanguage === 'javascript'
               ? 'bg-yellow-400 text-yellow-900 shadow-lg transform scale-105'
               : 'text-gray-600 hover:text-gray-900'
           }`}
         >
           <FileText size={20} />
           JavaScript
         </button>
         <button
           onClick={() => setActiveLanguage('typescript')}
           className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
             activeLanguage === 'typescript'
               ? 'bg-blue-500 text-white shadow-lg transform scale-105'
               : 'text-gray-600 hover:text-gray-900'
           }`}
         >
           <ShieldCheck size={20} />
           TypeScript
         </button>
       </div>
     </div>

     {/* Code comparison */}
     <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
       <div className="p-8">
         <div className="flex items-center justify-between mb-6">
           <h4 className="text-2xl font-bold">{codeExamples[activeLanguage].title}</h4>
           <button
             onClick={() => setShowErrors(!showErrors)}
             className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
               showErrors 
               ? 'bg-red-100 text-red-700' 
               : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
             }`}
           >
             {showErrors ? <EyeOff size={16} /> : <Eye size={16} />}
             <span className="ml-2">{showErrors ? 'Hide' : 'Show'} Errors</span>
           </button>
         </div>
         
         <CodeBlock language={activeLanguage}>
           {codeExamples[activeLanguage].code}
         </CodeBlock>

         {showErrors && activeLanguage === 'typescript' && (
           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
             <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
               <XCircle size={16} />
               TypeScript Compiler Error
             </div>
             <code className="text-sm text-red-600">
               Argument of type '{"{"} id: number; name: string; {"}"}' is not assignable to parameter of type 'User'.
               <br />
               Property 'email' is missing in type '{"{"} id: number; name: string; {"}"}'
             </code>
           </div>
         )}
       </div>
     </div>

     {/* Pros and Cons */}
     <div className="grid lg:grid-cols-2 gap-8">
       <div className="space-y-6">
         <h4 className="text-xl font-bold text-green-600 flex items-center gap-2">
           <CheckCircle size={24} />
           Advantages
         </h4>
         <div className="space-y-3">
           {codeExamples[activeLanguage].pros.map((pro, index) => (
             <div 
               key={index}
               className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 transition-all duration-300 hover:bg-green-100"
             >
               <Star size={16} className="text-green-600" />
               <span className="text-green-800">{pro}</span>
             </div>
           ))}
         </div>
       </div>

       <div className="space-y-6">
         <h4 className="text-xl font-bold text-red-600 flex items-center gap-2">
           <XCircle size={24} />
           Challenges
         </h4>
         <div className="space-y-3">
           {codeExamples[activeLanguage].cons.map((con, index) => (
             <div 
               key={index}
               className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200 transition-all duration-300 hover:bg-red-100"
             >
               <AlertTriangle size={16} className="text-red-600" />
               <span className="text-red-800">{con}</span>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
};

// SPA vs MPA Section
const SPAvsMPASection = () => {
 const [activeTab, setActiveTab] = useState('spa');
 
 const architectures = {
   spa: {
     title: 'Single Page Application (SPA)',
     description: 'Load once, navigate forever. SPAs load a single HTML page and dynamically update content.',
     icon: <Globe className="text-blue-500" />,
     examples: ['Gmail', 'Twitter', 'Figma', 'Notion'],
     flow: [
       { step: 'Initial Load', description: 'Download entire JavaScript bundle', time: '2-4s', color: 'orange' },
       { step: 'Navigation', description: 'Client-side routing (instant)', time: '0ms', color: 'green' },
       { step: 'Data Fetch', description: 'API calls for new content', time: '100-500ms', color: 'blue' },
       { step: 'Render', description: 'Update DOM with new content', time: '10-50ms', color: 'purple' }
     ],
     pros: [
       'Instant navigation after initial load',
       'Rich, app-like user experience',
       'Efficient caching strategies',
       'Reduced server load',
       'Offline capabilities possible'
     ],
     cons: [
       'Large initial bundle size',
       'SEO challenges without SSR',
       'Slower time to first meaningful paint',
       'Complex state management',
       'Browser history management complexity'
     ]
   },
   mpa: {
     title: 'Multi Page Application (MPA)',
     description: 'Traditional approach where each route loads a complete new page from the server.',
     icon: <Server className="text-green-500" />,
     examples: ['Wikipedia', 'GitHub', 'Most e-commerce sites', 'News websites'],
     flow: [
       { step: 'Request', description: 'Browser requests new page', time: '50-200ms', color: 'blue' },
       { step: 'Server Process', description: 'Server renders HTML', time: '100-800ms', color: 'orange' },
       { step: 'Download', description: 'Full page download', time: '500-2000ms', color: 'red' },
       { step: 'Parse & Render', description: 'Browser renders page', time: '100-300ms', color: 'purple' }
     ],
     pros: [
       'Excellent SEO out of the box',
       'Fast initial page load',
       'Simple browser caching',
       'Better for content-heavy sites',
       'Easier to implement analytics'
     ],
     cons: [
       'Full page reloads on navigation',
       'Repetitive UI downloads',
       'Less interactive user experience',
       'Higher server load',
       'Harder to implement offline features'
     ]
   }
 };

 const RouteVisualization = ({ type }) => {
   const [currentStep, setCurrentStep] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);
   
   const steps = architectures[type].flow;
   
   const runAnimation = () => {
     setIsAnimating(true);
     setCurrentStep(0);
     
     steps.forEach((step, index) => {
       setTimeout(() => {
         setCurrentStep(index + 1);
       }, index * 800);
     });
     
     setTimeout(() => {
       setIsAnimating(false);
       setCurrentStep(0);
     }, steps.length * 800 + 1000);
   };

   return (
     <div className="bg-gray-50 p-6 rounded-xl">
       <div className="flex justify-between items-center mb-4">
         <h5 className="font-semibold text-gray-800">Navigation Flow</h5>
         <button
           onClick={runAnimation}
           disabled={isAnimating}
           className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50"
         >
           {isAnimating ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
         </button>
       </div>
       
       <div className="space-y-3">
         {steps.map((step, index) => (
           <div 
             key={index}
             className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
               currentStep > index 
                 ? 'bg-white shadow-md transform scale-105' 
                 : 'bg-gray-100'
             }`}
           >
             <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
               currentStep > index 
                 ? `bg-${step.color}-500` 
                 : 'bg-gray-300'
             }`} />
             <div className="flex-1">
               <div className="font-medium text-sm">{step.step}</div>
               <div className="text-xs text-gray-600">{step.description}</div>
             </div>
             <div className={`text-sm font-mono px-2 py-1 rounded ${
               currentStep > index 
                 ? `bg-${step.color}-100 text-${step.color}-700` 
                 : 'bg-gray-200 text-gray-500'
             }`}>
               {step.time}
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 };

 return (
   <div className="space-y-12">
     <div className="text-center">
       <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
         SPA vs MPA Architecture
       </h3>
       <p className="text-xl text-gray-600 max-w-3xl mx-auto">
         Two fundamentally different approaches to web application architecture, each with distinct trade-offs.
       </p>
     </div>

     {/* Architecture selector */}
     <div className="flex justify-center">
       <div className="bg-gray-100 p-2 rounded-2xl flex gap-2">
         {Object.entries(architectures).map(([key, arch]) => (
           <button
             key={key}
             onClick={() => setActiveTab(key)}
             className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
               activeTab === key
                 ? 'bg-white shadow-lg text-gray-900 transform scale-105'
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             {arch.icon}
             <span>{arch.title}</span>
           </button>
         ))}
       </div>
     </div>

     {/* Architecture details */}
     <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
       <div className="p-8">
         <div className="grid lg:grid-cols-2 gap-8">
           <div>
             <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
               {architectures[activeTab].icon}
               {architectures[activeTab].title}
             </h4>
             <p className="text-gray-600 mb-6 text-lg leading-relaxed">
               {architectures[activeTab].description}
             </p>
             
             <div className="mb-6">
               <h5 className="font-semibold text-gray-900 mb-3">Popular Examples:</h5>
               <div className="flex flex-wrap gap-2">
                 {architectures[activeTab].examples.map((example, index) => (
                   <span 
                     key={example}
                     className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                     style={{ animationDelay: `${index * 100}ms` }}
                   >
                     {example}
                   </span>
                 ))}
               </div>
             </div>
           </div>

           <RouteVisualization type={activeTab} />
         </div>

         {/* Pros and Cons */}
         <div className="grid md:grid-cols-2 gap-8 mt-12">
           <div className="space-y-4">
             <h5 className="text-xl font-bold text-green-600 flex items-center gap-2">
               <CheckCircle size={24} />
               Advantages
             </h5>
             {architectures[activeTab].pros.map((pro, index) => (
               <div 
                 key={index}
                 className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
               >
                 <Star size={16} className="text-green-600" />
                 <span className="text-green-800">{pro}</span>
               </div>
             ))}
           </div>

           <div className="space-y-4">
             <h5 className="text-xl font-bold text-red-600 flex items-center gap-2">
               <XCircle size={24} />
               Challenges
             </h5>
             {architectures[activeTab].cons.map((con, index) => (
               <div 
                 key={index}
                 className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200"
               >
                 <AlertTriangle size={16} className="text-red-600" />
                 <span className="text-red-800">{con}</span>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

// Enhanced Project Architecture Section
const ProjectArchitectureSection = () => {
 const [selectedTool, setSelectedTool] = useState('vite');

 const buildTools = {
   vite: {
     icon: <Wind size={24} className="text-purple-500" />,
     title: 'Vite',
     subtitle: 'Lightning Fast Build Tool',
     description: 'Next-generation frontend tooling with instant server start and lightning-fast HMR.',
     features: [
       'Native ES modules in development',
       'Lightning-fast Hot Module Replacement',
       'Optimized production builds with Rollup',
       'Built-in TypeScript support',
       'Plugin ecosystem (Vue, React, Svelte)'
     ],
     codeExample: `// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
 plugins: [react()],
 build: {
   target: 'esnext',
   minify: 'esbuild'
 }
})`,
     metrics: {
       devStart: '⚡ 300ms',
       hmr: '⚡ 50ms',
       buildTime: '🚀 30s'
     }
   },
   nextjs: {
     icon: <Server size={24} className="text-black" />,
     title: 'Next.js',
     subtitle: 'Full-Stack React Framework',
     description: 'Production-ready framework with SSR, SSG, API routes, and automatic optimizations.',
     features: [
       'Server-Side Rendering (SSR)',
       'Static Site Generation (SSG)',
       'API routes and serverless functions',
       'Automatic code splitting',
       'Built-in image optimization'
     ],
     codeExample: `// pages/api/users.js
export default function handler(req, res) {
 if (req.method === 'GET') {
   res.status(200).json({ users: [] })
 }
}

// pages/index.js
export async function getStaticProps() {
 return { props: { data: 'server-rendered' } }
}`,
     metrics: {
       seo: '🎯 Perfect',
       performance: '🚀 Optimized',
       deployment: '☁️ Vercel'
     }
   },
   webpack: {
     icon: <Package size={24} className="text-blue-500" />,
     title: 'Webpack',
     subtitle: 'Battle-Tested Bundler',
     description: 'Highly configurable module bundler that powers many popular frameworks.',
     features: [
       'Advanced code splitting strategies',
       'Extensive plugin ecosystem',
       'Tree shaking and optimization',
       'Asset management and loaders',
       'Development and production modes'
     ],
     codeExample: `// webpack.config.js
module.exports = {
 entry: './src/index.js',
 module: {
   rules: [
     {
       test: /\.jsx?$/,
       use: 'babel-loader',
       exclude: /node_modules/
     }
   ]
 },
 optimization: {
   splitChunks: {
     chunks: 'all'
   }
 }
}`,
     metrics: {
       flexibility: '🔧 Maximum',
       ecosystem: '📦 Huge',
       complexity: '⚠️ High'
     }
   }
 };

 return (
   <div className="space-y-16">
     <div>
       <h3 className="text-3xl font-bold mb-4">Build Tools & Frameworks</h3>
       <p className="text-xl text-gray-600 mb-8 max-w-4xl">
         The foundation of any modern web application starts with choosing the right build tool. 
         Each option represents different philosophies and trade-offs.
       </p>

       {/* Tool selector */}
       <div className="flex flex-wrap gap-4 mb-8">
         {Object.entries(buildTools).map(([key, tool]) => (
           <button
             key={key}
             onClick={() => setSelectedTool(key)}
             className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
               selectedTool === key
                 ? 'bg-white shadow-xl transform scale-105 border-2 border-blue-200'
                 : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
             }`}
           >
             {tool.icon}
             <div className="text-left">
               <div className="font-bold">{tool.title}</div>
               <div className="text-sm opacity-80">{tool.subtitle}</div>
             </div>
           </button>
         ))}
       </div>

       {/* Tool details */}
       <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
         <div className="grid lg:grid-cols-2 gap-8 p-8">
           <div>
             <div className="flex items-center gap-4 mb-6">
               {buildTools[selectedTool].icon}
               <div>
                 <h4 className="text-2xl font-bold">{buildTools[selectedTool].title}</h4>
                 <p className="text-gray-600">{buildTools[selectedTool].subtitle}</p>
               </div>
             </div>

             <p className="text-gray-700 mb-6 text-lg leading-relaxed">
               {buildTools[selectedTool].description}
             </p>

             <div className="space-y-3 mb-6">
               <h5 className="font-semibold text-gray-900">Key Features:</h5>
               {buildTools[selectedTool].features.map((feature, index) => (
                 <div 
                   key={feature}
                   className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                   style={{ animationDelay: `${index * 100}ms` }}
                 >
                   <CheckCircle size={16} className="text-green-500" />
                   <span className="text-gray-800">{feature}</span>
                 </div>
               ))}
             </div>

             {/* Metrics */}
             <div className="grid grid-cols-3 gap-4">
               {Object.entries(buildTools[selectedTool].metrics).map(([key, value]) => (
                 <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                   <div className="text-lg font-bold">{value}</div>
                   <div className="text-xs text-gray-600 capitalize">{key}</div>
                 </div>
               ))}
             </div>
           </div>

           <div>
             <CodeBlock language="javascript">
               {buildTools[selectedTool].codeExample}
             </CodeBlock>
           </div>
         </div>
       </div>
     </div>

     {/* Package Managers */}
     <div>
       <h3 className="text-3xl font-bold mb-4">Package Manager Evolution</h3>
       <p className="text-xl text-gray-600 mb-8 max-w-4xl">
         Package managers have evolved from simple dependency installers to sophisticated workspace and performance optimization tools.
       </p>

       <div className="grid md:grid-cols-3 gap-8">
         {[
           {
             name: 'NPM',
             icon: <Package className="text-red-500" />,
             description: 'The original and most widely adopted',
             performance: { speed: 60, diskUsage: 30, reliability: 90 },
             features: ['Workspaces', 'Package-lock', 'Scripts', 'Audit'],
             pros: ['Ubiquitous', 'Reliable', 'Great docs'],
             cons: ['Slower installs', 'Disk space heavy']
           },
           {
             name: 'Yarn',
             icon: <Package className="text-blue-500" />,
             description: 'Enhanced performance and developer experience',
             performance: { speed: 85, diskUsage: 60, reliability: 95 },
             features: ['Zero-installs', 'Plug\'n\'Play', 'Berry', 'Workspaces'],
             pros: ['Fast installs', 'Advanced features', 'Great caching'],
             cons: ['Learning curve', 'Node_modules complexity']
           },
           {
             name: 'PNPM',
             icon: <HardDrive className="text-orange-500" />,
             description: 'Efficient disk usage with content-addressable storage',
             performance: { speed: 95, diskUsage: 95, reliability: 90 },
             features: ['Symlinks', 'Global store', 'Strict deps', 'Monorepos'],
             pros: ['Minimal disk usage', 'Very fast', 'Strict isolation'],
             cons: ['Symlink compatibility', 'Smaller ecosystem']
           }
         ].map((pm) => (
           <div key={pm.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
             <div className="flex items-center gap-3 mb-4">
               {pm.icon}
               <h4 className="text-xl font-bold">{pm.name}</h4>
             </div>
             
             <p className="text-gray-600 mb-4">{pm.description}</p>

             {/* Performance bars */}
             <div className="space-y-3 mb-4">
               {Object.entries(pm.performance).map(([metric, value]) => (
                 <div key={metric}>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                     <span>{value}%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div 
                       className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                       style={{ width: `${value}%` }}
                     />
                   </div>
                 </div>
               ))}
             </div>

             {/* Features */}
             <div className="mb-4">
               <h5 className="font-semibold text-sm text-gray-700 mb-2">Key Features:</h5>
               <div className="flex flex-wrap gap-2">
                 {pm.features.map((feature) => (
                   <span key={feature} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                     {feature}
                   </span>
                 ))}
               </div>
             </div>

             {/* Pros/Cons */}
             <div className="space-y-2">
               {pm.pros.map((pro) => (
                 <div key={pro} className="flex items-center gap-2 text-sm">
                   <CheckCircle size={14} className="text-green-500" />
                   <span className="text-green-700">{pro}</span>
                 </div>
               ))}
               {pm.cons.map((con) => (
                 <div key={con} className="flex items-center gap-2 text-sm">
                   <XCircle size={14} className="text-red-500" />
                   <span className="text-red-700">{con}</span>
                 </div>
               ))}
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
};

// Enhanced Design Systems Section
const DesignSystemsSection = () => {
 const [pickedColor, setPickedColor] = useState('#E52321');
 const [selectedToken, setSelectedToken] = useState('color');

 const madeTokensRaw = `--made-color-accent-01-default:#cf4500
--made-color-accent-02:#f37338
--made-color-accent-03:#f38b00
--made-color-accent-04:#ffc61e
--made-color-accent-05:#628020
--made-color-accent-06:#25836d
--made-color-accent-07:#d7373c
--made-color-gray-01:#fcfbfa
--made-color-gray-02:#e8e5e1
--made-color-gray-03:#b1ada6
--made-color-gray-04:#777470
--made-color-gray-05:#555250
--made-color-gray-06:#323231
--made-color-gray-07:#141413
--made-color-white:#ffffff
--made-color-green-success-04:#038a00
--made-color-red-error-04:#ee0000`;

 const madeColorTokens = madeTokensRaw.trim().split('\n').map(line => {
   const [name, hex] = line.split(':');
   return { name: name.trim(), hex: hex.trim() };
 });

 const hexToRgb = (hex) => {
   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
   } : null;
 };

 const colorDistance = (rgb1, rgb2) => 
   Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));

 const findClosestToken = (inputHex) => {
   const inputRgb = hexToRgb(inputHex);
   if (!inputRgb) return null;
   let closest = null, minDistance = Infinity;
   madeColorTokens.forEach(token => {
     const tokenRgb = hexToRgb(token.hex);
     if (tokenRgb) {
       const distance = colorDistance(inputRgb, tokenRgb);
       if (distance < minDistance) {
         minDistance = distance;
         closest = token;
       }
     }
   });
   return closest;
 };

 const closestToken = useMemo(() => findClosestToken(pickedColor), [pickedColor]);

 const tokenCategories = {
   color: {
     title: 'Color Tokens',
     description: 'Semantic color values that maintain consistency across all brand touchpoints.',
     examples: [
       { name: 'Primary', value: theme.colors.primary, usage: 'CTAs, links, focus states' },
       { name: 'Success', value: theme.colors.success, usage: 'Success messages, confirmations' },
       { name: 'Error', value: theme.colors.error, usage: 'Error states, destructive actions' },
       { name: 'Text', value: theme.colors.text, usage: 'Primary text content' }
     ]
   },
   spacing: {
     title: 'Spacing Tokens',
     description: 'Consistent spacing values create visual rhythm and improve layout predictability.',
     examples: [
       { name: 'XS', value: '4px', usage: 'Icon padding, small gaps' },
       { name: 'SM', value: '8px', usage: 'Form field spacing' },
       { name: 'MD', value: '16px', usage: 'Component padding' },
       { name: 'LG', value: '24px', usage: 'Section spacing' },
       { name: 'XL', value: '32px', usage: 'Page layout margins' }
     ]
   },
   typography: {
     title: 'Typography Tokens',
     description: 'Font sizes, weights, and line heights that create clear information hierarchy.',
     examples: [
       { name: 'Display', value: '3rem/1.2', usage: 'Page headlines' },
       { name: 'Heading', value: '1.5rem/1.3', usage: 'Section titles' },
       { name: 'Body', value: '1rem/1.5', usage: 'Primary content' },
       { name: 'Caption', value: '0.875rem/1.4', usage: 'Helper text' }
     ]
   }
 };

 return (
   <div className="space-y-16">
     <div>
       <h3 className="text-3xl font-bold mb-4">Design Tokens: The Foundation</h3>
       <p className="text-xl text-gray-600 mb-8 max-w-4xl">
         Design tokens are the atomic elements of a design system - named entities that store visual design attributes. 
         They're the single source of truth that ensures consistency across all platforms and products.
       </p>

       {/* Token category selector */}
       <div className="flex flex-wrap gap-4 mb-8">
         {Object.entries(tokenCategories).map(([key, category]) => (
           <button
             key={key}
             onClick={() => setSelectedToken(key)}
             className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
               selectedToken === key
                 ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
             }`}
           >
             {category.title}
           </button>
         ))}
       </div>

       {/* Token details */}
       <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
         <div className="p-8">
           <h4 className="text-2xl font-bold mb-4">{tokenCategories[selectedToken].title}</h4>
           <p className="text-gray-600 mb-8 text-lg">
             {tokenCategories[selectedToken].description}
           </p>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {tokenCategories[selectedToken].examples.map((token, index) => (
               <div 
                 key={token.name}
                 className="group p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
               >
                 {selectedToken === 'color' && (
                   <div 
                     className="w-full h-16 rounded-lg mb-4 shadow-inner"
                     style={{ backgroundColor: token.value }}
                   />
                 )}
                 {selectedToken === 'spacing' && (
                   <div className="mb-4 flex items-center">
                     <div 
                       className="bg-blue-500 rounded"
                       style={{ width: token.value, height: '8px' }}
                     />
                     <span className="ml-2 text-sm text-gray-500">{token.value}</span>
                   </div>
                 )}
                 {selectedToken === 'typography' && (
                   <div 
                     className="mb-4 font-bold"
                     style={{ fontSize: token.value.split('/')[0], lineHeight: token.value.split('/')[1] }}
                   >
                     Sample Text
                   </div>
                 )}
                 
                 <h5 className="font-semibold text-gray-900 mb-2">{token.name}</h5>
                 <p className="text-sm text-gray-600 mb-2 font-mono">{token.value}</p>
                 <p className="text-xs text-gray-500">{token.usage}</p>
               </div>
             ))}
           </div>
         </div>
       </div>

       {/* Interactive color matcher */}
       {selectedToken === 'color' && (
         <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border">
           <h4 className="text-2xl font-bold mb-6 text-center">Interactive Color Token Matcher</h4>
           <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
             <div className="text-center space-y-4">
               <label htmlFor="color-picker" className="block font-semibold text-lg">
                 Pick Any Color
               </label>
               <input
                 id="color-picker"
                 type="color"
                 value={pickedColor}
                 onChange={e => setPickedColor(e.target.value)}
                 className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl cursor-pointer mx-auto block transition-transform hover:scale-105"
               />
               <div className="bg-white rounded-xl p-4 shadow-md">
                 <p className="text-sm text-gray-500 mb-2">Your Color</p>
                 <p className="font-mono text-xl font-bold">{pickedColor.toUpperCase()}</p>
               </div>
             </div>

             <div className="text-center space-y-4">
               <MoveRight className="mx-auto text-gray-400 hidden md:block" size={32} />
               <div className="md:hidden">
                 <ArrowDown className="mx-auto text-gray-400" size={32} />
               </div>
               
               {closestToken && (
                 <>
                   <div 
                     className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl mx-auto transition-all duration-500"
                     style={{ backgroundColor: closestToken.hex }}
                   />
                   <div className="bg-white rounded-xl p-4 shadow-md">
                     <p className="text-sm text-gray-500 mb-2">Closest MADE Token</p>
                     <p className="font-mono text-xl font-bold">{closestToken.hex.toUpperCase()}</p>
                     <p className="text-xs text-gray-500 mt-2 font-mono">{closestToken.name}</p>
                   </div>
                 </>
               )}
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

// Enhanced Component Library Section
const ComponentLibrarySection = () => {
 const [activeComponent, setActiveComponent] = useState('button');

 const components = {
   button: {
     title: 'Button Component',
     description: 'The most fundamental interactive element with multiple variants, sizes, and states.',
     component: <ButtonStorybook />
   },
   input: {
     title: 'Input Component',
     description: 'Form inputs with validation states, icons, and accessibility features.',
     component: <InputStorybook />
   },
   card: {
     title: 'Card Component',
     description: 'Flexible container component with various layouts and interactive states.',
     component: <CardStorybook />
   },
   notification: {
     title: 'Notification System',
     description: 'Toast notifications with different types and dismissal patterns.',
     component: <NotificationStorybook />
   }
 };

 return (
   <div className="space-y-12">
     <div>
       <h3 className="text-3xl font-bold mb-4">Component Library Showcase</h3>
       <p className="text-xl text-gray-600 mb-8 max-w-4xl">
         A well-designed component library provides consistent building blocks that scale across teams and projects.
       </p>

       {/* Component selector */}
       <div className="flex flex-wrap gap-4 mb-8">
         {Object.entries(components).map(([key, comp]) => (
           <button
             key={key}
             onClick={() => setActiveComponent(key)}
             className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
               activeComponent === key
                 ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
             }`}
           >
             {comp.title}
           </button>
         ))}
       </div>

       {/* Component showcase */}
       <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
         <div className="p-8">
           <h4 className="text-2xl font-bold mb-4">{components[activeComponent].title}</h4>
           <p className="text-gray-600 mb-8 text-lg">
             {components[activeComponent].description}
           </p>
           {components[activeComponent].component}
         </div>
       </div>
     </div>
   </div>
 );
};

const ButtonStorybook = () => {
 const [variant, setVariant] = useState('primary');
 const [size, setSize] = useState('md');
 const [disabled, setDisabled] = useState(false);
 const [loading, setLoading] = useState(false);
 const [icon, setIcon] = useState('none');

 const sizeClasses = {
   sm: 'px-4 py-2 text-sm',
   md: 'px-6 py-3 text-base',
   lg: 'px-8 py-4 text-lg'
 };

 const baseClasses = "font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-offset-2 transform hover:scale-105 active:scale-95";

 const variantClasses = {
   primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg focus:ring-orange-500/30',
   secondary: 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 focus:ring-orange-500/30',
   ghost: 'bg-transparent hover:bg-gray-100 text-gray-800 focus:ring-gray-400/30',
   danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg focus:ring-red-500/30'
 };

 const getIcon = () => {
   switch(icon) {
     case 'heart': return <Heart size={20} />;
     case 'star': return <Star size={20} />;
     case 'rocket': return <Rocket size={20} />;
     default: return null;
   }
 };

 const finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
   disabled || loading ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
 }`;

 return (
   <div className="space-y-8">
     {/* Demo area */}
     <div className="bg-gray-50 rounded-2xl p-12 flex items-center justify-center min-h-[200px]">
       <button className={finalClasses} disabled={disabled || loading}>
         {loading && <Loader2 className="animate-spin" size={20} />}
         {!loading && getIcon()}
         <span>{variant.charAt(0).toUpperCase() + variant.slice(1)} Button</span>
       </button>
     </div>

     {/* Controls */}
     <div className="bg-gray-100 rounded-2xl p-6">
       <h5 className="font-semibold mb-4 text-gray-800">Customize Button</h5>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Variant</label>
           <select 
             value={variant} 
             onChange={e => setVariant(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           >
             <option value="primary">Primary</option>
             <option value="secondary">Secondary</option>
             <option value="ghost">Ghost</option>
             <option value="danger">Danger</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
           <select 
             value={size} 
             onChange={e => setSize(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           >
             <option value="sm">Small</option>
             <option value="md">Medium</option>
             <option value="lg">Large</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
           <select 
             value={icon} 
             onChange={e => setIcon(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           >
             <option value="none">None</option>
             <option value="heart">Heart</option>
             <option value="star">Star</option>
             <option value="rocket">Rocket</option>
           </select>
         </div>

         <div className="flex items-center pt-6">
           <input 
             type="checkbox" 
             id="btn_disabled" 
             checked={disabled} 
             onChange={e => setDisabled(e.target.checked)}
             className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
           />
           <label htmlFor="btn_disabled" className="text-sm font-medium text-gray-700">Disabled</label>
         </div>

         <div className="flex items-center pt-6">
           <input 
             type="checkbox" 
             id="btn_loading" 
             checked={loading} 
             onChange={e => setLoading(e.target.checked)}
             className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
           />
           <label htmlFor="btn_loading" className="text-sm font-medium text-gray-700">Loading</label>
         </div>
       </div>
     </div>

     {/* Code example */}
     <div className="space-y-4">
       <h5 className="font-semibold text-gray-800">Generated Code</h5>
       <CodeBlock language="jsx">
{`<Button 
 variant="${variant}"
 size="${size}"
 ${disabled ? 'disabled' : ''}
 ${loading ? 'loading' : ''}
 ${icon !== 'none' ? `icon={<${icon.charAt(0).toUpperCase() + icon.slice(1)} />}` : ''}
>
 ${variant.charAt(0).toUpperCase() + variant.slice(1)} Button
</Button>`}
       </CodeBlock>
     </div>
   </div>
 );
};

const InputStorybook = () => {
 const [value, setValue] = useState('');
 const [type, setType] = useState('text');
 const [state, setState] = useState('default');
 const [hasIcon, setHasIcon] = useState(false);

 const stateStyles = {
   default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
   success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
   error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
   warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500'
 };

 const stateIcons = {
   default: null,
   success: <CheckCircle className="text-green-500" size={20} />,
   error: <XCircle className="text-red-500" size={20} />,
   warning: <AlertTriangle className="text-yellow-500" size={20} />
 };

 const stateMessages = {
   default: '',
   success: 'Looks good!',
   error: 'Please check this field',
   warning: 'This might need attention'
 };

 return (
   <div className="space-y-8">
     {/* Demo area */}
     <div className="bg-gray-50 rounded-2xl p-12">
       <div className="max-w-md mx-auto space-y-4">
         <label className="block text-sm font-medium text-gray-700">
           Sample Input Field
         </label>
         <div className="relative">
           {hasIcon && (
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="text-gray-400" size={20} />
             </div>
           )}
           <input
             type={type}
             value={value}
             onChange={e => setValue(e.target.value)}
             placeholder="Enter text here..."
             className={`
               w-full rounded-lg border-2 py-3 transition-all duration-200
               ${hasIcon ? 'pl-10 pr-10' : 'px-4'}
               ${stateStyles[state]}
               focus:outline-none focus:ring-2 focus:ring-opacity-50
             `}
           />
           {(state !== 'default' || hasIcon) && (
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
               {stateIcons[state]}
             </div>
           )}
         </div>
         {stateMessages[state] && (
           <p className={`text-sm ${
             state === 'success' ? 'text-green-600' :
             state === 'error' ? 'text-red-600' :
             state === 'warning' ? 'text-yellow-600' :
             'text-gray-600'
           }`}>
             {stateMessages[state]}
           </p>
         )}
       </div>
     </div>

     {/* Controls */}
     <div className="bg-gray-100 rounded-2xl p-6">
       <h5 className="font-semibold mb-4 text-gray-800">Customize Input</h5>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
           <select 
             value={type} 
             onChange={e => setType(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded-lg"
           >
             <option value="text">Text</option>
             <option value="email">Email</option>
             <option value="password">Password</option>
             <option value="number">Number</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
           <select 
             value={state} 
             onChange={e => setState(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded-lg"
           >
             <option value="default">Default</option>
             <option value="success">Success</option>
             <option value="error">Error</option>
             <option value="warning">Warning</option>
           </select>
         </div>

         <div className="flex items-center pt-6">
           <input 
             type="checkbox" 
             id="has_icon" 
             checked={hasIcon} 
             onChange={e => setHasIcon(e.target.checked)}
             className="mr-2 w-4 h-4 text-blue-600 rounded"
           />
           <label htmlFor="has_icon" className="text-sm font-medium text-gray-700">Show Icon</label>
         </div>

         <div className="flex items-center pt-6">
           <button
             onClick={() => setValue('')}
             className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
           >
             Clear
           </button>
         </div>
       </div>
     </div>
   </div>
 );
};

const CardStorybook = () => {
 const [layout, setLayout] = useState('default');
 const [interactive, setInteractive] = useState(false);
 const [elevated, setElevated] = useState(true);

 const layouts = {
   default: {
     title: 'Default Card',
     content: (
       <div className="space-y-4">
         <h4 className="text-xl font-semibold">Card Title</h4>
         <p className="text-gray-600">This is a standard card with a title and some descriptive content.</p>
         <div className="flex gap-2">
           <GlowButton size="sm">Action</GlowButton>
           <GlowButton variant="secondary" size="sm">Secondary</GlowButton>
         </div>
       </div>
     )
   },
   media: {
     title: 'Media Card',
     content: (
       <div className="space-y-4">
         <div className="w-full h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
           <span className="text-white font-semibold">Media Content</span>
         </div>
         <h4 className="text-xl font-semibold">Media Card Title</h4>
         <p className="text-gray-600">Cards can include media content like images or videos.</p>
       </div>
     )
   },
   metric: {
     title: 'Metric Card',
     content: (
       <div className="text-center space-y-4">
         <div className="text-3xl font-bold text-blue-600">$24,580</div>
         <h4 className="text-lg font-semibold">Monthly Revenue</h4>
         <div className="flex items-center justify-center gap-2 text-green-600">
           <TrendingUp size={16} />
           <span className="text-sm">+12.5% from last month</span>
         </div>
       </div>
     )
   }
 };

 return (
   <div className="space-y-8">
     {/* Demo area */}
     <div className="bg-gray-50 rounded-2xl p-12 flex items-center justify-center">
       <div 
         className={`
           max-w-sm w-full bg-white rounded-2xl p-6 border transition-all duration-300
           ${elevated ? 'shadow-xl' : 'shadow-md'}
           ${interactive ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' : ''}
         `}
       >
         {layouts[layout].content}
       </div>
     </div>

     {/* Controls */}
     <div className="bg-gray-100 rounded-2xl p-6">
       <h5 className="font-semibold mb-4 text-gray-800">Customize Card</h5>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
           <select 
             value={layout} 
             onChange={e => setLayout(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded-lg"
           >
             <option value="default">Default</option>
             <option value="media">Media</option>
             <option value="metric">Metric</option>
           </select>
         </div>

         <div className="flex items-center pt-6">
           <input 
             type="checkbox" 
             id="interactive" 
             checked={interactive} 
             onChange={e => setInteractive(e.target.checked)}
             className="mr-2 w-4 h-4 text-blue-600 rounded"
           />
           <label htmlFor="interactive" className="text-sm font-medium text-gray-700">Interactive</label>
         </div>

         <div className="flex items-center pt-6">
           <input 
             type="checkbox" 
             id="elevated" 
             checked={elevated} 
             onChange={e => setElevated(e.target.checked)}
             className="mr-2 w-4 h-4 text-blue-600 rounded"
           />
           <label htmlFor="elevated" className="text-sm font-medium text-gray-700">Elevated</label>
         </div>
       </div>
     </div>
   </div>
 );
};

const NotificationStorybook = () => {
 const [notifications, setNotifications] = useState([]);
 const [nextId, setNextId] = useState(1);

 const notificationTypes = [
   { type: 'success', icon: CheckCircle, color: 'green', title: 'Success!', message: 'Operation completed successfully.' },
   { type: 'error', icon: XCircle, color: 'red', title: 'Error', message: 'Something went wrong. Please try again.' },
   { type: 'warning', icon: AlertTriangle, color: 'yellow', title: 'Warning', message: 'Please review your input.' },
   { type: 'info', icon: Info, color: 'blue', title: 'Info', message: 'Here\'s some useful information.' }
 ];

 const addNotification = (type) => {
   const notifData = notificationTypes.find(n => n.type === type);
   const newNotification = {
     id: nextId,
     ...notifData,
     timestamp: Date.now()
   };
   setNotifications(prev => [...prev, newNotification]);
   setNextId(prev => prev + 1);

   // Auto-remove after 5 seconds
   setTimeout(() => {
     removeNotification(newNotification.id);
   }, 5000);
 };

 const removeNotification = (id) => {
   setNotifications(prev => prev.filter(n => n.id !== id));
 };

 return (
   <div className="space-y-8">
     {/* Demo area */}
     <div className="bg-gray-50 rounded-2xl p-6 min-h-[300px] relative">
       <h5 className="font-semibold mb-4 text-gray-800">Notification Demo</h5>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
         {notificationTypes.map(({ type, color }) => (
           <button
             key={type}
             onClick={() => addNotification(type)}
             className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-${color}-500 hover:bg-${color}-600 text-white`}
           >
             Show {type.charAt(0).toUpperCase() + type.slice(1)}
           </button>
         ))}
       </div>

       {/* Notifications container */}
       <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
         {notifications.map((notification) => {
           const IconComponent = notification.icon;
           return (
             <div
               key={notification.id}
               className={`
                 bg-white rounded-xl p-4 shadow-xl border-l-4 
                 border-${notification.color}-500
                 transform transition-all duration-300 ease-out
                 animate-[slideInRight_0.3s_ease-out]
               `}
               style={{
                 animation: 'slideInRight 0.3s ease-out'
               }}
             >
               <div className="flex items-start gap-3">
                 <IconComponent className={`text-${notification.color}-500 flex-shrink-0`} size={20} />
                 <div className="flex-1 min-w-0">
                   <h6 className="font-semibold text-gray-900">{notification.title}</h6>
                   <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                 </div>
                 <button
                   onClick={() => removeNotification(notification.id)}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <XCircle size={16} />
                 </button>
               </div>
             </div>
           );
         })}
       </div>

       <style jsx>{`
         @keyframes slideInRight {
           from {
             transform: translateX(100%);
             opacity: 0;
           }
           to {
             transform: translateX(0);
             opacity: 1;
           }
         }
       `}</style>
     </div>
   </div>
 );
};

const LayoutsSection = () => {
  const [itemCount, setItemCount] = useState(8);
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('flex-start');
  const [useRandomSizes, setUseRandomSizes] = useState(true);
  const [gap, setGap] = useState(16);

  const items = useMemo(
    () =>
      Array.from({ length: itemCount }, (_, i) => ({
        id: i,
        width: useRandomSizes ? Math.floor(Math.random() * 80) + 60 : 80,
        height: useRandomSizes ? Math.floor(Math.random() * 100) + 50 : 80,
      })),
    [itemCount, useRandomSizes]
  );

  return (
    <div className="space-y-16">
      <div>
        <h3 className="text-3xl font-bold mb-4">Flexbox</h3>
        <p className="text-xl text-gray-600 mb-8">
          A one-dimensional layout model for aligning items. Perfect for component-level layouts like aligning buttons in a header.
        </p>
        <div className="bg-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center mb-6">
            <div>
              <label className="font-medium text-sm block mb-1">Items: {itemCount}</label>
              <input
                type="range"
                min="2"
                max="20"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="font-medium text-sm block mb-1">Gap: {gap}px</label>
              <input
                type="range"
                min="0"
                max="40"
                step="4"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="font-medium text-sm block mb-1">Justify</label>
              <select
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option>flex-start</option>
                <option>flex-end</option>
                <option>center</option>
                <option>space-between</option>
                <option>space-around</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-sm block mb-1">Align</label>
              <select
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option>flex-start</option>
                <option>flex-end</option>
                <option>center</option>
                <option>stretch</option>
                <option>baseline</option>
              </select>
            </div>
            <div className="flex items-center pt-5">
              <input
                type="checkbox"
                id="random_size"
                checked={useRandomSizes}
                onChange={(e) => setUseRandomSizes(e.target.checked)}
              />
              <label htmlFor="random_size" className="ml-2 text-sm font-medium">
                Random Sizes
              </label>
            </div>
          </div>
          <div className="min-h-[250px] overflow-x-auto">
            <div
              className="flex h-full rounded-md"
              style={{
                width: 'max-content',
                justifyContent,
                alignItems,
                gap: `${gap}px`,
                flexWrap: 'nowrap',
              }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-center rounded-lg text-white font-bold text-lg shrink-0"
                  style={{
                    backgroundColor: '#CF4500',
                    width: `${item.width}px`,
                    height: alignItems === 'stretch' ? undefined : `${item.height}px`,
                  }}
                >
                  {item.id + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-4">CSS Grid</h3>
        <p className="text-xl text-gray-600 mb-8">
          A two-dimensional layout model for page-level structure. It excels at creating complex, responsive grids with rows and columns.
        </p>
        <div className="bg-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-12 gap-4 min-h-[300px]">
            <div className="col-span-12 md:col-span-3 bg-gray-200 rounded-lg p-4 flex items-center justify-center">
              Sidebar
            </div>
            <div className="col-span-12 md:col-span-9 bg-gray-200 rounded-lg p-4 flex items-center justify-center">
              Main Content
            </div>
            <div className="col-span-12 md:col-span-6 bg-gray-200 rounded-lg p-4 flex items-center justify-center">
              Half Width
            </div>
            <div className="col-span-12 md:col-span-6 bg-gray-200 rounded-lg p-4 flex items-center justify-center">
              Half Width
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Advanced React Section with working demos
const AdvancedReactSection = () => (
 <div className="space-y-16">
   <StateManagementDemo />
   <CustomHookDemo />
   <RenderPropsDemo />
   <ChildrenApiDemo />
   <MemoizationDemo />
 </div>
);

// Fixed State Management Demo
const FlashBox = ({ children, rerenderKey, className = "" }) => {
 const [isFlashing, setFlashing] = useState(false);
 
 useEffect(() => {
   setFlashing(true);
   const timer = setTimeout(() => setFlashing(false), 600);
   return () => clearTimeout(timer);
 }, [rerenderKey]);

 return (
   <div className={`
     p-4 rounded-xl border-2 transition-all duration-500 
     ${isFlashing 
       ? 'bg-yellow-100 border-yellow-400 shadow-xl scale-105' 
       : 'bg-gray-50/50 border-gray-200'
     } ${className}
   `}>
     {children}
   </div>
 );
};

const StateManagementDemo = () => {
 const [drilledCount, setDrilledCount] = useState(0);
 const [contextCount, setContextCount] = useState(0);

 return (
   <div>
     <h3 className="text-3xl font-bold mb-4">State Management: Prop-Drilling vs Context</h3>
     <p className="text-xl text-gray-600 mb-8 max-w-4xl">
       A fundamental architectural choice. Prop-drilling creates tight coupling and causes unnecessary re-renders, 
       while Context provides a decoupled way to share global state efficiently.
     </p>
     
     <div className="grid lg:grid-cols-2 gap-8 items-start">
       <div>
         <h4 className="font-semibold text-center mb-4 text-xl text-red-600">❌ Prop Drilling</h4>
         <p className="text-center text-sm text-gray-600 mb-4">
           Every intermediate component re-renders when state changes
         </p>
         <FlashBox rerenderKey={drilledCount}>
           <div className="text-center mb-4">
             <p className="font-bold text-lg">Parent Component</p>
             <p className="text-sm text-gray-500 mb-3">Re-renders self and all children</p>
             <GlowButton 
               onClick={() => setDrilledCount(c => c + 1)}
               size="sm"
             >
               Increment Count: {drilledCount}
             </GlowButton>
           </div>
           <DrilledChild count={drilledCount} />
         </FlashBox>
       </div>

       <div>
         <h4 className="font-semibold text-center mb-4 text-xl text-green-600">✅ Context API</h4>
         <p className="text-center text-sm text-gray-600 mb-4">
           Only components that consume context re-render
         </p>
         <StateDemoContext.Provider value={{ count: contextCount, setCount: setContextCount }}>
           <FlashBox rerenderKey={contextCount}>
             <div className="text-center mb-4">
               <p className="font-bold text-lg">Provider Component</p>
               <p className="text-sm text-gray-500 mb-3">Re-renders only consumers</p>
               <GlowButton 
                 onClick={() => setContextCount(c => c + 1)}
                 size="sm"
               >
                 Increment Count: {contextCount}
               </GlowButton>
             </div>
             <ContextChild />
           </FlashBox>
         </StateDemoContext.Provider>
       </div>
     </div>

     <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
       <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
         <Lightbulb size={20} />
         Key Insight
       </h5>
       <p className="text-blue-800">
         Notice how the prop-drilling example causes all intermediate components to flash (re-render), 
         while the Context example only updates the components that actually consume the context value. 
         This is why Context is preferred for global state that many components need to access.
       </p>
     </div>
   </div>
 );
};

const DrilledChild = ({ count }) => {
 return (
   <FlashBox rerenderKey={count}>
     <p className="text-center font-semibold text-sm mb-2">Intermediate Child</p>
     <p className="text-center text-xs text-red-600 font-bold mb-3">
       (UNNECESSARY RE-RENDER)
     </p>
     <DrilledGrandchild count={count} />
   </FlashBox>
 );
};

const DrilledGrandchild = ({ count }) => (
 <FlashBox rerenderKey={count}>
   <p className="text-center font-semibold text-sm mb-2">Deep Grandchild</p>
   <p className="text-center text-4xl font-bold">{count}</p>
 </FlashBox>
);

const ContextChild = () => {
 // This component doesn't use context, so it shouldn't re-render
 const [randomKey] = useState(Math.random());
 
 return (
   <div className="p-4 rounded-xl border-2 bg-gray-50/50 border-gray-200">
     <p className="text-center font-semibold text-sm mb-2">Intermediate Child</p>
     <p className="text-center text-xs text-green-600 font-bold mb-3">
       ✨ SKIPS RE-RENDER
     </p>
     <ContextGrandchild />
   </div>
 );
};

const ContextGrandchild = () => {
 const { count } = useContext(StateDemoContext);
 
 return (
   <FlashBox rerenderKey={count}>
     <p className="text-center font-semibold text-sm mb-2">Context Consumer</p>
     <p className="text-center text-4xl font-bold">{count}</p>
   </FlashBox>
 );
};

// Enhanced Custom Hook Demo
const useMousePosition = () => {
 const [position, setPosition] = useState({ x: 0, y: 0 });
 
 useEffect(() => {
   const handleMouseMove = (e) => {
     setPosition({ x: e.clientX, y: e.clientY });
   };
   
   window.addEventListener('mousemove', handleMouseMove);
   return () => window.removeEventListener('mousemove', handleMouseMove);
 }, []);
 
 return position;
};

const useCounter = (initialValue = 0) => {
 const [count, setCount] = useState(initialValue);
 
 const increment = useCallback(() => setCount(c => c + 1), []);
 const decrement = useCallback(() => setCount(c => c - 1), []);
 const reset = useCallback(() => setCount(initialValue), [initialValue]);
 
 return { count, increment, decrement, reset };
};

const CustomHookDemo = () => {
 const { x, y } = useMousePosition();
 const counter = useCounter(0);
 const [showMouse, setShowMouse] = useState(true);

 return (
   <div>
     <h3 className="text-3xl font-bold mb-4">Custom Hooks: Reusable Logic</h3>
     <p className="text-xl text-gray-600 mb-8 max-w-4xl">
       Custom hooks (`use...`) are the primary way to reuse stateful logic between components. 
       They allow us to extract complex logic into self-contained, testable units.
     </p>

     <div className="grid lg:grid-cols-2 gap-8">
       {/* Mouse tracking demo */}
       <div className="bg-white rounded-2xl shadow-lg p-6">
         <div className="flex items-center justify-between mb-4">
           <h4 className="text-xl font-bold">useMousePosition Hook</h4>
           <button
             onClick={() => setShowMouse(!showMouse)}
             className="px-3 py-1 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
           >
             {showMouse ? <EyeOff size={16} /> : <Eye size={16} />}
           </button>
         </div>
         
         <CodeBlock language="javascript">
{`const useMousePosition = () => {
 const [position, setPosition] = useState({ x: 0, y: 0 });
 
 useEffect(() => {
   const handleMouseMove = (e) => {
     setPosition({ x: e.clientX, y: e.clientY });
   };
   
   window.addEventListener('mousemove', handleMouseMove);
   return () => window.removeEventListener('mousemove', handleMouseMove);
 }, []);
 
 return position;
};`}
         </CodeBlock>

         {showMouse && (
           <div className="relative mt-6 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden h-48">
             <div className="text-center z-10 relative">
               <p className="font-mono text-lg font-bold">X: {x}, Y: {y}</p>
               <p className="text-sm text-gray-600 mt-2">Move your mouse around!</p>
             </div>
             
             <div 
               className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full pointer-events-none blur-xl transition-all duration-100"
                style={{
                 left: `${Math.min(Math.max((x / window.innerWidth) * 100, 10), 90)}%`,
                 top: `${Math.min(Math.max((y / window.innerHeight) * 100, 10), 90)}%`,
                 transform: 'translate(-50%, -50%)'
               }}
             />
           </div>
         )}
       </div>

       {/* Counter demo */}
       <div className="bg-white rounded-2xl shadow-lg p-6">
         <h4 className="text-xl font-bold mb-4">useCounter Hook</h4>
         
         <CodeBlock language="javascript">
{`const useCounter = (initialValue = 0) => {
 const [count, setCount] = useState(initialValue);
 
 const increment = useCallback(() => setCount(c => c + 1), []);
 const decrement = useCallback(() => setCount(c => c - 1), []);
 const reset = useCallback(() => setCount(initialValue), [initialValue]);
 
 return { count, increment, decrement, reset };
};`}
         </CodeBlock>

         <div className="mt-6 p-6 bg-gray-50 rounded-xl text-center">
           <div className="text-6xl font-bold text-gray-800 mb-4">{counter.count}</div>
           <div className="flex gap-3 justify-center">
             <GlowButton onClick={counter.decrement} size="sm">-</GlowButton>
             <GlowButton onClick={counter.reset} variant="secondary" size="sm">Reset</GlowButton>
             <GlowButton onClick={counter.increment} size="sm">+</GlowButton>
           </div>
         </div>
       </div>
     </div>

     <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
       <h5 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
         <CheckCircle size={20} />
         Benefits of Custom Hooks
       </h5>
       <ul className="text-green-800 space-y-2">
         <li>• <strong>Reusability:</strong> Logic can be shared across multiple components</li>
         <li>• <strong>Separation of Concerns:</strong> UI logic separated from business logic</li>
         <li>• <strong>Testability:</strong> Hooks can be tested independently</li>
         <li>• <strong>Composition:</strong> Hooks can be combined to create more complex behavior</li>
       </ul>
     </div>
   </div>
 );
};

// Enhanced Render Props Demo
const ToggleRenderProp = ({ children }) => {
 const [on, setOn] = useState(false);
 const toggle = () => setOn(!on);
 return children({ on, toggle });
};

const RenderPropsDemo = () => (
 <div>
   <h3 className="text-3xl font-bold mb-4">Render Props Pattern</h3>
   <p className="text-xl text-gray-600 mb-8 max-w-4xl">
     A powerful pattern for sharing logic where a component's prop is a function that returns a React element. 
     It allows the parent component to control the rendering logic, promoting inversion of control.
   </p>

   <div className="bg-white rounded-2xl shadow-lg p-8">
     <div className="grid lg:grid-cols-3 gap-8 items-center">
       <ToggleRenderProp>
         {({ on, toggle }) => (
           <div className="text-center space-y-4">
             <h4 className="font-semibold text-lg">Toggle Switch</h4>
             <div 
               onClick={toggle} 
               className={`
                 w-16 h-9 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
                 ${on ? 'bg-green-500 shadow-lg' : 'bg-gray-300'}
               `}
             >
               <div 
                 className={`
                   w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 transform
                   ${on ? 'translate-x-7' : 'translate-x-0'}
                 `}
               />
             </div>
             <p className="text-sm text-gray-600">
               State: <span className="font-mono">{on ? 'ON' : 'OFF'}</span>
             </p>
           </div>
         )}
       </ToggleRenderProp>

       <ToggleRenderProp>
         {({ on, toggle }) => (
           <div className="text-center space-y-4">
             <h4 className="font-semibold text-lg">Button Variant</h4>
             <GlowButton 
               onClick={toggle}
               variant={on ? 'danger' : 'primary'}
               className="transition-all duration-300"
             >
               {on ? (
                 <>
                   <XCircle size={20} />
                   DEACTIVATE
                 </>
               ) : (
                 <>
                   <CheckCircle size={20} />
                   ACTIVATE
                 </>
               )}
             </GlowButton>
             <p className="text-sm text-gray-600">
               Status: <span className="font-mono">{on ? 'Active' : 'Inactive'}</span>
             </p>
           </div>
         )}
       </ToggleRenderProp>

       <ToggleRenderProp>
         {({ on, toggle }) => (
           <div className="text-center space-y-4">
             <h4 className="font-semibold text-lg">Heart Favorite</h4>
             <button
               onClick={toggle}
               className="p-4 rounded-full transition-all duration-300 hover:scale-110"
             >
               <Heart 
                 size={48} 
                 className={`transition-all duration-300 ${
                   on 
                     ? 'text-red-500 fill-red-500 scale-110' 
                     : 'text-gray-300 hover:text-red-300'
                 }`}
               />
             </button>
             <p className="text-sm text-gray-600">
               {on ? '💖 Favorited!' : '🤍 Click to favorite'}
             </p>
           </div>
         )}
       </ToggleRenderProp>
     </div>

     <div className="mt-8 pt-8 border-t border-gray-200">
       <CodeBlock language="jsx">
{`// The same logic, different presentations
<ToggleRenderProp>
 {({ on, toggle }) => (
   <button onClick={toggle}>
     {on ? 'Turn Off' : 'Turn On'}
   </button>
 )}
</ToggleRenderProp>

<ToggleRenderProp>
 {({ on, toggle }) => (
   <div className={on ? 'bg-green-500' : 'bg-red-500'} onClick={toggle}>
     Status: {on ? 'Active' : 'Inactive'}
   </div>
 )}
</ToggleRenderProp>`}
       </CodeBlock>
     </div>
   </div>
 </div>
);

// Enhanced Children API Demo
const ChildrenApiDemo = () => {
 const Card = ({ children }) => (
   <div className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
     {children}
   </div>
 );

 const CardHeader = ({ children }) => (
   <div className="pb-4 mb-4 border-b border-gray-200 font-bold text-lg">
     {children}
   </div>
 );

 const CardBody = ({ children }) => (
   <div className="text-gray-600 leading-relaxed">
     {children}
   </div>
 );

 const StructuredCard = ({ children }) => {
   const childArray = Children.toArray(children);
   const header = childArray.find(child => child.type === CardHeader);
   const body = childArray.find(child => child.type === CardBody);
   const otherChildren = childArray.filter(child => 
     child.type !== CardHeader && child.type !== CardBody
   );

   return (
     <div className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
       {header}
       {body}
       {otherChildren.length > 0 && (
         <div className="mt-4 pt-4 border-t border-gray-200">
           {otherChildren}
         </div>
       )}
     </div>
   );
 };

 return (
   <div>
     <h3 className="text-3xl font-bold mb-4">Flexible Components with React.Children</h3>
     <p className="text-xl text-gray-600 mb-8 max-w-4xl">
       The React.Children API provides utilities for dealing with the children prop. 
       It allows components to inspect, transform, and enforce structure, creating more robust and developer-friendly APIs.
     </p>

     <div className="grid lg:grid-cols-2 gap-8">
       <div>
         <h4 className="font-semibold mb-4 text-lg">Standard Children (Flexible)</h4>
         <Card>
           <CardHeader>User Profile Settings</CardHeader>
           <CardBody>
             This card accepts any content in any order. The developer has full control 
             over the structure, but there's no enforcement of the intended API.
           </CardBody>
           <div className="mt-4 flex gap-2">
             <GlowButton size="sm">Save</GlowButton>
             <GlowButton variant="secondary" size="sm">Cancel</GlowButton>
           </div>
         </Card>

         <div className="mt-4">
           <CodeBlock language="jsx">
{`<Card>
 <CardHeader>Title</CardHeader>
 <CardBody>Content here...</CardBody>
 <div>Any other content</div>
</Card>`}
           </CodeBlock>
         </div>
       </div>

       <div>
         <h4 className="font-semibold mb-4 text-lg">Structured with Children.map</h4>
         <StructuredCard>
           <CardBody>
             This card uses React.Children.toArray() to find specific components 
             and renders them in a predefined structure, regardless of the order 
             they were written in.
           </CardBody>
           <CardHeader>Payment Details</CardHeader>
           <div className="flex gap-2">
             <GlowButton size="sm">Process Payment</GlowButton>
             <GlowButton variant="ghost" size="sm">View History</GlowButton>
           </div>
         </StructuredCard>

         <div className="mt-4">
           <CodeBlock language="jsx">
{`// Notice: Body comes before Header!
<StructuredCard>
 <CardBody>Content...</CardBody>
 <CardHeader>Title</CardHeader>
 <div>Extra content</div>
</StructuredCard>`}
           </CodeBlock>
         </div>
       </div>
     </div>

     <div className="mt-8 bg-purple-50 border border-purple-200 rounded-2xl p-6">
       <h5 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
         <Code size={20} />
         Children API Utilities
       </h5>
       <div className="grid md:grid-cols-2 gap-4 text-purple-800">
         <div>
           <code className="bg-purple-100 px-2 py-1 rounded">Children.toArray()</code>
           <p className="text-sm mt-1">Converts children to a flat array</p>
         </div>
         <div>
           <code className="bg-purple-100 px-2 py-1 rounded">Children.map()</code>
           <p className="text-sm mt-1">Maps over each child element</p>
         </div>
         <div>
           <code className="bg-purple-100 px-2 py-1 rounded">Children.count()</code>
           <p className="text-sm mt-1">Returns the number of children</p>
         </div>
         <div>
           <code className="bg-purple-100 px-2 py-1 rounded">Children.only()</code>
           <p className="text-sm mt-1">Ensures only one child exists</p>
         </div>
       </div>
     </div>
   </div>
 );
};

// New Memoization Demo
const MemoizationDemo = () => {
 const [count, setCount] = useState(0);
 const [name, setName] = useState('');
 const [items, setItems] = useState([]);

 // Expensive calculation
 const expensiveCalculation = useMemo(() => {
   console.log('🔄 Expensive calculation running...');
   let result = 0;
   for (let i = 0; i < 1000000; i++) {
     result += Math.random();
   }
   return result.toFixed(2);
 }, [count]); // Only recalculate when count changes

 // Memoized component
 const MemoizedItemList = React.memo(({ items }) => {
   console.log('📝 ItemList re-rendering');
   return (
     <div className="space-y-2">
       <h5 className="font-semibold">Item List ({items.length} items)</h5>
       {items.map((item, index) => (
         <div key={index} className="p-2 bg-gray-100 rounded text-sm">
           {item}
         </div>
       ))}
     </div>
   );
 });

 const addItem = useCallback(() => {
   setItems(prev => [...prev, `Item ${prev.length + 1}`]);
 }, []);

 return (
   <div>
     <h3 className="text-3xl font-bold mb-4">Memoization & Performance</h3>
     <p className="text-xl text-gray-600 mb-8 max-w-4xl">
       React provides several tools for optimization: useMemo for expensive calculations, 
       React.memo for component memoization, and useCallback for stable function references.
     </p>

     <div className="grid lg:grid-cols-2 gap-8">
       {/* Controls */}
       <div className="bg-white rounded-2xl shadow-lg p-6">
         <h4 className="text-xl font-bold mb-4">Controls</h4>
         
         <div className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Count (triggers expensive calculation)
             </label>
             <div className="flex items-center gap-3">
               <GlowButton onClick={() => setCount(c => c - 1)} size="sm">-</GlowButton>
               <span className="text-2xl font-bold w-16 text-center">{count}</span>
               <GlowButton onClick={() => setCount(c => c + 1)} size="sm">+</GlowButton>
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Name (doesn't trigger calculation)
             </label>
             <input
               type="text"
               value={name}
               onChange={e => setName(e.target.value)}
               placeholder="Type something..."
               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Items (memoized component)
             </label>
             <GlowButton onClick={addItem} size="sm">
               Add Item
             </GlowButton>
           </div>
         </div>
       </div>

       {/* Results */}
       <div className="bg-white rounded-2xl shadow-lg p-6">
         <h4 className="text-xl font-bold mb-4">Results</h4>
         
         <div className="space-y-4">
           <div className="p-4 bg-blue-50 rounded-lg">
             <h5 className="font-semibold text-blue-900 mb-2">useMemo Result</h5>
             <p className="text-2xl font-bold text-blue-700">{expensiveCalculation}</p>
             <p className="text-sm text-blue-600 mt-1">
               Only recalculates when count changes
             </p>
           </div>

           <div className="p-4 bg-green-50 rounded-lg">
             <h5 className="font-semibold text-green-900 mb-2">Current State</h5>
             <p><strong>Count:</strong> {count}</p>
             <p><strong>Name:</strong> {name || 'Empty'}</p>
           </div>

           <div className="p-4 bg-purple-50 rounded-lg">
             <MemoizedItemList items={items} />
             <p className="text-sm text-purple-600 mt-2">
               Component only re-renders when items change
             </p>
           </div>
         </div>
       </div>
     </div>

     <div className="mt-8">
       <CodeBlock language="javascript">
{`// useMemo - expensive calculations
const expensiveValue = useMemo(() => {
 return heavyCalculation(dependency);
}, [dependency]);

// React.memo - component memoization  
const MemoizedComponent = React.memo(({ items }) => {
 return <div>{items.map(item => <div key={item}>{item}</div>)}</div>;
});

// useCallback - stable function references
const memoizedCallback = useCallback(() => {
 doSomething(a, b);
}, [a, b]);`}
       </CodeBlock>
     </div>

     <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
       <h5 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
         <AlertTriangle size={20} />
         Performance Tips
       </h5>
       <ul className="text-yellow-800 space-y-2">
         <li>• <strong>Don't overuse memoization:</strong> It has its own overhead</li>
         <li>• <strong>Profile first:</strong> Measure performance before optimizing</li>
         <li>• <strong>Dependencies matter:</strong> Wrong dependencies can cause bugs</li>
         <li>• <strong>Consider alternatives:</strong> Sometimes restructuring is better</li>
       </ul>
     </div>
   </div>
 );
};

// Main App Component with enhanced navigation
export default function App() {
 const [currentSection, setCurrentSection] = useState('react-evolution');

 const sections = {
   'react-evolution': { title: 'React Evolution', component: <ReactEvolutionSection />, icon: <Rocket />, dark: false },
   'js-vs-ts': { title: 'JavaScript vs TypeScript', component: <JSvsTSSection />, icon: <Code />, dark: false },
   'spa-vs-mpa': { title: 'SPA vs MPA Architecture', component: <SPAvsMPASection />, icon: <Globe />, dark: false },
   'project-architecture': { title: 'Project Architecture & Tooling', component: <ProjectArchitectureSection />, icon: <GitBranchPlus />, dark: false },
   'design-systems': { title: 'Design Systems Foundation', component: <DesignSystemsSection />, icon: <Palette />, dark: false },
   'layout-techniques': { title: 'Layout Techniques', component: <LayoutsSection />, icon: <Grid />, dark: false },
   'component-library': { title: 'Component Library', component: <ComponentLibrarySection />, icon: <HardDrive />, dark: false },
   'advanced-react': { title: 'Advanced React Patterns', component: <AdvancedReactSection />, icon: <Layers />, dark: false },
 };

 useEffect(() => {
   const observer = new IntersectionObserver(
     (entries) => {
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           setCurrentSection(entry.target.id);
         }
       });
     },
     { threshold: 0.3 }
   );

   Object.keys(sections).forEach((sectionId) => {
     const element = document.getElementById(sectionId);
     if (element) observer.observe(element);
   });

   return () => observer.disconnect();
 }, []);

 const scrollToSection = (sectionId) => {
   document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
 };

 return (
   <ThemeContext.Provider value={theme}>
     <div style={{ backgroundColor: theme.colors.background, fontFamily: theme.font.body, color: theme.colors.text }}>
       <style>{`
         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
         
         html {
           scroll-behavior: smooth;
         }
         
         .scrollbar-hide {
           -ms-overflow-style: none;
           scrollbar-width: none;
         }
         
         .scrollbar-hide::-webkit-scrollbar {
           display: none;
         }
       `}</style>
       
       <HeroSection />
       
       {/* Navigation */}
       <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4">
           <div className="flex items-center gap-4 py-4 overflow-x-auto scrollbar-hide">
             {Object.entries(sections).map(([key, { title, icon }]) => (
               <button
                 key={key}
                 onClick={() => scrollToSection(key)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                   currentSection === key
                     ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                 }`}
               >
                 {React.cloneElement(icon, { size: 16 })}
                 <span className="hidden sm:inline">{title}</span>
               </button>
             ))}
           </div>
         </div>
       </nav>

       <main>
         {Object.entries(sections).map(([key, { title, component, icon, dark }], index) => (
           <section 
             key={key} 
             id={key} 
             className="py-16 md:py-24 min-h-screen flex items-center"
             style={{
               backgroundColor: dark ? theme.colors.darkBackground : (index % 2 === 1 ? theme.colors.background : theme.colors.backgroundAlt),
               color: dark ? theme.colors.textOnDark : theme.colors.text
             }}
           >
             <div className="container mx-auto px-4 md:px-8 w-full">
               <div className="flex items-center gap-4 mb-12">
                 <div className="p-4 rounded-2xl" style={{backgroundColor: dark ? 'rgba(255,255,255,0.1)' : theme.colors.surface, boxShadow: theme.shadows.md}}>
                   <span style={{color: theme.colors.primary}}>{React.cloneElement(icon, {strokeWidth: 2.5, size: 28})}</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{fontFamily: theme.font.heading}}>{title}</h2>
               </div>
               <div className="md:pl-20">{component}</div>
             </div>
           </section>
         ))}
       </main>
       
       {/* Footer */}
       <footer className="text-center py-12 text-gray-500 border-t bg-gray-50">
         <div className="max-w-4xl mx-auto px-4">
           <p className="text-lg mb-4">
             This comprehensive presentation showcases the depth and breadth of modern frontend engineering.
           </p>
           <p className="text-sm">
             Designed and built with ❤️ by a passionate Software Engineer at Mastercard, demonstrating excellence in UI/UX development.
           </p>
           <div className="mt-6 flex justify-center items-center gap-4">
             <div className="w-8 h-8 bg-red-500 rounded-full"></div>
             <div className="w-8 h-8 bg-orange-500 rounded-full -ml-2 opacity-90"></div>
             <span className="ml-2 font-semibold">Mastercard</span>
           </div>
         </div>
       </footer>
     </div>
   </ThemeContext.Provider>
 );
}