import{E as _,C as p,c as m,a as r,o as t,b as s,d as a,e as d,F as u,D as h,G as w}from"./vendor.1a0d30b4.js";import{_ as b,A as n,e as f,l as g,P as E}from"./index.1eead204.js";const x={name:"Home",setup(){const o=_();return p(async()=>{try{n.activeEvent={},await f.getAllEvents(o.params.query)}catch(e){g.error(e),E.toast(e.message,"error")}}),{towerEvents:m(()=>n.towerEvents)}}},y={class:"container-fluid"},F=w('<div class="row p-3" data-v-b9c99cde><div class="col-12 bg-img text-light rounded shadow border border-primary" data-v-b9c99cde><div class="row h-100 ps-3" data-v-b9c99cde><div class="col-12 h-100 d-flex flex-column justify-content-center align-items-stretch" data-v-b9c99cde><h3 class="m-2" data-v-b9c99cde>Get ahead of the scalpers.</h3><h3 class="m-2" data-v-b9c99cde>Reserve your seats now with</h3><h3 class="m-2" data-v-b9c99cde>real events with real people.</h3></div></div></div></div>',1),P={class:"row p-3"},j={class:"col-12"},k={class:"row p-3"};function A(o,e,B,l,H,N){const i=r("Filter"),v=r("TowerEvent");return t(),s("div",y,[F,a("div",P,[a("div",j,[d(i)])]),a("div",k,[(t(!0),s(u,null,h(l.towerEvents,c=>(t(),s("div",{class:"col-12 col-md-4 col-xl-3",key:c.id},[d(v,{towerEvent:c},null,8,["towerEvent"])]))),128))])])}var $=b(x,[["render",A],["__scopeId","data-v-b9c99cde"]]);export{$ as default};