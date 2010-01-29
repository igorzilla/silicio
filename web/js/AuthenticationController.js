AuthenticationController = function(){

}

AuthenticationController.prototype.buildForm = function(){
  Ext.QuickTips.init();
  
  //  var forgotPasswordAction = new Ext.Action({
  //    text: '¿Olvidó su contraseña?',
  //    iconCls: 'forgot_password_action',
  //    iconAlign: 'top',
  //    scale: 'large',
  //    enableToggle: true,
  //    handler: function(){
  //      if (forgotPasswordForm.hidden) {
  //        forgotPasswordForm.show();
  //      }
  //      else {
  //        forgotPasswordForm.hide();
  //      }
  //    }
  //  });
  
  var popup;
  
  var openCreateAccountFormAction = new Ext.Action({
    text: 'Registrarse',
    iconCls: 'create_account_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
      if (!popup) {
        var createAccountForm = new Ext.FormPanel({
          id: 'create_account_form',
          url: MainController.getAbsoluteUrl('authentication', 'createAccount'),
          frame: true,
          header: false,
          width: 320,
          defaultType: 'textfield',
          labelWidth: 140,
          items: [{
            fieldLabel: 'Nombres',
            name: 'user[first_name]',
            allowBlank: false,
            maxLength: 30
          }, {
            fieldLabel: 'Apellidos',
            name: 'user[last_name]',
            allowBlank: false,
            maxLength: 30
          }, {
            fieldLabel: 'Email',
            name: 'user[email]',
            allowBlank: false,
            vtype: 'email',
            maxLength: 320
          }, {
            fieldLabel: 'Repetir email',
            name: 'user[email_repetition]',
            allowBlank: false,
            vtype: 'email',
            maxLength: 320
          }, {
            fieldLabel: 'Nombre de usuario',
            name: 'user[username]',
            allowBlank: false,
            minLength: 6,
            maxLength: 30
          }, {
            fieldLabel: 'Contraseña',
            name: 'user[password]',
            inputType: 'password',
            allowBlank: false,
            minLength: 8,
            maxLength: 30
          }, {
            fieldLabel: 'Repetir contraseña',
            name: 'user[password_repetition]',
            inputType: 'password',
            allowBlank: false,
            minLength: 8,
            maxLength: 30
          }, {
            xtype: 'panel',
            html: '<img id="captcha" src="' + MainController.getAbsoluteUrl('authentication', 'generateCaptcha') + '" class="captcha"></img>'
          }, {
            fieldLabel: 'Código de verificación',
            name: 'user[captcha]',
            allowBlank: false,
            style: {
              'font-family': 'monospace',
              'font-weight': 'bold'
            },
            minLength: 8,
            maxLength: 8,
            listeners: {
              specialkey: onEnterPress
            }
          }]
        });
        
        var cancelAction = new Ext.Action({
          text: 'Cancelar',
          iconCls: 'cancel_action',
          iconAlign: 'top',
          scale: 'large',
          handler: function(){
            popup.hide();
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
        
        popup = new Ext.Window({
          applyTo: 'create_acount_div',
          title: 'Crear cuenta de usuario',
          layout: 'fit',
          width: 340,
          height: 380,
          x: 0,
          y: 0,
          closeAction: 'hide',
          resizable: false,
          items: [createAccountForm],
          buttonAlign: 'center',
          buttons: [cancelAction, createAccountAction],
          listeners: {
            hide: function(){
              createAccountForm.getForm().reset();
            }
          }
        });
      }
      if (popup.hidden) {
        popup.show('authenticate_form');
      }
      else {
        popup.hide('authenticate_form');
      }
    }
  });
  
  var authenticateAction = new Ext.Action({
    text: 'Ingresar',
    iconCls: 'authenticate_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
      var basicForm = authenticateForm.getForm();
      basicForm.submit({
        success: function(form, action){
          var mainActionUrl = MainController.getAbsoluteUrl('main', 'index');
          MainController.redirect(mainActionUrl);
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
  
  var onEnterPress = function(f, e){
    if (e.getKey() == e.ENTER) {
      authenticateAction.execute();
    }
  }
  
  var authenticateForm = new Ext.FormPanel({
    id: 'authenticate_form',
    url: MainController.getAbsoluteUrl('authentication', 'login'),
    frame: true,
    title: 'Bienvenido a SILICIO',
    width: 320,
    defaultType: 'textfield',
    labelWidth: 140,
    items: [{
      fieldLabel: 'Nombre de usuario',
      name: 'user[username]',
      allowBlank: false,
      minLength: 6,
      maxLength: 30,
      listeners: {
        specialkey: onEnterPress
      }
    }, {
      fieldLabel: 'Contraseña',
      name: 'user[password]',
      inputType: 'password',
      allowBlank: false,
      minLength: 8,
      maxLength: 30,
      listeners: {
        specialkey: onEnterPress
      }
    }],
    buttonAlign: 'center',
    buttons: [ //		forgotPasswordAction, 
openCreateAccountFormAction, authenticateAction]
  });
  
  //  var forgotPasswordForm = new Ext.FormPanel({
  //    id: 'forgot_password_form',
  //    url: MainController.getAbsoluteUrl('authentication', 'login'),
  //    frame: true,
  //    title: '¿Olvidó su contraseña?',
  //    width: 320,
  //    labelWidth: 140,
  //    defaultType: 'textfield',
  //    hidden: true,
  //    items: [{
  //      fieldLabel: 'Email'
  //    }]
  //  });
  
  var panel = new Ext.Panel({
    id: 'panel',
    frame: true,
    layout: 'form',
    width: 332,
    items: [authenticateForm, //		forgotPasswordForm
 ]
  });
  
  panel.render(Ext.getBody());
  Ext.get('panel').center();
}
