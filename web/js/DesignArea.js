DesignArea = function(id, isNew){
  draw2d.Workflow.call(this, id);
  
  this.setBackgroundImage("/images/grid.png", true);
  this.getCommandStack().addCommandStackEventListener(new CommandListener());
	
	if(!isNew) {
		this.isNew = true;
		this.isSaved = false;
	}
	else {
		this.isSaved = true;
	}
  this.errorMessage = null;
  
	designArea = this;
	
  new Ext.dd.DropTarget(id, {
    notifyDrop: function(source, event, data){
      var xCoordinate = event.xy[0] - workflow.getAbsoluteX();
      var yCoordinate = event.xy[1] - workflow.getAbsoluteY();
      var figure = eval('new ' + data.className + '(designArea)');
      workflow.addFigure(figure, xCoordinate, yCoordinate);
      return true;
    }
  });
}

DesignArea.prototype = new draw2d.Workflow;
DesignArea.prototype.constructor = DesignArea;
DesignArea.prototype.type = 'DesignArea';

DesignArea.maximumDesignAreaId = 0;

DesignArea.generateDesignAreaId = function(){
  var newDesignAreaId = DesignArea.maximumDesignAreaId;
  DesignArea.maximumDesignAreaId = DesignArea.maximumDesignAreaId + 1;
  return newDesignAreaId;
}

DesignArea.prototype.isValid = function(){
	var components = this.getDocument().getFigures();
	
  //Rule 1: All ports of all components must be connected   
  for (var i = 0; i < this.components.getSize(); i++) {
    if (!this.components.get(i).arePortsConnected()) {
      this.errorMessage = 'Todos los componentes deben estar conectados';
      return false;
    }
  }
  //Rule 2: There must be only one connection per input port (validated in real time through RealTimeValidator)
  return true;
}

DesignArea.prototype.getErrorMessage = function(){
  return this.errorMessage;
}

DesignArea.prototype.toXML = function(){
	var components = this.getDocument().getFigures();
  var xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml = xml + '<design ';
  xml = xml + 'xmlns="http://www.w3schools.com" ';
  xml = xml + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
  xml = xml + 'xsi:schemaLocation="http://www.w3schools.com design.xsd"';
  xml = xml + '>';
  var componentsXml = '<components>';
  var connectionsXml = '<connections>';
  for (var i = 0; i < this.components.getSize(); i++) {
    var component = this.components.get(i);
    componentsXml = componentsXml + component.toXML();
    connectionsXml = connectionsXml + component.outputConnectionsToXML();
  }
  componentsXml = componentsXml + '</components>';
  connectionsXml = connectionsXml + '</connections>';
  xml = xml + componentsXml + connectionsXml;
  xml = xml + '</design>';
  return xml;
}