AuthenticationController = function(){

}

AuthenticationController.prototype.buildForm = function(){
//  Ext.QuickTips.init();
  
  var form = new Ext.FormPanel({
    id: 'form',
    url: 'authentication/login',
    frame: true,
    title: 'Bienvenido a SILICIO',
    width: 300,
    defaultType: 'textfield',
    labelWidth: 113,
    items: [{
      fieldLabel: 'Nombre de usuario',
      name: 'user[username]',
			allowBlank: false
    }, {
      fieldLabel: 'Contraseña',
      name: 'user[password]',
      inputType: 'password',
			allowBlank: false
    }],
    buttons: [{
      text: 'Crear cuenta'
    }, {
      text: 'Autenticar',
      handler: function(){
        form.getForm().submit({
          success: function(form, action){
            MainController.generateError(action.result.message);
          },
          failure: function(form, action){
            MainController.generateError(action.result.message);
          }
        });
      }
    }]
  });
  
  form.render(Ext.getBody());
  Ext.get('form').center();
}
