import{_ as m,t as k,e as h,A as c,l as w,P as g}from"./index.a4e0a7e4.js";import{C as E,c as n,a as i,o as s,b as o,d as a,F as d,D as _,s as y,x as f,e as l}from"./vendor.1a0d30b4.js";const x={name:"Account",setup(){return E(async()=>{try{await k.getAccountTickets(),await h.getAccountEvents(c.account.id)}catch(e){w.error(e),g.toast(e.message,"error")}}),{account:n(()=>c.account),myTickets:n(()=>c.myTickets),tickets:n(()=>c.tickets),towerEvents:n(()=>c.towerEvents)}}},u=e=>(y("data-v-d926bcc4"),e=e(),f(),e),T={class:"container-fluid"},A={class:"row p-3 text-light"},S=u(()=>a("h3",{class:"fw-bold"},"My Events",-1)),b={class:"row p-3 text-light"},I=u(()=>a("h3",null,"Upcoming Events",-1));function P(e,B,j,r,C,F){const p=i("TowerEvent"),v=i("Tickets");return s(),o("div",T,[a("div",A,[S,(s(!0),o(d,null,_(r.towerEvents,t=>(s(),o("div",{class:"col-12 col-md-4 col-xl-3",key:t.id},[l(p,{towerEvent:t},null,8,["towerEvent"])]))),128))]),a("div",b,[I,(s(!0),o(d,null,_(r.myTickets,t=>(s(),o("div",{class:"col-12",key:t.ticketId},[l(v,{ticket:t},null,8,["ticket"])]))),128))])])}var V=m(x,[["render",P],["__scopeId","data-v-d926bcc4"]]);export{V as default};
