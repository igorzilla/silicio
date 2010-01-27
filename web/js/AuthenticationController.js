AuthenticationController = function(){

}

AuthenticationController.prototype.buildForm = function(){
  Ext.QuickTips.init();
  
  var authenticateAction = new Ext.Action({
    text: 'Autenticar',
		iconCls: 'authenticate_action',
		iconAlign: 'top',
		scale: 'large',
    handler: function(){
			var basicForm = form.getForm();
      basicForm.submit({
        success: function(form, action){
          document.location = MainController.getAbsoluteUrl('main', 'index');
        },
        failure: function(form, action){
          var errorMessage = '';
          switch (action.failureType) {
            case Ext.form.Action.CLIENT_INVALID:
              errorMessage = 'Los datos digitados son inválidos';
              break;
            case Ext.form.Action.CONNECT_FAILURE:
              errorMessage = 'No se pudo establecer comunicación con el servidor';
              break;
            default:
              errorMessage = action.result.message;
              break;
          }
          MainController.generateError(errorMessage);
        }
      });
    }
  });
	
  var createAccountAction = new Ext.Action({
    text: 'Crear cuenta',
		iconCls: 'create_account_action',
		iconAlign: 'top',
		scale: 'large',
    handler: function(){
			
    }
  });
  
  var onEnterPress = function(f, e){
    if (e.getKey() == e.ENTER) {
      authenticateAction.execute();
    }
  }
  
  var form = new Ext.FormPanel({
    id: 'form',
    url: MainController.getAbsoluteUrl('authentication', 'login'),
    frame: true,
    title: 'Bienvenido a SILICIO',
    width: 300,
    defaultType: 'textfield',
    labelWidth: 113,
    items: [{
      fieldLabel: 'Nombre de usuario',
      name: 'user[username]',
      allowBlank: false,
      listeners: {
        specialkey: onEnterPress
      }
    }, {
      fieldLabel: 'Contraseña',
      name: 'user[password]',
      inputType: 'password',
      allowBlank: false,
      listeners: {
        specialkey: onEnterPress
      }
    }],
    buttons: [createAccountAction, authenticateAction]
  });
  
  form.render(Ext.getBody());
  Ext.get('form').center();
}
