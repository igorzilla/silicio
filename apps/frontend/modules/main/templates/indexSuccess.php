<script>
Ext.onReady(function() {
	mainController = new MainController();
	mainController.buildWorkflow();
	mainController.buildToolsPanel();
	mainController.buildToolBar();
	mainController.buildWorkArea();
	mainController.turnOnDragAndDrop();
});
</script>
<div
	id="paintarea"
	style="position: relative; width: 3000px; height: 3000px;"></div>
<div id="manage_designs_div"></div>
<div id="AND_cover" class="gates_cover">
<div id="AND" class="gate"><?php echo image_tag('AND.png');?></div>
</div>
<div id="OR_cover" class="gates_cover">
<div id="OR" class="gate"><?php echo image_tag('OR.png');?></div>
</div>
<div id="NOT_cover" class="gates_cover">
<div id="NOT" class="gate"><?php echo image_tag('NOT.png');?></div>
</div>
<div id="display_cover" class="display_cover">
<div id="display" class="display"><?php echo image_tag('display.gif');?></div>
</div>
<div id="light_cover" class="light_cover">
<div id="light" class="light"><?php echo image_tag('light.png');?></div>
</div>
<div id="switch_cover" class="switch_cover">
<div id="switch" class="switch"><?php echo image_tag('switch.png');?></div>
</div>