(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9055a572"],{"36fc":function(n,e,t){},"86de":function(n,e,t){"use strict";var a=t("36fc"),r=t.n(a);r.a},fd16:function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticClass:"query-c"},[n._v("\n        添加分类：\n        "),t("Input",{staticStyle:{width:"auto"},attrs:{placeholder:"请输入类别名称"}}),t("i-button",{attrs:{type:"primary"},on:{click:function(e){return n.handleAdd()}}},[n._v("添加")])],1),t("br"),t("Table",{attrs:{border:"",stripe:"",columns:n.columns,data:n.dataList}}),t("br"),t("Page",{attrs:{total:n.total,"show-sizer":"","show-elevator":""},on:{"on-change":function(e){return n.handleCurrentPage(e)},"on-page-size-change":function(e){return n.handlePageSize(e)}}})],1)},r=[],i={name:"ClassifiedManagement",data:function(){return{columns:[{title:"ID",key:"id"},{title:"类别名称",key:"name"},{title:"排序",key:"rank"},{title:"操作",width:150,align:"center",render:function(n,e){return n("span",[n("span",{style:{color:"blue",cursor:"pointer"},on:{click:function(){console.log(e.row)}}},"修改"),n("span",{style:{color:"red",marginLeft:"20px",cursor:"pointer"},on:{click:function(){console.log(e.row)}}},"删除")])}}],dataList:[{id:1,name:"jeneny",rank:1},{id:2,name:"az",rank:2},{id:3,name:"jeneybu",rank:3},{id:3,name:"jeneybu",rank:4},{id:3,name:"jeneybu",rank:5},{id:3,name:"jeneybu",rank:6},{id:3,name:"jeneybu",rank:7},{id:3,name:"jeneybu",rank:8},{id:3,name:"jeneybu",rank:9},{id:3,name:"jeneybu",rank:10},{id:3,name:"jeneybu",rank:11}],total:null,pageSize:10,currentPage:1}},created:function(){this.getOrderData()},methods:{handleCurrentPage:function(n){console.log(n,"currentPage")},handlePageSize:function(n){console.log(n,"pageSize")},handleAdd:function(){},getOrderData:function(){}}},o=i,c=(t("86de"),t("2877")),u=Object(c["a"])(o,a,r,!1,null,"60987242",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-9055a572.ef34514a.js.map