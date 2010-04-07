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
<div id="AND_cover" class="gates_cover">
<div id="AND" class="gate"><?php echo image_tag('AND.png');?></div>
</div>
<div id="OR_cover" class="gates_cover">
<div id="OR" class="gate"><?php echo image_tag('OR.png');?></div>
</div>
<div id="NOT_cover" class="gates_cover">
<div id="NOT" class="gate"><?php echo image_tag('NOT.png');?></div>
</div>
<div id="NAND_cover" class="gates_cover">
<div id="NAND" class="gate"><?php echo image_tag('NAND.png');?></div>
</div>
<div id="NOR_cover" class="gates_cover">
<div id="NOR" class="gate"><?php echo image_tag('NOR.png');?></div>
</div>
<div id="XOR_cover" class="gates_cover">
<div id="XOR" class="gate"><?php echo image_tag('XOR.png');?></div>
</div>
<div id="Chip7447_cover" class="chips_cover">
<div id="Chip7447" class="chip"><?php echo image_tag('chip7447.png');?>
</div>
</div>
<div id="Chip7473_cover" class="chips_cover">
<div id="Chip7473" class="chip"><?php echo image_tag('chip7473.png');?>
</div>
</div>
<div id="display_cover" class="display_cover">
<div id="display" class="display"><?php echo image_tag('display_icon.gif');?></div>
</div>
<div id="light_cover" class="light_cover">
<div id="light" class="light"><?php echo image_tag('light.png');?></div>
</div>
<div id="switch_cover" class="switch_cover">
<div id="switch" class="switch"><?php echo image_tag('switch_icon.png');?></div>
</div>
</div>
