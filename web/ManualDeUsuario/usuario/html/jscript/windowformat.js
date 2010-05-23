// JavaScript Document
function drawtabstrip(index) {
	var imgUnoLeft=document.getElementById('cntPestanaL1').style;
	var imgUnoCenter=document.getElementById('cntPestanaL2').style;
	var imgUnoRight=document.getElementById('cntPestanaL3').style;
	var imgDosLeft=document.getElementById('cntPestanaR1').style;
	var imgDosCenter=document.getElementById('cntPestanaR2').style;
	var imgDosRight=document.getElementById('cntPestanaR3').style;		
	var uno;
	var dos;
	uno = "#2C317F";
	dos = "#65CC0D"; /* 	"#FFC166"; */
	
	if (index ==1) {
//		imgDosLeft.backgroundImage="html/estilos/dos_tabizquierda.gif";
		//Pesta�a Izquierda
		imgUnoLeft.backgroundColor=uno;
		imgUnoCenter.backgroundColor=uno;
		imgUnoRight.backgroundColor=uno; 
		//Pesta�a derecha
		imgDosLeft.backgroundColor=dos;
		imgDosCenter.backgroundColor=dos;
		imgDosRight.backgroundColor=dos;
	}
	else {
		//Pesta�a Izquierda
		imgUnoLeft.backgroundColor=dos;
		imgUnoCenter.backgroundColor=dos;
		imgUnoRight.backgroundColor=dos;
		//Pesta�a Derecha
		imgDosLeft.backgroundColor=uno;
		imgDosCenter.backgroundColor=uno;
		imgDosRight.backgroundColor=uno;
	}
}
