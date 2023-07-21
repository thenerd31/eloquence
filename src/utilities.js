// //Define our labelmap
const labelMap = {
    1:{name:'A',color:'red'},
    2:{name:'B',color:'blue'},
    3:{name:'C',color:'yellow'},
    4:{name:'D',color:'orange'},
    5:{name:'E',color:'green'},
    6:{name:'F',color:'purple'},
    7:{name:'G',color:'black'},
    8:{name:'H',color:'white'},
    9:{name:'I',color:'teal'},
    10:{name:'J',color:'goldenrod'},
    11:{name:'K',color:'brown'},
    12:{name:'L',color:'darkgreen'},
    13:{name:'M',color:'pink'},
    14:{name:'N',color:'cyan'},
    15:{name:'O',color:'aqua'},
    16:{name:'P',color:'fuchsia'},
    17:{name:'Q',color:'black'},
    18:{name:'R',color:'maroon'},
    19:{name:'S',color:'blueviolet'},
    20:{name:'T',color:'lightskyblue'},
    21:{name:'U',color:'green'},
    22:{name:'V',color:'lightcyan'},
    23:{name:'W',color:'pink'},
    24:{name:'X',color:'darkblue'},
    25:{name:'Y',color:'olivedrab'},
    26:{name:'Z',color:'salmon'}
  };
  
  

//Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    //console.log(boxes.length)

    for(let i=0; i<=boxes.length; i++){
        //console.log("Boxes[i]:" + boxes[i])
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            
            const [y,x,height,width] = boxes[i]
            
            const text = classes[i]
            console.log(text)
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            //labelMap[text]['name'] + 
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}

