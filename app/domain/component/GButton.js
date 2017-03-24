import React, { Component } from 'react'
import { Button } from 'basic'
import { COLOR_PRIMARY, W } from 'domain/def'

export const GButton = (props) => {
  return (
    <Button
			height={42}
			width={W-40}
			fontSize={14}
			backgroundColor={COLOR_PRIMARY}
			{...props}
		/>
  )
}
