(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{286:function(e,t,n){(function(t){var r=n(288),l={space:t.env.CTF_SPACE_ID,accessToken:t.env.CTF_CDA_ACCESS_TOKEN};e.exports={createClient:function(){return r.createClient(l)}}}).call(this,n(132))},292:function(e,t){},294:function(e,t,n){e.exports=n.p+"img/line1-vertical.86d9e20.svg"},307:function(e,t,n){var content=n(357);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(43).default)("14467eb8",content,!0,{sourceMap:!1})},356:function(e,t,n){"use strict";n(307)},357:function(e,t,n){var r=n(42)((function(i){return i[1]}));r.push([e.i,"article[data-v-545a1d1b]{height:80vh}",""]),r.locals={},e.exports=r},362:function(e,t,n){"use strict";n.r(t);var r=n(9),l=(n(49),n(286)),c={name:"map",asyncData:function(){return Object(r.a)(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(l.createClient)(),e.next=3,t.getEntries({content_type:"place"});case 3:return n=e.sent,console.log(n.items[0].fields.position),e.abrupt("return",{places:n.items});case 6:case"end":return e.stop()}}),e)})))()}},o=(n(356),n(17)),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("article",{staticClass:"flex flex-row"},[r("FancyLine",{staticClass:"w-8 border-b-0 bg-repeat-y h-full",staticStyle:{"background-size":"70% auto"},style:{backgroundImage:"url("+n(294)+")"}}),e._v(" "),r("client-only",[r("l-map",{attrs:{zoom:14,center:[49.1996122,16.59]}},[r("l-tile-layer",{attrs:{url:"https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"}}),e._v(" "),e._l(e.places,(function(p){return r("l-marker",{attrs:{"lat-lng":[p.fields.position.lat,p.fields.position.lon]}},[r("l-popup",[e._v(e._s(p.fields.title))])],1)}))],2)],1),e._v(" "),r("FancyLine",{staticClass:"w-8 border-b-0 bg-repeat-y h-full",staticStyle:{"background-size":"70% auto"},style:{backgroundImage:"url("+n(294)+")"}})],1)}),[],!1,null,"545a1d1b",null);t.default=component.exports;installComponents(component,{FancyLine:n(191).default})}}]);