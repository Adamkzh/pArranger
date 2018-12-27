import React,{ Component } from 'react';
import '../style/Checkout.css';
import AWS from 'aws-sdk';
import ReactGA from 'react-ga';

AWS.config.update({
    'accessKeyId':'AKIAIYVQFSGQWDI6KDUA',
    'secretAccessKey':'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',
  });


class CheckoutContent extends Component{
    constructor(props){
        super(props);
        this.state={
            itemList:[],
        }
        this.addItem = this.addItem.bind(this);
        this.link = 'http://www.plxdevices.com/ShoppingCart.asp?'; 
    }


    componentDidMount(){

        ReactGA.initialize('UA-120152287-1'); //Unique Google Analytics tracking number
        this.fireTracking();

        var sStarterSet = 0;
        var lStarterSet = 0;
        var sExpentionSet = 0;
        var lExpentionSet = 0;

        var RailSet = 0;
        var MidKit = 0;
        var EndClampKit = 0;
        var SpliceKit = 0;
        var GroundLug = 0;
        var RailEndCaps = 0;

        var TileNumber = 0 ;
        var ComNumber = 0;
        var MetalNumber = 0 ;

        var TileMF = 0;
        var ComMF = 0;
        var MetalMF = 0;

        var panelSetNumber = (parseInt(window.localStorage.getItem('watts'),0)) /200;
        var store = [
            [0, 0,  0,  0,  0,  0,  0,  0],
            [1, 0,  4,  1,  2,  2,  0,  1],
            [1,	1,	4,	1,	4,	2,	0,	1],
            [1,	2,	8,	2,	7,	5,	1,	2],	 
            [1,	3,	8,	2,	9,	5,	1,	2],	 
            [1,	4,	12,	3,	11,	8,	2,	3],	 
            [1,	5,	12,	3,	13,	8,	2,	3],	 
            [1,	6,	16,	4,	16,	10,	3,	4],	 
            [1,	7,	16,	4,	18,	10,	3,	4],	 
            [1,	8,	18,	5,	20,	11,	4,	4],	 
            [1,	9,	18,	5,	22,	11,	4,	4],	 
            [1,	10,	20,	6,	25,	11,	5,	4],	 
            [1,	11,	20,	6,	27,	11,	5,	4],	 
            [1,	12,	22,	7,	29,	12,	6,	4],	 
            [1,	13,	22,	7,	31,	12,	6,	4],	 
            [1,	14,	24,	8,	33,	12,	7,	4],	 
            [1,	15,	24,	8,	35,	12,	7,	4],	 
            [1,	16,	28,	9,	37,	12,	8,	4],	 
            [1,	17,	28,	9,	39,	12,	8,	4],	 
            [1,	18,	30,	10,	41,	12,	9,	4],	 
            [1,	19,	30,	10,	43,	12,	9,	4],	 
            [1,	20,	32,	11,	45,	12,	10,	4],	 
            [1,	21,	32,	11,	47,	12,	10,	4],	 
            [1,	22,	34,	12,	49,	12,	11,	4],	 
            [1,	23,	34,	12,	51,	12,	11,	4],	 
            [1,	24,	38,	13,	53,	12,	12,	4],	 
            [1,	25,	38,	13,	55,	12,	12,	4],	 
            [1,	26,	40,	14,	57,	12,	13,	4],	 
            [1,	27,	40,	14,	59,	12,	13,	4],	 
            [1,	28,	42,	15,	61,	12,	14,	4],	 
            [1,	29,	42,	15,	63,	12,	14,	4],	 
            [1,	30,	44,	16,	65,	12,	15,	4],	 
            [1,	31,	44,	16,	67,	12,	15,	4]

        ];
        var eachItems = store[panelSetNumber];

        if(window.localStorage.getItem('ACPower')==='120VAC'){
            sStarterSet = eachItems[0];
            sExpentionSet = eachItems[1];
        }else if(window.localStorage.getItem('ACPower')==='230VAC'){
            lStarterSet = eachItems[0];
            sExpentionSet = eachItems[1];
        }

        
        for( let i = 0; i < panelSetNumber; i++){
            if(window.localStorage.getItem( i+'mountType')==='Tile'){
                TileNumber++;
            }else if(window.localStorage.getItem( i+'mountType')==='Metal'){
                MetalNumber ++;
            }else if(window.localStorage.getItem( i+'mountType')==='Composite Shingle'){
                ComNumber ++;
            }
        }
        
        var TileMountItmes = store[TileNumber];

            TileMF = TileMountItmes[2];
            RailSet += TileMountItmes[3];
            MidKit += TileMountItmes[4];
            EndClampKit += TileMountItmes[5];
            RailEndCaps += TileMountItmes[5];
            SpliceKit += TileMountItmes[6];
            GroundLug += TileMountItmes[7];
        var MetalMountItems = store[MetalNumber];

            MetalMF = MetalMountItems[2];
            RailSet += MetalMountItems[3];
            MidKit += MetalMountItems[4];
            EndClampKit += MetalMountItems[5];
            RailEndCaps += MetalMountItems[5];
            SpliceKit += MetalMountItems[6];
            GroundLug += MetalMountItems[7];
        var ComMountItems = store[ComNumber];

            ComMF = ComMountItems[2];
            RailSet += ComMountItems[3];
            MidKit += ComMountItems[4];
            EndClampKit += ComMountItems[5];
            RailEndCaps += ComMountItems[5];
            SpliceKit += ComMountItems[6];
            GroundLug += ComMountItems[7];

           
            this.addItem('Legion Solar Starter Set 120VAC',sStarterSet,'399.00','LEGION SOLAR STARTER SET 120VAC','897346002894');
            this.addItem('Legion Solar Starter Set 230VAC',lStarterSet,'399.00','LEGION SOLAR STARTER SET 230VAC','897346002993');
            this.addItem('Legion Solar Expension Set 120VAC',sExpentionSet,'299.00','LEGION SOLAR EXPANSION SET 120VAC','897346002900');
            this.addItem('Legion Solar Expension Set 230VAC',lExpentionSet,'299.00','LEGION SOLAR EXPANSION SET 230VAC','897346002917');

            this.addItem('Legion Solar Tile Top Mount w/ L-Foot',TileMF,'40.00','LEGION SOLAR TILE TOP MOUNT W/ L-FOOT','897346002054');
            this.addItem('Legion Solar Metal Roof Mount w/ L-Foot',MetalMF,'10.00','LEGION SOLAR COMPOSITE SHINGLE EZ ROOF MOUNT W/ L-FOOT','897346002061');
            this.addItem('Legion Solar Composite Shingle EZ Roof Mount /w L-Foot',ComMF,'15.00','LEGION SOLAR COMPOSITE SHINGLE EZ ROOF MOUNT W/ L-FOOT','897346002122');

            this.addItem('Legion Solar HR150 Aluminum 88" Rail (Set of 2qty)',RailSet,'50.00','LEGION SOLAR HR150 ALUMINUM 88" RAIL SET','897346002108');
            this.addItem('Legion Solar Mid Clamp Kit (Set of 2qty)',MidKit,'10.00','LEGION SOLAR MID CLAMP KIT','897346002160');
            this.addItem('Legion Solar End Clamp Kit (Set of 2qty)',EndClampKit,'8.00','LEGION SOLAR END CLAMP KIT','897346002153');
            
            this.addItem('Legion Solar Rail End Caps (Set of 2qty)',RailEndCaps,'1.50','LEGION SOLAR RAIL END CAPS','897346002078');
            this.addItem('Legion Solar Rail Splice Kit (Set of 2qty)',SpliceKit,'20.00','LEGION SOLAR RAIL SPLICE KIT','897346002146');
            this.addItem('Legion Solar Grounding Lug',GroundLug,'8.00','LEGION SOLAR GROUNDING LUG','897346002139');
          
     
            this.removeLastChar();

    }

removeLastChar(){
    this.link = this.link.substring(0, this.link.length - 1);
}

saveData(){
    var numOfCS = 0;
    var numOfTile = 0;
    var numOfMetal = 0;
    var numOfDIY = 0;
    var numof120VAC = 0;
    var numof230VAC = 0;
    

    for( let i = 0; i < window.localStorage.getItem('watts') ;i += 200){
        let nameofMountType = (i / 200 + 1)+'mountType';
        let nameofpowerType = (i / 200 + 1)+'ACPower';
        let count  = window.localStorage.getItem(nameofMountType);
        let power = window.localStorage.getItem(nameofpowerType);

        if(count === 'Composite Shingle'){
            numOfCS++;
        }else if ( count === 'Tile'){
            numOfTile++;
        }else if (count === 'Metal'){
            numOfMetal++;
        }else{
            numOfDIY++;
        }

        if(power === '120VAC'){
            numof120VAC++;
        }else{
            numof230VAC++;
        }

    }
    const docClient = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});
    var input ={
        email: window.localStorage.getItem('email'),
        uuid: window.localStorage.getItem('uuid'),
        numberof120VAC : numof120VAC,
        numberof230VAC : numof230VAC,
        price: window.localStorage.getItem('price'),
        subtotal: window.localStorage.getItem('subtotal'),
        watts: window.localStorage.getItem('watts'),
        numberOfCompositeShingle : numOfCS,
        numberOfTile : numOfTile,
        numberofMetal : numOfMetal,
        numberofDIY : numOfDIY
    } 

    // console.log(input);
    var params = {
        TableName:"legionsolar-webapp",
        Item: input,
    };
    
    docClient.put(params, function(err,data){
    if(err){
        // console.log('error !!! '+ JSON.stringify(err,null,2));
    }else{
        // console.log('success!!!' + JSON.stringify(data,null,2))
    }
    })
}


    addItem(name , quantity ,each , key, productCode){
        if(quantity > 0){
            this.state.itemList.push(
                {
                key: key,
                quantity: quantity,
                name: name,
                each: each,
                }
            );
            this.setState({
                itemlist : this.state.itemlist,
            });
            this.link = this.link + 'ProductCode='+ productCode +'&Qty.'+ productCode+ '=' + quantity+'&';
        }
    }


    fireTracking() { 
        ReactGA.pageview('CheckOut');
    }

    render(){
        var itemlist = this.state.itemList;
        var price = 0;
        var total = 0;
        return (
            <div className='teseeet'>
                    <div  className='eachItem'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>ITEM  DESCRIPTION</th>
                                        <th>EACH</th>
                                        <th>QTY</th>
                                        <th>TOTAL</th>
                                    </tr>
                                    { 
                                        itemlist.map(
                                        (items) => {
                                            price = (items.each * items.quantity).toFixed(2);
                                            total += parseFloat(price,0);
                                            return ( 
                                            <tr key={items.key}>
                                                <td>{items.name}</td>
                                                <td>{items.each}</td>
                                                <td>{items.quantity}</td>
                                                <td>$ {price}</td>
                                            </tr>
                                            )
                                        }
                                        )
                                    }
                                </tbody>
                            </table>
                            <div className='totalPrice'>
                                Subtotal : $ {total.toFixed(2)}
                                {window.localStorage.setItem('subtotal',total.toFixed(2))}
                            </div>
                            <a href={this.link} rel="noopener noreferrer" target="_blank"> 
                                <button 
                                    className='addCartBtn' 
                                    type="button"
                                    onClick ={this.saveData}
                                    > 
                                    Add to Cart
                                </button>
                            </a>
                     </div> 
            </div>
        )
    }
}

export default CheckoutContent;