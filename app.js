// Hard (level 2) and almost-impossible (level 3) questions + generated math.
// Row format pushed to window.DATA: [category, question, [4 options], correctIndex, level]
(function(){
const D=window.DATA,R=Math.random;
const sh=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const mk=(c,q,ans,wrong,lv)=>{const o=sh([ans,...wrong.slice(0,3)]);D.push([c,q,o,o.indexOf(ans),lv])};
const pick=(pool,a,n=3)=>sh(pool.filter(x=>x!==a)).slice(0,n);

// ---- capitals (country|capital|level) ----
const CAP="بوتان|تيمفو|2;سورينام|باراماريبو|2;غيانا|جورجتاون|2;بليز|بلموبان|2;هندوراس|تيغوسيغالبا|2;نيكاراغوا|ماناغوا|2;ليسوتو|ماسيرو|2;ملاوي|ليلونغوي|2;توغو|لومي|2;سيراليون|فريتاون|2;ليبيريا|مونروفيا|2;غامبيا|بانجول|2;تيمور الشرقية|ديلي|2;ليختنشتاين|فادوز|2;أندورا|أندورا لا فيلا|2;جزر مارشال|ماجورو|2;بوروندي|جيتيغا|3;بنين|بورتو نوفو|3;ساحل العاج|ياموسوكرو|3;سريلانكا|سري جاياواردنابورا كوتي|3;بالاو|نجيرولمود|3;ميكرونيزيا|باليكير|3;جزر سليمان|هونيارا|3;فانواتو|بورت فيلا|3;ساموا|آبيا|3;تونغا|نوكوالوفا|3;توفالو|فونافوتي|3;كاب فيردي|برايا|3";
const caps=CAP.split(";").map(x=>x.split("|"));
const capPool=caps.map(x=>x[1]),ctryPool=caps.map(x=>x[0]);
for(const [c,k,l] of caps){const lv=+l;
 mk("دول وعواصم","ما عاصمة "+c+"؟",k,pick(capPool,k),lv);
 mk("دول وعواصم",k+" هي عاصمة أي دولة؟",c,pick(ctryPool,c),lv)}

// ---- currencies (country|currency|level) ----
const CUR="جورجيا|اللاري|2;أرمينيا|الدرام|2;أذربيجان|المانات|2;كازاخستان|التينغي|2;أوزبكستان|السوم|2;لاوس|الكيب|2;ميانمار|الكيات|2;إثيوبيا|البر|2;غانا|السيدي|2;كينيا|الشلن الكيني|2;زامبيا|الكواشا|2;أنغولا|الكوانزا|2;باراغواي|الغواراني|2;بيرو|السول|2;فنزويلا|البوليفار|2;المجر|الفورنت|2;أوكرانيا|الهريفنيا|2;بلغاريا|الليف|2;رومانيا|الليو|2;منغوليا|التوغريك|3;بوتان|النغولتروم|3;بوتسوانا|البولا|3;هايتي|الغورد|3;غواتيمالا|الكيتزال|3;المالديف|الروفية|3;كوستاريكا|الكولون|3;ألبانيا|الليك|3;كمبوديا|الريال الكمبودي|3;نيكاراغوا|الكوردوبا|3;بابوا غينيا الجديدة|الكينا|3";
const curs=CUR.split(";").map(x=>x.split("|"));const curPool=curs.map(x=>x[1]);
for(const [c,k,l] of curs)mk("عملات","ما عملة "+c+"؟",k,pick(curPool,k),+l);

// ---- fixed hard rows: [category, question, correct, "w1|w2|w3", level] ----
const I="الدين الإسلامي",G="معلومات عامة";
const F=[
[I,"ما السورة التي تُلقّب بقلب القرآن؟","سورة يس","سورة الرحمن|سورة الملك|سورة الكهف",2],
[I,"من زوجة فرعون التي آمنت بالله؟","آسية بنت مزاحم","ماشطة ابنة فرعون|صفورة بنت شعيب|بلقيس",2],
[I,"ما أطول آية في القرآن الكريم؟","آية الدَّين","آية الكرسي|آية المواريث|آية النور",2],
[I,"ما السورة التي فيها سجدتان؟","سورة الحج","سورة السجدة|سورة مريم|سورة العلق",2],
[I,"ما اسم والد إبراهيم عليه السلام كما ورد في القرآن؟","آزر","تارح|ناحور|عمران",2],
[I,"كم سنة لبث أصحاب الكهف في كهفهم؟","309 سنين","300 سنة|319 سنة|290 سنة",2],
[I,"كم لبث نوح عليه السلام في قومه؟","950 سنة","1000 سنة|900 سنة|500 سنة",2],
[I,"في أي سنة هجرية توفي النبي ﷺ؟","السنة 11 هـ","السنة 10 هـ|السنة 12 هـ|السنة 13 هـ",2],
[I,"من أول سفير في الإسلام؟","مصعب بن عمير","جعفر بن أبي طالب|عثمان بن عفان|سعد بن معاذ",2],
[I,"من الصحابي الملقّب بحواريّ رسول الله ﷺ؟","الزبير بن العوام","طلحة بن عبيدالله|سعد بن أبي وقاص|أبو ذر الغفاري",2],
[I,"في أي سورة ورد اسم الصحابي زيد؟","سورة الأحزاب","سورة النور|سورة التوبة|سورة الأنفال",2],
[I,"كم عدد آيات سورة البقرة؟","286 آية","256 آية|200 آية|300 آية",2],
[I,"ما اسم خازن الجنة؟","رضوان","مالك|عتيد|منكر",2],
[I,"من النبي الذي ذُكر اسمه في القرآن أكثر من غيره؟","موسى عليه السلام","إبراهيم عليه السلام|نوح عليه السلام|عيسى عليه السلام",2],
[I,"أي غزوة تُسمّى غزوة العُسرة؟","غزوة تبوك","غزوة الخندق|غزوة حنين|غزوة مؤتة",2],
[I,"في أي معركة قُتل مسيلمة الكذاب؟","معركة اليمامة","معركة اليرموك|معركة القادسية|معركة ذات السلاسل",2],
[I,"في أي معركة استُشهد زيد بن حارثة وجعفر بن أبي طالب وعبدالله بن رواحة؟","معركة مؤتة","غزوة أُحد|غزوة حنين|معركة اليرموك",2],
[I,"من قاتل حمزة بن عبدالمطلب يوم أُحد؟","وحشي بن حرب","عكرمة بن أبي جهل|أبو سفيان بن حرب|خالد بن الوليد",2],
[I,"كم كان عدد المسلمين في غزوة بدر تقريبًا؟","313 رجلًا","1000 رجل|700 رجل|150 رجلًا",2],
[I,"من آخر الصحابة وفاةً؟","أبو الطفيل عامر بن واثلة","أنس بن مالك|عبدالله بن عمر|سهل بن سعد",3],
[I,"من الصحابي الملقّب بذي الشهادتين؟","خزيمة بن ثابت","حذيفة بن اليمان|عمار بن ياسر|أبي بن كعب",3],
[I,"من الصحابي الذي غسّلته الملائكة؟","حنظلة بن أبي عامر","مصعب بن عمير|سعد بن معاذ|عبدالله بن جحش",3],
[I,"كم مرة ذُكر اسم مريم في القرآن الكريم؟","34 مرة","25 مرة|19 مرة|40 مرة",3],
[I,"أي خليفة أمر بتدوين الحديث رسميًا؟","عمر بن عبدالعزيز","هارون الرشيد|عبدالملك بن مروان|المأمون",3],
[I,"ما السورة التي تُلقّب بسنام القرآن؟","سورة البقرة","سورة يس|سورة الفاتحة|سورة آل عمران",3],
[I,"من أول من جهر بالقرآن في مكة؟","عبدالله بن مسعود","بلال بن رباح|أبو بكر الصديق|حمزة بن عبدالمطلب",3],
[I,"كم عدد السور التي تبدأ بالحروف المقطعة؟","29 سورة","14 سورة|21 سورة|33 سورة",3],
[I,"من الصحابي الذي كان يُلقّب بصاحب سر رسول الله ﷺ؟","حذيفة بن اليمان","أبو عبيدة بن الجراح|زيد بن ثابت|معاذ بن جبل",3],
[I,"من أول مولود للمهاجرين في المدينة بعد الهجرة؟","عبدالله بن الزبير","الحسن بن علي|أسامة بن زيد|عبدالله بن عباس",3],
[G,"ما العنصر الأكثر وفرة في القشرة الأرضية؟","الأكسجين","السيليكون|الحديد|الألومنيوم",2],
[G,"ما الغاز الأكثر وفرة في الغلاف الجوي؟","النيتروجين","الأكسجين|ثاني أكسيد الكربون|الأرغون",2],
[G,"كم عدد الكروموسومات في خلية الإنسان؟","46","44|48|23",2],
[G,"ما الرمز الكيميائي للبوتاسيوم؟","K","P|Po|Pt",2],
[G,"ما الرمز الكيميائي للرصاص؟","Pb","Ld|Pl|Rb",2],
[G,"ما العنصر الذي عدده الذري 1؟","الهيدروجين","الهيليوم|الليثيوم|الكربون",2],
[G,"ما المعدن السائل في درجة حرارة الغرفة؟","الزئبق","الغاليوم|الرصاص|القصدير",2],
[G,"كم تستغرق أشعة الشمس تقريبًا لتصل إلى الأرض؟","8 دقائق","8 ثوانٍ|ساعة واحدة|يوم كامل",2],
[G,"ما أطول سلسلة جبال على اليابسة في العالم؟","جبال الأنديز","جبال الهيمالايا|جبال الروكي|جبال الألب",2],
[G,"في أي عام سقطت بغداد على يد المغول؟","1258م","1187م|1453م|1099م",2],
[G,"في أي عام سقطت غرناطة آخر معاقل المسلمين في الأندلس؟","1492م","1453م|1258م|1517م",2],
[G,"من العالم المسلم الذي يُعد مؤسس علم الاجتماع؟","ابن خلدون","ابن رشد|الفارابي|ابن بطوطة",2],
[G,"من العالم الذي وصف الدورة الدموية الصغرى؟","ابن النفيس","ابن سينا|الرازي|الزهراوي",2],
[G,"ما أكبر غدة في جسم الإنسان؟","الكبد","البنكرياس|الغدة الدرقية|الطحال",2],
[G,"كم عدد الأسنان اللبنية عند الطفل؟","20 سنًا","24 سنًا|16 سنًا|28 سنًا",2],
[G,"ما فصيلة الدم التي تُعرف بالمعطي العام؟","O سالب","AB موجب|A سالب|B موجب",2],
[G,"في أي عام تأسست الأمم المتحدة؟","1945","1919|1950|1939",2],
[G,"كم عدد الدول الأعضاء في الأمم المتحدة؟","193 دولة","180 دولة|200 دولة|150 دولة",2],
[G,"كم عدد الدول الأعضاء في جامعة الدول العربية؟","22 دولة","20 دولة|21 دولة|19 دولة",2],
[G,"ما الحيوان الذي يملك ثلاثة قلوب؟","الأخطبوط","الحبار|الدلفين|قنديل البحر",2],
[G,"من أول رائد فضاء إماراتي؟","هزاع المنصوري","سلطان النيادي|محمد الملا|نورا المطروشي",2],
[G,"ما الوحدة الأساسية لقياس كمية المادة؟","المول","الكيلوغرام|اللتر|الكلفن",2],
[G,"ما أكبر قمر في المجموعة الشمسية؟","غانيميد","تيتان|القمر|كاليستو",3],
[G,"ما الرمز الكيميائي للتنغستن؟","W","Tu|Tn|Ts",3],
[G,"ما أكبر صحراء في العالم إذا شملنا الصحاري الباردة؟","القارة القطبية الجنوبية","الصحراء الكبرى|صحراء غوبي|صحراء الربع الخالي",3],
[G,"ما الدولة التي تمتلك أكبر عدد من المناطق الزمنية؟","فرنسا","روسيا|الولايات المتحدة|الصين",3],
[G,"كم تبلغ سرعة الصوت في الهواء تقريبًا؟","343 مترًا في الثانية","1,000 متر في الثانية|150 مترًا في الثانية|3,000 متر في الثانية",3],
[G,"ما الكوكب الذي يدور حول نفسه بعكس اتجاه معظم الكواكب؟","الزهرة","المريخ|عطارد|نبتون",3],
[G,"ما أصغر دولة في أفريقيا مساحةً؟","سيشل","جزر القمر|جيبوتي|غامبيا",3],
[G,"ما أطول نهر في أوروبا؟","نهر الفولغا","نهر الدانوب|نهر الراين|نهر السين",3],
[G,"كم يبلغ ارتفاع برج خليفة تقريبًا؟","828 مترًا","632 مترًا|1,008 أمتار|741 مترًا",3],
[G,"من أول رائد فضاء عربي؟","سلطان بن سلمان","هزاع المنصوري|محمد فارس|ريانة برناوي",3],
[G,"ما أقرب نجم إلى الأرض بعد الشمس؟","بروكسيما سنتوري","الشِّعرى اليمانية|نجم سهيل|منكب الجوزاء",3],
[G,"كم عدد العظام في جمجمة الإنسان البالغ؟","22 عظمة","8 عظام|30 عظمة|14 عظمة",3],
[G,"ما أعمق بحيرة في العالم؟","بحيرة بايكال","بحيرة تنجانيقا|بحيرة سوبيريور|بحيرة فكتوريا",3]];
for(const [c,q,a,w,l] of F)mk(c,q,a,w.split("|"),l);

// ---- math (generated each load) ----
const M="رياضيات",ri=(a,b)=>a+Math.floor(R()*(b-a+1)),fmt=n=>n.toLocaleString("en-US");
function near(a){const s=new Set();const steps=a<20?[1,2,3,4,5]:a<200?[1,2,3,5,10,11]:[1,2,9,10,11,20,90,100];
 let g=0;while(s.size<3&&g++<200){const d=steps[ri(0,steps.length-1)]*(R()<.5?-1:1);const v=a+d;if(v>=0&&v!==a)s.add(v)}return[...s]}
function num(q,a,lv){mk(M,q,fmt(a),near(a).map(fmt),lv)}
for(let i=0;i<40;i++){const t=ri(0,4);
 if(t===0){const a=ri(12,89),b=ri(12,89);num(`كم يساوي ${a} + ${b}؟`,a+b,1)}
 else if(t===1){const a=ri(50,99),b=ri(11,49);num(`كم يساوي ${a} − ${b}؟`,a-b,1)}
 else if(t===2){const a=ri(3,12),b=ri(3,12);num(`كم يساوي ${a} × ${b}؟`,a*b,1)}
 else if(t===3){const b=ri(2,12),c=ri(2,12);num(`كم يساوي ${b*c} ÷ ${b}؟`,c,1)}
 else{const a=ri(4,15);num(`كم يساوي ${a}²؟`,a*a,1)}}
for(let i=0;i<40;i++){const t=ri(0,5);
 if(t===0){const a=ri(13,49),b=ri(13,49);num(`كم يساوي ${a} × ${b}؟`,a*b,2)}
 else if(t===1){const p=[5,15,20,25,30,40,75][ri(0,6)],b=ri(2,40)*20;num(`كم يساوي ${p}% من ${b}؟`,p*b/100,2)}
 else if(t===2){const a=ri(16,30);num(`ما الجذر التربيعي للعدد ${a*a}؟`,a,2)}
 else if(t===3){const a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(1,9);num(`كم يساوي ${a} + ${b} × ${c} − ${d}؟`,a+b*c-d,2)}
 else if(t===4){const n=ri(8,12);num(`كم يساوي 2 أس ${n}؟`,2**n,2)}
 else{const n=ri(5,12);num(`كم مجموع الزوايا الداخلية لمضلع عدد أضلاعه ${n}؟ (بالدرجات)`,(n-2)*180,2)}}
const PR=[[97,"91|87|51"],[89,"91|87|57"],[83,"81|87|91"],[101,"91|111|119"],[113,"119|111|117"],[127,"119|121|133"],[131,"133|129|121"],[149,"143|147|133"],[151,"153|143|161"],[173,"171|169|161"]];
for(let i=0;i<40;i++){const t=ri(0,6);
 if(t===0){const a=ri(120,899),b=ri(13,79);num(`كم يساوي ${a} × ${b}؟`,a*b,3)}
 else if(t===1){const p=[12,17,23,35,45][ri(0,4)],b=ri(11,99)*100;num(`كم يساوي ${p}% من ${fmt(b)}؟`,p*b/100,3)}
 else if(t===2){const a=ri(41,99);num(`ما الجذر التربيعي للعدد ${fmt(a*a)}؟`,a,3)}
 else if(t===3){const n=ri(40,150);num(`كم مجموع الأعداد من 1 إلى ${n}؟`,n*(n+1)/2,3)}
 else if(t===4){const a=ri(11,25);num(`ما الجذر التكعيبي للعدد ${fmt(a**3)}؟`,a,3)}
 else if(t===5){const a=ri(11,19),b=ri(11,19);num(`كم يساوي ${a}² + ${b}²؟`,a*a+b*b,3)}
 else{const [p,w]=PR[ri(0,PR.length-1)];mk(M,"أيٌّ من هذه الأعداد عدد أولي؟",String(p),w.split("|"),3)}}
mk(M,"كم يساوي 7! (مضروب 7)؟","5,040","720|40,320|4,050".split("|"),3);
mk(M,"ما قيمة النسبة الذهبية تقريبًا؟","1.618","3.141|2.718|1.414".split("|"),3);
mk(M,"ما قيمة الثابت π مقربة لأربعة أرقام عشرية؟","3.1416","3.1428|3.1415|3.1461".split("|"),3);
mk(M,"ما أصغر عدد أولي؟","2","1|3|0".split("|"),2);
})();
(function(){const s=document.createElement("style");s.textContent=".lvb{display:inline-block;font-weight:700;font-size:.9em;padding:.15rem .6rem;border-radius:999px;color:#fff;margin-inline-start:.3rem}.lv2{background:#E8710A}.lv3{background:#7B1FA2}";document.head.appendChild(s)})();
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
const LV=x=>x[4]||1,LVN=["","","صعب 🔥","شبه مستحيل 💀"],LVX=[1,1,1.5,2];
function badge(lv){return lv>1?el("span",{class:"lvb lv"+lv},LVN[lv]+" ×"+LVX[lv]):null}
function startGame(){const pool=DATA.map((x,i)=>i).filter(i=>H.cat==="الكل"||DATA[i][0]===H.cat);
 const B=[1,2,3].map(l=>shuffle(pool.filter(i=>LV(DATA[i])===l))),take=l=>B[l-1].pop()??B[2].pop()??B[1].pop()??B[0].pop();
 H.order=[];for(let b=0;b<H.n;b+=10){const blk=[];const m=Math.min(10,H.n-b);
  for(let j=0;j<m;j++){const l=j<2?3:j<5?2:1;const q=take(l);if(q!=null)blk.push(q)}H.order.push(...shuffle(blk))}
 H.order=H.order.slice(0,H.n);H.i=0;H.gid=Math.random().toString(36).slice(2,8);H.scores={};
 for(const p of players())H.scores[p.peer]={name:pname(p),s:0};goQ()}
function goQ(){const x=cur();H.ph="q";H.id=H.gid+"-"+H.i;H.start=Date.now();H.res=null;
 pushHost({ph:"q",gid:H.gid,id:H.id,qn:H.i+1,tot:H.order.length,cat:x[0],q:x[1],o:x[2],dur:H.dur,lv:LV(x)});
 clearInterval(H.tick);H.tick=setInterval(()=>{const left=H.dur-Math.floor((Date.now()-H.start)/1000);const t=$("tmr");if(t)t.textContent=Math.max(0,left);if(left<=0)reveal()},250);renderHost()}
function answers(){return players().filter(p=>p.presence.a&&p.presence.a.id===H.id)}
function reveal(){if(H.ph!=="q")return;clearInterval(H.tick);const x=cur(),c=x[3],D=H.dur*1000;const cnt=[0,0,0,0];const res={};
 for(const p of players()){const s=H.scores[p.peer]||(H.scores[p.peer]={name:pname(p),s:0});s.name=pname(p);const a=p.presence.a;let ok=0,pts=0;
  if(a&&a.id===H.id&&a.c>=0&&a.c<4){cnt[a.c]++;if(a.c===c){ok=1;const ms=Math.min(Math.max(+a.ms||0,0),D);pts=Math.round(1000*(1-ms/D/2)*LVX[LV(x)])}}
  s.s+=pts;res[p.peer]=[ok,pts]}
 const rank=Object.entries(H.scores).sort((a,b)=>b[1].s-a[1].s);rank.forEach(([k,v],i)=>{res[k]=res[k]?[...res[k],v.s,i+1]:[0,0,v.s,i+1]});
 H.ph="r";H.res={cnt,top:rank.slice(0,5).map(([k,v])=>[v.name,v.s])};
 pushHost({ph:"r",gid:H.gid,id:H.id,qn:H.i+1,tot:H.order.length,cat:x[0],q:x[1],o:x[2],c,cnt,top:H.res.top,res,lv:LV(x)});renderHost()}
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
  app.append(el("div",{class:"bar"},el("div",{class:"muted",style:"font-size:1.2rem"},`سؤال ${H.i+1} من ${H.order.length} · ${x[0]} `,badge(LV(x))),
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
  app.append(el("div",{class:"bar"},el("div",{class:"muted",style:"font-size:1.2rem"},`سؤال ${hp.qn} من ${hp.tot}`+(hp.cat?" · "+hp.cat:"")+" ",badge(+hp.lv||1)),
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
  app.append(el("div",{class:"muted"},`سؤال ${hp.qn} من ${hp.tot} `,badge(+hp.lv||1)),el("p",{class:"qtext",style:"font-size:1.2rem"},String(hp.q||"")),
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
