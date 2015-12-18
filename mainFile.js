/*
  Two javascript libraries have been included for your use 
  Please do not use any other external javascript library
  
  Included libraries:
     - jQuery
     - jCanvas

  Documentation / references:
  References: 
     - HTML/CSS/JavaScript
     http://www.w3schools.com/
     https://developer.mozilla.org/en-US/Learn/HTML
     - jQuery
     http://learn.jquery.com/
     http://www.w3schools.com/jquery/default.asp
     
  API:
     - jQuery
     http://api.jquery.com/
     - jCavanas  
     http://projects.calebevans.me/jcanvas/docs/
*/

// Stores the id of the canvas element
this.canvasId = 'drawingCanvas';

// Stores the id of the assignment container
this.divContainerId = 'assignmentContainer'; 

// Stores the id of the input textarea
this.inputTextareaId = 'inputData';

// Stores the id of the input textarea
this.outputTextareaId = 'outputData';


// Gets a reference to the canvas
this.$canvas = $('#' + this.canvasId);

// Sets default spacing to 0
this.spacing = 0;

// Sets a reference to the global scope
var self = this;

// Initializes listeners and resets any values
this.init = function() {
    
   // Clears canvas
   self.clearCanvas();
  
   // Adds a click event listeners to the 'Run' button
   $('.run-button').click(function() {
       // Clears canvas
       self.clearCanvas();
     
       // Runs algorithm
       self.run();
   });
  
   // Adds a click event listener to the 'Reset' button
   $('.reset-button').click(function() {
       self.clearCanvas();
   });
  
   // Adds click event listeners to all the 'Example' buttons
   $('.example-button').click(function() {
 	   self.loadExample($(this).attr('number'));
   });
};

// Clears canvas of all rendered elements
this.clearCanvas = function() {
   // Clears the drawing canvas of any preiously rendered elements
   self.$canvas.clearCanvas();
};

// Loads pre-configured examples into the inputs
this.loadExample = function(example) {
    this.clearCanvas();
    this.outputString('');
    
    // Gets a reference to the input textarea
    var $inputTextarea = $('#' + self.inputTextareaId);
  
    // Pre-defined examples
    switch(example) {
        // All examples must follow the same format
        case '1':
          $inputTextarea.val('R: 3' + '\n' +
                             'C: 3' + '\n' +
                             'Nets: 5' + '\n' +
                             '1 c1.p1 c3.p2' + '\n' +
                             '2 c2.p1 c8.p1' + '\n' +
                             '3 c4.p3 c9.p2' + '\n' +
                             '4 c5.p2 c7.p3' + '\n' +
                             '5 c1.p3 c6.p1'
                            );
        break;
        
        case '2':
          $inputTextarea.val('R: 4' + '\n' +
                             'C: 4' + '\n' +
                             'Nets: 10' + '\n' +
                             '1 c1.p2 c2.p3' + '\n' +
                             '2 c3.p1 c2.p2' + '\n' +
                             '3 c12.p3 c9.p3' + '\n' +
                             '4 c11.p1 c14.p2' + '\n' +
                             '5 c12.p1 c6.p1' + '\n' +
                             '6 c14.p2 c3.p2' + '\n' +
                             '7 c14.p3 c8.p3' + '\n' +
                             '8 c8.p3 c9.p2' + '\n' +
                             '9 c3.p2 c13.p1' + '\n' +
                             '10 c1.p1 c15.p1' 
                            );
        break;
        
        case '3':
          $inputTextarea.val('R: 5' + '\n' +
                             'C: 5' + '\n' +
                             'Nets: 20' + '\n' +
                             '1 c11.p2 c8.p2' + '\n' +
                             '2 c12.p2 c16.p1' + '\n' +
                             '3 c7.p3 c1.p1' + '\n' +
                             '4 c6.p3 c22.p2' + '\n' +
                             '5 c8.p1 c19.p1' + '\n' +
                             '6 c5.p1 c21.p2' + '\n' +
                             '7 c2.p3 c6.p2' + '\n' +
                             '8 c4.p3 c21.p3' + '\n' +
                             '9 c9.p2 c2.p2' + '\n' +
                             '10 c17.p1 c5.p2' + '\n' +
                             '11 c18.p2 c20.p1' + '\n' +
                             '12 c16.p3 c15.p2' + '\n' +
                             '13 c13.p1 c4.p1' + '\n' +
                             '14 c13.p2 c7.p2' + '\n' +
                             '15 c23.p1 c12.p3' + '\n' +
                             '16 c1.p3 c23.p3' + '\n' +
                             '17 c14.p2 c22.p3' + '\n' +
                             '18 c20.p3 c23.p2' + '\n' +
                             '19 c19.p2 c9.p1' + '\n' +
                             '20 c14.p3 c17.p2'
                            );
        break;
        
        default:
          $inputTextarea.val('');
    }
  
};

// Gets the indexOf an object in an array that has a property
Array.prototype.objectIndexOf = function(searchTerm, property) {
    for(var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === searchTerm) return i;
    }
    return -1;
};

// Shuffles an array and the ordering
Array.prototype.shuffle = function() {
    var input = this;
     
    for(var i = input.length - 1; i >= 0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i + 1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

// Reads input and returns an array of objects
this.readInputs = function() {
  // Gets a reference to the input textarea
  var $inputTextArea = $('#' + self.inputTextareaId);
  
  // Stores all the lines parsed from the input area
  var lines = $inputTextArea.val().split('\n');
    
  /* Assumes that all input is formatted the same and considered valid */  
  var rowSize = 0;
  var columnSize = 0;
  var netCount = 0;  
  var netArray = new Array();
    
  // Parse input into an object containing the inputs and on-set values
  lines.forEach(function(line, index){ 
      // Parse line into tokens
      var lineContents = line.split(/\s/g);
      
      // Checks for row/column/nets label
      switch(lineContents[0]) {
          case 'R:':
              rowSize = parseInt(lineContents[1]);
              break;
          case 'C:':
              columnSize = parseInt(lineContents[1]);
              break;
          case 'Nets:':
              netCount = parseInt(lineContents[1]);
              break;
          default:
              // Assume line is a net connection
              if (!isNaN(lineContents[0]) && lineContents.length == 3) {
                  netArray.push({
                      source:       lineContents[1],
                      destination:  lineContents[2]
                  });
              }
              break;
      };
  });
    
  // Checks if the input is parsable
  if (netCount <= 0 || netCount != netArray.length) {
      throw 'Parsing error.';
  }
  else {
      return {
          rows:        rowSize,
          columns:     columnSize,
          nets:		   netArray
     };
  }
};

// Prints contents to the output text area
this.outputString = function(string) {
    $('#' + self.outputTextareaId).html(string);
};


/*
	Takes in the |netList| array and create a cellOrder array containing all the connections
    returns an array of cell objects with default ordering C1-CN
*/
this.createCellOrder = function(rows, columns, netList) {
    var numberOfCells = rows * columns;
    var cellOrder = [];
    for(var i = 0; i < numberOfCells; i++) {
    	cellOrder.push({
        	label:  'c' + (i + 1),
            p1:     '',
            p2:     '',
            p3:     '',
            marked: false // This is used for calculating the total manhattan distance
        });
    }
    
    netList.forEach(function(netConnection) {
        // Parse net connection for source and destination
    	var sourceConnection = self.splitCellPort(netConnection.source);
        var destinationConnection = self.splitCellPort(netConnection.destination);
        
        // Find the indices for the two ends of the net
        var cellSourceIndex = cellOrder.objectIndexOf(sourceConnection.cell, 'label');
        var cellDestinationIndex = cellOrder.objectIndexOf(destinationConnection.cell, 'label');
        
        // Assign linkings between the two cells
        cellOrder[cellSourceIndex][sourceConnection.port] = netConnection.destination;
        cellOrder[cellDestinationIndex][destinationConnection.port] = netConnection.source;
    });
    
    return cellOrder;
};

/* 
	Draws the grid with the given information
      - rows:     Integer value specifying the number of cells in each row
      - columns:    Integer value specifying the number of cells in each column
      - cellOrder: An array of cell objects ordered by their position on the grid
   This function assumes that the grid is always printed left-to-right, top-to-bottom
*/
this.drawGrid = function(rows, columns, cellOrder) {
    var currentCellIndex = 0;
    var cellWidth = 100;
    var cellHeight = 100;
    var horizontalMargin = 30;
    var veritcalMargin = 30;
    
    var cellLabel = '-';
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            // If grid is larger than cell orderings we want to display null cells
            if (currentCellIndex >= cellOrder.length) {
                cellLabel = '-';
    		}
            else {
                cellLabel = cellOrder[currentCellIndex].label;
                currentCellIndex++;
            }
            
            self.$canvas.drawRect({
              fillStyle: 'white',
              strokeStyle: '#333333',
              strokeWidth: 2,
              x: (cellWidth * (j + 1)) - horizontalMargin, 
              y: (cellHeight * (i + 1)) - veritcalMargin,
              width: cellWidth / 2,
              height: cellHeight / 2
            }).drawText({
              strokeStyle: '#333333',
              strokeWidth: 1,
              x: (cellWidth * (j + 1)) - horizontalMargin, 
              y: (cellHeight * (i + 1)) - veritcalMargin,
              fontSize: 12,
              fontFamily: 'Helvetica, sans-serif',
              text: cellLabel
            }).drawText({
              strokeStyle: '#333333',
              strokeWidth: 1,
              x: (cellWidth * (j + 0.85)) - horizontalMargin, 
              y: (cellHeight * (i + 0.8)) - veritcalMargin,
              fontSize: 9,
              fontFamily: 'Helvetica, sans-serif',
              text: 'p1'
            }).drawText({
              strokeStyle: '#333333',
              strokeWidth: 1,
              x: (cellWidth * (j + 1.0)) - horizontalMargin, 
              y: (cellHeight * (i + 0.8)) - veritcalMargin,
              fontSize: 9,
              fontFamily: 'Helvetica, sans-serif',
              text: 'p2'
            }).drawText({
              strokeStyle: '#333333',
              strokeWidth: 1,
              x: (cellWidth * (j + 1.15)) - horizontalMargin, 
              y: (cellHeight * (i + 0.8)) - veritcalMargin,
              fontSize: 9,
              fontFamily: 'Helvetica, sans-serif',
              text: 'p3'
            });
        }
    }
};


/*
	Takes in a |cellLabel| and returns the row + column that cell is located at
    	- cellLabel is expected to be a string that matches the label of a cell in cellOrder
    Returns a cellPosition objectain containing the row and column location of a cell
*/
this.findCellPosition = function(cellLabel, cellOrder, columns) {
    var cellIndex = cellOrder.objectIndexOf(cellLabel, 'label');
    var row = Math.floor(cellIndex / columns);
    var column = (cellIndex % columns);
    
    return {
    	row:    row,
        column: column
    };
};

/*
	Takes in two different |cellPositions| and returns the manhattan distance between them
    	- cellPosition1 & cellPosition2 are cell position objects with two properties (row, column)
    Returns the an integer containing the manhattan distance
*/
this.calculateManhattanDistance = function(cellPosition1, cellPosition2){
    return Math.abs(cellPosition1.row - cellPosition2.row) + Math.abs(cellPosition1.column - cellPosition2.column);
};

/*
	Splits the port connections into an object containing the cell and port
    	|cellPort| is a stirng in the format [Cell].[port]
*/
this.splitCellPort = function(cellPort) {
    var cellAndPort = cellPort.split('.');
    
    // Cell labels should always be lowercased
    return {
        cell: cellAndPort[0].toLowerCase(),
        port: cellAndPort[1].toLowerCase()
    };
};

/*
	After the total wire length is calculated we want to unmark all traversed cells
*/
this.clearMarkedCells = function(cellOrder) {
	cellOrder.forEach(function(cell) {
        cell.marked = false;
    });
    
    return cellOrder;
};

/*
	Takes in |cellOrder| & |numberOfColumns| and calculates the total manhattan distance
    Returns total wire length
*/
this.getTotalWireLength = function(cellOrder, numberOfColumns) {
    var totalDistance = 0;
    cellOrder.forEach(function(cell) {
    	if (!cell.marked) {
            // Mark cell as visited
            cell.marked = true;
        	totalDistance += self.getCellDistance(cell, cellOrder, numberOfColumns);
        }
    });
    
    // After all wirelengths are computed we want to clear the markings
    self.clearMarkedCells(cellOrder);
    return totalDistance;
};

// Checks if a cell is marked as seen
this.isCellMarked = function(cellLabel, cellOrder) {
    return cellOrder[cellOrder.objectIndexOf(self.splitCellPort(cellLabel).cell, 'label')].marked;
};

/*
	Takes in a |cell| object, |numberOfColumns|, and |cellOrder|
    Returns the total distance of all the wires connected to the cell
*/
this.getCellDistance = function(cell, cellOrder, numberOfColumns) {
    var total = 0;
    // Check each port for a connection
    if (cell.p1 != '' && !self.isCellMarked(cell.p1, cellOrder)) {
        total += self.getDistanceBetweenCells(cell.label, self.splitCellPort(cell.p1).cell, cellOrder, numberOfColumns);
    }
    if (cell.p2 != '' && !self.isCellMarked(cell.p2, cellOrder)) {
        total += self.getDistanceBetweenCells(cell.label, self.splitCellPort(cell.p2).cell, cellOrder, numberOfColumns);
    }
    if (cell.p3 != '' && !self.isCellMarked(cell.p3, cellOrder)) {
        total += self.getDistanceBetweenCells(cell.label, self.splitCellPort(cell.p3).cell, cellOrder, numberOfColumns);
    }

    return total;
};

/*
	Calculates the distance between |cell1| and |cell2|
*/
this.getDistanceBetweenCells = function(cell1, cell2, cellOrder, numberOfColumns) {
    var startPos = self.findCellPosition(cell1, cellOrder, numberOfColumns);
    var endPos = self.findCellPosition(cell2, cellOrder, numberOfColumns);
    
    var cellWidth = 100;
    var cellHeight = 100;
    var horizontalMargin = 30;
    var veritcalMargin = 30;
    
    // Draws the manhattan distance between the two cells
    self.$canvas.drawLine({
        strokeStyle: '#CCCCCC',
        strokeWidth: 1,
        x1: (cellWidth * (startPos.column + 1)) - horizontalMargin, y1: (cellHeight * (startPos.row + 1)) - veritcalMargin,
        x2: (cellWidth * (startPos.column + 1)) - horizontalMargin, y2: (cellHeight * (endPos.row + 1)) - veritcalMargin,
        x3: (cellWidth * (endPos.column + 1)) - horizontalMargin, y3: (cellHeight * (endPos.row + 1)) - veritcalMargin
    });
    
    return Math.abs(startPos.row - endPos.row) + Math.abs(startPos.column - endPos.column);
};

/* 
	Creates the formatted event string for each iteration of SA
    T: 80, C: 50, C1-C8: 45, Accept
    T: |temperature|, C: |cost|, |swap|: |swapCost|, |actionTaken|
*/
this.createEventString = function(temperature, originalCost, swap, swapCost, actionTaken) {
    return 'T: ' + temperature + ' C: ' + originalCost + ' ' +  swap + ': ' + swapCost + ', ' + actionTaken + '\n';
};

/*******************************************************************/
/* If you choose to create more functions please add them here     */

/*******************************************************************/

//var eventsStringArr = new Array();
var eventsStringArr = [];
var cellOrderArr = [];
var indx = 0;

// Runs your code
this.run = function() {
	this.clearCanvas();
    this.outputString('');
    
    // Declares an array variable to store wire connections
    var inputs;
  
    try {
        inputs = self.readInputs();
    }
    catch(error) {
        // Failed to parse input
        self.outputString(error);
        return;
    }   
	
    // Takes in the input and create a cellOrder array
    var cellOrder = this.createCellOrder(inputs.rows, inputs.columns, inputs.nets);
    // Initially randomizes the placement
    cellOrder.shuffle();
    
    // Draws canvas remember to call this every time you decide to clear the canvas
    this.drawGrid(inputs.rows, inputs.columns, cellOrder);
    var initialTotalWireLength = this.getTotalWireLength(cellOrder, inputs.columns);
    
    // Simulated annealing settings
    var temperature = $('#temperatureInput').val();
    var cooling = $('#coolingRateInput').val();
    var moves = $('#movesInput').val();
    var frozen = $('#stopInput').val();
    var eventsString = '';
    
    /* Place your code here */
    simulatedAnnealingAlgorithm( cellOrder, temperature, cooling, frozen, initialTotalWireLength, moves, inputs.rows, inputs.columns );
    
    /* Delete this code this is just example code for how to create a long string of events */
   // eventsString = this.createEventString(80, 50, 'C1-C8', 45, 'Accept');
    
    var finalCost = this.getTotalWireLength(cellOrder, inputs.columns);

   // var initialCostString = 'Initial cost: ' + initialTotalWireLength + '\n';
//    var finalCostString = 'Final cost: ' + finalCost;
  //  this.outputString(initialCostString + eventsString + finalCostString);
    
};

this.simulatedAnnealingAlgorithm = function( cellOrder, temperature, cooling, frozen, initialTotalWireLength, moves, rows, columns )
{
    //debugger;
    var newTotalWireLength          = 0;
    var noOfMovesPerTemperature     = moves;
    var optimizedTotalWireLength    = initialTotalWireLength;
    var cellPosition1               = 0;
    var cellPosition2               = 0;
    var cellLabel1                  = "";
    var cellLabel2                  = "";
    var eventsString                = '';
    //var eventsStringArr             = [];
    var initialCostString           = "";
    var finalCostString             = "";
    var acceptSol                   = "";
    var cellPosn                    = [];
    var maxTemperature              = parseInt( temperature, 10 );
    var frozenTemp                  = parseInt( frozen, 10 );
    var coolingTemp                 = parseInt( cooling, 10 );
    var index                       = 0;
    var display                     = true;
    
    if( maxTemperature < frozenTemp )  
      return;

    while( maxTemperature > frozenTemp )
    {
        noOfMovesPerTemperature = moves;
        while( noOfMovesPerTemperature > 0 )
        {
            // debugger;
            //this.generateNewCellPosition( cellOrder, cellPosition1, cellPosition2 );
            this.generateNewCellPosition( cellOrder, cellPosn );
            cellPosition1 = cellPosn[0];
            cellPosition2 = cellPosn[1];
            if( cellPosition1 == cellPosition2 )
                continue;
            newTotalWireLength = this.getTotalWireLength( cellOrder, columns );
            cost = optimizedTotalWireLength - newTotalWireLength ;
            if( cost > 0 )
            {
                optimizedTotalWireLength = newTotalWireLength;
                
            }
            else
            {
                cellLabel1 = cellOrder[cellPosition1].label;
                cellLabel2 = cellOrder[cellPosition2].label;
                
                var r = Math.random();
                var modCost = 0;
                
                if( cost < 0 )
                    modCost = Math.abs( cost );
                
                var modCT = 0.00;
                modCT = modCost / maxTemperature;
                var ect = 0.00
                ect = Math.pow( Math.E, modCT );
                var m = 0.00;
                m = 1 / ect;
                
                if( r < m )
                {
                    cellLabel1 = cellOrder[cellPosition1].label;
                    cellLabel2 = cellOrder[cellPosition2].label;
                    eventsString = this.createEventString( maxTemperature, optimizedTotalWireLength, cellLabel1 + '-' + cellLabel2, cost, 'Accept');
                    acceptSol = 'Accept';

                }
                else
                {
                    this.rejectSolution( cellOrder, cellPosition1, cellPosition2 );
                    acceptSol = "Reject";
                    eventsString = this.createEventString( maxTemperature, optimizedTotalWireLength, cellLabel1 + '-' + cellLabel2, newTotalWireLength, 'Reject');
                }
                
                var newCellOrder;
                newCellOrder = cellOrder.slice();
                this.eventsStringArr.push({
                                    str:    eventsString,
                                    finalWireLen: newTotalWireLength,
                                    cellOrders:  cellOrder,
                                    acceptSoln:  acceptSol
                });
                this.cellOrderArr.push( newCellOrder );
                
                if( display )
                {
                    this.displayOutput();
                    display = false;
                }
                
                
                console.log( "Temp: " + maxTemperature + " | Original Cost: " + optimizedTotalWireLength + "  | Swap: " + cellLabel1 + "-" + cellLabel2 + " | Swap cost: " + cost + " | Action taken: " + acceptSol  );
                
            }
            
            noOfMovesPerTemperature = noOfMovesPerTemperature - 1;                                       
        }
        //debugger;
    
      maxTemperature = maxTemperature - ( maxTemperature *  coolingTemp )/100;  
    }
    
    this.displayOutput( rows, columns );
};


var wireLen = 0;
var str = "";
var cellOrder1;
this.displayOutput = function( rows, columns )
{
    var setEvents = "";
    
    setInterval( function()
                         {
                            strEvents = this.eventsStringArr[indx].str;
                            str += "\n" + strEvents;
                            if( indx == ( eventsStringArr.length - 1) )
                            {
                                str += "\n" + "Initial Cost: " + this.eventsStringArr[0].finalWireLen + "  " + strEvents + "  Final Cost: " + eventsStringArr[indx].finalWireLen;
                            }
                            this.outputString( str );
                            
                            if( strEvents.indexOf( 'Accept' ) != -1 )
                            {
                                this.clearCanvas();
                                //cellOrder = this.eventsStringArr[indx].cellOrders;
                                cellOrder1 = this.cellOrderArr[indx];
                                //this.outputCellOrder( cellOrder1 );
                                this.drawGrid( rows, columns, cellOrder1 );
                                wireLen = this.getTotalWireLength( cellOrder1, columns );
                            }

                            indx++;
                         },
                 3000
               );
};


// this function generate new states
this.generateNewCellPosition = function( cellOrder, cellPosn )
{
    var cellRow1 = cellOrder
    var cellPosition1 = getRandomNumber( 0, cellOrder.length - 1 );
    var cellPosition2 = getRandomNumber( 0, cellOrder.length - 1 );
    
    if( cellPosition1 != cellPosition2 )
    {
        var newPosn = cellOrder[ cellPosition1 ];
        cellOrder[ cellPosition1 ] = cellOrder[ cellPosition2 ];
        cellOrder[ cellPosition2 ] = newPosn;
    }
    
    cellPosn[0] = cellPosition1;
    cellPosn[1] = cellPosition2;
    
};
    
this.rejectSolution = function( cellOrder, cellPosition1, cellPosition2 )
{
    var newPosn = cellOrder[ cellPosition1 ];
    cellOrder[ cellPosition1 ]  = cellOrder[ cellPosition2 ];
    cellOrder[ cellPosition2 ] = newPosn;
};
    
// Return a Random number between min( inclusive) and max(inclusive)
this.getRandomNumber = function( min, max )
{
    return Math.floor( Math.random() * ( max-min + 1 ) ) + min;
};

// Initializes listeners and resets any values
this.init();