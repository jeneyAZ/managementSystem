(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fdf5afa0"],{"24e8":function(e,n,t){"use strict";var a=t("411d"),r=t.n(a);r.a},"411d":function(e,n,t){},"98c8":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"az-p"},[t("span",[e._v("全选/不全选")]),t("i-button",{attrs:{type:"error"},on:{click:function(n){return e.handleSearch()}}},[e._v("删除所选")])],1),t("br"),t("Table",{attrs:{border:"",stripe:"",columns:e.columns,data:e.dataList},on:{"on-select":function(n){return e.handleSelect(n)},"on-select-all":function(n){return e.handleSelectAll(n)}}}),t("br"),t("Page",{attrs:{total:e.total,"show-sizer":"","show-elevator":""},on:{"on-change":function(n){return e.handleCurrentPage(n)},"on-page-size-change":function(n){return e.handlePageSize(n)}}})],1)},r=[],l={name:"ArticleManagement",data:function(){return{kindList:[{value:1,label:"科幻"},{value:2,label:"恐怖"}],model:"",columns:[{type:"selection",width:60,align:"center"},{title:"投诉文章",key:"id"},{title:"姓名",key:"name"},{title:"电话",key:"rank"},{title:"IP来自",key:"rank"},{title:"状态",key:"rank"},{title:"日期",key:"rank"},{title:"操作",width:250,align:"center",render:function(e,n){return e("span",[e("span",{style:{color:"blue",cursor:"pointer"},on:{click:function(){console.log(n.row)}}},"修改"),e("span",{style:{color:"red",marginLeft:"20px",cursor:"pointer"},on:{click:function(){console.log(n.row)}}},"删除到回收站")])}}],dataList:[{id:1,name:"jeneny",rank:1},{id:2,name:"az",rank:2},{id:3,name:"jeneybu",rank:3},{id:3,name:"jeneybu",rank:4},{id:3,name:"jeneybu",rank:5},{id:3,name:"jeneybu",rank:6},{id:3,name:"jeneybu",rank:7},{id:3,name:"jeneybu",rank:8},{id:3,name:"jeneybu",rank:9},{id:3,name:"jeneybu",rank:10},{id:3,name:"jeneybu",rank:11}],total:null,pageSize:10,currentPage:1}},created:function(){this.getOrderData()},methods:{handleSelectKind:function(e){console.log(e)},handleSelect:function(e){console.log(e)},handleSelectAll:function(e){console.log(e)},handleCurrentPage:function(e){console.log(e,"currentPage")},handlePageSize:function(e){console.log(e,"pageSize")},handleSearch:function(){},getOrderData:function(){}}},o=l,i=(t("24e8"),t("2877")),c=Object(i["a"])(o,a,r,!1,null,"68f7a4cc",null);n["default"]=c.exports}}]);
//# sourceMappingURL=chunk-fdf5afa0.dc0824bc.js.map