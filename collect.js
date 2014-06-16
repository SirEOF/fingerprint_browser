

var BrowserScanHostDetails = {};

function bscan_46f12c0e3b0afac98cf6d422_RunAgent(){
    var params = bscan_46f12c0e3b0afac98cf6d422_CollectParams();
    var sobj   = document.createElement("script");
    var surl   = "//browserscan.rapid7.com/EM-598948069/1/0/0/inspect.js?" + params
    sobj.setAttribute("type", "text/javascript");
    sobj.setAttribute("language", "javascript");
    sobj.setAttribute("src", surl);
    document.body.appendChild(sobj);
}

function bscan_46f12c0e3b0afac98cf6d422_CollectOS(){
  var operatingSystems = ["","windows","macintosh","linux"];
  BrowserScanHostDetails["os"] = operatingSystems[PluginDetect.OS];
  return("os=" + operatingSystems[PluginDetect.OS] + "&");
}

function bscan_46f12c0e3b0afac98cf6d422_CollectTID(){
  return("tid=46f12c0e3b0afac98cf6d422&");
}

function bscan_46f12c0e3b0afac98cf6d422_CollectBrowser(){
  if (PluginDetect.isChrome){
    BrowserScanHostDetails["br"] = "chrome";
    BrowserScanHostDetails["br_v"] = PluginDetect.verChrome;
    return ("br=chrome&br_v=" + PluginDetect.verChrome + "&");
  }
  else if (PluginDetect.isIE){
    BrowserScanHostDetails["br"] = "ie";
    BrowserScanHostDetails["br_v"] = PluginDetect.verIE;
    return ("br=ie&br_v=" + PluginDetect.verIE + "&");
  }
  else if (PluginDetect.isGecko){
    BrowserScanHostDetails["br"] = "firefox";
    BrowserScanHostDetails["br_v"] = PluginDetect.verGecko;
    return ("br=firefox&br_v=" + PluginDetect.verGecko + "&");
  }
  else if (PluginDetect.isSafari){
    BrowserScanHostDetails["br"] = "safari";
    BrowserScanHostDetails["br_v"] = PluginDetect.verSafari;
    return ("br=safari&br_v=" + PluginDetect.verSafari + "&");
  }
  else if (PluginDetect.isOpera){
    BrowserScanHostDetails["br"] = "opera";
    BrowserScanHostDetails["br_v"] = PluginDetect.verOpera;
    return ("br=opera&br_v=" + PluginDetect.verOpera + "&");
  }
}

function bscan_46f12c0e3b0afac98cf6d422_CollectPlugins(){
  var plugins = ["AdobeReader","DevalVR","Flash","Java","QuickTime","RealPlayer","Shockwave","SilverLight","WMP","VLC"];
  for (var i in plugins){
    if (PluginDetect.getVersion(plugins[i]) != null){
      bscan_46f12c0e3b0afac98cf6d422_CollectHostData(plugins[i],PluginDetect.getVersion(plugins[i]))
    }
  }
}

function bscan_46f12c0e3b0afac98cf6d422_CollectHostData(software,version){
  BrowserScanHostDetails[software] = version;
}

function bscan_46f12c0e3b0afac98cf6d422_CollectParams(){
      var params = "";
      var ao = ["AdobeReader","DevalVR","Flash","Java","QuickTime","RealPlayer","Shockwave","SilverLight","WMP","VLC"];
      var plugins = {
        "AdobeReader":"reader",
        "DevalVR":"dvr",
        "Flash":"flash",
        "Java":"java",
        "QuickTime":"qt",
        "RealPlayer":"rp",
        "Shockwave":"shock",
        "SilverLight":"silver",
        "WMP":"wmp",
        "VLC":"vlc"
        }

	for (var i in ao){
		if (BrowserScanHostDetails[ao[i]] != undefined){
			params += plugins[ao[i]] + "=" + BrowserScanHostDetails[ao[i]] + "&";
		}
	}
	params += bscan_46f12c0e3b0afac98cf6d422_CollectOS();
	params += bscan_46f12c0e3b0afac98cf6d422_CollectBrowser();
	params += bscan_46f12c0e3b0afac98cf6d422_CollectTID();
	return params;
}
/*
PluginDetect v0.8.1
www.pinlady.net/PluginDetect/license/
[ getVersion isMinVersion hasMimeType onWindowLoaded ]
[ AdobeReader DevalVR Flash Java(OTF) QuickTime RealPlayer Shockwave Silverlight VLC WMP ]
*/
var PluginDetect={version:"0.8.1",name:"PluginDetect",openTag:"<",isDefined:function(b){return typeof b!="undefined"
},isArray:function(b){return(/array/i).test(Object.prototype.toString.call(b))
},isFunc:function(b){return typeof b=="function"
},isString:function(b){return typeof b=="string"
},isNum:function(b){return typeof b=="number"
},isStrNum:function(b){return(typeof b=="string"&&(/\d/).test(b))
},getNumRegx:/[\d][\d\.\_,\-]*/,splitNumRegx:/[\.\_,\-]/g,getNum:function(b,c){var d=this,a=d.isStrNum(b)?(d.isDefined(c)?new RegExp(c):d.getNumRegx).exec(b):null;
return a?a[0]:null
},compareNums:function(h,f,d){var e=this,c,b,a,g=parseInt;
if(e.isStrNum(h)&&e.isStrNum(f)){if(e.isDefined(d)&&d.compareNums){return d.compareNums(h,f)
}c=h.split(e.splitNumRegx);
b=f.split(e.splitNumRegx);
for(a=0;
a<Math.min(c.length,b.length);
a++){if(g(c[a],10)>g(b[a],10)){return 1
}if(g(c[a],10)<g(b[a],10)){return -1
}}}return 0
},formatNum:function(b,c){var d=this,a,e;
if(!d.isStrNum(b)){return null
}if(!d.isNum(c)){c=4
}c--;
e=b.replace(/\s/g,"").split(d.splitNumRegx).concat(["0","0","0","0"]);
for(a=0;
a<4;
a++){if(/^(0+)(.+)$/.test(e[a])){e[a]=RegExp.$2
}if(a>c||!(/\d/).test(e[a])){e[a]="0"
}}return e.slice(0,4).join(",")
},getPROP:function(d,b,a){var c;
try{if(d){a=d[b]
}}catch(c){}return a
},findNavPlugin:function(l,e,c){var j=this,h=new RegExp(l,"i"),d=(!j.isDefined(e)||e)?/\d/:0,k=c?new RegExp(c,"i"):0,a=navigator.plugins,g="",f,b,m;
for(f=0;
f<a.length;
f++){m=a[f].description||g;
b=a[f].name||g;
if((h.test(m)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))||(h.test(b)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))){if(!k||!(k.test(m)||k.test(b))){return a[f]
}}}return null
},getMimeEnabledPlugin:function(k,m,c){var e=this,f,b=new RegExp(m,"i"),h="",g=c?new RegExp(c,"i"):0,a,l,d,j=e.isString(k)?[k]:k;
for(d=0;
d<j.length;
d++){if((f=e.hasMimeType(j[d]))&&(f=f.enabledPlugin)){l=f.description||h;
a=f.name||h;
if(b.test(l)||b.test(a)){if(!g||!(g.test(l)||g.test(a))){return f
}}}}return 0
},getVersionDelimiter:",",findPlugin:function(d){var c=this,b,d,a={status:-3,plugin:0};
if(!c.isString(d)){
return a
}if(d.length==1){c.getVersionDelimiter=d;
return a
}d=d.toLowerCase().replace(/\s/g,"");
b=c.Plugins[d];
if(!b||!b.getVersion){
return a
}a.plugin=b;
a.status=1;
return a
},getPluginFileVersion:function(f,b){var h=this,e,d,g,a,c=-1;
if(h.OS>2||!f||!f.version||!(e=h.getNum(f.version))){return b
}if(!b){return e
}e=h.formatNum(e);
b=h.formatNum(b);
d=b.split(h.splitNumRegx);
g=e.split(h.splitNumRegx);
for(a=0;
a<d.length;
a++){if(c>-1&&a>c&&d[a]!="0"){return b
}if(g[a]!=d[a]){if(c==-1){c=a
}if(d[a]!="0"){return b
}}}return e
},AXO:window.ActiveXObject,getAXO:function(a){var d=null,c,b=this;
try{d=new b.AXO(a)
}catch(c){};
return d
},INIT:function(){this.init.library(this)
},init:{$:1,hasRun:0,objProperties:function(d,e,b){var a,c={};
if(e&&b){if(e[b[0]]===1&&!d.isArray(e)&&!d.isFunc(e)&&!d.isString(e)&&!d.isNum(e)){for(a=0;
a<b.length;
a=a+2){
e[b[a]]=b[a+1];
c[b[a]]=1
}}for(a in e){if(!c[a]&&e[a]&&e[a][b[0]]===1){this.objProperties(d,e[a],b)
}}}},publicMethods:function(c,f){var g=this,b=g.$,a,d;
if(c&&f){for(a in c){try{if(b.isFunc(c[a])){f[a]=c[a](f)
}}catch(d){}}}},plugin:function(a,c){var d=this,b=d.$;
if(a){d.objProperties(b,a,["$",b,"$$",a]);
if(!b.isDefined(a.getVersionDone)){a.installed=null;
a.version=null;
a.version0=null;
a.getVersionDone=null;
a.pluginName=c
}}},detectIE:function(){var init=this,$=init.$,doc=document,e,x,userAgent=navigator.userAgent||"",progid,progid1,progid2;
$.isIE=eval("/*@cc_on!@*/!1");
$.verIE=$.isIE?((/MSIE\s*(\d+\.?\d*)/i).test(userAgent)?parseFloat(RegExp.$1,10):7):null;
$.ActiveXEnabled=!1;
$.ActiveXFilteringEnabled=!1;
if($.isIE){try{$.ActiveXFilteringEnabled=window.external.msActiveXFilteringEnabled()
}catch(e){}progid1=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","TDCCtl.TDCCtl","Shell.UIHelper","HtmlDlgSafeHelper.HtmlDlgSafeHelper","Scripting.Dictionary"];
progid2=["WMPlayer.OCX","ShockwaveFlash.ShockwaveFlash","AgControl.AgControl",];
progid=progid1.concat(progid2);
for(x=0;
x<progid.length;
x++){if($.getAXO(progid[x])){$.ActiveXEnabled=!0;
if(!$.dbug){break
}}}if($.ActiveXEnabled&&$.ActiveXFilteringEnabled){for(x=0;
x<progid2.length;
x++){if($.getAXO(progid2[x])){$.ActiveXFilteringEnabled=!1;
break
}}}}},detectNonIE:function(){var e=this,c=this.$,d=navigator,b=c.isIE?"":d.userAgent||"",f=d.vendor||"",a=d.product||"";
c.isGecko=(/Gecko/i).test(a)&&(/Gecko\s*\/\s*\d/i).test(b);
c.verGecko=c.isGecko?c.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(b)?RegExp.$1:"0.9"):null;
c.isChrome=(/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(b);
c.verChrome=c.isChrome?c.formatNum(RegExp.$2):null;
c.isSafari=!c.isChrome&&((/Apple/i).test(f)||!f)&&(/Safari\s*\/\s*(\d[\d\.]*)/i).test(b);
c.verSafari=c.isSafari&&(/Version\s*\/\s*(\d[\d\.]*)/i).test(b)?c.formatNum(RegExp.$1):null;
c.isOpera=(/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(b);
c.verOpera=c.isOpera&&((/Version\s*\/\s*(\d+\.?\d*)/i).test(b)||1)?parseFloat(RegExp.$1,10):null},detectPlatform:function(){var e=this,d=e.$,b,a=navigator.platform||"";
d.OS=100;
if(a){var c=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];
for(b=c.length-2;
b>=0;
b=b-2){if(c[b]&&new RegExp(c[b],"i").test(a)){d.OS=c[b+1];
break
}}}},library:function(c){var e=this,d=document,b,a;
c.init.objProperties(c,c,["$",c]);
for(a in c.Plugins){c.init.plugin(c.Plugins[a],a)
}e.publicMethods(c.PUBLIC,c);

c.win.init();
c.head=d.getElementsByTagName("head")[0]||d.getElementsByTagName("body")[0]||d.body||null;
e.detectPlatform();
e.detectIE();
e.detectNonIE();
c.init.hasRun=1}},handler:function(c,b,a){return function(){c(b,a)
}
},fPush:function(b,a){var c=this;
if(c.isArray(a)&&(c.isFunc(b)||(c.isArray(b)&&b.length>0&&c.isFunc(b[0])))){a.push(b)
}},callArray:function(b){var c=this,a,d;
if(c.isArray(b)){d=[].concat(b);
for(a=0;
a<d.length;
a++){c.call(d[a]);
b.splice(0,1)
}}},call:function(c){var b=this,a=b.isArray(c)?c.length:-1;
if(a>0&&b.isFunc(c[0])){
c[0](b,a>1?c[1]:0,a>2?c[2]:0,a>3?c[3]:0)
}else{if(b.isFunc(c)){
c(b)
}}},PUBLIC:{isMinVersion:function(a){return function(h,g,d,c){var e=a.findPlugin(h),f,b=-1;
if(e.status<0){return e.status
}f=e.plugin;
g=a.formatNum(a.isNum(g)?g.toString():(a.isStrNum(g)?a.getNum(g):"0"));
if(f.getVersionDone!=1){f.getVersion(g,d,c);
if(f.getVersionDone===null){f.getVersionDone=1
}}if(f.installed!==null){b=f.installed<=0.5?f.installed:(f.installed==0.7?1:(f.version===null?0:(a.compareNums(f.version,g,f)>=0?1:-0.1)))
};
return b
}
},getVersion:function(a){return function(g,d,c){var e=a.findPlugin(g),f,b;
if(e.status<0){return null
};
f=e.plugin;
if(f.getVersionDone!=1){f.getVersion(null,d,c);
if(f.getVersionDone===null){f.getVersionDone=1
}}b=(f.version||f.version0);
b=b?b.replace(a.splitNumRegx,a.getVersionDelimiter):b;
return b
}
},onWindowLoaded:function(a){return function(b){
if(a.win.loaded){
a.call(b)}else{a.fPush(b,a.win.funcs)
}}
},hasMimeType:function(a){return function(c){if(!a.isIE&&c&&navigator&&navigator.mimeTypes){var f,e,b,d=a.isArray(c)?c:(a.isString(c)?[c]:[]);
for(b=0;
b<d.length;
b++){if(a.isString(d[b])&&/[^\s]/.test(d[b])){f=navigator.mimeTypes[d[b]];
e=f?f.enabledPlugin:0;
if(e&&(e.name||e.description)){return f
}}}}return null
}
},z:0},codebase:{$:1,isDisabled:function(){var a=this,b=a.$;
return b.ActiveXEnabled&&b.isIE&&b.verIE>=7?0:1
},checkGarbage:function(d){var b=this,c=b.$,a;
if(c.isIE&&d&&c.getPROP(d.firstChild,"object")){a=c.getPROP(d.firstChild,"readyState");
if(c.isNum(a)&&a!=4){b.garbage=1;
return 1
}}return 0
},emptyGarbage:function(){var a=this,b=a.$,c;
if(b.isIE&&a.garbage){try{window.CollectGarbage()
}catch(c){}a.garbage=0}},init:function(d){if(!d.init){var b=this,c=b.$,a;
d.init=1;
d.min=0;
d.max=0;
d.hasRun=0;
d.version=null;
d.L=0;
d.altHTML="";
d.span=document.createElement("span");
d.tagA='<object width="1" height="1" style="display:none;" codebase="#version=';
d.tagB='" '+((/clsid\s*:/i).test(d.$$.classID)?'classid="':'type="')+d.$$.classID+'">'+d.ParamTags+d.altHTML+c.openTag+"/object>";
for(a=0;
a<d.Lower.length;
a++){d.Lower[a]=c.formatNum(d.Lower[a]);
d.Upper[a]=c.formatNum(d.Upper[a])}}},isActiveXObject:function(i,b){var f=this,g=f.$,a=0,h,d=i.$$,c=i.span;
if(i.min&&g.compareNums(b,i.min)<=0){return 1
}if(i.max&&g.compareNums(b,i.max)>=0){return 0
}if(d.BIfuncs&&d.BIfuncs.length){
g.callArray(d.BIfuncs)}c.innerHTML=i.tagA+b+i.tagB;
if(g.getPROP(c.firstChild,"object")){a=1
};
f.checkGarbage(c);
c.innerHTML="";
if(a){i.min=b
}else{i.max=b
}return a
},convert_:function(f,a,b,e){var d=f.convert[a],c=f.$;
return d?(c.isFunc(d)?c.formatNum(d(b.split(c.splitNumRegx),e).join(",")):b):d
},convert:function(h,c,g){var e=this,f=h.$,b,a,d;
c=f.formatNum(c);
a={v:c,x:-1};
if(c){for(b=0;
b<h.Lower.length;
b++){d=e.convert_(h,b,h.Lower[b]);
if(d&&f.compareNums(c,g?d:h.Lower[b])>=0&&(!b||f.compareNums(c,g?e.convert_(h,b,h.Upper[b]):h.Upper[b])<0)){a.v=e.convert_(h,b,c,g);
a.x=b;
break
}}}return a
},isMin:function(g,f){var d=this,e=g.$,c,b,a=0;
d.init(g);

if(!e.isStrNum(f)||d.isDisabled()){return a
};
if(!g.L){g.L={};
for(c=0;
c<g.Lower.length;
c++){if(d.isActiveXObject(g,g.Lower[c])){g.L=d.convert(g,g.Lower[c]);
break
}}}if(g.L.v){b=d.convert(g,f,1);
if(b.x>=0){a=(g.L.x==b.x?d.isActiveXObject(g,b.v):e.compareNums(f,g.L.v)<=0)?1:-1
}};

return a
},search:function(g){var k=this,h=k.$,i=g.$$,b=0,c;
k.init(g);

c=(g.hasRun||k.isDisabled())?1:0;
g.hasRun=1;
if(c){return g.version
};
var o,n,m,j=function(q,t){var r=[].concat(f),s;
r[q]=t;
s=k.isActiveXObject(g,r.join(","));
if(s){
b=1;
f[q]=t
}else{p[q]=t
}return s
},d=g.DIGITMAX,e,a,l=9999999,f=[0,0,0,0],p=[0,0,0,0];
for(o=0;
o<p.length;
o++){f[o]=g.DIGITMIN[o]||0;
e=f.join(",");
a=f.slice(0,o).concat([l,l,l,l]).slice(0,f.length).join(",");
for(m=0;
m<d.length;
m++){if(h.isArray(d[m])){d[m].push(0);
if(d[m][o]>p[o]&&h.compareNums(a,g.Lower[m])>=0&&h.compareNums(e,g.Upper[m])<0){p[o]=d[m][o]
}}}for(n=0;
n<20;
n++){if(p[o]-f[o]<=16){for(m=p[o];
m>=f[o]+(o?1:0);
m--){if(j(o,m)){break
}}break
}j(o,Math.round((p[o]+f[o])/2))
}if(!b){break
}p[o]=f[o]}if(b){g.version=k.convert(g,f.join(",")).v
};

return g.version
}},win:{$:1,loaded:false,hasRun:0,init:function(){var b=this,a=b.$;
if(!b.hasRun){b.hasRun=1;
b.addEvent("load",a.handler(b.runFuncs,a));
b.addEvent("unload",a.handler(b.cleanup,a))
}},addEvent:function(c,b){var e=this,d=e.$,a=window;
if(d.isFunc(b)){if(a.addEventListener){a.addEventListener(c,b,false)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)
}else{a["on"+c]=e.concatFn(b,a["on"+c])
}}}},concatFn:function(d,c){return function(){d();
if(typeof c=="function"){c()
}}
},funcs0:[],funcs:[],cleanup:function(b){for(var a in b){b[a]=0
}b=0
},runFuncs:function(a){a.win.loaded=true;
a.callArray(a.win.funcs0);
a.callArray(a.win.funcs);
if(a.DOM){a.DOM.onDoneEmptyDiv()
}},z:0},DOM:{$:1,isEnabled:{$:1,objectTag:function(){var a=this.$;
return a.isIE?a.ActiveXEnabled:1
},objectProperty:function(){var a=this.$;
return a.isIE&&a.verIE>=7?1:0
}},div:null,divID:"plugindetect",divWidth:50,pluginSize:1,altHTML:"&nbsp;&nbsp;&nbsp;&nbsp;",emptyNode:function(c){var b=this,d=b.$,a,f;
if(c&&c.childNodes){for(a=c.childNodes.length-1;
a>=0;
a--){
if(d.isIE){b.setStyle(c.childNodes[a],["display","none"])
}c.removeChild(c.childNodes[a])
}}},LASTfuncs:[],onDoneEmptyDiv:function(){var f=this,g=f.$,b,d,c,a,h;
if(!g.win.loaded||g.win.funcs0.length||g.win.funcs.length){return
}for(b in g.Plugins){d=g.Plugins[b];
if(d){if(d.OTF==3||(d.funcs&&d.funcs.length)){return
}}}g.callArray(f.LASTfuncs);
if(f.div&&f.div.childNodes){for(b=f.div.childNodes.length-1;
b>=0;
b--){c=f.div.childNodes[b];
f.emptyNode(c)}try{f.div.innerHTML=""
}catch(h){}}if(!f.div){a=document.getElementById(f.divID);
if(a){f.div=a
}}if(f.div&&f.div.parentNode){
try{f.div.parentNode.removeChild(f.div)
}catch(h){}f.div=null
}},width:function(){var g=this,e=g.DOM,f=e.$,d=g.span,b,c,a=-1;
b=d&&f.isNum(d.scrollWidth)?d.scrollWidth:a;
c=d&&f.isNum(d.offsetWidth)?d.offsetWidth:a;
return c>0?c:(b>0?b:Math.max(c,b))
},obj:function(b){var g=this,d=g.DOM,c=g.span,f,a=c&&c.firstChild?c.firstChild:null;
try{if(a&&b){d.div.focus()
}}catch(f){}return a
},rs:function(){var b=this,a=b.DOM.$;
return a.isIE?a.getPROP(b.obj(),"readyState"):b.undefined
},getTagStatus:function(a,m,r,p,d,g){var f=/clsid\s*\:/i,o=r&&f.test(r.outerHTML||"")?r:(p&&f.test(p.outerHTML||"")?p:0),h=r&&!f.test(r.outerHTML||"")?r:(p&&!f.test(p.outerHTML||"")?p:0),l=a&&f.test(a.outerHTML||"")?o:h;
if(!a||!a.span||!m||!m.span||!l||!l.span){return -2
}var s=this,c=s.$,q,k=a.width(),j=l.width(),n=m.width(),b=a.readyState(),t=l.readyState();
if(k<0||j<0||n<=s.pluginSize){return 0
}if(s.isEnabled.objectProperty()){var i=c.getPROP(a.obj(),"object");
if(i){return 1.5
}if(g&&!a.pi&&c.isDefined(i)&&c.isIE&&a.tagName==l.tagName&&a.time<=l.time){if(k===j&&b===0&&t!==0){a.pi=1
}}}if(j<n){return a.pi?-0.1:0
}if(k>=n){if(!a.winLoaded&&c.win.loaded){return a.pi?-0.5:-1
}if(c.isNum(d)){if(!c.isNum(a.count2)){a.count2=d
}if(d-a.count2>0){return a.pi?-0.5:-1
}}}try{if(k==s.pluginSize&&(!c.isIE||b===4)){if(!a.winLoaded&&c.win.loaded){return 1
}if(a.winLoaded&&c.isNum(d)){if(!c.isNum(a.count)){a.count=d
}if(d-a.count>=5){return 1
}}}}catch(q){}return a.pi?-0.1:0
},setStyle:function(b,h){var c=this,d=c.$,g=b.style,a,f;
if(g&&h){for(a=0;
a<h.length;
a=a+2){try{g[h[a]]=h[a+1]
}catch(f){}}}},insertDivInBody:function(a,h){var j=this,d=j.$,g,b="pd33993399",c=null,i=h?window.top.document:window.document,f=i.getElementsByTagName("body")[0]||i.body;
if(!f){try{i.write('<div id="'+b+'">.'+d.openTag+"/div>");
c=i.getElementById(b)
}catch(g){}}f=i.getElementsByTagName("body")[0]||i.body;
if(f){f.insertBefore(a,f.firstChild);
if(c){f.removeChild(c)
}}},insert:function(f,b,g,a,l,k){var q=this,i=q.$,m,n=document,s,r,p=n.createElement("span"),o,h,c=["outlineStyle","none","borderStyle","none","padding","0px","margin","0px","visibility","visible"],j="outline-style:none;border-style:none;padding:0px;margin:0px;visibility:"+(k?"hidden;":"visible;")+"display:inline;";
if(!i.isDefined(a)){a=""
}if(i.isString(f)&&(/[^\s]/).test(f)){f=f.toLowerCase().replace(/\s/g,"");
s=i.openTag+f+' width="'+q.pluginSize+'" height="'+q.pluginSize+'" ';
s+='style="'+j+'" ';
for(o=0;
o<b.length;
o=o+2){if(/[^\s]/.test(b[o+1])){s+=b[o]+'="'+b[o+1]+'" '
}}s+=">";
for(o=0;
o<g.length;
o=o+2){if(/[^\s]/.test(g[o+1])){s+=i.openTag+'param name="'+g[o]+'" value="'+g[o+1]+'" />'
}}s+=a+i.openTag+"/"+f+">"
}else{f="";
s=a
}if(!q.div){h=n.getElementById(q.divID);
if(h){q.div=h
}else{q.div=n.createElement("div");
q.div.id=q.divID
}q.setStyle(q.div,c.concat(["width",q.divWidth+"px","height",(q.pluginSize+3)+"px","fontSize",(q.pluginSize+3)+"px","lineHeight",(q.pluginSize+3)+"px","verticalAlign","baseline","display","block"]));
if(!h){q.setStyle(q.div,["position","absolute","right","0px","top","0px"]);
q.insertDivInBody(q.div)
}}r={span:null,winLoaded:i.win.loaded,tagName:f,outerHTML:s,DOM:q,time:new Date().getTime(),width:q.width,obj:q.obj,readyState:q.rs};
if(q.div&&q.div.parentNode){
q.setStyle(p,c.concat(["fontSize",(q.pluginSize+3)+"px","lineHeight",(q.pluginSize+3)+"px","verticalAlign","baseline","display","inline"]));
q.div.appendChild(p);
try{p.innerHTML=s
}catch(m){};
r.span=p;
r.winLoaded=i.win.loaded
}return r
}},file:{$:1,any:"fileStorageAny999",valid:"fileStorageValid999",save:function(d,f,c){var b=this,e=b.$,a;
if(d&&e.isDefined(c)){if(!d[b.any]){d[b.any]=[]
}if(!d[b.valid]){d[b.valid]=[]
}d[b.any].push(c);
a=b.split(f,c);
if(a){d[b.valid].push(a)
}}},getValidLength:function(a){return a&&a[this.valid]?a[this.valid].length:0
},getAnyLength:function(a){return a&&a[this.any]?a[this.any].length:0
},getValid:function(c,a){var b=this;
return c&&c[b.valid]?b.get(c[b.valid],a):null
},getAny:function(c,a){var b=this;
return c&&c[b.any]?b.get(c[b.any],a):null
},get:function(d,a){var c=d.length-1,b=this.$.isNum(a)?a:c;
return(b<0||b>c)?null:d[b]
},split:function(g,c){var b=this,e=b.$,f=null,a,d;
g=g?g.replace(".","\\."):"";
d=new RegExp("^(.*[^\\/])("+g+"\\s*)$");
if(e.isString(c)&&d.test(c)){a=(RegExp.$1).split("/");
f={name:a[a.length-1],ext:RegExp.$2,full:c};
a[a.length-1]="";
f.path=a.join("/")
}return f
},z:0},Plugins:{quicktime:{$:1,mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime"],progID:"QuickTimeCheckObject.QuickTimeCheck.1",progID0:"QuickTime.QuickTime",classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",codebase:{$:1,isMin:function(a){return this.$.codebase.isMin(this,a)
},search:function(){return this.$.codebase.search(this)
},ParamTags:'<param name="src" value="" /><param name="controller" value="false" />',DIGITMAX:[[12,11,11],[7,60],[7,11,11],0,[7,11,11]],DIGITMIN:[5,0,0,0],Upper:["999","7,60","7,50","7,6","7,5"],Lower:["7,60","7,50","7,6","7,5","0"],convert:[1,function(b,a){return a?[b[0],b[1]+b[2],b[3],"0"]:[b[0],b[1].charAt(0),b[1].charAt(1),b[2]]
},1,0,1]},setPluginStatus:function(d,a,f){var e=this,c=e.$,b=e.installed;
e.installed=a?1:(f?(f>0?0.7:-0.1):(d?0:-1));
if(a){e.version=c.formatNum(a,3)
}e.getVersionDone=e.installed==0.7||e.installed==-0.1?0:1;
c.codebase.emptyGarbage()},getVersion:function(c){var h=this,d=h.$,a=null,g=null,b,f;
if(!d.isIE){if(d.hasMimeType(h.mimeType)){g=d.OS!=3?d.findNavPlugin("QuickTime.*Plug-?in",0):null;
if(g&&g.name){a=d.getNum(g.name)
}}}else{if(d.isStrNum(c)){b=c.split(d.splitNumRegx);
if(b.length>3&&parseInt(b[3],10)>0){b[3]="9999"
}c=b.join(",")
}b=h.codebase.isMin(c);
if(b){h.setPluginStatus(0,0,b);
return
}if(!a||d.dbug){a=h.codebase.search()
}if(!a||d.dbug){
g=d.getAXO(h.progID);
b=d.getPROP(g,"QuickTimeVersion");
if(b&&b.toString){a=b.toString(16);
a=parseInt(a.charAt(0)||"0",16)+"."+parseInt(a.charAt(1)||"0",16)+"."+parseInt(a.charAt(2)||"0",16)
}}}h.setPluginStatus(g,a)
}},java:{$:1,mimeType:["application/x-java-applet","application/x-java-vm","application/x-java-bean"],mimeType_dummy:"application/dummymimejavaapplet",classID:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",classID_dummy:"clsid:8AD9C840-044E-11D1-B3E9-BA9876543210",navigator:{$:1,a:(function(){var b,a=!0;
try{a=window.navigator.javaEnabled()
}catch(b){}return a
})(),javaEnabled:function(){
return this.a
},mimeObj:0,pluginObj:0},OTF:null,getVerifyTagsDefault:function(){return[1,this.applet.isDisabled.VerifyTagsDefault_1()?0:1,1]
},getVersion:function(j,g,i){var b=this,d=b.$,e,a=b.applet,h=b.verify,k=b.navigator,f=null,l=null,c=null;
if(b.getVersionDone===null){b.OTF=0;
k.mimeObj=d.hasMimeType(b.mimeType);
if(k.mimeObj){k.pluginObj=k.mimeObj.enabledPlugin
}if(h){h.begin()
}}a.setVerifyTagsArray(i);
d.file.save(b,".jar",g);
if(b.getVersionDone===0){if(a.should_Insert_Query_Any()){e=a.insert_Query_Any(j);
b.setPluginStatus(e[0],e[1],f,j)
}return
}if((!f||d.dbug)&&b.DTK.query().version){f=b.DTK.version
}if((!f||d.dbug)&&b.navMime.query().version){f=b.navMime.version
}if((!f||d.dbug)&&b.navPlugin.query().version){f=b.navPlugin.version
}if(b.nonAppletDetectionOk(f)){c=f
}if(!c||d.dbug||a.VerifyTagsHas(2.2)||a.VerifyTagsHas(2.5)){e=b.lang.System.getProperty();
if(e[0]){f=e[0];
c=e[0];
l=e[1]
}}b.setPluginStatus(c,l,f,j);
if(a.should_Insert_Query_Any()){e=a.insert_Query_Any(j);
if(e[0]){c=e[0];
l=e[1]
}}b.setPluginStatus(c,l,f,j)
},nonAppletDetectionOk:function(b){var d=this,e=d.$,a=d.navigator,c=1;
if(!b||(!a.javaEnabled()&&!d.lang.System.getPropertyHas(b))||(!e.isIE&&!a.mimeObj&&!d.lang.System.getPropertyHas(b))||(e.isIE&&!e.ActiveXEnabled)){c=0
}else{if(e.OS>=20){}else{if(d.info&&d.info.getPlugin2Status()<0&&d.info.BrowserRequiresPlugin2()){c=0
}}}return c
},setPluginStatus:function(d,i,g,h){var b=this,e=b.$,f,c=0,a=b.applet;
g=g||b.version0;
if(b.OTF>0){d=d||b.lang.System.getProperty()[0]
}f=a.isRange(d);
if(f){if(a.setRange(f,h)==d){c=f
}d=0
}if(b.OTF<3){b.installed=c?(c>0?0.7:-0.1):(d?1:(g?-0.2:-1))
}if(b.OTF==2&&b.NOTF&&!b.applet.getResult()[0]&&!b.lang.System.getProperty()[0]){b.installed=g?-0.2:-1
}
if(g){b.version0=e.formatNum(e.getNum(g))
}if(d&&!c){b.version=e.formatNum(e.getNum(d))
}if(i&&e.isString(i)){b.vendor=i
}if(!b.vendor){b.vendor=""
}if(b.verify&&b.verify.isEnabled()){b.getVersionDone=0
}else{if(b.getVersionDone!=1){if(b.OTF<2){b.getVersionDone=0
}else{b.getVersionDone=b.applet.can_Insert_Query_Any()?0:1
}}};
e.codebase.emptyGarbage()},DTK:{$:1,hasRun:0,status:null,VERSIONS:[],version:"",HTML:null,Plugin2Status:null,classID:["clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA","clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA"],mimeType:["application/java-deployment-toolkit","application/npruntime-scriptable-plugin;DeploymentToolkit"],isDisabled:function(){var a=this,b=a.$;
if(!b.DOM.isEnabled.objectTag()||(b.isIE&&b.verIE<6)||(b.isGecko&&b.compareNums(b.verGecko,b.formatNum("1.6"))<=0)||(b.isSafari&&b.OS==1&&(!b.verSafari||b.compareNums(b.verSafari,"5,1,0,0")<0))||b.isChrome){return 1
}return 0
},query:function(){var l=this,h=l.$,f=l.$$,k,m,i,a=h.DOM.altHTML,g={},b,d=null,j=null,c=(l.hasRun||l.isDisabled());
l.hasRun=1;
if(c){return l
}l.status=0;
if(h.isIE){for(m=0;
m<l.classID.length;
m++){l.HTML=h.DOM.insert("object",["classid",l.classID[m]],[],a);
d=l.HTML.obj();
if(h.getPROP(d,"jvms")){break
}}}else{i=h.hasMimeType(l.mimeType);
if(i&&i.type){l.HTML=h.DOM.insert("object",["type",i.type],[],a);
d=l.HTML.obj()
}}if(d){
try{b=h.getPROP(d,"jvms");
if(b){j=b.getLength();
if(h.isNum(j)){l.status=j>0?1:-1;
for(m=0;
m<j;
m++){i=h.getNum(b.get(j-1-m).version);
if(i){l.VERSIONS.push(i);
g["a"+h.formatNum(i)]=1
}}}}}catch(k){}}i=0;
for(m in g){i++
}if(i&&i!==l.VERSIONS.length){
l.VERSIONS=[]
}if(l.VERSIONS.length){l.version=h.formatNum(l.VERSIONS[0])
};
return l
}},navMime:{$:1,hasRun:0,mimetype:"",version:"",length:0,mimeObj:0,pluginObj:0,isDisabled:function(){var b=this,d=b.$,c=b.$$,a=c.navigator;
if(d.isIE||!a.mimeObj||!a.pluginObj){return 1
}return 0
},query:function(){var i=this,f=i.$,a=i.$$,b=(i.hasRun||i.isDisabled());
i.hasRun=1;
if(b){return i
};
var n=/^\s*application\/x-java-applet;jpi-version\s*=\s*(\d.*)$/i,g,l,j,d="",h="a",o,m,k={},c=f.formatNum("0");
for(l=0;
l<navigator.mimeTypes.length;
l++){o=navigator.mimeTypes[l];
m=o?o.enabledPlugin:0;
g=o&&n.test(o.type||d)?f.formatNum(f.getNum(RegExp.$1)):0;
if(g&&m&&(m.description||m.name)){if(!k[h+g]){i.length++
}k[h+g]=o.type;
if(f.compareNums(g,c)>0){c=g
}}}g=k[h+c];
if(g){o=f.hasMimeType(g);
i.mimeObj=o;
i.pluginObj=o?o.enabledPlugin:0;
i.mimetype=g;
i.version=c};
return i
}},navPlugin:{$:1,hasRun:0,version:"",isDisabled:function(){var d=this,c=d.$,b=d.$$,a=b.navigator;
if(c.isIE||!a.mimeObj||!a.pluginObj){return 1
}return 0
},query:function(){var m=this,e=m.$,c=m.$$,h=c.navigator,j,l,k,g,d,a,i,f=0,b=(m.hasRun||m.isDisabled());
m.hasRun=1;
if(b){return m
};
a=h.pluginObj.name||"";
i=h.pluginObj.description||"";
if(!f||e.dbug){g=/Java.*TM.*Platform[^\d]*(\d+)(?:[\.,_](\d*))?(?:\s*[Update]+\s*(\d*))?/i;
if((g.test(a)||g.test(i))&&parseInt(RegExp.$1,10)>=5){f="1,"+RegExp.$1+","+(RegExp.$2?RegExp.$2:"0")+","+(RegExp.$3?RegExp.$3:"0")}}if(!f||e.dbug){g=/Java[^\d]*Plug-in/i;
l=g.test(i)?e.formatNum(e.getNum(i)):0;
k=g.test(a)?e.formatNum(e.getNum(a)):0;
if(l&&(e.compareNums(l,e.formatNum("1,3"))<0||e.compareNums(l,e.formatNum("2"))>=0)){l=0
}if(k&&(e.compareNums(k,e.formatNum("1,3"))<0||e.compareNums(k,e.formatNum("2"))>=0)){k=0
}d=l&&k?(e.compareNums(l,k)>0?l:k):(l||k);
if(d){f=d}}if(!f&&e.isSafari&&e.OS==2){j=e.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa",0);
if(j){l=e.getNum(j.description);
if(l){f=l
}}};
if(f){m.version=e.formatNum(f)
};
return m
}},lang:{$:1,System:{$:1,hasRun:0,result:[null,null],isDisabled:function(){var b=this,c=b.$,a=b.$$;
if(!window.java||c.isIE){return 1
}if(c.OS==2&&c.verOpera&&c.verOpera<9.2&&c.verOpera>=9){return 1
}return 0
},getPropertyHas:function(a){var b=this,d=b.$,c=b.getProperty()[0];
return(a&&c&&d.compareNums(d.formatNum(a),d.formatNum(c))===0)?1:0
},getProperty:function(){var f=this,g=f.$,d=f.$$,h,a="java_qqq990",c,i="window.java.lang.System.getProperty",b=f.hasRun||f.isDisabled();
f.hasRun=1;
if(!b){
g[a]=0;
try{c=document.createElement("script");
c.type="text/javascript";
c.appendChild(document.createTextNode("(function(){var e;try{"+g.name+"."+a+"=["+i+"('java.version')+'',"+i+"('java.vendor')+'']}catch(e){}})();"));
g.head.insertBefore(c,g.head.firstChild);
g.head.removeChild(c)
}catch(h){}if(g.isArray(g[a])){f.result=[].concat(g[a])
}}return f.result
}}},applet:{$:1,codebase:{$:1,isMin:function(a){return this.$.codebase.isMin(this,a)
},search:function(){return this.$.codebase.search(this)
},ParamTags:'<param name="code" value="A19999.class" /><param name="codebase_lookup" value="false" />',DIGITMAX:[[16,64],[6,0,512],0,[1,5,2,256],0,[1,4,1,1],[1,4,0,64],[1,3,2,32]],DIGITMIN:[1,0,0,0],Upper:["999","10","5,0,20","1,5,0,20","1,4,1,20","1,4,1,2","1,4,1","1,4"],Lower:["10","5,0,20","1,5,0,20","1,4,1,20","1,4,1,2","1,4,1","1,4","0"],convert:[function(b,a){return a?[parseInt(b[0],10)>1?"99":parseInt(b[1],10)+3+"",b[3],"0","0"]:["1",parseInt(b[0],10)-3+"","0",b[1]]
},function(b,a){return a?[b[1],b[2],b[3]+"0","0"]:["1",b[0],b[1],b[2].substring(0,b[2].length-1||1)]
},0,function(b,a){return a?[b[0],b[1],b[2],b[3]+"0"]:[b[0],b[1],b[2],b[3].substring(0,b[3].length-1||1)]
},0,1,function(b,a){return a?[b[0],b[1],b[2],b[3]+"0"]:[b[0],b[1],b[2],b[3].substring(0,b[3].length-1||1)]
},1]},results:[[null,null],[null,null],[null,null],[null,null]],getResult:function(){var b=this,d=b.results,a,c=[];
for(a=d.length-1;
a>=0;
a--){c=d[a];
if(c[0]){break
}}c=[].concat(c);
return c
},DummySpanTagHTML:0,HTML:[0,0,0,0],active:[0,0,0,0],DummyObjTagHTML:0,DummyObjTagHTML2:0,allowed:[1,1,1,1],VerifyTagsHas:function(c){var d=this,b;
for(b=0;
b<d.allowed.length;
b++){if(d.allowed[b]===c){return 1
}}return 0
},saveAsVerifyTagsArray:function(c){var b=this,d=b.$,a;
if(d.isArray(c)){for(a=1;
a<b.allowed.length;
a++){if(c.length>a-1&&d.isNum(c[a-1])){if(c[a-1]<0){c[a-1]=0
}if(c[a-1]>3){c[a-1]=3
}b.allowed[a]=c[a-1]
}}b.allowed[0]=b.allowed[3]}},setVerifyTagsArray:function(d){var b=this,c=b.$,a=b.$$;
if(a.getVersionDone===null){b.saveAsVerifyTagsArray(a.getVerifyTagsDefault())
}if(c.dbug||(a.verify&&a.verify.isEnabled())){b.saveAsVerifyTagsArray([3,3,3])
}else{if(d){b.saveAsVerifyTagsArray(d)
}}},isDisabled:{$:1,single:function(d){var a=this,c=a.$,b=a.$$;
if(d==0){return c.codebase.isDisabled()
}if((d==3&&!c.isIE)||a.all()){return 1
}if(d==1||d==3){return !c.DOM.isEnabled.objectTag()
}if(d==2){return a.AppletTag()
}},aA_:null,all:function(){var c=this,e=c.$,d=c.$$,b=d.navigator,a=0;
if(c.aA_===null){if(e.OS>=20){a=0
}else{if(e.verOpera&&e.verOpera<11&&!b.javaEnabled()&&!d.lang.System.getProperty()[0]){a=1
}else{if((e.verGecko&&e.compareNums(e.verGecko,e.formatNum("2"))<0)&&!b.mimeObj&&!d.lang.System.getProperty()[0]){a=1
}else{if(c.AppletTag()&&!e.DOM.isEnabled.objectTag()){a=1
}}}};
c.aA_=a
}return c.aA_
},AppletTag:function(){var b=this,d=b.$,c=b.$$,a=c.navigator;
return d.isIE?!a.javaEnabled():0
},VerifyTagsDefault_1:function(){var a=this.$;
if(a.OS>=20){return 1
}if((a.isIE&&(a.verIE<9||!a.ActiveXEnabled))||(a.verGecko&&a.compareNums(a.verGecko,a.formatNum("2"))<0)||(a.isSafari&&(!a.verSafari||a.compareNums(a.verSafari,a.formatNum("4"))<0))||(a.verOpera&&a.verOpera<10)){return 0
}return 1
},z:0},can_Insert_Query:function(d){var b=this,c=b.results[0][0],a=b.getResult()[0];
if(b.HTML[d]||(d==0&&c!==null&&!b.isRange(c))||(d==0&&a&&!b.isRange(a))){return 0
}return !b.isDisabled.single(d)
},can_Insert_Query_Any:function(){var b=this,a;
for(a=0;
a<b.results.length;
a++){if(b.can_Insert_Query(a)){return 1
}}return 0
},should_Insert_Query:function(e){var c=this,f=c.allowed,d=c.$,b=c.$$,a=c.getResult()[0];
a=a&&(e>0||!c.isRange(a));
if(!c.can_Insert_Query(e)||f[e]===0){return 0
}if(f[e]==3||(f[e]==2.8&&!a)||(f[e]==2.5&&!b.lang.System.getProperty()[0])||(f[e]==2.2&&!b.lang.System.getProperty()[0]&&!a)){return 1
}if(!b.nonAppletDetectionOk(b.version0)){if(f[e]==2||(f[e]==1&&!a)){return 1
}}return 0
},should_Insert_Query_Any:function(){var b=this,a;
for(a=0;
a<b.allowed.length;
a++){if(b.should_Insert_Query(a)){return 1
}}return 0
},query:function(f){var j,a=this,i=a.$,d=a.$$,k=null,l=null,b=a.results,c,h,g=a.HTML[f];
if(!g||!g.obj()||b[f][0]||d.bridgeDisabled||(i.dbug&&d.OTF<3)){return
}c=g.obj(true);
h=g.readyState();
if(!i.isIE||h===4){try{k=i.getNum(c.getVersion()+"");
l=c.getVendor()+"";
c.statusbar(i.win.loaded?" ":" ")
}catch(j){};
if(k&&i.isStrNum(k)){b[f]=[k,l];
a.active[f]=2}}},isRange:function(a){return(/^[<>]/).test(a||"")?(a.charAt(0)==">"?1:-1):0
},setRange:function(b,a){return(b?(b>0?">":"<"):"")+(this.$.isString(a)?a:"")
},insert_Query_Any:function(n){var e=this,c=e.$,k=e.$$,l=e.results,m=e.HTML,g=c.DOM.altHTML,r="A.class",o,b=c.file.getValid(k);
if(e.should_Insert_Query(0)){if(k.OTF<2){k.OTF=2
};
l[0]=[0,0];
o=n?e.codebase.isMin(n):e.codebase.search();
if(o){l[0][0]=n?e.setRange(o,n):o
}e.active[0]=o?1.5:-1
}if(!b){return e.getResult()
}var f=b.name+b.ext,q=b.path;
var i=["archive",f,"code",r],j=["mayscript","true"],p=["scriptable","true","codebase_lookup","false"].concat(j),a=k.navigator,d=!c.isIE&&a.mimeObj&&a.mimeObj.type?a.mimeObj.type:k.mimeType[0];
if(!e.DummySpanTagHTML){e.DummySpanTagHTML=c.DOM.insert("",[],[],g)
}if(e.should_Insert_Query(1)){if(k.OTF<2){k.OTF=2
};
m[1]=c.isIE?c.DOM.insert("object",["type",d],["codebase",q].concat(i).concat(p),g,k):c.DOM.insert("object",["type",d],["codebase",q].concat(i).concat(p),g,k);
l[1]=[0,0];
e.query(1)
}if(e.should_Insert_Query(2)){if(k.OTF<2){k.OTF=2
};
m[2]=c.isIE?c.DOM.insert("applet",["alt",g].concat(j).concat(i),["codebase",q].concat(p),g,k):c.DOM.insert("applet",["codebase",q,"alt",g].concat(j).concat(i),[].concat(p),g,k);
l[2]=[0,0];
e.query(2)
}if(e.should_Insert_Query(3)){if(k.OTF<2){k.OTF=2
};
m[3]=c.isIE?c.DOM.insert("object",["classid",k.classID],["codebase",q].concat(i).concat(p),g,k):c.DOM.insert();
l[3]=[0,0];
e.query(3)
}if(c.DOM.isEnabled.objectTag()){if(!e.DummyObjTagHTML&&(m[1]||m[2])){e.DummyObjTagHTML=c.DOM.insert("object",["type",k.mimeType_dummy],[],g)
}if(!e.DummyObjTagHTML2&&m[3]){e.DummyObjTagHTML2=c.DOM.insert("object",["classid",k.classID_dummy],[],g)
}}
return e.getResult()
}},zz:0},devalvr:{$:1,mimeType:"application/x-devalvrx",progID:"DevalVRXCtrl.DevalVRXCtrl.1",classID:"clsid:5D2CF9D0-113A-476B-986F-288B54571614",getVersion:function(){var h=this,a=null,f,c=h.$,d,g,b;
if(!c.isIE){f=c.findNavPlugin("DevalVR");
if(f&&f.name&&c.hasMimeType(h.mimeType)){a=f.description.split(" ")[3]
}h.installed=a?1:-1
}else{g=c.getAXO(h.progID);
if(g&&c.DOM.isEnabled.objectTag()){b=c.getPROP(c.DOM.insert("object",["classid",h.classID],["src",""],"",h).obj(),"pluginversion");
if(b&&b.toString){a="00000000"+b.toString(16);
a=a.substr(a.length-8,8);
a=parseInt(a.substr(0,2)||"0",16)+","+parseInt(a.substr(2,2)||"0",16)+","+parseInt(a.substr(4,2)||"0",16)+","+parseInt(a.substr(6,2)||"0",16)
}}h.installed=a?1:(g?0:-1)
}h.version=c.formatNum(a)
}},flash:{$:1,mimeType:"application/x-shockwave-flash",progID:"ShockwaveFlash.ShockwaveFlash",classID:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",getVersion:function(){var b=function(i){if(!i){return null
}var e=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(i);
return e?e[0].replace(/[rRdD\.]/g,",").replace(/\s/g,""):null
};
var j=this,g=j.$,k,h,l=null,c=null,a=null,f,m,d;
if(!g.isIE){m=g.hasMimeType(j.mimeType);
if(m&&g.DOM.isEnabled.objectTag()){f=g.DOM.insert("object",["type",j.mimeType],[],"",j).obj();
try{l=g.getNum(f.GetVariable("$version"))
}catch(k){}}if(!l){d=m?m.enabledPlugin:null;
if(d&&d.description){l=b(d.description)
}if(l){l=g.getPluginFileVersion(d,l)
}}}else{for(h=15;
h>2;
h--){c=g.getAXO(j.progID+"."+h);
if(c){a=h.toString();
break
}}if(!c){c=g.getAXO(j.progID)
}if(a=="6"){try{c.AllowScriptAccess="always"
}catch(k){return"6,0,21,0"
}}try{l=b(c.GetVariable("$version"))
}catch(k){}if(!l&&a){l=a
}}j.installed=l?1:-1;
j.version=g.formatNum(l);
return true
}},shockwave:{$:1,mimeType:"application/x-director",progID:"SWCtl.SWCtl",classID:"clsid:166B1BCA-3F9C-11CF-8075-444553540000",getVersion:function(){var a=null,b=null,g,f,d=this,c=d.$;
if(!c.isIE){f=c.findNavPlugin("Shockwave\\s*for\\s*Director");
if(f&&f.description&&c.hasMimeType(d.mimeType)){a=c.getNum(f.description)
}if(a){a=c.getPluginFileVersion(f,a)
}}else{try{b=c.getAXO(d.progID).ShockwaveVersion("")
}catch(g){}if(c.isString(b)&&b.length>0){a=c.getNum(b)
}else{if(c.getAXO(d.progID+".8")){a="8"
}else{if(c.getAXO(d.progID+".7")){a="7"
}else{if(c.getAXO(d.progID+".1")){a="6"
}}}}}d.installed=a?1:-1;
d.version=c.formatNum(a)
}},windowsmediaplayer:{$:1,mimeType:["application/x-mplayer2","application/asx","application/x-ms-wmp"],navPluginObj:null,progID:"WMPlayer.OCX",classID:"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",INSTALLED:{dfault:null,inputMime:{}},getVersion:function(i,g){var c=this,f=c.$,l,e=null,h=null,j=c.mimeType,k="Totem|VLC",b,d,a;
c.installed=-1;
if(f.isString(g)){g=g.replace(/\s/g,"");
if(g){j=g
}}else{g=null
}if(g){d=c.INSTALLED.inputMime[g];
if(f.isDefined(d)){c.installed=d;
return
}}else{d=c.INSTALLED.dfault;
if(d!==null){c.installed=d;
return
}}if(!f.isIE){if(f.OS<20&&f.OS>=3){c.installed=-1;
return
}a={wmp:"Windows\\s*Media\\s*Player.*Plug-?in|Flip4Mac.*Windows\\s*Media.*Plug-?in",wmpFirefox:"Windows\\s*Media\\s*Player.*Firefox.*Plug-?in",avoidPlayers:"Totem|VLC|RealPlayer"};
if(c.getVersionDone===null){c.getVersionDone=0;
e=f.getMimeEnabledPlugin(c.mimeType,a.wmp,a.avoidPlayers);
if(!g){l=e
}if(!e&&f.hasMimeType(c.mimeType)){e=f.findNavPlugin(a.wmp,0,a.avoidPlayers)
}if(e){c.navPluginObj=e;
b=(f.isGecko&&f.compareNums(f.verGecko,f.formatNum("1.8"))<0);
b=b||(f.isOpera&&f.verOpera<10);
b=b||f.isChrome;
if(f.DOM.isEnabled.objectTag()&&!b&&f.getMimeEnabledPlugin(c.mimeType[2],a.wmpFirefox,a.avoidPlayers)){h=f.getPROP(f.DOM.insert("object",["type",c.mimeType[2],"data",""],["src",""],"",c).obj(),"versionInfo")||h
}}}else{h=c.version
}if(!f.isDefined(l)){l=f.getMimeEnabledPlugin(j,a.wmp,a.avoidPlayers)
}c.installed=l&&h?1:(l?0:(c.navPluginObj?-0.2:-1))
}else{e=f.getAXO(c.progID);
h=f.getPROP(e,"versionInfo")||h;
c.installed=e&&h?1:(e?0:-1)
}if(!c.version){c.version=f.formatNum(h)
}if(g){c.INSTALLED.inputMime[g]=c.installed
}else{c.INSTALLED.dfault=c.installed
}}},silverlight:{$:1,mimeType:"application/x-silverlight",progID:"AgControl.AgControl",digits:[20,20,9,12,31],getVersion:function(){var e=this,c=e.$,k=document,i=null,b=null,f=null,h=true,a=[1,0,1,1,1],r=[1,0,1,1,1],j=function(d){return(d<10?"0":"")+d.toString()
},n=function(s,d,u,v,t){return(s+"."+d+"."+u+j(v)+j(t)+".0")
},o=function(s,d,t){return q(s,(d==0?t:r[0]),(d==1?t:r[1]),(d==2?t:r[2]),(d==3?t:r[3]),(d==4?t:r[4]))
},q=function(v,t,s,x,w,u){var u;
try{return v.IsVersionSupported(n(t,s,x,w,u))
}catch(u){}return false
};
if(!c.isIE){var g;
if(c.hasMimeType(e.mimeType)){g=c.isGecko&&c.compareNums(c.verGecko,c.formatNum("1.6"))<=0;
if(c.isGecko&&g){h=false
}f=c.findNavPlugin("Silverlight.*Plug-?in",0);
if(f&&f.description){i=c.formatNum(f.description)
}if(i){r=i.split(c.splitNumRegx);
if(parseInt(r[2],10)>=30226&&parseInt(r[0],10)<2){r[0]="2"
}i=r.join(",")
}}e.installed=f&&h&&i?1:(f&&h?0:(f?-0.2:-1))
}else{b=c.getAXO(e.progID);
var m,l,p;
if(b&&q(b,a[0],a[1],a[2],a[3],a[4])){for(m=0;
m<e.digits.length;
m++){p=r[m];
for(l=p+(m==0?0:1);
l<=e.digits[m];
l++){if(o(b,m,l)){h=true;
r[m]=l
}else{break
}}if(!h){break
}}if(h){i=n(r[0],r[1],r[2],r[3],r[4])
}}e.installed=b&&h&&i?1:(b&&h?0:(b?-0.2:-1))
}e.version=c.formatNum(i)
}},vlc:{$:1,mimeType:"application/x-vlc-plugin",progID:"VideoLAN.VLCPlugin",classID:"clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921",compareNums:function(e,d){var c=this.$,k=e.split(c.splitNumRegx),i=d.split(c.splitNumRegx),h,b,a,g,f,j;
for(h=0;
h<Math.min(k.length,i.length);
h++){j=/([\d]+)([a-z]?)/.test(k[h]);
b=parseInt(RegExp.$1,10);
g=(h==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;
j=/([\d]+)([a-z]?)/.test(i[h]);
a=parseInt(RegExp.$1,10);
f=(h==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;
if(b!=a){return(b>a?1:-1)
}if(h==2&&g!=f){return(g>f?1:-1)
}}return 0
},getVersion:function(){var c=this,b=c.$,d,a=null;
if(!b.isIE){if(b.hasMimeType(c.mimeType)){d=b.findNavPlugin("VLC.*Plug-?in",0,"Totem");
if(d&&d.description){a=b.getNum(d.description,"[\\d][\\d\\.]*[a-z]*")
}}c.installed=a?1:-1
}else{d=b.getAXO(c.progID);
if(d){a=b.getNum(b.getPROP(d,"VersionInfo"),"[\\d][\\d\\.]*[a-z]*")
}c.installed=a?1:(d?0:-1)
}c.version=b.formatNum(a)
}},adobereader:{$:1,setPluginStatus:function(){var d=this,b=d.$,a=d.navPlugin.detected,e=d.navPlugin.version,g=d.axo.detected,c=d.axo.version,i=d.doc.detected,h=d.doc.version,f=e||c||h||null;
d.installed=f?1:(a>0||g>0||i>0?0:(i==-0.5?-0.15:(b.isIE&&(!b.ActiveXEnabled||b.ActiveXFilteringEnabled)?-1.5:-1)));
d.version=b.formatNum(f)},getVersion:function(c,e){var a=this,d=a.$,b=0;
if((!b||d.dbug)&&a.navPlugin.query().detected>0){b=1
}if((!b||d.dbug)&&a.axo.query().detected>0){b=1
}if((!b||d.dbug)&&(a.doc.query().detected>0||a.doc.detected==-0.5)){b=1
}a.setPluginStatus()
},navPlugin:{$:1,detected:0,version:null,mimeType:"application/pdf",isDisabled:function(){var c=this,b=c.$,a=c.$$;
return b.isIE||c.detected||!b.hasMimeType(c.mimeType)?1:0
},attempt3:function(){var c=this,b=c.$,a=null;
if(b.OS==1){if(b.hasMimeType("application/vnd.adobe.pdfxml")){a="9"
}else{if(b.hasMimeType("application/vnd.adobe.x-mars")){a="8"
}else{if(b.hasMimeType("application/vnd.adobe.xfdf")){a="6"
}}}}return a
},query:function(){var d=this,c=d.$,a=d.$$,f,e,b=null;
if(d.isDisabled()){return d
};
f="Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in";
e=c.findNavPlugin(f,0);
d.detected=e?1:-1;
if(e){b=c.getNum(e.description)||c.getNum(e.name);
b=c.getPluginFileVersion(e,b);
if(!b){b=d.attempt3()
}}if(b){d.version=b
};
return d
}},pluginQuery:function(j){var f=this,d=f.$,b="",h=null,g,a,i,c;
try{if(j){b=j.GetVersions()}}catch(g){}if(b&&d.isString(b)){a=/=\s*([\d\.]+)/g;
for(i=0;
i<30;
i++){if(a.test(b)){c=d.formatNum(RegExp.$1);
if(!h||d.compareNums(c>h)>0){h=c
}}else{break
}}}return h
},axo:{$:1,detected:0,version:null,progID:["AcroPDF.PDF","AcroPDF.PDF.1","PDF.PdfCtrl","PDF.PdfCtrl.5","PDF.PdfCtrl.1"],isDisabled:function(){var b=this,c=b.$,a=b.$$;
return c.isIE&&!b.detected?0:1
},query:function(){var d=this,e=d.$,b=d.$$,f=0,c=null,a;
if(d.isDisabled()){return d
};
for(a=0;
a<d.progID.length;
a++){f=e.getAXO(d.progID[a]);
if(f){d.detected=1;
c=b.pluginQuery(f);
if(!e.dbug&&c){break
}}}d.version=c?c:null;
if(d.detected===0){d.detected=-1
};
return d
}},doc:{$:1,detected:0,version:null,classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",classID_dummy:"clsid:CA8A9780-280D-11CF-A24D-BA9876543210",DummySpanTagHTML:0,HTML:0,DummyObjTagHTML1:0,DummyObjTagHTML2:0,isDisabled:function(){var c=this,b=c.$,a=0;
if(c.detected){a=1
}else{if(b.dbug){}else{if(!b.isIE||!b.DOM.isEnabled.objectTag()){a=1
}}}return a
},query:function(){var i=this,d=i.$,f=i.$$,h=null,a=d.DOM.altHTML,g=null,c=1,e=1,b;
if(i.isDisabled()){return i
};
if(!i.DummySpanTagHTML){i.DummySpanTagHTML=d.DOM.insert("",[],[],a,f,e)
}if(!i.HTML){i.HTML=d.DOM.insert("object",["classid",i.classID],[],a,f,e)
}if(!i.DummyObjTagHTML2){i.DummyObjTagHTML2=d.DOM.insert("object",["classid",i.classID_dummy],[],a,f,e)
}b=d.DOM.getTagStatus(i.HTML,i.DummySpanTagHTML,i.DummyObjTagHTML1,i.DummyObjTagHTML2,g,c);
h=f.pluginQuery(i.HTML.obj());
i.detected=b>0||h?1:(b==-0.1||b==-0.5?-0.5:-1);
i.version=h?h:null;
return i
}}},realplayer:{$:1,mimeType:["audio/x-pn-realaudio-plugin"],progID:["rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","RealPlayer"],classID:"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA",INSTALLED:{},q1:[[11,0,0],[999],[663],[663],[663],[660],[468],[468],[468],[468],[468],[468],[431],[431],[431],[372],[180],[180],[172],[172],[167],[114],[0]],q3:[[6,0],[12,99],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,46],[12,46],[12,46],[11,3006],[11,2806],[11,2806],[11,2804],[11,2804],[11,2799],[11,2749],[11,2700]],compare:function(g,f){var e,d=g.length,i=f.length,c,h;
for(e=0;
e<Math.max(d,i);
e++){c=e<d?g[e]:0;
h=e<i?f[e]:0;
if(c>h){return 1
}if(c<h){return -1
}}return 0
},convertNum:function(a,f,e){var g=this,c=g.$,d,b,h,i=null;
if(!a||!(d=c.formatNum(a))){return i
}d=d.split(c.splitNumRegx);
for(h=0;
h<d.length;
h++){d[h]=parseInt(d[h],10)
}if(g.compare(d.slice(0,Math.min(f[0].length,d.length)),f[0])!=0){return i
}b=d.length>f[0].length?d.slice(f[0].length):[];
if(g.compare(b,f[1])>0||g.compare(b,f[f.length-1])<0){return i
}for(h=f.length-1;
h>=1;
h--){if(h==1){break
}if(g.compare(f[h],b)==0&&g.compare(f[h],f[h-1])==0){break
}if(g.compare(b,f[h])>=0&&g.compare(b,f[h-1])<0){break
}}return e[0].join(".")+"."+e[h].join(".")
},getVersion:function(m,n){var j=this,k=null,c=0,g=0,d=j.$,q,i,s,a=j.mimeType[0];
if(d.isString(n)){n=n.replace(/\s/g,"");
if(n){a=n
}}else{n=null
}if(d.isDefined(j.INSTALLED[a])){j.installed=j.INSTALLED[a];
return
}if(!d.isIE){var l="RealPlayer.*Plug-?in",h=d.hasMimeType(j.mimeType),o=d.findNavPlugin(l,0);
if(h&&o){c=1;
if(n){if(d.getMimeEnabledPlugin(n,l)){g=1
}else{g=0
}}else{g=1
}}if(j.getVersionDone!==0){j.getVersionDone=0;
if(h){var p=1,b=null,r=null;
s=d.hasMimeType("application/vnd.rn-realplayer-javascript");
if(s){b=d.formatNum(d.getNum(s.enabledPlugin.description))
}if(d.OS==1&&b){var f=b.split(d.splitNumRegx);
r=true;
if(j.compare(f,[6,0,12,200])<0){r=false
}else{if(j.compare(f,[6,0,12,1739])<=0&&j.compare(f,[6,0,12,857])>=0){r=false
}}}if(r===false){p=0
}if(d.OS<=2){if(d.isGecko&&d.compareNums(d.verGecko,d.formatNum("1,8"))<0){p=0
}if(d.isChrome){p=0
}if(d.isOpera&&d.verOpera<10){p=0
}}else{p=0
}if(p&&d.DOM.isEnabled.objectTag()){s=d.DOM.insert("object",["type",j.mimeType[0]],["src","","autostart","false","imagestatus","false","controls","stopbutton"],"",j).obj();
try{k=d.getNum(s.GetVersionInfo())
}catch(q){}d.DOM.setStyle(s,["display","none"])
}if(!k&&b&&r===false){s=j.convertNum(b,j.q3,j.q1);
k=s?s:b
}}}else{k=j.version
}j.installed=c&&g&&k?1:(c&&g?0:(c?-0.2:-1))
}else{s=null;
for(i=0;
i<j.progID.length;
i++){s=d.getAXO(j.progID[i]);
if(s){try{k=d.getNum(s.GetVersionInfo());
break
}catch(q){}}}j.installed=k?1:-1
}if(!j.version){j.version=d.formatNum(k)
}j.INSTALLED[a]=j.installed
}},zz:0}};
PluginDetect.INIT();


bscan_46f12c0e3b0afac98cf6d422_CollectPlugins();
bscan_46f12c0e3b0afac98cf6d422_RunAgent();

