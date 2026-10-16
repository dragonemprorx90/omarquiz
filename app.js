const SB_URL="https://qaocnwayovacfkdaakdd.supabase.co";
const SB_KEY="sb_publishable_Sbf9FyryOKEw-JZcCkkMRA_MbB4tgyN";
const DATA=window.DATA,SH=["▲","◆","●","■"];
const CATS=["الكل",...new Set(DATA.map(x=>x[0]))];
const $=id=>document.getElementById(id);
function el(tag,attrs,...kids){const e=document.createElement(tag);if(attrs)for(const k in attrs){if(k==="class")e.className=attrs[k];else if(k.startsWith("on"))e[k]=attrs[k];else if(attrs[k]!=null)e.setAttribute(k,attrs[k])}
 for(const k of kids.flat()){if(k==null||k===false)continue;e.append(k.nodeType?k:document.createTextNode(String(k)))}return e}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const app=$("app"),GQ=new URLSearchParams(location.search).get("g")||"";
const sb=window.supabase.createClient(SB_URL,SB_KEY);
const ME=Math.random().toString(36).slice(2)+Date.now().toString(36);
let ch=null,mine={},onSync=()=>{},trackT=null;
function connect(pin,cb){if(ch)sb.removeChannel(ch);ch=sb.channel("quiz-"+pin,{config:{presence:{key:ME}}});
 ch.on("presence",{event:"sync"},()=>onSync()).subscribe(s=>{if(s==="SUBSCRIBED"){ch.track(mine);cb&&cb(true)}else if(s==="CHANNEL_ERROR"||s==="TIMED_OUT")cb&&cb(false)})}
function presence(patch){for(const k in patch){if(patch[k]===null)delete mine[k];else mine[k]=patch[k]}
 clearTimeout(trackT);trackT=setTimeout(()=>{if(ch)ch.track(mine)},60)}
function peers(){if(!ch)return[];const st=ch.presenceState();return Object.entries(st).map(([k,arr])=>({peer:k,presence:arr[arr.length-1]||{},sameTab:k===ME}))}
function players(){return peers().filter(p=>!p.sameTab&&p.presence.role==="player"&&typeof p.presence.name==="string"&&p.presence.name.trim())}
function pname(p){return String(p.presence.name).slice(0,20)}
function hostPeer(){const hs=peers().filter(p=>!p.sameTab&&p.presence.role==="host");hs.sort((a,b)=>(b.presence.ts||0)-(a.presence.ts||0));return hs[0]||null}
function board(top){return el("div",{class:"board"},top&&top.length?top.map((t,i)=>el("div",null,el("span",null,(i+1)+". "+t[0]),el("b",null,t[1]))):el("div",{class:"muted"},"لا يوجد لاعبون"))}
function chips(list,val,on){return el("div",{class:"chips row"},list.map(v=>el("button",{"aria-pressed":String(v===val),onclick:()=>on(v)},String(v))))}
const joinUrl=pin=>location.origin+"/?g="+pin;
function qr(id,val){try{new QRious({element:$(id),value:val,size:520,level:"M"})}catch(e){}}
function pinForm(title,btn,onGo){const pin=el("input",{type:"text",inputmode:"numeric",maxlength:"6",placeholder:"رمز اللعبة",value:GQ});
 const go=()=>{const v=pin.value.trim();if(!/^\d{4,6}$/.test(v))return pin.focus();onGo(v)};
 pin.onkeydown=e=>{if(e.key==="Enter")go()};app.replaceChildren(el("div",{class:"center"},el("div",{class:"big"},title),pin,el("button",{class:"btn main",onclick:go},btn)));pin.focus()}

const H={ph:"lobby",cat:"الكل",n:10,dur:20,order:[],i:0,gid:"",id:"",scores:{},start:0,tick:null,res:null,pin:""};
function cur(){return DATA[H.order[H.i]]}
function pushHost(obj){mine={role:"host",ts:Date.now(),...obj};if(ch)ch.track(mine)}
function startGame(){const pool=DATA.map((x,i)=>i).filter(i=>H.cat==="الكل"||DATA[i][0]===H.cat);
 H.order=shuffle(pool).slice(0,H.n);H.i=0;H.gid=Math.random().toString(36).slice(2,8);H.scores={};
 for(const p of players())H.scores[p.peer]={name:pname(p),s:0};goQ()}
function goQ(){const x=cur();H.ph="q";H.id=H.gid+"-"+H.i;H.start=Date.now();H.res=null;
 pushHost({ph:"q",gid:H.gid,id:H.id,qn:H.i+1,tot:H.order.length,cat:x[0],q:x[1],o:x[2],dur:H.dur});
 clearInterval(H.tick);H.tick=setInterval(()=>{const left=H.dur-Math.floor((Date.now()-H.start)/1000);const t=$("tmr");if(t)t.textContent=Math.max(0,left);if(left<=0)reveal()},250);renderHost()}
function answers(){return players().filter(p=>p.presence.a&&p.presence.a.id===H.id)}
function reveal(){if(H.ph!=="q")return;clearInterval(H.tick);const x=cur(),c=x[3],D=H.dur*1000;const cnt=[0,0,0,0];const res={};
 for(const p of players()){const s=H.scores[p.peer]||(H.scores[p.peer]={name:pname(p),s:0});s.name=pname(p);const a=p.presence.a;let ok=0,pts=0;
  if(a&&a.id===H.id&&a.c>=0&&a.c<4){cnt[a.c]++;if(a.c===c){ok=1;const ms=Math.min(Math.max(+a.ms||0,0),D);pts=Math.round(1000*(1-ms/D/2))}}
  s.s+=pts;res[p.peer]=[ok,pts]}
 const rank=Object.entries(H.scores).sort((a,b)=>b[1].s-a[1].s);rank.forEach(([k,v],i)=>{res[k]=res[k]?[...res[k],v.s,i+1]:[0,0,v.s,i+1]});
 H.ph="r";H.res={cnt,top:rank.slice(0,5).map(([k,v])=>[v.name,v.s])};
 pushHost({ph:"r",gid:H.gid,id:H.id,qn:H.i+1,tot:H.order.length,cat:x[0],q:x[1],o:x[2],c,cnt,top:H.res.top,res});renderHost()}
function nextQ(){if(H.i+1<H.order.length){H.i++;goQ()}else endGame()}
function endGame(){clearInterval(H.tick);H.ph="end";const rank=Object.entries(H.scores).sort((a,b)=>b[1].s-a[1].s);const res={};rank.forEach(([k,v],i)=>res[k]=[0,0,v.s,i+1]);
 H.res={top:rank.slice(0,10).map(([k,v])=>[v.name,v.s])};pushHost({ph:"end",gid:H.gid,top:H.res.top,res});renderHost()}
function toLobby(){H.ph="lobby";clearInterval(H.tick);pushHost({ph:"lobby"});renderHost()}
function tvCount(){return peers().filter(p=>!p.sameTab&&p.presence.role==="tv").length}
function renderHost(){app.replaceChildren();
 if(H.ph==="lobby"){const ps=players(),tv=tvCount();
  app.append(el("div",{class:"lobby",style:"grid-template-columns:minmax(260px,380px) 1fr"},
   el("div",{class:"qrbox"},el("canvas",{id:"qr"}),el("div",{class:"short"},location.host),el("div",{style:"margin-top:.4rem"},"رمز اللعبة"),el("div",{class:"pin"},H.pin)),
   el("div",null,el("div",{class:"big"},"انضم الآن!"),el("p",{class:"qtext",style:"font-size:1.4rem;font-weight:500"},"امسح الرمز بجوالك أو افتح "+location.host+" واكتب الرمز"),
    el("div",{class:"row",style:"margin:1rem 0"},el("span",{class:"big",id:"pc"},ps.length),el("span",{class:"muted",style:"font-size:1.3rem"},"لاعب")),
    el("div",{class:"players tvp",id:"plist"},ps.map(p=>el("span",null,pname(p)))),
    el("div",{class:"label",style:"margin-top:1.2rem"},"التصنيف"),chips(CATS,H.cat,v=>{H.cat=v;renderHost()}),
    el("div",{class:"label",style:"margin-top:.8rem"},"عدد الأسئلة"),chips([10,20,30,50],H.n,v=>{H.n=v;renderHost()}),
    el("div",{class:"label",style:"margin-top:.8rem"},"الوقت لكل سؤال (ثانية)"),chips([10,20,30],H.dur,v=>{H.dur=v;renderHost()}),
    el("div",{class:"row",style:"margin-top:1.2rem"},el("button",{class:"btn main",onclick:startGame},"ابدأ اللعبة")))));
  qr("qr",joinUrl(H.pin));return}
 if(H.ph==="q"||H.ph==="r"){const x=cur(),rv=H.ph==="r";
  app.append(el("div",{class:"bar"},el("div",{class:"muted",style:"font-size:1.2rem"},`سؤال ${H.i+1} من ${H.order.length} · ${x[0]}`),
   rv?null:el("div",{class:"row"},el("span",{class:"muted",id:"ans",style:"font-size:1.2rem"},`${answers().length} / ${players().length} أجابوا`),el("span",{class:"timer",id:"tmr"},Math.max(0,H.dur-Math.floor((Date.now()-H.start)/1000))))),
   el("p",{class:"qtext tvq"},x[1]),
   el("div",{class:"opts"},x[2].map((t,i)=>{const ok=rv&&i===x[3];
    return el("div",{class:"opt tvo c"+i+(rv&&!ok?" dim":"")+(ok?" ok":"")},el("span",{class:"sh"},SH[i]),el("span",{class:"t"},t),ok?el("span",{class:"mark"},"✓"):null,rv?el("span",{class:"n"},H.res.cnt[i]):null)})),
   el("div",{class:"row"},rv?el("button",{class:"btn main",onclick:nextQ},H.i+1<H.order.length?"السؤال التالي":"النتائج النهائية"):el("button",{class:"btn main",onclick:reveal},"اكشف الإجابة"),
    el("button",{class:"btn",onclick:()=>{if(confirm("إنهاء اللعبة؟"))endGame()}},"إنهاء")),
   rv?board(H.res.top):null);return}
 app.append(el("div",{class:"center"},el("div",{class:"big"},"النتائج النهائية 🏆"),el("div",{style:"width:min(640px,100%);font-size:1.3rem"},board(H.res.top)),el("button",{class:"btn main",onclick:toLobby},"لعبة جديدة")))}
function hostSync(){if(H.ph==="lobby"){const ps=players();if($("pc")){$("pc").textContent=ps.length;$("plist").replaceChildren(...ps.map(p=>el("span",null,pname(p))))}
  if($("tvst"))$("tvst").textContent=tvCount()?"✅ التلفزيون متصل":"⏳ التلفزيون غير متصل بعد"}
 else if(H.ph==="q"){const n=answers().length,t=players().length;if($("ans"))$("ans").textContent=`${n} / ${t} أجابوا`;if(t>0&&n>=t)reveal()}}

const T={pin:"",key:"",seen:{},tick:null};
function renderTV(force){const h=hostPeer(),hp=h?h.presence:null;
 const key=!hp?"wait":hp.ph+"|"+(hp.id||"");
 if(hp&&hp.ph==="lobby"&&$("tvpc")){const ps=players();$("tvpc").textContent=ps.length;$("tvlist").replaceChildren(...ps.map(p=>el("span",null,pname(p))))}
 if(hp&&hp.ph==="q"&&$("tvans"))$("tvans").textContent=`${players().filter(p=>p.presence.a&&p.presence.a.id===hp.id).length} أجابوا`;
 if(key===T.key&&!force)return;T.key=key;clearInterval(T.tick);app.replaceChildren();
 if(!hp||hp.ph==="lobby"){const ps=players();
  app.append(el("div",{class:"lobby",style:"grid-template-columns:minmax(260px,380px) 1fr"},
   el("div",{class:"qrbox"},el("canvas",{id:"qr"}),el("div",{class:"short"},location.host),el("div",{style:"margin-top:.4rem"},"رمز اللعبة"),el("div",{class:"pin"},T.pin)),
   el("div",null,el("div",{class:"big"},"انضم الآن!"),el("p",{class:"qtext",style:"font-size:1.5rem;font-weight:500"},"امسح الرمز بجوالك أو افتح "+location.host+" واكتب الرمز"),
    el("div",{class:"row",style:"margin:1rem 0"},el("span",{class:"big",id:"tvpc"},ps.length),el("span",{class:"muted",style:"font-size:1.3rem"},"لاعب")),
    el("div",{class:"players tvp",id:"tvlist"},ps.map(p=>el("span",null,pname(p)))),
    !hp?el("p",{class:"note"},"بانتظار المقدّم…"):null)));
  qr("qr",joinUrl(T.pin));return}
 if(hp.ph==="q"||hp.ph==="r"){const rv=hp.ph==="r",o=Array.isArray(hp.o)?hp.o.slice(0,4):[];
  if(!T.seen[hp.id])T.seen[hp.id]=Date.now();const left=()=>Math.max(0,(+hp.dur||0)-Math.floor((Date.now()-T.seen[hp.id])/1000));
  app.append(el("div",{class:"bar"},el("div",{class:"muted",style:"font-size:1.2rem"},`سؤال ${hp.qn} من ${hp.tot}`+(hp.cat?" · "+hp.cat:"")),
    rv?null:el("div",{class:"row"},el("span",{class:"muted",id:"tvans",style:"font-size:1.2rem"},""),el("span",{class:"timer",id:"tvt"},left()))),
   el("p",{class:"qtext tvq"},String(hp.q||"")),
   el("div",{class:"opts"},o.map((t,i)=>{const ok=rv&&i===hp.c;return el("div",{class:"opt tvo c"+i+(rv&&!ok?" dim":"")+(ok?" ok":"")},el("span",{class:"sh"},SH[i]),el("span",{class:"t"},String(t)),ok?el("span",{class:"mark"},"✓"):null,rv&&hp.cnt?el("span",{class:"n"},hp.cnt[i]):null)})),
   rv?board(hp.top):null);
  if(!rv)T.tick=setInterval(()=>{const t=$("tvt");if(t)t.textContent=left()},250);renderTV();return}
 app.append(el("div",{class:"center"},el("div",{class:"big"},"النتائج النهائية 🏆"),el("div",{style:"width:min(640px,100%);font-size:1.3rem"},board(hp.top))))}

const P={name:"",pin:GQ,joined:false,answered:"",shown:{},key:""};
function renderPlayer(force){const h=hostPeer(),hp=h?h.presence:null;
 const key=!P.joined?"name":!hp?"wait":hp.ph+"|"+(hp.id||"")+"|"+(P.answered===hp.id);
 if(key===P.key&&!force)return;P.key=key;app.replaceChildren();
 if(!P.joined){const pin=el("input",{type:"text",inputmode:"numeric",maxlength:"6",placeholder:"رمز اللعبة",value:P.pin});
  const nm=el("input",{type:"text",maxlength:"20",placeholder:"اسمك",value:P.name});const msg=el("div",{class:"note"});
  const go=()=>{const pv=pin.value.trim(),v=nm.value.trim();if(!/^\d{4,6}$/.test(pv))return pin.focus();if(!v)return nm.focus();
   P.pin=pv;P.name=v;msg.textContent="جارٍ الاتصال…";mine={role:"player",name:v};
   connect(pv,ok=>{if(ok){P.joined=true;renderPlayer(true)}else msg.textContent="تعذّر الاتصال، حاول مرة أخرى"})};
  nm.onkeydown=pin.onkeydown=e=>{if(e.key==="Enter")go()};
  app.append(el("div",{class:"center"},el("div",{class:"big"},"انضم للمسابقة"),P.pin?null:pin,nm,el("button",{class:"btn main",onclick:go},"دخول"),msg));
  (P.pin?nm:pin).focus();return}
 if(!hp){app.append(el("div",{class:"center"},el("div",{class:"result"},"أهلًا "+P.name),el("div",{class:"muted"},"بانتظار المقدّم… تأكد من رمز اللعبة")));return}
 if(hp.ph==="lobby"){app.append(el("div",{class:"center"},el("div",{class:"result"},"أنت في اللعبة ✅"),el("div",null,P.name),el("div",{class:"muted"},"انظر إلى الشاشة وانتظر البداية")));return}
 if(hp.ph==="q"){if(!P.shown[hp.id])P.shown[hp.id]=Date.now();
  if(P.answered===hp.id){app.append(el("div",{class:"center"},el("div",{class:"result"},"تم إرسال إجابتك"),el("div",{class:"muted"},"انتظر النتيجة…")));return}
  const o=Array.isArray(hp.o)?hp.o.slice(0,4):[];
  app.append(el("div",{class:"muted"},`سؤال ${hp.qn} من ${hp.tot}`),el("p",{class:"qtext",style:"font-size:1.2rem"},String(hp.q||"")),
   el("div",{class:"pbtns"},o.map((t,i)=>el("button",{class:"opt c"+i,onclick:()=>{const ms=Date.now()-P.shown[hp.id];P.answered=hp.id;presence({a:{id:hp.id,c:i,ms}});renderPlayer(true)}},el("span",{class:"sh"},SH[i]),el("span",{class:"t"},String(t))))));return}
 const r=(hp.res&&hp.res[ME])||null;const kids=[];
 if(hp.ph==="r"){const c=hp.c,o=hp.o||[];kids.push(el("div",{class:"result"},r&&r[0]?`صح! +${r[1]}`:(P.answered===hp.id?"إجابة خاطئة":"لم تُجب")),
   el("div",{class:"opt c"+c,style:"min-height:auto"},el("span",{class:"sh"},SH[c]),el("span",{class:"t"},String(o[c]||""))))}
 else kids.push(el("div",{class:"result"},"انتهت اللعبة 🏆"));
 if(r)kids.push(el("div",{class:"big"},"#"+r[3]),el("div",{class:"muted"},`مجموع نقاطك: ${r[2]}`));
 app.append(el("div",{class:"center"},...kids))}

if(window.MODE==="host"){H.pin=String(Math.floor(1000+Math.random()*9000));mine={role:"host",ts:Date.now(),ph:"lobby"};onSync=hostSync;connect(H.pin);renderHost()}
else if(window.MODE==="tv"){const start=v=>{T.pin=v;mine={role:"tv"};onSync=()=>renderTV();connect(v,ok=>{if(ok)renderTV(true)});renderTV(true)};
 if(/^\d{4,6}$/.test(GQ))start(GQ);else pinForm("شاشة العرض","اعرض",v=>start(v))}
else{onSync=()=>renderPlayer();renderPlayer(true)}
