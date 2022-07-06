var r="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};
/**
 * vis-data
 * http://visjs.org/
 *
 * Manage unstructured data using DataSet. Add, update, and remove data, and listen for changes in the data.
 *
 * @version 7.1.4
 * @date    2022-03-15T15:23:59.245Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */(function(r,a){a(t)})(0,(function(t){function _classCallCheck(r,t){if(!(r instanceof t))throw new TypeError("Cannot call a class as a function")}var a="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof r?r:"undefined"!==typeof self?self:{};var i={exports:{}};var check=function(r){return r&&r.Math==Math&&r};var o=check("object"==typeof globalThis&&globalThis)||check("object"==typeof window&&window)||check("object"==typeof self&&self)||check("object"==typeof a&&a)||function(){return this||r}()||Function("return this")();var fails$r=function(r){try{return!!r()}catch(r){return true}};var v=fails$r;var u=!v((function(){var r=function(){}.bind();return"function"!=typeof r||r.hasOwnProperty("prototype")}));var c=u;var l=Function.prototype;var h=l.apply;var p=l.call;var d="object"==typeof Reflect&&Reflect.apply||(c?p.bind(h):function(){return p.apply(h,arguments)});var y=u;var g=Function.prototype;var m=g.bind;var _=g.call;var b=y&&m.bind(_,_);var w=y?function(r){return r&&b(r)}:function(r){return r&&function(){return _.apply(r,arguments)}};var isCallable$h=function(r){return"function"==typeof r};var T={};var A=fails$r;var O=!A((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}));var E=u;var I=Function.prototype.call;var S=E?I.bind(I):function(){return I.apply(I,arguments)};var k={};var P={}.propertyIsEnumerable;var x=Object.getOwnPropertyDescriptor;var D=x&&!P.call({1:2},1);k.f=D?function propertyIsEnumerable(t){var a=x(this||r,t);return!!a&&a.enumerable}:P;var createPropertyDescriptor$5=function(r,t){return{enumerable:!(1&r),configurable:!(2&r),writable:!(4&r),value:t}};var j=w;var C=j({}.toString);var L=j("".slice);var classofRaw$1=function(r){return L(C(r),8,-1)};var R=o;var M=w;var z=fails$r;var N=classofRaw$1;var $=R.Object;var q=M("".split);var G=z((function(){return!$("z").propertyIsEnumerable(0)}))?function(r){return"String"==N(r)?q(r,""):$(r)}:$;var H=o;var V=H.TypeError;var requireObjectCoercible$5=function(r){if(void 0==r)throw V("Can't call method on "+r);return r};var W=G;var Y=requireObjectCoercible$5;var toIndexedObject$b=function(r){return W(Y(r))};var U=isCallable$h;var isObject$f=function(r){return"object"==typeof r?null!==r:U(r)};var X={};var B=X;var Q=o;var J=isCallable$h;var aFunction=function(r){return J(r)?r:void 0};var getBuiltIn$9=function(r,t){return arguments.length<2?aFunction(B[r])||aFunction(Q[r]):B[r]&&B[r][t]||Q[r]&&Q[r][t]};var K=w;var Z=K({}.isPrototypeOf);var rr=getBuiltIn$9;var tr=rr("navigator","userAgent")||"";var er=o;var ar=tr;var nr=er.process;var ir=er.Deno;var or=nr&&nr.versions||ir&&ir.version;var vr=or&&or.v8;var sr,ur;if(vr){sr=vr.split(".");ur=sr[0]>0&&sr[0]<4?1:+(sr[0]+sr[1])}if(!ur&&ar){sr=ar.match(/Edge\/(\d+)/);if(!sr||sr[1]>=74){sr=ar.match(/Chrome\/(\d+)/);sr&&(ur=+sr[1])}}var cr=ur;var lr=cr;var fr=fails$r;var hr=!!Object.getOwnPropertySymbols&&!fr((function(){var r=Symbol();return!String(r)||!(Object(r)instanceof Symbol)||!Symbol.sham&&lr&&lr<41}));var pr=hr;var dr=pr&&!Symbol.sham&&"symbol"==typeof Symbol.iterator;var yr=o;var gr=getBuiltIn$9;var mr=isCallable$h;var _r=Z;var br=dr;var wr=yr.Object;var Tr=br?function(r){return"symbol"==typeof r}:function(r){var t=gr("Symbol");return mr(t)&&_r(t.prototype,wr(r))};var Ar=o;var Or=Ar.String;var tryToString$4=function(r){try{return Or(r)}catch(r){return"Object"}};var Er=o;var Ir=isCallable$h;var Sr=tryToString$4;var kr=Er.TypeError;var aCallable$7=function(r){if(Ir(r))return r;throw kr(Sr(r)+" is not a function")};var Pr=aCallable$7;var getMethod$3=function(r,t){var a=r[t];return null==a?void 0:Pr(a)};var xr=o;var Dr=S;var jr=isCallable$h;var Cr=isObject$f;var Lr=xr.TypeError;var ordinaryToPrimitive$1=function(r,t){var a,i;if("string"===t&&jr(a=r.toString)&&!Cr(i=Dr(a,r)))return i;if(jr(a=r.valueOf)&&!Cr(i=Dr(a,r)))return i;if("string"!==t&&jr(a=r.toString)&&!Cr(i=Dr(a,r)))return i;throw Lr("Can't convert object to primitive value")};var Fr={exports:{}};var Rr=o;var Mr=Object.defineProperty;var setGlobal$1=function(r,t){try{Mr(Rr,r,{value:t,configurable:true,writable:true})}catch(a){Rr[r]=t}return t};var zr=o;var Nr=setGlobal$1;var $r="__core-js_shared__";var qr=zr[$r]||Nr($r,{});var Gr=qr;var Hr=Gr;(Fr.exports=function(r,t){return Hr[r]||(Hr[r]=void 0!==t?t:{})})("versions",[]).push({version:"3.21.1",mode:"pure",copyright:"© 2014-2022 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE",source:"https://github.com/zloirock/core-js"});var Vr=o;var Wr=requireObjectCoercible$5;var Yr=Vr.Object;var toObject$e=function(r){return Yr(Wr(r))};var Ur=w;var Xr=toObject$e;var Br=Ur({}.hasOwnProperty);var Qr=Object.hasOwn||function hasOwn(r,t){return Br(Xr(r),t)};var Jr=w;var Kr=0;var Zr=Math.random();var rt=Jr(1..toString);var uid$4=function(r){return"Symbol("+(void 0===r?"":r)+")_"+rt(++Kr+Zr,36)};var tt=o;var et=Fr.exports;var at=Qr;var nt=uid$4;var it=hr;var ot=dr;var vt=et("wks");var st=tt.Symbol;var ut=st&&st.for;var ct=ot?st:st&&st.withoutSetter||nt;var wellKnownSymbol$j=function(r){if(!at(vt,r)||!(it||"string"==typeof vt[r])){var t="Symbol."+r;it&&at(st,r)?vt[r]=st[r]:vt[r]=ot&&ut?ut(t):ct(t)}return vt[r]};var lt=o;var ft=S;var ht=isObject$f;var pt=Tr;var dt=getMethod$3;var yt=ordinaryToPrimitive$1;var gt=wellKnownSymbol$j;var mt=lt.TypeError;var _t=gt("toPrimitive");var toPrimitive$1=function(r,t){if(!ht(r)||pt(r))return r;var a=dt(r,_t);var i;if(a){void 0===t&&(t="default");i=ft(a,r,t);if(!ht(i)||pt(i))return i;throw mt("Can't convert object to primitive value")}void 0===t&&(t="number");return yt(r,t)};var bt=toPrimitive$1;var wt=Tr;var toPropertyKey$4=function(r){var t=bt(r,"string");return wt(t)?t:t+""};var Tt=o;var At=isObject$f;var Ot=Tt.document;var Et=At(Ot)&&At(Ot.createElement);var documentCreateElement$1=function(r){return Et?Ot.createElement(r):{}};var It=O;var St=fails$r;var kt=documentCreateElement$1;var Pt=!It&&!St((function(){return 7!=Object.defineProperty(kt("div"),"a",{get:function(){return 7}}).a}));var xt=O;var Dt=S;var jt=k;var Ct=createPropertyDescriptor$5;var Lt=toIndexedObject$b;var Ft=toPropertyKey$4;var Rt=Qr;var Mt=Pt;var zt=Object.getOwnPropertyDescriptor;T.f=xt?zt:function getOwnPropertyDescriptor(r,t){r=Lt(r);t=Ft(t);if(Mt)try{return zt(r,t)}catch(r){}if(Rt(r,t))return Ct(!Dt(jt.f,r,t),r[t])};var Nt=fails$r;var $t=isCallable$h;var qt=/#|\.prototype\./;var isForced$1=function(r,t){var a=Ht[Gt(r)];return a==Wt||a!=Vt&&($t(t)?Nt(t):!!t)};var Gt=isForced$1.normalize=function(r){return String(r).replace(qt,".").toLowerCase()};var Ht=isForced$1.data={};var Vt=isForced$1.NATIVE="N";var Wt=isForced$1.POLYFILL="P";var Yt=isForced$1;var Ut=w;var Xt=aCallable$7;var Bt=u;var Qt=Ut(Ut.bind);var functionBindContext=function(r,t){Xt(r);return void 0===t?r:Bt?Qt(r,t):function(){return r.apply(t,arguments)}};var Jt={};var Kt=O;var Zt=fails$r;var re=Kt&&Zt((function(){return 42!=Object.defineProperty((function(){}),"prototype",{value:42,writable:false}).prototype}));var te=o;var ee=isObject$f;var ae=te.String;var ne=te.TypeError;var anObject$b=function(r){if(ee(r))return r;throw ne(ae(r)+" is not an object")};var ie=o;var oe=O;var ve=Pt;var se=re;var ue=anObject$b;var ce=toPropertyKey$4;var le=ie.TypeError;var fe=Object.defineProperty;var he=Object.getOwnPropertyDescriptor;var pe="enumerable";var de="configurable";var ye="writable";Jt.f=oe?se?function defineProperty(r,t,a){ue(r);t=ce(t);ue(a);if("function"===typeof r&&"prototype"===t&&"value"in a&&ye in a&&!a[ye]){var i=he(r,t);if(i&&i[ye]){r[t]=a.value;a={configurable:de in a?a[de]:i[de],enumerable:pe in a?a[pe]:i[pe],writable:false}}}return fe(r,t,a)}:fe:function defineProperty(r,t,a){ue(r);t=ce(t);ue(a);if(ve)try{return fe(r,t,a)}catch(r){}if("get"in a||"set"in a)throw le("Accessors not supported");"value"in a&&(r[t]=a.value);return r};var ge=O;var me=Jt;var _e=createPropertyDescriptor$5;var be=ge?function(r,t,a){return me.f(r,t,_e(1,a))}:function(r,t,a){r[t]=a;return r};var we=o;var Te=d;var Ae=w;var Oe=isCallable$h;var Ee=T.f;var Ie=Yt;var Se=X;var ke=functionBindContext;var Pe=be;var xe=Qr;var wrapConstructor=function(t){var Wrapper=function(a,i,o){if((this||r)instanceof Wrapper){switch(arguments.length){case 0:return new t;case 1:return new t(a);case 2:return new t(a,i)}return new t(a,i,o)}return Te(t,this||r,arguments)};Wrapper.prototype=t.prototype;return Wrapper};var _export=function(r,t){var a=r.target;var i=r.global;var o=r.stat;var v=r.proto;var u=i?we:o?we[a]:(we[a]||{}).prototype;var c=i?Se:Se[a]||Pe(Se,a,{})[a];var l=c.prototype;var h,p,d;var y,g,m,_,b,w;for(y in t){h=Ie(i?y:a+(o?".":"#")+y,r.forced);p=!h&&u&&xe(u,y);m=c[y];if(p)if(r.noTargetGet){w=Ee(u,y);_=w&&w.value}else _=u[y];g=p&&_?_:t[y];if(!p||typeof m!=typeof g){b=r.bind&&p?ke(g,we):r.wrap&&p?wrapConstructor(g):v&&Oe(g)?Ae(g):g;(r.sham||g&&g.sham||m&&m.sham)&&Pe(b,"sham",true);Pe(c,y,b);if(v){d=a+"Prototype";xe(Se,d)||Pe(Se,d,{});Pe(Se[d],y,g);r.real&&l&&!l[y]&&Pe(l,y,g)}}}};var De=_export;var je=O;var Ce=Jt.f;De({target:"Object",stat:true,forced:Object.defineProperty!==Ce,sham:!je},{defineProperty:Ce});var Le=X;var Fe=Le.Object;var Re=i.exports=function defineProperty(r,t,a){return Fe.defineProperty(r,t,a)};Fe.defineProperty.sham&&(Re.sham=true);var Me=i.exports;var ze=Me;var Ne=ze;var $e=Ne;var qe=$e;var Ge=qe;var He=Ge;function _defineProperties(r,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||false;i.configurable=true;"value"in i&&(i.writable=true);He(r,i.key,i)}}function _createClass(r,t,a){t&&_defineProperties(r.prototype,t);a&&_defineProperties(r,a);He(r,"prototype",{writable:false});return r}function _defineProperty(r,t,a){t in r?He(r,t,{value:a,enumerable:true,configurable:true,writable:true}):r[t]=a;return r}var Ve=w;var We=Ve([].slice);var Ye=o;var Ue=w;var Xe=aCallable$7;var Be=isObject$f;var Qe=Qr;var Je=We;var Ke=u;var Ze=Ye.Function;var ra=Ue([].concat);var ta=Ue([].join);var ea={};var construct$4=function(r,t,a){if(!Qe(ea,t)){for(var i=[],o=0;o<t;o++)i[o]="a["+o+"]";ea[t]=Ze("C,a","return new C("+ta(i,",")+")")}return ea[t](r,a)};var aa=Ke?Ze.bind:function bind(t){var a=Xe(this||r);var i=a.prototype;var o=Je(arguments,1);var v=function bound(){var i=ra(o,Je(arguments));return(this||r)instanceof v?construct$4(a,i.length,i):a.apply(t,i)};Be(i)&&(v.prototype=i);return v};var na=_export;var ia=aa;na({target:"Function",proto:true,forced:Function.bind!==ia},{bind:ia});var oa=X;var entryVirtual$k=function(r){return oa[r+"Prototype"]};var va=entryVirtual$k;var sa=va("Function").bind;var ua=Z;var ca=sa;var la=Function.prototype;var bind$8=function(r){var t=r.bind;return r===la||ua(la,r)&&t===la.bind?ca:t};var fa=bind$8;var ha=fa;var pa=ha;var da=Math.ceil;var ya=Math.floor;var toIntegerOrInfinity$4=function(r){var t=+r;return t!==t||0===t?0:(t>0?ya:da)(t)};var ga=toIntegerOrInfinity$4;var ma=Math.min;var toLength$1=function(r){return r>0?ma(ga(r),9007199254740991):0};var _a=toLength$1;var lengthOfArrayLike$d=function(r){return _a(r.length)};var ba=o;var wa=aCallable$7;var Ta=toObject$e;var Aa=G;var Oa=lengthOfArrayLike$d;var Ea=ba.TypeError;var createMethod$5=function(r){return function(t,a,i,o){wa(a);var v=Ta(t);var u=Aa(v);var c=Oa(v);var l=r?c-1:0;var h=r?-1:1;if(i<2)while(true){if(l in u){o=u[l];l+=h;break}l+=h;if(r?l<0:c<=l)throw Ea("Reduce of empty array with no initial value")}for(;r?l>=0:c>l;l+=h)l in u&&(o=a(o,u[l],l,v));return o}};var Ia={left:createMethod$5(false),right:createMethod$5(true)};var Sa=fails$r;var arrayMethodIsStrict$5=function(r,t){var a=[][r];return!!a&&Sa((function(){a.call(null,t||function(){return 1},1)}))};var ka=classofRaw$1;var Pa=o;var xa="process"==ka(Pa.process);var Da=_export;var ja=Ia.left;var Ca=arrayMethodIsStrict$5;var La=cr;var Fa=xa;var Ra=Ca("reduce");var Ma=!Fa&&La>79&&La<83;Da({target:"Array",proto:true,forced:!Ra||Ma},{reduce:function reduce(t){var a=arguments.length;return ja(this||r,t,a,a>1?arguments[1]:void 0)}});var za=entryVirtual$k;var Na=za("Array").reduce;var $a=Z;var qa=Na;var Ga=Array.prototype;var reduce$2=function(r){var t=r.reduce;return r===Ga||$a(Ga,r)&&t===Ga.reduce?qa:t};var Ha=reduce$2;var Va=Ha;var Wa=Va;var Ya=classofRaw$1;var Ua=Array.isArray||function isArray(r){return"Array"==Ya(r)};var Xa=wellKnownSymbol$j;var Ba=Xa("toStringTag");var Qa={};Qa[Ba]="z";var Ja="[object z]"===String(Qa);var Ka=o;var Za=Ja;var rn=isCallable$h;var tn=classofRaw$1;var en=wellKnownSymbol$j;var an=en("toStringTag");var nn=Ka.Object;var vn="Arguments"==tn(function(){return arguments}());var tryGet=function(r,t){try{return r[t]}catch(r){}};var sn=Za?tn:function(r){var t,a,i;return void 0===r?"Undefined":null===r?"Null":"string"==typeof(a=tryGet(t=nn(r),an))?a:vn?tn(t):"Object"==(i=tn(t))&&rn(t.callee)?"Arguments":i};var un=w;var cn=isCallable$h;var ln=Gr;var fn=un(Function.toString);cn(ln.inspectSource)||(ln.inspectSource=function(r){return fn(r)});var hn=ln.inspectSource;var pn=w;var dn=fails$r;var yn=isCallable$h;var gn=sn;var mn=getBuiltIn$9;var _n=hn;var noop=function(){};var bn=[];var wn=mn("Reflect","construct");var Tn=/^\s*(?:class|function)\b/;var An=pn(Tn.exec);var On=!Tn.exec(noop);var En=function isConstructor(r){if(!yn(r))return false;try{wn(noop,bn,r);return true}catch(r){return false}};var In=function isConstructor(r){if(!yn(r))return false;switch(gn(r)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return false}try{return On||!!An(Tn,_n(r))}catch(r){return true}};In.sham=true;var Sn=!wn||dn((function(){var r;return En(En.call)||!En(Object)||!En((function(){r=true}))||r}))?In:En;var kn=o;var Pn=Ua;var xn=Sn;var Dn=isObject$f;var jn=wellKnownSymbol$j;var Cn=jn("species");var Ln=kn.Array;var arraySpeciesConstructor$1=function(r){var t;if(Pn(r)){t=r.constructor;if(xn(t)&&(t===Ln||Pn(t.prototype)))t=void 0;else if(Dn(t)){t=t[Cn];null===t&&(t=void 0)}}return void 0===t?Ln:t};var Fn=arraySpeciesConstructor$1;var arraySpeciesCreate$4=function(r,t){return new(Fn(r))(0===t?0:t)};var Rn=functionBindContext;var Mn=w;var zn=G;var Nn=toObject$e;var $n=lengthOfArrayLike$d;var qn=arraySpeciesCreate$4;var Gn=Mn([].push);var createMethod$4=function(r){var t=1==r;var a=2==r;var i=3==r;var o=4==r;var v=6==r;var u=7==r;var c=5==r||v;return function(l,h,p,d){var y=Nn(l);var g=zn(y);var m=Rn(h,p);var _=$n(g);var b=0;var w=d||qn;var T=t?w(l,_):a||u?w(l,0):void 0;var A,O;for(;_>b;b++)if(c||b in g){A=g[b];O=m(A,b,y);if(r)if(t)T[b]=O;else if(O)switch(r){case 3:return true;case 5:return A;case 6:return b;case 2:Gn(T,A)}else switch(r){case 4:return false;case 7:Gn(T,A)}}return v?-1:i||o?o:T}};var Hn={forEach:createMethod$4(0),map:createMethod$4(1),filter:createMethod$4(2),some:createMethod$4(3),every:createMethod$4(4),find:createMethod$4(5),findIndex:createMethod$4(6),filterReject:createMethod$4(7)};var Vn=fails$r;var Wn=wellKnownSymbol$j;var Yn=cr;var Un=Wn("species");var arrayMethodHasSpeciesSupport$5=function(r){return Yn>=51||!Vn((function(){var t=[];var a=t.constructor={};a[Un]=function(){return{foo:1}};return 1!==t[r](Boolean).foo}))};var Xn=_export;var Bn=Hn.filter;var Qn=arrayMethodHasSpeciesSupport$5;var Jn=Qn("filter");Xn({target:"Array",proto:true,forced:!Jn},{filter:function filter(t){return Bn(this||r,t,arguments.length>1?arguments[1]:void 0)}});var Kn=entryVirtual$k;var Zn=Kn("Array").filter;var ri=Z;var ti=Zn;var ei=Array.prototype;var filter$2=function(r){var t=r.filter;return r===ei||ri(ei,r)&&t===ei.filter?ti:t};var ai=filter$2;var ni=ai;var ii=ni;var oi=_export;var vi=Hn.map;var si=arrayMethodHasSpeciesSupport$5;var ui=si("map");oi({target:"Array",proto:true,forced:!ui},{map:function map(t){return vi(this||r,t,arguments.length>1?arguments[1]:void 0)}});var ci=entryVirtual$k;var li=ci("Array").map;var fi=Z;var hi=li;var pi=Array.prototype;var map$5=function(r){var t=r.map;return r===pi||fi(pi,r)&&t===pi.map?hi:t};var di=map$5;var yi=di;var gi=yi;var mi=o;var _i=Ua;var bi=lengthOfArrayLike$d;var wi=functionBindContext;var Ti=mi.TypeError;var flattenIntoArray$1=function(r,t,a,i,o,v,u,c){var l=o;var h=0;var p=!!u&&wi(u,c);var d,y;while(h<i){if(h in a){d=p?p(a[h],h,t):a[h];if(v>0&&_i(d)){y=bi(d);l=flattenIntoArray$1(r,t,d,y,l,v-1)-1}else{if(l>=9007199254740991)throw Ti("Exceed the acceptable array length");r[l]=d}l++}h++}return l};var Ai=flattenIntoArray$1;var Oi=_export;var Ei=Ai;var Ii=aCallable$7;var Si=toObject$e;var ki=lengthOfArrayLike$d;var Pi=arraySpeciesCreate$4;Oi({target:"Array",proto:true},{flatMap:function flatMap(t){var a=Si(this||r);var i=ki(a);var o;Ii(t);o=Pi(a,0);o.length=Ei(o,a,a,i,0,1,t,arguments.length>1?arguments[1]:void 0);return o}});var xi=entryVirtual$k;var Di=xi("Array").flatMap;var ji=Z;var Ci=Di;var Li=Array.prototype;var flatMap$2=function(r){var t=r.flatMap;return r===Li||ji(Li,r)&&t===Li.flatMap?Ci:t};var Fi=flatMap$2;var Ri=Fi;var Mi=Ri;
/**
   * Create new data pipe.
   *
   * @param from - The source data set or data view.
   * @remarks
   * Example usage:
   * ```typescript
   * interface AppItem {
   *   whoami: string;
   *   appData: unknown;
   *   visData: VisItem;
   * }
   * interface VisItem {
   *   id: number;
   *   label: string;
   *   color: string;
   *   x: number;
   *   y: number;
   * }
   *
   * const ds1 = new DataSet<AppItem, "whoami">([], { fieldId: "whoami" });
   * const ds2 = new DataSet<VisItem, "id">();
   *
   * const pipe = createNewDataPipeFrom(ds1)
   *   .filter((item): boolean => item.enabled === true)
   *   .map<VisItem, "id">((item): VisItem => item.visData)
   *   .to(ds2);
   *
   * pipe.start();
   * ```
   * @returns A factory whose methods can be used to configure the pipe.
   */function createNewDataPipeFrom(r){return new Ni(r)}
/**
   * Internal implementation of the pipe. This should be accessible only through
   * `createNewDataPipeFrom` from the outside.
   *
   * @typeParam SI - Source item type.
   * @typeParam SP - Source item type's id property name.
   * @typeParam TI - Target item type.
   * @typeParam TP - Target item type's id property name.
   */var zi=function(){
/**
     * Create a new data pipe.
     *
     * @param _source - The data set or data view that will be observed.
     * @param _transformers - An array of transforming functions to be used to
     * filter or transform the items in the pipe.
     * @param _target - The data set or data view that will receive the items.
     */
function SimpleDataPipe(t,a,i){var o,v,u;_classCallCheck(this||r,SimpleDataPipe);_defineProperty(this||r,"_source",void 0);_defineProperty(this||r,"_transformers",void 0);_defineProperty(this||r,"_target",void 0);_defineProperty(this||r,"_listeners",{add:pa(o=(this||r)._add).call(o,this||r),remove:pa(v=(this||r)._remove).call(v,this||r),update:pa(u=(this||r)._update).call(u,this||r)});(this||r)._source=t;(this||r)._transformers=a;(this||r)._target=i}_createClass(SimpleDataPipe,[{key:"all",value:function all(){(this||r)._target.update(this._transformItems((this||r)._source.get()));return this||r}},{key:"start",value:function start(){(this||r)._source.on("add",(this||r)._listeners.add);(this||r)._source.on("remove",(this||r)._listeners.remove);(this||r)._source.on("update",(this||r)._listeners.update);return this||r}},{key:"stop",value:function stop(){(this||r)._source.off("add",(this||r)._listeners.add);(this||r)._source.off("remove",(this||r)._listeners.remove);(this||r)._source.off("update",(this||r)._listeners.update);return this||r}
/**
       * Apply the transformers to the items.
       *
       * @param items - The items to be transformed.
       * @returns The transformed items.
       */},{key:"_transformItems",value:function _transformItems(t){var a;return Wa(a=(this||r)._transformers).call(a,(function(r,t){return t(r)}),t)}
/**
       * Handle an add event.
       *
       * @param _name - Ignored.
       * @param payload - The payload containing the ids of the added items.
       */},{key:"_add",value:function _add(t,a){null!=a&&(this||r)._target.add(this._transformItems((this||r)._source.get(a.items)))}
/**
       * Handle an update event.
       *
       * @param _name - Ignored.
       * @param payload - The payload containing the ids of the updated items.
       */},{key:"_update",value:function _update(t,a){null!=a&&(this||r)._target.update(this._transformItems((this||r)._source.get(a.items)))}
/**
       * Handle a remove event.
       *
       * @param _name - Ignored.
       * @param payload - The payload containing the data of the removed items.
       */},{key:"_remove",value:function _remove(t,a){null!=a&&(this||r)._target.remove(this._transformItems(a.oldData))}}]);return SimpleDataPipe}();
/**
   * Internal implementation of the pipe factory. This should be accessible
   * only through `createNewDataPipeFrom` from the outside.
   *
   * @typeParam TI - Target item type.
   * @typeParam TP - Target item type's id property name.
   */var Ni=function(){
/**
     * Create a new data pipe factory. This is an internal constructor that
     * should never be called from outside of this file.
     *
     * @param _source - The source data set or data view for this pipe.
     */
function DataPipeUnderConstruction(t){_classCallCheck(this||r,DataPipeUnderConstruction);_defineProperty(this||r,"_source",void 0);_defineProperty(this||r,"_transformers",[]);(this||r)._source=t}
/**
     * Filter the items.
     *
     * @param callback - A filtering function that returns true if given item
     * should be piped and false if not.
     * @returns This factory for further configuration.
     */_createClass(DataPipeUnderConstruction,[{key:"filter",value:function filter$1(t){(this||r)._transformers.push((function(r){return ii(r).call(r,t)}));return this||r}
/**
       * Map each source item to a new type.
       *
       * @param callback - A mapping function that takes a source item and returns
       * corresponding mapped item.
       * @typeParam TI - Target item type.
       * @typeParam TP - Target item type's id property name.
       * @returns This factory for further configuration.
       */},{key:"map",value:function map(t){(this||r)._transformers.push((function(r){return gi(r).call(r,t)}));return this||r}
/**
       * Map each source item to zero or more items of a new type.
       *
       * @param callback - A mapping function that takes a source item and returns
       * an array of corresponding mapped items.
       * @typeParam TI - Target item type.
       * @typeParam TP - Target item type's id property name.
       * @returns This factory for further configuration.
       */},{key:"flatMap",value:function flatMap$1(t){(this||r)._transformers.push((function(r){return Mi(r).call(r,t)}));return this||r}
/**
       * Connect this pipe to given data set.
       *
       * @param target - The data set that will receive the items from this pipe.
       * @returns The pipe connected between given data sets and performing
       * configured transformation on the processed items.
       */},{key:"to",value:function to(t){return new zi((this||r)._source,(this||r)._transformers,t)}}]);return DataPipeUnderConstruction}();var $i=o;var qi=sn;var Gi=$i.String;var toString$7=function(r){if("Symbol"===qi(r))throw TypeError("Cannot convert a Symbol value to a string");return Gi(r)};var Hi=w;var Vi=toIntegerOrInfinity$4;var Wi=toString$7;var Yi=requireObjectCoercible$5;var Ui=Hi("".charAt);var Xi=Hi("".charCodeAt);var Bi=Hi("".slice);var createMethod$3=function(r){return function(t,a){var i=Wi(Yi(t));var o=Vi(a);var v=i.length;var u,c;if(o<0||o>=v)return r?"":void 0;u=Xi(i,o);return u<55296||u>56319||o+1===v||(c=Xi(i,o+1))<56320||c>57343?r?Ui(i,o):u:r?Bi(i,o,o+2):c-56320+(u-55296<<10)+65536}};var Qi={codeAt:createMethod$3(false),charAt:createMethod$3(true)};var Ji=o;var Ki=isCallable$h;var Zi=hn;var ro=Ji.WeakMap;var eo=Ki(ro)&&/native code/.test(Zi(ro));var ao=Fr.exports;var no=uid$4;var io=ao("keys");var sharedKey$4=function(r){return io[r]||(io[r]=no(r))};var oo={};var vo=eo;var so=o;var uo=w;var co=isObject$f;var lo=be;var fo=Qr;var ho=Gr;var po=sharedKey$4;var yo=oo;var go="Object already initialized";var mo=so.TypeError;var _o=so.WeakMap;var bo,wo,To;var enforce=function(r){return To(r)?wo(r):bo(r,{})};var getterFor=function(r){return function(t){var a;if(!co(t)||(a=wo(t)).type!==r)throw mo("Incompatible receiver, "+r+" required");return a}};if(vo||ho.state){var Ao=ho.state||(ho.state=new _o);var Oo=uo(Ao.get);var Eo=uo(Ao.has);var Io=uo(Ao.set);bo=function(r,t){if(Eo(Ao,r))throw new mo(go);t.facade=r;Io(Ao,r,t);return t};wo=function(r){return Oo(Ao,r)||{}};To=function(r){return Eo(Ao,r)}}else{var So=po("state");yo[So]=true;bo=function(r,t){if(fo(r,So))throw new mo(go);t.facade=r;lo(r,So,t);return t};wo=function(r){return fo(r,So)?r[So]:{}};To=function(r){return fo(r,So)}}var ko={set:bo,get:wo,has:To,enforce:enforce,getterFor:getterFor};var Po=O;var xo=Qr;var Do=Function.prototype;var jo=Po&&Object.getOwnPropertyDescriptor;var Co=xo(Do,"name");var Lo=Co&&"something"===function something(){}.name;var Fo=Co&&(!Po||Po&&jo(Do,"name").configurable);var Ro={EXISTS:Co,PROPER:Lo,CONFIGURABLE:Fo};var Mo={};var zo=toIntegerOrInfinity$4;var No=Math.max;var $o=Math.min;var toAbsoluteIndex$5=function(r,t){var a=zo(r);return a<0?No(a+t,0):$o(a,t)};var qo=toIndexedObject$b;var Go=toAbsoluteIndex$5;var Ho=lengthOfArrayLike$d;var createMethod$2=function(r){return function(t,a,i){var o=qo(t);var v=Ho(o);var u=Go(i,v);var c;if(r&&a!=a)while(v>u){c=o[u++];if(c!=c)return true}else for(;v>u;u++)if((r||u in o)&&o[u]===a)return r||u||0;return!r&&-1}};var Vo={includes:createMethod$2(true),indexOf:createMethod$2(false)};var Wo=w;var Yo=Qr;var Uo=toIndexedObject$b;var Xo=Vo.indexOf;var Bo=oo;var Qo=Wo([].push);var objectKeysInternal=function(r,t){var a=Uo(r);var i=0;var o=[];var v;for(v in a)!Yo(Bo,v)&&Yo(a,v)&&Qo(o,v);while(t.length>i)Yo(a,v=t[i++])&&(~Xo(o,v)||Qo(o,v));return o};var Jo=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"];var Ko=objectKeysInternal;var Zo=Jo;var rv=Object.keys||function keys(r){return Ko(r,Zo)};var tv=O;var ev=re;var av=Jt;var nv=anObject$b;var iv=toIndexedObject$b;var ov=rv;Mo.f=tv&&!ev?Object.defineProperties:function defineProperties(r,t){nv(r);var a=iv(t);var i=ov(t);var o=i.length;var v=0;var u;while(o>v)av.f(r,u=i[v++],a[u]);return r};var vv=getBuiltIn$9;var sv=vv("document","documentElement");var uv=anObject$b;var cv=Mo;var lv=Jo;var fv=oo;var hv=sv;var pv=documentCreateElement$1;var dv=sharedKey$4;var yv=">";var gv="<";var mv="prototype";var _v="script";var bv=dv("IE_PROTO");var EmptyConstructor=function(){};var scriptTag=function(r){return gv+_v+yv+r+gv+"/"+_v+yv};var NullProtoObjectViaActiveX=function(r){r.write(scriptTag(""));r.close();var t=r.parentWindow.Object;r=null;return t};var NullProtoObjectViaIFrame=function(){var r=pv("iframe");var t="java"+_v+":";var a;r.style.display="none";hv.appendChild(r);r.src=String(t);a=r.contentWindow.document;a.open();a.write(scriptTag("document.F=Object"));a.close();return a.F};var wv;var NullProtoObject=function(){try{wv=new ActiveXObject("htmlfile")}catch(r){}NullProtoObject="undefined"!=typeof document?document.domain&&wv?NullProtoObjectViaActiveX(wv):NullProtoObjectViaIFrame():NullProtoObjectViaActiveX(wv);var r=lv.length;while(r--)delete NullProtoObject[mv][lv[r]];return NullProtoObject()};fv[bv]=true;var Tv=Object.create||function create(r,t){var a;if(null!==r){EmptyConstructor[mv]=uv(r);a=new EmptyConstructor;EmptyConstructor[mv]=null;a[bv]=r}else a=NullProtoObject();return void 0===t?a:cv.f(a,t)};var Av=fails$r;var Ov=!Av((function(){function F(){}F.prototype.constructor=null;return Object.getPrototypeOf(new F)!==F.prototype}));var Ev=o;var Iv=Qr;var Sv=isCallable$h;var kv=toObject$e;var Pv=sharedKey$4;var xv=Ov;var Dv=Pv("IE_PROTO");var jv=Ev.Object;var Cv=jv.prototype;var Lv=xv?jv.getPrototypeOf:function(r){var t=kv(r);if(Iv(t,Dv))return t[Dv];var a=t.constructor;return Sv(a)&&t instanceof a?a.prototype:t instanceof jv?Cv:null};var Fv=be;var redefine$4=function(r,t,a,i){i&&i.enumerable?r[t]=a:Fv(r,t,a)};var Rv=fails$r;var Mv=isCallable$h;var zv=Tv;var Nv=Lv;var $v=redefine$4;var qv=wellKnownSymbol$j;var Gv=qv("iterator");var Hv=false;var Vv,Wv,Yv;if([].keys){Yv=[].keys();if("next"in Yv){Wv=Nv(Nv(Yv));Wv!==Object.prototype&&(Vv=Wv)}else Hv=true}var Uv=void 0==Vv||Rv((function(){var r={};return Vv[Gv].call(r)!==r}));Vv=Uv?{}:zv(Vv);Mv(Vv[Gv])||$v(Vv,Gv,(function(){return this||r}));var Xv={IteratorPrototype:Vv,BUGGY_SAFARI_ITERATORS:Hv};var Bv=Ja;var Qv=sn;var Jv=Bv?{}.toString:function toString(){return"[object "+Qv(this||r)+"]"};var Kv=Ja;var Zv=Jt.f;var rs=be;var ts=Qr;var es=Jv;var as=wellKnownSymbol$j;var ns=as("toStringTag");var setToStringTag$5=function(r,t,a,i){if(r){var o=a?r:r.prototype;ts(o,ns)||Zv(o,ns,{configurable:true,value:t});i&&!Kv&&rs(o,"toString",es)}};var is={};var os=Xv.IteratorPrototype;var vs=Tv;var ss=createPropertyDescriptor$5;var us=setToStringTag$5;var cs=is;var returnThis$1=function(){return this||r};var createIteratorConstructor$1=function(r,t,a,i){var o=t+" Iterator";r.prototype=vs(os,{next:ss(+!i,a)});us(r,o,false,true);cs[o]=returnThis$1;return r};var ls=o;var fs=isCallable$h;var hs=ls.String;var ps=ls.TypeError;var aPossiblePrototype$1=function(r){if("object"==typeof r||fs(r))return r;throw ps("Can't set "+hs(r)+" as a prototype")};var ds=w;var ys=anObject$b;var gs=aPossiblePrototype$1;var ms=Object.setPrototypeOf||("__proto__"in{}?function(){var r=false;var t={};var a;try{a=ds(Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set);a(t,[]);r=t instanceof Array}catch(r){}return function setPrototypeOf(t,i){ys(t);gs(i);r?a(t,i):t.__proto__=i;return t}}():void 0);var _s=_export;var bs=S;var ws=Ro;var Ts=createIteratorConstructor$1;var As=Lv;var Os=setToStringTag$5;var Es=redefine$4;var Is=wellKnownSymbol$j;var Ss=is;var ks=Xv;var Ps=ws.PROPER;var xs=ks.BUGGY_SAFARI_ITERATORS;var Ds=Is("iterator");var js="keys";var Cs="values";var Ls="entries";var returnThis=function(){return this||r};var defineIterator$3=function(t,a,i,o,v,u,c){Ts(i,a,o);var getIterationMethod=function(t){if(t===v&&y)return y;if(!xs&&t in p)return p[t];switch(t){case js:return function keys(){return new i(this||r,t)};case Cs:return function values(){return new i(this||r,t)};case Ls:return function entries(){return new i(this||r,t)}}return function(){return new i(this||r)}};var l=a+" Iterator";var h=false;var p=t.prototype;var d=p[Ds]||p["@@iterator"]||v&&p[v];var y=!xs&&d||getIterationMethod(v);var g="Array"==a&&p.entries||d;var m,_,b;if(g){m=As(g.call(new t));if(m!==Object.prototype&&m.next){Os(m,l,true,true);Ss[l]=returnThis}}if(Ps&&v==Cs&&d&&d.name!==Cs){h=true;y=function values(){return bs(d,this||r)}}if(v){_={values:getIterationMethod(Cs),keys:u?y:getIterationMethod(js),entries:getIterationMethod(Ls)};if(c)for(b in _)(xs||h||!(b in p))&&Es(p,b,_[b]);else _s({target:a,proto:true,forced:xs||h},_)}c&&p[Ds]!==y&&Es(p,Ds,y,{name:v});Ss[a]=y;return _};var Fs=Qi.charAt;var Rs=toString$7;var Ms=ko;var zs=defineIterator$3;var Ns="String Iterator";var $s=Ms.set;var qs=Ms.getterFor(Ns);zs(String,"String",(function(t){$s(this||r,{type:Ns,string:Rs(t),index:0})}),(function next(){var t=qs(this||r);var a=t.string;var i=t.index;var o;if(i>=a.length)return{value:void 0,done:true};o=Fs(a,i);t.index+=o.length;return{value:o,done:false}}));var Gs=S;var Hs=anObject$b;var Vs=getMethod$3;var iteratorClose$2=function(r,t,a){var i,o;Hs(r);try{i=Vs(r,"return");if(!i){if("throw"===t)throw a;return a}i=Gs(i,r)}catch(r){o=true;i=r}if("throw"===t)throw a;if(o)throw i;Hs(i);return a};var Ws=anObject$b;var Ys=iteratorClose$2;var callWithSafeIterationClosing$1=function(r,t,a,i){try{return i?t(Ws(a)[0],a[1]):t(a)}catch(t){Ys(r,"throw",t)}};var Us=wellKnownSymbol$j;var Xs=is;var Bs=Us("iterator");var Qs=Array.prototype;var isArrayIteratorMethod$2=function(r){return void 0!==r&&(Xs.Array===r||Qs[Bs]===r)};var Js=toPropertyKey$4;var Ks=Jt;var Zs=createPropertyDescriptor$5;var createProperty$6=function(r,t,a){var i=Js(t);i in r?Ks.f(r,i,Zs(0,a)):r[i]=a};var ru=sn;var tu=getMethod$3;var eu=is;var au=wellKnownSymbol$j;var nu=au("iterator");var getIteratorMethod$8=function(r){if(void 0!=r)return tu(r,nu)||tu(r,"@@iterator")||eu[ru(r)]};var iu=o;var ou=S;var vu=aCallable$7;var su=anObject$b;var uu=tryToString$4;var cu=getIteratorMethod$8;var lu=iu.TypeError;var getIterator$7=function(r,t){var a=arguments.length<2?cu(r):t;if(vu(a))return su(ou(a,r));throw lu(uu(r)+" is not iterable")};var fu=o;var hu=functionBindContext;var pu=S;var du=toObject$e;var yu=callWithSafeIterationClosing$1;var gu=isArrayIteratorMethod$2;var mu=Sn;var _u=lengthOfArrayLike$d;var bu=createProperty$6;var wu=getIterator$7;var Tu=getIteratorMethod$8;var Au=fu.Array;var Ou=function from(t){var a=du(t);var i=mu(this||r);var o=arguments.length;var v=o>1?arguments[1]:void 0;var u=void 0!==v;u&&(v=hu(v,o>2?arguments[2]:void 0));var c=Tu(a);var l=0;var h,p,d,y,g,m;if(!c||(this||r)==Au&&gu(c)){h=_u(a);p=i?new(this||r)(h):Au(h);for(;h>l;l++){m=u?v(a[l],l):a[l];bu(p,l,m)}}else{y=wu(a,c);g=y.next;p=i?new(this||r):[];for(;!(d=pu(g,y)).done;l++){m=u?yu(y,v,[d.value,l],true):d.value;bu(p,l,m)}}p.length=l;return p};var Eu=wellKnownSymbol$j;var Iu=Eu("iterator");var Su=false;try{var ku=0;var Pu={next:function(){return{done:!!ku++}},return:function(){Su=true}};Pu[Iu]=function(){return this||r};Array.from(Pu,(function(){throw 2}))}catch(r){}var checkCorrectnessOfIteration$1=function(r,t){if(!t&&!Su)return false;var a=false;try{var i={};i[Iu]=function(){return{next:function(){return{done:a=true}}}};r(i)}catch(r){}return a};var xu=_export;var Du=Ou;var ju=checkCorrectnessOfIteration$1;var Cu=!ju((function(r){Array.from(r)}));xu({target:"Array",stat:true,forced:Cu},{from:Du});var Lu=X;var Fu=Lu.Array.from;var Ru=Fu;var Mu=Ru;var zu=Mu;var Nu=toIndexedObject$b;var $u=is;var qu=ko;Jt.f;var Gu=defineIterator$3;var Hu="Array Iterator";var Vu=qu.set;var Wu=qu.getterFor(Hu);Gu(Array,"Array",(function(t,a){Vu(this||r,{type:Hu,target:Nu(t),index:0,kind:a})}),(function(){var t=Wu(this||r);var a=t.target;var i=t.kind;var o=t.index++;if(!a||o>=a.length){t.target=void 0;return{value:void 0,done:true}}return"keys"==i?{value:o,done:false}:"values"==i?{value:a[o],done:false}:{value:[o,a[o]],done:false}}),"values");$u.Arguments=$u.Array;var Yu=getIteratorMethod$8;var Uu=Yu;var Xu={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0};var Bu=Xu;var Qu=o;var Ju=sn;var Ku=be;var Zu=is;var rc=wellKnownSymbol$j;var tc=rc("toStringTag");for(var ec in Bu){var ac=Qu[ec];var nc=ac&&ac.prototype;nc&&Ju(nc)!==tc&&Ku(nc,tc,ec);Zu[ec]=Zu.Array}var ic=Uu;var oc=ic;var vc=oc;var sc=vc;var uc=sc;var cc=uc;var lc=cc;var fc={};var hc=objectKeysInternal;var pc=Jo;var dc=pc.concat("length","prototype");fc.f=Object.getOwnPropertyNames||function getOwnPropertyNames(r){return hc(r,dc)};var yc={};var gc=o;var mc=toAbsoluteIndex$5;var _c=lengthOfArrayLike$d;var bc=createProperty$6;var wc=gc.Array;var Tc=Math.max;var arraySliceSimple=function(r,t,a){var i=_c(r);var o=mc(t,i);var v=mc(void 0===a?i:a,i);var u=wc(Tc(v-o,0));for(var c=0;o<v;o++,c++)bc(u,c,r[o]);u.length=c;return u};var Ac=classofRaw$1;var Oc=toIndexedObject$b;var Ec=fc.f;var Ic=arraySliceSimple;var Sc="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];var getWindowNames=function(r){try{return Ec(r)}catch(r){return Ic(Sc)}};yc.f=function getOwnPropertyNames(r){return Sc&&"Window"==Ac(r)?getWindowNames(r):Ec(Oc(r))};var kc={};kc.f=Object.getOwnPropertySymbols;var Pc={};var xc=wellKnownSymbol$j;Pc.f=xc;var Dc=X;var jc=Qr;var Cc=Pc;var Lc=Jt.f;var defineWellKnownSymbol$l=function(r){var t=Dc.Symbol||(Dc.Symbol={});jc(t,r)||Lc(t,r,{value:Cc.f(r)})};var Fc=_export;var Rc=o;var Mc=getBuiltIn$9;var zc=d;var Nc=S;var $c=w;var qc=O;var Gc=hr;var Hc=fails$r;var Vc=Qr;var Wc=Ua;var Yc=isCallable$h;var Uc=isObject$f;var Xc=Z;var Bc=Tr;var Qc=anObject$b;var Jc=toObject$e;var Kc=toIndexedObject$b;var Zc=toPropertyKey$4;var rl=toString$7;var tl=createPropertyDescriptor$5;var el=Tv;var al=rv;var nl=fc;var il=yc;var ol=kc;var vl=T;var sl=Jt;var ul=Mo;var cl=k;var ll=We;var fl=redefine$4;var hl=Fr.exports;var pl=sharedKey$4;var dl=oo;var yl=uid$4;var gl=wellKnownSymbol$j;var ml=Pc;var _l=defineWellKnownSymbol$l;var bl=setToStringTag$5;var wl=ko;var Tl=Hn.forEach;var Al=pl("hidden");var Ol="Symbol";var El="prototype";var Il=gl("toPrimitive");var Sl=wl.set;var kl=wl.getterFor(Ol);var Pl=Object[El];var xl=Rc.Symbol;var Dl=xl&&xl[El];var jl=Rc.TypeError;var Cl=Rc.QObject;var Ll=Mc("JSON","stringify");var Fl=vl.f;var Rl=sl.f;var Ml=il.f;var zl=cl.f;var Nl=$c([].push);var $l=hl("symbols");var ql=hl("op-symbols");var Gl=hl("string-to-symbol-registry");var Hl=hl("symbol-to-string-registry");var Vl=hl("wks");var Wl=!Cl||!Cl[El]||!Cl[El].findChild;var Yl=qc&&Hc((function(){return 7!=el(Rl({},"a",{get:function(){return Rl(this||r,"a",{value:7}).a}})).a}))?function(r,t,a){var i=Fl(Pl,t);i&&delete Pl[t];Rl(r,t,a);i&&r!==Pl&&Rl(Pl,t,i)}:Rl;var wrap$1=function(r,t){var a=$l[r]=el(Dl);Sl(a,{type:Ol,tag:r,description:t});qc||(a.description=t);return a};var Ul=function defineProperty(r,t,a){r===Pl&&Ul(ql,t,a);Qc(r);var i=Zc(t);Qc(a);if(Vc($l,i)){if(a.enumerable){Vc(r,Al)&&r[Al][i]&&(r[Al][i]=false);a=el(a,{enumerable:tl(0,false)})}else{Vc(r,Al)||Rl(r,Al,tl(1,{}));r[Al][i]=true}return Yl(r,i,a)}return Rl(r,i,a)};var Xl=function defineProperties(r,t){Qc(r);var a=Kc(t);var i=al(a).concat(Zl(a));Tl(i,(function(t){qc&&!Nc(Ql,a,t)||Ul(r,t,a[t])}));return r};var Bl=function create(r,t){return void 0===t?el(r):Xl(el(r),t)};var Ql=function propertyIsEnumerable(t){var a=Zc(t);var i=Nc(zl,this||r,a);return!((this||r)===Pl&&Vc($l,a)&&!Vc(ql,a))&&(!(i||!Vc(this||r,a)||!Vc($l,a)||Vc(this||r,Al)&&(this||r)[Al][a])||i)};var Jl=function getOwnPropertyDescriptor(r,t){var a=Kc(r);var i=Zc(t);if(a!==Pl||!Vc($l,i)||Vc(ql,i)){var o=Fl(a,i);!o||!Vc($l,i)||Vc(a,Al)&&a[Al][i]||(o.enumerable=true);return o}};var Kl=function getOwnPropertyNames(r){var t=Ml(Kc(r));var a=[];Tl(t,(function(r){Vc($l,r)||Vc(dl,r)||Nl(a,r)}));return a};var Zl=function getOwnPropertySymbols(r){var t=r===Pl;var a=Ml(t?ql:Kc(r));var i=[];Tl(a,(function(r){!Vc($l,r)||t&&!Vc(Pl,r)||Nl(i,$l[r])}));return i};if(!Gc){xl=function Symbol(){if(Xc(Dl,this||r))throw jl("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?rl(arguments[0]):void 0;var a=yl(t);var setter=function(t){(this||r)===Pl&&Nc(setter,ql,t);Vc(this||r,Al)&&Vc((this||r)[Al],a)&&((this||r)[Al][a]=false);Yl(this||r,a,tl(1,t))};qc&&Wl&&Yl(Pl,a,{configurable:true,set:setter});return wrap$1(a,t)};Dl=xl[El];fl(Dl,"toString",(function toString(){return kl(this||r).tag}));fl(xl,"withoutSetter",(function(r){return wrap$1(yl(r),r)}));cl.f=Ql;sl.f=Ul;ul.f=Xl;vl.f=Jl;nl.f=il.f=Kl;ol.f=Zl;ml.f=function(r){return wrap$1(gl(r),r)};qc&&Rl(Dl,"description",{configurable:true,get:function description(){return kl(this||r).description}})}Fc({global:true,wrap:true,forced:!Gc,sham:!Gc},{Symbol:xl});Tl(al(Vl),(function(r){_l(r)}));Fc({target:Ol,stat:true,forced:!Gc},{for:function(r){var t=rl(r);if(Vc(Gl,t))return Gl[t];var a=xl(t);Gl[t]=a;Hl[a]=t;return a},keyFor:function keyFor(r){if(!Bc(r))throw jl(r+" is not a symbol");if(Vc(Hl,r))return Hl[r]},useSetter:function(){Wl=true},useSimple:function(){Wl=false}});Fc({target:"Object",stat:true,forced:!Gc,sham:!qc},{create:Bl,defineProperty:Ul,defineProperties:Xl,getOwnPropertyDescriptor:Jl});Fc({target:"Object",stat:true,forced:!Gc},{getOwnPropertyNames:Kl,getOwnPropertySymbols:Zl});Fc({target:"Object",stat:true,forced:Hc((function(){ol.f(1)}))},{getOwnPropertySymbols:function getOwnPropertySymbols(r){return ol.f(Jc(r))}});if(Ll){var rf=!Gc||Hc((function(){var r=xl();return"[null]"!=Ll([r])||"{}"!=Ll({a:r})||"{}"!=Ll(Object(r))}));Fc({target:"JSON",stat:true,forced:rf},{stringify:function stringify(t,a,i){var o=ll(arguments);var v=a;if((Uc(a)||void 0!==t)&&!Bc(t)){Wc(a)||(a=function(t,a){Yc(v)&&(a=Nc(v,this||r,t,a));if(!Bc(a))return a});o[1]=a;return zc(Ll,null,o)}}})}if(!Dl[Il]){var tf=Dl.valueOf;fl(Dl,Il,(function(t){return Nc(tf,this||r)}))}bl(xl,Ol);dl[Al]=true;var ef=X;var af=ef.Object.getOwnPropertySymbols;var nf=af;var of=nf;var vf=of;var sf={exports:{}};var uf=_export;var cf=fails$r;var lf=toIndexedObject$b;var ff=T.f;var hf=O;var pf=cf((function(){ff(1)}));var df=!hf||pf;uf({target:"Object",stat:true,forced:df,sham:!hf},{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(r,t){return ff(lf(r),t)}});var yf=X;var gf=yf.Object;var mf=sf.exports=function getOwnPropertyDescriptor(r,t){return gf.getOwnPropertyDescriptor(r,t)};gf.getOwnPropertyDescriptor.sham&&(mf.sham=true);var _f=sf.exports;var bf=_f;var wf=bf;var Tf=getBuiltIn$9;var Af=w;var Of=fc;var Ef=kc;var If=anObject$b;var Sf=Af([].concat);var kf=Tf("Reflect","ownKeys")||function ownKeys(r){var t=Of.f(If(r));var a=Ef.f;return a?Sf(t,a(r)):t};var Pf=_export;var xf=O;var Df=kf;var jf=toIndexedObject$b;var Cf=T;var Lf=createProperty$6;Pf({target:"Object",stat:true,sham:!xf},{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(r){var t=jf(r);var a=Cf.f;var i=Df(t);var o={};var v=0;var u,c;while(i.length>v){c=a(t,u=i[v++]);void 0!==c&&Lf(o,u,c)}return o}});var Ff=X;var Rf=Ff.Object.getOwnPropertyDescriptors;var Mf=Rf;var zf=Mf;var Nf=zf;var $f={exports:{}};var qf=_export;var Gf=O;var Hf=Mo.f;qf({target:"Object",stat:true,forced:Object.defineProperties!==Hf,sham:!Gf},{defineProperties:Hf});var Vf=X;var Wf=Vf.Object;var Yf=$f.exports=function defineProperties(r,t){return Wf.defineProperties(r,t)};Wf.defineProperties.sham&&(Yf.sham=true);var Uf=$f.exports;var Xf=Uf;var Bf=Xf;var Qf=ze;var Jf=_export;var Kf=Ua;Jf({target:"Array",stat:true},{isArray:Kf});var Zf=X;var rh=Zf.Array.isArray;var th=rh;var eh=th;var ah=eh;var nh=ah;var ih=nh;var oh=ih;var vh=oh;function _arrayWithHoles(r){if(vh(r))return r}var sh=_export;var uh=o;var ch=fails$r;var lh=Ua;var fh=isObject$f;var hh=toObject$e;var ph=lengthOfArrayLike$d;var dh=createProperty$6;var yh=arraySpeciesCreate$4;var gh=arrayMethodHasSpeciesSupport$5;var mh=wellKnownSymbol$j;var _h=cr;var bh=mh("isConcatSpreadable");var wh=9007199254740991;var Th="Maximum allowed index exceeded";var Ah=uh.TypeError;var Oh=_h>=51||!ch((function(){var r=[];r[bh]=false;return r.concat()[0]!==r}));var Eh=gh("concat");var isConcatSpreadable=function(r){if(!fh(r))return false;var t=r[bh];return void 0!==t?!!t:lh(r)};var Ih=!Oh||!Eh;sh({target:"Array",proto:true,forced:Ih},{concat:function concat(t){var a=hh(this||r);var i=yh(a,0);var o=0;var v,u,c,l,h;for(v=-1,c=arguments.length;v<c;v++){h=-1===v?a:arguments[v];if(isConcatSpreadable(h)){l=ph(h);if(o+l>wh)throw Ah(Th);for(u=0;u<l;u++,o++)u in h&&dh(i,o,h[u])}else{if(o>=wh)throw Ah(Th);dh(i,o++,h)}}i.length=o;return i}});var Sh=defineWellKnownSymbol$l;Sh("asyncIterator");var kh=defineWellKnownSymbol$l;kh("hasInstance");var Ph=defineWellKnownSymbol$l;Ph("isConcatSpreadable");var xh=defineWellKnownSymbol$l;xh("iterator");var Dh=defineWellKnownSymbol$l;Dh("match");var jh=defineWellKnownSymbol$l;jh("matchAll");var Ch=defineWellKnownSymbol$l;Ch("replace");var Lh=defineWellKnownSymbol$l;Lh("search");var Fh=defineWellKnownSymbol$l;Fh("species");var Rh=defineWellKnownSymbol$l;Rh("split");var Mh=defineWellKnownSymbol$l;Mh("toPrimitive");var zh=defineWellKnownSymbol$l;zh("toStringTag");var Nh=defineWellKnownSymbol$l;Nh("unscopables");var $h=o;var qh=setToStringTag$5;qh($h.JSON,"JSON",true);var Gh=X;var Hh=Gh.Symbol;var Vh=Hh;var Wh=Vh;var Yh=Wh;var Uh=Yh;var Xh=defineWellKnownSymbol$l;Xh("asyncDispose");var Bh=defineWellKnownSymbol$l;Bh("dispose");var Qh=defineWellKnownSymbol$l;Qh("matcher");var Jh=defineWellKnownSymbol$l;Jh("metadata");var Kh=defineWellKnownSymbol$l;Kh("observable");var Zh=defineWellKnownSymbol$l;Zh("patternMatch");var rp=defineWellKnownSymbol$l;rp("replaceAll");var tp=Uh;var ep=tp;var ap=ep;function _iterableToArrayLimit(r,t){var a=null==r?null:"undefined"!==typeof ap&&lc(r)||r["@@iterator"];if(null!=a){var i=[];var o=true;var v=false;var u,c;try{for(a=a.call(r);!(o=(u=a.next()).done);o=true){i.push(u.value);if(t&&i.length===t)break}}catch(r){v=true;c=r}finally{try{o||null==a.return||a.return()}finally{if(v)throw c}}return i}}var np=_export;var ip=o;var op=Ua;var vp=Sn;var sp=isObject$f;var up=toAbsoluteIndex$5;var cp=lengthOfArrayLike$d;var lp=toIndexedObject$b;var fp=createProperty$6;var hp=wellKnownSymbol$j;var pp=arrayMethodHasSpeciesSupport$5;var dp=We;var yp=pp("slice");var gp=hp("species");var mp=ip.Array;var _p=Math.max;np({target:"Array",proto:true,forced:!yp},{slice:function slice(t,a){var i=lp(this||r);var o=cp(i);var v=up(t,o);var u=up(void 0===a?o:a,o);var c,l,h;if(op(i)){c=i.constructor;if(vp(c)&&(c===mp||op(c.prototype)))c=void 0;else if(sp(c)){c=c[gp];null===c&&(c=void 0)}if(c===mp||void 0===c)return dp(i,v,u)}l=new(void 0===c?mp:c)(_p(u-v,0));for(h=0;v<u;v++,h++)v in i&&fp(l,h,i[v]);l.length=h;return l}});var bp=entryVirtual$k;var wp=bp("Array").slice;var Tp=Z;var Ap=wp;var Op=Array.prototype;var slice$5=function(r){var t=r.slice;return r===Op||Tp(Op,r)&&t===Op.slice?Ap:t};var Ep=slice$5;var Ip=Ep;var Sp=Ip;var kp=Sp;var Pp=kp;var xp=Pp;var Dp=xp;var jp=Mu;var Cp=jp;var Lp=Cp;var Fp=Lp;var Rp=Fp;function _arrayLikeToArray$4(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=r[a];return i}function _unsupportedIterableToArray$4(r,t){var a;if(r){if("string"===typeof r)return _arrayLikeToArray$4(r,t);var i=Dp(a=Object.prototype.toString.call(r)).call(a,8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);return"Map"===i||"Set"===i?Rp(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray$4(r,t):void 0}}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _slicedToArray(r,t){return _arrayWithHoles(r)||_iterableToArrayLimit(r,t)||_unsupportedIterableToArray$4(r,t)||_nonIterableRest()}var Mp=Pc;var zp=Mp.f("iterator");var Np=zp;var $p=Np;var qp=$p;var Gp=qp;var Hp=Gp;var Vp=Hp;var Wp=Vp;function _typeof(r){return _typeof="function"==typeof ap&&"symbol"==typeof Wp?function(r){return typeof r}:function(r){return r&&"function"==typeof ap&&r.constructor===ap&&r!==ap.prototype?"symbol":typeof r},_typeof(r)}function _arrayWithoutHoles(r){if(vh(r))return _arrayLikeToArray$4(r)}function _iterableToArray(r){if("undefined"!==typeof ap&&null!=lc(r)||null!=r["@@iterator"])return Rp(r)}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray$4(r)||_nonIterableSpread()}var Yp=Wh;var Up=entryVirtual$k;var Xp=Up("Array").concat;var Bp=Z;var Qp=Xp;var Jp=Array.prototype;var concat$3=function(r){var t=r.concat;return r===Jp||Bp(Jp,r)&&t===Jp.concat?Qp:t};var Kp=concat$3;var Zp=Kp;var rd=Zp;var td=Ip;var ed=_export;var ad=kf;ed({target:"Reflect",stat:true},{ownKeys:ad});var nd=X;var id=nd.Reflect.ownKeys;var od=id;var vd=od;var sd=vd;var ud=eh;var cd=_export;var ld=toObject$e;var fd=rv;var hd=fails$r;var pd=hd((function(){fd(1)}));cd({target:"Object",stat:true,forced:pd},{keys:function keys(r){return fd(ld(r))}});var dd=X;var yd=dd.Object.keys;var gd=yd;var md=gd;var _d=md;var bd=_export;var wd=o;var Td=w;var Ad=wd.Date;var Od=Td(Ad.prototype.getTime);bd({target:"Date",stat:true},{now:function now(){return Od(new Ad)}});var Ed=X;Ed.Date.now;var Id=Hn.forEach;var Sd=arrayMethodIsStrict$5;var kd=Sd("forEach");var Pd=kd?[].forEach:function forEach(t){return Id(this||r,t,arguments.length>1?arguments[1]:void 0)};var xd=_export;var Dd=Pd;xd({target:"Array",proto:true,forced:[].forEach!=Dd},{forEach:Dd});var jd=entryVirtual$k;var Cd=jd("Array").forEach;var Ld=Cd;var Fd=Ld;var Rd=sn;var Md=Qr;var zd=Z;var Nd=Fd;var $d=Array.prototype;var qd={DOMTokenList:true,NodeList:true};var forEach$2=function(r){var t=r.forEach;return r===$d||zd($d,r)&&t===$d.forEach||Md(qd,Rd(r))?Nd:t};var Gd=forEach$2;var Hd=_export;var Vd=w;var Wd=Ua;var Yd=Vd([].reverse);var Ud=[1,2];Hd({target:"Array",proto:true,forced:String(Ud)===String(Ud.reverse())},{reverse:function reverse(){Wd(this||r)&&((this||r).length=(this||r).length);return Yd(this||r)}});var Xd=entryVirtual$k;var Bd=Xd("Array").reverse;var Qd=Z;var Jd=Bd;var Kd=Array.prototype;var reverse$2=function(r){var t=r.reverse;return r===Kd||Qd(Kd,r)&&t===Kd.reverse?Jd:t};var Zd=reverse$2;var ry=Zd;var ty=ry;var ey=_export;var ay=o;var ny=toAbsoluteIndex$5;var iy=toIntegerOrInfinity$4;var oy=lengthOfArrayLike$d;var vy=toObject$e;var sy=arraySpeciesCreate$4;var uy=createProperty$6;var cy=arrayMethodHasSpeciesSupport$5;var ly=cy("splice");var fy=ay.TypeError;var hy=Math.max;var py=Math.min;var dy=9007199254740991;var yy="Maximum allowed length exceeded";ey({target:"Array",proto:true,forced:!ly},{splice:function splice(t,a){var i=vy(this||r);var o=oy(i);var v=ny(t,o);var u=arguments.length;var c,l,h,p,d,y;if(0===u)c=l=0;else if(1===u){c=0;l=o-v}else{c=u-2;l=py(hy(iy(a),0),o-v)}if(o+c-l>dy)throw fy(yy);h=sy(i,l);for(p=0;p<l;p++){d=v+p;d in i&&uy(h,p,i[d])}h.length=l;if(c<l){for(p=v;p<o-l;p++){d=p+l;y=p+c;d in i?i[y]=i[d]:delete i[y]}for(p=o;p>o-l+c;p--)delete i[p-1]}else if(c>l)for(p=o-l;p>v;p--){d=p+l-1;y=p+c-1;d in i?i[y]=i[d]:delete i[y]}for(p=0;p<c;p++)i[p+v]=arguments[p+2];i.length=o-l+c;return h}});var gy=entryVirtual$k;var my=gy("Array").splice;var _y=Z;var by=my;var wy=Array.prototype;var splice$2=function(r){var t=r.splice;return r===wy||_y(wy,r)&&t===wy.splice?by:t};var Ty=splice$2;var Ay=Ty;var Oy=Ay;var Ey=O;var Iy=w;var Sy=S;var ky=fails$r;var Py=rv;var xy=kc;var Dy=k;var jy=toObject$e;var Cy=G;var Ly=Object.assign;var Fy=Object.defineProperty;var Ry=Iy([].concat);var My=!Ly||ky((function(){if(Ey&&1!==Ly({b:1},Ly(Fy({},"a",{enumerable:true,get:function(){Fy(this||r,"b",{value:3,enumerable:false})}}),{b:2})).b)return true;var t={};var a={};var i=Symbol();var o="abcdefghijklmnopqrst";t[i]=7;o.split("").forEach((function(r){a[r]=r}));return 7!=Ly({},t)[i]||Py(Ly({},a)).join("")!=o}))?function assign(r,t){var a=jy(r);var i=arguments.length;var o=1;var v=xy.f;var u=Dy.f;while(i>o){var c=Cy(arguments[o++]);var l=v?Ry(Py(c),v(c)):Py(c);var h=l.length;var p=0;var d;while(h>p){d=l[p++];Ey&&!Sy(u,c,d)||(a[d]=c[d])}}return a}:Ly;var zy=_export;var Ny=My;zy({target:"Object",stat:true,forced:Object.assign!==Ny},{assign:Ny});var $y=X;var qy=$y.Object.assign;var Gy=qy;var Hy=Gy;var Vy=Hy;var Wy=_export;var Yy=Vo.includes;Wy({target:"Array",proto:true},{includes:function includes(t){return Yy(this||r,t,arguments.length>1?arguments[1]:void 0)}});var Uy=entryVirtual$k;Uy("Array").includes;var Xy=isObject$f;var By=classofRaw$1;var Qy=wellKnownSymbol$j;var Jy=Qy("match");var isRegexp=function(r){var t;return Xy(r)&&(void 0!==(t=r[Jy])?!!t:"RegExp"==By(r))};var Ky=o;var Zy=isRegexp;var rg=Ky.TypeError;var notARegexp=function(r){if(Zy(r))throw rg("The method doesn't accept regular expressions");return r};var tg=wellKnownSymbol$j;var eg=tg("match");var correctIsRegexpLogic=function(r){var t=/./;try{"/./"[r](t)}catch(a){try{t[eg]=false;return"/./"[r](t)}catch(r){}}return false};var ag=_export;var ng=w;var ig=notARegexp;var og=requireObjectCoercible$5;var vg=toString$7;var sg=correctIsRegexpLogic;var ug=ng("".indexOf);ag({target:"String",proto:true,forced:!sg("includes")},{includes:function includes(t){return!!~ug(vg(og(this||r)),vg(ig(t)),arguments.length>1?arguments[1]:void 0)}});var cg=entryVirtual$k;cg("String").includes;var lg=_export;var fg=fails$r;var hg=toObject$e;var pg=Lv;var dg=Ov;var yg=fg((function(){pg(1)}));lg({target:"Object",stat:true,forced:yg,sham:!dg},{getPrototypeOf:function getPrototypeOf(r){return pg(hg(r))}});var gg=X;var mg=gg.Object.getPrototypeOf;var _g=mg;var bg=_g;var wg=O;var Tg=w;var Ag=rv;var Og=toIndexedObject$b;var Eg=k.f;var Ig=Tg(Eg);var Sg=Tg([].push);var createMethod$1=function(r){return function(t){var a=Og(t);var i=Ag(a);var o=i.length;var v=0;var u=[];var c;while(o>v){c=i[v++];wg&&!Ig(a,c)||Sg(u,r?[c,a[c]]:a[c])}return u}};var kg={entries:createMethod$1(true),values:createMethod$1(false)};var Pg=_export;var xg=kg.values;Pg({target:"Object",stat:true},{values:function values(r){return xg(r)}});var Dg=X;Dg.Object.values;var jg="\t\n\v\f\r                　\u2028\u2029\ufeff";var Cg=w;var Lg=requireObjectCoercible$5;var Fg=toString$7;var Rg=jg;var Mg=Cg("".replace);var zg="["+Rg+"]";var Ng=RegExp("^"+zg+zg+"*");var $g=RegExp(zg+zg+"*$");var createMethod=function(r){return function(t){var a=Fg(Lg(t));1&r&&(a=Mg(a,Ng,""));2&r&&(a=Mg(a,$g,""));return a}};var qg={start:createMethod(1),end:createMethod(2),trim:createMethod(3)};var Gg=o;var Hg=fails$r;var Vg=w;var Wg=toString$7;var Yg=qg.trim;var Ug=jg;var Xg=Gg.parseInt;var Bg=Gg.Symbol;var Qg=Bg&&Bg.iterator;var Jg=/^[+-]?0x/i;var Kg=Vg(Jg.exec);var Zg=8!==Xg(Ug+"08")||22!==Xg(Ug+"0x16")||Qg&&!Hg((function(){Xg(Object(Qg))}));var rm=Zg?function parseInt(r,t){var a=Yg(Wg(r));return Xg(a,t>>>0||(Kg(Jg,a)?16:10))}:Xg;var tm=_export;var em=rm;tm({global:true,forced:parseInt!=em},{parseInt:em});var am=X;am.parseInt;var nm=_export;var im=w;var om=Vo.indexOf;var vm=arrayMethodIsStrict$5;var sm=im([].indexOf);var um=!!sm&&1/sm([1],1,-0)<0;var cm=vm("indexOf");nm({target:"Array",proto:true,forced:um||!cm},{indexOf:function indexOf(t){var a=arguments.length>1?arguments[1]:void 0;return um?sm(this||r,t,a)||0:om(this||r,t,a)}});var lm=entryVirtual$k;lm("Array").indexOf;var fm=Ro.PROPER;var hm=fails$r;var pm=jg;var dm="​᠎";var stringTrimForced=function(r){return hm((function(){return!!pm[r]()||dm[r]()!==dm||fm&&pm[r].name!==r}))};var ym=_export;var gm=qg.trim;var mm=stringTrimForced;ym({target:"String",proto:true,forced:mm("trim")},{trim:function trim(){return gm(this||r)}});var _m=entryVirtual$k;_m("String").trim;var bm=_export;var wm=O;var Tm=Tv;bm({target:"Object",stat:true,sham:!wm},{create:Tm});var Am=X;var Om=Am.Object;var Em=function create(r,t){return Om.create(r,t)};var Im=Em;var Sm=Im;var km=Sm;var Pm=_export;var xm=o;var Dm=getBuiltIn$9;var jm=d;var Cm=w;var Lm=fails$r;var Fm=xm.Array;var Rm=Dm("JSON","stringify");var Mm=Cm(/./.exec);var zm=Cm("".charAt);var Nm=Cm("".charCodeAt);var $m=Cm("".replace);var qm=Cm(1..toString);var Gm=/[\uD800-\uDFFF]/g;var Hm=/^[\uD800-\uDBFF]$/;var Vm=/^[\uDC00-\uDFFF]$/;var fix=function(r,t,a){var i=zm(a,t-1);var o=zm(a,t+1);return Mm(Hm,r)&&!Mm(Vm,o)||Mm(Vm,r)&&!Mm(Hm,i)?"\\u"+qm(Nm(r,0),16):r};var Wm=Lm((function(){return'"\\udf06\\ud834"'!==Rm("\udf06\ud834")||'"\\udead"'!==Rm("\udead")}));Rm&&Pm({target:"JSON",stat:true,forced:Wm},{stringify:function stringify(r,t,a){for(var i=0,o=arguments.length,v=Fm(o);i<o;i++)v[i]=arguments[i];var u=jm(Rm,null,v);return"string"==typeof u?$m(u,Gm,fix):u}});var Ym=X;var Um=d;Ym.JSON||(Ym.JSON={stringify:JSON.stringify});var Xm=function stringify(r,t,a){return Um(Ym.JSON.stringify,null,arguments)};var Bm=Xm;var Qm=Bm;var Jm=Qm;var Km=o;var Zm=Km.TypeError;var validateArgumentsLength$1=function(r,t){if(r<t)throw Zm("Not enough arguments");return r};var r_=_export;var t_=o;var e_=d;var a_=isCallable$h;var n_=tr;var i_=We;var o_=validateArgumentsLength$1;var v_=/MSIE .\./.test(n_);var s_=t_.Function;var wrap=function(t){return function(a,i){var o=o_(arguments.length,1)>2;var v=a_(a)?a:s_(a);var u=o?i_(arguments,2):void 0;return t(o?function(){e_(v,this||r,u)}:v,i)}};r_({global:true,bind:true,forced:v_},{setTimeout:wrap(t_.setTimeout),setInterval:wrap(t_.setInterval)});var u_=X;var c_=u_.setTimeout;var l_=c_;var f_=toObject$e;var h_=toAbsoluteIndex$5;var p_=lengthOfArrayLike$d;var d_=function fill(t){var a=f_(this||r);var i=p_(a);var o=arguments.length;var v=h_(o>1?arguments[1]:void 0,i);var u=o>2?arguments[2]:void 0;var c=void 0===u?i:h_(u,i);while(c>v)a[v++]=t;return a};var y_=_export;var g_=d_;y_({target:"Array",proto:true},{fill:g_});var m_=entryVirtual$k;m_("Array").fill;var __={exports:{}};(function(t){t.exports=Emitter;function Emitter(r){if(r)return mixin(r)}
/**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */function mixin(r){for(var t in Emitter.prototype)r[t]=Emitter.prototype[t];return r}
/**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */Emitter.prototype.on=Emitter.prototype.addEventListener=function(t,a){(this||r)._callbacks=(this||r)._callbacks||{};((this||r)._callbacks["$"+t]=(this||r)._callbacks["$"+t]||[]).push(a);return this||r};
/**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */Emitter.prototype.once=function(t,a){function on(){this.off(t,on);a.apply(this||r,arguments)}on.fn=a;this.on(t,on);return this||r};
/**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(t,a){(this||r)._callbacks=(this||r)._callbacks||{};if(0==arguments.length){(this||r)._callbacks={};return this||r}var i=(this||r)._callbacks["$"+t];if(!i)return this||r;if(1==arguments.length){delete(this||r)._callbacks["$"+t];return this||r}var o;for(var v=0;v<i.length;v++){o=i[v];if(o===a||o.fn===a){i.splice(v,1);break}}0===i.length&&delete(this||r)._callbacks["$"+t];return this||r};
/**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */Emitter.prototype.emit=function(t){(this||r)._callbacks=(this||r)._callbacks||{};var a=new Array(arguments.length-1),i=(this||r)._callbacks["$"+t];for(var o=1;o<arguments.length;o++)a[o-1]=arguments[o];if(i){i=i.slice(0);o=0;for(var v=i.length;o<v;++o)i[o].apply(this||r,a)}return this||r};
/**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */Emitter.prototype.listeners=function(t){(this||r)._callbacks=(this||r)._callbacks||{};return(this||r)._callbacks["$"+t]||[]};
/**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */Emitter.prototype.hasListeners=function(r){return!!this.listeners(r).length}})(__);var b_=__.exports;function _extends(){_extends=Object.assign||function(r){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(r[i]=a[i])}return r};return _extends.apply(this||r,arguments)}function _inheritsLoose(r,t){r.prototype=Object.create(t.prototype);r.prototype.constructor=r;r.__proto__=t}function _assertThisInitialized$1(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}
/**
   * @private
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} target
   * @param {...Object} objects_to_assign
   * @returns {Object} target
   */var w_;w_="function"!==typeof Object.assign?function assign(r){if(void 0===r||null===r)throw new TypeError("Cannot convert undefined or null to object");var t=Object(r);for(var a=1;a<arguments.length;a++){var i=arguments[a];if(void 0!==i&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(t[o]=i[o])}return t}:Object.assign;var T_=w_;var A_=["","webkit","Moz","MS","ms","o"];var O_="undefined"===typeof document?{style:{}}:document.createElement("div");var E_="function";var I_=Math.round,S_=Math.abs;var k_=Date.now;
/**
   * @private
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */function prefixed(r,t){var a;var i;var o=t[0].toUpperCase()+t.slice(1);var v=0;while(v<A_.length){a=A_[v];i=a?a+o:t;if(i in r)return i;v++}}var P_;P_="undefined"===typeof window?{}:window;var x_=prefixed(O_.style,"touchAction");var D_=void 0!==x_;function getTouchActionProps(){if(!D_)return false;var r={};var t=P_.CSS&&P_.CSS.supports;["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach((function(a){return r[a]=!t||P_.CSS.supports("touch-action",a)}));return r}var j_="compute";var C_="auto";var L_="manipulation";var F_="none";var R_="pan-x";var M_="pan-y";var z_=getTouchActionProps();var N_=/mobile|tablet|ip(ad|hone|od)|android/i;var $_="ontouchstart"in P_;var q_=void 0!==prefixed(P_,"PointerEvent");var G_=$_&&N_.test(navigator.userAgent);var H_="touch";var V_="pen";var W_="mouse";var Y_="kinect";var U_=25;var X_=1;var B_=2;var Q_=4;var J_=8;var K_=1;var Z_=2;var rb=4;var tb=8;var eb=16;var ab=Z_|rb;var nb=tb|eb;var ib=ab|nb;var ob=["x","y"];var vb=["clientX","clientY"];
/**
   * @private
   * walk objects and arrays
   * @param {Object} obj
   * @param {Function} iterator
   * @param {Object} context
   */function each(r,t,a){var i;if(r)if(r.forEach)r.forEach(t,a);else if(void 0!==r.length){i=0;while(i<r.length){t.call(a,r[i],i,r);i++}}else for(i in r)r.hasOwnProperty(i)&&t.call(a,r[i],i,r)}
/**
   * @private
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */function boolOrFn(r,t){return typeof r===E_?r.apply(t&&t[0]||void 0,t):r}
/**
   * @private
   * small indexOf wrapper
   * @param {String} str
   * @param {String} find
   * @returns {Boolean} found
   */function inStr(r,t){return r.indexOf(t)>-1}
/**
   * @private
   * when the touchActions are collected they are not a valid value, so we need to clean things up. *
   * @param {String} actions
   * @returns {*}
   */function cleanTouchActions(r){if(inStr(r,F_))return F_;var t=inStr(r,R_);var a=inStr(r,M_);return t&&a?F_:t||a?t?R_:M_:inStr(r,L_)?L_:C_}
/**
   * @private
   * Touch Action
   * sets the touchAction property or uses the js alternative
   * @param {Manager} manager
   * @param {String} value
   * @constructor
   */var sb=function(){function TouchAction(t,a){(this||r).manager=t;this.set(a)}
/**
     * @private
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */var t=TouchAction.prototype;t.set=function set(t){t===j_&&(t=this.compute());D_&&(this||r).manager.element.style&&z_[t]&&((this||r).manager.element.style[x_]=t);(this||r).actions=t.toLowerCase().trim()};t.update=function update(){this.set((this||r).manager.options.touchAction)};
/**
     * @private
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */t.compute=function compute(){var t=[];each((this||r).manager.recognizers,(function(r){boolOrFn(r.options.enable,[r])&&(t=t.concat(r.getTouchAction()))}));return cleanTouchActions(t.join(" "))};
/**
     * @private
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */t.preventDefaults=function preventDefaults(t){var a=t.srcEvent;var i=t.offsetDirection;if((this||r).manager.session.prevented)a.preventDefault();else{var o=(this||r).actions;var v=inStr(o,F_)&&!z_[F_];var u=inStr(o,M_)&&!z_[M_];var c=inStr(o,R_)&&!z_[R_];if(v){var l=1===t.pointers.length;var h=t.distance<2;var p=t.deltaTime<250;if(l&&h&&p)return}if(!c||!u)return v||u&&i&ab||c&&i&nb?this.preventSrc(a):void 0}};
/**
     * @private
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */t.preventSrc=function preventSrc(t){(this||r).manager.session.prevented=true;t.preventDefault()};return TouchAction}();
/**
   * @private
   * find if a node is in the given parent
   * @method hasParent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */function hasParent(r,t){while(r){if(r===t)return true;r=r.parentNode}return false}
/**
   * @private
   * get the center of all the pointers
   * @param {Array} pointers
   * @return {Object} center contains `x` and `y` properties
   */function getCenter(r){var t=r.length;if(1===t)return{x:I_(r[0].clientX),y:I_(r[0].clientY)};var a=0;var i=0;var o=0;while(o<t){a+=r[o].clientX;i+=r[o].clientY;o++}return{x:I_(a/t),y:I_(i/t)}}
/**
   * @private
   * create a simple clone from the input used for storage of firstInput and firstMultiple
   * @param {Object} input
   * @returns {Object} clonedInputData
   */function simpleCloneInputData(r){var t=[];var a=0;while(a<r.pointers.length){t[a]={clientX:I_(r.pointers[a].clientX),clientY:I_(r.pointers[a].clientY)};a++}return{timeStamp:k_(),pointers:t,center:getCenter(t),deltaX:r.deltaX,deltaY:r.deltaY}}
/**
   * @private
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */function getDistance(r,t,a){a||(a=ob);var i=t[a[0]]-r[a[0]];var o=t[a[1]]-r[a[1]];return Math.sqrt(i*i+o*o)}
/**
   * @private
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */function getAngle(r,t,a){a||(a=ob);var i=t[a[0]]-r[a[0]];var o=t[a[1]]-r[a[1]];return 180*Math.atan2(o,i)/Math.PI}
/**
   * @private
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */function getDirection(r,t){return r===t?K_:S_(r)>=S_(t)?r<0?Z_:rb:t<0?tb:eb}function computeDeltaXY(r,t){var a=t.center;var i=r.offsetDelta||{};var o=r.prevDelta||{};var v=r.prevInput||{};if(t.eventType===X_||v.eventType===Q_){o=r.prevDelta={x:v.deltaX||0,y:v.deltaY||0};i=r.offsetDelta={x:a.x,y:a.y}}t.deltaX=o.x+(a.x-i.x);t.deltaY=o.y+(a.y-i.y)}
/**
   * @private
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} x
   * @param {Number} y
   * @return {Object} velocity `x` and `y`
   */function getVelocity(r,t,a){return{x:t/r||0,y:a/r||0}}
/**
   * @private
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */function getScale(r,t){return getDistance(t[0],t[1],vb)/getDistance(r[0],r[1],vb)}
/**
   * @private
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */function getRotation(r,t){return getAngle(t[1],t[0],vb)+getAngle(r[1],r[0],vb)}
/**
   * @private
   * velocity is calculated every x ms
   * @param {Object} session
   * @param {Object} input
   */function computeIntervalInputData(r,t){var a=r.lastInterval||t;var i=t.timeStamp-a.timeStamp;var o;var v;var u;var c;if(t.eventType!==J_&&(i>U_||void 0===a.velocity)){var l=t.deltaX-a.deltaX;var h=t.deltaY-a.deltaY;var p=getVelocity(i,l,h);v=p.x;u=p.y;o=S_(p.x)>S_(p.y)?p.x:p.y;c=getDirection(l,h);r.lastInterval=t}else{o=a.velocity;v=a.velocityX;u=a.velocityY;c=a.direction}t.velocity=o;t.velocityX=v;t.velocityY=u;t.direction=c}
/**
  * @private
   * extend the data with some usable properties like scale, rotate, velocity etc
   * @param {Object} manager
   * @param {Object} input
   */function computeInputData(r,t){var a=r.session;var i=t.pointers;var o=i.length;a.firstInput||(a.firstInput=simpleCloneInputData(t));o>1&&!a.firstMultiple?a.firstMultiple=simpleCloneInputData(t):1===o&&(a.firstMultiple=false);var v=a.firstInput,u=a.firstMultiple;var c=u?u.center:v.center;var l=t.center=getCenter(i);t.timeStamp=k_();t.deltaTime=t.timeStamp-v.timeStamp;t.angle=getAngle(c,l);t.distance=getDistance(c,l);computeDeltaXY(a,t);t.offsetDirection=getDirection(t.deltaX,t.deltaY);var h=getVelocity(t.deltaTime,t.deltaX,t.deltaY);t.overallVelocityX=h.x;t.overallVelocityY=h.y;t.overallVelocity=S_(h.x)>S_(h.y)?h.x:h.y;t.scale=u?getScale(u.pointers,i):1;t.rotation=u?getRotation(u.pointers,i):0;t.maxPointers=a.prevInput?t.pointers.length>a.prevInput.maxPointers?t.pointers.length:a.prevInput.maxPointers:t.pointers.length;computeIntervalInputData(a,t);var p=r.element;var d=t.srcEvent;var y;y=d.composedPath?d.composedPath()[0]:d.path?d.path[0]:d.target;hasParent(y,p)&&(p=y);t.target=p}
/**
   * @private
   * handle input events
   * @param {Manager} manager
   * @param {String} eventType
   * @param {Object} input
   */function inputHandler(r,t,a){var i=a.pointers.length;var o=a.changedPointers.length;var v=t&X_&&i-o===0;var u=t&(Q_|J_)&&i-o===0;a.isFirst=!!v;a.isFinal=!!u;v&&(r.session={});a.eventType=t;computeInputData(r,a);r.emit("hammer.input",a);r.recognize(a);r.session.prevInput=a}
/**
   * @private
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */function splitStr(r){return r.trim().split(/\s+/g)}
/**
   * @private
   * addEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */function addEventListeners(r,t,a){each(splitStr(t),(function(t){r.addEventListener(t,a,false)}))}
/**
   * @private
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */function removeEventListeners(r,t,a){each(splitStr(t),(function(t){r.removeEventListener(t,a,false)}))}
/**
   * @private
   * get the window object of an element
   * @param {HTMLElement} element
   * @returns {DocumentView|Window}
   */function getWindowForElement(r){var t=r.ownerDocument||r;return t.defaultView||t.parentWindow||window}
/**
   * @private
   * create new input type manager
   * @param {Manager} manager
   * @param {Function} callback
   * @returns {Input}
   * @constructor
   */var ub=function(){function Input(t,a){var i=this||r;(this||r).manager=t;(this||r).callback=a;(this||r).element=t.element;(this||r).target=t.options.inputTarget;(this||r).domHandler=function(r){boolOrFn(t.options.enable,[t])&&i.handler(r)};this.init()}var t=Input.prototype;t.handler=function handler(){};t.init=function init(){(this||r).evEl&&addEventListeners((this||r).element,(this||r).evEl,(this||r).domHandler);(this||r).evTarget&&addEventListeners((this||r).target,(this||r).evTarget,(this||r).domHandler);(this||r).evWin&&addEventListeners(getWindowForElement((this||r).element),(this||r).evWin,(this||r).domHandler)};t.destroy=function destroy(){(this||r).evEl&&removeEventListeners((this||r).element,(this||r).evEl,(this||r).domHandler);(this||r).evTarget&&removeEventListeners((this||r).target,(this||r).evTarget,(this||r).domHandler);(this||r).evWin&&removeEventListeners(getWindowForElement((this||r).element),(this||r).evWin,(this||r).domHandler)};return Input}();
/**
   * @private
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */function inArray(r,t,a){if(r.indexOf&&!a)return r.indexOf(t);var i=0;while(i<r.length){if(a&&r[i][a]==t||!a&&r[i]===t)return i;i++}return-1}var cb={pointerdown:X_,pointermove:B_,pointerup:Q_,pointercancel:J_,pointerout:J_};var lb={2:H_,3:V_,4:W_,5:Y_};var fb="pointerdown";var hb="pointermove pointerup pointercancel";if(P_.MSPointerEvent&&!P_.PointerEvent){fb="MSPointerDown";hb="MSPointerMove MSPointerUp MSPointerCancel"}var pb=function(t){_inheritsLoose(PointerEventInput,t);function PointerEventInput(){var a;var i=PointerEventInput.prototype;i.evEl=fb;i.evWin=hb;a=t.apply(this||r,arguments)||this||r;a.store=a.manager.session.pointerEvents=[];return a}
/**
     * @private
     * handle mouse events
     * @param {Object} ev
     */var a=PointerEventInput.prototype;a.handler=function handler(t){var a=(this||r).store;var i=false;var o=t.type.toLowerCase().replace("ms","");var v=cb[o];var u=lb[t.pointerType]||t.pointerType;var c=u===H_;var l=inArray(a,t.pointerId,"pointerId");if(v&X_&&(0===t.button||c)){if(l<0){a.push(t);l=a.length-1}}else v&(Q_|J_)&&(i=true);if(!(l<0)){a[l]=t;this.callback((this||r).manager,v,{pointers:a,changedPointers:[t],pointerType:u,srcEvent:t});i&&a.splice(l,1)}};return PointerEventInput}(ub);
/**
   * @private
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */function toArray(r){return Array.prototype.slice.call(r,0)}
/**
   * @private
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */function uniqueArray(r,t,a){var i=[];var o=[];var v=0;while(v<r.length){var u=t?r[v][t]:r[v];inArray(o,u)<0&&i.push(r[v]);o[v]=u;v++}a&&(i=t?i.sort((function(r,a){return r[t]>a[t]})):i.sort());return i}var db={touchstart:X_,touchmove:B_,touchend:Q_,touchcancel:J_};var yb="touchstart touchmove touchend touchcancel";var gb=function(t){_inheritsLoose(TouchInput,t);function TouchInput(){var a;TouchInput.prototype.evTarget=yb;a=t.apply(this||r,arguments)||this||r;a.targetIds={};return a}var a=TouchInput.prototype;a.handler=function handler(t){var a=db[t.type];var i=getTouches.call(this||r,t,a);i&&this.callback((this||r).manager,a,{pointers:i[0],changedPointers:i[1],pointerType:H_,srcEvent:t})};return TouchInput}(ub);function getTouches(t,a){var i=toArray(t.touches);var o=(this||r).targetIds;if(a&(X_|B_)&&1===i.length){o[i[0].identifier]=true;return[i,i]}var v;var u;var c=toArray(t.changedTouches);var l=[];var h=(this||r).target;u=i.filter((function(r){return hasParent(r.target,h)}));if(a===X_){v=0;while(v<u.length){o[u[v].identifier]=true;v++}}v=0;while(v<c.length){o[c[v].identifier]&&l.push(c[v]);a&(Q_|J_)&&delete o[c[v].identifier];v++}if(l.length)return[uniqueArray(u.concat(l),"identifier",true),l]}var mb={mousedown:X_,mousemove:B_,mouseup:Q_};var _b="mousedown";var bb="mousemove mouseup";var wb=function(t){_inheritsLoose(MouseInput,t);function MouseInput(){var a;var i=MouseInput.prototype;i.evEl=_b;i.evWin=bb;a=t.apply(this||r,arguments)||this||r;a.pressed=false;return a}
/**
     * @private
     * handle mouse events
     * @param {Object} ev
     */var a=MouseInput.prototype;a.handler=function handler(t){var a=mb[t.type];a&X_&&0===t.button&&((this||r).pressed=true);a&B_&&1!==t.which&&(a=Q_);if((this||r).pressed){a&Q_&&((this||r).pressed=false);this.callback((this||r).manager,a,{pointers:[t],changedPointers:[t],pointerType:W_,srcEvent:t})}};return MouseInput}(ub);var Tb=2500;var Ab=25;function setLastTouch(t){var a=t.changedPointers,i=a[0];if(i.identifier===(this||r).primaryTouch){var o={x:i.clientX,y:i.clientY};var v=(this||r).lastTouches;(this||r).lastTouches.push(o);var u=function removeLastTouch(){var r=v.indexOf(o);r>-1&&v.splice(r,1)};setTimeout(u,Tb)}}function recordTouches(t,a){if(t&X_){(this||r).primaryTouch=a.changedPointers[0].identifier;setLastTouch.call(this||r,a)}else t&(Q_|J_)&&setLastTouch.call(this||r,a)}function isSyntheticEvent(t){var a=t.srcEvent.clientX;var i=t.srcEvent.clientY;for(var o=0;o<(this||r).lastTouches.length;o++){var v=(this||r).lastTouches[o];var u=Math.abs(a-v.x);var c=Math.abs(i-v.y);if(u<=Ab&&c<=Ab)return true}return false}var Ob=function(){var t=function(t){_inheritsLoose(TouchMouseInput,t);function TouchMouseInput(a,i){var o;o=t.call(this||r,a,i)||this||r;o.handler=function(r,t,a){var i=a.pointerType===H_;var v=a.pointerType===W_;if(!(v&&a.sourceCapabilities&&a.sourceCapabilities.firesTouchEvents)){if(i)recordTouches.call(_assertThisInitialized$1(_assertThisInitialized$1(o)),t,a);else if(v&&isSyntheticEvent.call(_assertThisInitialized$1(_assertThisInitialized$1(o)),a))return;o.callback(r,t,a)}};o.touch=new gb(o.manager,o.handler);o.mouse=new wb(o.manager,o.handler);o.primaryTouch=null;o.lastTouches=[];return o}
/**
       * @private
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */var a=TouchMouseInput.prototype;a.destroy=function destroy(){(this||r).touch.destroy();(this||r).mouse.destroy()};return TouchMouseInput}(ub);return t}();
/**
   * @private
   * create new input type manager
   * called by the Manager constructor
   * @param {Hammer} manager
   * @returns {Input}
   */function createInputInstance(r){var t;var a=r.options.inputClass;t=a||(q_?pb:G_?gb:$_?Ob:wb);return new t(r,inputHandler)}
/**
   * @private
   * if the argument is an array, we want to execute the fn on each entry
   * if it aint an array we don't want to do a thing.
   * this is used by all the methods that accept a single and array argument.
   * @param {*|Array} arg
   * @param {String} fn
   * @param {Object} [context]
   * @returns {Boolean}
   */function invokeArrayArg(r,t,a){if(Array.isArray(r)){each(r,a[t],a);return true}return false}var Eb=1;var Ib=2;var Sb=4;var kb=8;var Pb=kb;var xb=16;var Db=32;
/**
   * @private
   * get a unique id
   * @returns {number} uniqueId
   */var jb=1;function uniqueId(){return jb++}
/**
   * @private
   * get a recognizer by name if it is bound to a manager
   * @param {Recognizer|String} otherRecognizer
   * @param {Recognizer} recognizer
   * @returns {Recognizer}
   */function getRecognizerByNameIfManager(r,t){var a=t.manager;return a?a.get(r):r}
/**
   * @private
   * get a usable string, used as event postfix
   * @param {constant} state
   * @returns {String} state
   */function stateStr(r){return r&xb?"cancel":r&kb?"end":r&Sb?"move":r&Ib?"start":""}
/**
   * @private
   * Recognizer
   * Every recognizer needs to extend from this class.
   * @constructor
   * @param {Object} options
   */var Cb=function(){function Recognizer(t){void 0===t&&(t={});(this||r).options=_extends({enable:true},t);(this||r).id=uniqueId();(this||r).manager=null;(this||r).state=Eb;(this||r).simultaneous={};(this||r).requireFail=[]}
/**
     * @private
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */var t=Recognizer.prototype;t.set=function set(t){T_((this||r).options,t);(this||r).manager&&(this||r).manager.touchAction.update();return this||r};
/**
     * @private
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */t.recognizeWith=function recognizeWith(t){if(invokeArrayArg(t,"recognizeWith",this||r))return this||r;var a=(this||r).simultaneous;t=getRecognizerByNameIfManager(t,this||r);if(!a[t.id]){a[t.id]=t;t.recognizeWith(this||r)}return this||r};
/**
     * @private
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */t.dropRecognizeWith=function dropRecognizeWith(t){if(invokeArrayArg(t,"dropRecognizeWith",this||r))return this||r;t=getRecognizerByNameIfManager(t,this||r);delete(this||r).simultaneous[t.id];return this||r};
/**
     * @private
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */t.requireFailure=function requireFailure(t){if(invokeArrayArg(t,"requireFailure",this||r))return this||r;var a=(this||r).requireFail;t=getRecognizerByNameIfManager(t,this||r);if(-1===inArray(a,t)){a.push(t);t.requireFailure(this||r)}return this||r};
/**
     * @private
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */t.dropRequireFailure=function dropRequireFailure(t){if(invokeArrayArg(t,"dropRequireFailure",this||r))return this||r;t=getRecognizerByNameIfManager(t,this||r);var a=inArray((this||r).requireFail,t);a>-1&&(this||r).requireFail.splice(a,1);return this||r};
/**
     * @private
     * has require failures boolean
     * @returns {boolean}
     */t.hasRequireFailures=function hasRequireFailures(){return(this||r).requireFail.length>0};
/**
     * @private
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */t.canRecognizeWith=function canRecognizeWith(t){return!!(this||r).simultaneous[t.id]};
/**
     * @private
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */t.emit=function emit(t){var a=this||r;var i=(this||r).state;function emit(r){a.manager.emit(r,t)}i<kb&&emit(a.options.event+stateStr(i));emit(a.options.event);t.additionalEvent&&emit(t.additionalEvent);i>=kb&&emit(a.options.event+stateStr(i))};
/**
     * @private
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */t.tryEmit=function tryEmit(t){if(this.canEmit())return this.emit(t);(this||r).state=Db};
/**
     * @private
     * can we emit?
     * @returns {boolean}
     */t.canEmit=function canEmit(){var t=0;while(t<(this||r).requireFail.length){if(!((this||r).requireFail[t].state&(Db|Eb)))return false;t++}return true};
/**
     * @private
     * update the recognizer
     * @param {Object} inputData
     */t.recognize=function recognize(t){var a=T_({},t);if(boolOrFn((this||r).options.enable,[this||r,a])){(this||r).state&(Pb|xb|Db)&&((this||r).state=Eb);(this||r).state=this.process(a);(this||r).state&(Ib|Sb|kb|xb)&&this.tryEmit(a)}else{this.reset();(this||r).state=Db}};
/**
     * @private
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {constant} STATE
     */t.process=function process(r){};
/**
     * @private
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */t.getTouchAction=function getTouchAction(){};t.reset=function reset(){};return Recognizer}();var Lb=function(t){_inheritsLoose(TapRecognizer,t);function TapRecognizer(a){var i;void 0===a&&(a={});i=t.call(this||r,_extends({event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},a))||this||r;i.pTime=false;i.pCenter=false;i._timer=null;i._input=null;i.count=0;return i}var a=TapRecognizer.prototype;a.getTouchAction=function getTouchAction(){return[L_]};a.process=function process(t){var a=this||r;var i=(this||r).options;var o=t.pointers.length===i.pointers;var v=t.distance<i.threshold;var u=t.deltaTime<i.time;this.reset();if(t.eventType&X_&&0===(this||r).count)return this.failTimeout();if(v&&u&&o){if(t.eventType!==Q_)return this.failTimeout();var c=!(this||r).pTime||t.timeStamp-(this||r).pTime<i.interval;var l=!(this||r).pCenter||getDistance((this||r).pCenter,t.center)<i.posThreshold;(this||r).pTime=t.timeStamp;(this||r).pCenter=t.center;l&&c?(this||r).count+=1:(this||r).count=1;(this||r)._input=t;var h=(this||r).count%i.taps;if(0===h){if(this.hasRequireFailures()){(this||r)._timer=setTimeout((function(){a.state=Pb;a.tryEmit()}),i.interval);return Ib}return Pb}}return Db};a.failTimeout=function failTimeout(){var t=this||r;(this||r)._timer=setTimeout((function(){t.state=Db}),(this||r).options.interval);return Db};a.reset=function reset(){clearTimeout((this||r)._timer)};a.emit=function emit(){if((this||r).state===Pb){(this||r)._input.tapCount=(this||r).count;(this||r).manager.emit((this||r).options.event,(this||r)._input)}};return TapRecognizer}(Cb);var Fb=function(t){_inheritsLoose(AttrRecognizer,t);function AttrRecognizer(a){void 0===a&&(a={});return t.call(this||r,_extends({pointers:1},a))||this||r}
/**
     * @private
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */var a=AttrRecognizer.prototype;a.attrTest=function attrTest(t){var a=(this||r).options.pointers;return 0===a||t.pointers.length===a};
/**
     * @private
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */a.process=function process(t){var a=(this||r).state;var i=t.eventType;var o=a&(Ib|Sb);var v=this.attrTest(t);return o&&(i&J_||!v)?a|xb:o||v?i&Q_?a|kb:a&Ib?a|Sb:Ib:Db};return AttrRecognizer}(Cb);
/**
   * @private
   * direction cons to string
   * @param {constant} direction
   * @returns {String}
   */function directionStr(r){return r===eb?"down":r===tb?"up":r===Z_?"left":r===rb?"right":""}var Rb=function(t){_inheritsLoose(PanRecognizer,t);function PanRecognizer(a){var i;void 0===a&&(a={});i=t.call(this||r,_extends({event:"pan",threshold:10,pointers:1,direction:ib},a))||this||r;i.pX=null;i.pY=null;return i}var a=PanRecognizer.prototype;a.getTouchAction=function getTouchAction(){var t=(this||r).options.direction;var a=[];t&ab&&a.push(M_);t&nb&&a.push(R_);return a};a.directionTest=function directionTest(t){var a=(this||r).options;var i=true;var o=t.distance;var v=t.direction;var u=t.deltaX;var c=t.deltaY;if(!(v&a.direction))if(a.direction&ab){v=0===u?K_:u<0?Z_:rb;i=u!==(this||r).pX;o=Math.abs(t.deltaX)}else{v=0===c?K_:c<0?tb:eb;i=c!==(this||r).pY;o=Math.abs(t.deltaY)}t.direction=v;return i&&o>a.threshold&&v&a.direction};a.attrTest=function attrTest(t){return Fb.prototype.attrTest.call(this||r,t)&&((this||r).state&Ib||!((this||r).state&Ib)&&this.directionTest(t))};a.emit=function emit(a){(this||r).pX=a.deltaX;(this||r).pY=a.deltaY;var i=directionStr(a.direction);i&&(a.additionalEvent=(this||r).options.event+i);t.prototype.emit.call(this||r,a)};return PanRecognizer}(Fb);var Mb=function(t){_inheritsLoose(SwipeRecognizer,t);function SwipeRecognizer(a){void 0===a&&(a={});return t.call(this||r,_extends({event:"swipe",threshold:10,velocity:.3,direction:ab|nb,pointers:1},a))||this||r}var a=SwipeRecognizer.prototype;a.getTouchAction=function getTouchAction(){return Rb.prototype.getTouchAction.call(this||r)};a.attrTest=function attrTest(a){var i=(this||r).options.direction;var o;i&(ab|nb)?o=a.overallVelocity:i&ab?o=a.overallVelocityX:i&nb&&(o=a.overallVelocityY);return t.prototype.attrTest.call(this||r,a)&&i&a.offsetDirection&&a.distance>(this||r).options.threshold&&a.maxPointers===(this||r).options.pointers&&S_(o)>(this||r).options.velocity&&a.eventType&Q_};a.emit=function emit(t){var a=directionStr(t.offsetDirection);a&&(this||r).manager.emit((this||r).options.event+a,t);(this||r).manager.emit((this||r).options.event,t)};return SwipeRecognizer}(Fb);var zb=function(t){_inheritsLoose(PinchRecognizer,t);function PinchRecognizer(a){void 0===a&&(a={});return t.call(this||r,_extends({event:"pinch",threshold:0,pointers:2},a))||this||r}var a=PinchRecognizer.prototype;a.getTouchAction=function getTouchAction(){return[F_]};a.attrTest=function attrTest(a){return t.prototype.attrTest.call(this||r,a)&&(Math.abs(a.scale-1)>(this||r).options.threshold||(this||r).state&Ib)};a.emit=function emit(a){if(1!==a.scale){var i=a.scale<1?"in":"out";a.additionalEvent=(this||r).options.event+i}t.prototype.emit.call(this||r,a)};return PinchRecognizer}(Fb);var Nb=function(t){_inheritsLoose(RotateRecognizer,t);function RotateRecognizer(a){void 0===a&&(a={});return t.call(this||r,_extends({event:"rotate",threshold:0,pointers:2},a))||this||r}var a=RotateRecognizer.prototype;a.getTouchAction=function getTouchAction(){return[F_]};a.attrTest=function attrTest(a){return t.prototype.attrTest.call(this||r,a)&&(Math.abs(a.rotation)>(this||r).options.threshold||(this||r).state&Ib)};return RotateRecognizer}(Fb);var $b=function(t){_inheritsLoose(PressRecognizer,t);function PressRecognizer(a){var i;void 0===a&&(a={});i=t.call(this||r,_extends({event:"press",pointers:1,time:251,threshold:9},a))||this||r;i._timer=null;i._input=null;return i}var a=PressRecognizer.prototype;a.getTouchAction=function getTouchAction(){return[C_]};a.process=function process(t){var a=this||r;var i=(this||r).options;var o=t.pointers.length===i.pointers;var v=t.distance<i.threshold;var u=t.deltaTime>i.time;(this||r)._input=t;if(!v||!o||t.eventType&(Q_|J_)&&!u)this.reset();else if(t.eventType&X_){this.reset();(this||r)._timer=setTimeout((function(){a.state=Pb;a.tryEmit()}),i.time)}else if(t.eventType&Q_)return Pb;return Db};a.reset=function reset(){clearTimeout((this||r)._timer)};a.emit=function emit(t){if((this||r).state===Pb)if(t&&t.eventType&Q_)(this||r).manager.emit((this||r).options.event+"up",t);else{(this||r)._input.timeStamp=k_();(this||r).manager.emit((this||r).options.event,(this||r)._input)}};return PressRecognizer}(Cb);var qb={
/**
     * @private
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
domEvents:false,
/**
     * @private
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
touchAction:j_,
/**
     * @private
     * @type {Boolean}
     * @default true
     */
enable:true,
/**
     * @private
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
inputTarget:null,
/**
     * @private
     * force an input class
     * @type {Null|Function}
     * @default null
     */
inputClass:null,cssProps:{
/**
       * @private
       * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
userSelect:"none",
/**
       * @private
       * Disable the Windows Phone grippers when pressing an element.
       * @type {String}
       * @default 'none'
       */
touchSelect:"none",
/**
       * @private
       * Disables the default callout shown when you touch and hold a touch target.
       * On iOS, when you touch and hold a touch target such as a link, Safari displays
       * a callout containing information about the link. This property allows you to disable that callout.
       * @type {String}
       * @default 'none'
       */
touchCallout:"none",
/**
       * @private
       * Specifies whether zooming is enabled. Used by IE10>
       * @type {String}
       * @default 'none'
       */
contentZooming:"none",
/**
       * @private
       * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
userDrag:"none",
/**
       * @private
       * Overrides the highlight color shown when the user taps a link or a JavaScript
       * clickable element in iOS. This property obeys the alpha value, if specified.
       * @type {String}
       * @default 'rgba(0,0,0,0)'
       */
tapHighlightColor:"rgba(0,0,0,0)"}};
/**
   * @private
   * Default recognizer setup when calling `Hammer()`
   * When creating a new Manager these will be skipped.
   * This is separated with other defaults because of tree-shaking.
   * @type {Array}
   */var Gb=[[Nb,{enable:false}],[zb,{enable:false},["rotate"]],[Mb,{direction:ab}],[Rb,{direction:ab},["swipe"]],[Lb],[Lb,{event:"doubletap",taps:2},["tap"]],[$b]];var Hb=1;var Vb=2;
/**
   * @private
   * add/remove the css properties as defined in manager.options.cssProps
   * @param {Manager} manager
   * @param {Boolean} add
   */function toggleCssProps(r,t){var a=r.element;if(a.style){var i;each(r.options.cssProps,(function(o,v){i=prefixed(a.style,v);if(t){r.oldCssProps[i]=a.style[i];a.style[i]=o}else a.style[i]=r.oldCssProps[i]||""}));t||(r.oldCssProps={})}}
/**
   * @private
   * trigger dom event
   * @param {String} event
   * @param {Object} data
   */function triggerDomEvent(r,t){var a=document.createEvent("Event");a.initEvent(r,true,true);a.gesture=t;t.target.dispatchEvent(a)}
/**
  * @private
   * Manager
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */var Wb=function(){function Manager(t,a){var i=this||r;(this||r).options=T_({},qb,a||{});(this||r).options.inputTarget=(this||r).options.inputTarget||t;(this||r).handlers={};(this||r).session={};(this||r).recognizers=[];(this||r).oldCssProps={};(this||r).element=t;(this||r).input=createInputInstance(this||r);(this||r).touchAction=new sb(this||r,(this||r).options.touchAction);toggleCssProps(this||r,true);each((this||r).options.recognizers,(function(r){var t=i.add(new r[0](r[1]));r[2]&&t.recognizeWith(r[2]);r[3]&&t.requireFailure(r[3])}),this||r)}
/**
     * @private
     * set options
     * @param {Object} options
     * @returns {Manager}
     */var t=Manager.prototype;t.set=function set(t){T_((this||r).options,t);t.touchAction&&(this||r).touchAction.update();if(t.inputTarget){(this||r).input.destroy();(this||r).input.target=t.inputTarget;(this||r).input.init()}return this||r};
/**
     * @private
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */t.stop=function stop(t){(this||r).session.stopped=t?Vb:Hb};
/**
     * @private
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */t.recognize=function recognize(t){var a=(this||r).session;if(!a.stopped){(this||r).touchAction.preventDefaults(t);var i;var o=(this||r).recognizers;var v=a.curRecognizer;if(!v||v&&v.state&Pb){a.curRecognizer=null;v=null}var u=0;while(u<o.length){i=o[u];a.stopped===Vb||v&&i!==v&&!i.canRecognizeWith(v)?i.reset():i.recognize(t);if(!v&&i.state&(Ib|Sb|kb)){a.curRecognizer=i;v=i}u++}}};
/**
     * @private
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */t.get=function get(t){if(t instanceof Cb)return t;var a=(this||r).recognizers;for(var i=0;i<a.length;i++)if(a[i].options.event===t)return a[i];return null};
/**
     * @private add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */t.add=function add(t){if(invokeArrayArg(t,"add",this||r))return this||r;var a=this.get(t.options.event);a&&this.remove(a);(this||r).recognizers.push(t);t.manager=this||r;(this||r).touchAction.update();return t};
/**
     * @private
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */t.remove=function remove(t){if(invokeArrayArg(t,"remove",this||r))return this||r;var a=this.get(t);if(t){var i=(this||r).recognizers;var o=inArray(i,a);if(-1!==o){i.splice(o,1);(this||r).touchAction.update()}}return this||r};
/**
     * @private
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */t.on=function on(t,a){if(void 0===t||void 0===a)return this||r;var i=(this||r).handlers;each(splitStr(t),(function(r){i[r]=i[r]||[];i[r].push(a)}));return this||r};
/**
     * @private unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */t.off=function off(t,a){if(void 0===t)return this||r;var i=(this||r).handlers;each(splitStr(t),(function(r){a?i[r]&&i[r].splice(inArray(i[r],a),1):delete i[r]}));return this||r};
/**
     * @private emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */t.emit=function emit(t,a){(this||r).options.domEvents&&triggerDomEvent(t,a);var i=(this||r).handlers[t]&&(this||r).handlers[t].slice();if(i&&i.length){a.type=t;a.preventDefault=function(){a.srcEvent.preventDefault()};var o=0;while(o<i.length){i[o](a);o++}}};t.destroy=function destroy(){(this||r).element&&toggleCssProps(this||r,false);(this||r).handlers={};(this||r).session={};(this||r).input.destroy();(this||r).element=null};return Manager}();var Yb={touchstart:X_,touchmove:B_,touchend:Q_,touchcancel:J_};var Ub="touchstart";var Xb="touchstart touchmove touchend touchcancel";var Bb=function(t){_inheritsLoose(SingleTouchInput,t);function SingleTouchInput(){var a;var i=SingleTouchInput.prototype;i.evTarget=Ub;i.evWin=Xb;a=t.apply(this||r,arguments)||this||r;a.started=false;return a}var a=SingleTouchInput.prototype;a.handler=function handler(t){var a=Yb[t.type];a===X_&&((this||r).started=true);if((this||r).started){var i=normalizeSingleTouches.call(this||r,t,a);a&(Q_|J_)&&i[0].length-i[1].length===0&&((this||r).started=false);this.callback((this||r).manager,a,{pointers:i[0],changedPointers:i[1],pointerType:H_,srcEvent:t})}};return SingleTouchInput}(ub);function normalizeSingleTouches(r,t){var a=toArray(r.touches);var i=toArray(r.changedTouches);t&(Q_|J_)&&(a=uniqueArray(a.concat(i),"identifier",true));return[a,i]}
/**
   * @private
   * wrap a method with a deprecation warning and stack trace
   * @param {Function} method
   * @param {String} name
   * @param {String} message
   * @returns {Function} A new function wrapping the supplied method.
   */function deprecate(t,a,i){var o="DEPRECATED METHOD: "+a+"\n"+i+" AT \n";return function(){var a=new Error("get-stack-trace");var i=a&&a.stack?a.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace";var v=window.console&&(window.console.warn||window.console.log);v&&v.call(window.console,o,i);return t.apply(this||r,arguments)}}
/**
   * @private
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge=false]
   * @returns {Object} dest
   */var Qb=deprecate((function(r,t,a){var i=Object.keys(t);var o=0;while(o<i.length){(!a||a&&void 0===r[i[o]])&&(r[i[o]]=t[i[o]]);o++}return r}),"extend","Use `assign`.");
/**
   * @private
   * merge the values from src in the dest.
   * means that properties that exist in dest will not be overwritten by src
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} dest
   */var Jb=deprecate((function(r,t){return Qb(r,t,true)}),"merge","Use `assign`.");
/**
   * @private
   * simple class inheritance
   * @param {Function} child
   * @param {Function} base
   * @param {Object} [properties]
   */function inherit(r,t,a){var i=t.prototype;var o;o=r.prototype=Object.create(i);o.constructor=r;o._super=i;a&&T_(o,a)}
/**
   * @private
   * simple function bind
   * @param {Function} fn
   * @param {Object} context
   * @returns {Function}
   */function bindFn(r,t){return function boundFn(){return r.apply(t,arguments)}}
/**
   * @private
   * Simple way to create a manager with a default set of recognizers.
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */var Kb=function(){var r=function Hammer(r,t){void 0===t&&(t={});return new Wb(r,_extends({recognizers:Gb.concat()},t))};r.VERSION="2.0.17-rc";r.DIRECTION_ALL=ib;r.DIRECTION_DOWN=eb;r.DIRECTION_LEFT=Z_;r.DIRECTION_RIGHT=rb;r.DIRECTION_UP=tb;r.DIRECTION_HORIZONTAL=ab;r.DIRECTION_VERTICAL=nb;r.DIRECTION_NONE=K_;r.DIRECTION_DOWN=eb;r.INPUT_START=X_;r.INPUT_MOVE=B_;r.INPUT_END=Q_;r.INPUT_CANCEL=J_;r.STATE_POSSIBLE=Eb;r.STATE_BEGAN=Ib;r.STATE_CHANGED=Sb;r.STATE_ENDED=kb;r.STATE_RECOGNIZED=Pb;r.STATE_CANCELLED=xb;r.STATE_FAILED=Db;r.Manager=Wb;r.Input=ub;r.TouchAction=sb;r.TouchInput=gb;r.MouseInput=wb;r.PointerEventInput=pb;r.TouchMouseInput=Ob;r.SingleTouchInput=Bb;r.Recognizer=Cb;r.AttrRecognizer=Fb;r.Tap=Lb;r.Pan=Rb;r.Swipe=Mb;r.Pinch=zb;r.Rotate=Nb;r.Press=$b;r.on=addEventListeners;r.off=removeEventListeners;r.each=each;r.merge=Jb;r.extend=Qb;r.bindFn=bindFn;r.assign=T_;r.inherit=inherit;r.bindFn=bindFn;r.prefixed=prefixed;r.toArray=toArray;r.inArray=inArray;r.uniqueArray=uniqueArray;r.splitStr=splitStr;r.boolOrFn=boolOrFn;r.hasParent=hasParent;r.addEventListeners=addEventListeners;r.removeEventListeners=removeEventListeners;r.defaults=T_({},qb,{preset:Gb});return r}();var Zb=Kb;function _createForOfIteratorHelper$3(r,t){var a="undefined"!==typeof Yp&&lc(r)||r["@@iterator"];if(!a){if(ud(r)||(a=_unsupportedIterableToArray$3(r))||t&&r&&"number"===typeof r.length){a&&(r=a);var i=0;var o=function F(){};return{s:o,n:function n(){return i>=r.length?{done:true}:{done:false,value:r[i++]}},e:function e(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var v,u=true,c=false;return{s:function s(){a=a.call(r)},n:function n(){var r=a.next();u=r.done;return r},e:function e(r){c=true;v=r},f:function f(){try{u||null==a.return||a.return()}finally{if(c)throw v}}}}function _unsupportedIterableToArray$3(r,t){var a;if(r){if("string"===typeof r)return _arrayLikeToArray$3(r,t);var i=td(a=Object.prototype.toString.call(r)).call(a,8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);return"Map"===i||"Set"===i?zu(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray$3(r,t):void 0}}function _arrayLikeToArray$3(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=r[a];return i}var rw=Yp("DELETE");
/**
   * Pure version of deepObjectAssign, it doesn't modify any of it's arguments.
   *
   * @param base - The base object that fullfils the whole interface T.
   * @param updates - Updates that may change or delete props.
   * @returns A brand new instance with all the supplied objects deeply merged.
   */function pureDeepObjectAssign(r){var t;for(var a=arguments.length,i=new Array(a>1?a-1:0),o=1;o<a;o++)i[o-1]=arguments[o];return deepObjectAssign.apply(void 0,rd(t=[{},r]).call(t,i))}
/**
   * Deep version of object assign with additional deleting by the DELETE symbol.
   *
   * @param values - Objects to be deeply merged.
   * @returns The first object from values.
   */function deepObjectAssign(){var r=deepObjectAssignNonentry.apply(void 0,arguments);stripDelete(r);return r}
/**
   * Deep version of object assign with additional deleting by the DELETE symbol.
   *
   * @remarks
   * This doesn't strip the DELETE symbols so they may end up in the final object.
   * @param values - Objects to be deeply merged.
   * @returns The first object from values.
   */function deepObjectAssignNonentry(){for(var r=arguments.length,t=new Array(r),a=0;a<r;a++)t[a]=arguments[a];if(t.length<2)return t[0];if(t.length>2){var i;return deepObjectAssignNonentry.apply(void 0,rd(i=[deepObjectAssign(t[0],t[1])]).call(i,_toConsumableArray(td(t).call(t,2))))}var o=t[0];var v=t[1];var u,c=_createForOfIteratorHelper$3(sd(v));try{for(c.s();!(u=c.n()).done;){var l=u.value;Object.prototype.propertyIsEnumerable.call(v,l)&&(v[l]===rw?delete o[l]:null===o[l]||null===v[l]||"object"!==_typeof(o[l])||"object"!==_typeof(v[l])||ud(o[l])||ud(v[l])?o[l]=clone(v[l]):o[l]=deepObjectAssignNonentry(o[l],v[l]))}}catch(r){c.e(r)}finally{c.f()}return o}
/**
   * Deep clone given object or array. In case of primitive simply return.
   *
   * @param a - Anything.
   * @returns Deep cloned object/array or unchanged a.
   */function clone(r){return ud(r)?gi(r).call(r,(function(r){return clone(r)})):"object"===_typeof(r)&&null!==r?deepObjectAssignNonentry({},r):r}
/**
   * Strip DELETE from given object.
   *
   * @param a - Object which may contain DELETE but won't after this is executed.
   */function stripDelete(r){for(var t=0,a=_d(r);t<a.length;t++){var i=a[t];r[i]===rw?delete r[i]:"object"===_typeof(r[i])&&null!==r[i]&&stripDelete(r[i])}}
/**
   * Setup a mock hammer.js object, for unit testing.
   *
   * Inspiration: https://github.com/uber/deck.gl/pull/658
   *
   * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
   */function hammerMock(){var r=function noop(){};return{on:r,off:r,destroy:r,emit:r,get:function get(){return{set:r}}}}var tw="undefined"!==typeof window?window.Hammer||Zb:function(){return hammerMock()};
/**
   * Turn an element into an clickToUse element.
   * When not active, the element has a transparent overlay. When the overlay is
   * clicked, the mode is changed to active.
   * When active, the element is displayed with a blue border around it, and
   * the interactive contents of the element can be used. When clicked outside
   * the element, the elements mode is changed to inactive.
   *
   * @param {Element} container
   * @class Activator
   */function Activator$1(t){var a,i=this||r;(this||r)._cleanupQueue=[];(this||r).active=false;(this||r)._dom={container:t,overlay:document.createElement("div")};(this||r)._dom.overlay.classList.add("vis-overlay");(this||r)._dom.container.appendChild((this||r)._dom.overlay);(this||r)._cleanupQueue.push((function(){i._dom.overlay.parentNode.removeChild(i._dom.overlay)}));var o=tw((this||r)._dom.overlay);o.on("tap",pa(a=(this||r)._onTapOverlay).call(a,this||r));(this||r)._cleanupQueue.push((function(){o.destroy()}));var v=["tap","doubletap","press","pinch","pan","panstart","panmove","panend"];Gd(v).call(v,(function(r){o.on(r,(function(r){r.srcEvent.stopPropagation()}))}));if(document&&document.body){(this||r)._onClick=function(r){_hasParent(r.target,t)||i.deactivate()};document.body.addEventListener("click",(this||r)._onClick);(this||r)._cleanupQueue.push((function(){document.body.removeEventListener("click",i._onClick)}))}(this||r)._escListener=function(r){("key"in r?"Escape"===r.key:27===r.keyCode)&&i.deactivate()}}b_(Activator$1.prototype);Activator$1.current=null;Activator$1.prototype.destroy=function(){var t,a;this.deactivate();var i,o=_createForOfIteratorHelper$3(ty(t=Oy(a=(this||r)._cleanupQueue).call(a,0)).call(t));try{for(o.s();!(i=o.n()).done;){var v=i.value;v()}}catch(r){o.e(r)}finally{o.f()}};Activator$1.prototype.activate=function(){Activator$1.current&&Activator$1.current.deactivate();Activator$1.current=this||r;(this||r).active=true;(this||r)._dom.overlay.style.display="none";(this||r)._dom.container.classList.add("vis-active");this.emit("change");this.emit("activate");document.body.addEventListener("keydown",(this||r)._escListener)};Activator$1.prototype.deactivate=function(){(this||r).active=false;(this||r)._dom.overlay.style.display="block";(this||r)._dom.container.classList.remove("vis-active");document.body.removeEventListener("keydown",(this||r)._escListener);this.emit("change");this.emit("deactivate")};
/**
   * Handle a tap event: activate the container
   *
   * @param {Event}  event   The event
   * @private
   */Activator$1.prototype._onTapOverlay=function(r){this.activate();r.srcEvent.stopPropagation()};
/**
   * Test whether the element has the requested parent element somewhere in
   * its chain of parent nodes.
   *
   * @param {HTMLElement} element
   * @param {HTMLElement} parent
   * @returns {boolean} Returns true when the parent is found somewhere in the
   *                    chain of parent nodes.
   * @private
   */function _hasParent(r,t){while(r){if(r===t)return true;r=r.parentNode}return false}var ew=o;var aw=Sn;var nw=tryToString$4;var iw=ew.TypeError;var aConstructor$1=function(r){if(aw(r))return r;throw iw(nw(r)+" is not a constructor")};var ow=_export;var vw=getBuiltIn$9;var sw=d;var uw=aa;var cw=aConstructor$1;var lw=anObject$b;var fw=isObject$f;var hw=Tv;var pw=fails$r;var dw=vw("Reflect","construct");var yw=Object.prototype;var gw=[].push;var mw=pw((function(){function F(){}return!(dw((function(){}),[],F)instanceof F)}));var _w=!pw((function(){dw((function(){}))}));var bw=mw||_w;ow({target:"Reflect",stat:true,forced:bw,sham:bw},{construct:function construct(r,t){cw(r);lw(t);var a=arguments.length<3?r:cw(arguments[2]);if(_w&&!mw)return dw(r,t,a);if(r==a){switch(t.length){case 0:return new r;case 1:return new r(t[0]);case 2:return new r(t[0],t[1]);case 3:return new r(t[0],t[1],t[2]);case 4:return new r(t[0],t[1],t[2],t[3])}var i=[null];sw(gw,i,t);return new(sw(uw,r,i))}var o=a.prototype;var v=hw(fw(o)?o:yw);var u=sw(r,v,t);return fw(u)?u:v}});var ww=X;var Tw=ww.Reflect.construct;var Aw=Tw;var Ow=Aw;var Ew=Ow;function _assertThisInitialized(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}var Iw=Sm;var Sw=Iw;var kw=Sw;var Pw=kw;var xw=Pw;var Dw=_export;var jw=ms;Dw({target:"Object",stat:true},{setPrototypeOf:jw});var Cw=X;var Lw=Cw.Object.setPrototypeOf;var Fw=Lw;var Rw=Fw;var Mw=Rw;var zw=Mw;var Nw=zw;var $w=Nw;var qw=$w;function _setPrototypeOf(r,t){_setPrototypeOf=qw||function _setPrototypeOf(r,t){r.__proto__=t;return r};return _setPrototypeOf(r,t)}function _inherits(r,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");r.prototype=xw(t&&t.prototype,{constructor:{value:r,writable:true,configurable:true}});He(r,"prototype",{writable:false});t&&_setPrototypeOf(r,t)}function _possibleConstructorReturn(r,t){if(t&&("object"===_typeof(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(r)}var Gw=bg;var Hw=Gw;var Vw=Hw;var Ww=Vw;var Yw=Ww;function _getPrototypeOf(r){_getPrototypeOf=qw?Yw:function _getPrototypeOf(r){return r.__proto__||Yw(r)};return _getPrototypeOf(r)}var Uw={exports:{}};(function(t){var a=function(t){var a=Object.prototype;var i=a.hasOwnProperty;var o;var v="function"===typeof Symbol?Symbol:{};var u=v.iterator||"@@iterator";var c=v.asyncIterator||"@@asyncIterator";var l=v.toStringTag||"@@toStringTag";function define(r,t,a){Object.defineProperty(r,t,{value:a,enumerable:true,configurable:true,writable:true});return r[t]}try{define({},"")}catch(r){define=function(r,t,a){return r[t]=a}}function wrap(r,t,a,i){var o=t&&t.prototype instanceof Generator?t:Generator;var v=Object.create(o.prototype);var u=new Context(i||[]);v._invoke=makeInvokeMethod(r,a,u);return v}t.wrap=wrap;function tryCatch(r,t,a){try{return{type:"normal",arg:r.call(t,a)}}catch(r){return{type:"throw",arg:r}}}var h="suspendedStart";var p="suspendedYield";var d="executing";var y="completed";var g={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var m={};define(m,u,(function(){return this||r}));var _=Object.getPrototypeOf;var b=_&&_(_(values([])));b&&b!==a&&i.call(b,u)&&(m=b);var w=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(m);GeneratorFunction.prototype=GeneratorFunctionPrototype;define(w,"constructor",GeneratorFunctionPrototype);define(GeneratorFunctionPrototype,"constructor",GeneratorFunction);GeneratorFunction.displayName=define(GeneratorFunctionPrototype,l,"GeneratorFunction");function defineIteratorMethods(r){["next","throw","return"].forEach((function(t){define(r,t,(function(r){return this._invoke(t,r)}))}))}t.isGeneratorFunction=function(r){var t="function"===typeof r&&r.constructor;return!!t&&(t===GeneratorFunction||"GeneratorFunction"===(t.displayName||t.name))};t.mark=function(r){if(Object.setPrototypeOf)Object.setPrototypeOf(r,GeneratorFunctionPrototype);else{r.__proto__=GeneratorFunctionPrototype;define(r,l,"GeneratorFunction")}r.prototype=Object.create(w);return r};t.awrap=function(r){return{__await:r}};function AsyncIterator(t,a){function invoke(r,o,v,u){var c=tryCatch(t[r],t,o);if("throw"!==c.type){var l=c.arg;var h=l.value;return h&&"object"===typeof h&&i.call(h,"__await")?a.resolve(h.__await).then((function(r){invoke("next",r,v,u)}),(function(r){invoke("throw",r,v,u)})):a.resolve(h).then((function(r){l.value=r;v(l)}),(function(r){return invoke("throw",r,v,u)}))}u(c.arg)}var o;function enqueue(r,t){function callInvokeWithMethodAndArg(){return new a((function(a,i){invoke(r,t,a,i)}))}return o=o?o.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}(this||r)._invoke=enqueue}defineIteratorMethods(AsyncIterator.prototype);define(AsyncIterator.prototype,c,(function(){return this||r}));t.AsyncIterator=AsyncIterator;t.async=function(r,a,i,o,v){void 0===v&&(v=Promise);var u=new AsyncIterator(wrap(r,a,i,o),v);return t.isGeneratorFunction(a)?u:u.next().then((function(r){return r.done?r.value:u.next()}))};function makeInvokeMethod(r,t,a){var i=h;return function invoke(o,v){if(i===d)throw new Error("Generator is already running");if(i===y){if("throw"===o)throw v;return doneResult()}a.method=o;a.arg=v;while(true){var u=a.delegate;if(u){var c=maybeInvokeDelegate(u,a);if(c){if(c===g)continue;return c}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(i===h){i=y;throw a.arg}a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);i=d;var l=tryCatch(r,t,a);if("normal"===l.type){i=a.done?y:p;if(l.arg===g)continue;return{value:l.arg,done:a.done}}if("throw"===l.type){i=y;a.method="throw";a.arg=l.arg}}}}function maybeInvokeDelegate(r,t){var a=r.iterator[t.method];if(a===o){t.delegate=null;if("throw"===t.method){if(r.iterator.return){t.method="return";t.arg=o;maybeInvokeDelegate(r,t);if("throw"===t.method)return g}t.method="throw";t.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=tryCatch(a,r.iterator,t.arg);if("throw"===i.type){t.method="throw";t.arg=i.arg;t.delegate=null;return g}var v=i.arg;if(!v){t.method="throw";t.arg=new TypeError("iterator result is not an object");t.delegate=null;return g}if(!v.done)return v;t[r.resultName]=v.value;t.next=r.nextLoc;if("return"!==t.method){t.method="next";t.arg=o}t.delegate=null;return g}defineIteratorMethods(w);define(w,l,"Generator");define(w,u,(function(){return this||r}));define(w,"toString",(function(){return"[object Generator]"}));function pushTryEntry(t){var a={tryLoc:t[0]};1 in t&&(a.catchLoc=t[1]);if(2 in t){a.finallyLoc=t[2];a.afterLoc=t[3]}(this||r).tryEntries.push(a)}function resetTryEntry(r){var t=r.completion||{};t.type="normal";delete t.arg;r.completion=t}function Context(t){(this||r).tryEntries=[{tryLoc:"root"}];t.forEach(pushTryEntry,this||r);this.reset(true)}t.keys=function(r){var t=[];for(var a in r)t.push(a);t.reverse();return function next(){while(t.length){var a=t.pop();if(a in r){next.value=a;next.done=false;return next}}next.done=true;return next}};function values(r){if(r){var t=r[u];if(t)return t.call(r);if("function"===typeof r.next)return r;if(!isNaN(r.length)){var a=-1,v=function next(){while(++a<r.length)if(i.call(r,a)){next.value=r[a];next.done=false;return next}next.value=o;next.done=true;return next};return v.next=v}}return{next:doneResult}}t.values=values;function doneResult(){return{value:o,done:true}}Context.prototype={constructor:Context,reset:function(t){(this||r).prev=0;(this||r).next=0;(this||r).sent=(this||r)._sent=o;(this||r).done=false;(this||r).delegate=null;(this||r).method="next";(this||r).arg=o;(this||r).tryEntries.forEach(resetTryEntry);if(!t)for(var a in this||r)"t"===a.charAt(0)&&i.call(this||r,a)&&!isNaN(+a.slice(1))&&((this||r)[a]=o)},stop:function(){(this||r).done=true;var t=(this||r).tryEntries[0];var a=t.completion;if("throw"===a.type)throw a.arg;return(this||r).rval},dispatchException:function(t){if((this||r).done)throw t;var a=this||r;function handle(r,i){c.type="throw";c.arg=t;a.next=r;if(i){a.method="next";a.arg=o}return!!i}for(var v=(this||r).tryEntries.length-1;v>=0;--v){var u=(this||r).tryEntries[v];var c=u.completion;if("root"===u.tryLoc)return handle("end");if(u.tryLoc<=(this||r).prev){var l=i.call(u,"catchLoc");var h=i.call(u,"finallyLoc");if(l&&h){if((this||r).prev<u.catchLoc)return handle(u.catchLoc,true);if((this||r).prev<u.finallyLoc)return handle(u.finallyLoc)}else if(l){if((this||r).prev<u.catchLoc)return handle(u.catchLoc,true)}else{if(!h)throw new Error("try statement without catch or finally");if((this||r).prev<u.finallyLoc)return handle(u.finallyLoc)}}}},abrupt:function(t,a){for(var o=(this||r).tryEntries.length-1;o>=0;--o){var v=(this||r).tryEntries[o];if(v.tryLoc<=(this||r).prev&&i.call(v,"finallyLoc")&&(this||r).prev<v.finallyLoc){var u=v;break}}u&&("break"===t||"continue"===t)&&u.tryLoc<=a&&a<=u.finallyLoc&&(u=null);var c=u?u.completion:{};c.type=t;c.arg=a;if(u){(this||r).method="next";(this||r).next=u.finallyLoc;return g}return this.complete(c)},complete:function(t,a){if("throw"===t.type)throw t.arg;if("break"===t.type||"continue"===t.type)(this||r).next=t.arg;else if("return"===t.type){(this||r).rval=(this||r).arg=t.arg;(this||r).method="return";(this||r).next="end"}else"normal"===t.type&&a&&((this||r).next=a);return g},finish:function(t){for(var a=(this||r).tryEntries.length-1;a>=0;--a){var i=(this||r).tryEntries[a];if(i.finallyLoc===t){this.complete(i.completion,i.afterLoc);resetTryEntry(i);return g}}},catch:function(t){for(var a=(this||r).tryEntries.length-1;a>=0;--a){var i=(this||r).tryEntries[a];if(i.tryLoc===t){var o=i.completion;if("throw"===o.type){var v=o.arg;resetTryEntry(i)}return v}}throw new Error("illegal catch attempt")},delegateYield:function(t,a,i){(this||r).delegate={iterator:values(t),resultName:a,nextLoc:i};"next"===(this||r).method&&((this||r).arg=o);return g}};return t}(t.exports);try{r.regeneratorRuntime=a}catch(r){"object"===typeof globalThis?globalThis.regeneratorRuntime=a:Function("r","regeneratorRuntime = r")(a)}})(Uw);var Xw=Uw.exports;var Bw={exports:{}};var Qw=fails$r;var Jw=Qw((function(){if("function"==typeof ArrayBuffer){var r=new ArrayBuffer(8);Object.isExtensible(r)&&Object.defineProperty(r,"a",{value:8})}}));var Kw=fails$r;var Zw=isObject$f;var rT=classofRaw$1;var tT=Jw;var eT=Object.isExtensible;var aT=Kw((function(){eT(1)}));var nT=aT||tT?function isExtensible(r){return!!Zw(r)&&((!tT||"ArrayBuffer"!=rT(r))&&(!eT||eT(r)))}:eT;var iT=fails$r;var oT=!iT((function(){return Object.isExtensible(Object.preventExtensions({}))}));var vT=_export;var sT=w;var uT=oo;var cT=isObject$f;var lT=Qr;var fT=Jt.f;var hT=fc;var pT=yc;var dT=nT;var yT=uid$4;var gT=oT;var mT=false;var _T=yT("meta");var bT=0;var setMetadata=function(r){fT(r,_T,{value:{objectID:"O"+bT++,weakData:{}}})};var fastKey$1=function(r,t){if(!cT(r))return"symbol"==typeof r?r:("string"==typeof r?"S":"P")+r;if(!lT(r,_T)){if(!dT(r))return"F";if(!t)return"E";setMetadata(r)}return r[_T].objectID};var getWeakData=function(r,t){if(!lT(r,_T)){if(!dT(r))return true;if(!t)return false;setMetadata(r)}return r[_T].weakData};var onFreeze=function(r){gT&&mT&&dT(r)&&!lT(r,_T)&&setMetadata(r);return r};var enable=function(){wT.enable=function(){};mT=true;var r=hT.f;var t=sT([].splice);var a={};a[_T]=1;if(r(a).length){hT.f=function(a){var i=r(a);for(var o=0,v=i.length;o<v;o++)if(i[o]===_T){t(i,o,1);break}return i};vT({target:"Object",stat:true,forced:true},{getOwnPropertyNames:pT.f})}};var wT=Bw.exports={enable:enable,fastKey:fastKey$1,getWeakData:getWeakData,onFreeze:onFreeze};uT[_T]=true;var TT=o;var AT=functionBindContext;var OT=S;var ET=anObject$b;var IT=tryToString$4;var ST=isArrayIteratorMethod$2;var kT=lengthOfArrayLike$d;var PT=Z;var xT=getIterator$7;var DT=getIteratorMethod$8;var jT=iteratorClose$2;var CT=TT.TypeError;var Result=function(t,a){(this||r).stopped=t;(this||r).result=a};var LT=Result.prototype;var iterate$2=function(r,t,a){var i=a&&a.that;var o=!!(a&&a.AS_ENTRIES);var v=!!(a&&a.IS_ITERATOR);var u=!!(a&&a.INTERRUPTED);var c=AT(t,i);var l,h,p,d,y,g,m;var stop=function(r){l&&jT(l,"normal",r);return new Result(true,r)};var callFn=function(r){if(o){ET(r);return u?c(r[0],r[1],stop):c(r[0],r[1])}return u?c(r,stop):c(r)};if(v)l=r;else{h=DT(r);if(!h)throw CT(IT(r)+" is not iterable");if(ST(h)){for(p=0,d=kT(r);d>p;p++){y=callFn(r[p]);if(y&&PT(LT,y))return y}return new Result(false)}l=xT(r,h)}g=l.next;while(!(m=OT(g,l)).done){try{y=callFn(m.value)}catch(r){jT(l,"throw",r)}if("object"==typeof y&&y&&PT(LT,y))return y}return new Result(false)};var FT=o;var RT=Z;var MT=FT.TypeError;var anInstance$2=function(r,t){if(RT(t,r))return r;throw MT("Incorrect invocation")};var zT=_export;var NT=o;var $T=Bw.exports;var qT=fails$r;var GT=be;var HT=iterate$2;var VT=anInstance$2;var WT=isCallable$h;var YT=isObject$f;var UT=setToStringTag$5;var XT=Jt.f;var BT=Hn.forEach;var QT=O;var JT=ko;var KT=JT.set;var ZT=JT.getterFor;var collection$2=function(t,a,i){var o=-1!==t.indexOf("Map");var v=-1!==t.indexOf("Weak");var u=o?"set":"add";var c=NT[t];var l=c&&c.prototype;var h={};var p;if(QT&&WT(c)&&(v||l.forEach&&!qT((function(){(new c).entries().next()})))){p=a((function(r,a){KT(VT(r,d),{type:t,collection:new c});void 0!=a&&HT(a,r[u],{that:r,AS_ENTRIES:o})}));var d=p.prototype;var y=ZT(t);BT(["add","clear","delete","forEach","get","has","set","keys","values","entries"],(function(t){var a="add"==t||"set"==t;!(t in l)||v&&"clear"==t||GT(d,t,(function(i,o){var u=y(this||r).collection;if(!a&&v&&!YT(i))return"get"==t&&void 0;var c=u[t](0===i?0:i,o);return a?this||r:c}))}));v||XT(d,"size",{configurable:true,get:function(){return y(this||r).collection.size}})}else{p=i.getConstructor(a,t,o,u);$T.enable()}UT(p,t,false,true);h[t]=p;zT({global:true,forced:true},h);v||i.setStrong(p,t,o);return p};var rA=redefine$4;var redefineAll$1=function(r,t,a){for(var i in t)a&&a.unsafe&&r[i]?r[i]=t[i]:rA(r,i,t[i],a);return r};var tA=getBuiltIn$9;var eA=Jt;var aA=wellKnownSymbol$j;var nA=O;var iA=aA("species");var setSpecies$1=function(t){var a=tA(t);var i=eA.f;nA&&a&&!a[iA]&&i(a,iA,{configurable:true,get:function(){return this||r}})};var oA=Jt.f;var vA=Tv;var sA=redefineAll$1;var uA=functionBindContext;var cA=anInstance$2;var lA=iterate$2;var fA=defineIterator$3;var hA=setSpecies$1;var pA=O;var dA=Bw.exports.fastKey;var yA=ko;var gA=yA.set;var mA=yA.getterFor;var _A={getConstructor:function(t,a,i,o){var v=t((function(r,t){cA(r,u);gA(r,{type:a,index:vA(null),first:void 0,last:void 0,size:0});pA||(r.size=0);void 0!=t&&lA(t,r[o],{that:r,AS_ENTRIES:i})}));var u=v.prototype;var c=mA(a);var define=function(r,t,a){var i=c(r);var o=getEntry(r,t);var v,u;if(o)o.value=a;else{i.last=o={index:u=dA(t,true),key:t,value:a,previous:v=i.last,next:void 0,removed:false};i.first||(i.first=o);v&&(v.next=o);pA?i.size++:r.size++;"F"!==u&&(i.index[u]=o)}return r};var getEntry=function(r,t){var a=c(r);var i=dA(t);var o;if("F"!==i)return a.index[i];for(o=a.first;o;o=o.next)if(o.key==t)return o};sA(u,{clear:function clear(){var t=this||r;var a=c(t);var i=a.index;var o=a.first;while(o){o.removed=true;o.previous&&(o.previous=o.previous.next=void 0);delete i[o.index];o=o.next}a.first=a.last=void 0;pA?a.size=0:t.size=0},delete:function(t){var a=this||r;var i=c(a);var o=getEntry(a,t);if(o){var v=o.next;var u=o.previous;delete i.index[o.index];o.removed=true;u&&(u.next=v);v&&(v.previous=u);i.first==o&&(i.first=v);i.last==o&&(i.last=u);pA?i.size--:a.size--}return!!o},forEach:function forEach(t){var a=c(this||r);var i=uA(t,arguments.length>1?arguments[1]:void 0);var o;while(o=o?o.next:a.first){i(o.value,o.key,this||r);while(o&&o.removed)o=o.previous}},has:function has(t){return!!getEntry(this||r,t)}});sA(u,i?{get:function get(t){var a=getEntry(this||r,t);return a&&a.value},set:function set(t,a){return define(this||r,0===t?0:t,a)}}:{add:function add(t){return define(this||r,t=0===t?0:t,t)}});pA&&oA(u,"size",{get:function(){return c(this||r).size}});return v},setStrong:function(t,a,i){var o=a+" Iterator";var v=mA(a);var u=mA(o);fA(t,a,(function(t,a){gA(this||r,{type:o,target:t,state:v(t),kind:a,last:void 0})}),(function(){var t=u(this||r);var a=t.kind;var i=t.last;while(i&&i.removed)i=i.previous;if(!t.target||!(t.last=i=i?i.next:t.state.first)){t.target=void 0;return{value:void 0,done:true}}return"keys"==a?{value:i.key,done:false}:"values"==a?{value:i.value,done:false}:{value:[i.key,i.value],done:false}}),i?"entries":"values",!i,true);hA(a)}};var bA=collection$2;var wA=_A;bA("Map",(function(t){return function Map(){return t(this||r,arguments.length?arguments[0]:void 0)}}),wA);var TA=X;var AA=TA.Map;var OA=AA;var EA=OA;var IA=EA;var SA=_export;var kA=Hn.some;var PA=arrayMethodIsStrict$5;var xA=PA("some");SA({target:"Array",proto:true,forced:!xA},{some:function some(t){return kA(this||r,t,arguments.length>1?arguments[1]:void 0)}});var DA=entryVirtual$k;var jA=DA("Array").some;var CA=Z;var LA=jA;var FA=Array.prototype;var some$2=function(r){var t=r.some;return r===FA||CA(FA,r)&&t===FA.some?LA:t};var RA=some$2;var MA=RA;var zA=MA;var NA=entryVirtual$k;var $A=NA("Array").keys;var qA=$A;var GA=qA;var HA=sn;var VA=Qr;var WA=Z;var YA=GA;var UA=Array.prototype;var XA={DOMTokenList:true,NodeList:true};var keys$1=function(r){var t=r.keys;return r===UA||WA(UA,r)&&t===UA.keys||VA(XA,HA(r))?YA:t};var BA=keys$1;var QA=arraySliceSimple;var JA=Math.floor;var mergeSort=function(r,t){var a=r.length;var i=JA(a/2);return a<8?insertionSort(r,t):merge(r,mergeSort(QA(r,0,i),t),mergeSort(QA(r,i),t),t)};var insertionSort=function(r,t){var a=r.length;var i=1;var o,v;while(i<a){v=i;o=r[i];while(v&&t(r[v-1],o)>0)r[v]=r[--v];v!==i++&&(r[v]=o)}return r};var merge=function(r,t,a,i){var o=t.length;var v=a.length;var u=0;var c=0;while(u<o||c<v)r[u+c]=u<o&&c<v?i(t[u],a[c])<=0?t[u++]:a[c++]:u<o?t[u++]:a[c++];return r};var KA=mergeSort;var ZA=tr;var rO=ZA.match(/firefox\/(\d+)/i);var tO=!!rO&&+rO[1];var eO=tr;var aO=/MSIE|Trident/.test(eO);var nO=tr;var iO=nO.match(/AppleWebKit\/(\d+)\./);var oO=!!iO&&+iO[1];var vO=_export;var sO=w;var uO=aCallable$7;var cO=toObject$e;var lO=lengthOfArrayLike$d;var fO=toString$7;var hO=fails$r;var pO=KA;var dO=arrayMethodIsStrict$5;var yO=tO;var gO=aO;var mO=cr;var _O=oO;var bO=[];var wO=sO(bO.sort);var TO=sO(bO.push);var AO=hO((function(){bO.sort(void 0)}));var OO=hO((function(){bO.sort(null)}));var EO=dO("sort");var IO=!hO((function(){if(mO)return mO<70;if(!(yO&&yO>3)){if(gO)return true;if(_O)return _O<603;var r="";var t,a,i,o;for(t=65;t<76;t++){a=String.fromCharCode(t);switch(t){case 66:case 69:case 70:case 72:i=3;break;case 68:case 71:i=4;break;default:i=2}for(o=0;o<47;o++)bO.push({k:a+o,v:i})}bO.sort((function(r,t){return t.v-r.v}));for(o=0;o<bO.length;o++){a=bO[o].k.charAt(0);r.charAt(r.length-1)!==a&&(r+=a)}return"DGBEFHACIJK"!==r}}));var SO=AO||!OO||!EO||!IO;var getSortCompare=function(r){return function(t,a){return void 0===a?-1:void 0===t?1:void 0!==r?+r(t,a)||0:fO(t)>fO(a)?1:-1}};vO({target:"Array",proto:true,forced:SO},{sort:function sort(t){void 0!==t&&uO(t);var a=cO(this||r);if(IO)return void 0===t?wO(a):wO(a,t);var i=[];var o=lO(a);var v,u;for(u=0;u<o;u++)u in a&&TO(i,a[u]);pO(i,getSortCompare(t));v=i.length;u=0;while(u<v)a[u]=i[u++];while(u<o)delete a[u++];return a}});var kO=entryVirtual$k;var PO=kO("Array").sort;var xO=Z;var DO=PO;var jO=Array.prototype;var sort$2=function(r){var t=r.sort;return r===jO||xO(jO,r)&&t===jO.sort?DO:t};var CO=sort$2;var LO=CO;var FO=LO;var RO=entryVirtual$k;var MO=RO("Array").values;var zO=MO;var NO=zO;var $O=sn;var qO=Qr;var GO=Z;var HO=NO;var VO=Array.prototype;var WO={DOMTokenList:true,NodeList:true};var values$1=function(r){var t=r.values;return r===VO||GO(VO,r)&&t===VO.values||qO(WO,$O(r))?HO:t};var YO=values$1;var UO=$p;var XO=entryVirtual$k;var BO=XO("Array").entries;var QO=BO;var JO=QO;var KO=sn;var ZO=Qr;var rE=Z;var tE=JO;var eE=Array.prototype;var aE={DOMTokenList:true,NodeList:true};var entries$1=function(r){var t=r.entries;return r===eE||rE(eE,r)&&t===eE.entries||ZO(aE,KO(r))?tE:t};var nE=entries$1;var iE;var oE=new Uint8Array(16);function rng(){if(!iE){iE="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(!iE)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported")}return iE(oE)}var vE=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function validate(r){return"string"===typeof r&&vE.test(r)}var sE=[];for(var uE=0;uE<256;++uE)sE.push((uE+256).toString(16).substr(1));function stringify(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;var a=(sE[r[t+0]]+sE[r[t+1]]+sE[r[t+2]]+sE[r[t+3]]+"-"+sE[r[t+4]]+sE[r[t+5]]+"-"+sE[r[t+6]]+sE[r[t+7]]+"-"+sE[r[t+8]]+sE[r[t+9]]+"-"+sE[r[t+10]]+sE[r[t+11]]+sE[r[t+12]]+sE[r[t+13]]+sE[r[t+14]]+sE[r[t+15]]).toLowerCase();if(!validate(a))throw TypeError("Stringified UUID is invalid");return a}function v4(r,t,a){r=r||{};var i=r.random||(r.rng||rng)();i[6]=15&i[6]|64;i[8]=63&i[8]|128;if(t){a=a||0;for(var o=0;o<16;++o)t[a+o]=i[o];return t}return stringify(i)}
/**
   * Determine whether a value can be used as an id.
   *
   * @param value - Input value of unknown type.
   * @returns True if the value is valid id, false otherwise.
   */function isId(r){return"string"===typeof r||"number"===typeof r}
/**
   * A queue.
   *
   * @typeParam T - The type of method names to be replaced by queued versions.
   */var cE=function(){
/**
     * Construct a new Queue.
     *
     * @param options - Queue configuration.
     */
function Queue(t){_classCallCheck(this||r,Queue);_defineProperty(this||r,"delay",void 0);_defineProperty(this||r,"max",void 0);_defineProperty(this||r,"_queue",[]);_defineProperty(this||r,"_timeout",null);_defineProperty(this||r,"_extended",null);(this||r).delay=null;(this||r).max=Infinity;this.setOptions(t)}
/**
     * Update the configuration of the queue.
     *
     * @param options - Queue configuration.
     */_createClass(Queue,[{key:"setOptions",value:function setOptions(t){t&&"undefined"!==typeof t.delay&&((this||r).delay=t.delay);t&&"undefined"!==typeof t.max&&((this||r).max=t.max);this._flushIfNeeded()}
/**
       * Extend an object with queuing functionality.
       * The object will be extended with a function flush, and the methods provided in options.replace will be replaced with queued ones.
       *
       * @param object - The object to be extended.
       * @param options - Additional options.
       * @returns The created queue.
       */},{key:"destroy",value:function destroy(){this.flush();if((this||r)._extended){var t=(this||r)._extended.object;var a=(this||r)._extended.methods;for(var i=0;i<a.length;i++){var o=a[i];o.original?t[o.name]=o.original:delete t[o.name]}(this||r)._extended=null}}
/**
       * Replace a method on an object with a queued version.
       *
       * @param object - Object having the method.
       * @param method - The method name.
       */},{key:"replace",value:function replace(t,a){
/* eslint-disable-next-line @typescript-eslint/no-this-alias -- Function this is necessary in the function bellow, so class this has to be saved into a variable here. */
var i=this||r;var o=t[a];if(!o)throw new Error("Method "+a+" undefined");t[a]=function(){for(var t=arguments.length,a=new Array(t),v=0;v<t;v++)a[v]=arguments[v];i.queue({args:a,fn:o,context:this||r})}}
/**
       * Queue a call.
       *
       * @param entry - The function or entry to be queued.
       */},{key:"queue",value:function queue(t){"function"===typeof t?(this||r)._queue.push({fn:t}):(this||r)._queue.push(t);this._flushIfNeeded()}},{key:"_flushIfNeeded",value:function _flushIfNeeded(){var t=this||r;(this||r)._queue.length>(this||r).max&&this.flush();if(null!=(this||r)._timeout){clearTimeout((this||r)._timeout);(this||r)._timeout=null}(this||r).queue.length>0&&"number"===typeof(this||r).delay&&((this||r)._timeout=l_((function(){t.flush()}),(this||r).delay))}},{key:"flush",value:function flush(){var t,a;Gd(t=Oy(a=(this||r)._queue).call(a,0)).call(t,(function(r){r.fn.apply(r.context||r.fn,r.args||[])}))}}],[{key:"extend",value:function extend(r,t){var a=new Queue(t);if(void 0!==r.flush)throw new Error("Target object already has a property flush");r.flush=function(){a.flush()};var i=[{name:"flush",original:void 0}];if(t&&t.replace)for(var o=0;o<t.replace.length;o++){var v=t.replace[o];i.push({name:v,original:r[v]});a.replace(r,v)}a._extended={object:r,methods:i};return a}}]);return Queue}();
/**
   * [[DataSet]] code that can be reused in [[DataView]] or other similar implementations of [[DataInterface]].
   *
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   */var lE=function(){function DataSetPart(){_classCallCheck(this||r,DataSetPart);_defineProperty(this||r,"_subscribers",{"*":[],add:[],remove:[],update:[]});_defineProperty(this||r,"subscribe",DataSetPart.prototype.on);_defineProperty(this||r,"unsubscribe",DataSetPart.prototype.off)}_createClass(DataSetPart,[{key:"_trigger",value:
/**
       * Trigger an event
       *
       * @param event - Event name.
       * @param payload - Event payload.
       * @param senderId - Id of the sender.
       */
function _trigger(t,a,i){var o,v;if("*"===t)throw new Error("Cannot trigger event *");Gd(o=rd(v=[]).call(v,_toConsumableArray((this||r)._subscribers[t]),_toConsumableArray((this||r)._subscribers["*"]))).call(o,(function(r){r(t,a,null!=i?i:null)}))}
/**
       * Subscribe to an event, add an event listener.
       *
       * @remarks Non-function callbacks are ignored.
       * @param event - Event name.
       * @param callback - Callback method.
       */},{key:"on",value:function on(t,a){"function"===typeof a&&(this||r)._subscribers[t].push(a)}
/**
       * Unsubscribe from an event, remove an event listener.
       *
       * @remarks If the same callback was subscribed more than once **all** occurences will be removed.
       * @param event - Event name.
       * @param callback - Callback method.
       */},{key:"off",value:function off(t,a){var i;(this||r)._subscribers[t]=ii(i=(this||r)._subscribers[t]).call(i,(function(r){return r!==a}))}
/**
       * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
       */}]);return DataSetPart}();var fE=collection$2;var hE=_A;fE("Set",(function(t){return function Set(){return t(this||r,arguments.length?arguments[0]:void 0)}}),hE);var pE=X;var dE=pE.Set;var yE=dE;var gE=yE;var mE=gE;var _E=getIterator$7;var bE=_E;var wE=bE;var TE=wE;var AE=TE;var OE=AE;var EE=OE;var IE=EE;var SE=IE;var kE;function _createForOfIteratorHelper$2(r,t){var a="undefined"!==typeof Yp&&lc(r)||r["@@iterator"];if(!a){if(ud(r)||(a=_unsupportedIterableToArray$2(r))||t&&r&&"number"===typeof r.length){a&&(r=a);var i=0;var o=function F(){};return{s:o,n:function n(){return i>=r.length?{done:true}:{done:false,value:r[i++]}},e:function e(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var v,u=true,c=false;return{s:function s(){a=a.call(r)},n:function n(){var r=a.next();u=r.done;return r},e:function e(r){c=true;v=r},f:function f(){try{u||null==a.return||a.return()}finally{if(c)throw v}}}}function _unsupportedIterableToArray$2(r,t){var a;if(r){if("string"===typeof r)return _arrayLikeToArray$2(r,t);var i=td(a=Object.prototype.toString.call(r)).call(a,8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);return"Map"===i||"Set"===i?zu(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray$2(r,t):void 0}}function _arrayLikeToArray$2(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=r[a];return i}kE=UO;
/**
   * Data stream
   *
   * @remarks
   * [[DataStream]] offers an always up to date stream of items from a [[DataSet]] or [[DataView]].
   * That means that the stream is evaluated at the time of iteration, conversion to another data type or when [[cache]] is called, not when the [[DataStream]] was created.
   * Multiple invocations of for example [[toItemArray]] may yield different results (if the data source like for example [[DataSet]] gets modified).
   * @typeParam Item - The item type this stream is going to work with.
   */var PE=function(){
/**
     * Create a new data stream.
     *
     * @param pairs - The id, item pairs.
     */
function DataStream(t){_classCallCheck(this||r,DataStream);_defineProperty(this||r,"_pairs",void 0);(this||r)._pairs=t}_createClass(DataStream,[{key:kE,value:Xw.mark((function value(){var t,a,i,o,v;return Xw.wrap((function value$(u){while(1)switch(u.prev=u.next){case 0:t=_createForOfIteratorHelper$2((this||r)._pairs);u.prev=1;t.s();case 3:if((a=t.n()).done){u.next=9;break}i=_slicedToArray(a.value,2),o=i[0],v=i[1];u.next=7;return[o,v];case 7:u.next=3;break;case 9:u.next=14;break;case 11:u.prev=11;u.t0=u.catch(1);t.e(u.t0);case 14:u.prev=14;t.f();return u.finish(14);case 17:case"end":return u.stop()}}),value,this||r,[[1,11,14,17]])}))},{key:"entries",value:Xw.mark((function entries(){var t,a,i,o,v;return Xw.wrap((function entries$(u){while(1)switch(u.prev=u.next){case 0:t=_createForOfIteratorHelper$2((this||r)._pairs);u.prev=1;t.s();case 3:if((a=t.n()).done){u.next=9;break}i=_slicedToArray(a.value,2),o=i[0],v=i[1];u.next=7;return[o,v];case 7:u.next=3;break;case 9:u.next=14;break;case 11:u.prev=11;u.t0=u.catch(1);t.e(u.t0);case 14:u.prev=14;t.f();return u.finish(14);case 17:case"end":return u.stop()}}),entries,this||r,[[1,11,14,17]])}))},{key:"keys",value:Xw.mark((function keys(){var t,a,i,o;return Xw.wrap((function keys$(v){while(1)switch(v.prev=v.next){case 0:t=_createForOfIteratorHelper$2((this||r)._pairs);v.prev=1;t.s();case 3:if((a=t.n()).done){v.next=9;break}i=_slicedToArray(a.value,1),o=i[0];v.next=7;return o;case 7:v.next=3;break;case 9:v.next=14;break;case 11:v.prev=11;v.t0=v.catch(1);t.e(v.t0);case 14:v.prev=14;t.f();return v.finish(14);case 17:case"end":return v.stop()}}),keys,this||r,[[1,11,14,17]])}))},{key:"values",value:Xw.mark((function values(){var t,a,i,o;return Xw.wrap((function values$(v){while(1)switch(v.prev=v.next){case 0:t=_createForOfIteratorHelper$2((this||r)._pairs);v.prev=1;t.s();case 3:if((a=t.n()).done){v.next=9;break}i=_slicedToArray(a.value,2),o=i[1];v.next=7;return o;case 7:v.next=3;break;case 9:v.next=14;break;case 11:v.prev=11;v.t0=v.catch(1);t.e(v.t0);case 14:v.prev=14;t.f();return v.finish(14);case 17:case"end":return v.stop()}}),values,this||r,[[1,11,14,17]])}))
/**
       * Return an array containing all the ids in this stream.
       *
       * @remarks
       * The array may contain duplicities.
       * @returns The array with all ids from this stream.
       */},{key:"toIdArray",value:function toIdArray(){var t;return gi(t=_toConsumableArray((this||r)._pairs)).call(t,(function(r){return r[0]}))}
/**
       * Return an array containing all the items in this stream.
       *
       * @remarks
       * The array may contain duplicities.
       * @returns The array with all items from this stream.
       */},{key:"toItemArray",value:function toItemArray(){var t;return gi(t=_toConsumableArray((this||r)._pairs)).call(t,(function(r){return r[1]}))}
/**
       * Return an array containing all the entries in this stream.
       *
       * @remarks
       * The array may contain duplicities.
       * @returns The array with all entries from this stream.
       */},{key:"toEntryArray",value:function toEntryArray(){return _toConsumableArray((this||r)._pairs)}
/**
       * Return an object map containing all the items in this stream accessible by ids.
       *
       * @remarks
       * In case of duplicate ids (coerced to string so `7 == '7'`) the last encoutered appears in the returned object.
       * @returns The object map of all id → item pairs from this stream.
       */},{key:"toObjectMap",value:function toObjectMap(){var t=km(null);var a,i=_createForOfIteratorHelper$2((this||r)._pairs);try{for(i.s();!(a=i.n()).done;){var o=_slicedToArray(a.value,2),v=o[0],u=o[1];t[v]=u}}catch(r){i.e(r)}finally{i.f()}return t}
/**
       * Return a map containing all the items in this stream accessible by ids.
       *
       * @returns The map of all id → item pairs from this stream.
       */},{key:"toMap",value:function toMap(){return new IA((this||r)._pairs)}
/**
       * Return a set containing all the (unique) ids in this stream.
       *
       * @returns The set of all ids from this stream.
       */},{key:"toIdSet",value:function toIdSet(){return new mE(this.toIdArray())}
/**
       * Return a set containing all the (unique) items in this stream.
       *
       * @returns The set of all items from this stream.
       */},{key:"toItemSet",value:function toItemSet(){return new mE(this.toItemArray())}
/**
       * Cache the items from this stream.
       *
       * @remarks
       * This method allows for items to be fetched immediatelly and used (possibly multiple times) later.
       * It can also be used to optimize performance as [[DataStream]] would otherwise reevaluate everything upon each iteration.
       *
       * ## Example
       * ```javascript
       * const ds = new DataSet([…])
       *
       * const cachedStream = ds.stream()
       *   .filter(…)
       *   .sort(…)
       *   .map(…)
       *   .cached(…) // Data are fetched, processed and cached here.
       *
       * ds.clear()
       * chachedStream // Still has all the items.
       * ```
       * @returns A new [[DataStream]] with cached items (detached from the original [[DataSet]]).
       */},{key:"cache",value:function cache(){return new DataStream(_toConsumableArray((this||r)._pairs))}
/**
       * Get the distinct values of given property.
       *
       * @param callback - The function that picks and possibly converts the property.
       * @typeParam T - The type of the distinct value.
       * @returns A set of all distinct properties.
       */},{key:"distinct",value:function distinct(t){var a=new mE;var i,o=_createForOfIteratorHelper$2((this||r)._pairs);try{for(o.s();!(i=o.n()).done;){var v=_slicedToArray(i.value,2),u=v[0],c=v[1];a.add(t(c,u))}}catch(r){o.e(r)}finally{o.f()}return a}
/**
       * Filter the items of the stream.
       *
       * @param callback - The function that decides whether an item will be included.
       * @returns A new data stream with the filtered items.
       */},{key:"filter",value:function filter(t){var a=(this||r)._pairs;return new DataStream(_defineProperty({},UO,Xw.mark((function _callee(){var r,i,o,v,u;return Xw.wrap((function _callee$(c){while(1)switch(c.prev=c.next){case 0:r=_createForOfIteratorHelper$2(a);c.prev=1;r.s();case 3:if((i=r.n()).done){c.next=10;break}o=_slicedToArray(i.value,2),v=o[0],u=o[1];if(!t(u,v)){c.next=8;break}c.next=8;return[v,u];case 8:c.next=3;break;case 10:c.next=15;break;case 12:c.prev=12;c.t0=c.catch(1);r.e(c.t0);case 15:c.prev=15;r.f();return c.finish(15);case 18:case"end":return c.stop()}}),_callee,null,[[1,12,15,18]])}))))}
/**
       * Execute a callback for each item of the stream.
       *
       * @param callback - The function that will be invoked for each item.
       */},{key:"forEach",value:function forEach(t){var a,i=_createForOfIteratorHelper$2((this||r)._pairs);try{for(i.s();!(a=i.n()).done;){var o=_slicedToArray(a.value,2),v=o[0],u=o[1];t(u,v)}}catch(r){i.e(r)}finally{i.f()}}
/**
       * Map the items into a different type.
       *
       * @param callback - The function that does the conversion.
       * @typeParam Mapped - The type of the item after mapping.
       * @returns A new data stream with the mapped items.
       */},{key:"map",value:function map(t){var a=(this||r)._pairs;return new DataStream(_defineProperty({},UO,Xw.mark((function _callee2(){var r,i,o,v,u;return Xw.wrap((function _callee2$(c){while(1)switch(c.prev=c.next){case 0:r=_createForOfIteratorHelper$2(a);c.prev=1;r.s();case 3:if((i=r.n()).done){c.next=9;break}o=_slicedToArray(i.value,2),v=o[0],u=o[1];c.next=7;return[v,t(u,v)];case 7:c.next=3;break;case 9:c.next=14;break;case 11:c.prev=11;c.t0=c.catch(1);r.e(c.t0);case 14:c.prev=14;r.f();return c.finish(14);case 17:case"end":return c.stop()}}),_callee2,null,[[1,11,14,17]])}))))}
/**
       * Get the item with the maximum value of given property.
       *
       * @param callback - The function that picks and possibly converts the property.
       * @returns The item with the maximum if found otherwise null.
       */},{key:"max",value:function max(t){var a=SE((this||r)._pairs);var i=a.next();if(i.done)return null;var o=i.value[1];var v=t(i.value[1],i.value[0]);while(!(i=a.next()).done){var u=_slicedToArray(i.value,2),c=u[0],l=u[1];var h=t(l,c);if(h>v){v=h;o=l}}return o}
/**
       * Get the item with the minimum value of given property.
       *
       * @param callback - The function that picks and possibly converts the property.
       * @returns The item with the minimum if found otherwise null.
       */},{key:"min",value:function min(t){var a=SE((this||r)._pairs);var i=a.next();if(i.done)return null;var o=i.value[1];var v=t(i.value[1],i.value[0]);while(!(i=a.next()).done){var u=_slicedToArray(i.value,2),c=u[0],l=u[1];var h=t(l,c);if(h<v){v=h;o=l}}return o}
/**
       * Reduce the items into a single value.
       *
       * @param callback - The function that does the reduction.
       * @param accumulator - The initial value of the accumulator.
       * @typeParam T - The type of the accumulated value.
       * @returns The reduced value.
       */},{key:"reduce",value:function reduce(t,a){var i,o=_createForOfIteratorHelper$2((this||r)._pairs);try{for(o.s();!(i=o.n()).done;){var v=_slicedToArray(i.value,2),u=v[0],c=v[1];a=t(a,c,u)}}catch(r){o.e(r)}finally{o.f()}return a}
/**
       * Sort the items.
       *
       * @param callback - Item comparator.
       * @returns A new stream with sorted items.
       */},{key:"sort",value:function sort$1(t){var a=this||r;return new DataStream(_defineProperty({},UO,(function(){var r;return SE(FO(r=_toConsumableArray(a._pairs)).call(r,(function(r,a){var i=_slicedToArray(r,2),o=i[0],v=i[1];var u=_slicedToArray(a,2),c=u[0],l=u[1];return t(v,l,o,c)})))})))}}]);return DataStream}();function ownKeys(r,t){var a=_d(r);if(vf){var i=vf(r);t&&(i=ii(i).call(i,(function(t){return wf(r,t).enumerable}))),a.push.apply(a,i)}return a}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var a,i;var o=null!=arguments[t]?arguments[t]:{};t%2?Gd(a=ownKeys(Object(o),!0)).call(a,(function(t){_defineProperty(r,t,o[t])})):Nf?Bf(r,Nf(o)):Gd(i=ownKeys(Object(o))).call(i,(function(t){Qf(r,t,wf(o,t))}))}return r}function _createForOfIteratorHelper$1(r,t){var a="undefined"!==typeof Yp&&lc(r)||r["@@iterator"];if(!a){if(ud(r)||(a=_unsupportedIterableToArray$1(r))||t&&r&&"number"===typeof r.length){a&&(r=a);var i=0;var o=function F(){};return{s:o,n:function n(){return i>=r.length?{done:true}:{done:false,value:r[i++]}},e:function e(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var v,u=true,c=false;return{s:function s(){a=a.call(r)},n:function n(){var r=a.next();u=r.done;return r},e:function e(r){c=true;v=r},f:function f(){try{u||null==a.return||a.return()}finally{if(c)throw v}}}}function _unsupportedIterableToArray$1(r,t){var a;if(r){if("string"===typeof r)return _arrayLikeToArray$1(r,t);var i=td(a=Object.prototype.toString.call(r)).call(a,8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);return"Map"===i||"Set"===i?zu(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray$1(r,t):void 0}}function _arrayLikeToArray$1(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=r[a];return i}function _createSuper$1(t){var a=_isNativeReflectConstruct$1();return function _createSuperInternal(){var i,o=_getPrototypeOf(t);if(a){var v=_getPrototypeOf(this||r).constructor;i=Ew(o,arguments,v)}else i=o.apply(this||r,arguments);return _possibleConstructorReturn(this||r,i)}}function _isNativeReflectConstruct$1(){if("undefined"===typeof Reflect||!Ew)return false;if(Ew.sham)return false;if("function"===typeof Proxy)return true;try{Boolean.prototype.valueOf.call(Ew(Boolean,[],(function(){})));return true}catch(r){return false}}
/**
   * Add an id to given item if it doesn't have one already.
   *
   * @remarks
   * The item will be modified.
   * @param item - The item that will have an id after a call to this function.
   * @param idProp - The key of the id property.
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   * @returns true
   */function ensureFullItem(r,t){null==r[t]&&(r[t]=v4());return r}
/**
   * # DataSet
   *
   * Vis.js comes with a flexible DataSet, which can be used to hold and
   * manipulate unstructured data and listen for changes in the data. The DataSet
   * is key/value based. Data items can be added, updated and removed from the
   * DataSet, and one can subscribe to changes in the DataSet. The data in the
   * DataSet can be filtered and ordered. Data can be normalized when appending it
   * to the DataSet as well.
   *
   * ## Example
   *
   * The following example shows how to use a DataSet.
   *
   * ```javascript
   * // create a DataSet
   * var options = {};
   * var data = new vis.DataSet(options);
   *
   * // add items
   * // note that the data items can contain different properties and data formats
   * data.add([
   *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
   *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
   *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
   *   {id: 4, text: 'item 4'}
   * ]);
   *
   * // subscribe to any change in the DataSet
   * data.on('*', function (event, properties, senderId) {
   *   console.log('event', event, properties);
   * });
   *
   * // update an existing item
   * data.update({id: 2, group: 1});
   *
   * // remove an item
   * data.remove(4);
   *
   * // get all ids
   * var ids = data.getIds();
   * console.log('ids', ids);
   *
   * // get a specific item
   * var item1 = data.get(1);
   * console.log('item1', item1);
   *
   * // retrieve a filtered subset of the data
   * var items = data.get({
   *   filter: function (item) {
   *     return item.group == 1;
   *   }
   * });
   * console.log('filtered items', items);
   * ```
   *
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   */var xE=function(t){_inherits(DataSet,t);var a=_createSuper$1(DataSet);
/**
     * Construct a new DataSet.
     *
     * @param data - Initial data or options.
     * @param options - Options (type error if data is also options).
     */function DataSet(t,i){var o;_classCallCheck(this||r,DataSet);o=a.call(this||r);_defineProperty(_assertThisInitialized(o),"flush",void 0);_defineProperty(_assertThisInitialized(o),"length",void 0);_defineProperty(_assertThisInitialized(o),"_options",void 0);_defineProperty(_assertThisInitialized(o),"_data",void 0);_defineProperty(_assertThisInitialized(o),"_idProp",void 0);_defineProperty(_assertThisInitialized(o),"_queue",null);if(t&&!ud(t)){i=t;t=[]}o._options=i||{};o._data=new IA;o.length=0;o._idProp=o._options.fieldId||"id";t&&t.length&&o.add(t);o.setOptions(i);return o}
/**
     * Set new options.
     *
     * @param options - The new options.
     */_createClass(DataSet,[{key:"idProp",get:function get(){return(this||r)._idProp}},{key:"setOptions",value:function setOptions(t){if(t&&void 0!==t.queue)if(false===t.queue){if((this||r)._queue){(this||r)._queue.destroy();(this||r)._queue=null}}else{(this||r)._queue||((this||r)._queue=cE.extend(this||r,{replace:["add","update","remove"]}));t.queue&&"object"===_typeof(t.queue)&&(this||r)._queue.setOptions(t.queue)}}
/**
       * Add a data item or an array with items.
       *
       * After the items are added to the DataSet, the DataSet will trigger an event `add`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       *
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet()
       *
       * // add items
       * const ids = data.add([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { text: 'item without an id' }
       * ])
       *
       * console.log(ids) // [1, 2, '<UUIDv4>']
       * ```
       *
       * @param data - Items to be added (ids will be generated if missing).
       * @param senderId - Sender id.
       * @returns addedIds - Array with the ids (generated if not present) of the added items.
       * @throws When an item with the same id as any of the added items already exists.
       */},{key:"add",value:function add(t,a){var i=this||r;var o=[];var v;if(ud(t)){var u=gi(t).call(t,(function(r){return r[i._idProp]}));if(zA(u).call(u,(function(r){return i._data.has(r)})))throw new Error("A duplicate id was found in the parameter array.");for(var c=0,l=t.length;c<l;c++){v=this._addItem(t[c]);o.push(v)}}else{if(!t||"object"!==_typeof(t))throw new Error("Unknown dataType");v=this._addItem(t);o.push(v)}o.length&&this._trigger("add",{items:o},a);return o}
/**
       * Update existing items. When an item does not exist, it will be created.
       *
       * @remarks
       * The provided properties will be merged in the existing item. When an item does not exist, it will be created.
       *
       * After the items are updated, the DataSet will trigger an event `add` for the added items, and an event `update`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       *
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { id: 3, text: 'item 3' }
       * ])
       *
       * // update items
       * const ids = data.update([
       *   { id: 2, text: 'item 2 (updated)' },
       *   { id: 4, text: 'item 4 (new)' }
       * ])
       *
       * console.log(ids) // [2, 4]
       * ```
       *
       * ## Warning for TypeScript users
       * This method may introduce partial items into the data set. Use add or updateOnly instead for better type safety.
       * @param data - Items to be updated (if the id is already present) or added (if the id is missing).
       * @param senderId - Sender id.
       * @returns updatedIds - The ids of the added (these may be newly generated if there was no id in the item from the data) or updated items.
       * @throws When the supplied data is neither an item nor an array of items.
       */},{key:"update",value:function update(t,a){var i=this||r;var o=[];var v=[];var u=[];var c=[];var l=(this||r)._idProp;var h=function addOrUpdate(r){var t=r[l];if(null!=t&&i._data.has(t)){var a=r;var h=Vy({},i._data.get(t));var p=i._updateItem(a);v.push(p);c.push(a);u.push(h)}else{var d=i._addItem(r);o.push(d)}};if(ud(t))for(var p=0,d=t.length;p<d;p++)t[p]&&"object"===_typeof(t[p])?h(t[p]):console.warn("Ignoring input item, which is not an object at index "+p);else{if(!t||"object"!==_typeof(t))throw new Error("Unknown dataType");h(t)}o.length&&this._trigger("add",{items:o},a);if(v.length){var y={items:v,oldData:u,data:c};this._trigger("update",y,a)}return rd(o).call(o,v)}
/**
       * Update existing items. When an item does not exist, an error will be thrown.
       *
       * @remarks
       * The provided properties will be deeply merged into the existing item.
       * When an item does not exist (id not present in the data set or absent), an error will be thrown and nothing will be changed.
       *
       * After the items are updated, the DataSet will trigger an event `update`.
       * When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       *
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { id: 3, text: 'item 3' },
       * ])
       *
       * // update items
       * const ids = data.update([
       *   { id: 2, text: 'item 2 (updated)' }, // works
       *   // { id: 4, text: 'item 4 (new)' }, // would throw
       *   // { text: 'item 4 (new)' }, // would also throw
       * ])
       *
       * console.log(ids) // [2]
       * ```
       * @param data - Updates (the id and optionally other props) to the items in this data set.
       * @param senderId - Sender id.
       * @returns updatedIds - The ids of the updated items.
       * @throws When the supplied data is neither an item nor an array of items, when the ids are missing.
       */},{key:"updateOnly",value:function updateOnly(t,a){var i,o=this||r;ud(t)||(t=[t]);var v=gi(i=gi(t).call(t,(function(r){var t=o._data.get(r[o._idProp]);if(null==t)throw new Error("Updating non-existent items is not allowed.");return{oldData:t,update:r}}))).call(i,(function(r){var t=r.oldData,a=r.update;var i=t[o._idProp];var v=pureDeepObjectAssign(t,a);o._data.set(i,v);return{id:i,oldData:t,updatedData:v}}));if(v.length){var u={items:gi(v).call(v,(function(r){return r.id})),oldData:gi(v).call(v,(function(r){return r.oldData})),data:gi(v).call(v,(function(r){return r.updatedData}))};this._trigger("update",u,a);return u.items}return[]}},{key:"get",value:function get(t,a){var i=void 0;var o=void 0;var v=void 0;if(isId(t)){i=t;v=a}else if(ud(t)){o=t;v=a}else v=t;var u=v&&"Object"===v.returnType?"Object":"Array";var c=v&&ii(v);var l=[];var h=void 0;var p=void 0;var d=void 0;if(null!=i){h=(this||r)._data.get(i);h&&c&&!c(h)&&(h=void 0)}else if(null!=o)for(var y=0,g=o.length;y<g;y++){h=(this||r)._data.get(o[y]);null==h||c&&!c(h)||l.push(h)}else{var m;p=_toConsumableArray(BA(m=(this||r)._data).call(m));for(var _=0,b=p.length;_<b;_++){d=p[_];h=(this||r)._data.get(d);null==h||c&&!c(h)||l.push(h)}}v&&v.order&&void 0==i&&this._sort(l,v.order);if(v&&v.fields){var w=v.fields;if(void 0!=i&&null!=h)h=this._filterFields(h,w);else for(var T=0,A=l.length;T<A;T++)l[T]=this._filterFields(l[T],w)}if("Object"==u){var O={};for(var E=0,I=l.length;E<I;E++){var S=l[E];var k=S[(this||r)._idProp];O[k]=S}return O}if(null!=i){var P;return null!==(P=h)&&void 0!==P?P:null}return l}},{key:"getIds",value:function getIds(t){var a=(this||r)._data;var i=t&&ii(t);var o=t&&t.order;var v=_toConsumableArray(BA(a).call(a));var u=[];if(i)if(o){var c=[];for(var l=0,h=v.length;l<h;l++){var p=v[l];var d=(this||r)._data.get(p);null!=d&&i(d)&&c.push(d)}this._sort(c,o);for(var y=0,g=c.length;y<g;y++)u.push(c[y][(this||r)._idProp])}else for(var m=0,_=v.length;m<_;m++){var b=v[m];var w=(this||r)._data.get(b);null!=w&&i(w)&&u.push(w[(this||r)._idProp])}else if(o){var T=[];for(var A=0,O=v.length;A<O;A++){var E=v[A];T.push(a.get(E))}this._sort(T,o);for(var I=0,S=T.length;I<S;I++)u.push(T[I][(this||r)._idProp])}else for(var k=0,P=v.length;k<P;k++){var x=v[k];var D=a.get(x);null!=D&&u.push(D[(this||r)._idProp])}return u}},{key:"getDataSet",value:function getDataSet(){return this||r}},{key:"forEach",value:function forEach(t,a){var i=a&&ii(a);var o=(this||r)._data;var v=_toConsumableArray(BA(o).call(o));if(a&&a.order){var u=this.get(a);for(var c=0,l=u.length;c<l;c++){var h=u[c];var p=h[(this||r)._idProp];t(h,p)}}else for(var d=0,y=v.length;d<y;d++){var g=v[d];var m=(this||r)._data.get(g);null==m||i&&!i(m)||t(m,g)}}},{key:"map",value:function map(t,a){var i=a&&ii(a);var o=[];var v=(this||r)._data;var u=_toConsumableArray(BA(v).call(v));for(var c=0,l=u.length;c<l;c++){var h=u[c];var p=(this||r)._data.get(h);null==p||i&&!i(p)||o.push(t(p,h))}a&&a.order&&this._sort(o,a.order);return o}
/**
       * Filter the fields of an item.
       *
       * @param item - The item whose fields should be filtered.
       * @param fields - The names of the fields that will be kept.
       * @typeParam K - Field name type.
       * @returns The item without any additional fields.
       */},{key:"_filterFields",value:function _filterFields(r,t){var a;return r?Wa(a=ud(t)?t:_d(t)).call(a,(function(t,a){t[a]=r[a];return t}),{}):r}
/**
       * Sort the provided array with items.
       *
       * @param items - Items to be sorted in place.
       * @param order - A field name or custom sort function.
       * @typeParam T - The type of the items in the items array.
       */},{key:"_sort",value:function _sort(r,t){if("string"===typeof t){var a=t;FO(r).call(r,(function(r,t){var i=r[a];var o=t[a];return i>o?1:i<o?-1:0}))}else{if("function"!==typeof t)throw new TypeError("Order must be a function or a string");FO(r).call(r,t)}}
/**
       * Remove an item or multiple items by “reference” (only the id is used) or by id.
       *
       * The method ignores removal of non-existing items, and returns an array containing the ids of the items which are actually removed from the DataSet.
       *
       * After the items are removed, the DataSet will trigger an event `remove` for the removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * ## Example
       * ```javascript
       * // create a DataSet
       * const data = new vis.DataSet([
       *   { id: 1, text: 'item 1' },
       *   { id: 2, text: 'item 2' },
       *   { id: 3, text: 'item 3' }
       * ])
       *
       * // remove items
       * const ids = data.remove([2, { id: 3 }, 4])
       *
       * console.log(ids) // [2, 3]
       * ```
       *
       * @param id - One or more items or ids of items to be removed.
       * @param senderId - Sender id.
       * @returns The ids of the removed items.
       */},{key:"remove",value:function remove(t,a){var i=[];var o=[];var v=ud(t)?t:[t];for(var u=0,c=v.length;u<c;u++){var l=this._remove(v[u]);if(l){var h=l[(this||r)._idProp];if(null!=h){i.push(h);o.push(l)}}}i.length&&this._trigger("remove",{items:i,oldData:o},a);return i}
/**
       * Remove an item by its id or reference.
       *
       * @param id - Id of an item or the item itself.
       * @returns The removed item if removed, null otherwise.
       */},{key:"_remove",value:function _remove(t){var a;isId(t)?a=t:t&&"object"===_typeof(t)&&(a=t[(this||r)._idProp]);if(null!=a&&(this||r)._data.has(a)){var i=(this||r)._data.get(a)||null;(this||r)._data.delete(a);--(this||r).length;return i}return null}
/**
       * Clear the entire data set.
       *
       * After the items are removed, the [[DataSet]] will trigger an event `remove` for all removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
       *
       * @param senderId - Sender id.
       * @returns removedIds - The ids of all removed items.
       */},{key:"clear",value:function clear(t){var a;var i=_toConsumableArray(BA(a=(this||r)._data).call(a));var o=[];for(var v=0,u=i.length;v<u;v++)o.push((this||r)._data.get(i[v]));(this||r)._data.clear();(this||r).length=0;this._trigger("remove",{items:i,oldData:o},t);return i}
/**
       * Find the item with maximum value of a specified field.
       *
       * @param field - Name of the property that should be searched for max value.
       * @returns Item containing max value, or null if no items.
       */},{key:"max",value:function max(t){var a;var max=null;var i=null;var o,v=_createForOfIteratorHelper$1(YO(a=(this||r)._data).call(a));try{for(v.s();!(o=v.n()).done;){var u=o.value;var c=u[t];if("number"===typeof c&&(null==i||c>i)){max=u;i=c}}}catch(r){v.e(r)}finally{v.f()}return max||null}
/**
       * Find the item with minimum value of a specified field.
       *
       * @param field - Name of the property that should be searched for min value.
       * @returns Item containing min value, or null if no items.
       */},{key:"min",value:function min(t){var a;var min=null;var i=null;var o,v=_createForOfIteratorHelper$1(YO(a=(this||r)._data).call(a));try{for(v.s();!(o=v.n()).done;){var u=o.value;var c=u[t];if("number"===typeof c&&(null==i||c<i)){min=u;i=c}}}catch(r){v.e(r)}finally{v.f()}return min||null}
/**
       * Find all distinct values of a specified field
       *
       * @param prop - The property name whose distinct values should be returned.
       * @returns Unordered array containing all distinct values. Items without specified property are ignored.
       */},{key:"distinct",value:function distinct(t){var a=(this||r)._data;var i=_toConsumableArray(BA(a).call(a));var o=[];var v=0;for(var u=0,c=i.length;u<c;u++){var l=i[u];var h=a.get(l);var p=h[t];var d=false;for(var y=0;y<v;y++)if(o[y]==p){d=true;break}if(!d&&void 0!==p){o[v]=p;v++}}return o}
/**
       * Add a single item. Will fail when an item with the same id already exists.
       *
       * @param item - A new item to be added.
       * @returns Added item's id. An id is generated when it is not present in the item.
       */},{key:"_addItem",value:function _addItem(t){var a=ensureFullItem(t,(this||r)._idProp);var i=a[(this||r)._idProp];if((this||r)._data.has(i))throw new Error("Cannot add item: item with id "+i+" already exists");(this||r)._data.set(i,a);++(this||r).length;return i}
/**
       * Update a single item: merge with existing item.
       * Will fail when the item has no id, or when there does not exist an item with the same id.
       *
       * @param update - The new item
       * @returns The id of the updated item.
       */},{key:"_updateItem",value:function _updateItem(t){var a=t[(this||r)._idProp];if(null==a)throw new Error("Cannot update item: item has no id (item: "+Jm(t)+")");var i=(this||r)._data.get(a);if(!i)throw new Error("Cannot update item: no item with id "+a+" found");(this||r)._data.set(a,_objectSpread(_objectSpread({},i),t));return a}},{key:"stream",value:function stream(t){if(t){var a=(this||r)._data;return new PE(_defineProperty({},UO,Xw.mark((function _callee(){var r,i,o,v;return Xw.wrap((function _callee$(u){while(1)switch(u.prev=u.next){case 0:r=_createForOfIteratorHelper$1(t);u.prev=1;r.s();case 3:if((i=r.n()).done){u.next=11;break}o=i.value;v=a.get(o);if(!(null!=v)){u.next=9;break}u.next=9;return[o,v];case 9:u.next=3;break;case 11:u.next=16;break;case 13:u.prev=13;u.t0=u.catch(1);r.e(u.t0);case 16:u.prev=16;r.f();return u.finish(16);case 19:case"end":return u.stop()}}),_callee,null,[[1,13,16,19]])}))))}var i;return new PE(_defineProperty({},UO,pa(i=nE((this||r)._data)).call(i,(this||r)._data)))}}]);return DataSet}(lE);function _createForOfIteratorHelper(r,t){var a="undefined"!==typeof Yp&&lc(r)||r["@@iterator"];if(!a){if(ud(r)||(a=_unsupportedIterableToArray(r))||t&&r&&"number"===typeof r.length){a&&(r=a);var i=0;var o=function F(){};return{s:o,n:function n(){return i>=r.length?{done:true}:{done:false,value:r[i++]}},e:function e(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var v,u=true,c=false;return{s:function s(){a=a.call(r)},n:function n(){var r=a.next();u=r.done;return r},e:function e(r){c=true;v=r},f:function f(){try{u||null==a.return||a.return()}finally{if(c)throw v}}}}function _unsupportedIterableToArray(r,t){var a;if(r){if("string"===typeof r)return _arrayLikeToArray(r,t);var i=td(a=Object.prototype.toString.call(r)).call(a,8,-1);"Object"===i&&r.constructor&&(i=r.constructor.name);return"Map"===i||"Set"===i?zu(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(r,t):void 0}}function _arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=r[a];return i}function _createSuper(t){var a=_isNativeReflectConstruct();return function _createSuperInternal(){var i,o=_getPrototypeOf(t);if(a){var v=_getPrototypeOf(this||r).constructor;i=Ew(o,arguments,v)}else i=o.apply(this||r,arguments);return _possibleConstructorReturn(this||r,i)}}function _isNativeReflectConstruct(){if("undefined"===typeof Reflect||!Ew)return false;if(Ew.sham)return false;if("function"===typeof Proxy)return true;try{Boolean.prototype.valueOf.call(Ew(Boolean,[],(function(){})));return true}catch(r){return false}}
/**
   * DataView
   *
   * A DataView offers a filtered and/or formatted view on a DataSet. One can subscribe to changes in a DataView, and easily get filtered or formatted data without having to specify filters and field types all the time.
   *
   * ## Example
   * ```javascript
   * // create a DataSet
   * var data = new vis.DataSet();
   * data.add([
   *   {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
   *   {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
   *   {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
   *   {id: 4, text: 'item 4'}
   * ]);
   *
   * // create a DataView
   * // the view will only contain items having a property group with value 1,
   * // and will only output fields id, text, and date.
   * var view = new vis.DataView(data, {
   *   filter: function (item) {
   *     return (item.group == 1);
   *   },
   *   fields: ['id', 'text', 'date']
   * });
   *
   * // subscribe to any change in the DataView
   * view.on('*', function (event, properties, senderId) {
   *   console.log('event', event, properties);
   * });
   *
   * // update an item in the data set
   * data.update({id: 2, group: 1});
   *
   * // get all ids in the view
   * var ids = view.getIds();
   * console.log('ids', ids); // will output [1, 2]
   *
   * // get all items in the view
   * var items = view.get();
   * ```
   *
   * @typeParam Item - Item type that may or may not have an id.
   * @typeParam IdProp - Name of the property that contains the id.
   */var DE=function(t){_inherits(DataView,t);var a=_createSuper(DataView);
/**
     * Create a DataView.
     *
     * @param data - The instance containing data (directly or indirectly).
     * @param options - Options to configure this data view.
     */function DataView(t,i){var o;var v;_classCallCheck(this||r,DataView);v=a.call(this||r);_defineProperty(_assertThisInitialized(v),"length",0);_defineProperty(_assertThisInitialized(v),"_listener",void 0);_defineProperty(_assertThisInitialized(v),"_data",void 0);_defineProperty(_assertThisInitialized(v),"_ids",new mE);_defineProperty(_assertThisInitialized(v),"_options",void 0);v._options=i||{};v._listener=pa(o=v._onEvent).call(o,_assertThisInitialized(v));v.setData(t);return v}
/**
     * Set a data source for the view.
     *
     * @param data - The instance containing data (directly or indirectly).
     * @remarks
     * Note that when the data view is bound to a data set it won't be garbage
     * collected unless the data set is too. Use `dataView.setData(null)` or
     * `dataView.dispose()` to enable garbage collection before you lose the last
     * reference.
     */_createClass(DataView,[{key:"idProp",get:function get(){return this.getDataSet().idProp}},{key:"setData",value:function setData(t){if((this||r)._data){(this||r)._data.off&&(this||r)._data.off("*",(this||r)._listener);var a=(this||r)._data.getIds({filter:ii((this||r)._options)});var i=(this||r)._data.get(a);(this||r)._ids.clear();(this||r).length=0;this._trigger("remove",{items:a,oldData:i})}if(null!=t){(this||r)._data=t;var o=(this||r)._data.getIds({filter:ii((this||r)._options)});for(var v=0,u=o.length;v<u;v++){var c=o[v];(this||r)._ids.add(c)}(this||r).length=o.length;this._trigger("add",{items:o})}else(this||r)._data=new xE;(this||r)._data.on&&(this||r)._data.on("*",(this||r)._listener)}},{key:"refresh",value:function refresh(){var t=(this||r)._data.getIds({filter:ii((this||r)._options)});var a=_toConsumableArray((this||r)._ids);var i={};var o=[];var v=[];var u=[];for(var c=0,l=t.length;c<l;c++){var h=t[c];i[h]=true;if(!(this||r)._ids.has(h)){o.push(h);(this||r)._ids.add(h)}}for(var p=0,d=a.length;p<d;p++){var y=a[p];var g=(this||r)._data.get(y);if(null==g)console.error("If you see this, report it please.");else if(!i[y]){v.push(y);u.push(g);(this||r)._ids.delete(y)}}(this||r).length+=o.length-v.length;o.length&&this._trigger("add",{items:o});v.length&&this._trigger("remove",{items:v,oldData:u})}},{key:"get",value:function get(t,a){if(null==(this||r)._data)return null;var i=null;var o;if(isId(t)||ud(t)){i=t;o=a}else o=t;var v=Vy({},(this||r)._options,o);var u=ii((this||r)._options);var c=o&&ii(o);u&&c&&(v.filter=function(r){return u(r)&&c(r)});return null==i?(this||r)._data.get(v):(this||r)._data.get(i,v)}},{key:"getIds",value:function getIds(t){if((this||r)._data.length){var a=ii((this||r)._options);var i=null!=t?ii(t):null;var o;o=i?a?function filter(r){return a(r)&&i(r)}:i:a;return(this||r)._data.getIds({filter:o,order:t&&t.order})}return[]}},{key:"forEach",value:function forEach(t,a){if((this||r)._data){var i;var o=ii((this||r)._options);var v=a&&ii(a);var u;u=v?o?function filter(r){return o(r)&&v(r)}:v:o;Gd(i=(this||r)._data).call(i,t,{filter:u,order:a&&a.order})}}},{key:"map",value:function map(t,a){if((this||r)._data){var i;var o=ii((this||r)._options);var v=a&&ii(a);var u;u=v?o?function filter(r){return o(r)&&v(r)}:v:o;return gi(i=(this||r)._data).call(i,t,{filter:u,order:a&&a.order})}return[]}},{key:"getDataSet",value:function getDataSet(){return(this||r)._data.getDataSet()}},{key:"stream",value:function stream(t){var a;return(this||r)._data.stream(t||_defineProperty({},UO,pa(a=BA((this||r)._ids)).call(a,(this||r)._ids)))}},{key:"dispose",value:function dispose(){var t;null!==(t=(this||r)._data)&&void 0!==t&&t.off&&(this||r)._data.off("*",(this||r)._listener);var a="This data view has already been disposed of.";var i={get:function get(){throw new Error(a)},set:function set(){throw new Error(a)},configurable:false};var o,v=_createForOfIteratorHelper(sd(DataView.prototype));try{for(v.s();!(o=v.n()).done;){var u=o.value;Qf(this||r,u,i)}}catch(r){v.e(r)}finally{v.f()}}
/**
       * Event listener. Will propagate all events from the connected data set to the subscribers of the DataView, but will filter the items and only trigger when there are changes in the filtered data set.
       *
       * @param event - The name of the event.
       * @param params - Parameters of the event.
       * @param senderId - Id supplied by the sender.
       */},{key:"_onEvent",value:function _onEvent(t,a,i){if(a&&a.items&&(this||r)._data){var o=a.items;var v=[];var u=[];var c=[];var l=[];var h=[];var p=[];switch(t){case"add":for(var d=0,y=o.length;d<y;d++){var g=o[d];var m=this.get(g);if(m){(this||r)._ids.add(g);v.push(g)}}break;case"update":for(var _=0,b=o.length;_<b;_++){var w=o[_];var T=this.get(w);if(T)if((this||r)._ids.has(w)){u.push(w);h.push(a.data[_]);l.push(a.oldData[_])}else{(this||r)._ids.add(w);v.push(w)}else if((this||r)._ids.has(w)){(this||r)._ids.delete(w);c.push(w);p.push(a.oldData[_])}}break;case"remove":for(var A=0,O=o.length;A<O;A++){var E=o[A];if((this||r)._ids.has(E)){(this||r)._ids.delete(E);c.push(E);p.push(a.oldData[A])}}break}(this||r).length+=v.length-c.length;v.length&&this._trigger("add",{items:v},i);u.length&&this._trigger("update",{items:u,oldData:l,data:h},i);c.length&&this._trigger("remove",{items:c,oldData:p},i)}}}]);return DataView}(lE);
/**
   * Check that given value is compatible with Vis Data Set interface.
   *
   * @param idProp - The expected property to contain item id.
   * @param v - The value to be tested.
   * @returns True if all expected values and methods match, false otherwise.
   */function isDataSetLike(r,t){return"object"===_typeof(t)&&null!==t&&r===t.idProp&&"function"===typeof t.add&&"function"===typeof t.clear&&"function"===typeof t.distinct&&"function"===typeof Gd(t)&&"function"===typeof t.get&&"function"===typeof t.getDataSet&&"function"===typeof t.getIds&&"number"===typeof t.length&&"function"===typeof gi(t)&&"function"===typeof t.max&&"function"===typeof t.min&&"function"===typeof t.off&&"function"===typeof t.on&&"function"===typeof t.remove&&"function"===typeof t.setOptions&&"function"===typeof t.stream&&"function"===typeof t.update&&"function"===typeof t.updateOnly}
/**
   * Check that given value is compatible with Vis Data View interface.
   *
   * @param idProp - The expected property to contain item id.
   * @param v - The value to be tested.
   * @returns True if all expected values and methods match, false otherwise.
   */function isDataViewLike(r,t){return"object"===_typeof(t)&&null!==t&&r===t.idProp&&"function"===typeof Gd(t)&&"function"===typeof t.get&&"function"===typeof t.getDataSet&&"function"===typeof t.getIds&&"number"===typeof t.length&&"function"===typeof gi(t)&&"function"===typeof t.off&&"function"===typeof t.on&&"function"===typeof t.stream&&isDataSetLike(r,t.getDataSet())}t.DELETE=rw;t.DataSet=xE;t.DataStream=PE;t.DataView=DE;t.Queue=cE;t.createNewDataPipeFrom=createNewDataPipeFrom;t.isDataSetLike=isDataSetLike;t.isDataViewLike=isDataViewLike;Object.defineProperty(t,"__esModule",{value:true})}));const a=t.wrap,i=t.isGeneratorFunction,o=t.mark,v=t.awrap,u=t.AsyncIterator,c=t.async,l=t.keys,h=t.values,p=t.DELETE,d=t.DataSet,y=t.DataStream,g=t.Queue,m=t.createNewDataPipeFrom,_=t.isDataSetLike,b=t.isDataViewLike,w=t.__esModule;const T=t.DataView;export{u as AsyncIterator,p as DELETE,d as DataSet,y as DataStream,T as DataView,g as Queue,w as __esModule,c as async,v as awrap,m as createNewDataPipeFrom,t as default,_ as isDataSetLike,b as isDataViewLike,i as isGeneratorFunction,l as keys,o as mark,h as values,a as wrap};

