import React from 'react';
import { AlertModal } from './alert-modal';
import { Severity } from '../../../../helpers/constants/design-system';
import { Meta, StoryFn } from '@storybook/react';
import configureStore from '../../../../store/store';
import { Provider } from 'react-redux';

const baseAlertsMock = [
  {
    key: 'From',
    field: 'From',
    severity: Severity.Danger,
    message: 'Description of what may happen if this alert was ignored',
    reason: 'Reason for the alert 1',
    alertDetails: [
      "We found the contract Petname 0xEqT3b9773b1763efa556f55ccbeb20441962d82x to be malicious",
      "Operator is an externally owned account (EOA)",
      "Operator is untrusted according to previous activity"
    ]
  },
  {
    key: 'Data',
    field: 'Data',
    severity: Severity.Warning,
    message: "Alert 2",
    alertDetails: ["detail 1 warning", "detail 2 warning"],
    actions:[{key:'go-to-gas-modal',label:"Update gas option"}]
  },
   {
     key:"Contract",
     field:"Contract",
     severity :Severity.Info,
     message:"Alert Info",
     alertDetails:["detail 1 info"," detail info"]
 }
];
const ownerIdMock='123'
const storeMock=configureStore({
   confirmAlerts:{
       alerts:{[ownerIdMock]:baseAlertsMock},
       confirmed:{[ownerIdMock]:{'From':false,'Data':false,'Contract':false}}
   }
})

export default{
 title:'Confirmations/Components/Alerts/AlertModal', 
 component : AlertModal,  
 argTypes:{
 ownerId:{
 control :'text'
 },
 onAcknowledgeClick:{
 action :'onClick'
 },
 onClose:{
 action:'onClick'
 },
 alertKey:{
 control:'text'
 }
 }, 
 args :{
 onAcknowledgeClick :()=>{},
 ownerId :ownerIdMock
}, decorators:[(story)=> <Provider store={storeMock}>{story()}</Provider>],excludeStories:['baseAlerts']
}

export const DefaultStory:(props:any)=>{
 const [{isOpen},updateArgs]=useArgs()
 return(
 <>
 <button onClick={()=>updateArgs({isOpen:true})}>Open Modal</button>
 {isOpen&&<AlertModal {...props} onClose={()=>updateArgs({isOpen:false})}
 onAcknowledgeClick={() => updateArgs({ isOpen:false })} />}
 </>
 )
}
