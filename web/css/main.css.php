<?php header('Content-Type: text/css'); ?>
<?php require_once(dirname(__FILE__).'/../../config/rootUrl.php');?>

.gates_cover {
    padding-left: 66px !important;
    padding-top: 32px !important;
}

.gate {
    cursor: move !important;
    width: 67px !important;
}

.display_cover {
    padding-left: 66px !important;
    padding-top: 3px !important;
}

.display {
    cursor: move !important;
    width: 69px !important;
}

.light_cover {
    padding-left: 76px !important;
    padding-top: 26px !important;
}

.light {
    cursor: move !important;
    width: 48px !important;
}

.switch_cover {
    padding-left: 70px !important;
    padding-top: 21px !important;
}

.switch {
    cursor: move !important;
    width: 64px !important;
}

input.x-form-invalid {
    background-color: #FFFFFF;
    border-color: #CB9494;
    background-image: url(<?php echo $ROOT_URL; ?>/images/invalid-text-bg.gif);
    background-position: 0px 0px;
}

.authenticate_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/key.png) !important;
}

.create_account_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/create_account.png) !important;
}

.close_session_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/closed.png) !important;
}

.save_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/floppy.png) !important;
}

.forgot_password_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/light.png) !important;
}

.cancel_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/cancel.png) !important;
}

.captcha {
    padding-left: 145px;
    padding-top: 6px;
    padding-bottom: 10px;
}

.load_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/open.png) !important;
}

.delete_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/trash.png) !important;
}

.new_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/new.png);
}

.design_area_tab {
    background-image: url(<?php echo $ROOT_URL; ?>/images/design_area.png);
}

.manage_designs_action {
    background-image: url(<?php echo $ROOT_URL; ?>/images/manage.png);
}