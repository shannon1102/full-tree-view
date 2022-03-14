import React from 'react';
import './App.css';
import { TypeOfNumeric } from './components/EnumNumericType';
import IButton, { PlusButton } from './components/IButton';
import { LRNumeric } from './trash/LRNumeric';
import NumericStrategy from './components/NumericStrategy';
import Numeric from './components/NumericStrategy';
import { SBSNumeric } from './trash/SBSNumeric';
import { UDNumeric } from './trash/UDNumeric';
import NumericBox from './news/NumericBox';
import { DisplayType, IStyle } from './news/interface';

const dto = {
  value1: 10,
  value2: 0,
  value3: 0,
};

function App() {
  const defaultIStyle: IStyle = {
    borderColor: '#34BC9D',
    backgroundColor: '#34BC9D',
    foreColor: '#fff'
}
  console.log(DisplayType.RightSide)


  


  return (
    <div className='demo'>
      <NumericBox displayType={DisplayType.RightSide} value={ dto.value1 } plusOnlick={(a)=> { dto.value1 = a+1;}} 
          minusOnclick={(a: number)=> -1}></NumericBox>
      <NumericBox displayType={DisplayType.SideBySide}  value={ dto.value2 } style={defaultIStyle} plusOnlick={(a)=> {

        // debugger

        dto.value2 = a+2;

      }} minusOnclick={(a)=>a-1}></NumericBox>
      <NumericBox displayType={DisplayType.RightSideBySide}  value={ dto.value3 } style={defaultIStyle} plusOnlick={(a)=> dto.value3 = a+2 } minusOnclick={(a)=>a-1}></NumericBox>

    </div>

  );

}


export default App;
