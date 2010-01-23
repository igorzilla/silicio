AuthenticationController = function(){

}

AuthenticationController.prototype.buildForm = function(){
//  Ext.QuickTips.init();
  
  var form = new Ext.FormPanel({
    id: 'form',
    url: 'authentication/login',
    frame: true,
    title: 'SILICIO',
    width: 300,
    defaultType: 'textfield',
    labelWidth: 113,
    items: [{
      fieldLabel: 'Nombre de usuario',
      name: 'username'
    }, {
      fieldLabel: 'Contraseña',
      name: 'password',
      inputType: 'password'
    }],
    buttons: [{
      text: 'Crear cuenta'
    }, {
      text: 'Autenticar',
      handler: function(){
        form.getForm().submit({
          success: function(form, action){
            Maincontroller.generateError(action.result.msg);
          },
          failure: function(form, action){
            Maincontroller.generateError(action.result.msg);
          }
        });
      }
    }]
  });
  
  form.render(Ext.getBody());
  Ext.get('form').center();
}
