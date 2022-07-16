import React, { memo, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Land = (props) => {
  const [classColor, setClassColor] = useState('');
  const currentUser = {};
  useEffect(() => {
    (async () => {
      if (props.type === 'road_land') return setClassColor('gray');
      else if (props.type === 'park_land') return setClassColor('green');
      else if (props.owners[props.id] == 0) return setClassColor('blue');
      else if (props.owners[props.id] == props.accounts[0])
        return setClassColor('yellow');
      else return setClassColor('red');
    })();
    // switch (props.type) {
    //   case 'land':
    //     if (props.isOcupied) {
    //       if (props.owner === currentUser.id) {
    //         if (props.forSale) setClassColor('orange');
    //         else setClassColor('yellow');
    //       } else {
    //         if (props.forSale) setClassColor('purple');
    //         else setClassColor('red');
    //       }
    //     } else {
    //       setClassColor('blue');
    //     }
    //     break;
    //   case 'road_land':
    //     setClassColor('gray');
    //     break;
    //   case 'park_land':
    //     setClassColor('green');
    //     break;
    // }
  }, []);

  const showLandDataInModal = () => {
    props.setLandModalData({
      id: props.id,
      type: props.type,
      price: props.price,
      owner: props.owner,
      forSale: props.forSale,
      isOccupied: props.isOccupied,
      disabled: props.disabled,
      contract: props.contract,
      accounts: props.accounts,
    });
    props.onClick();
  };

  const isCurrentLandTaken = async () => {
    const owner = await props.contract.methods.getOwner(props.id).call();
    if (owner == 0) return false;
    return true;
  };

  return (
    <>
      <Button
        variant="link"
        className={`rounded-0 p-0 ${classColor}`}
        style={{
          outline: '1px solid black',
          boxShadow: 'none',
          fontSize: '8px',
          width: '30px',
          height: '30px',
          borderColor: 'transparent',
          color: 'white',
          textDecoration: 'none',
        }}
        id={props.id}
        key={props.id}
        disabled={props.disabled}
        onClick={showLandDataInModal}
      >
        {props.disabled ? '' : props.price}
      </Button>
    </>
  );
};

export default Land;
