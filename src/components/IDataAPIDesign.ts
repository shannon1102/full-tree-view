export interface IPlusBaseAPI{
    plus():void,
}
// interface NormalPlusAPI extends IPlusBaseAPI {
//     plus():void,
// }
export interface IMinusBaseAPI{
    minus():void,
}
// interface NormalMinusAPI extends IPlusBaseAPI {
//     minus():void,

// }

export interface IDataAPIDesign  extends IPlusBaseAPI,IMinusBaseAPI{
 
}