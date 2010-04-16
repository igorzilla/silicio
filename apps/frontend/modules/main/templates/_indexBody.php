<script>
Ext.onReady(function() {
  mainController = new MainController();
});
</script>
<?php
//TODO: Put tooltip to icons
?>
<div id="manage_designs_div"></div>
<div style="visibility: hidden;">
<div id="AndGate_cover" class="gates_cover">
<div id="AndGate_icon" class="gate"><?php echo image_tag('AND.png');?></div>
</div>
<div id="OrGate_cover" class="gates_cover">
<div id="OrGate_icon" class="gate"><?php echo image_tag('OR.png');?></div>
</div>
<div id="NotGate_cover" class="gates_cover">
<div id="NotGate_icon" class="gate"><?php echo image_tag('NOT.png');?></div>
</div>
<div id="NandGate_cover" class="gates_cover">
<div id="NandGate_icon" class="gate"><?php echo image_tag('NAND.png');?></div>
</div>
<div id="NorGate_cover" class="gates_cover">
<div id="NorGate_icon" class="gate"><?php echo image_tag('NOR.png');?></div>
</div>
<div id="XorGate_cover" class="gates_cover">
<div id="XorGate_icon" class="gate"><?php echo image_tag('XOR.png');?></div>
</div>
<div id="Chip7447_cover" class="eight_pin_chips_cover">
<div id="Chip7447_icon" class="eight_pin_chip"><?php echo image_tag('chip7447.png');?>
</div>
</div>
<div id="Chip7473_cover" class="seven_pin_chips_cover">
<div id="Chip7473_icon" class="seven_pin_chip"><?php echo image_tag('chip7473.png');?>
</div>
</div>
<div id="Chip7483_cover" class="eight_pin_chips_cover">
<div id="Chip7483_icon" class="eight_pin_chip"><?php echo image_tag('chip7483.png');?>
</div>
</div>
<div id="display_cover" class="display_cover">
<div id="display" class="display"><?php echo image_tag('display_icon.gif');?></div>
</div>
<div id="Light_cover" class="light_cover">
<div id="Light_icon" class="light"><?php echo image_tag('light.png');?></div>
</div>
<div id="switch_cover" class="switch_cover">
<div id="switch" class="switch"><?php echo image_tag('switch_icon.png');?></div>
</div>
<div id="clock_cover" class="clock_cover">
<div id="clock" class="clock"><?php echo image_tag('clock_icon.png');?></div>
</div>
</div>
