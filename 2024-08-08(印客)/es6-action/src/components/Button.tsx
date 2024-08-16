import React from 'react';
// 类型单独导入，大厂规范 也可以import React, {type FC} from "react"
import type { FC } from 'react'; 
const ButtonTypes = ['primary', 'default'] as const;
export type ButtonType = (typeof ButtonTypes)[number];

export interface ButtonProps {
  type?: ButtonType;
}
export const Button: FC<ButtonProps> = () => {
  return <div>Button</div>
};
