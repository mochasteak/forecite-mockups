/*
 Sticky-kit v1.0.4 | WTFPL | Leaf Corcoran 2014 | http://leafo.net
 */
(function(){var b,m;b=this.jQuery;m=b(window);b.fn.stick_in_parent=function(e){var u,n,f,s,B,l,C;null==e&&(e={});s=e.sticky_class;u=e.inner_scrolling;f=e.parent;n=e.offset_top;null==n&&(n=0);null==f&&(f=void 0);null==u&&(u=!0);null==s&&(s="is_stuck");B=function(a,e,l,v,y,p,t){var q,z,k,w,c,d,A,x,g,h;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);d=a.parent();null!=f&&(d=d.closest(f));if(!d.length)throw"failed to find stick parent";q=k=!1;g=b("<div />");g.css("position",a.css("position"));A=function(){var c,
  b;c=parseInt(d.css("border-top-width"),10);b=parseInt(d.css("padding-top"),10);e=parseInt(d.css("padding-bottom"),10);l=d.offset().top+c+b;v=d.height();c=k?(k=!1,q=!1,a.insertAfter(g).css({position:"",top:"",width:"",bottom:""}),g.detach(),!0):void 0;y=a.offset().top-parseInt(a.css("margin-top"),10)-n;p=a.outerHeight(!0);t=a.css("float");g.css({width:a.outerWidth(!0),height:p,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":t});if(c)return h()};A();if(p!==v)return w=void 0,
  c=n,h=function(){var b,h,r,f;r=m.scrollTop();null!=w&&(h=r-w);w=r;k?(f=r+p+c>v+l,q&&!f&&(q=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom")),r<y&&(k=!1,c=n,"left"!==t&&"right"!==t||a.insertAfter(g),g.detach(),b={position:"",width:"",top:""},a.css(b).removeClass(s).trigger("sticky_kit:unstick")),u&&(b=m.height(),p>b&&!q&&(c-=h,c=Math.max(b-p,c),c=Math.min(n,c),k&&a.css({top:c+"px"})))):r>y&&(k=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+
  "px":a.width()+"px",a.css(b).addClass(s).after(g),"left"!==t&&"right"!==t||g.append(a),a.trigger("sticky_kit:stick"));if(k&&(null==f&&(f=r+p+c>v+l),!q&&f))return q=!0,"static"===d.css("position")&&d.css({position:"relative"}),a.css({position:"absolute",bottom:e,top:"auto"}).trigger("sticky_kit:bottom")},x=function(){A();return h()},z=function(){m.off("scroll",h);b(document.body).off("sticky_kit:recalc",x);a.off("sticky_kit:detach",z);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:""});
  d.position("position","");if(k)return a.insertAfter(g).removeClass(s),g.remove()},m.on("touchmove",h),m.on("scroll",h),m.on("resize",x),b(document.body).on("sticky_kit:recalc",x),a.on("sticky_kit:detach",z),setTimeout(h,0)}};l=0;for(C=this.length;l<C;l++)e=this[l],B(b(e));return this}}).call(this);