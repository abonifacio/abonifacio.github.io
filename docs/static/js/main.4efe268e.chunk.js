(this.webpackJsonpresume=this.webpackJsonpresume||[]).push([[0],{161:function(e,t,n){},244:function(e,t,n){"use strict";n.r(t);var c=n(3),r=n(1),a=n.n(r),i=n(65),o=n.n(i),s=(n(161),n(277)),l=n(282),u=n(278),j=n(12),b=n(149),d=n(275),O=n(276),f=n(257),h=n(145),p=n(135),m=n(71);n(281);function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object(r.useState)({loading:!1,data:void 0,error:void 0}),c=Object(j.a)(n,2),a=c[0],i=c[1];return Object(r.useEffect)((function(){var n=e.apply(void 0,Object(m.a)(t)).subscribe({next:function(e){return i({data:e,loading:!1,error:void 0})},error:function(e){return i({data:void 0,loading:!1,error:e})}});return function(){return n.unsubscribe()}}),Object(m.a)(t)),a}var g=n(146),v=n(20),w=n(7),C=n(94),y=n(254),S=n(253),k=n(84),F=n(134),T=n(255),A=n(147),E=n(252);function P(e){return"collectedTags"in e?e.collectedTags:e.tags||[]}function M(e){return e.pipe(Object(k.a)(P),Object(A.a)(),Object(E.a)())}function I(e){return"collectedFacets"in e?e.collectedFacets:e.facets||[]}function R(e){return e.pipe(Object(k.a)(I),Object(A.a)(),Object(E.a)())}function z(e){var t=e.tags,n=e.facets;return function(e){return e.pipe(Object(T.a)(function(e){return function(t){return!(null===e||void 0===e?void 0:e.length)||P(t).some((function(t){return e.includes(t)}))}}(t)),Object(T.a)(function(e){return function(t){return!(null===e||void 0===e?void 0:e.length)||I(t).some((function(t){return e.includes(t)}))}}(n)))}}var D,W=n(51),N=n(14),L=n(256),G=n(142);!function(e){e[e.YEAR=1]="YEAR",e[e.MONTH=2]="MONTH",e[e.DATE=3]="DATE"}(D||(D={}));var H=/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/;function Y(e){var t=H.exec(e);if(!t||t.length<2)throw new Error("Cannot parse date: ".concat(e));return t.slice(1).filter((function(e){return void 0!==e}))}function _(e){return"present"===e.toLowerCase()?D.DATE:Y(e).length}function B(e){if("present"===e.toLowerCase())return new Date;var t=function(e){var t=Y(e);return[parseInt(t[0],10),t[1]?parseInt(t[1],10)-1:0,t[2]?parseInt(t[2],10):1]}(e),n=Object(j.a)(t,3),c=n[0],r=n[1],a=n[2];return new Date(c,r,a)}function J(e){return e.split(" - ").map((function(e){return[B(t=e),_(t)];var t}))}function U(e,t){var n=J(e),c=Object(j.a)(n,2),r=Object(j.a)(c[0],2),a=r[0],i=r[1],o=c[1]||t||[],s=Object(j.a)(o,1)[0];return s?Math.round((s.getTime()-a.getTime())/864e5):i===D.YEAR?365:30}function $(e){return function(t){return t.pipe(Object(k.a)((function(t){return Object(N.a)(Object(N.a)({},t),{},{durationInDays:U(t.date,e)})})))}}function q(e){return function(t){return t.pipe(Object(G.a)((function(t,n){var c=n.tags,r=n.durationInDays;return(c||[]).reduce((function(t,n){return Object(N.a)(Object(N.a)({},t),{},Object(W.a)({},n,e(t[n]||0,r)))}),t)}),{}))}}function K(e){return e.pipe(Object(G.a)((function(e,t){return Object.entries(t).reduce((function(e,t){var n=Object(j.a)(t,2),c=n[0],r=n[1];return Object(N.a)(Object(N.a)({},e),{},Object(W.a)({},c,(e[c]||0)+r))}),e)})))}function Q(e){return e.pipe(Object(F.a)((function(e){var t=e.milestones,n=e.period;return Object(C.a)(t||[]).pipe($(J(n)[1]),q(Math.max))})),K)}function V(e){var t=Object(C.a)(e.sideProjects),n=Object(C.a)(e.jobs),c=Object(C.a)(e.education),r=function(e){return e.pipe(Object(F.a)((function(e){var t=Object(C.a)(e.milestones||[]),n=t.pipe(M,Object(S.a)()),c=t.pipe(R,Object(S.a)());return Object(y.a)([n,c]).pipe(Object(k.a)((function(t){var n=Object(w.a)(t,2),c=n[0],r=n[1];return Object(v.a)(Object(v.a)({},e),{},{collectedTags:(e.tags||[]).concat(c),collectedFacets:r})})))})))},a=n.pipe(r),i=c.pipe(r),o=function(e,t,n){var c=Object(C.a)(n).pipe($(),q((function(e,t){return e+t}))),r=Object(C.a)(e).pipe(Q),a=Object(C.a)(t).pipe(Q);return Object(L.a)(c,r,a).pipe(K).pipe(Object(k.a)((function(e){return{experience:e}})))}(n,c,t);return Object(y.a)([a.pipe(Object(S.a)()),i.pipe(Object(S.a)()),o]).pipe(Object(k.a)((function(t){var n=Object(w.a)(t,3),c=n[0],r=n[1],a=n[2];return Object(v.a)(Object(v.a)({},e),{},{jobs:c,education:r,stats:a})})))}function X(){return Object(C.a)(fetch("/resume.json").then((function(e){return e.json()}))).pipe(Object(F.a)(V))}function Z(e,t){var n=x(X),c=x((function(){return(n.data?Object(h.a)(n.data):p.a).pipe(function(e){return function(t){return t.pipe(Object(k.a)((function(t){var n=t.me,c=Object(g.a)(t,["me"]);return Object(v.a)(Object(v.a)({},c),{},{me:Object(v.a)(Object(v.a)({},n),e)})})))}}(t),(c=e,function(e){var t=z(c);return e.pipe(Object(F.a)((function(e){var n=Object(C.a)(e.jobs).pipe(t,Object(S.a)()),c=Object(C.a)(e.education).pipe(t,Object(S.a)()),r=Object(C.a)(e.sideProjects).pipe(t,Object(S.a)());return Object(y.a)([n,c,r]).pipe(Object(k.a)((function(t){var n=Object(w.a)(t,3),c=n[0],r=n[1],a=n[2];return Object(v.a)(Object(v.a)({},e),{},{jobs:c,education:r,sideProjects:a})})))})))}));var c}),[n.data,e,t]);return{loading:!0,resume:c.data,error:n.error||c.error}}var ee=Object(r.createContext)({filters:{tags:[],facets:[]},dispatch:function(e){}});var te=Object(r.createContext)(!1);function ne(e,t){return Object(r.useContext)(te)?t:e}function ce(e){var t=Object(r.useContext)(te);return function(n){return t?n[e]:n}}var re=n(284),ae=n(61),ie=n(260),oe=n(267),se=n(262),le=n(266),ue=n(272),je=n(265),be=n(273),de=n(143),Oe=n(283),fe=n(259),he=n(261),pe=n(57),me=n.n(pe);var xe=Object(r.createContext)({show:function(){},hide:function(){},data:{},showing:!1,onChange:function(){}});function ge(e){var t=e.name,n=e.social;if(!n)return Object(c.jsx)(c.Fragment,{});var r=function(e,t){if("string"!==typeof t)return Object(N.a)({color:"gray"},t);switch(e){case"github":return{color:"gray",label:t,icon:f.a,link:"https://github.com/".concat(t)};case"linkedin":return{color:"linkedin",label:t,icon:f.b,link:"https://linkedin.com/in/".concat(t)};case"twitter":return{color:"twitter",label:t,icon:f.d,link:"https://twitter.com/".concat(t)};default:return null}}(t,n);if(!r)return Object(c.jsx)(c.Fragment,{});var a="string"===typeof n?r:Object(N.a)(Object(N.a)({},r),n),i=a.link,o=a.label,s=a.color;return Object(c.jsx)(de.a,{as:"a",mt:2,mx:{base:2,md:0},rightIcon:"string"===typeof r.icon?Object(c.jsx)(Oe.a,{src:r.icon}):Object(c.jsx)(ae.a,{as:r.icon}),colorScheme:s,href:i,target:"_blank",children:o})}function ve(e){var t=e.email,n=e.phone,a=e.coverLetter,i=e.location,o=e.name,s=e.picture,l=e.socials,u=e.darkModeToggle,b=ce("md"),d=Object(r.useContext)(xe).show;return Object(c.jsxs)(fe.a,{templateColumns:b({base:"1fr",md:"max-content auto max-content"}),columnGap:8,alignItems:"center",w:"100%",children:[Object(c.jsx)(Oe.a,{justifySelf:"center",w:b({base:100,sm:150,md:200}),src:s,borderRadius:"full",onDoubleClick:d,alt:"".concat(o,"'s profile picture")}),Object(c.jsxs)(re.b,{px:2,maxWidth:"100vw",align:"left",children:[Object(c.jsxs)(ie.a,{as:"h1",colorScheme:"gray",textAlign:b({base:"center",md:"left"}),isTruncated:!0,children:[o," ",u]}),i&&Object(c.jsx)(ie.a,{as:"h4",fontSize:"lg",fontWeight:"regular",colorScheme:"gray",textAlign:b({base:"center",md:"left"}),isTruncated:!0,children:i}),t&&Object(c.jsx)(ie.a,{textAlign:b({base:"center",md:"left"}),as:"h5",fontFamily:"monospace",fontSize:"sm",fontWeight:"light",colorScheme:"black",isTruncated:!0,children:t}),n&&Object(c.jsx)(ie.a,{textAlign:b({base:"center",md:"left"}),as:"h5",fontFamily:"monospace",fontSize:"sm",fontWeight:"light",colorScheme:"black",isTruncated:!0,children:n}),Object(c.jsx)(he.a,{textAlign:b({base:"center",md:"left"}),as:"h6",isTruncated:!0,children:Object(c.jsx)(me.a,{className:"markdown",children:a})})]}),Object(c.jsx)(se.a,{wrap:"wrap",direction:b({base:"row",md:"column"}),mt:6,justifyContent:b({base:"space-between",sm:"center",md:"flex-end"}),children:Object.entries(l).map((function(e){var t=Object(j.a)(e,2),n=t[0],r=t[1];return Object(c.jsx)(ge,{name:n,social:r},n)}))})]})}var we=n(264),Ce=n(263),ye=["green","purple","yellow","pink","blue","orange"];function Se(e){var t=function(e){var t,n=0;for(t=0;t<e.length;t+=1)n=(n<<5)-n+e.charCodeAt(t),n|=0;return n}(e);return ye[Math.abs(t)%ye.length]}function ke(e){var t=e.title,n=e.tags,c="- ".concat(t);return n&&(c+=(null===n||void 0===n?void 0:n.map((function(e){return"\n  - ".concat(e)})))||""),c}function Fe(e){var t=e.title,n=e.description,a=e.tags,i=Object(r.useContext)(ee).filters.tags;return Object(c.jsxs)(Ce.a,{mb:2,children:[Object(c.jsxs)(re.a,{children:[Object(c.jsxs)(he.a,{onDoubleClick:function(){return console.log(ke({title:t,tags:a}))},children:[Object(c.jsx)(we.b,{verticalAlign:"text-top",as:je.b,color:"green.500"}),t]}),(null===a||void 0===a?void 0:a.length)?Object(c.jsx)(Ce.a,{children:null===a||void 0===a?void 0:a.map((function(e){return Object(c.jsx)(le.a,{colorScheme:i.includes(e)?Se(e):void 0,size:"sm",textAlign:"right",mr:2,children:e},e)}))}):void 0]}),n&&Object(c.jsxs)(re.a,{pl:6,children:[Object(c.jsx)(oe.a,{h:"auto",alignSelf:"stretch",orientation:"vertical"}),Object(c.jsx)(Ce.a,{pt:2,children:Object(c.jsx)(me.a,{className:"markdown",children:n})})]})]})}function Te(e){var t=e.title,n=e.period,a=e.collectedFacets,i=e.description,o=e.organization,s=e.children,l=e.milestones,u=Object(r.useContext)(ee).filters.facets;return Object(c.jsxs)(re.b,{align:"flex-start",spacing:1,children:[Object(c.jsx)(ie.a,{onDoubleClick:function(){return console.log(function(e){var t=e.description,n=e.milestones;return"\n".concat(t||"","\n\nMilestones:\n").concat((null===n||void 0===n?void 0:n.map((function(e){return ke({title:e.title})})).join("\n"))||"","\n\nTechnologies:\n").concat((null===n||void 0===n?void 0:n.flatMap((function(e){return e.tags||[]})).map((function(e){return"- ".concat(e)})).join("\n"))||"","\n  ")}({description:i,milestones:l}))},size:"sm",children:t}),Object(c.jsxs)(re.a,{spacing:2,align:"baseline",children:[Object(c.jsx)(ie.a,{as:"h6",size:"xs",whiteSpace:"nowrap",fontWeight:"light",children:n}),Object(c.jsx)(he.a,{fontSize:"md",fontWeight:"light",children:o})]}),i?Object(c.jsx)(me.a,{className:"markdown",children:i}):null,(null===a||void 0===a?void 0:a.length)?Object(c.jsx)(se.a,{mb:6,wrap:"wrap",children:null===a||void 0===a?void 0:a.map((function(e){return Object(c.jsx)(le.a,{colorScheme:!u.length||u.includes(e)?"purple":"gray",mt:3,mr:4,children:e},e)}))}):void 0,l?Object(c.jsx)(we.a,{spacing:2,children:l.map((function(e){return Object(c.jsx)(we.c,{children:Object(c.jsx)(Fe,Object(v.a)({},e))},e.title)}))}):void 0,s]})}function Ae(e){var t=e.title,n=e.experiences,r=e.experienceComponent,i=void 0===r?Te:r;return(null===n||void 0===n?void 0:n.length)?Object(c.jsxs)(re.b,{p:6,as:"section",align:"flex-start",children:[Object(c.jsx)(ie.a,{size:"md",fontWeight:"normal",children:t}),Object(c.jsx)(re.b,{w:"100%",spacing:4,align:"flex-start",children:n.map((function(e){return Object(c.jsxs)(a.a.Fragment,{children:[Object(c.jsx)(oe.a,{}),Object(c.jsx)(i,Object(v.a)({},e))]},"".concat(e.title,"-").concat(e.period,"-").concat(e.organization))}))})]}):null}var Ee=n(139),Pe=n(280),Me=n(268),Ie=n(140);function Re(e){return fetch("https://www.coursera.org/api/metaImages.v1/CERTIFICATE_LANDING_PAGE~".concat(e)).then((function(e){return e.json()})).then((function(e){var t,n;return null===e||void 0===e||null===(t=e.elements)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.url}))}function ze(e){var t=e.id,n=e.fallback,a=Object(Ie.a)(Re,[t]),i=a.loading,o=a.result,s=function(){var e=Object(r.useState)("0px"),t=Object(w.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)("0px"),i=Object(w.a)(a,2),o=i[0],s=i[1],l=Object(r.useRef)(null),u=Object(r.useCallback)((function(){var e=l.current;e&&!e.onload&&(e.onload=u);var t=null===e||void 0===e?void 0:e.offsetWidth;if(t){var n=Math.round(.16*t);c("".concat(t-2*n,"px")),s("-".concat(n,"px"))}else setTimeout(u,100)}),[l]);return Object(r.useEffect)(u,[u]),[l,n,o]}(),l=Object(w.a)(s,3),u=l[0],j=l[1],b=l[2];return i?n:o?Object(c.jsx)(Ce.a,{overflow:"hidden",w:j,children:Object(c.jsx)(Oe.a,{ref:u,maxWidth:"400px",ml:b,maxHeight:"200px",fallback:n,src:o,alt:"Certificate image for Coursera:".concat(t)})}):null}function De(e){var t=e.link,n=ce("md"),r=function(e){var t=(/coursera\.org.+verify\/(.+)/.exec(e)||[])[1];if(t)return[t,"coursera"]}(t);if(!r)return null;var a=Object(w.a)(r,2),i=a[0],o=a[1],s={id:i,fallback:Object(c.jsx)(Pe.a,{height:"200px",maxWidth:"300px",width:"100%"})};return Object(c.jsx)(Me.a,{mt:n({base:4,md:0}),justifySelf:n({base:"center",md:"flex-end"}),href:t,target:"_blank",children:"coursera"===o?Object(c.jsx)(ze,Object(v.a)({},s)):void 0})}function We(e){var t=e.certificate,n=Object(Ee.a)(e,["certificate"]);return Object(c.jsxs)(fe.a,{templateColumns:{base:"1fr",md:"auto max-content"},columnGap:4,w:"100%",children:[Object(c.jsx)(Te,Object(N.a)({},n)),t&&Object(c.jsx)(De,{link:t})]})}var Ne=n(269),Le=n(270);function Ge(e){var t=Object(r.useMemo)((function(){return new Set(e)}),[e]);return[Object(r.useCallback)((function(n){return t.has(n)?(c=n,e.filter((function(e){return e!==c}))):function(e,t){return[].concat(Object(m.a)(e),[t])}(e,n);var c}),[e,t]),Object(r.useCallback)((function(e){return t.has(e)}),[t])]}function He(e){var t=e/365,n=Math.floor(t),c=t-n;return c>.7?"".concat(n+1):0===n?"<1":c>.2?"".concat(n,"+"):"".concat(n)}function Ye(e){var t=e.experience,n=e.tags,a=Object(r.useContext)(ee),i=a.filters,o=a.dispatch,s=ne(!1,!0),l=Ge(i.tags),u=Object(j.a)(l,2),b=u[0],d=u[1],O=Object(r.useMemo)((function(){return n.sort().sort((function(e,n){return t[n]-t[e]})).map((function(e){return[e,He(t[e])]}))}),[n,t]);return Object(c.jsx)(se.a,{w:"100%",justifyContent:"space-around",wrap:"wrap",children:O.map((function(e){var t=Object(j.a)(e,2),n=t[0],r=t[1];return Object(c.jsxs)(Ne.a,{mt:2,flexGrow:0,textAlign:"center",children:[Object(c.jsxs)(le.a,{size:"lg",borderRadius:"full",onClick:function(){return o({tags:b(n)})},colorScheme:d(n)&&!s?"green":"white",value:n,children:[Object(c.jsx)(le.c,{style:{cursor:"pointer"},children:n}),Object(c.jsx)(Le.a,{in:d(n)&&!s,unmountOnExit:!0,children:Object(c.jsx)(le.b,{})})]}),Object(c.jsx)(Ne.c,{children:r}),Object(c.jsx)(Ne.b,{mb:0,children:"Years"})]},n)}))})}var _e=n(271);function Be(e){var t=e.colorScheme,n=e.selected,r=e.availableOptions,a=e.onChange,i=Ge(n),o=Object(j.a)(i,2),s=o[0],l=o[1];return Object(c.jsx)(_e.a,{justify:"center",spacing:1,children:r.map((function(e){return Object(c.jsx)(_e.b,{children:Object(c.jsxs)(le.a,{size:"lg",borderRadius:"full",onClick:function(){return a(s(e))},colorScheme:l(e)?t:"white",value:e,children:[Object(c.jsx)(le.c,{style:{cursor:"pointer"},children:e}),Object(c.jsx)(Le.a,{in:l(e),unmountOnExit:!0,children:Object(c.jsx)(le.b,{})})]})},e)}))})}function Je(e){var t=e.availableFacets,n=Object(r.useContext)(ee),a=n.filters,i=n.dispatch,o=ne("grid","none");return Object(c.jsxs)(fe.a,{className:"no-print",display:o,templateColumns:{base:"auto",sm:"min-content auto"},columnGap:2,rowGap:2,justifyItems:{base:"center",sm:"flex-start"},alignItems:"baseline",alignSelf:"center",children:[Object(c.jsx)(ie.a,{justifySelf:{base:"center",sm:"flex-end"},as:"h5",fontSize:"md",fontWeight:"light",colorScheme:"black",children:"Facets"}),Object(c.jsx)(Be,{onChange:function(e){return i({facets:e})},colorScheme:"purple",availableOptions:t,selected:a.facets})]})}function Ue(e){var t=e.resume,n=e.toggles,i=Object(r.useContext)(ee).filters.facets,o=x((function(){return Object(C.a)(t.sideProjects).pipe(R,Object(S.a)())}),[t.sideProjects]).data;return Object(c.jsxs)(re.b,{p:{base:0,md:4},as:"header",spacing:6,align:{base:"center",md:"start"},children:[Object(c.jsx)(ve,Object(N.a)(Object(N.a)({},t.me),{},{darkModeToggle:n})),Object(c.jsx)(Je,{availableFacets:t.filters.facets}),Object(c.jsx)(Ye,Object(N.a)({tags:t.filters.tags},t.stats)),Object(c.jsx)(Ae,{title:Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(ae.a,{verticalAlign:"text-top",as:ue.a})," Experience"]}),experiences:t.jobs}),Object(c.jsx)(Ae,{title:Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(ae.a,{verticalAlign:"bottom",mb:"2px",as:je.a})," Education"]}),experienceComponent:We,experiences:t.education}),t.sideProjects.length?Object(c.jsxs)(re.b,{p:6,as:"section",align:"flex-start",children:[Object(c.jsxs)(ie.a,{size:"md",fontWeight:"normal",children:[Object(c.jsx)(ae.a,{verticalAlign:"bottom",mb:"2px",as:be.a})," Side Projects"]}),Object(c.jsx)(oe.a,{}),(null===o||void 0===o?void 0:o.length)?Object(c.jsx)(se.a,{mb:6,wrap:"wrap",children:o.map((function(e){return Object(c.jsx)(le.a,{colorScheme:!i.length||i.includes(e)?"purple":"gray",mt:3,mr:4,children:e},e)}))}):void 0,Object(c.jsx)(re.b,{w:"100%",spacing:2,align:"flex-start",children:t.sideProjects.map((function(e){return Object(c.jsx)(a.a.Fragment,{children:Object(c.jsx)(Fe,Object(N.a)({},e))},"".concat(e.title,"-").concat(e.date))}))})]}):void 0]})}var $e=n(279),qe=n(60),Ke=n(274),Qe=n(286);function Ve(){var e=Object(r.useContext)(xe),t=e.hide,n=e.data,i=e.onChange,o=e.showing,s=Object(r.useState)(n.email||""),l=Object(j.a)(s,2),u=l[0],b=l[1],d=Object(r.useState)(n.phone||""),O=Object(j.a)(d,2),f=O[0],h=O[1],p=a.a.useRef(null);return Object(c.jsxs)($e.a,{initialFocusRef:p,isOpen:o,onClose:t,children:[Object(c.jsx)($e.g,{}),Object(c.jsx)($e.d,{children:Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault(),i({email:u,phone:f}),t()},children:[Object(c.jsx)($e.f,{children:"Complete your contact info"}),Object(c.jsx)($e.c,{}),Object(c.jsxs)($e.b,{pb:6,children:[Object(c.jsxs)(qe.a,{children:[Object(c.jsx)(Ke.a,{children:"Email"}),Object(c.jsx)(Qe.a,{name:"email",type:"email",value:u,onChange:function(e){return b(e.target.value)},ref:p,placeholder:"johndoe@gmail.com"})]}),Object(c.jsxs)(qe.a,{mt:4,children:[Object(c.jsx)(Ke.a,{children:"Phone"}),Object(c.jsx)(Qe.a,{type:"phone",name:"phone",value:f,onChange:function(e){return h(e.target.value)},placeholder:"+99999999"})]})]}),Object(c.jsx)($e.e,{justifyContent:"center",children:Object(c.jsx)(de.a,{type:"submit",colorScheme:"blue",mr:3,children:"Complete"})})]})})]})}var Xe=function(){var e=Object(b.b)(),t=e.colorMode,n=e.toggleColorMode,a=Object(r.useReducer)((function(e){return e?document.body.classList.remove("print-mode"):document.body.classList.add("print-mode"),!e}),!1),i=Object(j.a)(a,2),o=i[0],s=i[1];!function(e,t){Object(r.useEffect)((function(){e&&(window.print(),t())}),[e,t])}(o,s);var l=Object(r.useReducer)((function(e,t){return Object(N.a)(Object(N.a)({},e),t)}),{tags:[],facets:[]}),u=Object(j.a)(l,2),h=u[0],p=u[1],m=function(){var e=Object(r.useState)(!1),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(r.useReducer)((function(e,t){return Object(N.a)(Object(N.a)({},e),t)}),{}),i=Object(j.a)(a,2);return{hide:function(){return c(!1)},show:function(){return c(!0)},data:i[0],onChange:i[1],showing:n}}(),x=Z(h,m.data).resume;return x?Object(c.jsx)(te.Provider,{value:o,children:Object(c.jsxs)(xe.Provider,{value:m,children:[Object(c.jsx)(Ve,{}),Object(c.jsx)(ee.Provider,{value:{filters:h,dispatch:p},children:Object(c.jsx)(Ue,{resume:x,toggles:Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(d.a,{display:o?"none":"inline-flex","aria-label":"Dark mode",onClick:n,children:Object(c.jsx)(O.a,{})}),Object(c.jsx)(d.a,{ml:2,display:{base:"none",md:"dark"===t?"none":"inline-flex"},"aria-label":"Print",onClick:s,children:Object(c.jsx)(f.c,{})})]})})})]})}):null},Ze=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,287)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},et=Object(s.a)({shadows:{outline:"none"},fonts:{heading:"Raleway, sans-serif",body:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif"},components:{Text:{variants:{defaultProps:{size:"lg"}}}},styles:{global:function(e){return{body:{fontFamily:"Raleway, sans-serif",color:Object(u.a)("gray.700","whiteAlpha.900")(e),bg:Object(u.a)("gray.50","gray.900")(e),lineHeight:"base"},section:{bg:Object(u.a)("white","gray.900")(e),boxShadow:"md",w:"100%"},p:{fontFamily:"'Source Serif Pro', serif"}}}}}),tt=Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(l.a,{theme:et,resetCSS:!0,children:Object(c.jsx)(Xe,{})})}),nt=document.getElementById("root");(null===nt||void 0===nt?void 0:nt.hasChildNodes())?o.a.hydrate(tt,nt):o.a.render(tt,nt),Ze(console.log)}},[[244,1,2]]]);
//# sourceMappingURL=main.4efe268e.chunk.js.map