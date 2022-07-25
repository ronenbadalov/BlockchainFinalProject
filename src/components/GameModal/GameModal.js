import { Container } from '@mui/material';
import React from 'react';
import classes from './GameModal.module.scss';
const GameModal = ({ landData }) => {
  return (
    <Container className={classes['container']}>
      <h3 className={classes['header']}>
        {landData.game ? landData.game : 'No Game'}
      </h3>
      {landData.gameUrl ? (
        <iframe className={classes['frame']} src={landData.gameUrl} />
      ) : (
        ''
      )}
    </Container>
  );
};

export default GameModal;
