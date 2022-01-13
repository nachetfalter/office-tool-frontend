(this["webpackJsonpoffice-tool-frontend"]=this["webpackJsonpoffice-tool-frontend"]||[]).push([[0],{118:function(e,t,n){"use strict";(function(e){var a=n(54),c=n.n(a),i=n(76),r=n(13),o=n(0),l=n(131),s=n(132),d=n(130),j=n(93),u=n(128),b=n(126),p=n(127),O=n(77),f=n.n(O),h=n(45),m=n(119),x=n(2),g=[{text:"No Page Split",value:"no-split"},{text:"Page Split (Horizontal)",value:"horizontal"},{text:"Page Split (Vertical)",value:"vertical"}];t.a=function(){var t=Object(o.useState)("Page"),n=Object(r.a)(t,2),a=n[0],O=n[1],v=Object(o.useState)("no-split"),w=Object(r.a)(v,2),k=w[0],y=w[1],P=Object(o.useState)(null),F=Object(r.a)(P,2),S=F[0],C=F[1],D=Object(o.useState)("Upload File"),T=Object(r.a)(D,2),H=T[0],I=T[1],U=Object(o.useState)("initial"),z=Object(r.a)(U,2),L=z[0],R=z[1],B=Object(o.useState)(!1),N=Object(r.a)(B,2),E=N[0],A=N[1],J=function(){var t=Object(i.a)(c.a.mark((function t(n){var i,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),R("processing"),(i=new FormData).append("file",S,H),i.append("pageName",a),i.append("pageOptions",JSON.stringify({split:k})),r={headers:{"content-type":"multipart/form-data",accept:"application/octet-stream"}},f.a.post("".concat("https://nwiufil3v4.execute-api.ap-southeast-2.amazonaws.com/dev","/pdf/split"),i,r).then((function(t){var n=e.from(t.data,"base64"),a=window.URL.createObjectURL(new Blob([n])),c=document.createElement("a");c.href=a,c.target="_blank",c.rel="noopener noreferrer",c.setAttribute("download",H.replace(".pdf",".zip")),document.body.appendChild(c),c.click(),C(null),I("Upload File"),A(!0)})).catch((function(e){console.log(e)})).finally((function(){R("initial")}));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(x.jsxs)("form",{onSubmit:J,children:[Object(x.jsxs)(h.a,{children:[Object(x.jsx)(h.d,{variant:"h3",children:"PDF Split Tool"}),Object(x.jsx)(h.b,{children:Object(x.jsx)(l.a,{label:"Output Page Name",value:a,onChange:function(e){O(e.target.value)},disabled:"processing"===L})}),Object(x.jsx)(h.b,{children:Object(x.jsx)(m.a,{title:"Page Options",selectHandler:function(e){y(e.target.value)},selectedValue:k,options:g,disabled:"processing"===L})}),Object(x.jsx)("label",{htmlFor:"pdf-upload",children:Object(x.jsxs)(h.b,{children:[Object(x.jsx)(h.c,{accept:".pdf",type:"file",id:"pdf-upload","data-testid":"pdf-upload",onChange:function(e){var t=e.currentTarget.files;t&&t.length&&(I(t[0].name),C(t[0]))},onClick:function(e){e.target.value=""}}),Object(x.jsx)(s.a,{variant:"outlined",component:"span",endIcon:Object(x.jsx)(b.a,{}),disabled:"processing"===L,children:H})]})}),Object(x.jsx)(h.b,{children:Object(x.jsx)(u.a,{loading:"processing"===L,variant:"contained",endIcon:Object(x.jsx)(p.a,{}),disabled:!(a&&k&&S),type:"submit",children:"Submit"})})]}),Object(x.jsx)(d.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:E,autoHideDuration:2e3,onClose:function(e,t){"timeout"===t&&A(!1)},children:Object(x.jsx)(j.a,{severity:"success",sx:{width:"100%"},children:"Process Finished"})})]})}}).call(this,n(100).Buffer)},119:function(e,t,n){"use strict";var a=n(189),c=n(187),i=n(188),r=n(2);t.a=function(e){var t=e.title,n=e.selectHandler,o=e.selectedValue,l=e.options,s=e.disabled;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(a.a,{id:"".concat(t.toLowerCase().replaceAll(" ","-"),"-page-option-label"),children:t}),Object(r.jsx)(c.a,{labelId:"".concat(t.toLowerCase().replaceAll(" ","-"),"-page-option-label"),value:o,label:t,onChange:n,disabled:s,children:l.map((function(e){return Object(r.jsx)(i.a,{value:e.value,children:e.text},e.value)}))})]})}},120:function(e,t,n){"use strict";(function(e){var a=n(17),c=n(54),i=n.n(c),r=n(76),o=n(78),l=n(13),s=n(0),d=n(131),j=n(132),u=n(93),b=n(130),p=n(128),O=n(126),f=n(127),h=n(121),m=n.n(h),x=n(77),g=n.n(x),v=n(46),w=n(122),k=n(2);t.a=function(){var t=Object(s.useState)([]),n=Object(l.a)(t,2),c=n[0],h=n[1],x=Object(s.useState)(""),y=Object(l.a)(x,2),P=y[0],F=y[1],S=Object(s.useState)("initial"),C=Object(l.a)(S,2),D=C[0],T=C[1],H=Object(s.useState)(!1),I=Object(l.a)(H,2),U=I[0],z=I[1],L=function(){var t=Object(r.a)(i.a.mark((function t(n){var a,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),T("processing"),a=new FormData,c.forEach((function(e){return a.append("files",e.content,e.name)})),a.append("outputFileName",P),r={headers:{"content-type":"multipart/form-data",accept:"application/octet-stream"}},g.a.post("".concat("https://nwiufil3v4.execute-api.ap-southeast-2.amazonaws.com/dev","/pdf/merge"),a,r).then((function(t){var n=e.from(t.data,"base64"),a=window.URL.createObjectURL(new Blob([n])),c=document.createElement("a");c.href=a,c.target="_blank",c.rel="noopener noreferrer",c.setAttribute("download","".concat(P,".pdf")),document.body.appendChild(c),c.click(),h([]),F(""),z(!0)})).catch((function(e){console.log(e)})).finally((function(){T("initial")}));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(k.jsxs)("form",{onSubmit:L,children:[Object(k.jsxs)(v.a,{children:[Object(k.jsx)(v.d,{variant:"h3",children:"PDF Merge Tool"}),Object(k.jsx)(v.b,{children:Object(k.jsx)(d.a,{label:"Output PDF Name",value:P,onChange:function(e){F(e.target.value)},disabled:"processing"===D})}),Object(k.jsx)("label",{htmlFor:"images-upload",children:Object(k.jsxs)(v.b,{children:[Object(k.jsx)(v.c,{accept:"image/jpeg, image/png",type:"file",id:"images-upload","data-testid":"images-upload",onChange:function(e){var t=e.currentTarget.files,n=[];if(t&&t.length){var a,c=Object(o.a)(t);try{for(c.s();!(a=c.n()).done;){var i=a.value;n.push({name:i.name,content:i})}}catch(r){c.e(r)}finally{c.f()}h(n)}},onClick:function(e){e.target.value=""},multiple:!0}),Object(k.jsx)(j.a,{variant:"outlined",component:"span",endIcon:Object(k.jsx)(O.a,{}),disabled:"processing"===D,children:"Upload Files"})]})}),!!c.length&&Object(k.jsx)(m.a,{children:Object(k.jsxs)(v.b,{children:[Object(k.jsx)(u.a,{severity:"info",children:"Reorder the pages by dragging and dropping if needed"}),Object(k.jsx)(w.a,{items:c.map((function(e){return e.name})),onDragging:function(e,t){var n=c[e];c.splice(e,1),c.splice(t,0,n),h(Object(a.a)(c))},onDelete:function(e,t){c.splice(t,1),h(Object(a.a)(c))}})]})}),Object(k.jsx)(v.b,{children:Object(k.jsx)(p.a,{loading:"processing"===D,variant:"contained",endIcon:Object(k.jsx)(f.a,{}),disabled:!c.length||!P,type:"submit",children:"Submit"})})]}),Object(k.jsx)(b.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:U,autoHideDuration:2e3,onClose:function(e,t){"timeout"===t&&z(!1)},children:Object(k.jsx)(u.a,{severity:"success",sx:{width:"100%"},children:"Process Finished"})})]})}}).call(this,n(100).Buffer)},122:function(e,t,n){"use strict";var a,c,i=n(56),r=n(16),o=n(129),l=n(190),s=n(191),d=n(80),j=n(123),u=n.n(j),b=n(22),p=n(2),O=Object(b.a)(o.a)(a||(a=Object(r.a)(["\n  border: 1px solid #d9d9d9;\n  padding: 1em;\n  border-radius: 5px;\n  margin: 0.5em 0;\n  justify-content: space-between;\n  align-content: center;\n  flex-direction: row;\n"]))),f=Object(b.a)(u.a)(c||(c=Object(r.a)(["\n  cursor: pointer;\n"])));t.a=function(e){var t=e.items,n=e.onDragging,a=e.onDelete;return Object(p.jsx)(d.a,{onDragEnd:function(e,t){var a,c,i=null===(a=e.source)||void 0===a?void 0:a.index,r=null===(c=e.destination)||void 0===c?void 0:c.index;void 0!==i&&void 0!==r&&i!==r&&n(i,r)},children:Object(p.jsx)(d.c,{droppableId:"dnd-items",children:function(e){return Object(p.jsxs)(l.a,Object(i.a)(Object(i.a)({ref:e.innerRef},e.droppableProps),{},{"data-testid":"drag-and-drop-list",children:[t.map((function(e,t){return Object(p.jsx)(d.b,{draggableId:"files-".concat(t),index:t,children:function(n){return Object(p.jsxs)(O,Object(i.a)(Object(i.a)(Object(i.a)({ref:n.innerRef},n.draggableProps),n.dragHandleProps),{},{children:[Object(p.jsx)("span",{"data-testid":"item",children:e}),a&&Object(p.jsx)(s.a,{"aria-label":"delete item","data-testid":"delete-item",onClick:function(e){return a(e,t)},children:Object(p.jsx)(f,{})})]}))}},t)})),e.placeholder]}))}})})}},151:function(e,t,n){},181:function(e,t,n){"use strict";n.r(t);var a,c=n(0),i=n.n(c),r=n(27),o=n.n(r),l=n(69),s=n(14),d=n(244),j=(n(151),n(115)),u=n.n(j),b=n(134),p=n(190),O=n(129),f=n(132),h=n(16),m=n(133),x=n(22),g={xs:"0px",sm:"600px",md:"900px",lg:"1200px",xl:"1536px"},v=Object(x.a)(m.a)(a||(a=Object(h.a)(["\n  text-align: center;\n  margin: 5% auto;\n  padding: 2em;\n  width: 40em;\n  @media (max-width: ",") {\n    width: fit-content;\n  }\n"])),g.sm),w=n(2),k=function(e){var t=e.title,n=e.options,a=e.clickHandler;return Object(w.jsxs)(v,{children:[t&&Object(w.jsx)(b.a,{variant:"h3",component:"h1",children:t}),Object(w.jsx)(p.a,{children:n.map((function(e){return Object(w.jsx)(O.a,{sx:{display:"flex"},children:Object(w.jsx)(f.a,{startIcon:e.icon,variant:"contained",sx:{margin:"auto 0",width:"100%"},onClick:function(){return a(e.clickParameter)},children:e.name})},e.name)}))})]})},y=function(){var e=Object(s.f)(),t=[{name:"PDF Tool",icon:Object(w.jsx)(u.a,{}),clickParameter:"/pdf-tool"}];return Object(w.jsx)(k,{title:"Features",options:t,clickHandler:function(t){e(t)}})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,249)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),i(e),r(e)}))},F=n(13),S=n(124),C=n(242),D=Object(c.createContext)({switchTheme:function(){}}),T=function(e){var t=e.children,n=Object(c.useState)("light"),a=Object(F.a)(n,2),i=a[0],r=a[1],o=Object(c.useMemo)((function(){return Object(S.a)({palette:{mode:i}})}),[i]);return Object(w.jsx)(D.Provider,{value:{switchTheme:function(){r((function(e){return"dark"===e?"light":"dark"}))}},children:Object(w.jsx)(C.a,{theme:o,children:t})})},H=n(245),I=n(246),U=n(191),z=n(234),L=n(235),R=n(236),B=n(37),N=function(){var e=Object(c.useContext)(D),t=Object(B.a)();return Object(w.jsx)(d.a,{sx:{flexGrow:1},children:Object(w.jsx)(H.a,{position:"static",children:Object(w.jsxs)(I.a,{children:[Object(w.jsx)(U.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(w.jsx)(z.a,{})}),Object(w.jsx)(b.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Office Utility Tools"}),t.palette.mode," mode",Object(w.jsx)(U.a,{onClick:e.switchTheme,"data-testid":"color-mode",children:"dark"===t.palette.mode?Object(w.jsx)(L.a,{"aria-label":"light mode"}):Object(w.jsx)(R.a,{sx:{color:"white"},"aria-label":"dark mode"})})]})})})},E=n(116),A=n.n(E),J=n(117),M=n.n(J),V=function(){var e=Object(s.f)(),t=function(t){e(t)},n=[{name:"PDF to image",icon:Object(w.jsx)(A.a,{}),clickParameter:"/pdf-tool/split",clickHandler:t},{name:"Image to PDF",icon:Object(w.jsx)(M.a,{}),clickParameter:"/pdf-tool/merge",clickHandler:t}];return Object(w.jsx)(k,{title:"PDF Utility Tool",options:n,clickHandler:t})},G=n(118),_=n(120);o.a.render(Object(w.jsx)(i.a.StrictMode,{children:Object(w.jsx)(l.a,{children:Object(w.jsx)(T,{children:Object(w.jsxs)(d.a,{sx:{width:"100%",height:"100%",bgcolor:"background.default",color:"text.primary"},children:[Object(w.jsx)(N,{}),Object(w.jsxs)(s.c,{children:[Object(w.jsx)(s.a,{path:"/",element:Object(w.jsx)(y,{})}),Object(w.jsx)(s.a,{path:"/pdf-tool",element:Object(w.jsx)(V,{})}),Object(w.jsx)(s.a,{path:"/pdf-tool/split",element:Object(w.jsx)(G.a,{})}),Object(w.jsx)(s.a,{path:"/pdf-tool/merge",element:Object(w.jsx)(_.a,{})})]})]})})})}),document.getElementById("root")),P()},45:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return b})),n.d(t,"a",(function(){return p})),n.d(t,"d",(function(){return O}));var a,c,i,r,o=n(16),l=n(135),s=n(133),d=n(134),j=n(22),u=j.a.input(a||(a=Object(o.a)(["\n  display: none;\n"]))),b=Object(j.a)(l.a)(c||(c=Object(o.a)(["\n  padding: 0.3em 0 !important;\n  margin: 0.3em 0 !important;\n  width: 100%;\n"]))),p=Object(j.a)(s.a)(i||(i=Object(o.a)(["\n  margin: 5% auto;\n  padding: 2em;\n  width: 50%;\n"]))),O=Object(j.a)(d.a)(r||(r=Object(o.a)(["\n  margin-bottom: 3% !important;\n  text-align: center;\n"])))},46:function(e,t,n){"use strict";n.d(t,"c",(function(){return p})),n.d(t,"b",(function(){return O})),n.d(t,"a",(function(){return f})),n.d(t,"d",(function(){return h}));var a,c,i,r,o,l=n(16),s=n(135),d=n(133),j=n(134),u=n(129),b=n(22),p=b.a.input(a||(a=Object(l.a)(["\n  display: none;\n"]))),O=Object(b.a)(s.a)(c||(c=Object(l.a)(["\n  padding: 0.3em 0 !important;\n  margin: 0.3em 0 !important;\n  width: 100%;\n"]))),f=Object(b.a)(d.a)(i||(i=Object(l.a)(["\n  margin: 5% auto;\n  padding: 2em;\n  width: 50%;\n"]))),h=Object(b.a)(j.a)(r||(r=Object(l.a)(["\n  margin-bottom: 3% !important;\n  text-align: center;\n"])));Object(b.a)(u.a)(o||(o=Object(l.a)(["\n  border: 1px solid #d9d9d9;\n  padding: 1em;\n  border-radius: 5px;\n"])))}},[[181,1,2]]]);
//# sourceMappingURL=main.f832b642.chunk.js.map