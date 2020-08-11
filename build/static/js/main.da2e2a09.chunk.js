(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),a=t(13),c=t.n(a),l=(t(19),t(2)),u=t(3),i=t.n(u),s="http://localhost:3001/api/persons",m=function(){return console.log("getAll called"),i.a.get(s).then((function(e){return e.data}))},d=function(e){return console.log("create called object:",e),i.a.post(s,e).then((function(e){return e.data}))},f=function(e,n){return console.log("update called id:",e),i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return console.log("delete called id:",e),i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.name,t=e.number,o=e.deletePerson;return r.a.createElement("li",{className:"person"},n," ",t,r.a.createElement("button",{onClick:o}," Delete"))},b=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"Add a new person"),r.a.createElement("form",{onSubmit:e.addPerson},"Name:",r.a.createElement("input",{value:e.newPerson,onChange:e.handlePersonChange}),r.a.createElement("br",null),"Number:",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Add")))},g=function(e){return r.a.createElement("div",null,"Filter:",r.a.createElement("input",{value:e.currentFilter,onChange:e.handleFilterChange}))},E=function(e){var n=e.message;return null===n?null:n.includes("Error")?r.a.createElement("div",{className:"error"},n):r.a.createElement("div",{className:"notification"},n)},v=function(){var e=Object(o.useState)([]),n=Object(l.a)(e,2),t=n[0],a=n[1],c=Object(o.useState)(""),u=Object(l.a)(c,2),i=u[0],s=u[1],v=Object(o.useState)(""),w=Object(l.a)(v,2),j=w[0],N=w[1],O=Object(o.useState)(""),C=Object(l.a)(O,2),P=C[0],k=C[1],S=Object(o.useState)(null),T=Object(l.a)(S,2),y=T[0],F=T[1];Object(o.useEffect)((function(){m().then((function(e){console.log("Persons from db:",e),a(e)}))}),[]);var A=t.filter((function(e){return e.name.includes(P)}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(E,{message:y}),r.a.createElement(g,{currentFilter:P,handleFilterChange:function(e){k(e.target.value)},personsToShow:A}),r.a.createElement(b,{addPerson:function(e){e.preventDefault();var n={name:i,number:j};if(t.some((function(e){return e.name===n.name}))){if(window.confirm("Update number for ".concat(n.name," ?"))){var o=t.find((function(e){return e.name===n.name}));console.log("updating number for ",o),f(o.id,n).then((function(e){a(t.map((function(n){return n.id!==e.id?n:e})))})).then((function(){F("Updated number for ".concat(o.name)),setTimeout((function(){F(null)}),2e3)})).catch((function(e){console.log("api Error:",e.response.data.error),F("Error: ".concat(e.response.data.error)),setTimeout((function(){F(null)}),2e3)}))}}else n.name.length>0?(console.log("New person object: ",n),d(n).then((function(e){a(t.concat(e))})).then((function(){F("Added ".concat(n.name," to phonebook")),setTimeout((function(){F(null)}),2e3)})).catch((function(e){console.log("api Error:",e.response.data.error),F("Error: ".concat(e.response.data.error)),setTimeout((function(){F(null)}),2e3)}))):console.log("Name field was empty.")},setNewNumber:N,handlePersonChange:function(e){s(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("h1",null,"Persons, ",A.length," found"),r.a.createElement("ul",null,A.map((function(e,n){return r.a.createElement(p,{key:n,name:e.name,number:e.number,deletePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you want to remove ".concat(n.name," ?"))&&(console.log("person:",n),h(n.id).then(a(t.filter((function(e){return e.id!==n.id})))).then((function(){F("".concat(n.name," was deleted from phonebook")),setTimeout((function(){F(null)}),2e3)})).catch((function(e){console.log("api Error:",e.response.data.error),F("Error: ".concat(e.response.data.error)),setTimeout((function(){F(null)}),2e3),a(t.filter((function(e){return e.id!==n.id})))})),console.log("filter person: ",n))}(e.id)}})}))))};c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.da2e2a09.chunk.js.map