(this["webpackJsonpoffice-tool-frontend"]=this["webpackJsonpoffice-tool-frontend"]||[]).push([[0],{127:function(e,t,n){},152:function(e,t,n){"use strict";n.r(t);var a,c,i,l,o,r=n(0),s=n.n(r),j=n(38),d=n.n(j),b=n(62),p=n(14),u=n(225),O=(n(127),n(105)),h=n.n(O),x=n(223),f=n(224),m=n(212),g=n(218),v=n(19),w=n(221),k=n(44),P={xs:"0px",sm:"600px",md:"900px",lg:"1200px",xl:"1536px"},S=Object(k.a)(w.a)(a||(a=Object(v.a)(["\n  text-align: center;\n  margin: 5% auto;\n  padding: 2em;\n  width: 40em;\n  @media (max-width: ",") {\n    width: fit-content;\n  }\n"])),P.sm),y=n(2),F=function(e){var t=e.title,n=e.options,a=e.clickHandler;return Object(y.jsxs)(S,{children:[t&&Object(y.jsx)(x.a,{variant:"h3",component:"h1",children:t}),Object(y.jsx)(f.a,{children:n.map((function(e){return Object(y.jsx)(m.a,{sx:{display:"flex"},children:Object(y.jsx)(g.a,{startIcon:e.icon,variant:"contained",sx:{margin:"auto 0",width:"100%"},onClick:function(){return a(e.clickParameter)},children:e.name})},e.name)}))})]})},C=function(){var e=Object(p.f)(),t=[{name:"PDF Tool",icon:Object(y.jsx)(h.a,{}),clickParameter:"/pdf-tool"}];return Object(y.jsx)(F,{title:"Features",options:t,clickHandler:function(t){e(t)}})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,232)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,l=t.getTTFB;n(e),a(e),c(e),i(e),l(e)}))},D=n(13),H=n(110),I=n(220),z=Object(r.createContext)({switchTheme:function(){}}),L=function(e){var t=e.children,n=Object(r.useState)("light"),a=Object(D.a)(n,2),c=a[0],i=a[1],l=Object(r.useMemo)((function(){return Object(H.a)({palette:{mode:c}})}),[c]);return Object(y.jsx)(z.Provider,{value:{switchTheme:function(){i((function(e){return"dark"===e?"light":"dark"}))}},children:Object(y.jsx)(I.a,{theme:l,children:t})})},N=n(226),U=n(227),J=n(228),V=n(201),A=n(202),B=n(203),G=n(34),M=function(){var e=Object(r.useContext)(z),t=Object(G.a)();return Object(y.jsx)(u.a,{sx:{flexGrow:1},children:Object(y.jsx)(N.a,{position:"static",children:Object(y.jsxs)(U.a,{children:[Object(y.jsx)(J.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(y.jsx)(V.a,{})}),Object(y.jsx)(x.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"Office Utility Tools"}),t.palette.mode," mode",Object(y.jsx)(J.a,{onClick:e.switchTheme,"data-testid":"color-mode",children:"dark"===t.palette.mode?Object(y.jsx)(A.a,{"aria-label":"light mode"}):Object(y.jsx)(B.a,{sx:{color:"white"},"aria-label":"dark mode"})})]})})})},E=n(106),q=n.n(E),K=function(){var e=Object(p.f)(),t=function(t){e(t)},n=[{name:"PDF Split",icon:Object(y.jsx)(q.a,{}),clickParameter:"/pdf-tool/split",clickHandler:t}];return Object(y.jsx)(F,{title:"PDF Utility Tool",options:n,clickHandler:t})},Q=n(81),R=n.n(Q),W=n(107),X=n(216),Y=n(214),Z=n(211),$=n(210),_=n(206),ee=n(207),te=n(108),ne=n.n(te),ae=n(109),ce=n.n(ae),ie=n(229),le=k.a.input(c||(c=Object(v.a)(["\n  display: none;\n"]))),oe=Object(k.a)(ie.a)(i||(i=Object(v.a)(["\n  padding: 0.3em 0 !important;\n  margin: 0.3em 0 !important;\n  width: 100%;\n"]))),re=Object(k.a)(w.a)(l||(l=Object(v.a)(["\n  margin: 5% auto;\n  padding: 2em;\n  width: 50%;\n"]))),se=Object(k.a)(x.a)(o||(o=Object(v.a)(["\n  margin-bottom: 3% !important;\n  text-align: center;\n"]))),je=n(215),de=n(208),be=n(213),pe=function(e){var t=e.title,n=e.selectHandler,a=e.selectedValue,c=e.options,i=e.disabled;return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(je.a,{id:"".concat(t.toLowerCase().replaceAll(" ","-"),"-page-option-label"),children:t}),Object(y.jsx)(de.a,{labelId:"".concat(t.toLowerCase().replaceAll(" ","-"),"-page-option-label"),value:a,label:t,onChange:n,disabled:i,children:c.map((function(e){return Object(y.jsx)(be.a,{value:e.value,children:e.text},e.value)}))})]})},ue=[{text:"No Page Split",value:"no-split"},{text:"Page Split (Horizontal)",value:"horizontal"},{text:"Page Split (Vertical)",value:"vertical"}],Oe=function(){var e=Object(r.useState)("Page"),t=Object(D.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)("no-split"),i=Object(D.a)(c,2),l=i[0],o=i[1],s=Object(r.useState)(null),j=Object(D.a)(s,2),d=j[0],b=j[1],p=Object(r.useState)("Upload File"),u=Object(D.a)(p,2),O=u[0],h=u[1],x=Object(r.useState)("initial"),f=Object(D.a)(x,2),m=f[0],v=f[1],w=Object(r.useState)(!1),k=Object(D.a)(w,2),P=k[0],S=k[1],F=function(){var e=Object(W.a)(R.a.mark((function e(t){var a,c;return R.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),v("processing"),(a=new FormData).append("file",d,O),a.append("pageName",n),a.append("pageOptions",JSON.stringify({split:l})),c={headers:{"content-type":"multipart/form-data"},responseType:"arraybuffer"},ne.a.post("".concat("http://localhost:8000","/pdf/split"),a,c).then((function(e){ce()(e.data,O.replace(".pdf",".zip")),b(null),h("Upload File"),S(!0)})).catch((function(e){console.log(e)})).finally((function(){v("initial")}));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(y.jsxs)("form",{onSubmit:F,children:[Object(y.jsxs)(re,{children:[Object(y.jsx)(se,{variant:"h3",children:"PDF Split Tool"}),Object(y.jsx)(oe,{children:Object(y.jsx)(X.a,{label:"Output Page Name",value:n,onChange:function(e){a(e.target.value)},disabled:"processing"===m})}),Object(y.jsx)(oe,{children:Object(y.jsx)(pe,{title:"Page Options",selectHandler:function(e){o(e.target.value)},selectedValue:l,options:ue,disabled:"processing"===m})}),Object(y.jsx)("label",{htmlFor:"pdf-upload",children:Object(y.jsxs)(oe,{children:[Object(y.jsx)(le,{accept:".pdf",type:"file",id:"pdf-upload","data-testid":"pdf-upload",onChange:function(e){var t=e.currentTarget.files;t&&t.length&&(h(t[0].name),b(t[0]))},onClick:function(e){e.target.value=""}}),Object(y.jsx)(g.a,{variant:"outlined",component:"span",endIcon:Object(y.jsx)(_.a,{}),disabled:"processing"===m,children:O})]})}),Object(y.jsx)(oe,{children:Object(y.jsx)($.a,{loading:"processing"===m,variant:"contained",endIcon:Object(y.jsx)(ee.a,{}),disabled:!(n&&l&&d),type:"submit",children:"Submit"})})]}),Object(y.jsx)(Y.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:P,autoHideDuration:3e3,onClose:function(e,t){"timeout"===t&&S(!1)},children:Object(y.jsx)(Z.a,{severity:"success",sx:{width:"100%"},children:"Process Finished"})})]})};d.a.render(Object(y.jsx)(s.a.StrictMode,{children:Object(y.jsx)(b.a,{children:Object(y.jsx)(L,{children:Object(y.jsxs)(u.a,{sx:{width:"100%",height:"100%",bgcolor:"background.default",color:"text.primary"},children:[Object(y.jsx)(M,{}),Object(y.jsxs)(p.c,{children:[Object(y.jsx)(p.a,{path:"/",element:Object(y.jsx)(C,{})}),Object(y.jsx)(p.a,{path:"/pdf-tool",element:Object(y.jsx)(K,{})}),Object(y.jsx)(p.a,{path:"/pdf-tool/split",element:Object(y.jsx)(Oe,{})})]})]})})})}),document.getElementById("root")),T()}},[[152,1,2]]]);
//# sourceMappingURL=main.d637ff99.chunk.js.map