(this["webpackJsonpanna-react"]=this["webpackJsonpanna-react"]||[]).push([[0],{36:function(e,t,a){e.exports=a(77)},73:function(e,t){},76:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),i=a(17),r=a.n(i),c=a(34),l=a(5),o=a(6),u=a(9),h=a(7),d=a(1),m=a(8);var p=function(e){return"message"===e.type?n.a.createElement("div",{className:"message-box"},e.username?n.a.createElement("p",{className:"sender"},e.username):"",n.a.createElement("p",{className:"message"},e.message)):n.a.createElement("div",{className:"message-box"},e.username?n.a.createElement("p",{className:"sender"},e.username):"",n.a.createElement("p",{className:"message"},n.a.createElement("img",{src:e.message})))},k=a(32),f=a.n(k),v=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{id:"messages"},this.props.messages.map((function(e,t,a){var s=a[t-1];return s&&e[1]===s[1]?n.a.createElement(p,{type:e[0],message:e[2]}):n.a.createElement(p,{type:e[0],username:e[1],message:e[2]})})))}}]),t}(n.a.Component),g=f()(v),b=a(35),E=a(41)("klB9Zf4zKSuscH45CuLzPuibmMidihzg");var y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).getTextAreaRef=function(e){a._textAreaRef=e},a.state={text:"",predicted_end:"",stickers:[],visible:!1},a.handleKeyDown=a.handleKeyDown.bind(Object(d.a)(a)),a.handleChange=a.handleChange.bind(Object(d.a)(a)),a.sendMessage=a.sendMessage.bind(Object(d.a)(a)),a.handleClickOut=a.handleClickOut.bind(Object(d.a)(a)),a.handleGlobalKeyDown=a.handleGlobalKeyDown.bind(Object(d.a)(a)),a.searchSticker=a.searchSticker.bind(Object(d.a)(a)),a.handleImageClick=a.handleImageClick.bind(Object(d.a)(a)),a.COMMANDS_SERVER={"\u0432\u043e\u0439\u0442\u0438":"join","\u0441\u043e\u0437\u0434\u0430\u0442\u044c":"join","\u0441\u0442\u0438\u043a\u0435\u0440":"sticker",enter:"join",create:"create",sticker:"sticker"},a.COMMANDS=Object.keys(a.COMMANDS_SERVER),a.SEARCH_TIMEOUT=400,a.stickerSearchTimeout=null,a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.handleGlobalKeyDown)}},{key:"searchSticker",value:function(e){var t=this;e&&E.search({api:"stickers",limit:6,q:e}).then((function(e){200===e.meta.status&&t.setState({stickers:e.data.map((function(e){return e.images.fixed_width_small.url}))})}))}},{key:"sendMessage",value:function(e){if("/"===e.target.value[0]){var t=e.target.value.slice(1,e.target.value.length).split(" "),a=this.COMMANDS_SERVER[t[0]];if("sticker"===a)this.props.socket.send({type:"sticker",username:this.props.username,message:this.state.stickers[0],room:this.props.room}),this.setState({text:"",predicted_end:"",stickers:[],visible:!1});else{var s=t.slice(1).join(" ");s.replace(/ /g,"")&&(this.props.socket.emit(a,{username:this.props.username,arg:s}),this.setState({text:"",predicted_end:"",visible:!1}))}}else this.state.text.replace(/ /g,"")&&(this.props.socket.send({type:"message",username:this.props.username,message:this.state.text,room:this.props.room}),this.setState({text:"",predicted_end:"",visible:!1}))}},{key:"handleKeyDown",value:function(e){e.shiftKey||(this.state.predicted_end?"Enter"!==e.key&&"NumpadEnter"!==e.key&&"Tab"!==e.key||(this.setState({text:this.state.text+this.state.predicted_end+" ",predicted_end:""}),e.preventDefault()):"Enter"===e.key||"NumpadEnter"===e.key?(this.sendMessage(e),e.preventDefault()):"Tab"===e.key&&e.preventDefault())}},{key:"handleChange",value:function(e){var t=this;if("/"===e.target.value[0]){var a=e.target.value.split(" "),s=a[0].slice(1),n=function(e,t){return t.filter((function(t){return t.startsWith(e)})).sort((function(e,t){return e.length-t.length||e.localeCompare(t)}))}(s,this.COMMANDS)[0],i="",r="sticker"===this.COMMANDS_SERVER[s];n&&(i=n.split(s).join("")),!i&&r&&(clearTimeout(this.stickerSearchTimeout),this.stickerSearchTimeout=setTimeout((function(){return t.searchSticker(a.slice(1).join(" "))}),this.SEARCH_TIMEOUT,a)),r?this.setState({text:e.target.value,predicted_end:i}):this.setState({text:e.target.value,predicted_end:i,stickers:[]})}else this.setState({text:e.target.value,predicted_end:"",stickers:[]})}},{key:"handleClickOut",value:function(e){this.setState({visible:!1})}},{key:"handleGlobalKeyDown",value:function(e){this.state.visible||"Enter"===e.key||"NumpadEnter"===e.key||(this.setState({visible:!0}),this._textAreaRef._ref.focus())}},{key:"handleImageClick",value:function(e){var t=e.target.src;t&&(this.props.socket.send({type:"sticker",username:this.props.username,message:t,room:this.props.room}),this.setState({text:"",predicted_end:"",stickers:[],visible:!1}))}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:this.state.visible?"":"disable"},n.a.createElement("div",{onClick:this.handleClickOut,className:this.state.visible?"cli-outarea":"disable cli-outarea"}),n.a.createElement("div",{className:"cli-input-wrapper"},n.a.createElement("div",{className:"predicted-end-wrapper"},n.a.createElement("p",null,n.a.createElement("span",{className:"hidden predicted-placeholder"},this.state.text),n.a.createElement("span",{className:this.state.predicted_end?"predicted-text":"hidden predicted-text"},this.state.predicted_end))),n.a.createElement(b.a,{value:this.state.text,ref:this.getTextAreaRef,autoFocus:!0,maxlength:"255",onChange:this.handleChange,onKeyDown:this.handleKeyDown,className:"cli",autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:"false"}),n.a.createElement("div",{className:this.state.stickers.length?"stickers-wrapper":"disable stickers-wrapper"},this.state.stickers.map((function(t){return n.a.createElement("img",{onClick:e.handleImageClick,src:t})})),n.a.createElement("div",{className:"clearfix"}))))}}]),t}(n.a.Component),O=a(33),S=a.n(O),j=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(h.a)(t).call(this))).state={endpoint:"",username:"",room:"\u0427\u0430\u0442",authed:!1,messages:[]},e.socket=S()(e.state.endpoint),e.handleKeyDown=e.handleKeyDown.bind(Object(d.a)(e)),e.handleChange=e.handleChange.bind(Object(d.a)(e)),e}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("message",(function(t){e.setState({messages:[].concat(Object(c.a)(e.state.messages),[[t.type,t.username,t.message]])})})),this.socket.on("auth",(function(t){e.setState(t?{authed:t}:{username:""})})),this.socket.on("joined",(function(t){e.setState({room:t})}))}},{key:"handleKeyDown",value:function(e){"Enter"!==e.key&&"NumpadEnter"!==e.key||this.state.username&&this.socket.emit("auth",{username:this.state.username,room:this.state.room})}},{key:"handleChange",value:function(e){this.setState({username:e.target.value})}},{key:"render",value:function(){return n.a.createElement("div",{id:"chat"},n.a.createElement("div",{id:"header"},n.a.createElement("p",{className:"room-title"},this.state.room)),n.a.createElement(g,{messages:this.state.messages}),n.a.createElement("div",{id:"cli-wrapper"},this.state.authed?n.a.createElement(y,{socket:this.socket,room:this.state.room,username:this.state.username}):n.a.createElement("div",null,n.a.createElement("div",{className:"login-label"},"/\u043d\u0438\u043a\u043d\u0435\u0439\u043c "),n.a.createElement("input",{type:"text",className:"cli",autoFocus:!0,onChange:this.handleChange,onKeyDown:this.handleKeyDown,id:"login",value:this.state.username,autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:"false"}))))}}]),t}(n.a.Component);var C=function(){return n.a.createElement("div",{className:"app"},n.a.createElement(j,null))};a(76);r.a.render(n.a.createElement(C,null),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.936033fc.chunk.js.map