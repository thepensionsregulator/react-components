import React from 'react';
import { H4, P } from '@tpr/core';

interface EmailPreviewProps {
  label?:string,
  value: string
}

export const EmailPreview:React.FC<EmailPreviewProps> = React.memo(({
  label = 'Email',
  value
}) => {
  return (
    <>
      <H4 cfg={{ lineHeight: 3 }}>{label}</H4>
      <P cfg={{ wordBreak: 'all' }}>{value}</P>
    </>
  )
});