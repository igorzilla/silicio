/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.FanConnectionRouter=function(){};draw2d.FanConnectionRouter.prototype=new draw2d.NullConnectionRouter;draw2d.FanConnectionRouter.prototype.type="FanConnectionRouter";draw2d.FanConnectionRouter.prototype.route=function(conn){var _2757=conn.getStartPoint();var toPt=conn.getEndPoint();var lines=conn.getSource().getConnections();var _275a=new draw2d.ArrayList();var index=0;for(var i=0;i<lines.getSize();i++){var _275d=lines.get(i);if(_275d.getTarget()==conn.getTarget()||_275d.getSource()==conn.getTarget()){_275a.add(_275d);if(conn==_275d){index=_275a.getSize();}}}if(_275a.getSize()>1){this.routeCollision(conn,index);}else{draw2d.NullConnectionRouter.prototype.route.call(this,conn);}};draw2d.FanConnectionRouter.prototype.routeNormal=function(conn){conn.addPoint(conn.getStartPoint());conn.addPoint(conn.getEndPoint());};draw2d.FanConnectionRouter.prototype.routeCollision=function(conn,index){var start=conn.getStartPoint();var end=conn.getEndPoint();conn.addPoint(start);var _2763=10;var _2764=new draw2d.Point((end.x+start.x)/2,(end.y+start.y)/2);var _2765=end.getPosition(start);var ray;if(_2765==draw2d.PositionConstants.SOUTH||_2765==draw2d.PositionConstants.EAST){ray=new draw2d.Point(end.x-start.x,end.y-start.y);}else{ray=new draw2d.Point(start.x-end.x,start.y-end.y);}var _2767=Math.sqrt(ray.x*ray.x+ray.y*ray.y);var _2768=_2763*ray.x/_2767;var _2769=_2763*ray.y/_2767;var _276a;if(index%2==0){_276a=new draw2d.Point(_2764.x+(index/2)*(-1*_2769),_2764.y+(index/2)*_2768);}else{_276a=new draw2d.Point(_2764.x+(index/2)*_2769,_2764.y+(index/2)*(-1*_2768));}conn.addPoint(_276a);conn.addPoint(end);};