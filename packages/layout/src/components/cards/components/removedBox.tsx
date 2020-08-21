import React from 'react';
import { Flex, P } from '@tpr/core';
import styles from './removedBox.module.scss';

interface RemovedBoxProps {
  type: string
}

const RemovedBox:React.FC<RemovedBoxProps> = ({ type }) => {
  return (
    <div className={styles.confirmationBox}>
      <Flex cfg={{ flex: '0 0 auto', alignItems: 'center', bg: "accents.2" }}>
        <P cfg={{ fontSize: 4, color: 'white', textAlign: 'center', p: 4 }}>
          {type} removed successfully
        </P>
      </Flex>
    </div>
  )
}

export default React.memo(RemovedBox);

