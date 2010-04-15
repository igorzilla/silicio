/**
 * @class
 * @augments Component
 * @param {String} id Identificador único de este objeto. Si no se especifica ninguno, el identificador
 * es generado aleatoriamente.
 */
Chip7447 = function(id){
  Component.call(this, id);
  
  this.setImage(rootUrl + '/images/chip7447.png');
  this.setDimension(104, 59);
}

Chip7447.prototype = new Component;
Chip7447.prototype.constructor = Chip7447;
Chip7447.prototype.type = 'Chip7447';

Chip7447.prototype.setDesignArea = function(designArea){
  this.createInputPort(designArea, 6, 59);
  this.createInputPort(designArea, 19, 59);
  this.createInputPort(designArea, 32, 59);
  this.createInputPort(designArea, 45, 59);
  this.createInputPort(designArea, 58, 59);
  this.createInputPort(designArea, 71, 59);
  this.createInputPort(designArea, 84, 59);
  this.createInputPort(designArea, 97, 59);
  
  this.createOutputPort(designArea, 6, 1);
  this.createOutputPort(designArea, 19, 1);
  this.createOutputPort(designArea, 32, 1);
  this.createOutputPort(designArea, 45, 1);
  this.createOutputPort(designArea, 58, 1);
  this.createOutputPort(designArea, 71, 1);
  this.createOutputPort(designArea, 84, 1);
  this.createOutputPort(designArea, 97, 1);
}

Chip7447.prototype.run = function(){
  var receivedSignal1 = this.inputPorts[6].getReceivedSignal();
  var receivedSignal2 = this.inputPorts[0].getReceivedSignal();
  var receivedSignal3 = this.inputPorts[1].getReceivedSignal();
  var receivedSignal4 = this.inputPorts[5].getReceivedSignal();
  
  var sum = receivedSignal1 + receivedSignal2 + receivedSignal3 + receivedSignal4;
  
  if (sum == Component.ZERO) {
    // Cero
    this.outputPorts[1].transmit(Component.ZERO);
    this.outputPorts[2].transmit(Component.ONE);
    this.outputPorts[3].transmit(Component.ZERO);
    this.outputPorts[4].transmit(Component.ZERO);
    this.outputPorts[5].transmit(Component.ZERO);
    this.outputPorts[6].transmit(Component.ZERO);
    this.outputPorts[7].transmit(Component.ZERO);
  }
  else 
    if (sum == Component.ONE) {
      if (receivedSignal1 == Component.ONE) {
        // Uno
        this.outputPorts[1].transmit(Component.ONE);
        this.outputPorts[2].transmit(Component.ONE);
        this.outputPorts[3].transmit(Component.ONE);
        this.outputPorts[4].transmit(Component.ZERO);
        this.outputPorts[5].transmit(Component.ZERO);
        this.outputPorts[6].transmit(Component.ONE);
        this.outputPorts[7].transmit(Component.ONE);
      }
      else 
        if (receivedSignal2 == Component.ONE) {
          // Dos
          this.outputPorts[1].transmit(Component.ONE);
          this.outputPorts[2].transmit(Component.ZERO);
          this.outputPorts[3].transmit(Component.ZERO);
          this.outputPorts[4].transmit(Component.ZERO);
          this.outputPorts[5].transmit(Component.ONE);
          this.outputPorts[6].transmit(Component.ZERO);
          this.outputPorts[7].transmit(Component.ZERO);
        }
        else 
          if (receivedSignal3 == Component.ONE) {
            // Cuatro
            this.outputPorts[1].transmit(Component.ZERO);
            this.outputPorts[2].transmit(Component.ZERO);
            this.outputPorts[3].transmit(Component.ONE);
            this.outputPorts[4].transmit(Component.ZERO);
            this.outputPorts[5].transmit(Component.ZERO);
            this.outputPorts[6].transmit(Component.ONE);
            this.outputPorts[7].transmit(Component.ONE);
          }
          else 
            if (receivedSignal4 == Component.ONE) {
              // Ocho
              this.outputPorts[1].transmit(Component.ZERO);
              this.outputPorts[2].transmit(Component.ZERO);
              this.outputPorts[3].transmit(Component.ZERO);
              this.outputPorts[4].transmit(Component.ZERO);
              this.outputPorts[5].transmit(Component.ZERO);
              this.outputPorts[6].transmit(Component.ZERO);
              this.outputPorts[7].transmit(Component.ZERO);
            }
    }
    else 
      if (sum == 2) {
        if (receivedSignal1 == Component.ONE && receivedSignal2 == Component.ONE) {
          // Tres
          this.outputPorts[1].transmit(Component.ONE);
          this.outputPorts[2].transmit(Component.ZERO);
          this.outputPorts[3].transmit(Component.ZERO);
          this.outputPorts[4].transmit(Component.ZERO);
          this.outputPorts[5].transmit(Component.ZERO);
          this.outputPorts[6].transmit(Component.ZERO);
          this.outputPorts[7].transmit(Component.ONE);
        }
        else 
          if (receivedSignal1 == Component.ONE && receivedSignal3 == Component.ONE) {
            // Cinco
            this.outputPorts[1].transmit(Component.ZERO);
            this.outputPorts[2].transmit(Component.ZERO);
            this.outputPorts[3].transmit(Component.ZERO);
            this.outputPorts[4].transmit(Component.ONE);
            this.outputPorts[5].transmit(Component.ZERO);
            this.outputPorts[6].transmit(Component.ZERO);
            this.outputPorts[7].transmit(Component.ONE);
          }
          else 
            if (receivedSignal1 == Component.ONE && receivedSignal4 == Component.ONE) {
              // Nueve
              this.outputPorts[1].transmit(Component.ZERO);
              this.outputPorts[2].transmit(Component.ZERO);
              this.outputPorts[3].transmit(Component.ZERO);
              this.outputPorts[4].transmit(Component.ZERO);
              this.outputPorts[5].transmit(Component.ZERO);
              this.outputPorts[6].transmit(Component.ONE);
              this.outputPorts[7].transmit(Component.ONE);
            }
            else 
              if (receivedSignal2 == Component.ONE && receivedSignal3 == Component.ONE) {
                // Seis
                this.outputPorts[1].transmit(Component.ZERO);
                this.outputPorts[2].transmit(Component.ZERO);
                this.outputPorts[3].transmit(Component.ZERO);
                this.outputPorts[4].transmit(Component.ONE);
                this.outputPorts[5].transmit(Component.ZERO);
                this.outputPorts[6].transmit(Component.ZERO);
                this.outputPorts[7].transmit(Component.ZERO);
              }
              else 
                if (receivedSignal2 == Component.ONE && receivedSignal4 == Component.ONE) {
                  // Diez
                  this.outputPorts[1].transmit(Component.ONE);
                  this.outputPorts[2].transmit(Component.ZERO);
                  this.outputPorts[3].transmit(Component.ONE);
                  this.outputPorts[4].transmit(Component.ONE);
                  this.outputPorts[5].transmit(Component.ONE);
                  this.outputPorts[6].transmit(Component.ZERO);
                  this.outputPorts[7].transmit(Component.ZERO);
                }
                else 
                  if (receivedSignal3 == Component.ONE && receivedSignal4 == Component.ONE) {
                    // Doce
                    this.outputPorts[1].transmit(Component.ZERO);
                    this.outputPorts[2].transmit(Component.ZERO);
                    this.outputPorts[3].transmit(Component.ONE);
                    this.outputPorts[4].transmit(Component.ZERO);
                    this.outputPorts[5].transmit(Component.ONE);
                    this.outputPorts[6].transmit(Component.ONE);
                    this.outputPorts[7].transmit(Component.ONE);
                  }
      }
      else 
        if (sum == 3) {
          if (receivedSignal1 == Component.ONE && receivedSignal2 == Component.ONE && receivedSignal3 == Component.ONE) {
            // Siete
            this.outputPorts[1].transmit(Component.ONE);
            this.outputPorts[2].transmit(Component.ONE);
            this.outputPorts[3].transmit(Component.ZERO);
            this.outputPorts[4].transmit(Component.ZERO);
            this.outputPorts[5].transmit(Component.ZERO);
            this.outputPorts[6].transmit(Component.ONE);
            this.outputPorts[7].transmit(Component.ONE);
          }
          else 
            if (receivedSignal1 == Component.ONE && receivedSignal2 == Component.ONE && receivedSignal4 == Component.ONE) {
              // Once
              this.outputPorts[1].transmit(Component.ONE);
              this.outputPorts[2].transmit(Component.ZERO);
              this.outputPorts[3].transmit(Component.ONE);
              this.outputPorts[4].transmit(Component.ONE);
              this.outputPorts[5].transmit(Component.ZERO);
              this.outputPorts[6].transmit(Component.ZERO);
              this.outputPorts[7].transmit(Component.ONE);
            }
            else 
              if (receivedSignal1 == Component.ONE && receivedSignal3 == Component.ONE && receivedSignal4 == Component.ONE) {
                // Trece
                this.outputPorts[1].transmit(Component.ZERO);
                this.outputPorts[2].transmit(Component.ZERO);
                this.outputPorts[3].transmit(Component.ZERO);
                this.outputPorts[4].transmit(Component.ONE);
                this.outputPorts[5].transmit(Component.ONE);
                this.outputPorts[6].transmit(Component.ZERO);
                this.outputPorts[7].transmit(Component.ONE);
              }
              else 
                if (receivedSignal2 == Component.ONE && receivedSignal3 == Component.ONE && receivedSignal4 == Component.ONE) {
                  // Catorce
                  this.outputPorts[1].transmit(Component.ZERO);
                  this.outputPorts[2].transmit(Component.ZERO);
                  this.outputPorts[3].transmit(Component.ONE);
                  this.outputPorts[4].transmit(Component.ONE);
                  this.outputPorts[5].transmit(Component.ONE);
                  this.outputPorts[6].transmit(Component.ZERO);
                  this.outputPorts[7].transmit(Component.ZERO);
                }
        }
        else 
          if (sum == 4 && receivedSignal1 == Component.ONE && receivedSignal2 == Component.ONE && receivedSignal3 == Component.ONE) {
            //Quince
            this.outputPorts[1].transmit(Component.ONE);
            this.outputPorts[2].transmit(Component.ONE);
            this.outputPorts[3].transmit(Component.ONE);
            this.outputPorts[4].transmit(Component.ONE);
            this.outputPorts[5].transmit(Component.ONE);
            this.outputPorts[6].transmit(Component.ONE);
            this.outputPorts[7].transmit(Component.ONE);
          }
}
