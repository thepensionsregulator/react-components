import React from 'react';
import { H4, P } from '@tpr/core';

interface PhonePreviewProps {
  label?:string,
  value: string
}

export const PhonePreview:React.FC<PhonePreviewProps> = React.memo(({
  label = 'Phone',
  value
}) => {
  return (
    <>
      <H4 cfg={{ lineHeight: 3 }}>{label}</H4>
      <P>{value}</P>
    </>
  )
});