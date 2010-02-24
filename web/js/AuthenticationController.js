/**
 * Crea un controlador del módulo de autenticación
 * @class Controlador responsable de la autenticación de usuarios(solo se puede instanciar una vez)
 */
AuthenticationController = function(){
  //TODO: Implementing the singleton pattern here
}

/**
 * Construye los formularios de autenticación y creación de cuentas de usuario
 */
AuthenticationController.prototype.buildForms = function(){
  Ext.QuickTips.init();
  
  var authenticateAction = new Ext.Action({
    text: 'Ingresar',
    iconCls: 'authenticate_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
      var basicForm = authenticateForm.getForm();
      basicForm.submit({
        success: function(form, action){
          //TODO: Transforming the application in a pure AJAX application
          //          var mainActionUrl = MainController.getAbsoluteUrl('main', 'index');
          //          MainController.redirect(mainActionUrl);
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
  
  var createAccountForm = new Ext.FormPanel({
    id: 'create_account_form',
    url: MainController.getAbsoluteUrl('authentication', 'createAccount'),
    frame: true,
    header: false,
    width: 320,
    defaultType: 'textfield',
    labelWidth: 140,
    keys: {
      key: Ext.EventObject.ENTER,
      fn: function(){
        createAccountAction.execute();
      }
    },
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
      id: 'typed_captcha',
      name: 'user[typed_captcha]',
      allowBlank: false,
      style: {
        'font-family': 'monospace',
        'font-weight': 'bold'
      },
      minLength: 8,
      maxLength: 8
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
      var basicForm = createAccountForm.getForm();
      basicForm.submit({
        success: function(form, action){
          AuthenticationController.generateNewCaptcha();
          popup.hide();
          Ext.Msg.alert('Bienvenido', 'La cuenta de usuario se ha creado correctamente. Ahora puede ingresar a SILICIO');
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
          AuthenticationController.generateNewCaptcha();
          var typedCaptcha = Ext.getCmp('typed_captcha');
          typedCaptcha.setValue('');
          MainController.generateError(errorMessage);
        }
      });
    }
  });
  
  var popup = new Ext.Window({
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
  
  var openCreateAccountFormAction = new Ext.Action({
    text: 'Registrarse',
    iconCls: 'create_account_action',
    iconAlign: 'top',
    scale: 'large',
    handler: function(){
      if (popup.hidden) {
        popup.show('authenticate_form');
      }
      else {
        popup.hide('authenticate_form');
      }
    }
  });
  
  var authenticateForm = new Ext.FormPanel({
    id: 'authenticate_form',
    url: MainController.getAbsoluteUrl('authentication', 'login'),
    frame: true,
    title: 'Bienvenido a SILICIO',
    width: 320,
    defaultType: 'textfield',
    labelWidth: 140,
    keys: {
      key: Ext.EventObject.ENTER,
      fn: function(f, e){
        if (e.getKey() == e.ENTER) {
          authenticateAction.execute();
        }
      }
    },
    items: [{
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
    }],
    buttonAlign: 'center',
    buttons: [ //   forgotPasswordAction, 
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
    items: [authenticateForm, //    forgotPasswordForm
 ]
  });
  
  panel.render(Ext.getBody());
  Ext.get('panel').center();
}

/**
 * Genera un nuevo CAPTCHA para el formulario de creación de cuentas de usuario
 */
AuthenticationController.generateNewCaptcha = function(){
  var captcha = Ext.get('captcha');
  captcha.set({
    src: MainController.getAbsoluteUrl('authentication', 'generateCaptcha') + '?param=' + Math.random()
  });
}
