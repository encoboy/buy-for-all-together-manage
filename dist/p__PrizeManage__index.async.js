(self.webpackChunkumi_yiyuangou=self.webpackChunkumi_yiyuangou||[]).push([[760],{31940:function(t,a,e){"use strict";e.d(a,{Z:function(){return o}});var c={box:"box___y0Jj2",line:"line___tf9zw",title:"title___HzOci"},s=e(11527),i="dIjQ",o=function(d){var g=d.title;return(0,s.jsxs)("div",{className:c.box,_nk:"".concat(i,"11"),children:[(0,s.jsx)("div",{className:c.line,_nk:"".concat(i,"12")}),(0,s.jsx)("div",{className:c.title,_nk:"".concat(i,"13"),children:g})]})}},65607:function(t,a,e){"use strict";e.r(a),e.d(a,{default:function(){return ce}});var c=e(65854),s=e.n(c),i=e(25359),o=e.n(i),d=e(49811),g=e.n(d),W=e(54306),z=e.n(W),R=e(21140),M=e.n(R),K=e(63466),G=e.n(K),L=e(58853),Q=e.n(L),J=e(38888),Y=e.n(J),m=e(25107),C=e(50959),u=e(11527),A="Ppms";function U(S){return function(y){Q()(h,y);var T=Y()(h);function h(){return M()(this,h),T.apply(this,arguments)}return G()(h,[{key:"render",value:function(){return(0,u.jsx)(m.KeepAlive,{id:S.name,name:S.name,when:function(){return!0},_nk:"".concat(A,"11"),children:(0,u.jsx)(S,{_nk:"".concat(A,"21")})})}}]),h}(C.Component)}var V=U,X=e(31940),B=e(16950),q=e(26919),_=e(20190),ee=e(97069),te=e(50944),ne=e(51431),re=e(16415),ae=e(67065),oe={doubleRow:"doubleRow___bQWyp"},p="jMhT",ie=te.Z.confirm,se=function(){var y=(0,C.useRef)(),T=(0,C.useState)(1),h=z()(T,2),O=h[0],I=h[1],ue=(0,C.useState)(10),E=z()(ue,2),F=E[0],le=E[1],fe=(0,m.useModel)("global"),de=fe.setRefresh,pe=function(){var l=g()(o()().mark(function r(n){var f,P,v,k,x,b,w,N,Z,$,H,D;return o()().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return f=n.pageSize,P=f===void 0?10:f,v=n.current,k=v===void 0?1:v,x=n.keyWord,j.next=3,(0,B.qY)({currentPage:k,pageSize:P,keyWord:x});case 3:return b=j.sent,w=b.code,N=b.data,Z=N.list,$=Z===void 0?[]:Z,H=N.total,$.length==0&&O!==1&&(I(O-1),(D=y.current)===null||D===void 0||D.reload()),j.abrupt("return",{data:$,total:H,success:w===2e3});case 9:case"end":return j.stop()}},r)}));return function(n){return l.apply(this,arguments)}}(),ve=function(){var l=g()(o()().mark(function r(n){var f,P,v;return o()().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.next=2,(0,B.Fu)({prizeId:n});case 2:f=x.sent,P=f.flag,P&&(ne.ZP.success("\u5220\u9664\u6210\u529F"),(v=y.current)===null||v===void 0||v.reload());case 5:case"end":return x.stop()}},r)}));return function(n){return l.apply(this,arguments)}}(),he=function(r){ie({title:"\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u5546\u54C1\u5417?",icon:(0,u.jsx)(q.Z,{_nk:"".concat(p,"11")}),content:"".concat(r.prizeName),okText:"\u786E\u5B9A",okType:"danger",cancelText:"\u53D6\u6D88",onOk:function(){ve(r.prizeId)},onCancel:function(){console.log("Cancel")}})},xe=[{title:"\u5E8F\u53F7",align:"center",key:"index",search:!1,width:75,render:function(r,n,f){return(0,u.jsx)("span",{_nk:"".concat(p,"21"),children:(O-1)*F+f+1})}},{title:"\u5173\u952E\u5B57",dataIndex:"keyWord",align:"center",width:0,hideInTable:!0},{title:"logo",align:"center",search:!1,key:"img",width:80,render:function(r){return(0,u.jsx)("div",{_nk:"".concat(p,"31"),children:(0,u.jsx)(re.Z,{preview:!1,src:r.image,_nk:"".concat(p,"41")})})}},{title:"\u540D\u79F0",dataIndex:"prizeName",align:"center",copyable:!0,search:!1,ellipsis:!0},{title:"\u5956\u54C1id",align:"center",search:!1,dataIndex:"prizeId",width:75},{title:"\u5F00\u5956\u91D1\u989D",dataIndex:"openPrice",search:!1,align:"center"},{title:"\u5907\u6CE8",dataIndex:"remark",search:!1,align:"center",copyable:!0,ellipsis:!0},{title:"\u5F00\u5956\u91D1\u989D",dataIndex:"openPrice",search:!1,align:"center"},{title:"\u5355\u4EF7",dataIndex:"unitPrice",search:!1,align:"center"},{title:"\u72B6\u6001",align:"center",dataIndex:"state",search:!1,width:100,render:function(r,n){var f=n.state;return(0,u.jsx)("div",{_nk:"".concat(p,"32"),children:f==1?"\u8FDB\u884C\u4E2D":"\u7ED3\u675F"})}},{title:"\u64CD\u4F5C",valueType:"option",key:"option",render:function(r,n,f,P){return[(0,u.jsx)("a",{onClick:function(){m.history.push("/prizeManage/edit?id=".concat(n.prizeId))},_nk:"".concat(p,"51"),children:"\u7F16\u8F91"},"editable"),(0,u.jsx)("a",{style:{color:"red"},onClick:function(){return he(n)},_nk:"".concat(p,"52"),children:"\u5220\u9664"},"delete")]}}];return(0,C.useEffect)(function(){de(y.current)},[]),(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(ee.Z,{columns:xe,actionRef:y,cardBordered:!0,request:pe,editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",onChange:function(r){}},rowKey:"prizeId",search:{labelWidth:"auto",optionRender:function(r,n,f){return s()(r),s()(n),f.reverse()}},options:{setting:{listsHeight:400}},pagination:{pageSize:F,current:O,hideOnSinglePage:!0,onChange:function(r,n){I(r),le(n)}},dateFormatter:"string",headerTitle:(0,u.jsx)(X.Z,{title:"\u5956\u54C1\u7BA1\u7406",_nk:"".concat(p,"71")}),rowClassName:function(r,n){if(n%2===1)return oe.doubleRow},toolBarRender:function(){return[(0,u.jsx)(ae.ZP,{icon:(0,u.jsx)(_.Z,{_nk:"".concat(p,"91")}),onClick:function(){m.history.push("/prizeManage/edit")},type:"primary",_nk:"".concat(p,"81"),children:"\u6DFB\u52A0"},"button")]},_nk:"".concat(p,"61")})})},ce=V(se)},68608:function(t){function a(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}t.exports=a,t.exports.__esModule=!0,t.exports.default=t.exports},38888:function(t,a,e){var c=e(44908),s=e(14614),i=e(91621);function o(d){var g=s();return function(){var z=c(d),R;if(g){var M=c(this).constructor;R=Reflect.construct(z,arguments,M)}else R=z.apply(this,arguments);return i(this,R)}}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},44908:function(t){function a(e){return t.exports=a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(s){return s.__proto__||Object.getPrototypeOf(s)},t.exports.__esModule=!0,t.exports.default=t.exports,a(e)}t.exports=a,t.exports.__esModule=!0,t.exports.default=t.exports},58853:function(t,a,e){var c=e(49154);function s(i,o){if(typeof o!="function"&&o!==null)throw new TypeError("Super expression must either be null or a function");i.prototype=Object.create(o&&o.prototype,{constructor:{value:i,writable:!0,configurable:!0}}),Object.defineProperty(i,"prototype",{writable:!1}),o&&c(i,o)}t.exports=s,t.exports.__esModule=!0,t.exports.default=t.exports},14614:function(t){function a(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}t.exports=a,t.exports.__esModule=!0,t.exports.default=t.exports},91621:function(t,a,e){var c=e(37635).default,s=e(68608);function i(o,d){if(d&&(c(d)==="object"||typeof d=="function"))return d;if(d!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return s(o)}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},49154:function(t){function a(e,c){return t.exports=a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,o){return i.__proto__=o,i},t.exports.__esModule=!0,t.exports.default=t.exports,a(e,c)}t.exports=a,t.exports.__esModule=!0,t.exports.default=t.exports}}]);
